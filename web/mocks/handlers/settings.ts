import { http, HttpResponse, delay } from "msw";
import { mockUser } from "@/mocks/data/user";

export const settingsHandlers = [
  http.get("*/settings", async () => {
    await delay(200);
    return HttpResponse.json({
      language: mockUser.language,
      notificationsEnabled: mockUser.notificationsEnabled,
      biometricEnabled: mockUser.biometricEnabled,
    });
  }),

  http.patch("*/settings", async ({ request }) => {
    await delay(300);
    const body = await request.json();
    return HttpResponse.json({ success: true, ...body as object });
  }),

  http.get("*/settings/profile", async () => {
    await delay(200);
    return HttpResponse.json(mockUser);
  }),
];
