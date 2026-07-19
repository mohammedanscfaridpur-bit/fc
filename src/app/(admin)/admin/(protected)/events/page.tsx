import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.eventPost.findMany({ orderBy: resourceConfigs.events.defaultOrderBy });

  return (
    <ResourceManager
      resource="events"
      title="Events"
      fields={resourceConfigs.events.fields}
      initialRows={rows}
      columns={[
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        {
          key: "startDate",
          label: "Start date",
          render: (r) => new Date(r.startDate as string).toLocaleDateString(),
        },
      ]}
    />
  );
}
