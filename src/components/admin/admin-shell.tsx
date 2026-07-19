"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/lib/admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {adminNav.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-forest-700 hover:text-cream",
              active && "bg-gold-500 text-forest-900 hover:bg-gold-500 hover:text-forest-900",
            )}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-gold-500/10 bg-forest-900 text-cream lg:flex">
        <div className="flex items-center gap-3 border-b border-gold-500/10 p-5">
          <Image src="/images/logo/logo.png" alt="Club crest" width={36} height={36} />
          <span className="font-display text-sm leading-tight">
            Mohammedan SC
            <br />
            <span className="text-xs text-gold-400">Admin Dashboard</span>
          </span>
        </div>
        {nav}
        <div className="border-t border-gold-500/10 p-4">
          <p className="truncate text-xs text-cream/50">{session?.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-2 flex items-center gap-2 text-sm text-cream/70 hover:text-gold-400"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex bg-forest-900 text-cream lg:hidden">
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between border-b border-gold-500/10 p-5">
              <span className="font-display text-sm">Mohammedan SC Admin</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gold-500/10 bg-cream px-5 dark:bg-forest-800 lg:justify-end">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="text-sm text-ink/60 dark:text-cream/60">
            Welcome, {session?.user?.name ?? "Admin"}
          </span>
        </header>
        <main className="flex-1 bg-cream-soft p-6 dark:bg-forest-900 md:p-8">{children}</main>
      </div>
    </div>
  );
}
