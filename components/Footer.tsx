'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  'Quick Links': [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Classes', href: '/classes' },
    { name: 'Contact', href: '/contact' },
    { name: 'Login', href: '/login' },
  ],
  Programs: [
    { name: 'RYT 200 Training', href: '/classes' },
    { name: 'RYT 300 Advanced', href: '/classes' },
    { name: 'RYT 500 Master', href: '/classes' },
    { name: 'Online Courses', href: '/classes' },
    { name: 'Workshops', href: '/classes' },
  ],
  Certifications: [
    { name: 'Teacher Certification', href: '/classes' },
    { name: 'Advanced Training', href: '/classes' },
    { name: 'Specialty Programs', href: '/classes' },
    { name: 'Continuing Education', href: '/classes' },
    { name: 'Verification', href: '/about' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gradient-to-b from-[#034047] to-[#01181b] text-white relative border-t border-[#034047]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E6862A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#E6862A] flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">V</span>
              </div>
              <span className="font-heading text-lg font-semibold">
                Vedic<span className="text-[#E6862A]"> Yoga</span> Alliance
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Preserving ancient wisdom. Empowering modern yoga practitioners worldwide with internationally recognized certification programs.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold mb-3">Subscribe to Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#E6862A] transition-colors"
                />
                <button className="bg-[#E6862A] hover:bg-[#C97321] text-white rounded-full px-4 py-2.5 transition-colors flex items-center gap-1 text-sm font-medium">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-white">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 text-sm hover:text-[#E6862A] transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <a href="mailto:info@vedicyogaalliance.com" className="flex items-center gap-2 text-white/50 text-sm hover:text-[#E6862A] transition-colors">
            <Mail className="w-4 h-4" /> info@vedicyogaalliance.com
          </a>
          <a href="tel:+911234567890" className="flex items-center gap-2 text-white/50 text-sm hover:text-[#E6862A] transition-colors">
            <Phone className="w-4 h-4" /> +91 123 456 7890
          </a>
          <span className="flex items-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4" /> Rishikesh, India
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Vedic Yoga Alliance. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-[#E6862A] hover:text-white transition-all duration-200"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
