'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';
import { Search, Clock, MapPin, BarChart3, Filter } from 'lucide-react';

interface ExploreClass {
  id: string;
  name: string;
  studio: string;
  style: string;
  schedule: string;
  level: string;
  price: string;
  duration: string;
}

const exploreClasses: ExploreClass[] = [
  { id: '1', name: 'Morning Vinyasa Flow', studio: 'Lotus Studio', style: 'Vinyasa', schedule: 'Mon/Wed/Fri 7AM', level: 'Beginner', price: 'Free', duration: '60 min' },
  { id: '2', name: 'Power Yoga', studio: 'Lotus Studio', style: 'Power', schedule: 'Tue/Thu 6PM', level: 'Advanced', price: '₹500/mo', duration: '45 min' },
  { id: '3', name: 'Yin & Restore', studio: 'Serenity Shala', style: 'Yin', schedule: 'Sat 9AM', level: 'All', price: '₹500/mo', duration: '75 min' },
  { id: '4', name: 'Prenatal Yoga', studio: 'Bloom Wellness', style: 'Prenatal', schedule: 'Wed 5PM', level: 'Beginner', price: '₹500/mo', duration: '50 min' },
  { id: '5', name: 'Kids Yoga', studio: 'Lotus Studio', style: 'Kids', schedule: 'Sat/Sun 10AM', level: 'Beginner', price: 'Free', duration: '30 min' },
  { id: '6', name: 'Meditation & Breathwork', studio: 'Inner Peace Center', style: 'Meditation', schedule: 'Daily 6AM', level: 'All', price: 'Free', duration: '40 min' },
  { id: '7', name: 'Ashtanga Primary Series', studio: 'Mysore Room', style: 'Ashtanga', schedule: 'Mon-Fri 6AM', level: 'Intermediate', price: '₹800/mo', duration: '90 min' },
  { id: '8', name: 'Hot Yoga Sculpt', studio: 'Blaze Yoga', style: 'Hot Yoga', schedule: 'Mon/Wed 7PM', level: 'Intermediate', price: '₹600/mo', duration: '60 min' },
];

export default function ExplorePage() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = exploreClasses.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.studio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.style.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || cls.level === filterLevel || cls.level === 'All';
    const matchesPrice = filterPrice === 'All' ||
      (filterPrice === 'Free' && cls.price === 'Free') ||
      (filterPrice === 'Paid' && cls.price !== 'Free');
    return matchesSearch && matchesLevel && matchesPrice;
  });

  const bookClass = (name: string) => {
    showToast('success', `Successfully booked "${name}"! Check My Classes for details.`);
  };

  const levelColors: Record<string, string> = {
    Beginner: 'bg-green-800/50 text-green-300',
    Intermediate: 'bg-yellow-800/50 text-yellow-300',
    Advanced: 'bg-red-800/50 text-red-300',
    All: 'bg-zen-sage/30 text-zen-sage',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-zen-cream">Explore Classes</h1>
        <p className="text-zen-light/50 mt-1">Discover and book classes from studios across the platform.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zen-light/30" />
          <input
            type="text"
            placeholder="Search classes, studios, or styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zen-medium/20 border border-zen-sage/15 rounded-xl text-zen-cream placeholder:text-zen-light/30 outline-none focus:border-zen-gold transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`outline-button text-sm px-4 ${showFilters ? 'border-zen-gold text-zen-gold' : ''}`}
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-zen-medium/10 border border-zen-sage/10">
              <div>
                <span className="text-zen-light/40 text-xs mb-2 block">Level</span>
                <div className="flex gap-2">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setFilterLevel(l)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        filterLevel === l
                          ? 'bg-zen-gold text-zen-dark font-medium'
                          : 'border border-zen-sage/20 text-zen-light/60'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-zen-light/40 text-xs mb-2 block">Price</span>
                <div className="flex gap-2">
                  {['All', 'Free', 'Paid'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setFilterPrice(p)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        filterPrice === p
                          ? 'bg-zen-gold text-zen-dark font-medium'
                          : 'border border-zen-sage/20 text-zen-light/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filterLevel}-${filterPrice}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card glass-card-hover p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs uppercase tracking-widest text-zen-gold">{cls.style}</span>
                  <h3 className="font-heading text-xl text-zen-cream mt-0.5">{cls.name}</h3>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${levelColors[cls.level]}`}>
                  {cls.level}
                </span>
              </div>

              <div className="space-y-2 mb-4 flex-grow text-sm text-zen-light/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zen-sage" /> {cls.studio}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zen-sage" /> {cls.duration}
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-zen-sage" /> {cls.schedule}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-zen-gold font-semibold">{cls.price}</span>
                <button
                  onClick={() => bookClass(cls.name)}
                  className="gold-button text-xs py-2 px-4"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zen-light/40">No classes found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
}
