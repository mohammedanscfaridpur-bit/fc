"use client";

import { X } from "lucide-react";
import * as React from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 dark:bg-forest-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg text-forest-800 dark:text-cream">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-ink/50 hover:bg-forest-100 dark:text-cream/50 dark:hover:bg-forest-700"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
