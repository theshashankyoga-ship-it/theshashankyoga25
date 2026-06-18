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
    <div className="flex items-center gap-2 text-gray-500">
      <div className="w-8 h-8 rounded-full bg-[#FFF4E6] flex items-center justify-center">
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

      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FFF4E6] to-[#FAFAFA]" id="hero">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#FF9933]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFA94D]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9933]/4 rounded-full blur-[150px] pointer-events-none" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #1B2A4A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#FFF4E6] border border-[#FF9933]/20 rounded-full px-4 py-1.5 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
              <span className="text-[#FF9933] text-xs sm:text-sm font-semibold tracking-wide">
                Internationally Recognized Certification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-gray-900 leading-[1.12] mb-6"
            >
              Transform Your Passion for Yoga into a{' '}
              <span className="text-gradient-gold">Globally Recognized Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
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
              <Link href="/classes" className="outline-button text-sm sm:text-base py-3.5 px-7">
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

          {/* Right: Decorative Visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-[420px] h-[420px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9933]/15 to-[#FFC078]/10 animate-float" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#FF9933]/10 to-transparent animate-float-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="w-72 h-72 rounded-full border border-[#FF9933]/15"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center shadow-xl">
                  <span className="text-white text-6xl">🕉️</span>
                </div>
              </div>

              <motion.div
                className="absolute top-6 right-0 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-xl">🎓</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">10,000+</p>
                  <p className="text-xs text-gray-500">Certified</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <span className="text-xl">🌍</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">45+</p>
                  <p className="text-xs text-gray-500">Countries</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">4.9</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
