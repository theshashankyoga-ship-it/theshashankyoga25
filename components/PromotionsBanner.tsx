'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  image_url: string;
  redirect_url: string;
  is_active: boolean;
  created_at: string;
}

export default function PromotionsBanner() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetchPromotions = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setPromotions(data);
      }
    };
    fetchPromotions();
  }, []);

  const nextSlide = useCallback(() => {
    if (promotions.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  }, [promotions.length]);

  const prevSlide = useCallback(() => {
    if (promotions.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  }, [promotions.length]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (promotions.length <= 1) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, promotions.length]);

  if (promotions.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/60">
        <div className="relative h-[180px] sm:h-[200px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.a
              key={promotions[currentIndex].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
              href={promotions[currentIndex].redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center cursor-pointer group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${promotions[currentIndex].image_url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 sm:px-12 flex items-center justify-between w-full">
                <div>
                  <span className="inline-block text-xs tracking-widest uppercase text-orange-200/90 mb-2 font-medium">
                    ✨ Promotion
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white font-semibold mb-2">
                    {promotions[currentIndex].title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-sm text-orange-100/80 group-hover:text-white transition-colors">
                    Learn More <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {promotions.length > 1 && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {promotions.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {promotions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-[#FF9933] w-6'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
