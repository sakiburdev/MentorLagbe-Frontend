export async function apiFetch(path, options = {}) {
  const isServer = typeof window === "undefined";

  const baseUrl = isServer ? process.env.SERVER_URL : "";

  const res = await fetch(`${baseUrl}/api${path}`, {
    ...options,
    cache: "no-store",
    credentials: "include",
    
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
