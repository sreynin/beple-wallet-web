import { http, HttpResponse, delay } from "msw";

export const onboardingHandlers = [
  // ONB-001 — 언어 목록
  http.get("*/onboarding/languages", async () => {
    await delay(300);
    return HttpResponse.json([
      { code: "ko", label: "한국어", english: "Korean" },
      { code: "en", label: "English", english: "English" },
      { code: "zh", label: "中文", english: "Chinese" },
      { code: "ja", label: "日本語", english: "Japanese" },
      { code: "es", label: "Español", english: "Spanish" },
    ]);
  }),

  // ONB-004 — 약관 동의
  http.post("*/onboarding/terms/agree", async () => {
    await delay(400);
    return HttpResponse.json({ success: true });
  }),

  // ONB-003 — SMS 인증번호 발송
  http.post("*/auth/sms/send", async () => {
    await delay(600);
    return HttpResponse.json({ success: true });
  }),

  // ONB-003 — SMS 인증번호 확인 (코드: 123456)
  http.post("*/auth/sms/verify", async ({ request }) => {
    await delay(500);
    const body = await request.json() as { code: string };
    if (body.code === "123456") {
      return HttpResponse.json({ verified: true });
    }
    return HttpResponse.json(
      { code: "INVALID_CODE", message: "인증번호가 올바르지 않습니다" },
      { status: 400 },
    );
  }),

  // ONB-006 — 연락처 인증코드 발송 (이메일/전화번호)
  http.post("*/auth/contact/send", async () => {
    await delay(600);
    return HttpResponse.json({ success: true });
  }),

  // ONB-006 — 연락처 인증코드 확인 (코드: 123456)
  http.post("*/auth/contact/verify", async ({ request }) => {
    await delay(500);
    const body = await request.json() as { code: string };
    if (body.code === "123456") {
      return HttpResponse.json({ verified: true });
    }
    return HttpResponse.json(
      { code: "INVALID_CODE", message: "인증코드가 올바르지 않습니다" },
      { status: 400 },
    );
  }),

  // ONB-007 — KYC 방식 선택 저장
  http.post("*/kyc/method", async () => {
    await delay(300);
    return HttpResponse.json({ success: true });
  }),

  // ONB-008 — 여권 촬영 (OCR 결과 반환)
  http.post("*/kyc/passport", async () => {
    await delay(1200);
    return HttpResponse.json({
      success: true,
      ocr: {
        name: "홍길동",
        nameEn: "HONG GIL DONG",
        number: "M12345678",
        nationality: "KOR",
        dob: "1985-01-01",
        expiry: "2028-01-01",
        gender: "M",
      },
    });
  }),

  // ONB-014 — 여권 정보 확인 (OCR 결과 최종 제출)
  http.post("*/kyc/passport/confirm", async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  // ONB-009 — 안면 인식
  http.post("*/kyc/face", async () => {
    await delay(2000);
    return HttpResponse.json({ success: true, verified: true });
  }),

  // ONB-011/012 — PIN 설정
  http.post("*/auth/pin/set", async () => {
    await delay(400);
    return HttpResponse.json({ success: true });
  }),

  // ONB-013 — 생체인증 등록
  http.post("*/auth/biometric/register", async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),
];
