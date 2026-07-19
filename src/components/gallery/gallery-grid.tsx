"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title?: string | null;
  titleBn?: string | null;
  category?: string | null;
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const locale = useLocale();
  const [index, setIndex] = useState(-1);

  const slides = items.map((item) => ({
    src: item.imageUrl,
    alt: locale === "bn" ? item.titleBn ?? "" : item.title ?? "",
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl hairline-gold"
          >
            <Image
              src={item.imageUrl}
              alt={locale === "bn" ? item.titleBn ?? "" : item.title ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-forest-900/0 transition-colors group-hover:bg-forest-900/20" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
