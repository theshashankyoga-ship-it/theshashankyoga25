'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const levels = [
  {
    badge: 'Beginner',
    title: '200-Hour Foundation',
    desc: 'Perfect for newcomers starting their yoga teaching journey with strong fundamentals.',
    features: ['Yoga philosophy basics', 'Core asana mastery', 'Breathing techniques', 'Teaching fundamentals', 'Anatomy basics'],
    accent: 'border-green-400',
    badgeColor: 'bg-green-50 text-green-700',
  },
  {
    badge: 'Intermediate',
    title: '300-Hour Advanced',
    desc: 'Deepen your practice and teaching skills with advanced methodology and specialization.',
    features: ['Advanced sequencing', 'Therapeutic yoga', 'Meditation & mindfulness', 'Yoga Nidra training', 'Teaching practicum'],
    accent: 'border-[#FF9933]',
    badgeColor: 'bg-[#FFF4E6] text-[#E8872E]',
    popular: true,
  },
  {
    badge: 'Advanced',
    title: '500-Hour Master',
    desc: 'Comprehensive master program combining 200 and 300 hour certifications into one journey.',
    features: ['Complete curriculum', 'Specialization tracks', 'Research projects', 'Guest masterclasses', 'International certification'],
    accent: 'border-[#1B2A4A]',
    badgeColor: 'bg-[#1B2A4A] text-white',
  },
  {
    badge: 'Professional',
    title: 'Teacher Trainer (E-RYT)',
    desc: 'For experienced teachers ready to train the next generation of yoga professionals.',
    features: ['Trainer methodology', 'Curriculum design', 'Assessment frameworks', 'Mentorship skills', 'Business development'],
    accent: 'border-purple-400',
    badgeColor: 'bg-purple-50 text-purple-700',
  },
];

export default function TeacherTraining() {
  return (
    <section className="section-padding bg-white" id="training">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#FF9933] text-sm tracking-[0.2em] uppercase font-semibold">Training Levels</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-3 font-bold">
            Teacher Training Programs
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Progressive training paths from beginner to professional teacher trainer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.badge}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl border-t-4 ${lvl.accent} shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col`}
            >
              {lvl.popular && (
                <span className="absolute -top-3 right-4 bg-[#FF9933] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                  Most Popular
                </span>
              )}
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 ${lvl.badgeColor}`}>
                {lvl.badge}
              </span>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{lvl.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{lvl.desc}</p>

              <ul className="space-y-2 mb-5 flex-1">
                {lvl.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#FF9933] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="inline-flex items-center gap-1 text-[#FF9933] text-sm font-semibold hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
