'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Globe, Heart } from 'lucide-react';

const highlights = [
  { icon: Globe, value: '45+', label: 'Countries with VYA Graduates' },
  { icon: Users, value: '10,000+', label: 'Active Community Members' },
  { icon: Heart, value: '500+', label: 'Partner Studios Worldwide' },
  { icon: MapPin, value: '200+', label: 'Cities Represented' },
];

const dots = [
  { top: '35%', left: '22%' }, // US
  { top: '45%', left: '18%' }, // Mexico
  { top: '65%', left: '30%' }, // Brazil
  { top: '28%', left: '48%' }, // UK
  { top: '32%', left: '52%' }, // Europe
  { top: '55%', left: '55%' }, // Africa
  { top: '48%', left: '68%' }, // India
  { top: '35%', left: '78%' }, // China
  { top: '48%', left: '85%' }, // SE Asia
  { top: '75%', left: '85%' }, // Australia
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

export default function GlobalCommunity() {
  return (
    <section className="section-padding bg-[#F5F8F8] relative overflow-hidden" id="community">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="inline-block text-[#034047] text-sm tracking-[0.25em] uppercase font-bold mb-3">
            Our Global Reach
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#034047] font-bold tracking-tight">
            A Worldwide Yoga Community
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-5 text-[#4A696D] max-w-2xl mx-auto text-base sm:text-lg">
            Our certified teachers and partner studios are making a profound impact in communities around the globe.
          </motion.p>
        </motion.div>

        {/* World map visualization */}
        <motion.div
          className="relative mx-auto max-w-5xl h-[300px] sm:h-[400px] lg:h-[450px] bg-[#034047] rounded-[2rem] overflow-hidden mb-16 shadow-2xl shadow-[#034047]/20 border border-[#034047]/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* SVG World Map Background */}
          <div className="absolute inset-0 p-8 flex items-center justify-center pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
              alt="World Map" 
              className="w-full h-full object-contain opacity-[0.12] invert"
            />
          </div>

          {/* Animated Map Pins */}
          {dots.map((d, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ top: d.top, left: d.left }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200, damping: 10 }}
            >
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-40" />
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {highlights.map((h) => (
            <motion.div key={h.label} variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
                <h.icon className="w-7 h-7 text-[#034047]" />
              </div>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#034047] mb-1">{h.value}</p>
              <p className="text-[#4A696D] text-xs sm:text-sm font-medium">{h.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
