import { getStore } from "@netlify/blobs";

const STORE_NAME = "site-data";
const BLOB_KEY = "site_data_v1";

export default async (req, context) => {
  // Only allow PUT
  if (req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  // ── Auth: require Netlify Identity JWT ──────────────────────────────────
  const clientContext = context.clientContext;
  const user = clientContext && clientContext.user;

  if (!user || !user.email) {
    return new Response(
      JSON.stringify({ error: "Unauthorized — login required" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  // ── Check admin allowlist ───────────────────────────────────────────────
  const allowedRaw = process.env.ADMIN_EMAILS || "";
  const allowedEmails = allowedRaw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!allowedEmails.includes(user.email.toLowerCase())) {
    return new Response(
      JSON.stringify({ error: "Forbidden — not an admin email" }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }

  // ── Parse & validate body ───────────────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return new Response(
      JSON.stringify({ error: "Body must be a JSON object (not array)" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  // ── Save to blob ────────────────────────────────────────────────────────
  try {
    const store = getStore(STORE_NAME);
    await store.set(BLOB_KEY, JSON.stringify(body));

    return new Response(
      JSON.stringify({
        ok: true,
        savedBy: user.email,
        savedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (err) {
    console.error("site_data_put error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error while saving" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};

export const config = {
  path: "/.netlify/functions/site_data_put",
};
