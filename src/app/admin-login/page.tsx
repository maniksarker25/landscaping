"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin-dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      // Successful login -> navigate to admin dashboard
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Unable to connect to authentication service. Please check your network.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-7 sm:p-8 shadow-xl shadow-slate-200/50">
      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2"
          >
            Admin Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dreamfloor.ae"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.99] transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Quick Info & Security notice */}
      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 text-primary font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          SSL &amp; JWT Encrypted
        </span>
        <Link
          href="/"
          className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          &larr; Back to Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-foreground selection:bg-primary selection:text-white">
      {/* Subtle ambient lighting effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs text-foreground font-medium hover:border-primary/40 transition-colors shadow-sm mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Dream Floor Landscaping</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-display">
            Admin Management
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Secure portal for project gallery &amp; media control
          </p>
        </div>

        {/* Suspense-wrapped login form */}
        <Suspense
          fallback={
            <div className="p-8 rounded-2xl bg-white border border-border flex justify-center items-center shadow-md">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
