'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CertificationPrograms from '@/components/home/CertificationPrograms';
import PartnerBanner from '@/components/home/PartnerBanner';
import WhyChoose from '@/components/home/WhyChoose';
import StatsSection from '@/components/home/StatsSection';
import WhyYoga from '@/components/home/WhyYoga';
import GlobalCommunity from '@/components/home/GlobalCommunity';


export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <CertificationPrograms />
      <PartnerBanner />
      <WhyChoose />
      <StatsSection />
      <WhyYoga />
      <GlobalCommunity />

    </motion.div>
  );
}
