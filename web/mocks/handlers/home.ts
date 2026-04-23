import { http, HttpResponse, delay } from "msw";
import { mockHome } from "@/mocks/data/wallet";

export const homeHandlers = [
  http.get("*/home", async () => {
    await delay(300);
    return HttpResponse.json(mockHome);
  }),

  http.get("*/home/events/:id", async ({ params }) => {
    await delay(200);
    const event = mockHome.events.find((e) => e.id === params.id);
    if (!event) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(event);
  }),

  http.post("*/home/refresh", async () => {
    await delay(600);
    return HttpResponse.json({
      balanceKrw: mockHome.balanceKrw,
      lastUpdated: "방금 전",
    });
  }),
];
