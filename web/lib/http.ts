import axios, { AxiosError } from "axios";
import { env } from "@/lib/env";
import { useAuthStore } from "@/lib/auth/store";

export const http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE,
  timeout: 10_000,
});

http.interceptors.request.use((cfg) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  cfg.headers["Accept-Language"] =
    typeof document !== "undefined" ? document.documentElement.lang || "ko" : "ko";
  return cfg;
});

http.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      await useAuthStore.getState().refresh();
    }
    return Promise.reject(err);
  },
);

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};
