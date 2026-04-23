"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { Button } from "@/components";
import { cn } from "@/lib/cn";
import { useMutation } from "@tanstack/react-query";
import { useOnbStore } from "../store";
import { agreeTerms } from "../api";

const TERMS = [
  { id: "service",   label: "서비스 이용약관",       required: true },
  { id: "privacy",   label: "개인정보 처리방침",      required: true },
  { id: "marketing", label: "마케팅 정보 수신 동의",  required: false },
] as const;

type TermId = (typeof TERMS)[number]["id"];

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked ? "border-primary bg-primary" : "border-gray-300 bg-white",
      )}
    >
      {checked && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
    </div>
  );
}

export function TermsForm() {
  const router = useRouter();
  const userType = useOnbStore((s) => s.userType);
  const [checked, setChecked] = useState<Record<TermId, boolean>>({
    service: false,
    privacy: false,
    marketing: false,
  });

  const allChecked = TERMS.every((t) => checked[t.id]);
  const requiredChecked = TERMS.filter((t) => t.required).every((t) => checked[t.id]);

  const navigate = () =>
    router.push(userType === "foreign" ? routes.onb.contact : routes.onb.sms);

  const { mutate, isPending } = useMutation({
    mutationFn: () => agreeTerms(TERMS.filter((t) => checked[t.id]).map((t) => t.id)),
    onSuccess: navigate,
    onError: navigate,
  });

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ service: next, privacy: next, marketing: next });
  };

  const toggle = (id: TermId) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-1 flex-col">
      {/* 전체 동의 */}
      <button
        type="button"
        onClick={toggleAll}
        className="flex w-full items-center gap-4 rounded-xl bg-gray-50 px-4 py-5 text-left"
      >
        <RadioCircle checked={allChecked} />
        <div>
          <p className="text-[16px] font-bold text-text-heading">전체 동의</p>
          <p className="mt-0.5 text-[13px] leading-snug text-text-description">
            서비스 이용약관, 개인정보 처리방침, 마케팅 수신 포함
          </p>
        </div>
      </button>

      <div className="my-5 h-px bg-border-card" />

      {/* 개별 약관 */}
      <ul className="flex flex-col">
        {TERMS.map((term) => (
          <li key={term.id} className="flex items-center gap-3 py-3">
            <button type="button" onClick={() => toggle(term.id)}>
              <RadioCircle checked={checked[term.id]} />
            </button>

            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[11px] font-semibold",
                term.required
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-500",
              )}
            >
              {term.required ? "필수" : "선택"}
            </span>

            <span className="flex-1 text-[15px] text-text-heading">
              {term.label}
            </span>

            <ChevronRight className="h-4 w-4 text-gray-400" />
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Button
          size="xl"
          block
          disabled={!requiredChecked || isPending}
          onClick={() => mutate()}
        >
          {isPending ? "처리 중…" : "동의하고 시작하기"}
        </Button>
      </div>
    </div>
  );
}
