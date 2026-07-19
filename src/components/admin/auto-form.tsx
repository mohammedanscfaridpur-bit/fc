"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "checkbox" | "select" | "image";
  required?: boolean;
  options?: { value: string; label: string }[];
}

const fieldClass =
  "w-full rounded-lg border border-gold-500/30 bg-cream-soft px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:bg-forest-900 dark:text-cream";
const labelClass = "mb-1 block text-xs font-medium text-ink/70 dark:text-cream/70";

export function AutoForm({
  fields,
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: {
  fields: FieldConfig[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues ?? {});
  const [submitting, setSubmitting] = useState(false);

  function setValue(key: string, val: unknown) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className={labelClass}>
            {f.label}
            {f.required ? " *" : ""}
          </label>
          {f.type === "textarea" ? (
            <textarea
              rows={3}
              required={f.required}
              className={fieldClass}
              value={(values[f.key] as string) ?? ""}
              onChange={(e) => setValue(f.key, e.target.value)}
            />
          ) : f.type === "checkbox" ? (
            <input
              type="checkbox"
              checked={Boolean(values[f.key])}
              onChange={(e) => setValue(f.key, e.target.checked)}
              className="h-4 w-4"
            />
          ) : f.type === "select" ? (
            <select
              required={f.required}
              className={fieldClass}
              value={(values[f.key] as string) ?? ""}
              onChange={(e) => setValue(f.key, e.target.value)}
            >
              <option value="" disabled>
                Select...
              </option>
              {f.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : f.type === "image" ? (
            <ImageUploadField
              value={(values[f.key] as string) ?? ""}
              onChange={(url) => setValue(f.key, url)}
            />
          ) : (
            <input
              type={f.type}
              required={f.required}
              className={fieldClass}
              value={(values[f.key] as string | number) ?? ""}
              onChange={(e) => setValue(f.key, e.target.value)}
            />
          )}
        </div>
      ))}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-14 w-14 rounded-lg object-cover" />
      ) : null}
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="text-xs"
      />
      {uploading && <span className="text-xs text-ink/50">Uploading...</span>}
    </div>
  );
}
