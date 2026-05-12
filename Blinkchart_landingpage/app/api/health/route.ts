export async function GET() {
  return new Response(JSON.stringify({
    status: "ok",
    hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
    hasFormId: !!process.env.HUBSPOT_FORM_ID,
    portalId: process.env.HUBSPOT_PORTAL_ID || "NOT SET",
    formId: process.env.HUBSPOT_FORM_ID || "NOT SET",
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
