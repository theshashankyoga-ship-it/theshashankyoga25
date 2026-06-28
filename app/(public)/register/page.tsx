'use client';

import { useState, useEffect, FormEvent } from 'react';
import { User, Building2, Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, CheckCircle, Mail, AlertCircle } from 'lucide-react';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function RegisterPage() {

  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'studio' | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [studioForm, setStudioForm] = useState({
    studioName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
  });

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

      setUserEmail(email); setShowPopup(true); 

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          role,
          full_name: fullName,
          email,
          phone: role === 'studio' ? studioForm.phone : null,
          city: role === 'studio' ? studioForm.city : null,
        });

        if (role === 'studio') {
          await supabase.from('studios').insert({
            user_id: data.user.id,
            studio_name: studioForm.studioName,
            city: studioForm.city,
          });
        }

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

  if (successMessage) {
    return (
      <div className="min-h-screen flex bg-[#FAFAFA]">
        {/* Left: Background */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <WarmBackground />
          <div className="relative z-10 text-center px-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#034047] to-[#022A2F] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">🕉️</span>
            </div>
            <h2 className="font-heading text-5xl text-gray-900 mb-4 font-semibold">Almost There!</h2>
            <p className="text-gray-500 text-lg">
              One last step to begin your yoga journey.
            </p>
          </div>
        </div>

        {/* Right: Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
              >
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl text-gray-900 font-semibold mb-3"
            >
              Account Created!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-5 rounded-xl mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Verification Email Sent</span>
                </div>
                <p className="text-emerald-600 text-sm">
                  {successMessage}
                </p>
              </div>

              {registeredEmail && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                  <p className="text-gray-500 text-sm mb-1">Sent to</p>
                  <p className="text-[#034047] font-medium">{registeredEmail}</p>
                </div>
              )}

              <div className="mb-6">
                <p className="text-gray-500 text-sm">
                  Redirecting to login in{' '}
                  <span className="text-[#034047] font-bold text-lg">{countdown}</span>{' '}
                  second{countdown !== 1 ? 's' : ''}...
                </p>
                <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#034047] to-[#022A2F] rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>
              </div>

              <Link
                href="/login"
                className="teal-button w-full justify-center text-base inline-flex"
              >
                Go to Login Now <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-gray-400 text-xs mt-4">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      {/* Left: Background */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <WarmBackground />
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-3xl">🕉️</span>
          </div>
          <h2 className="font-heading text-5xl text-gray-900 mb-4 font-semibold">Begin Your Journey</h2>
          <p className="text-gray-500 text-lg">
            Join our community and experience the transformative power of yoga.
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

          <>
            <h1 className="font-heading text-3xl text-gray-900 mb-2 font-semibold">Create Account</h1>
            <p className="text-gray-500 mb-6">Join Vedic Yoga Alliance and start your practice today.</p>

            {/* Progress bar */}
            <div className="flex gap-2 mb-8">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  className={`h-1 rounded-full flex-1 ${s <= step ? 'bg-[#034047]' : 'bg-gray-100'}`}
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
                  <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Registration Failed</p>
                      <p className="text-red-500/80 text-sm mt-0.5">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage('')}
                      className="ml-auto text-red-300 hover:text-red-500 transition-colors"
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
                  <h3 className="text-gray-700 font-medium mb-6">Step 1: Choose Your Role</h3>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => handleRoleSelect('student')}
                      aria-pressed={role === 'student'}
                      className={`p-6 rounded-xl border text-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#034047] outline-none ${role === 'student'
                        ? 'border-[#034047] bg-[#e6f0f1] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <User className={`w-10 h-10 mx-auto mb-3 ${role === 'student' ? 'text-[#034047]' : 'text-gray-400'}`} />
                      <p className="font-medium text-gray-900 text-sm">I&apos;m a Student</p>
                      <p className="text-gray-500 text-xs mt-1">Find & book classes</p>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('studio')}
                      aria-pressed={role === 'studio'}
                      className={`p-6 rounded-xl border text-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#034047] outline-none ${role === 'studio'
                        ? 'border-[#034047] bg-[#e6f0f1] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <Building2 className={`w-10 h-10 mx-auto mb-3 ${role === 'studio' ? 'text-[#034047]' : 'text-gray-400'}`} />
                      <p className="font-medium text-gray-900 text-sm">I&apos;m a Studio</p>
                      <p className="text-gray-500 text-xs mt-1">List your classes</p>
                    </button>
                  </div>

                  <button onClick={goToStep2} className="teal-button w-full justify-center text-base">
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
                    className="flex items-center gap-1 text-gray-500 hover:text-[#034047] text-sm mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <h3 className="text-gray-700 font-medium mb-6">
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
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#034047] focus-visible:ring-2 focus-visible:ring-[#034047] rounded outline-none transition-colors"
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
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#034047] focus-visible:ring-2 focus-visible:ring-[#034047] rounded outline-none transition-colors"
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
                        className="w-4 h-4 rounded border-gray-300 text-[#034047] focus:ring-[#034047] bg-white"
                      />
                      <span className="text-gray-500 text-sm">
                        I agree to the{' '}
                        <a href="#" className="text-[#034047] hover:underline">Terms & Conditions</a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading || !agreed}
                      className="teal-button w-full justify-center text-base disabled:opacity-60"
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
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#034047] hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </>
        </motion.div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-orange-100 shadow-2xl rounded-2xl p-10 text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="text-gray-900 text-2xl font-semibold mb-3">
              Email Sent!
            </h2>
            <p className="text-gray-600 mb-2">
              Verification link has been sent to:
            </p>
            <p className="text-[#034047] font-semibold mb-4">
              {userEmail}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              📌 Please check your spam folder
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full teal-button justify-center font-bold py-3 rounded-lg cursor-pointer">
              Go to Login Page →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
