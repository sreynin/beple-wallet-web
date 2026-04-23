export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type MockEndpoint = {
  method: HttpMethod;
  path: string;
  tag: string;
  summary: string;
  delay: number;
  requestBody?: Record<string, unknown>;
  response: unknown;
  notes?: string;
};

export const MOCK_SPEC: MockEndpoint[] = [
  // ── ONB-001 ─────────────────────────────────────────────────
  {
    method: "GET",
    path: "/onboarding/languages",
    tag: "온보딩",
    summary: "지원 언어 목록 조회",
    delay: 300,
    response: [
      { code: "ko", label: "한국어", english: "Korean" },
      { code: "en", label: "English", english: "English" },
      { code: "zh", label: "中文", english: "Chinese" },
      { code: "ja", label: "日本語", english: "Japanese" },
      { code: "es", label: "Español", english: "Spanish" },
    ],
  },

  // ── ONB-004 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/onboarding/terms/agree",
    tag: "온보딩",
    summary: "약관 동의",
    delay: 400,
    requestBody: { ids: ["service", "privacy", "marketing"] },
    response: { success: true },
  },

  // ── ONB-003 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/auth/sms/send",
    tag: "인증",
    summary: "SMS 인증번호 발송",
    delay: 600,
    requestBody: { phone: "010-0000-0000" },
    response: { success: true },
  },
  {
    method: "POST",
    path: "/auth/sms/verify",
    tag: "인증",
    summary: "SMS 인증번호 확인",
    delay: 500,
    requestBody: { phone: "010-0000-0000", code: "123456" },
    response: { verified: true },
    notes: "테스트 코드: 123456 (그 외 400 오류 반환)",
  },

  // ── ONB-006 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/auth/contact/send",
    tag: "인증",
    summary: "연락처 인증코드 발송 (이메일 / 전화번호)",
    delay: 600,
    requestBody: { type: "email", value: "user@example.com" },
    response: { success: true },
  },
  {
    method: "POST",
    path: "/auth/contact/verify",
    tag: "인증",
    summary: "연락처 인증코드 확인",
    delay: 500,
    requestBody: { type: "email", value: "user@example.com", code: "123456" },
    response: { verified: true },
    notes: "테스트 코드: 123456 (그 외 400 오류 반환)",
  },

  // ── ONB-007 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/kyc/method",
    tag: "KYC",
    summary: "본인인증 방식 선택 저장",
    delay: 300,
    requestBody: { method: "quick" },
    response: { success: true },
  },

  // ── ONB-008 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/kyc/passport",
    tag: "KYC",
    summary: "여권 촬영 (OCR 분석)",
    delay: 1200,
    requestBody: {},
    response: {
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
    },
    notes: "실제 카메라 미지원 — 모의 OCR 데이터 반환",
  },

  // ── ONB-014 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/kyc/passport/confirm",
    tag: "KYC",
    summary: "여권 정보 최종 확인",
    delay: 500,
    requestBody: {},
    response: { success: true },
  },

  // ── ONB-009 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/kyc/face",
    tag: "KYC",
    summary: "안면 인식 (Liveness Check)",
    delay: 2000,
    requestBody: {},
    response: { success: true, verified: true },
    notes: "2초 후 자동 완료 처리",
  },

  // ── ONB-011/012 ─────────────────────────────────────────────
  {
    method: "POST",
    path: "/auth/pin/set",
    tag: "인증",
    summary: "PIN 설정",
    delay: 400,
    requestBody: { pin: "123456" },
    response: { success: true },
  },

  // ── ONB-013 ─────────────────────────────────────────────────
  {
    method: "POST",
    path: "/auth/biometric/register",
    tag: "인증",
    summary: "생체인증 등록",
    delay: 500,
    requestBody: {},
    response: { success: true },
  },
];

export const TAGS = [...new Set(MOCK_SPEC.map((e) => e.tag))];
