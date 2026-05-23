'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  BookOpen, CheckCircle, CalendarDays, Flame,
  Clock, MapPin, Lightbulb, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const yogaTips = [
  'Start your day with 5 minutes of Pranayama — it sets the tone for mindfulness throughout the day.',
  'Consistency beats intensity. A 20-minute daily practice is more transformative than occasional 90-minute sessions.',
  'Listen to your body. Yoga is not about forcing — it\'s about finding your edge with awareness.',
  'Stay hydrated! Drink water 30 minutes before your practice, not during.',
  'End every practice with Savasana. The integration time is where the real transformation happens.',
];

export default function StudentDashboardHome() {
  const [studentName, setStudentName] = useState('Student');
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * yogaTips.length));

    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profile?.full_name) setStudentName(profile.full_name);
      }
    };
    fetchProfile();
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Classes Booked', value: '12' },
    { icon: CheckCircle, label: 'Completed', value: '8' },
    { icon: CalendarDays, label: 'This Week', value: '3' },
    { icon: Flame, label: 'Streak Days', value: '7 🔥' },
  ];

  const upcomingBookings = [
    { name: 'Morning Vinyasa Flow', studio: 'Lotus Studio', date: 'Today', time: '7:00 AM' },
    { name: 'Meditation & Breathwork', studio: 'Lotus Studio', date: 'Tomorrow', time: '6:00 AM' },
    { name: 'Power Yoga', studio: 'Lotus Studio', date: 'Thu, Nov 21', time: '6:00 PM' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-zen-cream">
          Namaste, {studentName} 🧘
        </h1>
        <p className="text-zen-light/50 mt-2">Here&apos;s your wellness overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <stat.icon className="w-5 h-5 text-zen-sage mb-3" />
            <p className="font-heading text-3xl text-zen-cream">{stat.value}</p>
            <p className="text-zen-light/50 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Class */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 border-l-4 border-l-zen-gold"
          >
            <span className="text-zen-gold text-xs tracking-widest uppercase font-medium">Today&apos;s Class</span>
            <h3 className="font-heading text-2xl text-zen-cream mt-2">Morning Vinyasa Flow</h3>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-zen-light/60">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7:00 AM — 8:00 AM</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Lotus Studio</span>
            </div>
            <button className="gold-button mt-4 text-sm">
              Join Class <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Upcoming */}
          <div className="glass-card p-6">
            <h3 className="font-heading text-xl text-zen-cream mb-4">Upcoming Bookings</h3>
            <div className="space-y-3">
              {upcomingBookings.map((booking, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zen-medium/15 border border-zen-sage/5">
                  <div>
                    <p className="text-zen-cream font-medium text-sm">{booking.name}</p>
                    <p className="text-zen-light/40 text-xs mt-0.5">{booking.studio}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zen-gold text-sm font-medium">{booking.date}</p>
                    <p className="text-zen-light/40 text-xs">{booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/my-classes" className="inline-block mt-4 text-zen-gold text-sm hover:underline">
              View All →
            </Link>
          </div>
        </div>

        {/* Tip Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 border-t-4 border-t-zen-sage"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-zen-gold" />
            <span className="text-zen-gold text-sm font-medium">Tip of the Day</span>
          </div>
          <p className="text-zen-cream/80 text-sm leading-relaxed italic">
            &ldquo;{yogaTips[tipIndex]}&rdquo;
          </p>

          <div className="mt-8">
            <Link href="/student/explore" className="gold-button text-sm w-full justify-center">
              Explore More Classes
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
