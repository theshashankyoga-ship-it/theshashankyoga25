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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyChoose() {
  return (
    <section className="relative py-24 bg-[#034047] overflow-hidden" id="why-choose">
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="inline-block text-white/70 text-sm tracking-[0.25em] uppercase font-bold mb-2">
            The Vedic Advantage
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
            Why Choose Vedic Yoga Alliance
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
            Elevate your practice and career with our world-class certification programs built on tradition and modern science.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl group relative overflow-hidden"
            >
              {/* Subtle hover background accent */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#034047]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#034047]/10 flex items-center justify-center mb-6 group-hover:bg-[#034047] transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-[#034047] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#034047] mb-3">{f.title}</h3>
                <p className="text-[#034047]/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
