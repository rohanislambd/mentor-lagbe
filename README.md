# 🎓 MentorLagbe — Smart Mentorship & Tuition Ecosystem in Bangladesh

[![Live Demo](https://img.shields.io/badge/Live_Demo-mentor--lagbe--xi.vercel.app-amber?style=for-the-badge&logo=vercel)](https://mentor-lagbe-xi.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-purple?style=for-the-badge)](https://better-auth.com/)

---

## 📌 Project Overview & Purpose

**MentorLagbe** is a comprehensive, production-grade tuition matching and academic mentorship marketplace tailored specifically for students and educators across Bangladesh. 

Finding reliable, verified home tutors and structured online batches in Bangladesh has traditionally been disorganized and fragmented. MentorLagbe solves this by bridging the gap between verified subject specialists and students through:
- **Quality-Controlled Moderation:** No tuition post goes live without administrative verification.
- **Role-Based Workspaces:** Dedicated, strictly isolated dashboards for **Students**, **Tutors**, and **Admins**.
- **Transparent Academic Matching:** Multi-parameter search and filtering by class level, subject, location, monthly fee budget, and tuition mode (Online vs Home Tutoring).
- **Stripe Subscription Integration:** Instant Pro-tier upgrades providing verified badges and priority listing placement.

---

## 🔗 Quick Links & Repositories

| Resource | URL |
|---|---|
| **🌐 Live Application** | [https://mentor-lagbe-xi.vercel.app/](https://mentor-lagbe-xi.vercel.app/) |
| **⚙️ Backend Server Repository** | [https://github.com/rohanislambd/mentor-lagbe-server](https://github.com/rohanislambd/mentor-lagbe-server) |

---

## 🔐 Role-Based Access & Scopes

The platform provides dedicated, strictly protected workspace environments for each user type:

| Role | Permissions & Scope |
|:---:|---|
| 👑 **Administrator** | Full platform analytics, user role management, tuition post moderation (Approve/Reject), Stripe subscription transaction records. |
| 👨‍🏫 **Tutor** | Create tuition postings, track admin review status, review incoming student applications, upgrade to Pro Tutor ($15). |
| 🎓 **Student** | Browse verified tuitions, apply for batches, track admission progress, upgrade to Pro Student ($10). |

> 💡 *Users can sign up directly selecting their preferred role (Student or Tutor), or sign in with Google OAuth.*

---

## ✨ Project Highlights

* **⚡ Ultra-Modern Next.js 16 + React 19 Architecture:** Built with the latest App Router, React Server Components (RSC), and Turbopack compiler.
* **🛡️ Bulletproof Role-Based Access Control (RBAC):** Middleware and server-side layout guards protecting `/dashboard/admin`, `/dashboard/tutor`, and `/dashboard/student` against cross-role navigation.
* **🔒 Enterprise Password Validation:** Real-time 4-bar strength meter enforcing uppercase, lowercase, numbers, and special characters with live checklist UI.
* **💳 Seamless Stripe Payment Gateway:** Secure subscription checkout updating user tier from `free` to `pro` with instant verified badge activation.
* **📱 Responsive & Accessible UI:** Pixel-perfect adaptive layouts across Mobile, Tablet (`md:`), and Desktop screens with native Dark/Light theme switching.
* **⚡ Zero-CLS Loading States:** Custom skeleton loading screens across all dashboard sub-routes for smooth visual transitions.

---

## 🎯 Key Features by Role

### 🌐 Public Visitors & Students
- **Dynamic Hero Section:** Live platform statistics displaying verified tutors and active student counts.
- **Browse & Filter Tuitions:** Multi-criteria search filter (search keywords, class level, subject, mode, fee range, sorting).
- **Tuition Details & One-Click Apply:** Detailed tuition page showing teacher credentials, monthly fee, schedule, and interactive application modal.
- **Student Dashboard:** Track applied batches, review acceptance/rejection statuses, and upgrade to Pro Student for priority placement.

### 👨‍🏫 Tutors & Mentors
- **Tuition Creation Flow:** Post 1-on-1 home tuitions or online group batches with banner image upload, subject tags, and fees.
- **My Tuitions Tracking:** Live status badges (`Pending`, `Approved`, `Rejected`) with edit and delete capabilities.
- **Applicant Review Center:** View student applications with contact details, accept or reject student admissions with one click.
- **Pro Membership:** Unlock unlimited posts and prominent search placement.

### 👑 Administrators
- **Platform Analytics Overview:** Real-time KPI summary cards (Total Users, Registered Tutors, Pending vs Approved Listings, Total Stripe USD Revenue).
- **Tuition Moderation Table:** Moderation desk to inspect detailed tuition postings, approve verified listings, or reject substandard posts.
- **User Management Desk:** View all registered accounts and promote/demote user roles (`student` ↔ `tutor` ↔ `admin`).
- **Transaction History:** Audit log of all completed Stripe subscription payments with customer details and billing timestamps.

---

## 🛠️ Technologies Used

### Frontend & UI
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Dynamic Rendering)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & `tw-animate-css`
- **UI Primitives:** `@base-ui/react`, Shadcn UI, Embla Carousel (`embla-carousel-react`)
- **Visual Analytics:** [Recharts](https://recharts.org/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

### Authentication & Database
- **Auth Provider:** [Better-Auth](https://better-auth.com/) (`better-auth`, `@better-auth/mongo-adapter`)
- **Strategy:** JWT + Session Cookie Cache
- **Social Login:** Google OAuth 2.0
- **Database Driver:** [MongoDB Node.js Driver](https://www.mongodb.com/) (`mongodb: ^7.9.0`)
- **Image Hosting:** ImgBB API

### Backend Integration & Infrastructure
- **Server:** Node.js, Express REST API ([mentor-lagbe-server](https://github.com/rohanislambd/mentor-lagbe-server))
- **Payments:** Stripe API (Checkout Sessions & Webhooks)
- **Hosting Platform:** [Vercel](https://vercel.com/) (Serverless Lambda Functions)

---

## 📂 Project Structure

```text
mentor-lagbe/
├── public/                         # Static assets (logo, banners, icons)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Authentication route group
│   │   │   ├── sign-in/            # Sign in with email/password & Google
│   │   │   └── sign-up/            # Role-selected registration & password strength
│   │   ├── api/auth/[...all]/      # Better-Auth serverless endpoint handler
│   │   ├── browse-tuitions/        # Public tuition directory with query filters
│   │   │   └── [id]/               # Single tuition dynamic details & apply modal
│   │   ├── dashboard/              # Protected dashboard workspace
│   │   │   ├── layout.tsx          # Dashboard shell with Sidebar & Topbar
│   │   │   ├── admin/              # Admin workspace (Stats, Users, Tuitions, Transactions)
│   │   │   ├── tutor/              # Tutor workspace (Post Tuition, My Tuitions, Applicants)
│   │   │   └── student/            # Student workspace (My Applications, Saved Batches)
│   │   ├── payment/                # Stripe checkout, success & cancel redirect pages
│   │   ├── unauthorized/           # Cross-role guard deflection page
│   │   ├── layout.tsx              # Root HTML & Global Theme Provider
│   │   └── page.tsx                # Homepage (Hero, Featured, Categories, HowItWorks)
│   ├── components/                 # Reusable UI component modules
│   │   ├── dashboard/              # Shared dashboard sidebar, menus, and stat cards
│   │   │   ├── admin/              # Moderation tables, transaction lists, user actions
│   │   │   └── profile/            # User avatar and bio editing forms
│   │   ├── home/                   # Homepage sections (Hero, Featured, Pricing)
│   │   ├── shared/                 # Navbar, Footer, ThemeToggle
│   │   ├── tuitions/               # Search filters, tuition cards, application modal
│   │   └── ui/                     # Shadcn / Base UI primitive components
│   ├── lib/                        # Core application utilities
│   │   ├── actions api/            # Server-side mutation handlers
│   │   ├── api/                    # Server-side data fetching services (admin, tuitions, home)
│   │   ├── common/                 # Server token extractors (getTokenServer)
│   │   ├── utils/                  # Password strength validators, styling helpers (cn)
│   │   ├── auth.ts                 # Better-Auth server configuration & MongoDB adapter
│   │   └── auth-client.ts          # Better-Auth client hooks (useSession, signIn, signUp)
│   └── teype/                      # Shared TypeScript data models and interfaces
├── .env.example                    # Environment configuration template
├── package.json                    # Project dependencies and build scripts
└── tsconfig.json                   # TypeScript compiler configuration
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/rohanislambd/mentor-lagbe.git
cd mentor-lagbe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mentor-lagbe?retryWrites=true&w=majority

# Google OAuth (Optional for Social Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Upload
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imgbb_api_key

# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=https://mentor-lagbe-server.vercel.app
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Real Engineering Case Study: Solving Vercel Serverless Crash

### 🔴 The Problem
While the application worked seamlessly in the local development environment, deploying to Vercel production led to recurrent, critical 500 page crashes across all role-based dashboards (`/dashboard/admin`, `/dashboard/tutor`, `/dashboard/student`):
```text
This page couldn’t load
A server error occurred. Reload to try again.
```
In the Vercel Runtime Logs, the following error was consistently thrown on every request:
```text
MongoTopologyClosedError: Topology is closed at [Symbol.asyncIterator].next (<anonymous>) { digest: '915220102' }
```

### 🪤 The Trap: Chasing the Symptom
Seeing `MongoTopologyClosedError`, the natural assumption was that the MongoDB connection or Atlas network configuration was failing. Significant time was spent on:
1. Repeatedly checking MongoDB Atlas Network Access and confirming `0.0.0.0/0` IP whitelisting.
2. Modifying transaction and replica set parameters inside `@better-auth/mongo-adapter`.
3. Adding artificial socket timeouts (`serverSelectionTimeoutMS: 5000`) to the driver options.

However, the crashes persisted—because the root problem was not at the database infrastructure level.

### 🔎 The Discovery & Root Cause
Deep analysis of Next.js's internal error digest (`digest: '915220102'`) revealed the actual failure mechanism:

1. **Server-Side Session Overload in Shared UI (`DashboardSidebar.tsx`):**
   Originally, `DashboardSidebar` was an `async` Server Component executing direct database queries via `auth.api.getSession({ headers: await headers() })` on every route change:
   ```tsx
   // ❌ Before: Server Component querying MongoDB on every layout render
   const session = await auth.api.getSession({
     headers: await headers(),
   });
   ```
   In Vercel serverless environments, when containers idle, open database TCP sockets are dropped. When a container unfreezes, running concurrent server-side database queries across `Layout`, `Sidebar`, and Page components overwhelmed the connection pool, marking the MongoDB driver topology as closed (`MongoTopologyClosedError`) and crashing the entire page.

2. **UI Role Hydration Race Condition:**
   Because session fetching occurred on the server with arbitrary latency, the sidebar frequently fell back to default `"User"` and `"Student"` states before the real role arrived, requiring users to manually hard-refresh.

### ✅ The Clean Solution: Server Component vs. Client Component Best Practices

Depending on where session data is needed, both approaches are completely valid when implemented with the correct engineering practices:

#### 1. In Server Components (Pages, Layouts, SSR Endpoints)
If you need session authentication directly on the server (for example, in server-rendered `page.tsx` for route access checks or database queries), **`auth.api.getSession()` can be used, BUT it MUST always be wrapped inside a `try...catch` block**:

```tsx
// ✅ If Server Component: CAN be used, but MUST have a try...catch boundary
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Session retrieval error:", error);
    // Graceful fallback or safe redirection without bringing down the whole page
  }

  // Safe checks with error boundaries
}
```
> **Why?** In Vercel serverless environments, any brief network fluctuation or cold-start timeout without `try...catch` immediately triggers an unhandled promise rejection, taking down the entire route with a fatal 500 error digest crash.

---

#### 2. In Shared Layout Components (Sidebars, Menus, Topbars)
For persistent UI components that stay mounted during navigation (like `DashboardSidebar`), migrating to a **Client Component using Better-Auth's reactive `useSession()`** is the superior architectural choice:

```tsx
// ✅ If Client Component UI: Decoupled useSession() with strict loading gate
"use client";

import { authClient } from "@/lib/auth-client";

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role as "admin" | "tutor" | "student" | undefined;

  // Render clean skeleton loader until the verified role arrives
  if (isPending || !role) {
    return <SidebarLoadingSkeleton />;
  }

  return (
    <Sidebar>
      {/* Exact role menu rendered without server database dependencies */}
      <DashboardMenu role={role} />
    </Sidebar>
  );
}
```

1. **Zero Database Pressure on Serverless:** The sidebar reads session state directly from browser-managed secure cookies without making extra database queries on every navigation, completely eliminating `MongoTopologyClosedError` from the UI layout.
2. **Strict Loading Boundary:** The `if (isPending || !role)` gate prevents premature fallback renders. The sidebar shows a neat skeleton until the authenticated role is verified, eliminating wrong role flashes.
3. **Decoupled Architecture:** Separated presentation state (sidebar navigation & active role tabs) from server-side data fetching, resulting in instantaneous page transitions and zero Vercel crashes.

### 🎓 Key Personal Learnings
- **Choose the Right Component Boundary:** Heavy data queries belong on the server, but persistent layout elements (like navigation sidebars and headers) thrive as Client Components powered by `useSession()`. This isolates UI rendering from serverless database lifecycle quirks.
- **Distinguish Symptoms from Root Causes:** An error message describes *what broke*, not necessarily *what triggered the failure*. The database driver closed because too many serverless components were hammering the same idle connection simultaneously.
- **Eliminate Premature Fallbacks:** Never fall back to a default role (`|| "student"`) while authentication is still in-flight. Always hold the UI in a skeleton loading state until the real role is confirmed.

---

## 👨‍💻 Author

**Rohan Islam**  
- **GitHub:** [@rohanislambd](https://github.com/rohanislambd)  
- **Live Application:** [MentorLagbe](https://mentor-lagbe-xi.vercel.app/)  
- **Backend Repository:** [mentor-lagbe-server](https://github.com/rohanislambd/mentor-lagbe-server)

---
*Built with passion, clean code, and resilience.*
