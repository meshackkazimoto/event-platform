"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/providers/locale-provider";
import { useTheme } from "@/providers/theme-provider";
import type { Locale } from "@event-platform/locale";

type Theme = "light" | "dark";

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export default function LandingControls() {
  const router = useRouter();
  const pathname = usePathname();

  const { locale, setLocale, t } = useLocale();
  const { theme, setTheme } = useTheme();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    setLocale(nextLocale);

    setLocaleCookie(nextLocale);

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    const nextPath = segments.join("/") || `/${nextLocale}`;
    router.push(nextPath);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-full border border-black/15 bg-white px-1 py-1 text-xs dark:border-white/15 dark:bg-black">
        <button
          onClick={() => setTheme("light")}
          className={`rounded-full px-3 py-1 ${
            theme === "light"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          }`}
        >
          {t.landing.ui.light}
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`rounded-full px-3 py-1 ${
            theme === "dark"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          }`}
        >
          {t.landing.ui.dark}
        </button>
      </div>

      <div className="flex items-center rounded-full border border-black/15 bg-white px-1 py-1 text-xs dark:border-white/15 dark:bg-black">
        <button
          onClick={() => switchLocale("en")}
          className={`rounded-full px-3 py-1 ${
            locale === "en"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          }`}
        >
          EN
        </button>

        <button
          onClick={() => switchLocale("sw")}
          className={`rounded-full px-3 py-1 ${
            locale === "sw"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          }`}
        >
          SW
        </button>
      </div>
    </div>
  );
}
