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
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/6870454/6870454-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          {/* Subtle grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-20">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                Internationally Recognized Certification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.12] mb-6"
            >
              Transform Your Passion for Yoga into a{' '}
              <span className="text-[#FF9933]">Globally Recognized Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
            >
              Join professional yoga teacher training and certification programs designed for aspiring and experienced yoga practitioners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/register" className="gold-button text-sm sm:text-base py-3.5 px-7">
                Become Certified <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/classes" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-medium py-3.5 px-7 rounded-full hover:bg-white/10 hover:border-white/50 transition-all text-sm sm:text-base">
                Explore Programs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              <TrustBadge icon={Shield} label="Certified & Accredited" />
              <TrustBadge icon={Globe} label="Global Recognition" />
              <TrustBadge icon={Award} label="Industry Standard" />
            </motion.div>
          </div>

          {/* Right: Floating Stat Badges */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-[420px] h-[420px]">
              {/* Glassmorphic circle */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="w-72 h-72 rounded-full border border-white/10"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center shadow-2xl">
                  <span className="text-white text-6xl">🕉️</span>
                </div>
              </div>

              <motion.div
                className="absolute top-6 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-xl">🎓</span>
                <div>
                  <p className="text-sm font-bold text-white">10,000+</p>
                  <p className="text-xs text-white/60">Certified</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <span className="text-xl">🌍</span>
                <div>
                  <p className="text-sm font-bold text-white">45+</p>
                  <p className="text-xs text-white/60">Countries</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-sm font-bold text-white">4.9</p>
                  <p className="text-xs text-white/60">Rating</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
