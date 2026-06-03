'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, Phone, MapPin, Mail } from 'lucide-react';

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Careers', href: '#' },
];

const resourceLinks = [
  { name: 'Find Classes', href: '/classes' },
  { name: 'Register', href: '/register' },
  { name: 'Student Login', href: '/login' },
  { name: 'Studio Login', href: '/login' },
];

const communityLinks = [
  { name: 'Blog', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Teacher Training', href: '#' },
  { name: 'Wellness Tips', href: '#' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Phone, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9933] to-[#E8872E] flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">V</span>
              </div>
              <span className="font-heading text-xl font-semibold text-white">
                Vedic<span className="text-[#FF9933]"> Yoga Alliance</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Preserving ancient wisdom, empowering modern yoga. Connecting students,
              teachers, and studios across India and beyond.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#FF9933] transition-colors"
                />
                <button className="px-5 py-2.5 rounded-full bg-[#FF9933] text-white text-sm font-medium hover:bg-[#E8872E] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-[#FF9933] hover:text-[#FF9933] hover:bg-[#FF9933]/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#FF9933] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#FF9933] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF9933] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  42 Serenity Lane, Wellness District,<br />New Delhi, India 110001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span className="text-gray-400 text-sm">hello@vedicyoga.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vedic Yoga Alliance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-[#FF9933] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-[#FF9933] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
