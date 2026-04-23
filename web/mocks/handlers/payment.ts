import { http, HttpResponse, delay } from "msw";

export const paymentHandlers = [
  http.post("*/payment/qr/decode", async () => {
    await delay(300);
    return HttpResponse.json({
      merchantId: "merchant-001",
      merchantName: "스타벅스 강남점",
      amount: 15_000,
      currency: "KRW",
      expiresAt: new Date(Date.now() + 120_000).toISOString(),
    });
  }),

  http.post("*/payment/confirm", async () => {
    await delay(600);
    return HttpResponse.json({ transactionId: "tx-pay-001", status: "completed" });
  }),
];
