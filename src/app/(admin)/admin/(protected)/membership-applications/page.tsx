import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MembershipApplicationsTable } from "@/components/admin/membership-applications-table";

export default async function AdminMembershipApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await prisma.membershipApplication.findMany({
    orderBy: { submittedAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-5 font-display text-2xl text-forest-800 dark:text-cream">
        Membership Applications
      </h1>
      <MembershipApplicationsTable initialRows={JSON.parse(JSON.stringify(rows))} />
    </div>
  );
}
