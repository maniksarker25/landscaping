"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Images,
  LogOut,
  ExternalLink,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("admin@dreamfloor.ae");

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin-login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user?.email) {
          setAdminEmail(data.user.email);
        }
      })
      .catch(() => {
        router.push("/admin-login");
      });
  }, [router]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      setLoggingOut(true);
      try {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin-login");
        router.refresh();
      } catch (err) {
        console.error("Logout failed:", err);
        setLoggingOut(false);
      }
    }
  };

  const navItems = [
    {
      label: "Project Gallery",
      href: "/admin-dashboard",
      icon: Images,
      badge: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight text-foreground font-display leading-tight">
                  Dream Floor
                </span>
                <span className="text-[10px] text-primary font-semibold tracking-wider uppercase">
                  Admin Workspace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-border">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{item.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                      Live
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:text-primary bg-white hover:bg-slate-50 border border-border transition-all shadow-2xs"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>

            {/* Admin Profile Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 border border-border text-xs text-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                A
              </div>
              <span className="max-w-[140px] truncate font-medium text-muted-foreground">
                {adminEmail}
              </span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all disabled:opacity-50"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top duration-150">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold border border-primary/20"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {item.label}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Live
                  </span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">{adminEmail}</span>
              <Link
                href="/"
                target="_blank"
                className="text-primary font-medium flex items-center gap-1"
              >
                Website &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Minimal Light Footer */}
      <footer className="border-t border-border bg-white py-4 text-center text-xs text-muted-foreground">
        Dream Floor Landscaping &copy; {new Date().getFullYear()} &bull; Admin Management Portal
      </footer>
    </div>
  );
}
