'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ClassCard from '@/components/ClassCard';
import AnimatedText from '@/components/AnimatedText';
import { Quote, ChevronLeft, ChevronRight, UserPlus, Search, Sparkles, ArrowRight } from 'lucide-react';

/* ── Count-Up Hook ────────────────────────────────────────── */
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ── Stats Section ────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { label: 'Students', value: 500, suffix: '+' },
    { label: 'Expert Instructors', value: 20, suffix: '+' },
    { label: 'Class Styles', value: 15, suffix: '+' },
    { label: 'Years Experience', value: 5, suffix: '' },
  ];

  return (
    <section className="relative bg-zen-deep border-y border-zen-sage/10 py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const { count, ref } = useCountUp(stat.value);
          return (
            <motion.div
              key={stat.label}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <p className="font-heading text-4xl md:text-5xl text-zen-gold font-light">
                {count}
                {stat.suffix}
              </p>
              <p className="text-zen-light/60 text-sm mt-2 tracking-wide">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Featured Classes ─────────────────────────────────────── */
function FeaturedClasses() {
  const classes = [
    {
      name: 'Morning Vinyasa Flow',
      style: 'Vinyasa',
      duration: '60 min',
      level: 'Beginner',
      instructor: 'Priya Sharma',
    },
    {
      name: 'Yin & Restore',
      style: 'Yin Yoga',
      duration: '75 min',
      level: 'All',
      instructor: 'Ananya Reddy',
    },
    {
      name: 'Power Yoga',
      style: 'Power',
      duration: '45 min',
      level: 'Advanced',
      instructor: 'Rohan Verma',
    },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Our Programs
          </motion.span>
          <AnimatedText
            text="Featured Classes"
            className="font-heading text-4xl md:text-5xl text-zen-cream mt-3 justify-center"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <ClassCard key={cls.name} {...cls} index={i} />
          ))}
        </div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/classes" className="outline-button">
            View All Classes <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── How It Works ─────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Register as Student',
      description: 'Create your free account in seconds. Choose between student or studio profiles.',
      icon: UserPlus,
    },
    {
      number: '02',
      title: 'Browse & Book a Class',
      description: 'Explore hundreds of classes from verified studios. Filter by style, level, and schedule.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Practice & Transform',
      description: 'Attend your booked classes and begin your transformation journey with expert guidance.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="section-padding bg-zen-deep/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Simple Process
          </motion.span>
          <AnimatedText
            text="How It Works"
            className="font-heading text-4xl md:text-5xl text-zen-cream mt-3 justify-center"
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px">
            <motion.div
              className="h-full border-t-2 border-dashed border-zen-sage/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center"
            >
              {/* Large background number */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 font-heading text-[120px] text-zen-sage/5 font-bold leading-none select-none">
                {step.number}
              </span>

              <div className="relative z-10 flex flex-col items-center pt-8">
                <div className="w-16 h-16 rounded-2xl bg-zen-medium/60 border border-zen-sage/20 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-zen-gold" />
                </div>
                <h3 className="font-heading text-2xl text-zen-cream mb-3">{step.title}</h3>
                <p className="text-zen-light/60 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    {
      name: 'Meera Patel',
      role: 'Student, 2 years',
      text: 'ZenFlow transformed my practice completely. The instructors are world-class, and the booking system makes it so easy to maintain a consistent practice.',
    },
    {
      name: 'Arjun Nair',
      role: 'Studio Owner',
      text: "Since listing on ZenFlow, our student enrollment grew by 300%. The platform's management tools are incredibly intuitive. Highly recommended for studios.",
    },
    {
      name: 'Sanya Gupta',
      role: 'Student, 6 months',
      text: 'I started with the beginner Vinyasa class and now I practice daily. The community here is so supportive and welcoming. Best decision I made for my health.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Testimonials
          </motion.span>
          <AnimatedText
            text="What Our Community Says"
            className="font-heading text-4xl md:text-5xl text-zen-cream mt-3 justify-center"
          />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-zen-cream/5 border border-zen-sage/10 rounded-2xl p-8 md:p-12 text-center">
                    <Quote className="w-10 h-10 text-zen-gold mx-auto mb-6 opacity-60" />
                    <p className="text-zen-cream/90 text-lg md:text-xl leading-relaxed font-light italic mb-8">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div>
                      <p className="font-heading text-xl text-zen-cream">{t.name}</p>
                      <p className="text-zen-sage text-sm mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-zen-sage/20 flex items-center justify-center text-zen-light/60 hover:border-zen-gold hover:text-zen-gold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-zen-gold w-6' : 'bg-zen-sage/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-zen-sage/20 flex items-center justify-center text-zen-light/60 hover:border-zen-gold hover:text-zen-gold transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ───────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative section-padding bg-zen-medium/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-zen-dark via-zen-medium/20 to-zen-dark" />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl text-zen-cream mb-4">
          Are you a Yoga Studio?
        </h2>
        <p className="text-zen-light/70 text-lg mb-8 max-w-xl mx-auto">
          List your classes and reach 500+ students on ZenFlow. Grow your practice,
          manage bookings, and build your community — all in one place.
        </p>
        <Link href="/register" className="gold-button animate-breathe text-lg px-8 py-4">
          Register Your Studio <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ── Home Page ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <StatsSection />
      <FeaturedClasses />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </motion.div>
  );
}
