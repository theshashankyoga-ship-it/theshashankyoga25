'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Globe, Star } from 'lucide-react';

/* ── Trust Badge ──────────────────────────────────────────── */
function TrustBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[#034047]/80">
      <div className="w-8 h-8 rounded-full bg-[#034047]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#034047]" />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FAF7F2]" id="hero">
        {/* ── Video Background ──────────────────────────────── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center md:object-[60%_center]"
            style={{ filter: 'brightness(1.15)' }}
          >
            <source
              src="https://videos.pexels.com/video-files/6870454/6870454-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Enhanced mobile overlay for perfect readability while keeping video visible at the bottom */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
            }}
          />
          
          {/* Left-heavy white gradient on desktop to make dark text pop without hiding the video */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.1) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-20 md:pt-24 pb-16 md:pb-20">
          {/* Left Content */}
          <div className="mt-8 md:mt-0 text-center sm:text-left flex flex-col items-center sm:items-start w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#034047]/10 rounded-full px-3 py-1.5 md:px-4 md:py-1.5 mb-4 md:mb-6 shadow-sm"
            >
              <Star className="w-3.5 h-3.5 text-[#E89D78] fill-[#E89D78]" />
              <span className="text-[#034047] text-[10px] sm:text-xs md:text-sm font-bold tracking-wide uppercase sm:normal-case">
                Internationally Recognized Certification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-[32px] leading-[1.25] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[#034047] md:leading-[1.12] mb-4 md:mb-6 text-center sm:text-left"
            >
              Transform Your Passion for Yoga into a{' '}
              <span className="text-[#E89D78]">Globally Recognized Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[#034047]/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 md:mb-8 mx-auto sm:mx-0 font-medium text-center sm:text-left"
            >
              Join professional yoga teacher training and certification programs designed for aspiring and experienced yoga practitioners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-3 mb-8 md:mb-10 w-full sm:w-auto items-center sm:items-start"
            >
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#034047] text-white font-semibold w-full sm:w-auto justify-center text-sm sm:text-base py-3.5 px-7 rounded-full hover:bg-[#022a2e] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                Become Certified <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/classes" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 border-2 border-[#034047] text-[#034047] font-semibold py-3.5 px-7 rounded-full hover:bg-[#034047]/5 transition-all text-sm sm:text-base bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg">
                Explore Programs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6 w-full"
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
