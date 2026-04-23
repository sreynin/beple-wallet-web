import type { KycLevel } from "@/lib/auth/store";

export const mockUser = {
  id: "user-001",
  name: "김민수",
  email: "minsu.kim@example.com",
  phone: "+82-10-1234-5678",
  kycLevel: "full" as KycLevel,
  biometricEnabled: false,
  language: "ko",
  notificationsEnabled: true,
};

export const mockTokens = {
  accessToken: "mock-access-token-abc123",
  refreshToken: "mock-refresh-token-xyz789",
};
