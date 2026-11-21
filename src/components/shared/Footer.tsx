"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

const POPULAR_SUBJECTS = [
  { name: "Mathematics", href: "/browse-tuitions?subject=Mathematics" },
  { name: "Physics", href: "/browse-tuitions?subject=Physics" },
  { name: "Chemistry", href: "/browse-tuitions?subject=Chemistry" },
  { name: "Biology", href: "/browse-tuitions?subject=Biology" },
  { name: "Programming", href: "/browse-tuitions?subject=Programming" },
  { name: "English & IELTS", href: "/browse-tuitions?subject=IELTS" },
  { name: "Accounting", href: "/browse-tuitions?subject=Accounting" },
];

const PLATFORM_LINKS = [
  { name: "Browse Approved Tuitions", href: "/browse-tuitions" },
  { name: "Pricing & Pro Plans", href: "/pricing" },
  { name: "Student Dashboard", href: "/dashboard/student" },
  { name: "Post a Tuition Batch", href: "/dashboard/tutor/post-tuition" },
  { name: "Become a Verified Tutor", href: "/sign-up" },
  { name: "Account Sign In", href: "/sign-in" },
];

const TRUST_POINTS = [
  "100% Admin-Verified Tutors",
  "Free Student Applications",
  "Zero Commission on Tuition Fees",
  "Encrypted Stripe Payments",
  "Transparent Monthly Schedules",
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Hide footer on dashboard routes to keep portal layout clean
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
    toast.success("Thank you for subscribing to tuition alerts!");
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 relative overflow-hidden">
      {/* Top subtle ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-72 w-full max-w-7xl -translate-x-1/2 opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.4) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
       

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pt-4">
          {/* Column 1 (Spans 2 cols): Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center p-1.5 shrink-0 shadow-xs transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="MentorLagbe Logo"
                  width={34}
                  height={34}
                  className="h-7 w-auto object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Mentor<span className="text-amber-500">Lagbe</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                  Smart Tuition & Mentorship
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Bangladesh&apos;s smart mentorship platform connecting ambitious learners with verified university educators for 1-on-1 home tuitions and structured online batches.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@mentorlagbe.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+880 1700-000000 (Helpline 9AM - 10PM)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Subjects */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Top Subjects
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {POPULAR_SUBJECTS.map((subject) => (
                <li key={subject.name}>
                  <Link
                    href={subject.href}
                    className="hover:text-amber-400 hover:translate-x-1 transition-all inline-block"
                  >
                    {subject.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform & Portals */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & Transparency */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Trust & Quality
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Stripe Secured</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Pro payments processed with 256-bit SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MentorLagbe. All rights reserved.</p>

          <p className="flex items-center gap-1 text-center sm:text-right">
            <span>Crafted for ambitious learners & mentors across Bangladesh</span>
          </p>

          <div className="flex items-center gap-4">
            <Link href="/browse-tuitions" className="hover:text-slate-300 transition-colors">
              Directory
            </Link>
            <Link href="/pricing" className="hover:text-slate-300 transition-colors">
              Plans
            </Link>
            <Link href="/sign-in" className="hover:text-slate-300 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
