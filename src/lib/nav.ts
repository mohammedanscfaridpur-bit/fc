export interface NavItem {
  href: string;
  labelKey:
    | "home"
    | "history"
    | "activities"
    | "achievements"
    | "management"
    | "executiveCommittee"
    | "formerPresidents"
    | "formerSecretaries"
    | "lifeMembers"
    | "gallery"
    | "events"
    | "news"
    | "membership"
    | "sponsors"
    | "contact";
}

export const primaryNav: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/history", labelKey: "history" },
  { href: "/activities", labelKey: "activities" },
  { href: "/achievements", labelKey: "achievements" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/news", labelKey: "news" },
  { href: "/events", labelKey: "events" },
  { href: "/contact", labelKey: "contact" },
];

export const aboutNav: NavItem[] = [
  { href: "/management", labelKey: "management" },
  { href: "/executive-committee", labelKey: "executiveCommittee" },
  { href: "/former-presidents", labelKey: "formerPresidents" },
  { href: "/former-secretaries", labelKey: "formerSecretaries" },
  { href: "/life-members", labelKey: "lifeMembers" },
];

export const footerNav: NavItem[] = [
  ...primaryNav.filter((i) => i.href !== "/"),
  ...aboutNav,
  { href: "/membership", labelKey: "membership" },
  { href: "/sponsors", labelKey: "sponsors" },
];
