# Go Kids — Master Project Plan
**Platform:** Future Readiness Platform for Kids
**Stack:** Next.js 14 (App Router) · Tailwind CSS · ShadCN UI · MongoDB Atlas · Node.js (API Routes)
**Timeline:** 12 Weeks (3 Months)
**Last Updated:** May 2026

---

## Project Overview

Go Kids is being transformed from a static informational website into a **product-led platform** with four core verticals: Assessments, Workshops, Mentor, and Talk. The platform serves three user types — Parents (end users), Instructors/Mentors (content creators), and Admins/SuperAdmins (platform operators). The system must be mobile-first, SEO-optimized, bright, visually exciting for children, and built for scale with a phased feature rollout (free → paid).

---

## Brand Identity & Design System

### Logo
The Go Kids logo (`/public/images/logo/thumbnail.png`) is bold, chunky, yellow-and-black with a comic/playful style. It must be used:
- In the Navbar (left side, ~120px wide)
- In the Footer
- On the PDF report header
- As the favicon (use a cropped square version)
- As the OG image base

**Never alter the logo colours or add filters to it.**

### Colour Palette (FIXED — applies to the entire website, all pages, all dashboards)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#F5C518` | Primary buttons, highlights, active nav, badges, CTA backgrounds |
| `primary-dark` | `#D4A900` | Button hover states, pressed states |
| `black` | `#1A1A1A` | Headlines, logo outlines, body text |
| `teal` | `#2BBCB0` | Secondary accent, cards, icon backgrounds, How It Works steps |
| `coral` | `#F4845F` | Tertiary accent, tag badges, notification dots, warm highlights |
| `sky` | `#4FC3F7` | Info states, age group cards, light backgrounds |
| `white` | `#FFFFFF` | Page backgrounds, card surfaces |
| `off-white` | `#FAFAF8` | Section backgrounds alternating with white |
| `grey-light` | `#F3F4F6` | Input backgrounds, dividers |
| `grey-text` | `#6B7280` | Subheadings, captions, placeholder text |

**No dark mode. No dark backgrounds on any page. The entire site is light, bright, and energetic.**

### Typography
- **Headlines:** `Nunito` (Google Font) — rounded, friendly, bold (700/800 weight)
- **Body:** `Inter` — clean, readable
- Both loaded via `next/font/google`

### Public Image Assets
All images are in `/public/images/` and must be used as specified:

| File | Usage |
|---|---|
| `thumbnail.png` | Logo — Navbar, Footer, PDF header, favicon |
| `hero.jpg` | Hero section background / right-side image (children drawing together, warm classroom light) |
| `programs-1.jpg` | Ages 8–12 "Young Achievers" program card (boy building robot — STEM focus) |
| `programs-2.jpg` | Ages 13–16 "Future Leaders" program card (girl with structured geometry — analytical) |
| `programs-3.jpg` | Ages 4–7 — fallback or a different section as appropriate (Indian girl with book, cheerful) |
| `workshops-banner.jpg` | Workshops section banner / Workshops listing page hero (kids drawing at table, teal classroom) |

All images must be used with `next/image` component (never `<img>`). Use `priority` prop on hero image. Add descriptive `alt` text to all images.

### Animation Guidelines (IMPORTANT — applies to entire website)
The site must feel alive and exciting for children. Use these animation patterns **consistently across all pages**:

**Entry Animations (use Framer Motion or CSS `@keyframes`):**
- Every section fades up on scroll into view (`opacity: 0, y: 20` → `opacity: 1, y: 0`, duration 0.5s, staggered children)
- Cards animate in with a slight scale-up (`scale: 0.95` → `scale: 1`)
- Page transitions: fade in on load

**Hover Interactions:**
- All cards: `transform: translateY(-6px)` + subtle `box-shadow` increase on hover (smooth 0.2s transition)
- All primary buttons: slight scale-up (`scale: 1.04`) + background brightens on hover
- Nav links: animated underline that slides in from left on hover
- Logo: gentle wobble animation on hover (`@keyframes wobble`)

**Delight Animations (section-specific):**
- Hero section: floating soft shapes in background (yellow circles, teal blobs) with slow `@keyframes float` animation (up-down, infinite, slow)
- How It Works steps: numbered circles do a gentle `@keyframes bounce` when scrolled into view
- Stat counters (if used): count-up animation from 0 to value
- CTA buttons: a subtle shimmer/shine sweep effect on the primary yellow button (`@keyframes shimmer`)
- Testimonial carousel: smooth slide transitions, not jarring snaps
- Age group cards: a small sticker/badge element rotates slightly on hover

**Keep animations subtle and performance-friendly:**
- Use `will-change: transform` only where needed
- Prefer CSS transitions over JS where possible
- All animations respect `prefers-reduced-motion` media query (disable animations if user has set this)

---

## Tech Stack & Architecture Decisions

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, ShadCN UI |
| Animation | Framer Motion (scroll animations, page transitions, hover states) |
| Backend | Next.js API Routes (REST), server actions |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | NextAuth.js v5 — email/password + OTP via Nodemailer |
| File Storage | Cloudinary (images, PDFs) |
| Video (Phase 1) | Zoom/Google Meet embed links |
| Video (Phase 2) | Mux or Bunny.net (self-hosted streaming) |
| Payments (Phase 2) | Razorpay (India-first) |
| Email | Resend or Nodemailer |
| PDF Reports | React-PDF (`@react-pdf/renderer`) |
| Fonts | Nunito + Inter via `next/font/google` |
| CMS | Custom Admin Panel |
| Deployment | Vercel + MongoDB Atlas |
| Maps | Google Maps Embed |
| Calendar | react-day-picker + custom availability logic |

---

## Role System

| Role | Access |
|---|---|
| `parent` | Browse, enroll, manage child profiles, view reports, book mentors |
| `instructor` | Create/upload workshops, view enrollments, manage curriculum |
| `mentor` | Manage mentor profile, view/accept bookings, session history |
| `admin` | Manage users, workshops, mentors, content, reports |
| `superadmin` | Full platform control including roles, billing, system config |

---

## Database Schema — High-Level Collections

- `users` — id, name, email, phone, passwordHash, role, isVerified, createdAt
- `children` — id, parentId, name, dob, grade, interests, behaviorNotes
- `assessments` — id, childId, type, status, formData, results, reportUrl, createdAt
- `workshops` — id, title, description, instructorId, ageGroup, skill, level, price, sessions[], curriculum[], reviews[]
- `enrollments` — id, userId, workshopId, status, enrolledAt
- `mentors` — id, userId, expertise[], bio, hourlyRate, availability, ratings[]
- `bookings` — id, parentId, mentorId, dateTime, status, zoomLink, payment
- `talks` — id, title, speakerName, type (live/recorded), scheduledAt, registrants[], recordingUrl
- `reviews` — id, authorId, targetId, targetType, rating, comment
- `otpTokens` — id, userId, token, expiresAt

---

## Weekly Sprint Plan

---

### WEEK 1 — Foundation + Homepage + Basic Login

**Goal:** Scaffold the full project, ship a production-quality homepage using the real brand assets, and wire up basic login/register/OTP.

**Part A — Project Scaffold (~1 day)**

- Next.js 14 project with App Router, TypeScript strict mode
- Install and configure:
  - Tailwind CSS with custom theme tokens (full colour palette from Brand Identity section above)
  - ShadCN UI
  - Framer Motion (`npm install framer-motion`)
  - `next/font/google` — load Nunito (weights 400, 600, 700, 800) and Inter (400, 500, 600)
- MongoDB Atlas connected via Mongoose at `lib/db/connect.ts`
- `.env.local` + `.env.example` with all required variables
- Full folder structure (see below)
- `users` Mongoose model: name, email, phone, passwordHash, role (enum), isEmailVerified, createdAt
- `otpTokens` Mongoose model: userId, tokenHash, expiresAt
- Copy all uploaded images into `/public/images/`:
  - `thumbnail.png` → logo
  - `hero.jpg` → hero section
  - `programs-1.jpg`, `programs-2.jpg`, `programs-3.jpg` → age group cards
  - `workshops-banner.jpg` → workshops section
- Generate `favicon.ico` from the logo (use a yellow square crop of the logo)
- Vercel project connected to GitHub, CI/CD live

**Tailwind Config (`tailwind.config.ts`) — extend colours:**
```js
colors: {
  primary: { DEFAULT: '#F5C518', dark: '#D4A900' },
  teal: '#2BBCB0',
  coral: '#F4845F',
  sky: '#4FC3F7',
  brand: {
    black: '#1A1A1A',
    white: '#FFFFFF',
    offwhite: '#FAFAF8',
    grey: '#F3F4F6',
    'grey-text': '#6B7280',
  }
}
```

**Folder Structure:**
```
/app
  /(public)           → page.tsx (homepage), about, contact, legal
  /(auth)             → login, register, verify-otp, forgot-password
  /(parent)           → dashboard, children, assessments, workshops, bookings
  /(instructor)       → dashboard, workshops
  /(mentor)           → dashboard, bookings
  /(admin)            → dashboard, users, workshops, mentors, talks, assessments
  /(superadmin)       → dashboard, settings, roles
/components
  /ui                 → ShadCN auto-generated components
  /shared             → Navbar, Footer, Cards, Loaders, EmptyState
  /animations         → MotionWrapper, FadeInUp, FloatingShapes, CountUp
  /forms              → Reusable form field components
/lib
  /db                 → connect.ts, models/
  /auth               → authOptions.ts, helpers.ts
  /utils              → format.ts, validation.ts
/public
  /images             → hero.jpg, programs-1.jpg, programs-2.jpg, programs-3.jpg,
                        workshops-banner.jpg, thumbnail.png (logo)
```

**Part B — Homepage (~2–3 days)**

Build `app/(public)/page.tsx`. All content is static for now. Sections in order:

**1. Navbar**
- Sticky, scroll-aware: at top → transparent with white text/logo; after 60px scroll → white background with shadow
- Left: Go Kids logo (`thumbnail.png`, 120px wide, `next/image`, `priority`)
- Center (desktop): nav links — Assessments · Workshops · Mentor · Talk · About · Contact
- Right: "Login" (ghost button) + "Get Started" (primary yellow button, black text, rounded-full)
- Mobile: hamburger → ShadCN Sheet drawer with full nav links + both buttons
- Nav link hover: animated yellow underline slides in from left (CSS `::after` pseudo-element, `transform: scaleX(0→1)`)
- Logo hover: gentle `@keyframes wobble` (slight left-right rotation, 3 keyframes)

**2. Hero Section**
- Two-column layout (desktop): Left = text content, Right = `hero.jpg` with rounded-2xl, slight drop shadow, `priority` loading
- Left content:
  - Small tag above headline: yellow pill badge → "🌟 India's Future Readiness Platform"
  - Headline (Nunito 800, 56px desktop / 36px mobile): *"Prepare Your Child for the Future, Today"*
  - Subheadline (Inter, grey-text): "Assessments, workshops, mentorship, and expert talks — everything your child needs to discover their strengths and thrive."
  - Two CTA buttons: "Start Free Assessment" (primary yellow, black text, large, rounded-full) + "Explore Workshops" (white with black border, rounded-full)
  - Trust row below buttons: 3 small stats — "500+ Kids Assessed · 50+ Workshops · 30+ Expert Mentors" with a dot separator
- Background: soft off-white (`#FAFAF8`) with 3–4 large blurred floating shapes in the background (yellow circle, teal blob, coral blob) using `@keyframes float` (translateY -15px to 15px, 4s infinite alternate, each shape offset timing)
- Mobile: stack vertically, image on top (shorter, 250px height), text below
- Entry animation: headline fades up (Framer Motion `initial={{ opacity:0, y:30 }}` → `animate={{ opacity:1, y:0 }}`), staggered with subheadline and buttons (0.15s stagger)

**3. Four Vertical Cards**
- Section header: "Everything Your Child Needs" (Nunito 700, centred)
- 2×2 grid (desktop), 1 column (mobile)
- Each card: white background, rounded-2xl, border `1px solid #F3F4F6`, generous padding, hover `translateY(-6px)` + shadow
- Card structure: coloured icon background circle (teal/coral/sky/yellow) + Lucide icon (white), title (Nunito 700), description (Inter), "Learn more →" link in brand colour
  - **Assessments** (teal icon bg): "Discover your child's strengths, learning style, and career aptitude through guided psychometric assessments."
  - **Workshops** (coral icon bg): "Skill-building sessions on communication, leadership, creativity, and future-ready careers — live and self-paced."
  - **Mentor** (sky icon bg): "One-on-one sessions with expert educators, psychologists, and career coaches, matched to your child's needs."
  - **Talk** (yellow icon bg): "Expert webinars, panel discussions, and recorded sessions for parents and kids navigating growth and change."
- Section scroll animation: cards stagger in with Framer Motion `useInView` (each card delays by 0.1s × index)

**4. How It Works**
- Section background: `#FAFAF8`
- Centred section header: "How Go Kids Works"
- Three steps in a horizontal row (desktop) / vertical stack (mobile), connected by a dashed yellow line (desktop only, CSS)
- Each step: large numbered circle (yellow background, black number, Nunito 800, 48px) + step title + description
  - Step 1: "Create Your Child's Profile" — "Tell us about your child's interests, strengths, and goals."
  - Step 2: "Discover & Explore" — "Take an assessment, join a workshop, or book a mentor session."
  - Step 3: "Grow & Thrive" — "Get a personalised report, track progress, and unlock your child's potential."
- Number circles: Framer Motion `whileInView` bounce animation (`scale: 0→1.2→1`, spring)

**5. Programs by Age Group**
- Section header: "Programs for Every Age"
- Three cards side by side (desktop) / stacked (mobile):
  - **Ages 4–7 — Early Explorers** → use `programs-3.jpg` (Indian girl with book, cheerful green background). Programs: Creative Arts, Storytelling, Early STEM Play, Social Skills
  - **Ages 8–12 — Young Achievers** → use `programs-1.jpg` (boy building robot with goggles). Programs: Robotics & Coding, Communication Skills, Career Exploration, Leadership Basics
  - **Ages 13–16 — Future Leaders** → use `programs-2.jpg` (girl with geometric structure, mentor). Programs: Career Aptitude Assessment, Public Speaking, Critical Thinking, Mentorship Sessions
- Card design: image fills top half (rounded-t-2xl), content below, age badge (yellow pill, top-left overlay on image), card border, hover lift animation
- Programme tags: small rounded chips in teal/coral/sky

**6. Workshops Banner**
- Full-width section using `workshops-banner.jpg` as background image (children drawing at table, teal classroom)
- Dark overlay (`rgba(0,0,0,0.45)`) over image for text readability
- Centred content: headline "Explore Our Workshops", subline, two buttons: "Browse All Workshops" (yellow) + "View Schedule" (white outline)
- Parallax scroll effect on the background image (CSS `background-attachment: fixed` or Framer Motion scroll)

**7. Testimonials**
- Section background: white
- Section header: "What Parents & Kids Say"
- Horizontal carousel using Embla Carousel (auto-scroll, 3.5s interval, loop)
- 5 static testimonial cards: avatar (initials in coloured circle), name, role (Parent of / Student, Age X), star rating (5 yellow stars), quote text
- Card design: white, rounded-2xl, subtle shadow, yellow left border accent (4px)
- Navigation dots below carousel

**8. Final CTA Strip**
- Background: primary yellow `#F5C518`
- Headline (Nunito 800, black): "Ready to Unlock Your Child's Potential?"
- Subline (Inter, dark grey): "Join 500+ families already building tomorrow's leaders."
- Two buttons: "Book a Free Assessment" (black background, white text, rounded-full) + "Browse Workshops" (white background, black text, rounded-full)
- Background decoration: subtle repeating star/circle pattern (SVG, low opacity, white)

**9. Footer**
- Background: `#1A1A1A` (brand black)
- Top row: Go Kids logo (white/yellow version — CSS filter or a dedicated white logo variant) + tagline
- 4 link columns (white text, yellow hover): Platform (Assessments, Workshops, Mentor, Talk), Company (About, Contact, Careers), Legal (Privacy Policy, Terms), Connect (Instagram, YouTube, LinkedIn links)
- Bottom bar: copyright text, "Made with ❤️ in India"

**Part C — Basic Auth (~1–2 days)**

- `POST /api/auth/register` — name, email, phone, password → bcrypt hash → create user (role=parent, isEmailVerified=false) → generate 6-digit OTP → save hashed OTP to otpTokens (15-min expiry) → send OTP email via Nodemailer
- `POST /api/auth/verify-otp` — validate OTP → mark user verified → delete token
- `POST /api/auth/resend-otp` — regenerate + resend
- NextAuth.js v5 credentials provider — returns session with id, name, email, role
- `middleware.ts` — protects `/parent/*`, `/instructor/*`, `/mentor/*`, `/admin/*`, `/superadmin/*`; redirects unauthenticated to `/login`; redirects by role on successful login
- Register page: name, email, phone, password — React Hook Form + Zod, yellow primary button, Nunito headings, matching brand style
- OTP verify page: 6-digit split input (one box per digit), 60s resend countdown timer, animated checkmark on success
- Login page: email + password, "Forgot password?" link, yellow CTA button
- All auth pages: centered card layout, Go Kids logo at top, bright white background — **no dark mode, no grey backgrounds**
- On login success: redirect parent → `/parent/dashboard` (placeholder "Welcome, [name]" page)

**AI Agent Prompt Focus — Week 1:**
> "Build the Go Kids platform Week 1 deliverable in Next.js 14 App Router with TypeScript, Tailwind CSS, ShadCN UI, and Framer Motion.
>
> **CRITICAL DESIGN RULES:**
> - NO dark mode anywhere. The entire site is bright, white, and energetic.
> - Brand colours: primary yellow `#F5C518`, black `#1A1A1A`, teal `#2BBCB0`, coral `#F4845F`, sky `#4FC3F7`, white `#FFFFFF`, off-white `#FAFAF8`.
> - Fonts: Nunito (headlines, 700/800 weight) + Inter (body) via next/font/google.
> - The Go Kids logo is at `/public/images/thumbnail.png` — use it in Navbar and Footer with next/image. Never alter its colours.
> - All photos are in `/public/images/`: hero.jpg (Hero section right column), programs-1.jpg (Ages 8-12 card), programs-2.jpg (Ages 13-16 card), programs-3.jpg (Ages 4-7 card), workshops-banner.jpg (Workshops banner section). Use next/image for all with descriptive alt text.
> - Add `priority` to the hero image and the logo.
>
> **ANIMATIONS (Framer Motion + CSS):**
> - Background floating shapes in Hero: 3 blurred circles/blobs (yellow, teal, coral) with `@keyframes float` (translateY ±15px, 4s infinite alternate, staggered delays).
> - All sections fade up on scroll into view: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`.
> - Cards: stagger children with 0.1s delay each. Hover: `whileHover={{ y: -6 }}` + CSS box-shadow transition.
> - Primary buttons: `whileHover={{ scale: 1.04 }}` + yellow shimmer sweep `@keyframes shimmer`.
> - Nav links: CSS `::after` yellow underline `transform: scaleX(0→1)` on hover.
> - Logo: `@keyframes wobble` on hover.
> - How It Works number circles: `whileInView={{ scale: [0, 1.2, 1] }}` spring bounce.
> - All animations wrapped in: `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }`
>
> **SCAFFOLD:** Set up MongoDB Atlas connection via Mongoose at lib/db/connect.ts. Create User model and OtpToken model. Configure Tailwind with the full colour palette. Install Framer Motion, next/font/google.
>
> **HOMEPAGE:** Build app/(public)/page.tsx with all 9 sections: (1) scroll-aware Navbar with logo; (2) Hero with hero.jpg, floating background shapes, staggered entry animation; (3) Four vertical product cards with stagger scroll animation; (4) How It Works 3-step with bounce animation; (5) Programs by Age Group using programs-1.jpg, programs-2.jpg, programs-3.jpg; (6) Workshops banner using workshops-banner.jpg with parallax; (7) Testimonials Embla Carousel; (8) Yellow CTA strip; (9) Dark footer with logo. All fully responsive.
>
> **AUTH:** Create POST /api/auth/register, /verify-otp, /resend-otp. Set up NextAuth.js v5 credentials provider. Build /register (split OTP input), /verify-otp (animated success checkmark), /login pages. All auth pages are bright white with brand yellow CTAs. Add middleware.ts for role-based route protection."

---

### WEEK 2 — Auth Completion + Child Profiles

**Goal:** Complete auth edge cases and build child profile management.

**Design consistency:** All parent dashboard pages must follow the same colour system — white backgrounds, yellow primary actions, teal/coral accents, Nunito headings. The sidebar uses white background with yellow active state highlight. No grey or dark sidebars.

**Deliverables:**
- Forgot password flow: request → email token link → reset password page
- Parent dashboard layout: white sidebar, Go Kids logo top-left, nav items with yellow active highlight + left border, user avatar (yellow circle, initials) top-right + logout
- Child Profile CRUD:
  - "My Children" page: child profile cards in a grid (animated in with Framer Motion stagger)
  - Add child form in a ShadCN Dialog: name, DOB (date picker), grade (select), school, interests (multi-select chips in teal/coral/sky), behaviour notes, photo upload (Cloudinary)
  - Edit child, delete child (confirmation dialog with animated warning icon)
  - Empty state if no children: illustrated prompt with yellow CTA "Add Your First Child"
- Hover animations on child cards (lift + shadow)
- `Child` Mongoose model: parentId, name, dob, grade, school, interests[], behaviorNotes, photoUrl
- API: GET/POST `/api/children`, GET/PATCH/DELETE `/api/children/[id]`

**AI Agent Prompt Focus:**
> "Build Week 2 of Go Kids using the established brand system (yellow #F5C518, black #1A1A1A, teal #2BBCB0, coral #F4845F, Nunito + Inter fonts, NO dark mode). Complete auth: forgot-password and reset-password pages and API routes. Build the parent dashboard layout at app/(parent)/layout.tsx — white sidebar with the Go Kids logo, nav links that highlight yellow on active (left yellow border + yellow bg chip), and a user avatar circle in yellow. Build the My Children page with a Framer Motion staggered grid of ChildCard components (white card, rounded-2xl, child photo or coloured initial avatar, name, age, grade, hover lift animation). 'Add Child' opens a ShadCN Dialog with a form: name, date picker, grade select, interests multi-select (coloured chips), behaviour notes, Cloudinary photo upload. Empty state: a friendly illustrated SVG of a child + 'Add Your First Child' yellow button. APIs: GET and POST /api/children (ownership-scoped to session user), PATCH and DELETE /api/children/[id] with ownership check."

---

### WEEK 3 — Assessments: Intake Form + Suggestion Engine

**Goal:** Build the assessment intake flow — the platform's flagship feature.

**Deliverables:**
- Assessments landing page (public `/assessments`): bright hero, 4 assessment type cards (teal/coral/sky/yellow), "Start Assessment" CTA
- Multi-step intake form (parent-only):
  - Step 0: child selector (animated cards, not a plain dropdown)
  - Step A: Academic — subject chips, grade input, strengths
  - Step B: Personality sliders (custom styled, yellow fill, teal track)
  - Step C: Interests grid (emoji + label chips, multi-select, coloured active state)
  - Step D: Parent observations textarea
  - Progress bar (yellow fill, animated width transition)
  - Back/Next navigation, state persisted in `useState`
- Step 2: Suggestion display — recommended assessment types as animated cards
- Step 3: Confirmation (free, payment placeholder)
- Assessment saved to MongoDB on confirm
- Assessment status card in parent dashboard with animated status badge
- `Assessment` Mongoose model

**AI Agent Prompt Focus:**
> "Build Assessments Week 3 for Go Kids — brand rules: yellow primary, white backgrounds, Nunito headings, Framer Motion animations, NO dark mode. Public /assessments landing page: bright hero (yellow gradient or off-white with yellow accent shapes), 4 assessment type cards each in a different brand colour (teal, coral, sky, yellow), 'Start Assessment' CTA. Multi-step form at /parent/assessments/new: animated progress bar (yellow fill, width transition 0.3s), step indicator circles (yellow filled = complete, grey = future). Each step section fades in on enter (Framer Motion AnimatePresence). Step B personality sliders: custom CSS range input — yellow thumb, teal filled track, label at each end. Step C interests: a grid of pill chips with emoji + label; clicking toggles yellow active state with scale animation. Suggestion engine: client-side function taking slider values + interests → returns 1–3 recommended types. Display suggestions as large selectable cards with animated checkmark on selection. POST /api/assessments/create on confirm."

---

### WEEK 4 — Assessments: Results Dashboard + PDF Report

**Goal:** Build result visualisations and downloadable branded PDF report.

**Deliverables:**
- Results dashboard: Radar chart (Recharts, yellow fill), Bar chart (teal/coral bars), strengths badge cards, development areas, recommended next steps
- Animated chart entry: bars grow up, radar draws in (Recharts animation props)
- "Download Report" button → generates PDF
- PDF: Go Kids yellow branded header with logo, child name + assessment type + date, scores table, strengths, development areas, recommendations section, branded footer
- `GET /api/assessments/[id]/report` → generates PDF, uploads to Cloudinary, saves URL, streams back
- Report URL emailed to parent
- Admin result entry form: numeric score inputs per skill dimension

**AI Agent Prompt Focus:**
> "Build Assessment results for Go Kids Week 4. Brand: yellow #F5C518, teal #2BBCB0, coral #F4845F, Nunito headings, white backgrounds, Framer Motion. Results page /parent/assessments/[id]: if status=pending show a cheerful waiting state (animated clock or bouncing dots + yellow status badge). If completed: Recharts RadarChart with 6 axes, `fill='#F5C518'` `fillOpacity=0.4`, stroke `#D4A900`; animated on mount (use Recharts `isAnimationActive={true}`). BarChart below with alternating teal/coral bars. Strengths section: 3 cards each with a coloured icon circle + title + short description, Framer Motion stagger entry. 'Download Report' button (yellow) calls GET /api/assessments/[id]/report. React-PDF report: yellow header band with logo from public/images/thumbnail.png, child name, date, scores as a styled table, strengths list, development areas list, recommendations in a teal-bordered box, footer with Go Kids tagline. Upload generated PDF to Cloudinary and return it as a stream."

---

### WEEK 5 — Workshops: Browse + Course Detail

**Goal:** Build the public Workshops vertical (Udemy-style).

**Deliverables:**
- `/workshops` listing page: hero banner using `workshops-banner.jpg`, grid of WorkshopCards, filter sidebar, search, sort, pagination
- WorkshopCard: thumbnail (next/image), title, instructor, age tag (teal chip), level badge (coral chip), skill tag (sky chip), free badge (yellow), hover lift animation
- `/workshops/[slug]` detail page: tabs (Overview, Curriculum, Instructor, Reviews), sticky yellow enrollment sidebar
- Seed 5 workshops

**AI Agent Prompt Focus:**
> "Build the Workshops section for Go Kids Week 5. Brand: yellow primary, white backgrounds, teal/coral/sky accents, Nunito headings, Framer Motion, NO dark mode. /workshops listing page: hero section with workshops-banner.jpg (next/image, full-width, overlay text 'Explore Our Workshops', yellow CTA). Below: responsive grid of WorkshopCard components. WorkshopCard: white card, rounded-2xl, thumbnail next/image (aspect-ratio 16/9), coloured tag chips (age group=teal, level=coral, skill=sky), yellow 'FREE' badge, instructor name, hover Framer Motion whileHover y:-6 + shadow. Filter sidebar: ShadCN Checkbox groups in teal/yellow, 'Apply Filters' yellow button. Mobile: filter in ShadCN Sheet. /workshops/[slug]: ShadCN Tabs component; Curriculum tab uses ShadCN Accordion with teal left-border per section. Sticky sidebar: white card with drop shadow, yellow 'Enroll Free' button (full width, Framer Motion hover scale). All section entries use Framer Motion useInView fade-up."

---

### WEEK 6 — Workshops: Enrollment + Instructor Dashboard

**Goal:** Enrollment flow and instructor content management.

**Deliverables:**
- Enrollment → parent enrolled workshop view with session list (Zoom/Meet links)
- "My Workshops" tab in parent dashboard
- Instructor dashboard: white sidebar, yellow active states, consistent brand
- Multi-step workshop creation form: basic info + Cloudinary thumbnail + curriculum builder
- Session reordering, publish toggle

**AI Agent Prompt Focus:**
> "Build Workshop enrollment and instructor dashboard for Go Kids Week 6. Brand rules apply throughout: yellow primary, white backgrounds, Nunito, Framer Motion, no dark mode. Enrollment: POST /api/enrollments, duplicate check (409). Parent 'My Workshops' tab: enrolled workshops as cards (same WorkshopCard style), clicking opens session list with date/time chips and a teal Zoom link button. Instructor dashboard /instructor: white sidebar with Go Kids logo, yellow active nav states. 'Create Workshop' multi-step form: Step 1 basic info + Cloudinary thumbnail upload (show preview with next/image on upload); Step 2 curriculum builder — add Section headers (teal bg label), within each add Session rows (title input, type radio styled as pill toggles, link input, date-time picker, duration). Session rows have animated entry (Framer Motion layout animation) and up/down reorder buttons. Step 3: preview card + publish toggle (ShadCN Switch, yellow when on). All form validation React Hook Form + Zod."

---

### WEEK 7 — Mentor Vertical

**Goal:** Full Mentor listing, profile, booking, and mentor dashboard.

**Deliverables:**
- `/mentors` listing: MentorCards with avatar (yellow initial circle or photo), expertise chips, star rating, "Book Session" yellow button
- `/mentors/[id]` profile page
- Booking modal: react-day-picker (yellow selected day), time slot buttons (teal active state)
- Email confirmation on booking
- Mentor dashboard: availability setup, booking management

**AI Agent Prompt Focus:**
> "Build the Mentor section for Go Kids Week 7. Brand: yellow #F5C518, teal #2BBCB0, coral #F4845F, white backgrounds, Nunito, Framer Motion, no dark mode. /mentors listing: Framer Motion stagger grid of MentorCards. MentorCard: white card rounded-2xl, circular avatar (yellow background with white initials as fallback, or photo), name (Nunito 700), expertise tags as teal/coral/sky chips, star rating (yellow stars, Lucide Star filled), short bio truncated to 2 lines, 'Book Session' yellow button (Framer Motion hover scale). Filter sidebar: expertise checkboxes. /mentors/[id]: hero section with avatar large (80px), credentials, expertise chips, reviews list. 'Book a Session' button opens ShadCN Dialog: react-day-picker with yellow selected/today highlight (override calendar CSS variables with brand colours), available time slots as a grid of pill buttons (teal on selected, grey on unavailable). On confirm: POST /api/bookings, show animated success state (green checkmark Framer Motion scale-in + confetti burst using canvas-confetti), send email via Nodemailer. Mentor dashboard /mentor: white sidebar, availability weekly grid (day toggle chips, time pickers), bookings table with status badges."

---

### WEEK 8 — Talk Vertical + About + Contact + Legal

**Goal:** Talk engagement vertical and all remaining public pages.

**Deliverables:**
- `/talk`: upcoming events grid, registration modal, past recordings library, featured speaker
- `/talk/[id]`: countdown timer, speaker bio, registration
- About page: Vision/Mission, team cards with yellow hover border, Why Go Kids
- Contact page: form, Google Maps embed, social links
- Privacy Policy and Terms pages (static)

**AI Agent Prompt Focus:**
> "Build the Talk section and remaining public pages for Go Kids Week 8. Brand: yellow primary, white backgrounds, teal/coral/sky accents, Nunito, Framer Motion, no dark mode. /talk page: hero section (yellow gradient bg, white text, Nunito headline 'Expert Voices for Growing Families'), upcoming events grid — TalkCard (thumbnail next/image, speaker name, date chip in teal, type badge in coral/sky/yellow, 'Register' yellow button), past recordings grid with play button overlay (teal circle with white play icon, Framer Motion hover scale). Registration modal: ShadCN Dialog, name + email form, yellow submit button, animated success tick. /talk/[id]: countdown timer (large numbers in yellow boxes, updating every second with flip animation), speaker bio card (white card, avatar, teal border accent), registration form. /about: Vision + Mission in side-by-side teal/coral accent cards, team grid (white cards, circular photo, name, role, yellow hover border glow). /contact: form with React Hook Form, yellow submit button, Google Maps iframe in rounded container. All Framer Motion useInView fade-up on scroll."

---

### WEEK 9 — Admin Panel

**Goal:** Full admin panel for all content and user management.

**Design note:** Admin panel uses the same brand colours — white backgrounds, yellow primary actions, teal/coral accents. It is professional but consistent with the site. No dark admin theme.

**Deliverables:**
- Admin layout: white sidebar with Go Kids logo, yellow active states
- Dashboard: yellow stat cards, coloured icon backgrounds
- User Management: TanStack Table, role badges in brand colours
- Workshop / Mentor / Talk / Assessment management with approve/reject/edit actions
- Assessment score entry modal

**AI Agent Prompt Focus:**
> "Build the Go Kids admin panel at /admin, protected to admin and superadmin roles. IMPORTANT: use the same brand design system as the main site — white sidebar background, Go Kids logo top-left (thumbnail.png), yellow active nav highlight, Nunito headings, NO dark theme. Dashboard: stat cards with coloured left borders (yellow, teal, coral, sky) and Lucide icons in matching coloured circles. Users page: TanStack Table with role badges as coloured chips (parent=teal, instructor=coral, mentor=sky, admin=yellow, superadmin=black). Per-row ShadCN DropdownMenu: 'Change Role' opens Dialog with role select, 'Suspend' toggles isSuspended. Workshops page: table with status filter tabs (All / Pending / Published / Rejected), approve button (teal), reject button (coral). Assessment management: table, clicking row opens ShadCN Sheet showing formData read-only, 'Enter Results' button opens Dialog with 6 numeric inputs (0–100), yellow 'Save & Mark Complete' button triggers PDF generation. All tables have empty states with friendly SVG illustration + yellow CTA."

---

### WEEK 10 — SuperAdmin Panel + RBAC Hardening

**Goal:** SuperAdmin layer and platform-wide access control hardening.

**Deliverables:**
- SuperAdmin panel: admin management, feature flags, audit log, bulk export
- `requireRole()` utility applied to all API routes
- Ownership checks: instructor→workshop, mentor→booking, parent→children
- `AuditLog` Mongoose model
- Rate limiting on auth routes
- Input sanitisation across all forms

**AI Agent Prompt Focus:**
> "Harden Go Kids RBAC and build the SuperAdmin panel at /superadmin (Week 10). Brand: same system — white background, yellow primary, Nunito, no dark mode. Create lib/auth/requireRole.ts: reads session via getServerSession, throws 403 Response if role not in allowedRoles[]. Apply to every existing API route. Add ownership checks. Create AuditLog Mongoose model (actorId, actorRole, action, targetCollection, targetId, metadata, timestamp). Build /superadmin: Admins table (role badges, promote/demote/delete actions), Feature Flags page (ShadCN Switch components, yellow when on, stored in Settings MongoDB document — flags: paymentsEnabled, assessmentsEnabled, workshopsEnabled, mentorEnabled, talkEnabled), Audit Log table (last 100 entries, actor name, action string, target, timestamp). Add rate limiting to /api/auth/login and /api/auth/register (upstash/ratelimit or in-memory). Strip HTML from all string inputs server-side using a sanitize() helper before DB writes."

---

### WEEK 11 — Polish, SEO, Performance, Accessibility

**Goal:** Production-quality finalization.

**Deliverables:**
- `generateMetadata()` on every page with title, description, OG image
- `next-sitemap` → sitemap.xml + robots.txt
- JSON-LD: Organization schema (homepage), Course schema (workshops)
- `next/image` with sizes + blurDataURL placeholders throughout
- Lazy loading below-fold sections, `revalidate` cache tags
- Lighthouse 90+ target
- ARIA labels, focus rings (yellow outline, matching brand), keyboard nav
- Skeleton loaders (yellow shimmer animation) for all data-fetching pages
- Empty states with illustrated SVGs
- ShadCN Sonner toast (yellow accent for success, coral for error)
- Styled HTML email templates (branded yellow header)
- MongoDB Atlas indexes
- README.md

**AI Agent Prompt Focus:**
> "Finalize Go Kids for production Week 11. Add generateMetadata() to every page with title '[Page] | Go Kids', description, and canonical URL. For OG images use Next.js ImageResponse with yellow background and Go Kids logo. Set up next-sitemap. Add JSON-LD Organization schema on homepage and Course schema on each workshop page. Replace all remaining img tags with next/image. Add Suspense boundaries with Skeleton components — skeleton cards use a `@keyframes shimmer` animation with a yellow-tinted gradient sweep (not grey). Focus rings: `outline: 2px solid #F5C518; outline-offset: 2px` — add to Tailwind config as `ring-primary`. Wire ShadCN Sonner toaster: success toasts have yellow left border, error toasts have coral left border. Build HTML email templates: branded yellow top header band with logo, clean white body, dark footer. Add MongoDB indexes: unique on users.email, compound on assessments(childId, status), index on enrollments(userId, workshopId), index on bookings(mentorId, dateTime). Run next build and fix all TypeScript errors."

---

### WEEK 12 — Integration QA, Mobile Testing & Launch

**Goal:** End-to-end QA, bug fixes, production deploy.

**Deliverables:**
- Full user journey QA across all 5 roles
- Mobile QA at 375px, 390px, 768px, 1280px
- Cross-browser: Chrome, Safari, Firefox, Samsung Internet
- All animations verified working (and disabled for `prefers-reduced-motion`)
- All images loading correctly with next/image (no broken images, correct aspect ratios)
- Logo appearing correctly in all contexts (navbar, footer, PDF, email)
- Custom domain `gokids.co.in` configured on Vercel
- Final Lighthouse audit — 90+ on homepage, workshops, assessment pages
- Vercel Analytics / GA4 added
- All console errors resolved, production build clean

**AI Agent Prompt Focus:**
> "Perform final QA and launch prep for Go Kids Week 12. Go through every user journey and fix issues: (1) Parent register → OTP verify → login → add child → start assessment → enroll workshop → book mentor. (2) Instructor login → create workshop → publish → view enrollments. (3) Mentor login → set availability → manage booking. (4) Admin: approve workshop → enter assessment results → manage users. (5) SuperAdmin: toggle feature flag → change role → view audit log. For the homepage: verify all images (hero.jpg, programs-1.jpg, programs-2.jpg, programs-3.jpg, workshops-banner.jpg, thumbnail.png) load correctly with next/image, correct alt text, no layout shift. Verify all Framer Motion animations play on scroll and hover, and are disabled when prefers-reduced-motion is set. Verify the colour system is consistent: no dark backgrounds on any page, yellow primary buttons everywhere, Nunito headings throughout. Run next build — fix all TypeScript errors and warnings. Configure custom domain gokids.co.in on Vercel. Add Vercel Analytics. Final Lighthouse: target 90+ performance, 100 accessibility, 100 best practices."

---

## Phase 2 Roadmap (Post-Launch — Months 4–6)

- **Razorpay payment integration** for workshops + mentor bookings
- **Self-hosted video streaming** via Mux or Bunny.net
- **AI-powered assessment scoring** (rule engine → ML)
- **Community discussion boards** under Talk
- **Push notifications** (web push)
- **Mobile app** (React Native / Expo)
- **Affiliate/referral system**
- **Certificate generation** for completed workshops

---

## Week-by-Week Summary Table

| Week | Focus | Key Output |
|---|---|---|
| 1 | Foundation + Homepage + Basic Login | Scaffold, full homepage with real assets + animations, register/login/OTP |
| 2 | Auth Completion + Child Profiles | Forgot password, parent dashboard, child profile CRUD |
| 3 | Assessments (Input) | Multi-step intake form, suggestion engine, assessment dashboard |
| 4 | Assessments (Output) | Results charts, PDF report generation |
| 5 | Workshops (Browse) | Listing page with workshops-banner.jpg, filters, course detail |
| 6 | Workshops (Enroll + Instructor) | Enrollment flow, instructor dashboard + workshop builder |
| 7 | Mentor | Listing, profile, booking calendar, mentor dashboard |
| 8 | Talk + Static Pages | Talk events, recordings, About, Contact, Legal |
| 9 | Admin Panel | Full admin CRUD for all verticals + stats |
| 10 | SuperAdmin + RBAC Hardening | SuperAdmin panel, access hardening, rate limiting, audit log |
| 11 | Polish + SEO + Performance | SEO, Lighthouse 90+, accessibility, email templates, skeletons |
| 12 | QA + Launch | End-to-end QA, mobile testing, production deploy, gokids.co.in |

---

## Notes for AI Code Agents

Each week's prompt is self-contained but agents must always be provided:
1. **Tech Stack** section
2. **Brand Identity & Design System** section (colours, fonts, images, animations) — **READ THIS EVERY TIME**
3. **MongoDB Schema** section
4. **Role System** table
5. That week's **"AI Agent Prompt Focus"** block
6. Model definitions from prior weeks that the current week depends on

**Non-negotiable conventions across all agents:**
- `app/api/[resource]/route.ts` for all API routes
- Mongoose for all DB — never raw MongoDB driver
- ShadCN components as base primitives
- React Hook Form + Zod for all forms
- `getServerSession(authOptions)` for all protected routes
- TypeScript strict mode
- API responses: `{ success: boolean, data?: any, error?: string }`
- Brand colours: yellow `#F5C518`, black `#1A1A1A`, teal `#2BBCB0`, coral `#F4845F`, sky `#4FC3F7`
- **NO dark mode. NO dark backgrounds. Light, bright, and child-friendly always.**
- Framer Motion for scroll animations, hover states, and page transitions
- All images via `next/image`, logo from `/public/images/thumbnail.png`
