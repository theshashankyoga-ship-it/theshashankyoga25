'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from './AnimatedText';
import { ArrowDown, Sparkles } from 'lucide-react';

function FloatingElement({ index }: { index: number }) {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 8 + Math.random() * 7;
  const randomSize = 8 + Math.random() * 12;
  const randomOpacity = 0.08 + Math.random() * 0.12;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${randomX}%`,
        width: randomSize,
        height: randomSize,
        background: 'linear-gradient(135deg, #FF9933, #FFC078)',
      }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, randomOpacity, randomOpacity, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-[#FFF4E6] to-[#FAFAFA]" />
      <div className="absolute inset-0 bg-gradient-radial from-[#FF9933]/5 via-transparent to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF9933]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#FFC078]/10 rounded-full blur-[120px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <FloatingElement key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24"
      >
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FF9933]" />
            <span className="text-[#FF9933] text-sm tracking-[0.2em] uppercase font-semibold">
              Vedic Yoga Alliance
            </span>
          </motion.div>

          <AnimatedText
            text="Yoga for Every Body, Every Mind, Every Journey"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.15] mb-6"
            delay={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            Preserving ancient wisdom. Empowering modern yoga. Join our community
            of practitioners and discover the transformative power of yoga.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/register" className="gold-button animate-breathe text-base">
              Join Community
            </Link>
            <Link href="/classes" className="outline-button animate-breathe text-base">
              Explore Yoga
            </Link>
          </motion.div>
        </div>

        {/* Right: decorative image area */}
        <motion.div
          className="hidden lg:flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9933]/15 to-[#FFC078]/10 animate-float" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FF9933]/10 to-transparent animate-float-slow" />

            {/* Center mandala/icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="w-64 h-64 rounded-full border border-[#FF9933]/20"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center shadow-xl">
                <span className="text-white text-5xl">🕉️</span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute top-8 right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-2xl">🧘</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">500+</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">4.9</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-[#FF9933]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
