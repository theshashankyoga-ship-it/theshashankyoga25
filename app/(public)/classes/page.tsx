'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import ClassCard from '@/components/ClassCard';

const allClasses = [
  {
    name: 'Morning Vinyasa Flow',
    style: 'Vinyasa',
    duration: '60 min',
    level: 'Beginner',
    instructor: 'Priya Sharma',
    schedule: 'Mon / Wed / Fri — 7:00 AM',
    price: 'Free',
  },
  {
    name: 'Power Yoga',
    style: 'Power',
    duration: '45 min',
    level: 'Advanced',
    instructor: 'Rohan Verma',
    schedule: 'Tue / Thu — 6:00 PM',
    price: '₹500/month',
  },
  {
    name: 'Yin & Restore',
    style: 'Yin',
    duration: '75 min',
    level: 'All',
    instructor: 'Ananya Reddy',
    schedule: 'Saturday — 9:00 AM',
    price: '₹500/month',
  },
  {
    name: 'Prenatal Yoga',
    style: 'Prenatal',
    duration: '50 min',
    level: 'Beginner',
    instructor: 'Kavya Iyer',
    schedule: 'Wednesday — 5:00 PM',
    price: '₹500/month',
  },
  {
    name: 'Kids Yoga',
    style: 'Kids',
    duration: '30 min',
    level: 'Beginner',
    instructor: 'Neha Joshi',
    schedule: 'Sat / Sun — 10:00 AM',
    price: 'Free',
  },
  {
    name: 'Meditation & Breathwork',
    style: 'Meditation',
    duration: '40 min',
    level: 'All',
    instructor: 'Vikram Das',
    schedule: 'Daily — 6:00 AM',
    price: 'Free',
  },
];

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const styleFilters = ['All Styles', 'Vinyasa', 'Power', 'Yin', 'Prenatal', 'Kids', 'Meditation'];

export default function ClassesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeStyle, setActiveStyle] = useState('All Styles');

  const filtered = allClasses.filter((cls) => {
    const levelMatch =
      activeFilter === 'All' ||
      cls.level.toLowerCase() === activeFilter.toLowerCase() ||
      cls.level.toLowerCase() === 'all';
    const styleMatch = activeStyle === 'All Styles' || cls.style === activeStyle;
    return levelMatch && styleMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zen-sage/10 via-zen-dark to-zen-dark" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Find Your Practice
          </motion.span>
          <AnimatedText
            text="Yoga Classes"
            className="font-heading text-5xl md:text-6xl text-zen-cream mt-3 justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-zen-light/60 mt-4 max-w-lg mx-auto"
          >
            Browse our curated selection of yoga classes taught by certified instructors.
            From gentle restorative to challenging power sessions.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 bg-zen-dark/90 backdrop-blur-xl border-b border-zen-sage/10 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-zen-light/40 text-sm mr-2">Level:</span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-zen-gold text-zen-dark font-semibold'
                    : 'border border-zen-sage/20 text-zen-light/60 hover:border-zen-gold hover:text-zen-gold'
                }`}
              >
                {f}
              </button>
            ))}
            <div className="w-px h-6 bg-zen-sage/20 mx-2 hidden sm:block" />
            <span className="text-zen-light/40 text-sm mr-2">Style:</span>
            {styleFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveStyle(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeStyle === f
                    ? 'bg-zen-sage/30 text-zen-cream font-semibold'
                    : 'border border-zen-sage/20 text-zen-light/60 hover:border-zen-sage hover:text-zen-sage'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Class Grid */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${activeStyle}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cls, i) => (
                <ClassCard key={cls.name} {...cls} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zen-light/40 text-lg">No classes found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
