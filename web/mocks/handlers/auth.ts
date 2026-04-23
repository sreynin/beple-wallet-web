import { http, HttpResponse, delay } from "msw";
import { mockTokens, mockUser } from "@/mocks/data/user";

export const authHandlers = [
  http.post("*/auth/login", async ({ request }) => {
    await delay(400);
    const body = await request.json() as Record<string, unknown>;
    if (body.phone === mockUser.phone || body.email === mockUser.email) {
      return HttpResponse.json({ ...mockTokens, user: mockUser });
    }
    return HttpResponse.json({ code: "INVALID_CREDENTIALS", message: "Invalid credentials" }, { status: 401 });
  }),

  http.post("*/auth/refresh", async () => {
    await delay(200);
    return HttpResponse.json({ accessToken: "mock-access-token-refreshed-xyz" });
  }),

  http.post("*/auth/logout", async () => {
    await delay(200);
    return HttpResponse.json({ success: true });
  }),

  http.post("*/auth/pin/verify", async () => {
    await delay(300);
    return HttpResponse.json({ verified: true });
  }),

  http.post("*/auth/pin/set", async () => {
    await delay(300);
    return HttpResponse.json({ success: true });
  }),
];
