import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type KycLevel = "none" | "quick" | "full";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  kycLevel: KycLevel;
  biometricEnabled: boolean;
};

type AuthActions = {
  setTokens: (t: { accessToken: string; refreshToken: string }) => void;
  setKyc: (level: KycLevel) => void;
  setBiometric: (enabled: boolean) => void;
  clear: () => void;
  refresh: () => Promise<void>;
};

const initial: AuthState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  kycLevel: "none",
  biometricEnabled: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initial,
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      setKyc: (kycLevel) => set({ kycLevel }),
      setBiometric: (biometricEnabled) => set({ biometricEnabled }),
      clear: () => set(initial),
      refresh: async () => {
        const rt = get().refreshToken;
        if (!rt) return;
        // TODO: call POST /auth/refresh and update tokens
      },
    }),
    {
      name: "bpw-auth",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as never))),
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        userId: s.userId,
        kycLevel: s.kycLevel,
        biometricEnabled: s.biometricEnabled,
      }),
    },
  ),
);
