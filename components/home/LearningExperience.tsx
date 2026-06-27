'use client';

import { motion } from 'framer-motion';
import { Monitor, Video, PlayCircle, ClipboardCheck, Award } from 'lucide-react';

const steps = [
  { icon: Monitor, title: 'Online Classes', desc: 'Access comprehensive course materials, video lessons, and study resources 24/7 from any device.' },
  { icon: Video, title: 'Live Sessions', desc: 'Join interactive live classes with expert trainers for real-time guidance, Q&A, and practice.' },
  { icon: PlayCircle, title: 'Recorded Lessons', desc: 'Revisit lessons anytime with high-quality recorded sessions and downloadable resources.' },
  { icon: ClipboardCheck, title: 'Assessments', desc: 'Track your progress through practical assessments, quizzes, and teaching demonstrations.' },
  { icon: Award, title: 'Certification', desc: 'Earn your internationally recognized VYA certification upon successful course completion.' },
];

export default function LearningExperience() {
  return (
    <section className="section-padding bg-white" id="learning">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[#E6862A] text-sm tracking-[0.2em] uppercase font-semibold">How It Works</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] mt-3 font-bold">Your Learning Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-[10%] right-[10%] h-px">
            <motion.div className="h-full border-t-2 border-dashed border-[#E6862A]/20" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center"
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-heading text-[80px] text-gray-100 font-bold leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10 pt-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#E6862A]/15 flex items-center justify-center mb-4 shadow-sm">
                    <s.icon className="w-6 h-6 text-[#E6862A]" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-[#1F1F1F] mb-2">{s.title}</h3>
                  <p className="text-[#666666] text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
