"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { AutoForm, type FieldConfig } from "@/components/admin/auto-form";

interface LeadershipRow {
  id: string;
  role: "PRESIDENT" | "SECRETARY";
  name: string;
  nameBn: string;
  photo: string | null;
  shortBio: string;
  shortBioBn: string;
  fullBio: string | null;
  fullBioBn: string | null;
}

const fields: FieldConfig[] = [
  { key: "name", label: "Name (English)", type: "text", required: true },
  { key: "nameBn", label: "Name (বাংলা)", type: "text", required: true },
  { key: "photo", label: "Photo", type: "image" },
  { key: "shortBio", label: "Short bio (English, shown on card)", type: "textarea", required: true },
  { key: "shortBioBn", label: "Short bio (বাংলা)", type: "textarea", required: true },
  { key: "fullBio", label: "Full bio (English, shown on Read More page)", type: "textarea" },
  { key: "fullBioBn", label: "Full bio (বাংলা)", type: "textarea" },
];

export function LeadershipManager({ initialRows }: { initialRows: LeadershipRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [editing, setEditing] = useState<LeadershipRow | null>(null);

  async function handleSubmit(values: Record<string, unknown>) {
    if (!editing) return;
    try {
      const res = await fetch(`/api/admin/leadership/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setRows((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
      setEditing(null);
      toast.success("Updated successfully");
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div>
      <h1 className="mb-5 font-display text-2xl text-forest-800 dark:text-cream">
        President & Secretary
      </h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-gold-500/20 bg-cream p-5 dark:bg-forest-800"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gold-500/40">
                <Image
                  src={row.photo || "/images/committee/placeholder.jpg"}
                  alt={row.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
                  {row.role}
                </p>
                <p className="font-display text-lg text-forest-800 dark:text-cream">{row.name}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-ink/60 dark:text-cream/60">
              {row.shortBio}
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => setEditing(row)}>
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Edit ${editing?.role ?? ""}`}>
        {editing && (
          <AutoForm
  fields={fields}
  initialValues={editing as unknown as Record<string, unknown>}
  onSubmit={handleSubmit}
/>
        )}
      </Modal>
    </div>
  );
}
