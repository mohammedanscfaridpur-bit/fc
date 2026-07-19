import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { EventCard } from "@/components/events/event-card";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  const events = await prisma.eventPost.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading title={t("events")} align="center" className="mx-auto" />
      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Container>
  );
}
