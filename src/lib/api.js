const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("ml-token");
  }

  const res = await fetch(API_URL + path, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
