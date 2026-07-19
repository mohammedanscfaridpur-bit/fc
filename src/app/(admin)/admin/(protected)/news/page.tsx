import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminNewsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.newsPost.findMany({ orderBy: resourceConfigs.news.defaultOrderBy });

  return (
    <ResourceManager
      resource="news"
      title="News"
      fields={resourceConfigs.news.fields}
      initialRows={rows}
      columns={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "isPublished", label: "Published", render: (r) => (r.isPublished ? "Yes" : "No") },
      ]}
    />
  );
}
