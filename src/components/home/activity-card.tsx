import * as LucideIcons from "lucide-react";
import { useLocale } from "next-intl";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export interface ActivityItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon?: string | null;
}

export function ActivityCard({ activity }: { activity: ActivityItem }) {
  const locale = useLocale();
  const IconComp =
    (activity.icon &&
      (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[
        toPascalCase(activity.icon)
      ]) ||
    LucideIcons.Trophy;

  return (
    <Card>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
        <IconComp size={22} />
      </div>
      <CardTitle className="mt-4">
        {locale === "bn" ? activity.titleBn : activity.title}
      </CardTitle>
      <CardDescription>
        {locale === "bn" ? activity.descriptionBn : activity.description}
      </CardDescription>
    </Card>
  );
}

function toPascalCase(kebab: string) {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
