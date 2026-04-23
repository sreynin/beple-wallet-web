import { http, HttpResponse, delay } from "msw";
import { mockTransactions } from "@/mocks/data/wallet";

export const activityHandlers = [
  http.get("*/activity/transactions", async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const start = (page - 1) * limit;
    return HttpResponse.json({
      items: mockTransactions.slice(start, start + limit),
      total: mockTransactions.length,
      page,
      hasMore: start + limit < mockTransactions.length,
    });
  }),

  http.get("*/activity/transactions/:id", async ({ params }) => {
    await delay(200);
    const tx = mockTransactions.find((t) => t.id === params["id"]);
    if (!tx) return HttpResponse.json({ code: "NOT_FOUND" }, { status: 404 });
    return HttpResponse.json(tx);
  }),
];
