import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Vedic Yoga Alliance — Preserving Ancient Wisdom, Empowering Modern Yoga',
  description:
    'Vedic Yoga Alliance connects students, yoga teachers, studios, and wellness communities. Discover premium yoga classes, find certified instructors, and join our growing community.',
  keywords: ['yoga', 'vedic yoga', 'wellness', 'meditation', 'yoga alliance', 'yoga teachers', 'yoga studio', 'yoga classes'],
  openGraph: {
    title: 'Vedic Yoga Alliance — Preserving Ancient Wisdom, Empowering Modern Yoga',
    description: 'Connect with certified yoga teachers and studios. Join our community.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-body bg-vedic-bg text-vedic-dark min-h-screen">
        <ToastProvider>
          <CustomCursor />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
