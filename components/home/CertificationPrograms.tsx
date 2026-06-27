'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Monitor, ArrowRight, CheckCircle } from 'lucide-react';

const programs = [
  {
    level: 'RYT 200',
    title: '200-Hour Teacher Training',
    duration: '3-6 Months',
    format: 'Online & In-Person',
    features: ['Foundation yoga philosophy', 'Anatomy & physiology', 'Teaching methodology', 'Practicum hours'],
  },
  {
    level: 'RYT 300',
    title: '300-Hour Advanced Training',
    duration: '4-8 Months',
    format: 'Hybrid Learning',
    features: ['Advanced asana techniques', 'Therapeutic applications', 'Business of yoga', 'Mentorship program'],
  },
  {
    level: 'RYT 500',
    title: '500-Hour Master Program',
    duration: '8-12 Months',
    format: 'Comprehensive',
    features: ['Complete mastery curriculum', 'Specialization tracks', 'Research methodology', 'International certification'],
  },
  {
    level: 'E-RYT',
    title: 'Experienced Teacher',
    duration: 'Self-Paced',
    format: 'Online Platform',
    features: ['Continuing education credits', 'Advanced specializations', 'Teacher trainer pathway', 'Global teaching registry'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function CertificationPrograms() {
  return (
    <section className="section-padding bg-white" id="certifications">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="inline-block text-[#034047] text-sm tracking-[0.2em] uppercase font-semibold">
            Our Programs
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#034047] mt-3 font-bold">
            Featured Certification Programs
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#666666] mt-4 max-w-2xl mx-auto">
            Choose from internationally recognized yoga certification programs designed for every stage of your teaching journey.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {programs.map((prog) => (
            <motion.div
              key={prog.level}
              variants={itemVariants}
              className="glass-card group flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Header */}
              <div className="bg-[#034047] rounded-t-[1.5rem] px-5 py-6 text-white text-center">
                <span className="text-xs font-bold tracking-widest uppercase opacity-80">{prog.level}</span>
                <h3 className="font-heading text-lg font-bold mt-2">{prog.title}</h3>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col bg-white rounded-b-[1.5rem]">
                <div className="flex flex-col gap-2 text-xs text-[#666666] mb-5">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#034047]" /> {prog.duration}</span>
                  <span className="flex items-center gap-2"><Monitor className="w-4 h-4 text-[#034047]" /> {prog.format}</span>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {prog.features.map((f, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2 text-sm text-[#666666]"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#034047] mt-0.5 shrink-0" />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-full bg-white border-2 border-[#034047] text-[#034047] hover:bg-[#034047] hover:text-white transition-all duration-300"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
