"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  membershipApplicationSchema,
  type MembershipApplicationInput,
} from "@/lib/validators";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full rounded-lg border border-gold-500/30 bg-cream-soft px-4 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold-500 dark:bg-forest-800 dark:text-cream";
const labelClass = "mb-1.5 block text-sm font-medium text-ink/80 dark:text-cream/80";

export function MembershipForm() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MembershipApplicationInput>({
    resolver: zodResolver(membershipApplicationSchema),
  });

  async function onSubmit(data: MembershipApplicationInput) {
    try {
      const res = await fetch("/api/membership", {
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
        <p className="font-display text-xl text-forest-800 dark:text-cream">
          {t("common.applyNow")} ✓
        </p>
        <p className="mt-2 text-sm text-ink/70 dark:text-cream/70">
          Thank you — your application has been received. Our committee will
          contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass}>Full name *</label>
        <input className={fieldClass} {...register("fullName")} />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Father / Guardian name</label>
        <input className={fieldClass} {...register("fatherOrGuardianName")} />
      </div>

      <div>
        <label className={labelClass}>Date of birth</label>
        <input type="date" className={fieldClass} {...register("dateOfBirth")} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Address *</label>
        <textarea rows={3} className={fieldClass} {...register("address")} />
        {errors.address && (
          <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Phone *</label>
        <input className={fieldClass} {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input type="email" className={fieldClass} {...register("email")} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Occupation</label>
        <input className={fieldClass} {...register("occupation")} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Message</label>
        <textarea rows={3} className={fieldClass} {...register("message")} />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? t("common.loading") : t("common.submit")}
        </Button>
      </div>
    </form>
  );
}
