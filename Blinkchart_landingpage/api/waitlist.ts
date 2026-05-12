import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5,    // max 5 requests
  duration: 600, // per 10 minutes (600 seconds)
});

const MESSAGE_BLOCKLIST = [
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

function normalizeForModeration(input) {
  return String(input || "")
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

function containsBlockedLanguage(message) {
  const raw = String(message || "");
  if (!raw.trim()) {
    return false;
  }

  const normalized = normalizeForModeration(raw);
  return MESSAGE_BLOCKLIST.some((pattern) => pattern.test(raw) || pattern.test(normalized));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function normalizePageContext(body, req) {
  const fallbackUri = String(req.headers?.referer || "https://www.blinkchart.ai/").trim();
  const rawPageName = String(body?.pageName || "").trim();
  const rawPageUri = String(body?.pageUri || "").trim();

  return {
    pageName: rawPageName || "BlinkChart",
    pageUri: rawPageUri || fallbackUri,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const ip = getClientIp(req);
  try {
    await rateLimiter.consume(ip);
  } catch {
    res.status(429).json({ message: "Too many requests. Please try again later." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const { pageName, pageUri } = normalizePageContext(body, req);

  if (body?.website) {
    res.status(200).json({ success: true });
    return;
  }

  if (containsBlockedLanguage(body?.message)) {
    res.status(400).json({ message: "Please keep your message respectful." });
    return;
  }

  // Forward to HubSpot Forms API
  const portalId = process.env.HUBSPOT_PORTAL_ID || "245230949";
  const formId = process.env.HUBSPOT_FORM_ID || "d4b3c9f5-ca4d-4aef-b253-df1a0f4d07cb";

  console.log("[HUBSPOT] Portal:", portalId, "Form:", formId);

  const hutk = String(body?.hutk || "").trim() || undefined;

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
      ...(hutk ? { hutk } : {}),
    },
  };

  try {
    console.log("[HUBSPOT] Sending submission to HubSpot API...");
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotData),
      }
    );

    const responseText = await hubspotResponse.text();
    console.log("[HUBSPOT] Response status:", hubspotResponse.status);
    console.log("[HUBSPOT] Response body:", responseText);

    if (!hubspotResponse.ok) {
      console.error("[HUBSPOT] Error from API:", {
        status: hubspotResponse.status,
        response: responseText,
      });
      res.status(502).json({
        success: false,
        message: "HubSpot submission failed",
        hubspotStatus: hubspotResponse.status,
      });
      return;
    } else {
      console.log("[HUBSPOT] Successfully submitted form!");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[HUBSPOT] Exception:", error instanceof Error ? error.message : String(error));
    res.status(502).json({ success: false, message: "Failed to submit form" });
  }
}
