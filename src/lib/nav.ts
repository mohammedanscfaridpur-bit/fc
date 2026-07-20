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
  /** true = jump to a section on the one-page home instead of navigating to a route */
  isAnchor?: boolean;
}

// Sections that live on the single scrolling home page
export const primaryNav: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/#history", labelKey: "history", isAnchor: true },
  { href: "/#activities", labelKey: "activities", isAnchor: true },
  { href: "/#achievements", labelKey: "achievements", isAnchor: true },
  { href: "/#management", labelKey: "management", isAnchor: true },
  { href: "/#gallery", labelKey: "gallery", isAnchor: true },
  { href: "/#news-events", labelKey: "news", isAnchor: true },
  { href: "/#contact", labelKey: "contact", isAnchor: true },
];

// Pages that still live on their own route (lists too long / forms / detail pages)
export const moreNav: NavItem[] = [
  { href: "/membership", labelKey: "membership" },
  { href: "/former-presidents", labelKey: "formerPresidents" },
  { href: "/former-secretaries", labelKey: "formerSecretaries" },
  { href: "/life-members", labelKey: "lifeMembers" },
];

export const footerNav: NavItem[] = [...primaryNav.filter((i) => i.href !== "/"), ...moreNav];
