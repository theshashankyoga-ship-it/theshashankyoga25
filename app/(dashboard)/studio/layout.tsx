'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, UserCircle, LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ToastProvider';

const studioLinks = [
  { name: 'Dashboard', href: '/studio', icon: LayoutDashboard },
  { name: 'Profile', href: '/studio/profile', icon: UserCircle },
];

export default function StudioDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    showToast('info', 'Logged out successfully');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar - Desktop */}
      <motion.aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        initial={false}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center shadow-sm">
                <span className="text-white font-heading font-bold text-sm">V</span>
              </div>
              <span className="font-heading text-lg font-semibold text-gray-900">
                Vedic<span className="text-[#FF9933]"> Yoga</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-[#FF9933] transition-colors ml-auto"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {studioLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-50 text-[#FF9933] font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xs">V</span>
          </div>
          <span className="font-heading text-lg text-gray-900 font-semibold">Vedic Yoga</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600 p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="md:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col pt-16"
        >
          <nav className="flex-1 py-6 px-4 space-y-1">
            {studioLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base ${
                    isActive ? 'bg-orange-50 text-[#FF9933] font-medium' : 'text-gray-600'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-red-500 hover:bg-red-50 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen md:ml-0 pt-16 md:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
