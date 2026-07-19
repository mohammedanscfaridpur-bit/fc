"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-900 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold-500/20 bg-forest-800/60 p-8 text-cream">
        <div className="flex flex-col items-center">
          <Image src="/images/logo/logo.png" alt="Club crest" width={56} height={56} />
          <h1 className="mt-4 font-display text-xl">Admin Login</h1>
          <p className="text-xs text-cream/50">Mohammeda Sporting Club, Faridpur</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-cream/80">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gold-500/30 bg-forest-900 px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-cream/80">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gold-500/30 bg-forest-900 px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            />
          </div>
          {error ? <p className="text-xs text-red-400">{error}</p> : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
