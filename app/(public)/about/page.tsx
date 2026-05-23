'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import {
  Heart, Users, Leaf, Sun, Shield, Zap,
  Award, BookOpen, Flower2
} from 'lucide-react';

const team = [
  {
    name: 'Priya Sharma',
    specialty: 'Vinyasa & Hatha Yoga',
    bio: 'Certified RYT-500 with 12 years of experience. Trained in Rishikesh, India. Specializes in alignment-based Vinyasa and therapeutic yoga.',
  },
  {
    name: 'Rohan Verma',
    specialty: 'Power Yoga & Fitness',
    bio: 'Former athlete turned yogi. Combines strength training principles with traditional yoga to create challenging, transformative classes.',
  },
  {
    name: 'Ananya Reddy',
    specialty: 'Yin & Restorative Yoga',
    bio: 'Meditation practitioner for 15 years. Brings mindfulness and deep relaxation techniques to help students find stillness and recovery.',
  },
];

const values = [
  { icon: Heart, title: 'Peace', description: 'Creating spaces for inner calm and tranquility.' },
  { icon: Users, title: 'Community', description: 'Building a supportive, inclusive yoga family.' },
  { icon: Leaf, title: 'Growth', description: 'Continuous evolution of mind, body, and spirit.' },
  { icon: Sun, title: 'Authenticity', description: 'Honoring traditional practices with integrity.' },
  { icon: Shield, title: 'Safety', description: 'Ensuring a supportive environment for all levels.' },
  { icon: Zap, title: 'Excellence', description: 'Delivering world-class instruction and experiences.' },
];

const timeline = [
  { year: '2019', title: 'The Beginning', description: 'Founded as a small community yoga studio in New Delhi.' },
  { year: '2020', title: 'Going Digital', description: 'Launched online classes during the pandemic, reaching students across India.' },
  { year: '2021', title: 'ZenFlow Platform', description: 'Built the ZenFlow platform to connect studios and students seamlessly.' },
  { year: '2022', title: 'Community Growth', description: 'Surpassed 200 active students and partnered with 10 yoga studios.' },
  { year: '2023', title: 'Premium Programs', description: 'Introduced teacher training, retreats, and specialized wellness programs.' },
  { year: '2024', title: 'National Reach', description: '500+ students, 20+ instructors, and expanding to 5 major cities across India.' },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zen-sage/10 via-zen-dark to-zen-dark" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Our Story
          </motion.span>
          <AnimatedText
            text="About ZenFlow"
            className="font-heading text-5xl md:text-6xl text-zen-cream mt-3 justify-center"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-24 h-0.5 bg-zen-gold mx-auto mt-6"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-zen-cream mb-6">
              A Journey of Mindfulness & Community
            </h2>
            <div className="space-y-4 text-zen-light/70 leading-relaxed">
              <p>
                ZenFlow was born from a simple belief: that yoga should be accessible,
                authentic, and transformative. What started as a single studio in the
                heart of New Delhi has evolved into a platform connecting yoga lovers
                with the finest instructors across India.
              </p>
              <p>
                We bridge the gap between traditional yoga wisdom and modern technology,
                making it effortless for students to discover, book, and practice yoga
                with studios that align with their goals and preferences.
              </p>
              <p>
                Every class on ZenFlow is curated by certified instructors who share
                our passion for holistic wellness and personal growth. We are not just
                a platform — we are a community.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-10 text-center">
              <Flower2 className="w-12 h-12 text-zen-gold mx-auto mb-6 opacity-60" />
              <p className="font-heading text-3xl md:text-4xl text-zen-cream italic leading-snug">
                &ldquo;Yoga is the journey of the self, through the self, to the self.&rdquo;
              </p>
              <p className="text-zen-sage mt-6 text-sm tracking-wide uppercase">
                — The Bhagavad Gita
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-zen-deep/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-zen-gold/10 flex items-center justify-center mb-5">
              <BookOpen className="w-7 h-7 text-zen-gold" />
            </div>
            <h3 className="font-heading text-2xl text-zen-cream mb-3">Our Mission</h3>
            <p className="text-zen-light/70 leading-relaxed">
              To make premium yoga accessible to everyone by connecting students with
              verified, world-class studios and instructors through a seamless digital
              platform. We believe yoga is not a luxury — it is a necessity.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-zen-gold/10 flex items-center justify-center mb-5">
              <Award className="w-7 h-7 text-zen-gold" />
            </div>
            <h3 className="font-heading text-2xl text-zen-cream mb-3">Our Vision</h3>
            <p className="text-zen-light/70 leading-relaxed">
              To become India&apos;s leading yoga community platform where every studio
              thrives and every student finds their perfect practice. A world where
              wellness is woven into the fabric of daily life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
            >
              Expert Guidance
            </motion.span>
            <AnimatedText
              text="Meet Our Instructors"
              className="font-heading text-4xl md:text-5xl text-zen-cream mt-3 justify-center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card glass-card-hover p-8 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-zen-sage/20 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-heading text-3xl text-zen-gold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-zen-cream">{member.name}</h3>
                <p className="text-zen-gold text-sm mt-1 mb-4">{member.specialty}</p>
                <p className="text-zen-light/60 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-zen-deep/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <AnimatedText
              text="Our Core Values"
              className="font-heading text-4xl md:text-5xl text-zen-cream justify-center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl hover:bg-zen-medium/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zen-gold/10 flex items-center justify-center shrink-0">
                  <value.icon className="w-5 h-5 text-zen-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-zen-cream mb-1">{value.title}</h4>
                  <p className="text-zen-light/60 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <AnimatedText
              text="Our Journey"
              className="font-heading text-4xl md:text-5xl text-zen-cream justify-center"
            />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zen-sage/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zen-gold border-2 border-zen-dark z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-zen-gold font-heading text-2xl">{item.year}</span>
                    <h4 className="font-heading text-xl text-zen-cream mt-1">{item.title}</h4>
                    <p className="text-zen-light/60 text-sm mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
