"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AutoForm, type FieldConfig } from "@/components/admin/auto-form";

interface Row {
  id: string;
  [key: string]: unknown;
}

export function ResourceManager({
  resource,
  title,
  columns,
  fields,
  initialRows,
}: {
  resource: string;
  title: string;
  columns: Column<Row>[];
  fields: FieldConfig[];
  initialRows: Row[];
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    setModalOpen(true);
  }

  async function handleSubmit(values: Record<string, unknown>) {
    try {
      const res = await fetch(
        editing ? `/api/admin/${resource}/${editing.id}` : `/api/admin/${resource}`,
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      if (!res.ok) throw new Error();
      const saved = await res.json();

      setRows((prev) =>
        editing ? prev.map((r) => (r.id === saved.id ? saved : r)) : [saved, ...prev],
      );
      setModalOpen(false);
      toast.success(editing ? "Updated successfully" : "Created successfully");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function handleDelete(row: Row) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/${resource}/${row.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete.");
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-2xl text-forest-800 dark:text-cream">{title}</h1>
        <Button onClick={openCreate} size="sm">
          <Plus size={15} /> Add new
        </Button>
      </div>

      <DataTable columns={columns} rows={rows} onEdit={openEdit} onDelete={handleDelete} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit ${title}` : `Add ${title}`}
      >
        <AutoForm
          fields={fields}
          initialValues={editing ?? {}}
          onSubmit={handleSubmit}
          submitLabel={editing ? "Save changes" : "Create"}
        />
      </Modal>
    </div>
  );
}
