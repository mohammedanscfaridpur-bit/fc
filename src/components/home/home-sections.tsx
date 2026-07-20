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
import { Timeline } from "@/components/history/timeline";
import { PersonCard } from "@/components/committee/person-card";
import { CommitteeGrid } from "@/components/committee/committee-grid";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SponsorGrid } from "@/components/sponsors/sponsor-grid";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export async function HomeSections() {
  const t = await getTranslations();
  const locale = await getLocale();

  const [
    milestones,
    activities,
    achievements,
    leaders,
    committee,
    galleryImages,
    news,
    events,
    sponsors,
    contactInfo,
    lifeMemberCount,
  ] = await Promise.all([
    prisma.historyMilestone.findMany({ orderBy: [{ year: "asc" }, { displayOrder: "asc" }] }),
    prisma.activity.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
    prisma.achievement.findMany({ orderBy: [{ year: "desc" }, { displayOrder: "asc" }], take: 6 }),
    prisma.leadership.findMany({ where: { isCurrent: true }, orderBy: { role: "asc" } }),
    prisma.committeeMember.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
    prisma.galleryImage.findMany({ orderBy: [{ displayOrder: "asc" }, { uploadedAt: "desc" }], take: 8 }),
    prisma.newsPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
    prisma.eventPost.findMany({ orderBy: { startDate: "desc" }, take: 3 }),
    prisma.sponsor.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
    prisma.contactInfo.findUnique({ where: { id: "main" } }),
    prisma.lifeMember.count(),
  ]);

  const stats = [
    { value: "১৯৩৬", label: locale === "bn" ? "প্রতিষ্ঠা সাল" : "Founded" },
    { value: String(lifeMemberCount), label: locale === "bn" ? "আজীবন সদস্য" : "Life Members" },
    { value: String(milestones.length || "—"), label: locale === "bn" ? "গুরুত্বপূর্ণ ঘটনা" : "Milestones" },
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

      {/* History */}
      <section id="history" className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="১৯৩৬ থেকে আজ" title={t("nav.history")} align="center" className="mx-auto" />
          <div className="mt-14">
            {milestones.length > 0 ? (
              <Timeline entries={milestones} />
            ) : (
              <p className="text-center text-ink/50 dark:text-cream/50">
                History content will appear here once added in the admin dashboard.
              </p>
            )}
          </div>
        </Container>
      </section>

      <Container>
        <EmblemDivider />
      </Container>

      {/* Activities */}
      {activities.length > 0 && (
        <section id="activities" className="py-20 md:py-28">
          <Container>
            <SectionHeading title={t("nav.activities")} align="center" className="mx-auto" />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Achievements */}
      <section id="achievements" className="bg-cream-soft py-20 dark:bg-forest-800/30 md:py-28">
        <Container>
          <SectionHeading title={t("nav.achievements")} align="center" className="mx-auto" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => (
              <Card key={a.id} interactive={false}>
                {a.image ? (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                    <Image src={a.image} alt="" fill className="object-cover" />
                  </div>
                ) : null}
                <Badge>{a.year}</Badge>
                <CardTitle className="mt-3">{locale === "bn" ? a.titleBn : a.title}</CardTitle>
                {a.description ? (
                  <CardDescription>
                    {locale === "bn" ? a.descriptionBn : a.description}
                  </CardDescription>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Management: President/Secretary + Committee */}
      <section id="management" className="py-20 md:py-28">
        <Container>
          <SectionHeading title={t("nav.management")} align="center" className="mx-auto" />
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
            {leaders.map((leader) => (
              <PersonCard
                key={leader.id}
                slug={leader.id}
                photo={leader.photo}
                name={leader.name}
                nameBn={leader.nameBn}
                designation={leader.role}
                designationBn={leader.role === "PRESIDENT" ? "সভাপতি" : "সাধারণ সম্পাদক"}
                shortBio={leader.shortBio}
                shortBioBn={leader.shortBioBn}
                readMoreHref={`/management/${leader.role.toLowerCase()}`}
              />
            ))}
          </div>

          {committee.length > 0 && (
            <div className="mt-16">
              <p className="eyebrow mb-8 text-center">{t("nav.executiveCommittee")}</p>
              <CommitteeGrid>
                {committee.map((m) => (
                  <Card key={m.id} interactive={false} className="flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gold-500/50">
                      <Image
                        src={m.photo || "/images/committee/placeholder.jpg"}
                        alt={locale === "bn" ? m.nameBn : m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="mt-4 text-base">
                      {locale === "bn" ? m.nameBn : m.name}
                    </CardTitle>
                    <p className="mt-1 text-sm text-gold-600 dark:text-gold-400">
                      {locale === "bn" ? m.designationBn : m.designation}
                    </p>
                  </Card>
                ))}
              </CommitteeGrid>
            </div>
          )}
        </Container>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-cream-soft py-20 dark:bg-forest-800/30 md:py-28">
        <Container>
          <div className="flex items-center justify-between">
            <SectionHeading title={t("nav.gallery")} />
          </div>
          <div className="mt-10">
            <GalleryGrid items={galleryImages} />
          </div>
        </Container>
      </section>

      {/* News & Events preview */}
      <section id="news-events" className="py-20 md:py-28">
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

      {/* Sponsors */}
      {sponsors.length > 0 && (
        <section id="sponsors" className="bg-cream-soft py-20 dark:bg-forest-800/30 md:py-28">
          <Container>
            <SectionHeading title={t("nav.sponsors")} align="center" className="mx-auto" />
            <div className="mt-14">
              <SponsorGrid sponsors={sponsors} />
            </div>
          </Container>
        </section>
      )}

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

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28">
        <Container>
          <SectionHeading title={t("nav.contact")} align="center" className="mx-auto" />
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-gold-500" size={20} />
                  <span className="text-sm text-ink/80 dark:text-cream/80">
                    {contactInfo ? (locale === "bn" ? contactInfo.addressBn : contactInfo.address) : "—"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="shrink-0 text-gold-500" size={20} />
                  <span className="text-sm text-ink/80 dark:text-cream/80">{contactInfo?.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="shrink-0 text-gold-500" size={20} />
                  <span className="text-sm text-ink/80 dark:text-cream/80">{contactInfo?.email}</span>
                </li>
              </ul>
              <div className="mt-8">
                <MapEmbed src={contactInfo?.mapEmbedUrl} />
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
