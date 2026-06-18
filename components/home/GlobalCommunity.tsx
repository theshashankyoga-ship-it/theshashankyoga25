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
  { top: '28%', left: '18%' }, { top: '35%', left: '48%' }, { top: '25%', left: '52%' },
  { top: '42%', left: '55%' }, { top: '60%', left: '30%' }, { top: '30%', left: '72%' },
  { top: '45%', left: '78%' }, { top: '55%', left: '82%' }, { top: '20%', left: '85%' },
  { top: '50%', left: '22%' }, { top: '38%', left: '12%' }, { top: '32%', left: '62%' },
  { top: '65%', left: '52%' }, { top: '48%', left: '40%' }, { top: '22%', left: '35%' },
];

export default function GlobalCommunity() {
  return (
    <section className="section-padding bg-[#FFF8F0]" id="community">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#FF9933] text-sm tracking-[0.2em] uppercase font-semibold">Our Reach</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-3 font-bold">Global Yoga Community</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Our certified teachers are making an impact in communities around the world.</p>
        </motion.div>

        {/* World map visualization */}
        <motion.div
          className="relative mx-auto max-w-4xl h-[260px] sm:h-[320px] bg-[#1B2A4A] rounded-3xl overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {dots.map((d, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#FF9933]"
              style={{ top: d.top, left: d.left }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06, type: 'spring' }}
            >
              <span className="absolute inset-0 rounded-full bg-[#FF9933] animate-ping opacity-30" />
            </motion.div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 font-heading text-6xl sm:text-8xl font-bold tracking-widest select-none">VYA</p>
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF4E6] flex items-center justify-center mb-3">
                <h.icon className="w-5 h-5 text-[#FF9933]" />
              </div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">{h.value}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
