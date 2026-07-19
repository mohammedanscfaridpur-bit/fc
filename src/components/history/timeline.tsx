"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";

export interface TimelineEntry {
  id: string;
  year: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  image?: string | null;
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const locale = useLocale();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-4 top-0 h-full w-px bg-gold-500/30 md:left-1/2"
      />
      <ol className="space-y-16">
        {entries.map((entry, i) => {
          const isEven = i % 2 === 0;
          return (
            <li key={entry.id} className="relative grid gap-6 md:grid-cols-2 md:gap-12">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="absolute left-4 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold-500 bg-cream dark:bg-forest-900 md:left-1/2"
              />

              <motion.div
                initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`pl-10 md:pl-0 ${isEven ? "md:col-start-1 md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
              >
                <p className="font-display text-2xl text-gold-600 dark:text-gold-400">
                  {entry.year}
                </p>
                <h3 className="mt-1 font-display text-xl text-forest-800 dark:text-cream">
                  {locale === "bn" ? entry.titleBn : entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                  {locale === "bn" ? entry.descriptionBn : entry.description}
                </p>
                {entry.image ? (
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-xl hairline-gold">
                    <Image src={entry.image} alt="" fill className="object-cover" />
                  </div>
                ) : null}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
