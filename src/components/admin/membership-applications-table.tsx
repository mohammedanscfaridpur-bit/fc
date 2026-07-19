"use client";

import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Application {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  address: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

const statusVariant = { PENDING: "gold", APPROVED: "forest", REJECTED: "outline" } as const;

export function MembershipApplicationsTable({ initialRows }: { initialRows: Application[] }) {
  const [rows, setRows] = useState(initialRows);

  async function updateStatus(id: string, status: Application["status"]) {
    try {
      const res = await fetch(`/api/admin/membership-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status.");
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gold-500/20 bg-cream dark:bg-forest-800">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-forest-100 text-forest-800 dark:bg-forest-700 dark:text-cream">
          <tr>
            <th className="px-4 py-3 font-semibold">Applicant</th>
            <th className="px-4 py-3 font-semibold">Contact</th>
            <th className="px-4 py-3 font-semibold">Submitted</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold-500/10">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-ink/50 dark:text-cream/50">
                No applications yet.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-forest-800 dark:text-cream">{r.fullName}</p>
                  <p className="text-xs text-ink/50 dark:text-cream/50">{r.address}</p>
                </td>
                <td className="px-4 py-3 text-xs">
                  <p>{r.phone}</p>
                  <p className="text-ink/50 dark:text-cream/50">{r.email}</p>
                </td>
                <td className="px-4 py-3 text-xs">
                  {format(new Date(r.submittedAt), "d MMM yyyy")}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value as Application["status"])}
                    className="rounded-md border border-gold-500/30 bg-cream-soft px-2 py-1 text-xs dark:bg-forest-900"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
