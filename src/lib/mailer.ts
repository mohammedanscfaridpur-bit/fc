import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendContactNotification(params: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}) {
  const t = getTransporter();
  const to = process.env.CONTACT_RECEIVER_EMAIL;
  if (!t || !to) return; // SMTP not configured — skip silently, message is still saved to DB

  await t.sendMail({
    from: `"${process.env.NEXT_PUBLIC_SITE_NAME}" <${process.env.SMTP_USER}>`,
    to,
    replyTo: params.email,
    subject: params.subject || `New contact message from ${params.name}`,
    text: params.message,
  });
}
