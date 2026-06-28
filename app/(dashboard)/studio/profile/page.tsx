'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  Building2, Camera, Save, Globe, Lock, Copy, Check,
  Share2, Instagram, MessageCircle, ExternalLink, Loader2,
  Upload, ImagePlus
} from 'lucide-react';

const SITE_URL = 'https://theshashankyoga25-83kv.vercel.app';

export default function StudioProfilePage() {
  const [studioName, setStudioName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [bio, setBio] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

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

      const { data: s } = await supabase
        .from('studios')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (p) {
        setOwnerName(p.full_name || '');
        setPhone(p.phone || '');
        setCity(p.city || '');
        setProfilePicUrl(p.profile_pic_url || '');
        setBio(p.bio || '');
        setIsPublic(p.is_public || false);
        setInstagramUrl(p.instagram_url || '');
      }
      
      if (s) {
        setStudioName(s.studio_name || '');
      } else if (p) {
        setStudioName(p.full_name || '');
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

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: studioName,
        phone: phone,
        city: city,
        profile_pic_url: profilePicUrl,
        bio: bio,
        is_public: isPublic,
        instagram_url: instagramUrl,
      })
      .eq('id', user.id);

    await supabase
      .from('studios')
      .update({
        studio_name: studioName,
        city: city,
      })
      .eq('user_id', user.id);

    if (profileError) {
      alert('Save failed: ' + profileError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
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
    const filePath = `${user.id}/studio_avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    setProfilePicUrl(publicUrl);

    await supabase
      .from('profiles')
      .update({ profile_pic_url: publicUrl })
      .eq('id', user.id);

    setUploading(false);
  };

  const profileUrl = `${SITE_URL}/profile/studio/${encodeURIComponent(studioName)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out our yoga studio on Vedic Yoga Alliance! 🧘\n${profileUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-[#034047] border-t-transparent rounded-full"
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
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-gray-900 font-semibold">Studio Profile</h1>
        <p className="text-gray-500 mt-2">Manage your studio&apos;s public presence</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-center gap-6">
          <div className="relative group">
            {profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="Studio Logo"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#e6f0f1] flex items-center justify-center border-2 border-[#034047]/20">
                <Building2 className="w-10 h-10 text-[#034047]/30" />
              </div>
            )}
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-heading text-xl text-gray-900 font-semibold">{studioName || 'Your Studio'}</h3>
            <p className="text-gray-500 text-sm">{city}</p>
            <div className="flex items-center gap-2 mt-2">
              {isPublic ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> Public Profile
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                  <Lock className="w-3 h-3" /> Private Profile
                </span>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-3 flex items-center gap-2 text-xs font-medium text-[#034047] hover:text-white bg-[#e6f0f1] hover:bg-[#034047] px-3 py-1.5 rounded-lg transition-all"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-6 space-y-5"
      >
        <h3 className="font-heading text-xl text-gray-900 font-semibold mb-4">Studio Details</h3>

        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
          />
          <label>Studio Name</label>
        </div>

        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <label>Owner Name</label>
        </div>

        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Phone</label>
        </div>

        <div className="floating-label-input">
          <input
            type="text"
            placeholder=" "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>City</label>
        </div>

        <div className="floating-label-input">
          <textarea
            rows={3}
            placeholder=" "
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none"
          />
          <label>Description/Bio</label>
        </div>

        <div className="floating-label-input">
          <input
            type="url"
            placeholder=" "
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
          />
          <label>Instagram URL (optional)</label>
        </div>

        <div className="floating-label-input">
          <input
            type="url"
            placeholder=" "
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <label>Website URL (optional)</label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isPublic ? 'bg-emerald-100' : 'bg-gray-200'}`}>
              {isPublic ? (
                <Globe className="w-5 h-5 text-emerald-600" />
              ) : (
                <Lock className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-gray-900 text-sm font-semibold">Make Profile Public</p>
              <p className="text-gray-500 text-xs mt-0.5">Allow anyone to view your studio via a shareable link</p>
            </div>
          </div>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
              isPublic
                ? 'bg-emerald-500 shadow-sm'
                : 'bg-gray-300'
            }`}
          >
            <motion.div
              layout
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                isPublic ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="teal-button w-full justify-center text-sm font-semibold"
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

      <AnimatePresence>
        {isPublic && studioName && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="glass-card p-6 mb-6 border-t-2 border-t-[#034047] overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-[#034047]" />
              <h3 className="font-heading text-xl text-gray-900 font-semibold">Share Your Studio Link</h3>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              Your studio profile is public! Share it with students so they can easily find and join your classes.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-2 overflow-hidden">
                <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-600 text-sm truncate font-mono">
                  {profileUrl}
                </span>
              </div>
              <button
                onClick={copyLink}
                className={`shrink-0 p-3 rounded-xl transition-all duration-300 ${
                  copied
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={shareWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-all text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Share on WhatsApp
              </button>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[#034047] text-sm font-medium hover:underline"
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
