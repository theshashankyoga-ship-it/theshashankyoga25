'use client';

import Link from 'next/link';
import { Flower2, Instagram, Facebook, Youtube, Phone, MapPin, Mail } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Classes', href: '/classes' },
  { name: 'Contact', href: '/contact' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
];

const classLinks = [
  { name: 'Morning Vinyasa', href: '/classes' },
  { name: 'Power Yoga', href: '/classes' },
  { name: 'Yin & Restore', href: '/classes' },
  { name: 'Meditation', href: '/classes' },
  { name: 'Prenatal Yoga', href: '/classes' },
  { name: 'Kids Yoga', href: '/classes' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Phone, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-zen-deep border-t border-zen-sage/10 overflow-hidden">
      {/* Subtle lotus pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {[...Array(8)].map((_, i) => (
            <g key={i} transform={`translate(${(i % 4) * 200 + 50}, ${Math.floor(i / 4) * 300 + 100})`}>
              <path
                d="M50 0 C60 20, 80 40, 50 80 C20 40, 40 20, 50 0Z"
                fill="#7A9E7E"
                opacity="0.5"
              />
              <path
                d="M50 0 C70 10, 100 30, 80 70 C50 50, 50 20, 50 0Z"
                fill="#7A9E7E"
                opacity="0.3"
              />
              <path
                d="M50 0 C30 10, 0 30, 20 70 C50 50, 50 20, 50 0Z"
                fill="#7A9E7E"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flower2 className="w-7 h-7 text-zen-gold" />
              <span className="font-heading text-2xl font-semibold text-zen-cream">
                Zen<span className="text-zen-gold">Flow</span>
              </span>
            </Link>
            <p className="text-zen-light/60 text-sm leading-relaxed mb-6">
              Premium yoga experiences for mind, body & soul. Join our community of over 500 students
              and discover your path to inner peace.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-zen-sage/20 flex items-center justify-center text-zen-light/60 hover:border-zen-gold hover:text-zen-gold hover:bg-zen-gold/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-zen-cream mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zen-light/60 text-sm hover:text-zen-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="font-heading text-lg text-zen-cream mb-5">Our Classes</h4>
            <ul className="space-y-3">
              {classLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zen-light/60 text-sm hover:text-zen-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-zen-cream mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zen-sage mt-0.5 shrink-0" />
                <span className="text-zen-light/60 text-sm">
                  42 Serenity Lane, Wellness District,<br />New Delhi, India 110001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zen-sage shrink-0" />
                <span className="text-zen-light/60 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zen-sage shrink-0" />
                <span className="text-zen-light/60 text-sm">hello@zenflow.yoga</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zen-sage/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zen-light/40 text-sm">
            © 2024 ZenFlow Yoga. Built with 🧘 and Next.js
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zen-light/40 text-sm hover:text-zen-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-zen-light/40 text-sm hover:text-zen-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
