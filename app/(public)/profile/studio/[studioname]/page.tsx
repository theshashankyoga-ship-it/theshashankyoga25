'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import {
  ArrowLeft, Share2, MapPin, CheckCircle2, Users,
  BookOpen, Calendar, Star, Quote, Instagram, Globe,
  MessageCircle, Mail, ArrowRight, Play, Shield
} from 'lucide-react';

interface PublicProfile {
  id: string;
  full_name: string | null;
  profile_pic_url: string | null;
  bio: string | null;
  city: string | null;
  is_public: boolean;
  instagram_url: string | null;
  created_at: string;
}

export default function PublicStudioProfilePage() {
  const params = useParams();
  const studioname = decodeURIComponent(params.studioname as string);
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('full_name', studioname)
        .eq('role', 'studio')
        .eq('is_public', true)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [studioname]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-12 h-12 border-2 border-[#FF9933] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="font-heading text-4xl mb-4 text-gray-900 font-semibold">
            Studio Not Found
          </h1>
          <p className="mb-8 text-gray-500">
            This premium studio profile is private or doesn&apos;t exist.
          </p>
          <Link href="/" className="outline-button">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-gray-900">
      {/* Floating Header Actions */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FF9933] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
        <button onClick={copyLink} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:text-[#FF9933] transition-colors text-gray-700">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share Profile</span>
        </button>
      </motion.div>

      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full min-h-[550px] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-white">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80" 
            alt="Studio Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/50 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Particles Mock */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#FF9933]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl p-1 mb-6 bg-white"
          >
            <img 
              src={profile?.profile_pic_url || '/default-avatar.png'} 
              alt={profile?.full_name || 'Logo'} 
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-emerald-50 border border-emerald-100"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">Verified Premium Studio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl mb-4 font-bold text-gray-900"
          >
            {profile?.full_name}
          </motion.h1>

          {profile?.city && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-2 text-gray-500 mb-6 text-lg"
            >
              <MapPin className="w-5 h-5 text-[#FF9933]" />
              <span className="font-medium">{profile.city}</span>
            </motion.div>
          )}

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            {profile?.bio || "Transforming lives through conscious movement, breath, and mindfulness. A sanctuary for your soul."}
          </motion.p>
        </div>
      </section>

      {/* 2. STUDIO STATS SECTION */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 -mt-8 mb-24">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { icon: Users, label: 'Happy Members', value: '450+' },
            { icon: BookOpen, label: 'Classes Offered', value: '25+' },
            { icon: Calendar, label: 'Years of Excellence', value: '5+' },
            { icon: Star, label: 'Average Rating', value: '4.9' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF9933]/30 rounded-2xl p-6 text-center transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#FF9933]" />
              <div className="font-heading font-semibold text-3xl mb-1 text-gray-900">{stat.value}</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. ABOUT STUDIO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 mb-16 relative">
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#FF9933]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Quote className="absolute -top-6 -left-6 w-16 h-16 text-[#FF9933] opacity-10" />
            <h2 className="font-heading text-4xl md:text-5xl mb-6 font-semibold text-gray-900">
              About {profile?.full_name?.split(' ')[0] || 'Our'} Studio
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We believe yoga is a way of life. Our expert teachers guide you on a journey of physical strength, mental clarity, and spiritual growth in a peaceful and supportive environment.
              </p>
              <p>
                Whether you are stepping onto the mat for the first time or deepening an advanced practice, our carefully curated space provides the perfect sanctuary for your wellness journey.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="font-heading text-2xl font-semibold text-gray-900">
                Founder & Lead Instructor
              </p>
              <p className="text-sm font-medium text-[#FF9933] uppercase tracking-widest mt-2">Over 10 Years Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white p-2 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80" 
                alt="Studio Interior" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white border border-gray-100 shadow-xl rounded-2xl p-6 hidden md:block">
              <Shield className="w-10 h-10 mb-2 text-[#FF9933]" />
              <p className="font-heading font-semibold text-xl text-gray-900">Certified</p>
              <p className="text-xs font-medium text-gray-500 uppercase mt-1">Yoga Alliance</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL & CONTACT SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-12 mb-16 bg-white rounded-3xl shadow-sm border border-gray-100">
        <h3 className="font-heading text-2xl font-semibold mb-8 text-center text-gray-900">Connect With Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {[
            { icon: Instagram, label: 'Instagram', value: profile?.instagram_url ? 'Follow Us' : '@yogastudio', href: profile?.instagram_url || '#' },
            { icon: Globe, label: 'Website', value: 'Visit Site', href: '#' },
            { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: '#' },
            { icon: Mail, label: 'Email', value: 'Send Inquiry', href: '#' },
          ].map((contact, i) => (
            <motion.a 
              key={i}
              href={contact.href}
              target={contact.href !== '#' ? '_blank' : '_self'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-[#FF9933]/30 rounded-2xl p-5 flex items-center justify-between group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white group-hover:bg-[#FF9933]/10 shadow-sm transition-colors">
                  <contact.icon className="w-5 h-5 text-gray-600 group-hover:text-[#FF9933]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{contact.label}</p>
                  <p className="font-semibold text-sm text-gray-900">{contact.value}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FF9933]" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* 5. STUDIO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-4xl md:text-5xl mb-4 text-gray-900">
            Studio Gallery
          </h2>
          <div className="w-24 h-1 rounded-full mx-auto bg-[#FF9933]" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {[
            { src: "https://images.unsplash.com/photo-1588286840104-a4b7f833b3a3?auto=format&fit=crop&q=80", span: "col-span-2 row-span-2" },
            { src: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&q=80", span: "col-span-1 row-span-1" },
            { src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80", span: "col-span-1 row-span-2" },
            { src: "https://images.unsplash.com/photo-1552196563-552592596167?auto=format&fit=crop&q=80", span: "col-span-1 row-span-1" },
          ].map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden group bg-white p-1 shadow-sm border border-gray-100 ${img.span}`}
            >
              <img 
                src={img.src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="relative py-24 mb-0 overflow-hidden bg-gradient-to-br from-[#FF9933] to-[#E8872E]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-semibold text-5xl md:text-6xl mb-6 text-white">
              Begin Your Yoga Journey Today
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto text-white/90">
              Join our exclusive wellness community and transform your life from the inside out.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/register" 
                className="group relative px-8 py-4 bg-white text-[#FF9933] rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="relative flex items-center gap-2">
                  Join This Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <a 
                href="#" 
                className="px-8 py-4 rounded-full font-medium text-lg border-2 border-white/80 text-white hover:bg-white/10 transition-all"
              >
                Contact Studio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-gray-200 pt-16 pb-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center mb-4">
              <span className="text-white font-heading font-bold">V</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl text-gray-900">Vedic Yoga Alliance</h3>
            <p className="text-sm text-gray-500 font-medium mt-2 tracking-widest uppercase">Preserving Ancient Wisdom</p>
          </div>
          
          <div className="flex gap-4 mb-8">
            {['Instagram', 'Facebook', 'Twitter'].map((social, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:border-[#FF9933]/50 hover:text-[#FF9933] text-gray-500 transition-colors">
                <span className="text-xs">{social[0]}</span>
              </a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />
          
          <p className="text-xs font-medium text-gray-400">
            &copy; {new Date().getFullYear()} Vedic Yoga Alliance & {profile?.full_name || 'Studio'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
