import { http } from "@/lib/http";
import type { LanguageOption } from "../types";

export async function fetchLanguages(): Promise<LanguageOption[]> {
  const { data } = await http.get<LanguageOption[]>("/onboarding/languages");
  return data;
}

export async function agreeTerms(ids: string[]): Promise<void> {
  await http.post("/onboarding/terms/agree", { ids });
}

export async function sendSms(phone: string): Promise<void> {
  await http.post("/auth/sms/send", { phone });
}

export async function verifySms(phone: string, code: string): Promise<void> {
  await http.post("/auth/sms/verify", { phone, code });
}

export async function sendContactCode(
  type: "email" | "phone",
  value: string,
): Promise<void> {
  await http.post("/auth/contact/send", { type, value });
}

export async function verifyContactCode(
  type: "email" | "phone",
  value: string,
  code: string,
): Promise<void> {
  await http.post("/auth/contact/verify", { type, value, code });
}

export async function saveKycMethod(method: "quick" | "full"): Promise<void> {
  await http.post("/kyc/method", { method });
}

export type PassportOcr = {
  name: string;
  nameEn: string;
  number: string;
  nationality: string;
  dob: string;
  expiry: string;
  gender: string;
};

export async function submitPassport(): Promise<PassportOcr> {
  const { data } = await http.post<{ success: boolean; ocr: PassportOcr }>(
    "/kyc/passport",
    {},
  );
  return data.ocr;
}

export async function confirmPassport(): Promise<void> {
  await http.post("/kyc/passport/confirm", {});
}

export async function submitFaceScan(): Promise<void> {
  await http.post("/kyc/face", {});
}

export async function setupPin(pin: string): Promise<void> {
  await http.post("/auth/pin/set", { pin });
}

export async function registerBiometric(): Promise<void> {
  await http.post("/auth/biometric/register", {});
}
