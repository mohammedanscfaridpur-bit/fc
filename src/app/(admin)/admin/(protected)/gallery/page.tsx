import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.galleryImage.findMany({
    orderBy: resourceConfigs.gallery.defaultOrderBy,
  });

  return (
    <ResourceManager
      resource="gallery"
      title="Gallery Images"
      fields={resourceConfigs.gallery.fields}
      initialRows={rows}
      columns={[
        {
          key: "imageUrl",
          label: "Preview",
          render: (r) => (
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image src={r.imageUrl as string} alt="" fill className="object-cover" />
            </div>
          ),
        },
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
      ]}
    />
  );
}
