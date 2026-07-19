import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminActivitiesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.activity.findMany({
    orderBy: resourceConfigs.activities.defaultOrderBy,
  });

  return (
    <ResourceManager
      resource="activities"
      title="Activities"
      fields={resourceConfigs.activities.fields}
      initialRows={rows}
      columns={[
        { key: "title", label: "Title" },
        { key: "displayOrder", label: "Order" },
        { key: "isActive", label: "Active", render: (r) => (r.isActive ? "Yes" : "No") },
      ]}
    />
  );
}
