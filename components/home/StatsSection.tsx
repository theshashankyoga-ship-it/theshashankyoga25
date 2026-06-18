'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { count, ref };
}

function StatItem({ label, value, suffix, index }: { label: string; value: number; suffix: string; index: number }) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="text-center"
    >
      <p className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-white/60 text-sm mt-2 tracking-wide">{label}</p>
    </motion.div>
  );
}

const stats = [
  { label: 'Certified Students', value: 10000, suffix: '+' },
  { label: 'Countries Reached', value: 45, suffix: '+' },
  { label: 'Training Hours', value: 50000, suffix: '+' },
  { label: 'Partner Institutions', value: 200, suffix: '+' },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#1B2A4A]">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #FF9933 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF9933]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF9933]/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} index={i} />
        ))}
      </div>
    </section>
  );
}
