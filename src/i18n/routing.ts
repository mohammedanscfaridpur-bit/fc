import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "bn"],
  defaultLocale: "bn",
  localePrefix: "always", // /en/... and /bn/... — keeps language explicit in the URL
  pathnames: {
  "/": "/",
  "/history": "/history",
  "/activities": "/activities",
  "/achievements": "/achievements",
  "/management": "/management",
  "/executive-committee": "/executive-committee",
  "/former-presidents": "/former-presidents",
  "/former-secretaries": "/former-secretaries",
  "/life-members": "/life-members",
  "/membership": "/membership",
  "/gallery": "/gallery",
  "/news": "/news",
  "/news": "/news",
  "/events": "/events",
  "/events/[slug]": "/events/[slug]",
  "/sponsors": "/sponsors",
  "/contact": "/contact",
},
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
