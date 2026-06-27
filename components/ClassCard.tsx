'use client';

import { motion } from 'framer-motion';
import { Clock, BarChart3, User } from 'lucide-react';
import Link from 'next/link';

interface ClassCardProps {
  name: string;
  style: string;
  duration: string;
  level: string;
  instructor: string;
  schedule?: string;
  price?: string;
  index?: number;
  showBooking?: boolean;
}

export default function ClassCard({
  name,
  style,
  duration,
  level,
  instructor,
  schedule,
  price,
  index = 0,
  showBooking = true,
}: ClassCardProps) {
  const levelColors: Record<string, string> = {
    beginner: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    intermediate: 'bg-amber-50 text-amber-600 border border-amber-200',
    advanced: 'bg-red-50 text-red-600 border border-red-200',
    all: 'bg-orange-50 text-[#E6862A] border border-orange-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glass-card-hover p-6 flex flex-col h-full group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#E6862A] font-semibold">
            {style}
          </span>
          <h3 className="font-heading text-xl font-semibold text-[#1F1F1F] mt-1">{name}</h3>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${levelColors[level.toLowerCase()] || levelColors.all}`}>
          {level}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-4 flex-grow">
        <div className="flex items-center gap-2 text-[#666666] text-sm">
          <Clock className="w-4 h-4 text-[#E6862A]" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-[#666666] text-sm">
          <User className="w-4 h-4 text-[#E6862A]" />
          <span>{instructor}</span>
        </div>
        {schedule && (
          <div className="flex items-center gap-2 text-[#666666] text-sm">
            <BarChart3 className="w-4 h-4 text-[#E6862A]" />
            <span>{schedule}</span>
          </div>
        )}
      </div>

      {price && (
        <p className="text-[#E6862A] font-semibold mb-4 text-lg">{price}</p>
      )}

      {showBooking && (
        <Link
          href="/login"
          className="gold-button text-center justify-center text-sm mt-auto"
        >
          Book Now
        </Link>
      )}
    </motion.div>
  );
}
