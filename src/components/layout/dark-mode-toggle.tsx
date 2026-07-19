"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export function DarkModeToggle() {
  const t = useTranslations("common");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("msc-theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("msc-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      aria-label={t("darkMode")}
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-forest-700 transition-colors hover:bg-gold-500 hover:text-forest-900 dark:text-cream"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
