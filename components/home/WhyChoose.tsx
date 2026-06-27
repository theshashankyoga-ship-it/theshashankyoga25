'use client';

import { motion } from 'framer-motion';
import { Globe, Award, Monitor, Users, Shield, BookOpen } from 'lucide-react';

const features = [
  { icon: Globe, title: 'International Standards', desc: 'Our programs meet global yoga education benchmarks recognized across 45+ countries worldwide.' },
  { icon: Award, title: 'Experienced Trainers', desc: 'Learn from master teachers with 15+ years of experience in traditional and modern yoga practices.' },
  { icon: Monitor, title: 'Online & Offline Learning', desc: 'Flexible hybrid programs — attend in person at Rishikesh or complete coursework from anywhere online.' },
  { icon: Users, title: 'Lifetime Community', desc: 'Join a thriving global network of 10,000+ certified yoga professionals for support and collaboration.' },
  { icon: Shield, title: 'Professional Certification', desc: 'Earn credentials that are respected by studios, wellness centers, and institutions internationally.' },
  { icon: BookOpen, title: 'Comprehensive Curriculum', desc: 'From asana and philosophy to anatomy and business — a complete education for the modern yoga teacher.' },
];

export default function WhyChoose() {
  return (
    <section className="section-padding bg-[#F2ECE4]" id="why-choose">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E6862A] text-sm tracking-[0.2em] uppercase font-semibold">Why Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] mt-3 font-bold">
            Why Choose Vedic Yoga Alliance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E6862A]/15 flex items-center justify-center mb-4 group-hover:bg-[#E6862A] group-hover:border-[#E6862A] transition-colors duration-300">
                <f.icon className="w-6 h-6 text-[#E6862A] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#1F1F1F] mb-2">{f.title}</h3>
              <p className="text-[#666666] text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
