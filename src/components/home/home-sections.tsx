import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EmblemDivider } from "@/components/shared/emblem-divider";
import { ActivityCard } from "@/components/home/activity-card";
import { NewsCard } from "@/components/news/news-card";
import { EventCard } from "@/components/events/event-card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export async function HomeSections() {
  const t = await getTranslations();
  const locale = await getLocale();

  const [activities, news, events, lifeMemberCount, milestoneCount] = await Promise.all([
    prisma.activity.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" }, take: 3 }),
    prisma.newsPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
    prisma.eventPost.findMany({ orderBy: { startDate: "desc" }, take: 3 }),
    prisma.lifeMember.count(),
    prisma.historyMilestone.count(),
  ]);

  const stats = [
    { value: "১৯৩৬", label: locale === "bn" ? "প্রতিষ্ঠা সাল" : "Founded" },
    { value: String(lifeMemberCount), label: locale === "bn" ? "আজীবন সদস্য" : "Life Members" },
    { value: String(milestoneCount || "—"), label: locale === "bn" ? "গুরুত্বপূর্ণ ঘটনা" : "Milestones" },
  ];

  return (
    <>
      {/* Stats strip */}
      <section className="bg-forest-800 py-12 text-cream">
        <Container className="grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl text-gold-400 md:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Activities highlight */}
      {activities.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow={t("nav.activities")} title={t("nav.activities")} />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {activities.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container>
        <EmblemDivider />
      </Container>

      {/* News & Events preview */}
      <section className="py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <SectionHeading title={t("nav.news")} />
              <Link href="/news" className="text-sm font-semibold text-forest-700 dark:text-gold-300">
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {news.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <SectionHeading title={t("nav.events")} />
              <Link href="/events" className="text-sm font-semibold text-forest-700 dark:text-gold-300">
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="mt-8 space-y-4">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Membership CTA */}
      <section className="bg-forest-900 py-20 text-center text-cream">
        <Container>
          <p className="eyebrow text-gold-400">{t("site.founded")}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t("common.applyNow")}</h2>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/membership">{t("common.applyNow")}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
