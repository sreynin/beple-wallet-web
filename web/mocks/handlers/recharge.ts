import { http, HttpResponse, delay } from "msw";
import { mockAssets } from "@/mocks/data/wallet";

export const rechargeHandlers = [
  http.get("*/recharge/assets", async () => {
    await delay(300);
    return HttpResponse.json(mockAssets);
  }),

  http.post("*/recharge/quote", async ({ request }) => {
    await delay(500);
    const body = await request.json() as { symbol: string; amount: number };
    const asset = mockAssets.find((a: { symbol: string }) => a.symbol === body.symbol);
    if (!asset) return HttpResponse.json({ code: "INVALID_ASSET" }, { status: 400 });
    const krw = Math.floor((body.amount / asset.amount) * asset.valueKrw);
    return HttpResponse.json({ krw, fee: Math.floor(krw * 0.001), expiresAt: new Date(Date.now() + 30_000).toISOString() });
  }),

  http.post("*/recharge/execute", async () => {
    await delay(800);
    return HttpResponse.json({ transactionId: "tx-new-001", status: "pending" });
  }),

  http.get("*/recharge/bank-accounts", async () => {
    await delay(300);
    return HttpResponse.json([
      { id: "ba-1", bankName: "국민은행", accountNumber: "123456-78-901234", holder: "김민수" },
    ]);
  }),
];
