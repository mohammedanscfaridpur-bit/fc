import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status = String(body.status ?? "PENDING");

  const updated = await prisma.membershipApplication.update({
    where: { id },
    data: {
      status: status as "PENDING" | "APPROVED" | "REJECTED",
      reviewedAt: new Date(),
      reviewNote: body.reviewNote ? String(body.reviewNote) : undefined,
    },
  });

  return NextResponse.json(updated);
}
