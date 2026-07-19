"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { contactMessageSchema, type ContactMessageInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full rounded-lg border border-gold-500/30 bg-cream-soft px-4 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold-500 dark:bg-forest-800 dark:text-cream";
const labelClass = "mb-1.5 block text-sm font-medium text-ink/80 dark:text-cream/80";

export function ContactForm() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageInput>({ resolver: zodResolver(contactMessageSchema) });

  async function onSubmit(data: ContactMessageInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-cream-soft p-8 text-center dark:bg-forest-800">
        <p className="font-display text-xl text-forest-800 dark:text-cream">Thank you!</p>
        <p className="mt-2 text-sm text-ink/70 dark:text-cream/70">
          We've received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div>
        <label className={labelClass}>Name *</label>
        <input className={fieldClass} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input type="email" className={fieldClass} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input className={fieldClass} {...register("phone")} />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <input className={fieldClass} {...register("subject")} />
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea rows={5} className={fieldClass} {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("common.loading") : t("common.submit")}
      </Button>
    </form>
  );
}
