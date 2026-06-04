'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Shield, LayoutDashboard, Users, Building2, Megaphone,
  LogOut, Menu, X, ChevronLeft, BarChart3
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ToastProvider';

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Students', href: '/admin?section=students', icon: Users },
  { name: 'Studios', href: '/admin?section=studios', icon: Building2 },
  { name: 'Promotions', href: '/admin?section=promotions', icon: Megaphone },
  { name: 'Analytics', href: '/admin?section=analytics', icon: BarChart3 },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
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

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin' && !globalThis.location?.search;
    return globalThis.location?.href?.includes(href);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <motion.aside
        className={`hidden md:flex flex-col transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        style={{ backgroundColor: '#0A0F1E', borderRight: '1px solid rgba(124, 58, 237, 0.15)' }}
        initial={false}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.15)' }}>
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="w-6 h-6" style={{ color: '#7C3AED' }} />
              <span className="font-heading text-xl text-white">
                Vedic<span style={{ color: '#7C3AED' }}>Admin</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                isActive(link.href)
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={
                isActive(link.href)
                  ? { backgroundColor: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA' }
                  : {}
              }
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}>
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
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: 'rgba(10, 15, 30, 0.95)', borderBottom: '1px solid rgba(124, 58, 237, 0.15)' }}
      >
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="w-6 h-6" style={{ color: '#7C3AED' }} />
          <span className="font-heading text-lg text-white">VedicAdmin</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="md:hidden fixed inset-0 z-40 backdrop-blur-xl flex flex-col pt-16"
          style={{ backgroundColor: 'rgba(10, 15, 30, 0.98)' }}
        >
          <nav className="flex-1 py-6 px-4 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base ${
                  isActive(link.href) ? 'text-purple-300 font-medium' : 'text-gray-400'
                }`}
                style={
                  isActive(link.href)
                    ? { backgroundColor: 'rgba(124, 58, 237, 0.15)' }
                    : {}
                }
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4" style={{ borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-red-400/70 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-16 md:pt-0" style={{ backgroundColor: '#070B16' }}>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
