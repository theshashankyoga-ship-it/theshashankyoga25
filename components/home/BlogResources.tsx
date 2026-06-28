'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

const articles = [
  {
    category: 'Yoga Guide',
    title: 'Complete Guide to Starting Your Yoga Teaching Career in 2025',
    excerpt: 'Everything you need to know about becoming a certified yoga teacher — from choosing the right program to landing your first class.',
    readTime: '8 min read',
    gradient: 'from-[#E6862A]/20 to-[#C97321]/10',
  },
  {
    category: 'Wellness',
    title: 'The Science Behind Pranayama: How Breathwork Transforms Health',
    excerpt: 'Research-backed insights into how ancient breathing techniques can reduce stress, improve focus, and boost immune function.',
    readTime: '6 min read',
    gradient: 'from-[#202020]/10 to-[#1F1F1F]/5',
  },
  {
    category: 'Certification',
    title: 'RYT 200 vs RYT 500: Which Certification Is Right for You?',
    excerpt: 'A detailed comparison to help aspiring yoga teachers choose the certification path that aligns with their goals and experience.',
    readTime: '5 min read',
    gradient: 'from-[#C97321]/15 to-[#E6862A]/5',
  },
  {
    category: 'Resources',
    title: 'Top 10 Books Every Aspiring Yoga Teacher Should Read',
    excerpt: 'From the Yoga Sutras to modern anatomy texts — curated reading list for a well-rounded yoga education.',
    readTime: '4 min read',
    gradient: 'from-purple-500/10 to-purple-400/5',
  },
];

export default function BlogResources() {
  return (
    <section className="section-padding bg-[#F5F5F5]" id="blog">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <span className="text-[#E6862A] text-sm tracking-[0.2em] uppercase font-semibold">Knowledge Hub</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] mt-3 font-bold">Blog & Resources</h2>
          <p className="text-[#666666] mt-4 max-w-2xl mx-auto">Insights, guides, and resources to support your yoga journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_rgb(230,134,42,0.08)] hover:-translate-y-2 transition-all duration-400"
            >
              {/* Thumbnail */}
              <div className={`h-40 bg-gradient-to-br ${a.gradient} flex items-center justify-center`}>
                <BookOpen className="w-10 h-10 text-gray-300" />
              </div>
              <div className="p-5">
                <span className="text-[#E6862A] text-[10px] font-bold tracking-widest uppercase">{a.category}</span>
                <h3 className="font-heading text-sm font-semibold text-[#1F1F1F] mt-1.5 mb-2 leading-snug line-clamp-2 group-hover:text-[#E6862A] transition-colors">
                  {a.title}
                </h3>
                <p className="text-[#666666] text-xs leading-relaxed mb-3 line-clamp-2">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-gray-400 text-[10px]">
                    <Clock className="w-3 h-3" /> {a.readTime}
                  </span>
                  <span className="text-[#E6862A] text-xs font-semibold group-hover:underline">Read →</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
          <Link href="/about" className="outline-button text-sm">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
