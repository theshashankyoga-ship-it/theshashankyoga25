'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  User, Camera, Save, Globe, Lock, Copy, Check,
  Share2, Instagram, MessageCircle, ExternalLink, Loader2
} from 'lucide-react';

const SITE_URL = 'https://theshashankyoga25-83kv.vercel.app';

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  avatar_url: string;
  bio: string;
  is_public: boolean;
  instagram_url: string;
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    avatar_url: '',
    bio: '',
    is_public: false,
    instagram_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile({
            full_name: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            city: data.city || '',
            avatar_url: data.avatar_url || '',
            bio: data.bio || '',
            is_public: data.is_public || false,
            instagram_url: data.instagram_url || '',
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          city: profile.city,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          is_public: profile.is_public,
          instagram_url: profile.instagram_url,
        })
        .eq('id', user.id);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  };

  const profileUrl = `${SITE_URL}/profile/${encodeURIComponent(profile.full_name)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out my yoga profile on ZenFlow! 🧘\n${profileUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleChange = (field: keyof ProfileData, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-zen-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-zen-cream">My Profile</h1>
        <p className="text-zen-light/50 mt-2">Manage your profile and sharing preferences</p>
      </div>

      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-center gap-6">
          <div className="relative group">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-zen-sage/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zen-sage/30 to-zen-gold/20 flex items-center justify-center border-2 border-zen-sage/20">
                <User className="w-10 h-10 text-zen-cream/40" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-xl text-zen-cream">{profile.full_name || 'Your Name'}</h3>
            <p className="text-zen-light/40 text-sm">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {profile.is_public ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> Public Profile
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-zen-light/40 bg-zen-medium/30 px-2.5 py-1 rounded-full">
                  <Lock className="w-3 h-3" /> Private Profile
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-6 space-y-5"
      >
        <h3 className="font-heading text-xl text-zen-cream mb-4">Profile Details</h3>

        {/* Full Name */}
        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={profile.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
          />
          <label>Full Name</label>
        </div>

        {/* Phone */}
        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={profile.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <label>Phone</label>
        </div>

        {/* City */}
        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={profile.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
          <label>City</label>
        </div>

        {/* Avatar URL */}
        <div className="floating-label-input">
          <input
            type="url"
            placeholder=" "
            value={profile.avatar_url}
            onChange={(e) => handleChange('avatar_url', e.target.value)}
          />
          <label>Profile Picture URL</label>
        </div>

        {/* Bio */}
        <div className="floating-label-input">
          <textarea
            rows={3}
            placeholder=" "
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="resize-none"
          />
          <label>Bio</label>
        </div>

        {/* Instagram URL */}
        <div className="floating-label-input">
          <input
            type="url"
            placeholder=" "
            value={profile.instagram_url}
            onChange={(e) => handleChange('instagram_url', e.target.value)}
          />
          <label>Instagram URL (optional)</label>
        </div>

        {/* Public Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zen-dark/40 border border-zen-sage/10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${profile.is_public ? 'bg-emerald-400/10' : 'bg-zen-medium/30'}`}>
              {profile.is_public ? (
                <Globe className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-zen-light/40" />
              )}
            </div>
            <div>
              <p className="text-zen-cream text-sm font-medium">Make Profile Public</p>
              <p className="text-zen-light/40 text-xs">Allow anyone to view your profile via a shareable link</p>
            </div>
          </div>
          <button
            onClick={() => handleChange('is_public', !profile.is_public)}
            className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
              profile.is_public
                ? 'bg-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-zen-medium/50'
            }`}
          >
            <motion.div
              layout
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${
                profile.is_public ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="gold-button w-full justify-center text-sm"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved Successfully!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Profile
            </>
          )}
        </button>
      </motion.div>

      {/* Share Profile Section */}
      <AnimatePresence>
        {profile.is_public && profile.full_name && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="glass-card p-6 mb-6 border-t-2 border-t-zen-gold/50 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-zen-gold" />
              <h3 className="font-heading text-xl text-zen-cream">Share Your Profile</h3>
            </div>

            <p className="text-zen-light/50 text-sm mb-4">
              Your profile is public! Share your yoga journey with friends and the community.
            </p>

            {/* Shareable Link */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-zen-dark/60 border border-zen-sage/15 rounded-xl px-4 py-3 flex items-center gap-2 overflow-hidden">
                <ExternalLink className="w-4 h-4 text-zen-sage shrink-0" />
                <span className="text-zen-cream/70 text-sm truncate font-mono">
                  {profileUrl}
                </span>
              </div>
              <button
                onClick={copyLink}
                className={`shrink-0 p-3 rounded-xl transition-all duration-300 ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zen-medium/40 text-zen-cream hover:bg-zen-medium/60 border border-zen-sage/15'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3">
              <button
                onClick={shareWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/25 transition-all text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Share on WhatsApp
              </button>

              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20 text-purple-300 hover:from-purple-500/25 hover:to-pink-500/25 transition-all text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
            </div>

            {/* Preview link */}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-zen-gold text-sm hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview your public profile
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
