"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/auth/store";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { Button, TextField } from "@/components";
import { login } from "../api";

const schema = z.object({
  phone: z.string().min(1, "전화번호를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상입니다"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setKyc = useAuthStore((s) => s.setKyc);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setTokens({ accessToken, refreshToken });
      setKyc(user.kycLevel);
      router.push(routes.home.main);
    },
  });

  const apiError =
    error && "response" in error
      ? (error.response as { data?: { message?: string } })?.data?.message
      : null;

  return (
    <form
      onSubmit={handleSubmit((d) => mutate(d))}
      className="flex flex-col gap-6"
    >
      <TextField
        label="전화번호"
        placeholder="+82-10-0000-0000"
        {...register("phone")}
        errorMessage={errors.phone?.message}
      />
      <TextField
        label="비밀번호"
        type="password"
        placeholder="6자 이상 입력"
        {...register("password")}
        errorMessage={errors.password?.message}
      />

      {apiError ? (
        <p className="text-[13px] text-error">{apiError}</p>
      ) : null}

      <Button type="submit" size="xl" block disabled={isPending}>
        {isPending ? "로그인 중…" : "로그인"}
      </Button>
    </form>
  );
}
