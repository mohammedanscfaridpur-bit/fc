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

  const updated = await prisma.leadership.update({
    where: { id },
    data: {
      name: String(body.name ?? ""),
      nameBn: String(body.nameBn ?? ""),
      photo: body.photo ? String(body.photo) : null,
      shortBio: String(body.shortBio ?? ""),
      shortBioBn: String(body.shortBioBn ?? ""),
      fullBio: body.fullBio ? String(body.fullBio) : null,
      fullBioBn: body.fullBioBn ? String(body.fullBioBn) : null,
    },
  });

  return NextResponse.json(updated);
}
