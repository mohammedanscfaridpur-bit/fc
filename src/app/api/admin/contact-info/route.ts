import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));

  const updated = await prisma.contactInfo.upsert({
    where: { id: "main" },
    update: {
      address: String(body.address ?? ""),
      addressBn: String(body.addressBn ?? ""),
      phone: String(body.phone ?? ""),
      alternatePhone: body.alternatePhone ? String(body.alternatePhone) : null,
      email: String(body.email ?? ""),
      mapEmbedUrl: body.mapEmbedUrl ? String(body.mapEmbedUrl) : null,
      facebookUrl: body.facebookUrl ? String(body.facebookUrl) : null,
      youtubeUrl: body.youtubeUrl ? String(body.youtubeUrl) : null,
      instagramUrl: body.instagramUrl ? String(body.instagramUrl) : null,
      officeHours: body.officeHours ? String(body.officeHours) : null,
      officeHoursBn: body.officeHoursBn ? String(body.officeHoursBn) : null,
    },
    create: {
      id: "main",
      address: String(body.address ?? ""),
      addressBn: String(body.addressBn ?? ""),
      phone: String(body.phone ?? ""),
      email: String(body.email ?? ""),
    },
  });

  return NextResponse.json(updated);
}
