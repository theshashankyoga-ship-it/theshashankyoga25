'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flower2, Loader2, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ToastProvider';

function LotusBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zen-dark via-zen-medium to-zen-dark" />
      {[...Array(8)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute"
          width={16 + Math.random() * 20}
          height={16 + Math.random() * 20}
          viewBox="0 0 40 40"
          fill="none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          <path d="M20 2 C24 10, 34 16, 20 38 C6 16, 16 10, 20 2Z" fill="#C9A84C" opacity="0.5" />
        </motion.svg>
      ))}
    </div>
  );
}

function AdminBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A0F1E 0%, #131B35 50%, #0A0F1E 100%)' }} />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#7C3AED',
          }}
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zen-dark">
        <Loader2 className="w-8 h-8 text-zen-gold animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '';
  const isAdminMode = searchParams.get('admin') === 'true';
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'student' | 'studio'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        showToast('error', error.message);
        setLoading(false);
        return;
      }

      // Get user profile role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      console.log('Profile data:', profile);
      console.log('Profile error:', profileError);

      const role = profile?.role;

      if (isAdminMode) {
        showToast('success', 'Welcome, Admin 🛡️');
      } else {
        showToast('success', 'Welcome back! 🙏');
      }

      if (role === 'admin') {
        window.location.href = '/admin';
        return;
      } else if (role === 'studio') {
        window.location.href = '/studio';
        return;
      } else if (role === 'student') {
        window.location.href = '/student';
        return;
      } else {
        // role is null — fall back to user_metadata
        const { data: { user } } = await supabase.auth.getUser();
        const fallbackRole = user?.user_metadata?.role;
        if (fallbackRole === 'admin') {
          window.location.href = '/admin';
        } else if (fallbackRole === 'studio') {
          window.location.href = '/studio';
        } else {
          window.location.href = '/student';
        }
        return;
      }
    } catch (err) {
      showToast('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ===================== ADMIN LOGIN UI =====================
  if (isAdminMode) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#0A0F1E' }}>
        {/* Left: Admin Background */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <AdminBackground />
          <div className="relative z-10 text-center px-12">
            <Shield className="w-16 h-16 mx-auto mb-6" style={{ color: '#7C3AED' }} />
            <h2 className="font-heading text-5xl text-white mb-4">Admin Portal</h2>
            <p className="text-gray-400 text-lg">
              Secure access for system administrators only.
            </p>
          </div>
        </div>

        {/* Right: Admin Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'rgba(124, 58, 237, 0.03)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <Shield className="w-7 h-7" style={{ color: '#7C3AED' }} />
              <span className="font-heading text-2xl text-white">
                Admin<span style={{ color: '#7C3AED' }}>Panel</span>
              </span>
            </div>

            <h1 className="font-heading text-3xl text-white mb-2">Admin Sign In 🛡️</h1>
            <p className="text-gray-400 mb-8">Enter your admin credentials to continue.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="admin@vedic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="admin-login-email"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all focus:ring-2 focus:ring-purple-500/40"
                  style={{
                    backgroundColor: 'rgba(124, 58, 237, 0.08)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                  }}
                />
              </div>

              <div className="relative">
                <label className="text-gray-400 text-xs mb-1.5 block">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="admin-login-password"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(124, 58, 237, 0.08)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 bottom-3 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-white text-base font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Admin Login
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 text-xs mt-10 tracking-wide uppercase">
              Authorized Personnel Only
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // ===================== NORMAL LOGIN UI =====================
  return (
    <div className="min-h-screen flex">
      {/* Left: Background */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <LotusBackground />
        <div className="relative z-10 text-center px-12">
          <Flower2 className="w-16 h-16 text-zen-gold mx-auto mb-6" />
          <h2 className="font-heading text-5xl text-zen-cream mb-4">Welcome Back</h2>
          <p className="text-zen-light/60 text-lg">
            Continue your journey of mindfulness and well-being with ZenFlow.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zen-cream/[0.03]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Flower2 className="w-7 h-7 text-zen-gold" />
            <span className="font-heading text-2xl text-zen-cream">
              Zen<span className="text-zen-gold">Flow</span>
            </span>
          </div>

          <h1 className="font-heading text-3xl text-zen-cream mb-2">Sign In</h1>
          <p className="text-zen-light/50 mb-8">Enter your credentials to access your dashboard.</p>

          {/* Tab Toggle */}
          <div className="flex bg-zen-medium/30 rounded-full p-1 mb-8">
            {(['student', 'studio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${activeTab === tab
                  ? 'bg-zen-gold text-zen-dark'
                  : 'text-zen-light/60 hover:text-zen-cream'
                  }`}
              >
                {tab} Login
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="floating-label-input">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="login-email"
              />
              <label htmlFor="login-email">Email Address</label>
            </div>

            <div className="floating-label-input relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="login-password"
              />
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zen-light/40 hover:text-zen-gold transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-zen-gold text-sm hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gold-button w-full justify-center text-base disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zen-sage/20" />
            <span className="text-zen-light/30 text-sm">or</span>
            <div className="flex-1 h-px bg-zen-sage/20" />
          </div>

          <p className="text-center text-zen-light/50 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-zen-gold hover:underline font-medium">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
