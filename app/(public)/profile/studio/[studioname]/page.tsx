'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import {
  ArrowLeft, Share2, MapPin, CheckCircle2, Users,
  BookOpen, Calendar, Star, Quote, Instagram, Globe,
  MessageCircle, Mail, ArrowRight, Play, Heart, Shield
} from 'lucide-react';

// Custom colors from user prompt
const colors = {
  bg: '#071B12',
  gold: '#D4AF37',
  cream: '#F5F1E8',
};

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
      <div style={{ backgroundColor: colors.bg }} className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-12 h-12 border-2 border-t-transparent rounded-full"
          style={{ borderColor: colors.gold, borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ backgroundColor: colors.bg }} className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="font-serif text-4xl mb-4" style={{ color: colors.cream, fontFamily: "'Cormorant Garamond', serif" }}>
            Studio Not Found
          </h1>
          <p className="mb-8" style={{ color: `${colors.cream}99` }}>
            This premium studio profile is private or doesn&apos;t exist.
          </p>
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all duration-300" style={{ borderColor: `${colors.gold}50`, color: colors.gold, backgroundColor: `${colors.gold}10` }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  // Fade up variant for reuse
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
    <div style={{ backgroundColor: colors.bg, color: colors.cream }} className="min-h-screen overflow-x-hidden font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .premium-glass {
          background: rgba(245, 241, 232, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        .gold-glow:hover {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .text-glow {
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }
      `}} />

      {/* Floating Header Actions */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-[#071B12]/80 backdrop-blur-md border-b border-[#D4AF37]/10' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#D4AF37]">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
        <button onClick={copyLink} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share Profile</span>
        </button>
      </motion.div>

      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full min-h-[550px] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
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
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B12] via-[#071B12]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B12]/80 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Particles Mock */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#D4AF37]"
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
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 p-1 mb-6"
            style={{ borderColor: colors.gold }}
          >
            <img 
              src={profile?.profile_pic_url || '/default-avatar.png'} 
              alt={profile?.full_name || 'Logo'} 
              className="w-full h-full rounded-full object-cover border-4 border-[#071B12]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-wider text-emerald-400 uppercase">Verified Premium Studio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-4 text-glow"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.cream }}
          >
            {profile?.full_name}
          </motion.h1>

          {profile?.city && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-2 text-[#D4AF37] mb-6 text-lg"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-light">{profile.city}</span>
            </motion.div>
          )}

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl text-lg md:text-xl font-light leading-relaxed"
            style={{ color: `${colors.cream}CC` }}
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
              className="premium-glass gold-glow rounded-2xl p-6 text-center transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: colors.gold }} />
              <div className="text-3xl font-serif mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.cream }}>{stat.value}</div>
              <div className="text-xs tracking-wider uppercase opacity-70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. ABOUT STUDIO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 mb-16 relative">
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Quote className="absolute -top-6 -left-6 w-16 h-16 opacity-20" style={{ color: colors.gold }} />
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
              About {profile?.full_name?.split(' ')[0] || 'Our'} Studio
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed" style={{ color: `${colors.cream}CC` }}>
              <p>
                We believe yoga is a way of life. Our expert teachers guide you on a journey of physical strength, mental clarity, and spiritual growth in a peaceful and supportive environment.
              </p>
              <p>
                Whether you are stepping onto the mat for the first time or deepening an advanced practice, our carefully curated space provides the perfect sanctuary for your wellness journey.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-[#D4AF37]/20">
              <p className="text-2xl italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
                Founder & Lead Instructor
              </p>
              <p className="text-sm uppercase tracking-widest mt-2 opacity-60">Over 10 Years Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden premium-glass p-2">
              <img 
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80" 
                alt="Studio Interior" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 premium-glass rounded-2xl p-6 hidden md:block">
              <Shield className="w-10 h-10 mb-2" style={{ color: colors.gold }} />
              <p className="font-serif text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Certified</p>
              <p className="text-xs opacity-70">Yoga Alliance</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOCIAL & CONTACT SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-12 mb-16">
        <h3 className="text-2xl font-serif mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>Connect With Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="premium-glass gold-glow rounded-2xl p-5 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <contact.icon className="w-5 h-5" style={{ color: colors.gold }} />
                </div>
                <div>
                  <p className="text-sm opacity-60 mb-0.5">{contact.label}</p>
                  <p className="font-medium text-sm">{contact.value}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: colors.gold }} />
            </motion.a>
          ))}
        </div>
      </section>

      {/* 5. STUDIO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
            Studio Gallery
          </h2>
          <div className="w-24 h-px mx-auto bg-[#D4AF37]/30" />
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
              className={`relative rounded-2xl overflow-hidden group premium-glass p-1 ${img.span}`}
            >
              <img 
                src={img.src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CLASSES SHOWCASE SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 mb-16 relative">
        <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
            Premium Programs
          </h2>
          <p className="text-lg font-light opacity-70">Curated practices for every stage of your journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Vinyasa Flow', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80', level: 'All Levels', duration: '60 Min' },
            { title: 'Hatha Balance', image: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?auto=format&fit=crop&q=80', level: 'Beginner', duration: '45 Min' },
            { title: 'Power Core', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80', level: 'Advanced', duration: '75 Min' },
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="premium-glass rounded-3xl overflow-hidden group cursor-pointer gold-glow"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={cls.image} 
                  alt={cls.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B12] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h4 className="text-2xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.cream }}>{cls.title}</h4>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center backdrop-blur-md">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center border-t border-[#D4AF37]/10">
                <span className="text-sm opacity-70">{cls.level}</span>
                <span className="text-sm font-medium text-[#D4AF37]">{cls.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-16 mb-24">
        <h2 className="text-3xl md:text-4xl text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
          Voices of Our Community
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Sarah M.", text: "The most serene and welcoming studio I've ever practiced in. The instructors truly care about your alignment and growth.", rating: 5 },
            { name: "David L.", text: "A sanctuary in the middle of the city. The Vinyasa classes here have completely transformed my strength and flexibility.", rating: 5 }
          ].map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="premium-glass rounded-3xl p-8 relative"
            >
              <Heart className="absolute top-6 right-6 w-6 h-6 opacity-10 text-[#D4AF37] fill-[#D4AF37]" />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-lg font-light italic mb-6 opacity-90 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/40 to-[#071B12] border border-[#D4AF37]/30 flex items-center justify-center">
                  <span className="font-serif text-sm">{review.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-sm tracking-wide">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="relative py-24 mb-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A261A]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl mb-6 text-glow" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}>
              Begin Your Yoga Journey Today
            </h2>
            <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto" style={{ color: `${colors.cream}CC` }}>
              Join our exclusive wellness community and transform your life from the inside out.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/register" 
                className="group relative px-8 py-4 bg-[#D4AF37] text-[#071B12] rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  Join This Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <a 
                href="#" 
                className="px-8 py-4 rounded-full font-medium text-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
              >
                Contact Studio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-[#D4AF37]/10 pt-16 pb-8 px-4 bg-[#05130C]">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4">
              <img src="/logo.png" alt="Logo" className="w-6 h-6 opacity-50" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <h3 className="font-serif text-2xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>ZenFlow Wellness</h3>
            <p className="text-sm opacity-50 mt-2 tracking-widest uppercase">Find Your Inner Peace</p>
          </div>
          
          <div className="flex gap-4 mb-8">
            {['Instagram', 'Facebook', 'Twitter'].map((social, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-colors">
                <span className="text-xs opacity-50">{social[0]}</span>
              </a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-8" />
          
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} ZenFlow Yoga & {profile?.full_name || 'Studio'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
