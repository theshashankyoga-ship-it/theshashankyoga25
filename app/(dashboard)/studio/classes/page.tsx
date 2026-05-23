'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';
import {
  Plus, X, Edit3, Trash2, ToggleLeft, ToggleRight,
  Clock, Users as UsersIcon
} from 'lucide-react';

interface ClassItem {
  id: string;
  name: string;
  style: string;
  schedule: string;
  enrolled: number;
  maxStudents: number;
  active: boolean;
  level: string;
  duration: number;
  price: number;
}

const initialClasses: ClassItem[] = [
  { id: '1', name: 'Morning Vinyasa Flow', style: 'Vinyasa', schedule: 'Mon/Wed/Fri 7AM', enrolled: 12, maxStudents: 20, active: true, level: 'Beginner', duration: 60, price: 0 },
  { id: '2', name: 'Power Yoga', style: 'Power', schedule: 'Tue/Thu 6PM', enrolled: 8, maxStudents: 15, active: true, level: 'Advanced', duration: 45, price: 500 },
  { id: '3', name: 'Yin & Restore', style: 'Yin', schedule: 'Sat 9AM', enrolled: 15, maxStudents: 25, active: true, level: 'All', duration: 75, price: 500 },
  { id: '4', name: 'Prenatal Yoga', style: 'Prenatal', schedule: 'Wed 5PM', enrolled: 6, maxStudents: 10, active: false, level: 'Beginner', duration: 50, price: 500 },
  { id: '5', name: 'Kids Yoga', style: 'Kids', schedule: 'Sat/Sun 10AM', enrolled: 10, maxStudents: 15, active: true, level: 'Beginner', duration: 30, price: 0 },
  { id: '6', name: 'Meditation & Breathwork', style: 'Meditation', schedule: 'Daily 6AM', enrolled: 20, maxStudents: 30, active: true, level: 'All', duration: 40, price: 0 },
];

export default function ManageClassesPage() {
  const { showToast } = useToast();
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [showForm, setShowForm] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '', style: 'Vinyasa', description: '', duration: 60,
    level: 'beginner', days: [] as string[], time: '07:00', maxStudents: 20, price: 0,
  });

  const toggleActive = (id: string) => {
    setClasses(classes.map(c => c.id === id ? { ...c, active: !c.active } : c));
    showToast('success', 'Class status updated');
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    showToast('success', 'Class deleted');
  };

  const handleAddClass = () => {
    if (!newClass.name) {
      showToast('error', 'Please enter a class name');
      return;
    }
    const cls: ClassItem = {
      id: Date.now().toString(),
      name: newClass.name,
      style: newClass.style,
      schedule: `${newClass.days.join('/')} ${newClass.time}`,
      enrolled: 0,
      maxStudents: newClass.maxStudents,
      active: true,
      level: newClass.level,
      duration: newClass.duration,
      price: newClass.price,
    };
    setClasses([...classes, cls]);
    setShowForm(false);
    setNewClass({ name: '', style: 'Vinyasa', description: '', duration: 60, level: 'beginner', days: [], time: '07:00', maxStudents: 20, price: 0 });
    showToast('success', 'New class added successfully!');
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-zen-cream">Manage Classes</h1>
          <p className="text-zen-light/50 mt-1">Create, edit, and manage your yoga classes.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="gold-button text-sm">
          <Plus className="w-4 h-4" /> Add New Class
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zen-sage/10 bg-zen-medium/10">
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Name</th>
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Style</th>
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Schedule</th>
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Students</th>
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b border-zen-sage/5 hover:bg-zen-medium/10 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-zen-cream font-medium">{cls.name}</p>
                      <p className="text-zen-light/40 text-xs mt-0.5">{cls.level} · {cls.duration}min · ₹{cls.price || 'Free'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zen-light/60">{cls.style}</td>
                  <td className="px-6 py-4 text-zen-light/60">{cls.schedule}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-zen-light/60">
                      <UsersIcon className="w-3.5 h-3.5" />
                      {cls.enrolled}/{cls.maxStudents}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${cls.active ? 'bg-green-800/50 text-green-300' : 'bg-gray-800/50 text-gray-400'}`}>
                      {cls.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-zen-medium/30 text-zen-light/40 hover:text-zen-gold transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleActive(cls.id)}
                        className="p-1.5 rounded-lg hover:bg-zen-medium/30 text-zen-light/40 hover:text-zen-sage transition-colors"
                      >
                        {cls.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteClass(cls.id)}
                        className="p-1.5 rounded-lg hover:bg-red-900/30 text-zen-light/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Class Slide-Over */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zen-dark border-l border-zen-sage/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-heading text-2xl text-zen-cream">Add New Class</h2>
                  <button onClick={() => setShowForm(false)} className="text-zen-light/40 hover:text-zen-cream">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="floating-label-input">
                    <input
                      type="text"
                      placeholder=" "
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      id="class-name"
                    />
                    <label htmlFor="class-name">Class Name</label>
                  </div>

                  <div>
                    <label className="text-zen-light/50 text-sm mb-2 block">Style</label>
                    <select
                      value={newClass.style}
                      onChange={(e) => setNewClass({ ...newClass, style: e.target.value })}
                      className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                    >
                      {['Vinyasa', 'Power', 'Yin', 'Prenatal', 'Kids', 'Meditation'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="floating-label-input">
                    <textarea
                      placeholder=" "
                      rows={3}
                      value={newClass.description}
                      onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                      id="class-desc"
                    />
                    <label htmlFor="class-desc">Description</label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-zen-light/50 text-sm mb-2 block">Duration (min)</label>
                      <input
                        type="number"
                        value={newClass.duration}
                        onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                      />
                    </div>
                    <div>
                      <label className="text-zen-light/50 text-sm mb-2 block">Level</label>
                      <select
                        value={newClass.level}
                        onChange={(e) => setNewClass({ ...newClass, level: e.target.value })}
                        className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                      >
                        {['Beginner', 'Intermediate', 'Advanced', 'All'].map(l => (
                          <option key={l} value={l.toLowerCase()}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-zen-light/50 text-sm mb-2 block">Schedule Days</label>
                    <div className="flex flex-wrap gap-2">
                      {days.map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setNewClass({
                              ...newClass,
                              days: newClass.days.includes(d)
                                ? newClass.days.filter(x => x !== d)
                                : [...newClass.days, d],
                            });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                            newClass.days.includes(d)
                              ? 'bg-zen-gold text-zen-dark font-medium'
                              : 'border border-zen-sage/20 text-zen-light/60'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-zen-light/50 text-sm mb-2 block">Time</label>
                      <input
                        type="time"
                        value={newClass.time}
                        onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                        className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                      />
                    </div>
                    <div>
                      <label className="text-zen-light/50 text-sm mb-2 block">Max Students</label>
                      <input
                        type="number"
                        value={newClass.maxStudents}
                        onChange={(e) => setNewClass({ ...newClass, maxStudents: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zen-light/50 text-sm mb-2 block">Monthly Price (₹)</label>
                    <input
                      type="number"
                      value={newClass.price}
                      onChange={(e) => setNewClass({ ...newClass, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-zen-medium/30 border border-zen-sage/20 rounded-xl text-zen-cream outline-none focus:border-zen-gold"
                      placeholder="0 for free"
                    />
                  </div>

                  <button onClick={handleAddClass} className="gold-button w-full justify-center text-base mt-4">
                    Add Class
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
