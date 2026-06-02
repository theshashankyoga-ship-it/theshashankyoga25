'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Flower2, LayoutDashboard, BookOpen,
  UserCircle, LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ToastProvider';

const studentLinks = [
  { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { name: 'My Classes', href: '/student/my-classes', icon: BookOpen },
  { name: 'Profile', href: '/student/profile', icon: UserCircle },
];

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <motion.aside
        className={`hidden md:flex flex-col bg-zen-cream/[0.03] border-r border-zen-sage/10 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-zen-sage/10">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Flower2 className="w-6 h-6 text-zen-gold" />
              <span className="font-heading text-xl text-zen-cream">
                Zen<span className="text-zen-gold">Flow</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-zen-light/40 hover:text-zen-gold transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {studentLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-zen-gold/15 text-zen-gold font-medium'
                    : 'text-zen-light/60 hover:bg-zen-medium/30 hover:text-zen-cream'
                }`}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-zen-sage/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:bg-red-900/20 hover:text-red-400 transition-all w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zen-dark/95 backdrop-blur-xl border-b border-zen-sage/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Flower2 className="w-6 h-6 text-zen-gold" />
          <span className="font-heading text-lg text-zen-cream">ZenFlow</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-zen-cream p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="md:hidden fixed inset-0 z-40 bg-zen-dark/98 backdrop-blur-xl flex flex-col pt-16"
        >
          <nav className="flex-1 py-6 px-4 space-y-1">
            {studentLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base ${
                    isActive ? 'bg-zen-gold/15 text-zen-gold font-medium' : 'text-zen-light/60'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-zen-sage/10">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400/70 w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}

      <main className="flex-1 bg-zen-dark/50 min-h-screen pt-16 md:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
