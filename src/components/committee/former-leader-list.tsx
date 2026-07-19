import Image from "next/image";
import { getLocale } from "next-intl/server";

export interface FormerLeaderItem {
  id: string;
  name: string;
  nameBn: string;
  photo?: string | null;
  tenureStart: number;
  tenureEnd?: number | null;
}

export async function FormerLeaderList({ leaders }: { leaders: FormerLeaderItem[] }) {
  const locale = await getLocale();

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {leaders.map((leader) => (
        <div key={leader.id} className="text-center">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-gold-500/40">
            <Image
              src={leader.photo || "/images/committee/placeholder.jpg"}
              alt={locale === "bn" ? leader.nameBn : leader.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-forest-800 dark:text-cream">
            {locale === "bn" ? leader.nameBn : leader.name}
          </p>
          <p className="mt-0.5 text-xs text-gold-600 dark:text-gold-400">
            {leader.tenureStart}–{leader.tenureEnd ?? ""}
          </p>
        </div>
      ))}
    </div>
  );
}
