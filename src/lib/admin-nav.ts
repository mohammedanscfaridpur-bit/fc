import {
  LayoutDashboard,
  Users,
  UserCog,
  Newspaper,
  CalendarDays,
  Images,
  Activity,
  HandCoins,
  Phone,
  Inbox,
} from "lucide-react";

export const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/president-secretary", label: "President & Secretary", icon: UserCog },
  { href: "/admin/committee", label: "Committee Members", icon: Users },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/activities", label: "Activities", icon: Activity },
  { href: "/admin/sponsors", label: "Sponsors", icon: HandCoins },
  { href: "/admin/contact-info", label: "Contact Info", icon: Phone },
  { href: "/admin/membership-applications", label: "Membership Applications", icon: Inbox },
];
