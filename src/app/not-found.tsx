import React from "react";
import Link from "next/link";
import {
  Home,
  Search,
  BookOpen,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | MentorLagbe",
  description:
    "The page you are looking for does not exist or has been moved. Explore verified tuitions or return to homepage.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-12 right-12 w-72 h-72 bg-amber-500/5 blur-2xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-12 left-12 w-80 h-80 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-3xl mx-auto text-center space-y-10">
        {/* Top Floating Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Error 404 • Destination Not Found</span>
        </div>

        {/* Big Stylized 404 Display */}
        <div className="relative select-none py-2">
          <div className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter leading-none bg-gradient-to-b from-slate-900 via-slate-800 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-600 bg-clip-text text-transparent opacity-90 drop-shadow-sm">
            404
          </div>
          {/* Floating Interactive Micro-Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-2xl backdrop-blur-md bg-background/80 border border-border shadow-lg flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500 animate-spin [animation-duration:15s]" />
            <span className="text-xs font-black text-foreground">
              Off the Learning Path
            </span>
          </div>
        </div>

        {/* Core Heading & Message */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
            Looks like this page took a detour!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The link you followed may be broken, the tuition post could have been removed, or the URL address was mistyped. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Live Search Bar to Quick-Find Tuitions */}
        <div className="max-w-md mx-auto">
          <form
            action="/browse-tuitions"
            method="GET"
            className="relative flex items-center shadow-md hover:shadow-lg transition-shadow rounded-2xl bg-card border border-border overflow-hidden p-1.5 group focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20"
          >
            <Search className="w-4 h-4 text-muted-foreground ml-3 shrink-0 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              name="search"
              placeholder="Search subjects, class, or tutors..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Search
            </button>
          </form>
        </div>

        {/* 3 Modern Interactive Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left pt-2">
          {/* Card 1: Homepage */}
          <Link
            href="/"
            className="group p-5 rounded-2xl bg-card/80 hover:bg-card border border-border/80 hover:border-amber-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-sm text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>Homepage</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                Return to the main landing page and platform features.
              </p>
            </div>
          </Link>

          {/* Card 2: Browse Tuitions */}
          <Link
            href="/browse-tuitions"
            className="group p-5 rounded-2xl bg-card/80 hover:bg-card border border-border/80 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-sm text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Browse Tuitions</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                Find verified tutors and admission batches near you.
              </p>
            </div>
          </Link>

          {/* Card 3: User Dashboard */}
          <Link
            href="/dashboard"
            className="group p-5 rounded-2xl bg-card/80 hover:bg-card border border-border/80 hover:border-purple-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-sm text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                <span>My Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                Access your student or tutor applications and profile.
              </p>
            </div>
          </Link>
        </div>

        {/* Minimal Footer Links */}
        <div className="pt-4 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/pricing"
            className="hover:text-foreground hover:underline transition-colors font-medium"
          >
            Pro Pricing Plans
          </Link>
          <span className="text-muted-foreground/40">•</span>
          <Link
            href="/sign-in"
            className="hover:text-foreground hover:underline transition-colors font-medium"
          >
            Sign In to Account
          </Link>
          <span className="text-muted-foreground/40">•</span>
          <Link
            href="/sign-up"
            className="hover:text-foreground hover:underline transition-colors font-medium"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </main>
  );
}
