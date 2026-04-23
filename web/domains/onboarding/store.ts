import { create } from "zustand";
import type { PassportOcr } from "./api";

export type UserType = "domestic" | "foreign";

type OnbState = {
  userType: UserType | null;
  passportOcr: PassportOcr | null;
  setUserType: (t: UserType) => void;
  setPassportOcr: (ocr: PassportOcr) => void;
  reset: () => void;
};

export const useOnbStore = create<OnbState>()((set) => ({
  userType: null,
  passportOcr: null,
  setUserType: (userType) => set({ userType }),
  setPassportOcr: (passportOcr) => set({ passportOcr }),
  reset: () => set({ userType: null, passportOcr: null }),
}));
