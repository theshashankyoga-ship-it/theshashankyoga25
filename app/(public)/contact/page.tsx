'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import { useToast } from '@/components/ToastProvider';
import {
  MapPin, Phone, Mail, Clock,
  Instagram, Facebook, Youtube, MessageCircle, Send
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['42 Serenity Lane, Wellness District', 'New Delhi, India 110001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 11 2345 6789'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@zenflow.yoga', 'support@zenflow.yoga'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Sat: 6:00 AM – 9:00 PM', 'Sunday: 7:00 AM – 2:00 PM'],
  },
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp', color: 'hover:text-green-400' },
];

export default function ContactPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));

    showToast('success', 'Message sent successfully! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-zen-sage/10 via-zen-dark to-zen-dark" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zen-gold text-sm tracking-[0.3em] uppercase font-medium"
          >
            Get In Touch
          </motion.span>
          <AnimatedText
            text="Contact Us"
            className="font-heading text-5xl md:text-6xl text-zen-cream mt-3 justify-center"
          />
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl text-zen-cream mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="floating-label-input">
                <input
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  id="contact-name"
                />
                <label htmlFor="contact-name">Your Name</label>
              </div>

              <div className="floating-label-input">
                <input
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  id="contact-email"
                />
                <label htmlFor="contact-email">Email Address</label>
              </div>

              <div className="floating-label-input">
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  id="contact-subject"
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="classes">Classes & Scheduling</option>
                  <option value="studio">Studio Partnership</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="feedback">Feedback</option>
                </select>
                <label htmlFor="contact-subject">Subject</label>
              </div>

              <div className="floating-label-input">
                <textarea
                  rows={5}
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  id="contact-message"
                />
                <label htmlFor="contact-message">Your Message</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gold-button w-full justify-center text-base disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zen-dark/30 border-t-zen-dark rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-heading text-3xl text-zen-cream mb-8">Contact Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <info.icon className="w-6 h-6 text-zen-gold mb-3" />
                  <h4 className="font-heading text-lg text-zen-cream mb-2">{info.title}</h4>
                  {info.details.map((d, j) => (
                    <p key={j} className="text-zen-light/60 text-sm">{d}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass-card p-1 overflow-hidden">
              <div className="w-full h-48 bg-zen-medium/40 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-zen-sage mx-auto mb-2" />
                  <p className="text-zen-light/40 text-sm">Interactive map</p>
                  <p className="text-zen-light/30 text-xs">42 Serenity Lane, New Delhi</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-heading text-lg text-zen-cream mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-xl border border-zen-sage/20 flex items-center justify-center text-zen-light/60 ${social.color} hover:border-current hover:bg-current/10 transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
