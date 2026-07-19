import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";
import { redirect } from "next/navigation";

export default async function AdminCommitteePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.committeeMember.findMany({
    orderBy: resourceConfigs.committee.defaultOrderBy,
  });

  return (
    <ResourceManager
      resource="committee"
      title="Committee Members"
      fields={resourceConfigs.committee.fields}
      initialRows={rows}
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "displayOrder", label: "Order" },
        { key: "isActive", label: "Active", render: (r) => (r.isActive ? "Yes" : "No") },
      ]}
    />
  );
}
