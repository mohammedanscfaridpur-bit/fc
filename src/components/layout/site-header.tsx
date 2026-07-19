"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { Container } from "@/components/shared/container";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { DarkModeToggle } from "@/components/layout/dark-mode-toggle";
import { primaryNav, aboutNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/20 bg-cream/90 backdrop-blur-md dark:bg-forest-900/90">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo.png"
            alt={t("site.name")}
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <span className="hidden flex-col sm:flex">
            <span className="font-display text-base font-semibold leading-tight text-forest-800 dark:text-cream">
              {t("site.name")}
            </span>
            <span className="text-xs tracking-wide text-gold-600">
              {t("site.location")} · {t("site.founded")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-forest-100 hover:text-forest-800 dark:text-cream/70 dark:hover:bg-forest-800",
                pathname === item.href && "bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-cream",
              )}
            >
              {t(`nav.${item.labelKey}`)}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink/70 hover:bg-forest-100 hover:text-forest-800 dark:text-cream/70 dark:hover:bg-forest-800">
              {t("nav.management")}
              <ChevronDown size={14} />
            </button>
            {aboutOpen && (
              <div className="absolute right-0 top-full w-56 rounded-xl border border-gold-500/20 bg-cream p-2 shadow-gold dark:bg-forest-800">
                {aboutNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-forest-100 dark:text-cream/80 dark:hover:bg-forest-700"
                  >
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label={t("common.search")}
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-forest-700 hover:bg-gold-500 hover:text-forest-900 dark:text-cream"
          >
            <Search size={16} />
          </button>
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <DarkModeToggle />
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-forest-700 dark:text-cream lg:hidden"
          >
            <Menu size={16} />
          </button>
        </div>
      </Container>

      {searchOpen && (
        <div className="border-t border-gold-500/20 bg-cream dark:bg-forest-900">
          <Container className="py-3">
            <input
              autoFocus
              type="search"
              placeholder={t("common.searchPlaceholder")}
              className="w-full rounded-full border border-gold-500/30 bg-cream-soft px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:bg-forest-800 dark:text-cream"
            />
          </Container>
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-forest-900/95 p-6 text-cream lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">{t("site.name")}</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {[...primaryNav, ...aboutNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-medium hover:bg-forest-800"
              >
                {t(`nav.${item.labelKey}`)}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <LanguageSwitch />
          </div>
        </div>
      )}
    </header>
  );
}
