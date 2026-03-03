const BASE = "http://127.0.0.1:8000/api/auth";

export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res  = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export const getAccess  = () => localStorage.getItem("access_token");
export const getRefresh = () => localStorage.getItem("refresh_token");
export const saveTokens = ({ access, refresh }) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};
export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("auth_user");
};
export const saveUser = u  => localStorage.setItem("auth_user", JSON.stringify(u));
export const loadUser = () => { try { return JSON.parse(localStorage.getItem("auth_user")); } catch { return null; } };
export const getError = d => {
  if (typeof d.error  === "string") return d.error;
  if (typeof d.detail === "string") return d.detail;
  if (d.errors) return Object.values(d.errors).flat()[0] || "Validation error.";
  return "Something went wrong.";
};
