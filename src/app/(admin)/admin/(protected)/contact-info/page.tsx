import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ContactInfoForm } from "@/components/admin/contact-info-form";

export default async function AdminContactInfoPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const info = await prisma.contactInfo.findUnique({ where: { id: "main" } });

  return (
    <div className="max-w-xl">
      <h1 className="mb-5 font-display text-2xl text-forest-800 dark:text-cream">
        Contact Information
      </h1>
      <ContactInfoForm initialValues={info ?? {}} />
    </div>
  );
}
