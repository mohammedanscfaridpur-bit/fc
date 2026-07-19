export function MapEmbed({ src }: { src?: string | null }) {
  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-gold-500/30 bg-cream-soft text-sm text-ink/50 dark:bg-forest-800 dark:text-cream/50">
        Map will appear here once configured in the admin dashboard.
      </div>
    );
  }

  return (
    <iframe
      src={src}
      loading="lazy"
      className="aspect-video w-full rounded-2xl border border-gold-500/30"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
