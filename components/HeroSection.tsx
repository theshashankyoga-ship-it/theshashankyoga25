'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Globe, Star, X } from 'lucide-react';
import { useState } from 'react';

/* ── Announcement Banner ──────────────────────────────────── */
function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#FF9933] via-[#FFA94D] to-[#FF9933] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-xs sm:text-sm font-medium">
          🎉 International Yoga Teacher Training &amp; Certification Programs Now Open – Enroll Today!
        </p>
        <div className="flex items-center gap-2">
          <Link href="/classes" className="text-[10px] sm:text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
            Explore Programs
          </Link>
          <Link href="/register" className="text-[10px] sm:text-xs font-bold bg-white text-[#FF9933] px-3 py-1 rounded-full hover:bg-white/90 transition-colors">
            Apply Now
          </Link>
        </div>
      </div>
      <button onClick={() => setVisible(false)} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ── Trust Badge ──────────────────────────────────────────── */
function TrustBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#FF9933]" />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <AnnouncementBanner />

      <section className="relative min-h-[90vh] flex items-center overflow-hidden" id="hero">
        {/* ── Video Background ──────────────────────────────── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
            style={{ objectPosition: '60% center' }}
          >
            <source
              src="https://videos.pexels.com/video-files/6870454/6870454-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Dark overlay for text readability - darker on mobile */}
          <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/30" />
          {/* Subtle grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-20 md:pt-24 pb-16 md:pb-20">
          {/* Left Content */}
          <div className="mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-1.5 mb-4 md:mb-6"
            >
              <Star className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
              <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase sm:normal-case">
                Internationally Recognized Certification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] md:leading-[1.12] mb-4 md:mb-6"
            >
              Transform Your Passion for Yoga into a{' '}
              <span className="text-[#FF9933]">Globally Recognized Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 md:mb-8"
            >
              Join professional yoga teacher training and certification programs designed for aspiring and experienced yoga practitioners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 md:mb-10 w-full sm:w-auto"
            >
              <Link href="/register" className="gold-button w-full sm:w-auto justify-center text-sm sm:text-base py-3.5 px-7">
                Become Certified <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/classes" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 border-2 border-white/30 text-white font-medium py-3.5 px-7 rounded-full hover:bg-white/10 hover:border-white/50 transition-all text-sm sm:text-base">
                Explore Programs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-6"
            >
              <TrustBadge icon={Shield} label="Certified & Accredited" />
              <TrustBadge icon={Globe} label="Global Recognition" />
              <TrustBadge icon={Award} label="Industry Standard" />
            </motion.div>
          </div>

          {/* Right: Empty space to let video show through */}
          <div className="hidden lg:block"></div>
        </div>
      </section>
    </>
  );
}
