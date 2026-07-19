import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminSponsorsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.sponsor.findMany({
    orderBy: resourceConfigs.sponsors.defaultOrderBy,
  });

  return (
    <ResourceManager
      resource="sponsors"
      title="Sponsors"
      fields={resourceConfigs.sponsors.fields}
      initialRows={rows}
      columns={[
        { key: "name", label: "Name" },
        { key: "tier", label: "Tier" },
        { key: "isActive", label: "Active", render: (r) => (r.isActive ? "Yes" : "No") },
      ]}
    />
  );
}
