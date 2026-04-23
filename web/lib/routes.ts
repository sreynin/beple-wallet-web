/**
 * Typed deep-link route map — mirrors QA scenario screen codes (ONB-001 ~ ONB-014).
 *
 * 내국인 flow:
 *   language → userType → terms → sms → regComplete → pinSetup → biometric → home
 *
 * 외국인 flow:
 *   language → userType → terms → contact → kyc(method) → kyc(passport)
 *     → kyc(passport-confirm) → kyc(face) → kyc(complete) → pinSetup → biometric → home
 */

export const routes = {
  onb: {
    language:    "/onb/language",       // ONB-001
    userType:    "/onb/user-type",      // ONB-002
    terms:       "/onb/terms",          // ONB-004
    sms:         "/onb/sms",           // ONB-003 (내국인)
    regComplete: "/onb/reg-complete",   // ONB-005 (내국인 가입 완료)
    contact:     "/onb/contact",        // ONB-006 (외국인 연락처 인증)
    kyc: (step: "method" | "passport" | "passport-confirm" | "face" | "complete") =>
      `/onb/kyc/${step}` as const,      // ONB-007 ~ ONB-010, ONB-014
    pinSetup:    "/onb/pin-setup",      // ONB-011 / ONB-012
    biometric:   "/onb/biometric",      // ONB-013
  },
  home: {
    main:   "/home",
    banner: "/home/banner",
  },
  recharge: {
    krb: (step: "terms" | "consent" | "connect" | "coin" | "amount" | "cert" | "confirm" | "complete") =>
      `/recharge/krb/${step}` as const,
    drt: (step: "guide" | "coin" | "address" | "refund" | "complete") =>
      `/recharge/drt/${step}` as const,
    bnk: {
      complete: "/recharge/bnk/complete",
    },
  },
  pay: {
    qr:           "/pay/qr",
    confirm:      "/pay/confirm",
    pin:          "/pay/pin",
    insufficient: "/pay/insufficient",
  },
  withdraw: {
    terms:    "/withdraw/terms",
    guide:    "/withdraw/guide",
    qr:       "/withdraw/qr",
    confirm:  "/withdraw/confirm",
    complete: "/withdraw/complete",
  },
  activity: {
    history: "/activity/history",
    detail:  (id: string) => `/activity/${id}` as const,
  },
  settings: {
    root:      "/settings",
    language:  "/settings/language",
    bio:       "/settings/biometric",
    pinChange: "/settings/pin-change",
  },
} as const;
