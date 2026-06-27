'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CertificationPrograms from '@/components/home/CertificationPrograms';
import PartnerBanner from '@/components/home/PartnerBanner';
import WhyChoose from '@/components/home/WhyChoose';
import StatsSection from '@/components/home/StatsSection';
import TeacherTraining from '@/components/home/TeacherTraining';
import GlobalCommunity from '@/components/home/GlobalCommunity';
import Testimonials from '@/components/home/Testimonials';
import LearningExperience from '@/components/home/LearningExperience';
import BlogResources from '@/components/home/BlogResources';
import FinalCTA from '@/components/home/FinalCTA';

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
      <TeacherTraining />
      <GlobalCommunity />
      <Testimonials />
      <LearningExperience />
      <BlogResources />
      <FinalCTA />
    </motion.div>
  );
}
