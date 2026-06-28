'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function PartnerBanner() {
  return (
    <section className="py-12 bg-white" id="partner-banner">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row bg-[#034047] rounded-[2rem] overflow-hidden relative shadow-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side Image */}
          <div className="md:w-[45%] relative min-h-[300px] md:min-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.pexels.com/photos/8436587/pexels-photo-8436587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Yoga Studio" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Side Content */}
          <div className="md:w-[55%] p-10 md:p-16 flex flex-col justify-center relative">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-bold mb-6 leading-tight">
              For Studios and Schools
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-lg mb-16 md:mb-10">
              Vedic Yoga Alliance partners with studios and schools to expand access to yoga worldwide. Build credibility, access valuable resources, and strengthen your impact with the support of our global network.
            </p>
            
            {/* Cutout Button Container */}
            <div className="absolute bottom-0 right-0 bg-white rounded-tl-[2rem] p-4 pl-6 pt-6 hidden md:block">
              {/* Corner curves for the cutout effect */}
              <div className="absolute top-[-1.5rem] right-0 w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[0.75rem_0.75rem_0_0_#ffffff]" />
              <div className="absolute bottom-0 left-[-1.5rem] w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[0.75rem_0.75rem_0_0_#ffffff]" />
              
              <Link href="/register" className="inline-flex items-center gap-3 bg-white text-[#034047] font-semibold text-lg hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#034047] outline-none transition-opacity">
                Join the Community 
                <span className="w-8 h-8 rounded-full bg-[#528793] flex items-center justify-center text-white">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
            </div>

            {/* Mobile Button (No cutout, just regular layout) */}
            <div className="md:hidden mt-8">
              <Link href="/register" className="inline-flex items-center gap-3 bg-white text-[#034047] font-semibold min-h-[48px] px-6 py-3 rounded-full text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#034047] outline-none">
                Join the Community 
                <span className="w-6 h-6 rounded-full bg-[#528793] flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
