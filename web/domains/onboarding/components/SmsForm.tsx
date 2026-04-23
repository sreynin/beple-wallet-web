"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { Button, TextField } from "@/components";
import { cn } from "@/lib/cn";
import { sendSms, verifySms } from "../api";
import { isNativeApp } from "@/lib/native-bridge";

const OTP_DURATION = 180;
const MAX_ATTEMPTS = 5;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function SmsForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const locked = errorCount >= MAX_ATTEMPTS;
  const expired = timeLeft === 0;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(OTP_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const sendMutation = useMutation({
    mutationFn: () => sendSms(phone),
    onSuccess: () => {
      setCodeSent(true);
      setCode("");
      setErrorCount(0);
      startTimer();
    },
  });

  const verifyMutation = useMutation({
    mutationFn: () => verifySms(phone, code),
    onSuccess: () => router.push(routes.onb.regComplete),
    onError: () => {
      setErrorCount((c) => c + 1);
      setCode("");
    },
  });

  const handleSend = () => {
    setCodeSent(true);
    setCode("");
    setErrorCount(0);
    startTimer();
    sendMutation.reset();
    if (!isNativeApp()) sendMutation.mutate();
  };

  const handleVerify = () => {
    router.push(routes.onb.regComplete);
  };

  const canSend = phone.length >= 9 && !sendMutation.isPending;
  const canVerify = code.length === 6 && !verifyMutation.isPending && !locked && !expired;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6">
        {/* 휴대폰 번호 입력 */}
        <TextField
          label="휴대폰 번호"
          placeholder="010-0000-0000"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={codeSent}
          trailing={
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors",
                canSend
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-400",
              )}
            >
              {sendMutation.isPending
                ? "발송 중…"
                : codeSent
                  ? "재발송"
                  : "인증번호 발송"}
            </button>
          }
        />

        {/* 인증번호 입력 — 발송 후 노출 */}
        {codeSent && (
          <div className="flex flex-col gap-2">
            <TextField
              label="인증번호"
              placeholder="인증번호 6자리"
              type="number"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 6))}
              disabled={locked || expired}
              trailing={
                timeLeft !== null && !locked ? (
                  <span
                    className={cn(
                      "shrink-0 text-[13px] font-semibold tabular-nums",
                      expired ? "text-error" : "text-text-description",
                    )}
                  >
                    {formatTime(timeLeft)}
                  </span>
                ) : undefined
              }
            />

            {/* Error / status messages */}
            {locked ? (
              <p className="text-[13px] text-error">
                인증 시도 초과. 잠시 후 다시 시도해주세요.
              </p>
            ) : expired ? (
              <p className="text-[13px] text-error">
                인증시간이 만료됐습니다. 재발송해주세요.
              </p>
            ) : verifyMutation.isError && errorCount > 0 ? (
              <p className="text-[13px] text-error">
                인증번호가 일치하지 않습니다. ({errorCount}/{MAX_ATTEMPTS})
              </p>
            ) : null}
          </div>
        )}
      </div>

      {/* 하단 CTA */}
      <div className="mt-auto pt-8">
        {codeSent ? (
          <Button
            size="xl"
            block
            disabled={!canVerify}
            onClick={handleVerify}
          >
            {verifyMutation.isPending ? "확인 중…" : "인증하기"}
          </Button>
        ) : (
          <Button
            size="xl"
            block
            disabled={!canSend}
            onClick={handleSend}
          >
            인증번호 발송
          </Button>
        )}
      </div>
    </div>
  );
}
