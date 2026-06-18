'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Monitor, Users, ArrowRight, CheckCircle } from 'lucide-react';

const programs = [
  {
    level: 'RYT 200',
    title: '200-Hour Teacher Training',
    duration: '3-6 Months',
    format: 'Online & In-Person',
    price: 'Starting ₹45,000',
    color: 'from-[#FF9933] to-[#FFA94D]',
    features: ['Foundation yoga philosophy', 'Anatomy & physiology', 'Teaching methodology', 'Practicum hours'],
  },
  {
    level: 'RYT 300',
    title: '300-Hour Advanced Training',
    duration: '4-8 Months',
    format: 'Hybrid Learning',
    price: 'Starting ₹65,000',
    color: 'from-[#1B2A4A] to-[#2D4066]',
    features: ['Advanced asana techniques', 'Therapeutic applications', 'Business of yoga', 'Mentorship program'],
  },
  {
    level: 'RYT 500',
    title: '500-Hour Master Program',
    duration: '8-12 Months',
    format: 'Comprehensive',
    price: 'Starting ₹95,000',
    color: 'from-[#E8872E] to-[#FF9933]',
    features: ['Complete mastery curriculum', 'Specialization tracks', 'Research methodology', 'International certification'],
  },
  {
    level: 'E-RYT',
    title: 'Experienced Teacher',
    duration: 'Self-Paced',
    format: 'Online Platform',
    price: 'Starting ₹35,000',
    color: 'from-[#2D4066] to-[#1B2A4A]',
    features: ['Continuing education credits', 'Advanced specializations', 'Teacher trainer pathway', 'Global teaching registry'],
  },
];

export default function CertificationPrograms() {
  return (
    <section className="section-padding bg-white" id="certifications">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#FF9933] text-sm tracking-[0.2em] uppercase font-semibold">Our Programs</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-3 font-bold">
            Featured Certification Programs
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Choose from internationally recognized yoga certification programs designed for every stage of your teaching journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.level}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card group flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${prog.color} rounded-t-[1rem] px-5 py-5 text-white`}>
                <span className="text-xs font-bold tracking-widest uppercase opacity-80">{prog.level}</span>
                <h3 className="font-heading text-lg font-bold mt-1">{prog.title}</h3>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {prog.duration}</span>
                  <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> {prog.format}</span>
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#FF9933] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="text-[#FF9933] font-bold text-sm mb-3">{prog.price}</p>

                <Link
                  href="/register"
                  className="w-full text-center text-sm font-semibold py-2.5 rounded-full border border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933] hover:text-white transition-all duration-300"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
