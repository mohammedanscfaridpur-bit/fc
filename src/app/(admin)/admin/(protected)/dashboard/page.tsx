import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Inbox, Newspaper, CalendarDays, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [newsCount, eventCount, committeeCount, pendingApplications] = await Promise.all([
    prisma.newsPost.count(),
    prisma.eventPost.count(),
    prisma.committeeMember.count(),
    prisma.membershipApplication.count({ where: { status: "PENDING" } }),
  ]);

  const cards = [
    { label: "News posts", value: newsCount, icon: Newspaper },
    { label: "Events", value: eventCount, icon: CalendarDays },
    { label: "Committee members", value: committeeCount, icon: Users },
    { label: "Pending applications", value: pendingApplications, icon: Inbox },
  ];

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl text-forest-800 dark:text-cream">Dashboard</h1>
      <p className="mb-8 text-sm text-ink/60 dark:text-cream/60">
        Welcome back, {session.user?.name}.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-xl border border-gold-500/20 bg-cream p-5 dark:bg-forest-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                <Icon size={18} />
              </div>
              <p className="mt-4 font-display text-2xl text-forest-800 dark:text-cream">
                {c.value}
              </p>
              <p className="text-xs text-ink/60 dark:text-cream/60">{c.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
