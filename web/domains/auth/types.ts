import type { KycLevel } from "@/lib/auth/store";

export type LoginPayload = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    kycLevel: KycLevel;
  };
};
