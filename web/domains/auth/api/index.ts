import { http } from "@/lib/http";
import type { LoginPayload, LoginResponse } from "../types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/auth/login", payload);
  return data;
}
