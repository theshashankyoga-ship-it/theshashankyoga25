'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import {
  Users, BookOpen, CalendarDays, Star,
  Plus, Calendar, Clock, User
} from 'lucide-react';
import PromotionsBanner from '@/components/PromotionsBanner';

export default function StudioDashboardHome() {
  const [studioName, setStudioName] = useState('Studio');

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: studio } = await supabase
          .from('studios')
          .select('studio_name')
          .eq('user_id', user.id)
          .single();
        if (studio) setStudioName(studio.studio_name);
      }
    };
    fetchProfile();
  }, []);

  const stats = [
    { icon: Users, label: 'Total Students', value: '47', change: '+5 this week' },
    { icon: BookOpen, label: 'Active Classes', value: '6', change: '2 new this month' },
    { icon: CalendarDays, label: 'This Week Bookings', value: '23', change: '+12% from last' },
    { icon: Star, label: 'Rating', value: '4.8', change: '12 reviews' },
  ];

  const recentBookings = [
    { student: 'Meera Patel', class: 'Morning Vinyasa Flow', date: '2024-11-20', status: 'confirmed' },
    { student: 'Arjun Nair', class: 'Power Yoga', date: '2024-11-20', status: 'confirmed' },
    { student: 'Sanya Gupta', class: 'Yin & Restore', date: '2024-11-19', status: 'completed' },
    { student: 'Rahul Mehta', class: 'Morning Vinyasa Flow', date: '2024-11-19', status: 'confirmed' },
    { student: 'Diya Singh', class: 'Meditation & Breathwork', date: '2024-11-18', status: 'cancelled' },
  ];

  const todayClasses = [
    { name: 'Morning Vinyasa Flow', time: '7:00 AM', students: 12 },
    { name: 'Power Yoga', time: '6:00 PM', students: 8 },
  ];

  const statusColors: Record<string, string> = {
    confirmed: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Promotions */}
      <PromotionsBanner />

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-gray-900 font-semibold">
          Good Morning, {studioName} 🙏
        </h1>
        <p className="text-gray-500 mt-2">Here&apos;s what&apos;s happening with your studio today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f0f1] flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#034047]" />
              </div>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="font-heading text-3xl text-gray-900 font-semibold">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <a href="/studio/classes" className="teal-button text-sm font-medium">
          <Plus className="w-4 h-4" /> Add New Class
        </a>
        <a href="/studio/schedule" className="outline-teal-button text-sm font-medium">
          <Calendar className="w-4 h-4" /> View Schedule
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-heading text-xl text-gray-900 font-semibold mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-gray-400 font-medium uppercase tracking-wider text-xs">Student</th>
                  <th className="text-left py-3 text-gray-400 font-medium uppercase tracking-wider text-xs">Class</th>
                  <th className="text-left py-3 text-gray-400 font-medium uppercase tracking-wider text-xs">Date</th>
                  <th className="text-left py-3 text-gray-400 font-medium uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-900 font-medium">{booking.student}</td>
                    <td className="py-3 text-gray-600">{booking.class}</td>
                    <td className="py-3 text-gray-500">{booking.date}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="glass-card p-6">
          <h3 className="font-heading text-xl text-gray-900 font-semibold mb-4">Today&apos;s Classes</h3>
          <div className="space-y-4">
            {todayClasses.map((cls, i) => (
              <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#034047]/30 transition-colors">
                <h4 className="text-gray-900 font-medium text-sm">{cls.name}</h4>
                <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#034047]" /> {cls.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#034047]" /> {cls.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
