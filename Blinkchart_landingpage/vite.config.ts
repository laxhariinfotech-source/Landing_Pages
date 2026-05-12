import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import path from 'node:path'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import type { IncomingMessage, ServerResponse } from 'http'

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 600,
})

type AvailReq = IncomingMessage;

const getClientIp = (req: AvailReq) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    if (forwardedValue) {
      return String(forwardedValue).split(',')[0].trim();
    }
  }
  return req.socket?.remoteAddress || 'unknown';
}

const parseJsonBody = (req: AvailReq) =>
  new Promise<Record<string, unknown>>((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer | string) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });

const apiWaitlistPlugin = {
  name: 'api-waitlist-plugin',
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const request = req as IncomingMessage & { url?: string; method?: string; headers: IncomingMessage['headers'] };
      if (request.url?.startsWith('/api/waitlist') && request.method === 'POST') {
        const ip = getClientIp(request)
        try {
          await rateLimiter.consume(ip)
        } catch {
          res.statusCode = 429
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ message: 'Too many requests. Please try again later.' }))
          return
        }

        const body = await parseJsonBody(req)
        const pageName = String(body?.pageName || "BlinkChart").trim() || "BlinkChart"
        const pageUri = String(body?.pageUri || "https://www.blinkchart.ai/").trim() || "https://www.blinkchart.ai/"

        // Don't process honeypot
        if (body?.website) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
          return
        }

        // Forward to HubSpot
        const portalId = process.env.HUBSPOT_PORTAL_ID || "245230949";
        const formId = process.env.HUBSPOT_FORM_ID || "d4b3c9f5-ca4d-4aef-b253-df1a0f4d07cb";

        const hubspotData = {
          fields: [
            { name: "firstname", value: String(body?.firstName || "").trim() },
            { name: "lastname", value: String(body?.lastName || "").trim() },
            { name: "email", value: String(body?.email || "").trim().toLowerCase() },
            { name: "message", value: String(body?.message || "").trim() },
          ],
          context: {
            ipAddress: ip,
            pageName,
            pageUri,
          },
        };

        try {
          const hubspotResponse = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(hubspotData),
            }
          );

          await hubspotResponse.text();
        } catch {
          // Silent fail - don't break user experience
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true }))
        return
      }
      next()
    })
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Comprehensive browser compatibility: IE 11, older Safari, Chrome, Firefox, Edge
    legacy({
      targets: [
        'defaults',      // Chrome, Firefox, Safari, Edge latest
        'last 3 versions', // Last 3 versions of all browsers
        'IE 11',         // Internet Explorer 11
        'not dead',      // Actively maintained browsers
      ],
      modernTargets: [
        'last 2 versions',
        'not dead',
      ],
      modernPolyfills: true,
      renderLegacyChunks: false,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    apiWaitlistPlugin,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached independently across deploys
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Recharts is large (~500 KB); isolate so chart changes don't bust React cache
          'vendor-recharts': ['recharts'],
          // react-icons tree-shakes well but isolating prevents main chunk growth
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})
