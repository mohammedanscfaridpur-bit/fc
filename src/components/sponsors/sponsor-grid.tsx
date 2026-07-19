import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export interface SponsorItem {
  id: string;
  name: string;
  logo: string;
  website?: string | null;
  tier: "TITLE" | "GOLD" | "SILVER" | "PARTNER";
}

const tierOrder = ["TITLE", "GOLD", "SILVER", "PARTNER"] as const;
const tierLabel: Record<(typeof tierOrder)[number], { en: string; bn: string; size: string }> = {
  TITLE: { en: "Title Sponsor", bn: "টাইটেল স্পনসর", size: "h-24 w-48" },
  GOLD: { en: "Gold Sponsors", bn: "গোল্ড স্পনসর", size: "h-16 w-32" },
  SILVER: { en: "Silver Sponsors", bn: "সিলভার স্পনসর", size: "h-14 w-28" },
  PARTNER: { en: "Partners", bn: "পার্টনার", size: "h-12 w-24" },
};

export function SponsorGrid({ sponsors }: { sponsors: SponsorItem[] }) {
  const locale = useLocale();

  return (
    <div className="space-y-14">
      {tierOrder.map((tier) => {
        const group = sponsors.filter((s) => s.tier === tier);
        if (group.length === 0) return null;
        const label = tierLabel[tier];

        return (
          <div key={tier} className="text-center">
            <p className="eyebrow mb-6">{locale === "bn" ? label.bn : label.en}</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {group.map((sponsor) => {
                const logo = (
                  <div
                    className={`relative ${label.size} grayscale transition-all hover:grayscale-0`}
                  >
                    <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                  </div>
                );
                return sponsor.website ? (
                  <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noreferrer">
                    {logo}
                  </a>
                ) : (
                  <div key={sponsor.id}>{logo}</div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
