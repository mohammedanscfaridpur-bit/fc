"use client";

import { toast } from "sonner";
import { AutoForm, type FieldConfig } from "@/components/admin/auto-form";

const fields: FieldConfig[] = [
  { key: "address", label: "Address (English)", type: "textarea", required: true },
  { key: "addressBn", label: "Address (বাংলা)", type: "textarea", required: true },
  { key: "phone", label: "Phone", type: "text", required: true },
  { key: "alternatePhone", label: "Alternate phone", type: "text" },
  { key: "email", label: "Email", type: "text", required: true },
  { key: "mapEmbedUrl", label: "Google Map embed URL", type: "text" },
  { key: "facebookUrl", label: "Facebook URL", type: "text" },
  { key: "youtubeUrl", label: "YouTube URL", type: "text" },
  { key: "instagramUrl", label: "Instagram URL", type: "text" },
  { key: "officeHours", label: "Office hours (English)", type: "text" },
  { key: "officeHoursBn", label: "Office hours (বাংলা)", type: "text" },
];

export function ContactInfoForm({
  initialValues,
}: {
  initialValues: Record<string, unknown>;
}) {
  async function handleSubmit(values: Record<string, unknown>) {
    try {
      const res = await fetch("/api/admin/contact-info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success("Contact information updated");
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <AutoForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save changes" />
  );
}
