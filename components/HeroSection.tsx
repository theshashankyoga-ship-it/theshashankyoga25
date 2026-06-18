'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Leaf, Star, Menu, X } from 'lucide-react';

/* ── Lotus SVG Component ──────────────────────────────────── */
function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 4C32 4 24 16 24 28C24 32.4 26.4 36.2 30 38.4V54H34V38.4C37.6 36.2 40 32.4 40 28C40 16 32 4 32 4Z" opacity="0.8" />
      <path d="M32 14C32 14 20 22 16 32C14.2 36.2 15 40.6 18 43.6L22 40C19.8 37.6 19.4 34.4 20.6 31.4C23 26 32 20 32 20C32 20 41 26 43.4 31.4C44.6 34.4 44.2 37.6 42 40L46 43.6C49 40.6 49.8 36.2 48 32C44 22 32 14 32 14Z" opacity="0.6" />
      <path d="M32 22C32 22 14 28 10 38C8 42.4 9.4 47.2 13 50L17.4 46C14.8 43.4 14 40 15.4 36.8C18 31 32 26 32 26C32 26 46 31 48.6 36.8C50 40 49.2 43.4 46.6 46L51 50C54.6 47.2 56 42.4 54 38C50 28 32 22 32 22Z" opacity="0.4" />
    </svg>
  );
}

/* ── Floating Lotus Particle ──────────────────────────────── */
function FloatingLotus({ index }: { index: number }) {
  const positions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 92];
  const delays = [0, 3, 7, 2, 9, 5, 1, 6, 4, 8];
  const durations = [18, 22, 16, 24, 20, 19, 23, 17, 21, 25];
  const sizes = [20, 28, 16, 24, 18, 22, 14, 26, 20, 15];
  const opacities = [0.08, 0.12, 0.1, 0.15, 0.09, 0.11, 0.13, 0.08, 0.14, 0.1];

  return (
    <div
      className="absolute text-[#C9A84C]"
      style={{
        left: `${positions[index % 10]}%`,
        width: sizes[index % 10],
        height: sizes[index % 10],
        opacity: opacities[index % 10],
        animation: `float-up ${durations[index % 10]}s linear ${delays[index % 10]}s infinite`,
      }}
    >
      <LotusIcon />
    </div>
  );
}

/* ── Navigation Bar ───────────────────────────────────────── */
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Classes', href: '/classes' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

/* ── Mobile Menu ──────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col">
      {/* Floating lotus particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <FloatingLotus key={`menu-lotus-${i}`} index={i} />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 relative z-10">
        <span className="font-cormorant text-2xl font-bold text-[#C9A84C]">
          🕉️ VEDIC YOGA
        </span>
        <button onClick={onClose} className="text-[#F5F0E8] p-2" aria-label="Close menu">
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        {navLinks.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="font-cormorant text-5xl text-[#F5F0E8] uppercase tracking-wider hover:text-[#C9A84C] transition-colors duration-300"
            style={{
              animation: `fade-up 0.6s ease-out ${i * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            {link.name}
          </Link>
        ))}

        {/* JOIN NOW button */}
        <Link
          href="/register"
          onClick={onClose}
          className="mt-6 border border-[#C9A84C] text-[#C9A84C] font-dm font-semibold px-8 py-4 tracking-widest uppercase text-sm hover:bg-[#C9A84C]/10 transition-colors duration-300"
          style={{
            animation: 'fade-up 0.6s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          JOIN NOW
        </Link>
      </div>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────── */
export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero">
      {/* ── Video Background ──────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark forest green overlay */}
        <div className="absolute inset-0 bg-[#0D1F0F]/70" />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* ── Floating Lotus Particles ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[...Array(10)].map((_, i) => (
          <FloatingLotus key={i} index={i} />
        ))}
      </div>

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Left: Brand */}
          <Link href="/" className="font-cormorant text-2xl font-bold text-[#C9A84C]">
            🕉️ VEDIC YOGA
          </Link>

          {/* Center: Nav Links (hidden below md) */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-dm text-[#F5F0E8]/70 text-xs tracking-[0.2em] uppercase hover:text-[#C9A84C] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: JOIN NOW (hidden below md) */}
          <div className="hidden md:block">
            <Link
              href="/register"
              className="font-dm border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-[#C9A84C]/10 transition-colors duration-300"
            >
              JOIN NOW
            </Link>
          </div>

          {/* Right: Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-[#F5F0E8]" />
            <span className="block w-6 h-[2px] bg-[#F5F0E8]" />
            <span className="block w-6 h-[2px] bg-[#F5F0E8]" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Hero Content ──────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          {/* 1. TAGLINE */}
          <div className="animate-fade-up flex items-center gap-2 mb-6">
            <Leaf className="w-4 h-4 text-[#F5F0E8]/70" />
            <span className="font-dm text-[#F5F0E8]/70 text-xs tracking-[0.3em] uppercase">
              Ancient Wisdom • Modern Practice
            </span>
          </div>

          {/* 2. MAIN HEADING */}
          <div className="animate-fade-up-delay-1">
            <h1 className="font-cormorant text-[#F5F0E8] uppercase leading-[0.88]" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
              <span className="block">Discover.</span>
              <span className="block">Transform.</span>
              <span className="block">Transcend.</span>
            </h1>
          </div>

          {/* 3. SUBTEXT */}
          <div className="animate-fade-up-delay-2 mt-6">
            <p className="font-dm text-[#F5F0E8]/70 text-sm sm:text-base max-w-lg leading-relaxed">
              Preserving ancient wisdom.<br />
              Empowering modern yoga practitioners{' '}
              <span className="font-bold text-[#C9A84C]">across India.</span>
            </p>
          </div>

          {/* 4. CTA ROW */}
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0D1F0F] font-dm font-bold px-7 py-4 text-sm tracking-wider uppercase hover:bg-[#B8943C] transition-colors duration-300"
            >
              JOIN COMMUNITY
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 border border-[#F5F0E8]/30 text-[#F5F0E8] font-dm font-medium px-7 py-4 text-sm tracking-wider uppercase hover:border-[#F5F0E8]/60 transition-colors duration-300"
            >
              EXPLORE CLASSES
            </Link>
            {/* Rating badge (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-3 ml-4">
              <Star className="w-5 h-5 text-[#C9A84C] fill-[#C9A84C]" />
              <div>
                <p className="font-dm text-[#F5F0E8]/60 text-xs font-medium">4.9 Rating</p>
                <p className="font-dm text-[#F5F0E8]/60 text-xs">500+ Students</p>
              </div>
            </div>
          </div>

          {/* 5. STATS ROW */}
          <div className="animate-fade-up-delay-4 mt-12 flex flex-wrap gap-8 sm:gap-12">
            {[
              { value: '500+', label: 'Students' },
              { value: '50+', label: 'Expert Instructors' },
              { value: '15+', label: 'Class Styles' },
              { value: '5+', label: 'Years of Excellence' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-cormorant text-[#C9A84C] text-3xl sm:text-5xl font-bold">
                  {stat.value}
                </span>
                <span className="font-dm text-[#F5F0E8]/50 text-[9px] sm:text-xs tracking-[0.2em] uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
