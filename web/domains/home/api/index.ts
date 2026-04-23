import { http } from "@/lib/http";
import type { HomeData, HomeEvent } from "../types";

export async function fetchHome(): Promise<HomeData> {
  const { data } = await http.get<HomeData>("/home");
  return data;
}

export async function fetchEvent(id: string): Promise<HomeEvent> {
  const { data } = await http.get<HomeEvent>(`/home/events/${id}`);
  return data;
}

export async function refreshBalance(): Promise<{ balanceKrw: number; lastUpdated: string }> {
  const { data } = await http.post<{ balanceKrw: number; lastUpdated: string }>("/home/refresh", {});
  return data;
}
