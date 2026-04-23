"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Button } from "@/components";
import { sendContactCode, verifyContactCode } from "../api";
import { isNativeApp } from "@/lib/native-bridge";

type Tab = "email" | "phone";

export function ContactForm() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("email");
  const [value, setValue] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const sendMutation = useMutation({
    mutationFn: () => sendContactCode(tab, value),
    onSuccess: () => setCodeSent(true),
  });

  const verifyMutation = useMutation({
    mutationFn: () => verifyContactCode(tab, value, code),
    onSuccess: () => router.push(routes.onb.kyc("method")),
  });

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setValue("");
    setCodeSent(false);
    setCode("");
    sendMutation.reset();
    verifyMutation.reset();
  };

  const handleSend = () => {
    setCodeSent(true);
    setCode("");
    sendMutation.reset();
    if (!isNativeApp()) sendMutation.mutate();
  };

  const handleVerify = () => {
    router.push(routes.onb.kyc("method"));
  };

  const canSend = value.length >= 5 && !sendMutation.isPending;

  return (
    <div className="flex flex-1 flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(["email", "phone"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTabChange(t)}
            className={cn(
              "flex-1 pb-3 text-[16px] font-semibold transition-colors",
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-text-description",
            )}
          >
            {t === "email" ? "이메일" : "전화번호"}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-6 pt-6">
        {/* Input + send button */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-text-description">
            {tab === "email" ? "이메일 주소" : "전화번호"}
          </label>
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <input
              type={tab === "email" ? "email" : "tel"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={codeSent}
              placeholder={
                tab === "email" ? "example@email.com" : "+82 10-0000-0000"
              }
              className="flex-1 bg-transparent text-[16px] text-text-heading outline-none placeholder:text-gray-400 disabled:text-gray-400"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={cn(
                "shrink-0 rounded-xl px-4 py-2 text-[14px] font-semibold text-white transition-colors",
                canSend ? "bg-primary" : "bg-gray-300",
              )}
            >
              {sendMutation.isPending
                ? "발송 중…"
                : codeSent
                  ? "재발송"
                  : "코드 발송"}
            </button>
          </div>
          {sendMutation.isError && (
            <p className="text-[12px] text-error">발송 중 오류가 발생했습니다.</p>
          )}
        </div>

        {/* OTP field */}
        {codeSent && (
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-text-description">인증코드</label>
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="인증코드 6자리"
              maxLength={6}
              className="border-b border-gray-300 pb-2 text-[16px] text-text-heading outline-none placeholder:text-gray-400"
            />
            {verifyMutation.isError && (
              <p className="text-[12px] text-error">인증코드가 올바르지 않습니다.</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="pb-6">
        <Button
          size="xl"
          block
          disabled={!codeSent || code.length < 6 || verifyMutation.isPending}
          onClick={handleVerify}
        >
          {verifyMutation.isPending ? "확인 중…" : "인증번호 발송"}
        </Button>
      </div>
    </div>
  );
}
