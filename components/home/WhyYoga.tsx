'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Custom SVG components to mimic the illustration style
const BodyIllustration = () => (
  <svg viewBox="0 0 200 150" className="w-full h-40 mb-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 120 L80 120 L100 80 L140 120 L160 120" stroke="#034047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M100 80 L130 50 L160 60" stroke="#034047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M100 80 L70 50 L40 60" stroke="#034047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M70 50 Q100 40 130 50 L100 80 Z" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <circle cx="100" cy="30" r="10" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <path d="M70 120 L130 120" stroke="#E89D78" strokeWidth="8" opacity="0.3" strokeLinecap="round"/>
  </svg>
);

const MindIllustration = () => (
  <svg viewBox="0 0 200 150" className="w-full h-40 mb-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100 Q100 120 150 100 Q100 130 50 100" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <path d="M100 40 L100 90" stroke="#034047" strokeWidth="3"/>
    <path d="M70 70 L100 40 L130 70" stroke="#034047" strokeWidth="3" strokeLinecap="round"/>
    <path d="M70 70 L50 85" stroke="#034047" strokeWidth="3" strokeLinecap="round"/>
    <path d="M130 70 L150 85" stroke="#034047" strokeWidth="3" strokeLinecap="round"/>
    <path d="M85 40 Q100 20 115 40 L100 90 Z" fill="#034047"/>
    <circle cx="100" cy="20" r="8" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <path d="M80 120 L120 120" stroke="#034047" strokeWidth="2" strokeLinecap="round"/>
    <path d="M75 125 L125 125" stroke="#034047" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CommunityIllustration = () => (
  <svg viewBox="0 0 200 150" className="w-full h-40 mb-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 120 L140 120" stroke="#034047" strokeWidth="3" strokeLinecap="round"/>
    <path d="M70 120 L90 70 L130 70 L140 120" fill="#034047" stroke="#034047" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M90 70 Q110 50 130 70 Z" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <path d="M90 70 L60 90 L60 120" stroke="#034047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M130 70 L150 100" stroke="#034047" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="120" cy="40" r="9" fill="#E89D78" stroke="#034047" strokeWidth="2"/>
    <circle cx="145" cy="35" r="3" stroke="#034047" strokeWidth="1.5"/>
  </svg>
);

const benefits = [
  {
    title: 'For Your Body',
    desc: 'Improve strength, flexibility, and overall physical health.',
    Illustration: BodyIllustration,
  },
  {
    title: 'For Your Mind',
    desc: 'Find calm, focus, and manage stress in your daily life.',
    Illustration: MindIllustration,
  },
  {
    title: 'For Your Community',
    desc: 'Connect, grow, and uplift the yoga community.',
    Illustration: CommunityIllustration,
  },
];

export default function WhyYoga() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="why-yoga">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] text-[#034047] font-bold mb-6 tracking-tight"
          >
            Why Yoga? Why Now?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-[#4A696D] text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Yoga is more than a physical practice—it&apos;s a pathway to well-being for individuals and communities alike:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={itemVariants} className="text-center flex flex-col items-center">
              <benefit.Illustration />
              <h3 className="font-heading text-2xl text-[#034047] font-bold mb-3">{benefit.title}</h3>
              <p className="text-[#4A696D] text-[15px] leading-relaxed max-w-[250px]">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link 
            href="/classes" 
            className="inline-flex items-center gap-3 bg-[#034047] text-white px-7 py-3.5 rounded-full font-semibold text-lg hover:bg-[#023136] transition-colors"
          >
            Learn About Yoga
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
