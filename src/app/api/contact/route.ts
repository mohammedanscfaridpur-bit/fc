import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactMessageSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject || null,
      message: parsed.data.message,
    },
  });

  // Email delivery — best-effort, does not block or fail the request
  sendContactNotification(parsed.data).catch(() => {});

  return NextResponse.json({ id: message.id }, { status: 201 });
}
