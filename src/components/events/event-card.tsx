import Image from "next/image";
import { useLocale } from "next-intl";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface EventCardData {
  id: string;
  title: string;
  titleBn: string;
  coverImage?: string | null;
  location?: string | null;
  locationBn?: string | null;
  startDate: Date | string;
  status: "UPCOMING" | "ONGOING" | "PAST";
}

const statusVariant = {
  UPCOMING: "gold",
  ONGOING: "forest",
  PAST: "outline",
} as const;

export function EventCard({ event }: { event: EventCardData }) {
  const locale = useLocale();

  return (
    <Card className="flex gap-4 !p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={event.coverImage || "/images/events/placeholder.jpg"}
          alt={locale === "bn" ? event.titleBn : event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
            {format(new Date(event.startDate), "d MMM yyyy")}
          </p>
          <Badge variant={statusVariant[event.status]}>{event.status}</Badge>
        </div>
        <h3 className="mt-1 truncate font-display text-base text-forest-800 dark:text-cream">
          {locale === "bn" ? event.titleBn : event.title}
        </h3>
        {event.location ? (
          <p className="mt-1 flex items-center gap-1 text-xs text-ink/60 dark:text-cream/60">
            <MapPin size={12} />
            {locale === "bn" ? event.locationBn : event.location}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
