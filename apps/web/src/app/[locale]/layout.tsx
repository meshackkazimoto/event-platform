import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "@event-platform/ui/globals.css";

import type { Locale } from "@event-platform/locale";
import { LocaleProvider } from "@/providers/locale-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Event Platform",
  description: "The simple way to manage your events and invitations.",
};

const LOCALES: Locale[] = ["en", "sw"];

function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${jetbrains.variable} font-mono antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("theme");
                  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <QueryProvider>
          <LocaleProvider initialLocale={locale}>
            <ThemeProvider>{children}</ThemeProvider>
          </LocaleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
