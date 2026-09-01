"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Login failed");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-clay-600/25 bg-white/80 p-8 shadow-sm"
      >
        <h1 className="font-montecarlo text-3xl text-clay-500">Admin Sign In</h1>

        <div>
          <label htmlFor="email" className="mb-1 block font-heading text-xs uppercase tracking-wide text-clay-700/70">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 bg-white px-4 py-2.5 outline-none focus:border-clay-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-heading text-xs uppercase tracking-wide text-clay-700/70">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 bg-white px-4 py-2.5 outline-none focus:border-clay-600"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-clay-700 px-8 py-3 font-heading text-sm uppercase tracking-[0.2em] text-cream-50 transition-colors duration-200 ease-in-out hover:bg-clay-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}