import { createApiClient, authApi } from "@event-platform/api-client";

export const api = createApiClient({
  baseURL: "/api/proxy",
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },
  onUnauthorized: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
  },
});

export const auth = authApi(api);
