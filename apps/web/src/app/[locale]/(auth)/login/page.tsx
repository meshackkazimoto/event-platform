"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginRequestSchema, type LoginRequest } from "@event-platform/validators";
import { auth } from "@/lib/api";
import { useLocale } from "@/providers/locale-provider";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useLocale();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginRequest) => auth.login(values),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token);
      router.push(`/${locale}`);
    },
  });

  const onSubmit = (values: LoginRequest) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full space-y-6 rounded-3xl border border-black/15 p-6 dark:border-white/15">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-black/60 dark:text-white/60">
              Access your dashboard and manage events.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                {...form.register("phone")}
                placeholder="255712345678"
                className="w-full rounded-2xl border border-black/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-black dark:border-white/15 dark:focus:border-white"
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-black/60 dark:text-white/60">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                {...form.register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-black/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-black dark:border-white/15 dark:focus:border-white"
              />
              {form.formState.errors.password && (
                <p className="text-xs text-black/60 dark:text-white/60">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {loginMutation.isError && (
              <p className="text-sm text-black/70 dark:text-white/70">
                {(loginMutation.error as any)?.response?.data?.error ??
                  (loginMutation.error as Error).message}
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center text-sm text-black/60 dark:text-white/60">
            <Link href={`/${locale}`} className="underline underline-offset-4">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
