'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';
import { Clock, MapPin, XCircle, CheckCircle, RotateCcw } from 'lucide-react';

interface BookedClass {
  id: string;
  name: string;
  studio: string;
  date: string;
  time: string;
  status: 'upcoming' | 'past';
}

const bookedClasses: BookedClass[] = [
  { id: '1', name: 'Morning Vinyasa Flow', studio: 'Lotus Studio', date: 'Nov 22, 2024', time: '7:00 AM', status: 'upcoming' },
  { id: '2', name: 'Meditation & Breathwork', studio: 'Lotus Studio', date: 'Nov 23, 2024', time: '6:00 AM', status: 'upcoming' },
  { id: '3', name: 'Power Yoga', studio: 'Lotus Studio', date: 'Nov 21, 2024', time: '6:00 PM', status: 'upcoming' },
  { id: '4', name: 'Yin & Restore', studio: 'Lotus Studio', date: 'Nov 16, 2024', time: '9:00 AM', status: 'past' },
  { id: '5', name: 'Morning Vinyasa Flow', studio: 'Lotus Studio', date: 'Nov 15, 2024', time: '7:00 AM', status: 'past' },
  { id: '6', name: 'Power Yoga', studio: 'Lotus Studio', date: 'Nov 14, 2024', time: '6:00 PM', status: 'past' },
];

export default function MyClassesPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [classes, setClasses] = useState(bookedClasses);

  const filtered = classes.filter((c) => c.status === tab);

  const cancelBooking = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    showToast('success', 'Booking cancelled successfully');
  };

  const rebookClass = (name: string) => {
    showToast('success', `Re-booked ${name}! Check your upcoming classes.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-zen-cream">My Classes</h1>
        <p className="text-zen-light/50 mt-1">View and manage your booked classes.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zen-medium/20 rounded-xl p-1 w-fit mb-8">
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t ? 'bg-zen-gold text-zen-dark' : 'text-zen-light/60 hover:text-zen-cream'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Classes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {filtered.map((cls) => (
            <div key={cls.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-zen-cream font-medium">{cls.name}</h3>
                  {tab === 'past' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-800/50 text-green-300 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-zen-light/50">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {cls.studio}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.date} · {cls.time}</span>
                </div>
              </div>
              <div>
                {tab === 'upcoming' ? (
                  <button
                    onClick={() => cancelBooking(cls.id)}
                    className="flex items-center gap-1.5 text-sm text-red-400/70 hover:text-red-400 border border-red-800/30 hover:border-red-700/50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => rebookClass(cls.name)}
                    className="flex items-center gap-1.5 text-sm text-zen-gold hover:text-zen-gold/80 border border-zen-gold/30 hover:border-zen-gold/50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Re-book
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zen-light/40">No {tab} classes found.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
