import { http, HttpResponse, delay } from "msw";

export const withdrawalHandlers = [
  http.post("*/withdrawal/qr", async () => {
    await delay(400);
    return HttpResponse.json({
      qrCode: "data:image/png;base64,MOCK_QR_CODE",
      amount: 100_000,
      expiresAt: new Date(Date.now() + 180_000).toISOString(),
      atmLocation: "GS25 서초점 ATM",
    });
  }),

  http.get("*/withdrawal/status/:id", async () => {
    await delay(200);
    return HttpResponse.json({ status: "waiting" });
  }),
];
