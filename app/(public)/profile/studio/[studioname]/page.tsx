'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import {
  Building2, ArrowLeft,
  UserPlus, Instagram, MapPin
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
            <Building2 className="w-10 h-10 text-zen-light/30" />
          </div>
          <h1 className="font-heading text-3xl text-zen-cream mb-3">
            Studio Not Available
          </h1>
          <p className="text-zen-light/50 mb-8">
            This studio profile is either private or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="outline-button justify-center">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
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

          {/* Avatar / Logo */}
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
                  alt={profile.full_name || 'Studio Logo'}
                  className="w-32 h-32 rounded-full object-cover border-4 border-zen-dark shadow-2xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-zen-sage/40 to-zen-gold/30 border-4 border-zen-dark flex items-center justify-center shadow-2xl">
                  <Building2 className="w-14 h-14 text-zen-cream/60" />
                </div>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className="text-center px-6 pt-4 pb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl md:text-4xl text-zen-cream"
            >
              {profile?.full_name}
            </motion.h1>

            {profile?.city && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-1.5 text-zen-light/40 text-sm mt-2"
              >
                <MapPin className="w-4 h-4" />
                <span>{profile.city}</span>
              </motion.div>
            )}

            {profile?.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-zen-light/70 mt-6 text-sm leading-relaxed max-w-md mx-auto"
              >
                {profile.bio}
              </motion.p>
            )}

            {profile?.instagram_url && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 hover:from-purple-500/20 hover:to-pink-500/20 transition-all text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </motion.div>
            )}
          </div>
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
            Join This Studio
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
