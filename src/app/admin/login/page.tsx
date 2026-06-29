// File: src/app/admin/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center px-4 font-sans">
      <title>Admin Login — DCCC Cultural Fiesta 2026</title>
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/[0.06] p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Golden Line at the top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C05A46] via-[#C8963E] to-[#C05A46]" />

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-black tracking-[0.4em] text-[#C8963E] uppercase mb-2">
            Dhaka College Cultural Club
          </p>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Fiesta <span className="text-[#C05A46]">Portal</span>
          </h1>
          <p className="text-white/40 text-xs mt-1 font-mono">Admin Authentication Gate</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 mb-6 uppercase font-bold tracking-wider text-center animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-black tracking-widest text-[#C8963E] uppercase mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C8963E] focus:ring-1 focus:ring-[#C8963E] transition-all disabled:opacity-50"
              placeholder="admin@dccc.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-[10px] font-black tracking-widest text-[#C8963E] uppercase mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C8963E] focus:ring-1 focus:ring-[#C8963E] transition-all disabled:opacity-50"
              placeholder="••••••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C05A46] hover:bg-[#a64836] border border-[#C05A46] text-white py-3 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-[10px] text-white/30 hover:text-white transition-colors tracking-widest uppercase"
          >
            ← Return to main site
          </a>
        </div>
      </div>
    </div>
  );
}
