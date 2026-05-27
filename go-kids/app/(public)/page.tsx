"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ClipboardList,
  BookOpen,
  Users,
  Mic2,
  Star,
  ChevronLeft,
  ChevronRight, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import FloatingShapes from "@/components/animations/FloatingShapes";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  BounceIn,
} from "@/components/animations/MotionWrapper";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Custom Social Icons (Lucide-react doesn't export brand icons)
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Data ──────────────────────────────────────────────────────────
// TODO Week 2+: update hrefs to real routes once built
const verticals = [
  {
    id: "assessments",
    icon: ClipboardList,
    title: "Assessments",
    description:
      "Discover your child's strengths, learning style, and career aptitude through guided psychometric assessments.",
    color: "#2BBCB0",
    href: "/register",
  },
  {
    id: "workshops",
    icon: BookOpen,
    title: "Workshops",
    description:
      "Skill-building sessions on communication, leadership, creativity, and future-ready careers — live and self-paced.",
    color: "#F4845F",
    href: "/register",
  },
  {
    id: "mentor",
    icon: Users,
    title: "Mentor",
    description:
      "One-on-one sessions with expert educators, psychologists, and career coaches, matched to your child's needs.",
    color: "#4FC3F7",
    href: "/register",
  },
  {
    id: "talk",
    icon: Mic2,
    title: "Talk",
    description:
      "Expert webinars, panel discussions, and recorded sessions for parents and kids navigating growth and change.",
    color: "#F5C518",
    href: "/register",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Child's Profile",
    description:
      "Tell us about your child's interests, strengths, and goals so we can personalise their journey.",
  },
  {
    number: "02",
    title: "Discover & Explore",
    description:
      "Take an assessment, join a workshop, or book a mentor session — all in one place.",
  },
  {
    number: "03",
    title: "Grow & Thrive",
    description:
      "Get a personalised report, track progress, and unlock your child's full potential.",
  },
];

const programs = [
  {
    age: "Ages 4–7",
    label: "Early Explorers",
    image: "/images/programs-3.jpg",
    badgeColor: "#4FC3F7",
    programs: [
      "Creative Arts",
      "Storytelling",
      "Early STEM Play",
      "Social Skills",
    ],
    chipColor: "#2BBCB0",
    href: "/",
  },
  {
    age: "Ages 8–12",
    label: "Young Achievers",
    image: "/images/programs-1.jpg",
    badgeColor: "#F5C518",
    programs: [
      "Robotics & Coding",
      "Communication Skills",
      "Career Exploration",
      "Leadership Basics",
    ],
    chipColor: "#F4845F",
    href: "/",
  },
  {
    age: "Ages 13–16",
    label: "Future Leaders",
    image: "/images/programs-2.jpg",
    badgeColor: "#F4845F",
    programs: [
      "Career Aptitude",
      "Public Speaking",
      "Critical Thinking",
      "Mentorship Sessions",
    ],
    chipColor: "#4FC3F7",
    href: "/",
  },
];

const testimonials = [
  {
    initials: "SR",
    color: "#2BBCB0",
    name: "Sunita Rao",
    role: "Parent of Arjun, Age 11",
    quote:
      "Go Kids helped us understand Arjun's learning style in a way no school ever explained. The assessment report was eye-opening — we finally know how to support him.",
  },
  {
    initials: "PM",
    color: "#F5C518",
    name: "Priya Mehta",
    role: "Parent of Ishaan, Age 14",
    quote:
      "The public speaking workshop transformed my shy son into a confident presenter. His teacher couldn't believe the change in just 8 weeks!",
  },
  {
    initials: "AK",
    color: "#F4845F",
    name: "Ananya K.",
    role: "Student, Age 15",
    quote:
      "I never knew what career I wanted. After Go Kids' career assessment, I discovered my passion for design and enrolled in the creativity workshop. It changed everything.",
  },
  {
    initials: "RV",
    color: "#4FC3F7",
    name: "Rajan Verma",
    role: "Parent of Diya, Age 9",
    quote:
      "The mentorship sessions are incredible. Our mentor understood Diya instantly and gave us practical strategies we still use every day.",
  },
  {
    initials: "NJ",
    color: "#2BBCB0",
    name: "Neha Joshi",
    role: "Parent of Rohan, Age 12",
    quote:
      "Workshops are well-structured and the instructors are genuinely passionate. Rohan looks forward to every session — that alone says everything.",
  },
];

// ─── Testimonial Carousel ───────────────────────────────────────────
function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div
                className="card-hover bg-white rounded-2xl p-6 h-full"
                style={{
                  border: "1px solid #F3F4F6",
                  borderLeft: "4px solid #F5C518",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F5C518" color="#F5C518" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "#374151", fontStyle: "italic" }}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background: t.color,
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "var(--font-nunito)",
                      }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all hover:bg-[#F5C518] hover:border-[#F5C518]"
          style={{ borderColor: "#E5E7EB" }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={16} color="#1A1A1A" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? 24 : 8,
                height: 8,
                background: i === selectedIndex ? "#F5C518" : "#E5E7EB",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all hover:bg-[#F5C518] hover:border-[#F5C518]"
          style={{ borderColor: "#E5E7EB" }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={16} color="#1A1A1A" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center pt-16"
        style={{ background: "#FAFAF8", overflow: "hidden" }}
      >
        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                  style={{
                    background: "#FFF3CC",
                    color: "#92650A",
                    fontFamily: "var(--font-nunito)",
                    border: "1px solid #F5C518",
                  }}
                >
                  🌟 India's Future Readiness Platform
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 800,
                  fontSize: "clamp(36px, 5vw, 58px)",
                  lineHeight: 1.12,
                  color: "#1A1A1A",
                  marginBottom: 20,
                }}
              >
                Prepare Your Child{" "}
                <span style={{ color: "#F5C518" }}>for the Future</span>, Today
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
                className="text-base sm:text-lg leading-relaxed mb-8"
                style={{ color: "#6B7280", maxWidth: 480 }}
              >
                Assessments, workshops, mentorship, and expert talks —
                everything your child needs to discover their strengths and
                thrive.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/register"
                    className="btn-primary text-base px-7 py-3.5 animate-shimmer"
                  >
                    Start Free Assessment
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/workshops"
                    className="btn-outline text-base px-7 py-3.5"
                  >
                    Explore Workshops
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-2 text-sm"
                style={{ color: "#6B7280" }}
              >
                {[
                  "500+ Kids Assessed",
                  "50+ Workshops",
                  "30+ Expert Mentors",
                ].map((stat, i) => (
                  <span key={stat} className="flex items-center gap-2">
                    {i > 0 && (
                      <span
                        className="w-1 h-1 rounded-full inline-block"
                        style={{ background: "#D1D5DB" }}
                      />
                    )}
                    <span
                      className="font-semibold"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: "var(--font-nunito)",
                      }}
                    >
                      {stat}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 24px 80px rgba(0,0,0,0.14)",
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Children learning together in a bright, joyful classroom environment"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent card */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                style={{ border: "1px solid #F3F4F6" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "#FFF3CC" }}
                >
                  🏆
                </div>
                <div>
                  <p
                    className="text-xs font-bold"
                    style={{
                      color: "#1A1A1A",
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    500+ Families
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    Building tomorrow's leaders
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. FOUR VERTICALS ────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#2BBCB0", fontFamily: "var(--font-nunito)" }}
            >
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1A1A1A",
              }}
            >
              Everything Your Child Needs
            </h2>
            <p
              className="mt-3 text-base max-w-xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              A complete platform built for India's young learners — from early
              explorers to future leaders.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verticals.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-2xl p-6 h-full flex flex-col group cursor-pointer"
                    style={{
                      border: "1px solid #F3F4F6",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      transition: "box-shadow 0.22s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 16px 40px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 2px 12px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: v.color }}
                    >
                      <Icon size={22} color="white" />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-nunito)",
                        color: "#1A1A1A",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "#6B7280" }}
                    >
                      {v.description}
                    </p>
                    <Link
                      href={v.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:gap-2"
                      style={{
                        color: v.color,
                        fontFamily: "var(--font-nunito)",
                        transition: "gap 0.2s ease",
                      }}
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#F4845F", fontFamily: "var(--font-nunito)" }}
            >
              Simple & Effective
            </p>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1A1A1A",
              }}
            >
              How Go Kids Works
            </h2>
          </FadeInUp>

          <div className="relative">
            {/* Dashed connector line (desktop only) */}
            <div
              className="hidden lg:block absolute top-10 left-1/2 transform -translate-x-1/2"
              style={{
                width: "calc(66.67% - 80px)",
                height: 2,
                borderTop: "2.5px dashed #F5C518",
                top: "3.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              {steps.map((step, i) => (
                <FadeInUp key={step.number} delay={i * 0.15}>
                  <div className="flex flex-col items-center text-center">
                    <BounceIn delay={i * 0.2}>
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative"
                        style={{
                          background: "#F5C518",
                          boxShadow: "0 8px 24px rgba(245, 197, 24, 0.35)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-nunito)",
                            fontWeight: 800,
                            fontSize: 28,
                            color: "#1A1A1A",
                          }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </BounceIn>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{
                        fontFamily: "var(--font-nunito)",
                        color: "#1A1A1A",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-xs"
                      style={{ color: "#6B7280" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PROGRAMS BY AGE ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#4FC3F7", fontFamily: "var(--font-nunito)" }}
            >
              Age-Appropriate Learning
            </p>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1A1A1A",
              }}
            >
              Programs for Every Age
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <StaggerItem key={prog.label}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{
                    border: "1px solid #F3F4F6",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Image with age badge */}
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={prog.image}
                      alt={`${prog.label} program — ${prog.age}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Age badge overlay */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: prog.badgeColor,
                          color:
                            prog.badgeColor === "#F5C518" ? "#1A1A1A" : "white",
                          fontFamily: "var(--font-nunito)",
                        }}
                      >
                        {prog.age}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{
                        fontFamily: "var(--font-nunito)",
                        color: "#1A1A1A",
                      }}
                    >
                      {prog.label}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prog.programs.map((p, i) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background:
                              i % 3 === 0
                                ? "#E8F8F7"
                                : i % 3 === 1
                                  ? "#FEF0EB"
                                  : "#E8F6FE",
                            color:
                              i % 3 === 0
                                ? "#2BBCB0"
                                : i % 3 === 1
                                  ? "#F4845F"
                                  : "#4FC3F7",
                            fontFamily: "var(--font-nunito)",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/workshops"
                      className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                      style={{
                        color: prog.chipColor,
                        fontFamily: "var(--font-nunito)",
                      }}
                    >
                      Explore Programs <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. WORKSHOPS BANNER ──────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/workshops-banner.jpg"
            alt="Kids drawing and creating in a teal-themed classroom workshop"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0, 0, 0, 0.52)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#F5C518", fontFamily: "var(--font-nunito)" }}
            >
              50+ Live & Self-Paced
            </p>
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(30px, 5vw, 52px)",
              }}
            >
              Explore Our Workshops
            </h2>
            <p
              className="text-base mb-8 mx-auto max-w-xl"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              From robotics to public speaking — skill-building sessions
              designed for curious minds aged 4 to 16.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/workshops"
                  className="btn-primary text-base px-7 py-3.5"
                >
                  Browse All Workshops
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/workshops"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-base text-white border-2 border-white hover:bg-white hover:text-[#1A1A1A] transition-all"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  View Schedule
                </Link>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#2BBCB0", fontFamily: "var(--font-nunito)" }}
            >
              Real Stories
            </p>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1A1A1A",
              }}
            >
              What Parents & Kids Say
            </h2>
          </FadeInUp>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── 7. CTA STRIP ─────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "#F5C518" }}
      >
        {/* SVG Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="stars"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="3" fill="#1A1A1A" />
                <circle cx="40" cy="30" r="2" fill="#1A1A1A" />
                <circle cx="20" cy="50" r="4" fill="#1A1A1A" />
                <circle cx="55" cy="5" r="2.5" fill="#1A1A1A" />
                <circle cx="5" cy="45" r="2" fill="#1A1A1A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4.5vw, 48px)",
                color: "#1A1A1A",
                marginBottom: 12,
              }}
            >
              Ready to Unlock Your Child's Potential?
            </h2>
            <p className="text-base mb-8" style={{ color: "#374151" }}>
              Join 500+ families already building tomorrow's leaders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-base text-white transition-all hover:opacity-90"
                  style={{
                    background: "#1A1A1A",
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  Book a Free Assessment
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/workshops"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-base transition-all border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                  style={{
                    background: "white",
                    color: "#1A1A1A",
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  Browse Workshops
                </Link>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── 8. CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#F4845F", fontFamily: "var(--font-nunito)" }}
            >
              Get In Touch
            </p>
            <h2
              style={{
                fontFamily: "var(--font-nunito)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#1A1A1A",
              }}
            >
              Contact Go Kids India
            </h2>
            <p
              className="mt-3 text-base max-w-2xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              We are happy to help you choose the right path for your child.
              Reach out through social media or connect with us directly.
            </p>
          </FadeInUp>

          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: "1px solid #F3F4F6",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Socials */}
              <div className="p-7 sm:p-10" style={{ background: "#FAFAF8" }}>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#1A1A1A", fontFamily: "var(--font-nunito)" }}
                >
                  Socials
                </h3>
                <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                  Follow us and stay updated with workshops, assessments, and
                  new programs.
                </p>
                {/* Changed to grid-cols-1 for vertical stacking on all screen sizes */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      label: "Instagram",
                      href: "https://www.instagram.com/gokidsindia",
                      icon: InstagramIcon,
                      accent: "#F4845F",
                      bg: "#FEF0EB",
                    },
                    {
                      label: "Facebook",
                      href: "https://www.facebook.com/Gokidszkp",
                      icon: FacebookIcon,
                      accent: "#4FC3F7",
                      bg: "#E8F6FE",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/modipallavi/",
                      icon: LinkedinIcon,
                      accent: "#2BBCB0",
                      bg: "#E8F8F7",
                    },
                  ].map(({ label, href, icon: Icon, accent, bg }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-2xl p-4 group"
                      style={{
                        border: "1px solid #F3F4F6",
                        background: "white",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      }}
                      aria-label={label}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: bg, color: accent }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-sm font-bold mb-0.5"
                            style={{
                              color: "#1A1A1A",
                              fontFamily: "var(--font-nunito)",
                            }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-xs font-semibold mt-2"
                            style={{
                              color: accent,
                              fontFamily: "var(--font-nunito)",
                            }}
                          >
                            Open →
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="p-7 sm:p-10 bg-white">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#1A1A1A", fontFamily: "var(--font-nunito)" }}
                >
                  Contact Details
                </h3>
                <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                  Prefer a direct conversation? Call or email us anytime.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid #F3F4F6",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#FFF3CC", color: "#92650A" }}
                      >
                        <Phone size={18} />
                      </div>
                      <div>
                        <p
                          className="text-sm font-bold mb-1"
                          style={{
                            color: "#1A1A1A",
                            fontFamily: "var(--font-nunito)",
                          }}
                        >
                          Call Us
                        </p>
                        <a
                          href="tel:+919876524155"
                          className="text-sm font-semibold hover:underline"
                          style={{ color: "#374151" }}
                        >
                          +91-9876524155
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid #F3F4F6",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#E8F8F7", color: "#2BBCB0" }}
                      >
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-bold mb-1"
                          style={{
                            color: "#1A1A1A",
                            fontFamily: "var(--font-nunito)",
                          }}
                        >
                          Email
                        </p>
                        <a
                          href="mailto:pallavimodi@gmail.com"
                          className="text-sm font-semibold hover:underline break-all"
                          style={{ color: "#374151" }}
                        >
                          pallavimodi@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid #F3F4F6",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#E8F6FE", color: "#4FC3F7" }}
                      >
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-bold mb-1"
                          style={{
                            color: "#1A1A1A",
                            fontFamily: "var(--font-nunito)",
                          }}
                        >
                          Location
                        </p>
                        <p className="text-sm" style={{ color: "#374151" }}>
                          SCO-2, Behind Gopals, Patiala Road, Zirakpur
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
