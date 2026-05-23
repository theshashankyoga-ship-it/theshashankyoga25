import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'ZenFlow Yoga — Premium Yoga Classes for Mind, Body & Soul',
  description:
    'Discover premium yoga classes with expert instructors. Join our community of 500+ students. Book classes in Vinyasa, Power Yoga, Yin, Meditation, and more.',
  keywords: ['yoga', 'wellness', 'meditation', 'vinyasa', 'yoga classes', 'online yoga', 'yoga studio'],
  openGraph: {
    title: 'ZenFlow Yoga — Find Your Inner Peace',
    description: 'Premium yoga classes for mind, body & soul.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-body bg-zen-dark text-zen-cream min-h-screen">
        <ToastProvider>
          <CustomCursor />
          <div className="grain-overlay" />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
