"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  UserCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing / Pro Plans" },
];

function getDashboardRoute(role?: string) {
  switch (role) {
    case "student":
      return "/dashboard/student";
    case "tutor":
      return "/dashboard/tutor";
    case "admin":
      return "/dashboard/admin";
    default:
      return "/dashboard";
  }
}

function getRoleBadgeStyle(role?: string) {
  switch (role) {
    case "student":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
    case "tutor":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
    case "admin":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300";
  }
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Don't render public navbar on dashboard routes (dashboard has its own layout)
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#020617]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center p-1.5 shadow-2xs shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="MentorLagbe Logo"
              width={34}
              height={34}
              className="h-6 sm:h-7 w-auto object-contain rounded-md"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              Mentor<span className="text-amber-500">Lagbe</span>
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-1">
              Smart Tuition & Mentorship
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors group ${
                  isActive
                    ? "text-blue-600 dark:text-orange-500 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full bg-blue-600 dark:bg-orange-500"
                      : "w-0 group-hover:w-full bg-blue-600 dark:bg-orange-500"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle + Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {/* Reusable Theme Toggle */}
          <ThemeToggle />

          {/* Unauthenticated State: Show Sign In & Sign Up */}
          {!user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/sign-in"
                className="px-4 sm:px-5 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-xs transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            /* Authenticated State: Avatar, Name & Role Badge, Dropdown */
            <div className="flex items-center gap-3">
              {/* Role Badge */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${getRoleBadgeStyle(
                    user.role as string
                  )}`}
                >
                  {user.role || "User"}
                </span>
                {user.plan === "pro" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5" /> PRO
                  </span>
                )}
              </div>

              {/* User Dropdown Menu using Shadcn UI */}
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full ring-2 ring-transparent focus:ring-amber-500 outline-none cursor-pointer">
                  <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs">
                      {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1.5">
                  <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-1.5">
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(getDashboardRoute(user.role as string))}
                    className="flex items-center gap-2 cursor-pointer w-full py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="flex items-center gap-2 cursor-pointer w-full py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <UserCircle className="w-4 h-4 text-slate-500" />
                    <span>Update Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    variant="destructive"
                    className="flex items-center gap-2 cursor-pointer py-1.5 px-2 rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-orange-500 bg-blue-50/60 dark:bg-orange-950/30 font-semibold"
                      : "text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="bg-amber-100 text-amber-800 text-xs font-bold">
                        {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {user.name}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize border ${getRoleBadgeStyle(
                      user.role as string
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <Link
                    href={getDashboardRoute(user.role as string)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <UserCircle className="w-4 h-4 text-slate-500" />
                    <span>Update Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
