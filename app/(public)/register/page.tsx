'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Eye, EyeOff, Flower2, Loader2, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
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
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'studio' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

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

    if (!agreed) {
      showToast('error', 'Please agree to the terms and conditions');
      return;
    }

    if (role === 'student' && studentForm.password !== studentForm.confirmPassword) {
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
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
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

        showToast('success', 'Registration successful! Welcome to ZenFlow 🙏');
        router.push(role === 'studio' ? '/studio' : '/student');
      }
    } catch (err) {
      showToast('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                    className={`p-6 rounded-xl border text-center transition-all duration-300 ${
                      role === 'student'
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
                    className={`p-6 rounded-xl border text-center transition-all duration-300 ${
                      role === 'studio'
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
                  onClick={() => setStep(1)}
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
                      <Loader2 className="w-5 h-5 animate-spin" />
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
        </motion.div>
      </div>
    </div>
  );
}
