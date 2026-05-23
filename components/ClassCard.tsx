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
    beginner: 'bg-green-800/60 text-green-300',
    intermediate: 'bg-yellow-800/60 text-yellow-300',
    advanced: 'bg-red-800/60 text-red-300',
    all: 'bg-zen-sage/30 text-zen-sage',
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
          <span className="text-xs uppercase tracking-widest text-zen-gold font-medium">
            {style}
          </span>
          <h3 className="font-heading text-2xl text-zen-cream mt-1">{name}</h3>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${levelColors[level.toLowerCase()] || levelColors.all}`}>
          {level}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-4 flex-grow">
        <div className="flex items-center gap-2 text-zen-light/70 text-sm">
          <Clock className="w-4 h-4 text-zen-sage" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-zen-light/70 text-sm">
          <User className="w-4 h-4 text-zen-sage" />
          <span>{instructor}</span>
        </div>
        {schedule && (
          <div className="flex items-center gap-2 text-zen-light/70 text-sm">
            <BarChart3 className="w-4 h-4 text-zen-sage" />
            <span>{schedule}</span>
          </div>
        )}
      </div>

      {price && (
        <p className="text-zen-gold font-semibold mb-4 text-lg">{price}</p>
      )}

      {showBooking && (
        <Link
          href="/login"
          className="gold-button text-center justify-center text-sm mt-auto group-hover:shadow-lg transition-shadow"
        >
          Book Now
        </Link>
      )}
    </motion.div>
  );
}
