'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Meera Patel',
    role: 'RYT 200 Graduate',
    text: 'Vedic Yoga Alliance transformed my practice completely. The 200-hour program gave me the confidence and skills to start teaching. The instructors are world-class, and the curriculum is comprehensive.',
    rating: 5,
    type: 'Student',
  },
  {
    name: 'Arjun Nair',
    role: 'Studio Owner & E-RYT',
    text: "Since partnering with VYA, our teacher training enrollment grew by 300%. The certification's global recognition gives our graduates a competitive edge in the industry.",
    rating: 5,
    type: 'Trainer',
  },
  {
    name: 'Sanya Gupta',
    role: 'RYT 500 Graduate',
    text: 'The 500-hour master program was life-changing. I went from being a casual practitioner to running my own studio in Bangalore. The business module alone was worth the investment.',
    rating: 5,
    type: 'Success Story',
  },
  {
    name: 'David Thompson',
    role: 'International Student, UK',
    text: 'As an international student, I was impressed by the quality of online training. The hybrid format allowed me to complete my certification from London while attending intensives in Rishikesh.',
    rating: 5,
    type: 'Student',
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Trainer, VYA',
    text: "Teaching at VYA has been the highlight of my career. The organization's commitment to preserving authentic yoga while embracing modern pedagogy is truly unique in the industry.",
    rating: 5,
    type: 'Trainer',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#FF9933] text-sm tracking-[0.2em] uppercase font-semibold">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-3 font-bold">What Our Community Says</h2>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative">
          <div className="overflow-hidden">
            <motion.div className="flex" animate={{ x: `-${current * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 30 }}>
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card p-8 sm:p-10 text-center">
                    <Quote className="w-8 h-8 text-[#FF9933] mx-auto mb-4 opacity-50" />
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(t.rating)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light italic mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">{t.name[0]}</span>
                    </div>
                    <p className="font-heading text-base font-semibold text-gray-900">{t.name}</p>
                    <p className="text-[#FF9933] text-sm mt-0.5">{t.role}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{t.type}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#FF9933] hover:text-[#FF9933] transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#FF9933] w-6' : 'bg-gray-200 w-2'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#FF9933] hover:text-[#FF9933] transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
