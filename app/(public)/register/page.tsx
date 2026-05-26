'use client';

import { useState, useEffect, FormEvent } from 'react';
import { User, Building2, Eye, EyeOff, Flower2, Loader2, ArrowLeft, ArrowRight, CheckCircle, Mail, AlertCircle } from 'lucide-react';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function RegisterPage() {

  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'studio' | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ─── NEW: Inline success/error/countdown state ───
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Student fields
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Studio fields
  const [studioForm, setStudioForm] = useState({
    studioName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
  });

  // ─── Countdown timer effect ───
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleRoleSelect = (selectedRole: 'student' | 'studio') => {
    setRole(selectedRole);
  };

  const goToStep2 = () => {
    if (!role) {
      showToast('error', 'Please select a role');
      return;
    }
    setStep(2);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    if (!agreed) {
      setErrorMessage('Please agree to the terms and conditions.');
      showToast('error', 'Please agree to the terms and conditions');
      return;
    }

    if (role === 'student' && studentForm.password !== studentForm.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      showToast('error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const email = role === 'student' ? studentForm.email : studioForm.email;
      const password = role === 'student' ? studentForm.password : studioForm.password;
      const fullName = role === 'student' ? studentForm.name : studioForm.ownerName;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://theshashankyoga25-83kv.vercel.app/login',
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        showToast('error', error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Insert profile
        await supabase.from('profiles').upsert({
          id: data.user.id,
          role,
          full_name: fullName,
          email,
          phone: role === 'studio' ? studioForm.phone : null,
          city: role === 'studio' ? studioForm.city : null,
        });

        // If studio, insert studio record
        if (role === 'studio') {
          await supabase.from('studios').insert({
            user_id: data.user.id,
            studio_name: studioForm.studioName,
            city: studioForm.city,
          });
        }

        // Set success state
        showToast('success', 'Verification email sent! Check your inbox.');
        setUserEmail(email);
        setShowPopup(true);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      showToast('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── SUCCESS OVERLAY ───
  // After successful signup, replace the entire form with a beautiful confirmation screen
  if (successMessage) {
    return (
      <div className="min-h-screen flex">
        {/* Left: Background */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <LotusBackground />
          <div className="relative z-10 text-center px-12">
            <Flower2 className="w-16 h-16 text-zen-gold mx-auto mb-6" />
            <h2 className="font-heading text-5xl text-zen-cream mb-4">Almost There!</h2>
            <p className="text-zen-light/60 text-lg">
              One last step to begin your yoga journey.
            </p>
          </div>
        </div>

        {/* Right: Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zen-cream/[0.03]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-md text-center"
          >
            {/* Animated checkmark circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 border-2 border-green-500/50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl text-zen-cream mb-3"
            >
              Account Created!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Success banner */}
              <div className="bg-green-500/10 border border-green-500/40 text-green-400 p-5 rounded-xl mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Verification Email Sent</span>
                </div>
                <p className="text-green-400/80 text-sm">
                  {successMessage}
                </p>
              </div>

              {/* Email display */}
              {registeredEmail && (
                <div className="bg-zen-medium/30 border border-zen-sage/20 rounded-xl p-4 mb-6">
                  <p className="text-zen-light/50 text-sm mb-1">Sent to</p>
                  <p className="text-zen-gold font-medium">{registeredEmail}</p>
                </div>
              )}

              {/* Countdown */}
              <div className="mb-6">
                <p className="text-zen-light/50 text-sm">
                  Redirecting to login in{' '}
                  <span className="text-zen-gold font-bold text-lg">{countdown}</span>{' '}
                  second{countdown !== 1 ? 's' : ''}...
                </p>
                {/* Progress bar */}
                <div className="mt-3 w-full h-1.5 bg-zen-sage/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-zen-gold to-zen-gold/60 rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>
              </div>

              {/* Manual redirect button */}
              <Link
                href="/login"
                className="gold-button w-full justify-center text-base inline-flex"
              >
                Go to Login Now <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-zen-light/40 text-xs mt-4">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Background */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <LotusBackground />
        <div className="relative z-10 text-center px-12">
          <Flower2 className="w-16 h-16 text-zen-gold mx-auto mb-6" />
          <h2 className="font-heading text-5xl text-zen-cream mb-4">Begin Your Journey</h2>
          <p className="text-zen-light/60 text-lg">
            Join our community and experience the transformative power of yoga.
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

          <>
            <h1 className="font-heading text-3xl text-zen-cream mb-2">Create Account</h1>
            <p className="text-zen-light/50 mb-6">Join ZenFlow and start your practice today.</p>

            {/* Progress bar */}
            <div className="flex gap-2 mb-8">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  className={`h-1 rounded-full flex-1 ${s <= step ? 'bg-zen-gold' : 'bg-zen-sage/20'}`}
                  initial={false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>

            {/* ─── INLINE ERROR MESSAGE ─── */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Registration Failed</p>
                      <p className="text-red-400/80 text-sm mt-0.5">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage('')}
                      className="ml-auto text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-zen-cream font-medium mb-6">Step 1: Choose Your Role</h3>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => handleRoleSelect('student')}
                      className={`p-6 rounded-xl border text-center transition-all duration-300 ${role === 'student'
                        ? 'border-zen-gold bg-zen-gold/10 shadow-lg shadow-zen-gold/10'
                        : 'border-zen-sage/20 hover:border-zen-sage/40'
                        }`}
                    >
                      <User className={`w-10 h-10 mx-auto mb-3 ${role === 'student' ? 'text-zen-gold' : 'text-zen-light/60'}`} />
                      <p className="font-medium text-zen-cream text-sm">I&apos;m a Student</p>
                      <p className="text-zen-light/40 text-xs mt-1">Find & book classes</p>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('studio')}
                      className={`p-6 rounded-xl border text-center transition-all duration-300 ${role === 'studio'
                        ? 'border-zen-gold bg-zen-gold/10 shadow-lg shadow-zen-gold/10'
                        : 'border-zen-sage/20 hover:border-zen-sage/40'
                        }`}
                    >
                      <Building2 className={`w-10 h-10 mx-auto mb-3 ${role === 'studio' ? 'text-zen-gold' : 'text-zen-light/60'}`} />
                      <p className="font-medium text-zen-cream text-sm">I&apos;m a Studio</p>
                      <p className="text-zen-light/40 text-xs mt-1">List your classes</p>
                    </button>
                  </div>

                  <button onClick={goToStep2} className="gold-button w-full justify-center text-base">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => { setStep(1); setErrorMessage(''); }}
                    className="flex items-center gap-1 text-zen-light/50 hover:text-zen-gold text-sm mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <h3 className="text-zen-cream font-medium mb-6">
                    Step 2: {role === 'student' ? 'Student' : 'Studio'} Details
                  </h3>

                  <form onSubmit={handleRegister} className="space-y-4">
                    {role === 'student' ? (
                      <>
                        <div className="floating-label-input">
                          <input
                            type="text"
                            placeholder=" "
                            value={studentForm.name}
                            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                            required
                            id="reg-name"
                          />
                          <label htmlFor="reg-name">Full Name</label>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="email"
                            placeholder=" "
                            value={studentForm.email}
                            onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                            required
                            id="reg-email"
                          />
                          <label htmlFor="reg-email">Email Address</label>
                        </div>
                        <div className="floating-label-input relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder=" "
                            value={studentForm.password}
                            onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                            required
                            minLength={6}
                            id="reg-password"
                          />
                          <label htmlFor="reg-password">Password</label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zen-light/40 hover:text-zen-gold transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="password"
                            placeholder=" "
                            value={studentForm.confirmPassword}
                            onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                            required
                            id="reg-confirm"
                          />
                          <label htmlFor="reg-confirm">Confirm Password</label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="floating-label-input">
                          <input
                            type="text"
                            placeholder=" "
                            value={studioForm.studioName}
                            onChange={(e) => setStudioForm({ ...studioForm, studioName: e.target.value })}
                            required
                            id="reg-studio-name"
                          />
                          <label htmlFor="reg-studio-name">Studio Name</label>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="text"
                            placeholder=" "
                            value={studioForm.ownerName}
                            onChange={(e) => setStudioForm({ ...studioForm, ownerName: e.target.value })}
                            required
                            id="reg-owner"
                          />
                          <label htmlFor="reg-owner">Owner Name</label>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="email"
                            placeholder=" "
                            value={studioForm.email}
                            onChange={(e) => setStudioForm({ ...studioForm, email: e.target.value })}
                            required
                            id="reg-studio-email"
                          />
                          <label htmlFor="reg-studio-email">Email Address</label>
                        </div>
                        <div className="floating-label-input relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder=" "
                            value={studioForm.password}
                            onChange={(e) => setStudioForm({ ...studioForm, password: e.target.value })}
                            required
                            minLength={6}
                            id="reg-studio-password"
                          />
                          <label htmlFor="reg-studio-password">Password</label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zen-light/40 hover:text-zen-gold transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="tel"
                            placeholder=" "
                            value={studioForm.phone}
                            onChange={(e) => setStudioForm({ ...studioForm, phone: e.target.value })}
                            required
                            id="reg-phone"
                          />
                          <label htmlFor="reg-phone">Phone Number</label>
                        </div>
                        <div className="floating-label-input">
                          <input
                            type="text"
                            placeholder=" "
                            value={studioForm.city}
                            onChange={(e) => setStudioForm({ ...studioForm, city: e.target.value })}
                            required
                            id="reg-city"
                          />
                          <label htmlFor="reg-city">City</label>
                        </div>
                      </>
                    )}

                    <label className="flex items-center gap-3 py-2">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 rounded border-zen-sage/30 text-zen-gold focus:ring-zen-gold bg-zen-medium/30"
                      />
                      <span className="text-zen-light/50 text-sm">
                        I agree to the{' '}
                        <a href="#" className="text-zen-gold hover:underline">Terms & Conditions</a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading || !agreed}
                      className="gold-button w-full justify-center text-base disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="ml-2">Creating Account...</span>
                        </>
                      ) : (
                        <>
                          Create Account <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-zen-sage/20" />
              <span className="text-zen-light/30 text-sm">or</span>
              <div className="flex-1 h-px bg-zen-sage/20" />
            </div>

            <p className="text-center text-zen-light/50 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-zen-gold hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </>
        </motion.div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1A3320] border border-[#C9A84C] rounded-2xl p-10 text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="text-[#C9A84C] text-2xl font-bold mb-3">
              Email Bhej Diya!
            </h2>
            <p className="text-[#E8E0D0] mb-2">
              Verification link bheja gaya hai:
            </p>
            <p className="text-[#C9A84C] font-semibold mb-4">
              {userEmail}
            </p>
            <p className="text-[#9BB89A] text-sm mb-6">
              📌 Spam folder bhi check karo
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-[#C9A84C] text-[#0D1F0F] font-bold py-3 rounded-lg cursor-pointer">
              Login Page Par Jao →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
