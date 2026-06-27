'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Globe, Star } from 'lucide-react';


/* ── Trust Badge ──────────────────────────────────────────── */
function TrustBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#E6862A]" />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" id="hero">
        {/* ── Video Background ──────────────────────────────── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
            style={{ objectPosition: '60% center', filter: 'brightness(1.15)' }}
          >
            <source
              src="https://videos.pexels.com/video-files/6870454/6870454-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Lightweight overlay – soft black, 30% on mobile / left-heavy gradient on desktop */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.20)',
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.10) 100%)',
            }}
          />
          {/* Subtle warm bottom vignette for depth */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-20 md:pt-24 pb-16 md:pb-20">
          {/* Left Content */}
          <div className="mt-8 md:mt-0 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-1.5 mb-4 md:mb-6"
            >
              <Star className="w-3.5 h-3.5 text-[#E6862A] fill-[#E6862A]" />
              <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase sm:normal-case">
                Internationally Recognized Certification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] md:leading-[1.12] mb-4 md:mb-6"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            >
              Transform Your Passion for Yoga into a{' '}
              <span className="text-[#E6862A]" style={{ textShadow: '0 2px 10px rgba(230,134,42,0.25)' }}>Globally Recognized Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 md:mb-8 mx-auto sm:mx-0"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.30)' }}
            >
              Join professional yoga teacher training and certification programs designed for aspiring and experienced yoga practitioners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 md:mb-10 w-full sm:w-auto items-center sm:items-start"
            >
              <Link href="/register" className="gold-button w-full sm:w-auto justify-center text-sm sm:text-base py-3.5 px-7">
                Become Certified <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/classes" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 border-2 border-white/40 text-white font-medium py-3.5 px-7 rounded-full hover:bg-white/10 hover:border-white/60 transition-all text-sm sm:text-base backdrop-blur-sm">
                Explore Programs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6"
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
