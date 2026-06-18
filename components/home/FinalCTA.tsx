'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FF9933] to-[#E8872E] py-20 sm:py-24">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-semibold tracking-wider uppercase">Begin Your Journey</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 leading-tight">
          Start Your Yoga Teaching Journey Today
        </h2>

        <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Join thousands of certified yoga professionals. Take the first step towards a fulfilling career that transforms lives.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-[#FF9933] font-bold px-8 py-4 rounded-full text-sm sm:text-base hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Register Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:bg-white/10 transition-all">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
