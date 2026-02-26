import { getStore } from "@netlify/blobs";
import { initialData } from "../../js/data.js";

const STORE_NAME = "site-data";
const BLOB_KEY = "site_data_v1";

export default async (req, context) => {
  // Only allow GET
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const store = getStore(STORE_NAME);
    const raw = await store.get(BLOB_KEY);

    if (raw) {
      const data = JSON.parse(raw);
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    // Blob is empty/missing — return default data from repo
    return new Response(JSON.stringify({ data: initialData }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("site_data_get error:", err);
    // On any error, still return default data so the site doesn't break
    return new Response(JSON.stringify({ data: initialData }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = {
  path: "/.netlify/functions/site_data_get",
};
