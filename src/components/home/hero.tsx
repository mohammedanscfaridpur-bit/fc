"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-forest-900 text-cream">
      {/* Watermark crest ring, low-opacity, purely atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vw] w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:h-[70vw] sm:w-[70vw]"
      >
        <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
      </div>

      <Container className="relative flex min-h-[88vh] flex-col items-center justify-center py-24 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={item}>
            <Image
              src="/images/logo/logo.png"
              alt={t("site.name")}
              width={96}
              height={96}
              priority
              className="h-24 w-24 drop-shadow-[0_0_24px_rgba(198,160,47,0.25)]"
            />
          </motion.div>

          <motion.p variants={item} className="eyebrow mt-6 text-gold-400">
            {t("site.founded")}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
          >
            {t("site.name")}
          </motion.h1>

          <motion.p variants={item} className="mt-3 text-lg text-gold-300">
            {t("site.location")}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-cream/70 md:text-lg">
            {t("site.tagline")}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/membership">{t("common.applyNow")}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#history">{t("nav.history")}</a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-gold-500/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {t("common.since")} ১৯৩৬ · Faridpur, Bangladesh
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
