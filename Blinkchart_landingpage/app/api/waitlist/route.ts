import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5,    // max 5 requests
  duration: 600, // per 10 minutes (600 seconds)
});

const MESSAGE_BLOCKLIST: RegExp[] = [
  /\bkill(ing|ed|er|ers)?\b/i,
  /\bk\s*i\s*l\s*l\b/i,
  /\bmurd[e3]r(er|ers|ing|ous|s)?\b/i,
  /\bidiot(s|ic)?\b/i,
  /\bmoron(s|ic)?\b/i,
  /\bstupid\b/i,
  /\bdumb(ass)?\b/i,
  /\bshut\s+up\b/i,
  /\bf+u+c+k+(ing|er|ers|ed|s)?\b/i,
  /\bsh[i1!]t+(ty|ter|s)?\b/i,
  /\bb[i1!]tch(es|y|ing)?\b/i,
];

function normalizeForModeration(input: string): string {
  return input
    .toLowerCase()
    .replace(/[0]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[@4]/g, "a")
    .replace(/[$5]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[_\-.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsBlockedLanguage(message: unknown): boolean {
  const raw = typeof message === "string" ? message : "";
  if (!raw.trim()) {
    return false;
  }

  const normalized = normalizeForModeration(raw);
  return MESSAGE_BLOCKLIST.some((pattern) => pattern.test(raw) || pattern.test(normalized));
}

function normalizePageContext(body: Record<string, unknown>, request: Request): { pageName: string; pageUri: string } {
  const fallbackUri = request.headers.get("referer")?.trim() || "https://www.blinkchart.ai/";
  const rawPageName = String(body.pageName || "").trim();
  const rawPageUri = String(body.pageUri || "").trim();

  return {
    pageName: rawPageName || "BlinkChart",
    pageUri: rawPageUri || fallbackUri,
  };
}

export async function POST(request: Request) {
  console.log("\n🔔 [WAITLIST_API] Request received!");
  console.log("  Method:", request.method);
  console.log("  URL:", request.url);
  console.log("  Timestamp:", new Date().toISOString());
  
  const getClientIpFromRequest = (req: Request): string => {
    const xForwardedFor = req.headers.get("x-forwarded-for");
    if (xForwardedFor) {
      const firstIp = xForwardedFor.split(",")[0]?.trim();
      if (firstIp) {
        return firstIp;
      }
    }

    const realIp = req.headers.get("x-real-ip")?.trim();
    if (realIp) {
      return realIp;
    }

    const cfConnectingIp = req.headers.get("cf-connecting-ip")?.trim();
    if (cfConnectingIp) {
      return cfConnectingIp;
    }

    return "unknown";
  };

  const ip = getClientIpFromRequest(request);

  try {
    await rateLimiter.consume(ip);
  } catch {
    console.log("[RATE_LIMIT] Too many requests from IP:", ip);
    return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown> = {};
  try {
    const parsed = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>;
    }
  } catch {
    console.log("[PARSE_ERROR] Failed to parse JSON body");
    body = {};
  }

  const { pageName, pageUri } = normalizePageContext(body, request);

  console.log("[FORM_DATA] Received:", {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    hasMessage: !!body.message,
  });

  if (body?.website) {
    console.log("[HONEYPOT] Bot detected, returning success silently");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (containsBlockedLanguage(body?.message)) {
    console.log("[BLOCKED] Message contains blocked language");
    return new Response(JSON.stringify({ message: "Please keep your message respectful." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Forward to HubSpot Forms API
  const portalId = process.env.HUBSPOT_PORTAL_ID || process.env.VITE_HUBSPOT_PORTAL_ID || "245230949";
  const formId = process.env.HUBSPOT_FORM_ID || process.env.VITE_HUBSPOT_FORM_ID || "d4b3c9f5-ca4d-4aef-b253-df1a0f4d07cb";

  console.log("[HUBSPOT_CONFIG] Portal:", portalId, "Form:", formId);

  const hutk = String(body.hutk || "").trim() || undefined;

  const hubspotData = {
    fields: [
      { name: "firstname", value: String(body.firstName || "").trim() },
      { name: "lastname", value: String(body.lastName || "").trim() },
      { name: "email", value: String(body.email || "").trim().toLowerCase() },
      { name: "message", value: String(body.message || "").trim() },
    ],
    context: {
      ipAddress: ip,
      pageName,
      pageUri,
      ...(hutk ? { hutk } : {}),
    },
  };

  try {
    console.log("[HUBSPOT_FETCH] Sending form submission to HubSpot...");
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotData),
      }
    );

    console.log("[HUBSPOT_FETCH] Response received, status:", hubspotResponse.status);
    const responseText = await hubspotResponse.text();
    
    console.log("\n========== HUBSPOT RESPONSE ==========");
    console.log("Status:", hubspotResponse.status, hubspotResponse.statusText);
    console.log("Response Body:", responseText);
    console.log("=====================================\n");

    if (!hubspotResponse.ok) {
      console.error("[HUBSPOT_ERROR] ❌ HubSpot rejected submission, status:", hubspotResponse.status);
      console.error("  Response:", responseText);
      
      return new Response(
        JSON.stringify({
          success: false,
          message: "HubSpot submission failed",
          hubspotStatus: hubspotResponse.status,
          hubspotResponse: responseText,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      console.log("[HUBSPOT_SUCCESS] ✅ Form submitted to HubSpot successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[HUBSPOT_EXCEPTION] ❌ Exception:", error instanceof Error ? error.message : String(error));
    console.error("Stack:", error instanceof Error ? error.stack : "no stack");
    
    return new Response(JSON.stringify({ success: false, message: "Failed to submit form" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
