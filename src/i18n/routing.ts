import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "bn"],
  defaultLocale: "bn",
  localePrefix: "always", // /en/... and /bn/... — keeps language explicit in the URL
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
