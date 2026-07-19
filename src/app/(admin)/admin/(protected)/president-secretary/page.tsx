import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LeadershipManager } from "@/components/admin/leadership-manager";

export default async function AdminPresidentSecretaryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.leadership.findMany({
    where: { isCurrent: true },
    orderBy: { role: "asc" },
  });

  return <LeadershipManager initialRows={rows} />;
}
