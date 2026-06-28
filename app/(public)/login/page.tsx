'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ToastProvider';

function WarmBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6f0f1] via-[#f4f8f9] to-[#ffffff]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#034047]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#056a7a]/10 rounded-full blur-[100px]" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#034047]"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

function AdminBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-gray-50 to-gray-100 opacity-80" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23034047%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#034047]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#034047]/5 rounded-full blur-[100px]" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#034047]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 2, 1],
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 text-[#034047] animate-spin" />
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      const role = profile?.role || 'student'

      if (role === 'admin') {
        window.location.href = '/admin'
      } else if (role === 'studio') {
        window.location.href = '/studio'
      } else {
        window.location.href = '/student'
      }
      return
    } catch (err) {
      showToast('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ===================== ADMIN LOGIN UI =====================
  if (isAdminMode) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        {/* Left: Admin Background */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-gray-200">
          <AdminBackground />
          <div className="relative z-10 text-center px-12">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mx-auto mb-8 border border-gray-100 transform rotate-3">
              <Shield className="w-10 h-10 text-[#034047] -rotate-3" />
            </div>
            <h2 className="font-heading text-5xl text-gray-900 mb-4 font-bold tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 text-lg font-medium">
              Secure access for system administrators only.
            </p>
          </div>
        </div>

        {/* Right: Admin Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#e6f0f1] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#034047]" />
              </div>
              <span className="font-heading text-2xl text-gray-900 font-bold">
                Admin<span className="text-[#034047]">Portal</span>
              </span>
            </div>

            <div className="mb-8">
              <h1 className="font-heading text-3xl text-gray-900 mb-2 font-bold tracking-tight">Admin Sign In</h1>
              <p className="text-gray-500">Enter your credentials to access the secure dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="floating-label-input">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="admin-login-email"
                />
                <label htmlFor="admin-login-email">Admin Email Address</label>
              </div>

              <div className="floating-label-input relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="admin-login-password"
                />
                <label htmlFor="admin-login-password">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#034047] focus-visible:ring-2 focus-visible:ring-[#034047] rounded outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="teal-button w-full justify-center text-base py-3.5 shadow-md hover:shadow-lg disabled:opacity-60 disabled:hover:shadow-md"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                Authorized Personnel Only
              </p>
            </div>
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
        <WarmBackground />
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#034047] to-[#022A2F] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-3xl">🕉️</span>
          </div>
          <h2 className="font-heading text-5xl text-gray-900 mb-4 font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-lg">
            Continue your journey of mindfulness and well-being with Vedic Yoga Alliance.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#034047] to-[#022A2F] flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xs">V</span>
            </div>
            <span className="font-heading text-xl font-semibold text-gray-800">
              Vedic<span className="text-[#034047]"> Yoga</span>
            </span>
          </div>

          <h1 className="font-heading text-3xl text-gray-900 mb-2 font-semibold">Sign In</h1>
          <p className="text-gray-500 mb-8">Enter your credentials to access your dashboard.</p>

          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            {(['student', 'studio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${activeTab === tab
                  ? 'bg-[#034047] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
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
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#034047] focus-visible:ring-2 focus-visible:ring-[#034047] rounded outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[#034047] text-sm hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="teal-button w-full justify-center text-base disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#034047] hover:underline font-medium">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
