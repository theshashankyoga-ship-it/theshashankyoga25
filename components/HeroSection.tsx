'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from './AnimatedText';
import { ArrowDown, Sparkles } from 'lucide-react';

function LotusParticle({ index }: { index: number }) {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 8 + Math.random() * 7;
  const randomSize = 12 + Math.random() * 18;
  const randomOpacity = 0.1 + Math.random() * 0.15;

  return (
    <motion.svg
      className="absolute"
      width={randomSize}
      height={randomSize}
      viewBox="0 0 40 40"
      fill="none"
      style={{ left: `${randomX}%` }}
      initial={{ y: '110vh', rotate: 0, opacity: 0 }}
      animate={{
        y: '-10vh',
        rotate: 360,
        opacity: [0, randomOpacity, randomOpacity, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <path
        d="M20 2 C24 10, 34 16, 20 38 C6 16, 16 10, 20 2Z"
        fill="#C9A84C"
        opacity="0.6"
      />
      <path
        d="M20 2 C28 8, 38 12, 30 32 C22 20, 20 10, 20 2Z"
        fill="#7A9E7E"
        opacity="0.4"
      />
      <path
        d="M20 2 C12 8, 2 12, 10 32 C18 20, 20 10, 20 2Z"
        fill="#7A9E7E"
        opacity="0.4"
      />
    </motion.svg>
  );
}

function YogaPoseSilhouette() {
  return (
    <motion.svg
      className="w-full h-full"
      viewBox="0 0 300 500"
      fill="none"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 0.15, x: 0 }}
      transition={{ duration: 1.5, delay: 0.8 }}
    >
      {/* Tree Pose / Vrksasana silhouette */}
      <g fill="#7A9E7E" opacity="0.7">
        {/* Head */}
        <circle cx="150" cy="70" r="28" />
        {/* Torso */}
        <path d="M135 98 L165 98 L162 210 L138 210 Z" />
        {/* Left arm up */}
        <path d="M138 110 C110 100, 90 60, 100 20 C105 18, 110 20, 108 25 C108 60, 120 90, 140 108Z" />
        {/* Right arm up */}
        <path d="M162 110 C190 100, 210 60, 200 20 C195 18, 190 20, 192 25 C192 60, 180 90, 160 108Z" />
        {/* Hands meeting above (namaste up) */}
        <path d="M100 20 C110 5, 140 0, 150 0 C160 0, 190 5, 200 20 C195 15, 160 8, 150 8 C140 8, 105 15, 100 20Z" />
        {/* Right standing leg */}
        <path d="M142 210 L138 380 L132 400 L162 400 L156 380 L158 210Z" />
        {/* Right foot */}
        <path d="M132 400 L125 420 L170 420 L162 400Z" />
        {/* Left leg (bent, foot on inner thigh) */}
        <path d="M140 210 C120 230, 100 260, 110 280 C115 285, 125 282, 128 275 C132 260, 136 240, 140 225Z" />
      </g>
    </motion.svg>
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zen-dark via-zen-medium/40 to-zen-dark" />
      <div className="absolute inset-0 bg-gradient-radial from-zen-sage/5 via-transparent to-transparent" />

      {/* Lotus particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <LotusParticle key={i} index={i} />
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
            <Sparkles className="w-4 h-4 text-zen-gold" />
            <span className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium">
              Premium Yoga Experience
            </span>
          </motion.div>

          <AnimatedText
            text="Find Your Inner Peace"
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-zen-cream leading-[1.1] mb-6"
            delay={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-zen-light/70 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            Premium yoga classes for mind, body & soul. Join our community of practitioners
            and discover the transformative power of yoga.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/classes" className="gold-button animate-breathe text-base">
              Explore Classes
            </Link>
            <Link href="/register" className="outline-button animate-breathe text-base">
              Join as Studio
            </Link>
          </motion.div>
        </div>

        {/* Right: Yoga pose silhouette */}
        <motion.div
          className="hidden lg:block relative h-[500px] animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <YogaPoseSilhouette />
          {/* Glow behind pose */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zen-sage/10 rounded-full blur-[100px]" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-zen-light/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-zen-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
