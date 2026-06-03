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
  profile_pic_url: string | null;
  bio: string | null;
  city: string | null;
  is_public: boolean;
  instagram_url: string | null;
  created_at: string;
}

const badges = [
  { icon: Flame, label: 'Dedicated Yogi', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Star, label: 'Rising Star', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Heart, label: 'Community Lover', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Shield, label: 'Consistent', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Sparkles, label: 'Early Bird', color: 'text-purple-500', bg: 'bg-purple-50' },
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
      <div className="min-h-screen flex items-center justify-center pt-24 bg-[#FAFAFA]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-[#FF9933] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="font-heading text-3xl text-gray-900 mb-3 font-semibold">
            Profile Not Available
          </h1>
          <p className="text-gray-500 mb-8">
            This profile is either private or doesn&apos;t exist. The yogi may have chosen to keep their journey personal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="outline-button justify-center">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link href="/register" className="gold-button justify-center">
              <UserPlus className="w-4 h-4" />
              Join Vedic Yoga
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-[#FAFAFA]">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFC078]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card"
        >
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-r from-orange-100 via-orange-50 to-[#FFC078]/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,153,51,0.15),transparent)]" />
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-16 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              {profile?.profile_pic_url ? (
                <img
                  src={profile.profile_pic_url || '/default-avatar.png'}
                  alt={profile.full_name || 'Profile'}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 border-4 border-white flex items-center justify-center shadow-lg">
                  <User className="w-14 h-14 text-orange-300" />
                </div>
              )}
              {/* Online dot */}
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-white shadow-sm" />
            </motion.div>
          </div>

          {/* Info */}
          <div className="text-center px-6 pt-4 pb-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl md:text-4xl text-gray-900 font-semibold"
            >
              {profile?.full_name}
            </motion.h1>

            {profile?.city && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-sm mt-1"
              >
                📍 {profile.city}
              </motion.p>
            )}

            {profile?.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-gray-600 mt-4 text-sm leading-relaxed max-w-md mx-auto"
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
                className="inline-flex items-center gap-1.5 mt-3 text-[#FF9933] hover:text-[#E8872E] transition-colors text-sm font-medium"
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
            className="grid grid-cols-3 gap-4 mx-6 my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="font-heading text-2xl text-gray-900 font-semibold">{bookingsCount}</p>
              <p className="text-gray-500 text-xs">Classes Done</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <p className="font-heading text-2xl text-gray-900 font-semibold">7</p>
              <p className="text-gray-500 text-xs">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CalendarDays className="w-4 h-4 text-[#FF9933]" />
              </div>
              <p className="font-heading text-2xl text-gray-900 font-semibold">{joinDate}</p>
              <p className="text-gray-500 text-xs">Joined</p>
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
              <Award className="w-5 h-5 text-[#FF9933]" />
              <h3 className="font-heading text-lg text-gray-900 font-semibold">Achievements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full ${badge.bg} border border-gray-100/50`}
                >
                  <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
                  <span className="text-gray-700 text-xs font-medium">{badge.label}</span>
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
            Join Vedic Yoga
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-400 text-xs mt-8"
        >
          🕉️ Vedic Yoga Alliance — Preserving Ancient Wisdom
        </motion.p>
      </div>
    </div>
  );
}
