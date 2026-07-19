import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resourceConfigs } from "@/lib/admin-resources";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = resourceConfigs[resource];
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  // @ts-expect-error dynamic delegate access — model name is validated via resourceConfigs
  const rows = await prisma[config.model].findMany({ orderBy: config.defaultOrderBy });
  return NextResponse.json(rows);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = resourceConfigs[resource];
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const data = config.parse(body);

  // @ts-expect-error dynamic delegate access — model name is validated via resourceConfigs
  const created = await prisma[config.model].create({ data });
  return NextResponse.json(created, { status: 201 });
}
