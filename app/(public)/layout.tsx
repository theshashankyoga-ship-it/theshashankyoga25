'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Hide global navbar/footer on homepage since HeroSection has its own */}
      {!isHomePage && <Navbar />}
      <main>{children}</main>
      {!isHomePage && <Footer />}
    </>
  );
}
