import { TopBar } from "@/components";
import { LoginForm } from "@/domains/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col gap-8 px-4 pb-6 pt-2">
        <div>
          <h1 className="text-[22px] font-bold text-text-heading">로그인</h1>
          <p className="mt-1 text-[14px] text-text-description">
            비플월렛에 오신 것을 환영합니다
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-[13px] text-text-description">
          테스트 계정: +82-10-1234-5678 / 비밀번호 아무거나
        </p>
      </main>
    </>
  );
}
