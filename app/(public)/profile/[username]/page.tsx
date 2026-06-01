'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import {
  User, Award, Flame, CalendarDays, BookOpen,
  Shield, Star, Heart, Sparkles, ArrowLeft,
  UserPlus, Instagram
} from 'lucide-react';

interface PublicProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  is_public: boolean;
  instagram_url: string | null;
  created_at: string;
}

const badges = [
  { icon: Flame, label: 'Dedicated Yogi', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { icon: Star, label: 'Rising Star', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: Heart, label: 'Community Lover', color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { icon: Shield, label: 'Consistent', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Sparkles, label: 'Early Bird', color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

export default function PublicProfilePage() {
  const params = useParams();
  const username = decodeURIComponent(params.username as string);
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('full_name', username)
        .eq('is_public', true)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(data);

      // Fetch completed bookings count
      const { count } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', data.id)
        .eq('status', 'completed');

      setBookingsCount(count || 0);
      setLoading(false);
    };

    fetchProfile();
  }, [username]);

  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-zen-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-zen-medium/50 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-zen-light/30" />
          </div>
          <h1 className="font-heading text-3xl text-zen-cream mb-3">
            Profile Not Available
          </h1>
          <p className="text-zen-light/50 mb-8">
            This profile is either private or doesn&apos;t exist. The yogi may have chosen to keep their journey personal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="outline-button justify-center">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link href="/register" className="gold-button justify-center">
              <UserPlus className="w-4 h-4" />
              Join ZenFlow
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zen-sage/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zen-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card overflow-hidden"
        >
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-br from-zen-sage/30 via-zen-medium to-zen-gold/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,168,76,0.15),transparent)]" />
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-16 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || 'Profile'}
                  className="w-32 h-32 rounded-full object-cover border-4 border-zen-dark shadow-2xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-zen-sage/40 to-zen-gold/30 border-4 border-zen-dark flex items-center justify-center shadow-2xl">
                  <User className="w-14 h-14 text-zen-cream/60" />
                </div>
              )}
              {/* Online dot */}
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-zen-dark" />
            </motion.div>
          </div>

          {/* Info */}
          <div className="text-center px-6 pt-4 pb-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl md:text-4xl text-zen-cream"
            >
              {profile?.full_name}
            </motion.h1>

            {profile?.city && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-zen-light/40 text-sm mt-1"
              >
                📍 {profile.city}
              </motion.p>
            )}

            {profile?.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-zen-light/70 mt-4 text-sm leading-relaxed max-w-md mx-auto"
              >
                {profile.bio}
              </motion.p>
            )}

            {profile?.instagram_url && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                href={profile.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-zen-sage hover:text-zen-gold transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </motion.a>
            )}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 mx-6 my-6 p-4 rounded-2xl bg-zen-dark/40 border border-zen-sage/10"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4 text-zen-sage" />
              </div>
              <p className="font-heading text-2xl text-zen-cream">{bookingsCount}</p>
              <p className="text-zen-light/40 text-xs">Classes Done</p>
            </div>
            <div className="text-center border-x border-zen-sage/10">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <p className="font-heading text-2xl text-zen-cream">7</p>
              <p className="text-zen-light/40 text-xs">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CalendarDays className="w-4 h-4 text-zen-gold" />
              </div>
              <p className="font-heading text-2xl text-zen-cream">{joinDate}</p>
              <p className="text-zen-light/40 text-xs">Joined</p>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="px-6 pb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-zen-gold" />
              <h3 className="font-heading text-lg text-zen-cream">Achievements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full ${badge.bg} border border-white/5`}
                >
                  <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
                  <span className="text-zen-cream/80 text-xs font-medium">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 mt-6 justify-center"
        >
          <Link href="/" className="outline-button justify-center">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/register" className="gold-button justify-center">
            <UserPlus className="w-4 h-4" />
            Join ZenFlow
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-zen-light/20 text-xs mt-8"
        >
          🧘 ZenFlow Yoga — Find Your Inner Peace
        </motion.p>
      </div>
    </div>
  );
}
