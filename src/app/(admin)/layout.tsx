import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Toaster } from "sonner";
import { AuthSessionProvider } from "@/components/admin/session-provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Admin — Mohammeda Sporting Club, Faridpur",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="bg-cream-soft text-ink dark:bg-forest-900 dark:text-cream">
        <AuthSessionProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
