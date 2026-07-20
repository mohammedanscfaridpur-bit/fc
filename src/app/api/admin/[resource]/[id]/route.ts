import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs, isResourceKey } from "@/lib/admin-resources";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  if (!isResourceKey(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }
  const config = resourceConfigs[resource];

  const body = await req.json().catch(() => ({}));
  const data = config.parse(body);

  // @ts-expect-error dynamic delegate access — model name is validated via resourceConfigs
  const updated = await prisma[config.model].update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  if (!isResourceKey(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }
  const config = resourceConfigs[resource];

  // @ts-expect-error dynamic delegate access — model name is validated via resourceConfigs
  await prisma[config.model].delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
