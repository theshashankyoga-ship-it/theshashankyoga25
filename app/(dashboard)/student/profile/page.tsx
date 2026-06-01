'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  User, Camera, Save, Globe, Lock, Copy, Check,
  Share2, Instagram, MessageCircle, ExternalLink, Loader2,
  Upload, ImagePlus
} from 'lucide-react';

const SITE_URL = 'https://theshashankyoga25-83kv.vercel.app';

export default function StudentProfilePage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [bio, setBio] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [instagramUrl, setInstagramUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (p) {
        setFullName(p.full_name || '');
        setEmail(p.email || '');
        setPhone(p.phone || '');
        setCity(p.city || '');
        setProfilePicUrl(p.avatar_url || '');
        setBio(p.bio || '');
        setIsPublic(p.is_public || false);
        setInstagramUrl(p.instagram_url || '');
      }
      setLoading(false);
    };

    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Not logged in');
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone,
        city: city,
        avatar_url: profilePicUrl,
        bio: bio,
        is_public: isPublic,
        instagram_url: instagramUrl,
      })
      .eq('id', user.id);

    if (error) {
      alert('Save failed: ' + error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      alert('Profile saved successfully!');
    }
    setSaving(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setUploading(false);
      return;
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // Update local state
    setProfilePicUrl(publicUrl);

    // Also update DB immediately so avatar persists
    await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    setUploading(false);
  };

  const profileUrl = `${SITE_URL}/profile/${encodeURIComponent(fullName)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out my yoga profile on ZenFlow! 🧘\n${profileUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
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

      {/* Avatar Section with Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-center gap-6">
          {/* Avatar with upload overlay */}
          <div className="relative group">
            {profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-zen-sage/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zen-sage/30 to-zen-gold/20 flex items-center justify-center border-2 border-zen-sage/20">
                <User className="w-10 h-10 text-zen-cream/40" />
              </div>
            )}
            {/* Upload overlay on hover/click */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              {uploading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <>
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-white text-[10px] font-medium">Change</span>
                </>
              )}
            </button>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-heading text-xl text-zen-cream">{fullName || 'Your Name'}</h3>
            <p className="text-zen-light/40 text-sm">{email}</p>
            <div className="flex items-center gap-2 mt-2">
              {isPublic ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> Public Profile
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-zen-light/40 bg-zen-medium/30 px-2.5 py-1 rounded-full">
                  <Lock className="w-3 h-3" /> Private Profile
                </span>
              )}
            </div>

            {/* Upload Photo button below info */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-3 flex items-center gap-2 text-xs text-zen-gold hover:text-zen-cream bg-zen-gold/10 hover:bg-zen-gold/20 px-3 py-1.5 rounded-lg transition-all"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImagePlus className="w-3.5 h-3.5" />
                  Upload Photo
                </>
              )}
            </button>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Full Name</label>
        </div>

        {/* Phone */}
        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Phone</label>
        </div>

        {/* City */}
        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>City</label>
        </div>

        {/* Bio */}
        <div className="floating-label-input">
          <textarea
            rows={3}
            placeholder=" "
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none"
          />
          <label>Bio</label>
        </div>

        {/* Instagram URL */}
        <div className="floating-label-input">
          <input
            type="url"
            placeholder=" "
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
          />
          <label>Instagram URL (optional)</label>
        </div>

        {/* Public Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zen-dark/40 border border-zen-sage/10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isPublic ? 'bg-emerald-400/10' : 'bg-zen-medium/30'}`}>
              {isPublic ? (
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
            onClick={() => setIsPublic(!isPublic)}
            className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
              isPublic
                ? 'bg-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-zen-medium/50'
            }`}
          >
            <motion.div
              layout
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${
                isPublic ? 'left-6' : 'left-1'
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
        {isPublic && fullName && (
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

              {instagramUrl && (
                <a
                  href={instagramUrl}
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
