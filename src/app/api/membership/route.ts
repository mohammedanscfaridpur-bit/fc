import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { membershipApplicationSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = membershipApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const application = await prisma.membershipApplication.create({
    data: {
      fullName: parsed.data.fullName,
      fatherOrGuardianName: parsed.data.fatherOrGuardianName || null,
      dateOfBirth: parsed.data.dateOfBirth ? new Date(parsed.data.dateOfBirth) : null,
      address: parsed.data.address,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      occupation: parsed.data.occupation || null,
      message: parsed.data.message || null,
    },
  });

  return NextResponse.json({ id: application.id }, { status: 201 });
}
