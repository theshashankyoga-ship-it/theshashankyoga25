'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users as UsersIcon } from 'lucide-react';

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface ScheduleEvent {
  id: string;
  name: string;
  day: string;
  time: string;
  duration: number;
  students: number;
  color: string;
}

const scheduleEvents: ScheduleEvent[] = [
  { id: '1', name: 'Morning Vinyasa Flow', day: 'Mon', time: '7:00 AM', duration: 60, students: 12, color: 'bg-green-800/60 border-green-600/40' },
  { id: '2', name: 'Morning Vinyasa Flow', day: 'Wed', time: '7:00 AM', duration: 60, students: 12, color: 'bg-green-800/60 border-green-600/40' },
  { id: '3', name: 'Morning Vinyasa Flow', day: 'Fri', time: '7:00 AM', duration: 60, students: 12, color: 'bg-green-800/60 border-green-600/40' },
  { id: '4', name: 'Power Yoga', day: 'Tue', time: '6:00 PM', duration: 45, students: 8, color: 'bg-red-800/60 border-red-600/40' },
  { id: '5', name: 'Power Yoga', day: 'Thu', time: '6:00 PM', duration: 45, students: 8, color: 'bg-red-800/60 border-red-600/40' },
  { id: '6', name: 'Yin & Restore', day: 'Sat', time: '9:00 AM', duration: 75, students: 15, color: 'bg-purple-800/60 border-purple-600/40' },
  { id: '7', name: 'Prenatal Yoga', day: 'Wed', time: '5:00 PM', duration: 50, students: 6, color: 'bg-pink-800/60 border-pink-600/40' },
  { id: '8', name: 'Kids Yoga', day: 'Sat', time: '10:00 AM', duration: 30, students: 10, color: 'bg-yellow-800/60 border-yellow-600/40' },
  { id: '9', name: 'Kids Yoga', day: 'Sun', time: '10:00 AM', duration: 30, students: 10, color: 'bg-yellow-800/60 border-yellow-600/40' },
  { id: '10', name: 'Meditation & Breathwork', day: 'Mon', time: '6:00 AM', duration: 40, students: 20, color: 'bg-blue-800/60 border-blue-600/40' },
  { id: '11', name: 'Meditation & Breathwork', day: 'Tue', time: '6:00 AM', duration: 40, students: 20, color: 'bg-blue-800/60 border-blue-600/40' },
  { id: '12', name: 'Meditation & Breathwork', day: 'Wed', time: '6:00 AM', duration: 40, students: 20, color: 'bg-blue-800/60 border-blue-600/40' },
  { id: '13', name: 'Meditation & Breathwork', day: 'Thu', time: '6:00 AM', duration: 40, students: 20, color: 'bg-blue-800/60 border-blue-600/40' },
  { id: '14', name: 'Meditation & Breathwork', day: 'Fri', time: '6:00 AM', duration: 40, students: 20, color: 'bg-blue-800/60 border-blue-600/40' },
];

export default function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const getEventsForSlot = (day: string, time: string) =>
    scheduleEvents.filter((e) => e.day === day && e.time === time);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-zen-cream">Weekly Schedule</h1>
        <p className="text-zen-light/50 mt-1">View your class schedule at a glance.</p>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card overflow-hidden overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-zen-sage/10">
            <div className="px-4 py-3 text-zen-light/30 text-xs font-medium">Time</div>
            {daysOfWeek.map((day) => (
              <div key={day} className="px-4 py-3 text-zen-cream text-sm font-medium text-center border-l border-zen-sage/5">
                {day}
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-zen-sage/5 min-h-[52px]">
              <div className="px-4 py-2 text-zen-light/30 text-xs flex items-start pt-3">
                {time}
              </div>
              {daysOfWeek.map((day) => {
                const events = getEventsForSlot(day, time);
                return (
                  <div key={`${day}-${time}`} className="px-1 py-1 border-l border-zen-sage/5">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs text-left border ${event.color} hover:opacity-80 transition-opacity`}
                      >
                        <p className="font-medium text-zen-cream truncate">{event.name}</p>
                        <p className="text-zen-light/50 text-[10px]">{event.duration}min</p>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Popup */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-card p-8 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-2xl text-zen-cream">{selectedEvent.name}</h3>
                <button onClick={() => setSelectedEvent(null)} className="text-zen-light/40 hover:text-zen-cream">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-zen-light/60">
                  <Clock className="w-4 h-4 text-zen-sage" />
                  {selectedEvent.day} at {selectedEvent.time} · {selectedEvent.duration} min
                </div>
                <div className="flex items-center gap-2 text-zen-light/60">
                  <UsersIcon className="w-4 h-4 text-zen-sage" />
                  {selectedEvent.students} students enrolled
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
