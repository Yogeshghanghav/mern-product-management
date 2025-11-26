const API_BASE = "http://localhost:3000/api/v1";

export async function apiRequest(path, method = "GET", body, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.msg || data.message || "Request failed");
  }
  return data;
}
