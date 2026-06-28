import type { Metadata } from 'next';
import './globals.css';

import { ToastProvider } from '@/components/ToastProvider';
import CustomCursor from '@/components/CustomCursor';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#034047',
};

export const metadata: Metadata = {
  title: 'Vedic Yoga Alliance — Preserving Ancient Wisdom, Empowering Modern Yoga',
  description:
    'Vedic Yoga Alliance connects students, yoga teachers, studios, and wellness communities. Discover premium yoga classes, find certified instructors, and join our growing community worldwide.',
  keywords: ['yoga', 'vedic yoga', 'wellness', 'meditation', 'yoga alliance', 'yoga teachers', 'yoga studio', 'yoga classes', 'yoga certification', 'ryt 200', 'ryt 500'],
  authors: [{ name: 'Vedic Yoga Alliance' }],
  openGraph: {
    title: 'Vedic Yoga Alliance — Preserving Ancient Wisdom',
    description: 'Connect with certified yoga teachers and studios. Join our global community.',
    url: 'https://vedicyogaalliance.com',
    siteName: 'Vedic Yoga Alliance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedic Yoga Alliance',
    description: 'Empowering Modern Yoga with Ancient Wisdom.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden">
      <body className="font-body bg-vedic-bg text-vedic-dark min-h-screen overflow-x-hidden">
        <ToastProvider>
          <CustomCursor />
          <div className="overflow-x-hidden w-full flex flex-col min-h-screen relative">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
