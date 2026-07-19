"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export function LanguageSwitch() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const nextLocale = locale === "en" ? "bn" : "en";

  return (
    <button
      type="button"
      aria-label={t("language")}
      onClick={() => router.replace({ pathname, params }, { locale: nextLocale })}
      className="rounded-full border border-gold-500/40 px-3 py-1.5 text-xs font-semibold tracking-wide text-forest-700 transition-colors hover:bg-gold-500 hover:text-forest-900 dark:text-cream"
    >
      {nextLocale === "bn" ? "বাংলা" : "EN"}
    </button>
  );
}
