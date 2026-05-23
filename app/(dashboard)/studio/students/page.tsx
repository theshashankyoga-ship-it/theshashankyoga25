'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Mail, Calendar } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledClasses: string[];
  joinDate: string;
  status: 'active' | 'inactive';
}

const students: Student[] = [
  { id: '1', name: 'Meera Patel', email: 'meera@email.com', enrolledClasses: ['Morning Vinyasa Flow', 'Meditation & Breathwork'], joinDate: '2024-06-15', status: 'active' },
  { id: '2', name: 'Arjun Nair', email: 'arjun@email.com', enrolledClasses: ['Power Yoga'], joinDate: '2024-07-20', status: 'active' },
  { id: '3', name: 'Sanya Gupta', email: 'sanya@email.com', enrolledClasses: ['Yin & Restore', 'Morning Vinyasa Flow', 'Kids Yoga'], joinDate: '2024-03-10', status: 'active' },
  { id: '4', name: 'Rahul Mehta', email: 'rahul@email.com', enrolledClasses: ['Morning Vinyasa Flow'], joinDate: '2024-09-01', status: 'inactive' },
  { id: '5', name: 'Diya Singh', email: 'diya@email.com', enrolledClasses: ['Prenatal Yoga'], joinDate: '2024-10-05', status: 'active' },
  { id: '6', name: 'Vikram Das', email: 'vikram@email.com', enrolledClasses: ['Power Yoga', 'Meditation & Breathwork'], joinDate: '2024-08-12', status: 'active' },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-zen-cream">Students</h1>
        <p className="text-zen-light/50 mt-1">View and manage your enrolled students.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zen-light/30" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-zen-medium/20 border border-zen-sage/15 rounded-xl text-zen-cream placeholder:text-zen-light/30 outline-none focus:border-zen-gold transition-colors"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zen-sage/10 bg-zen-medium/10">
              <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Student</th>
              <th className="text-left px-6 py-4 text-zen-light/40 font-medium hidden md:table-cell">Enrolled Classes</th>
              <th className="text-left px-6 py-4 text-zen-light/40 font-medium hidden sm:table-cell">Join Date</th>
              <th className="text-left px-6 py-4 text-zen-light/40 font-medium">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <>
                <tr
                  key={student.id}
                  className="border-b border-zen-sage/5 hover:bg-zen-medium/10 transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zen-sage/20 flex items-center justify-center text-zen-gold font-heading text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-zen-cream font-medium">{student.name}</p>
                        <p className="text-zen-light/40 text-xs">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zen-light/60 hidden md:table-cell">
                    {student.enrolledClasses.length} classes
                  </td>
                  <td className="px-6 py-4 text-zen-light/50 hidden sm:table-cell">{student.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      student.status === 'active' ? 'bg-green-800/50 text-green-300' : 'bg-gray-800/50 text-gray-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zen-light/30">
                    {expandedId === student.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </td>
                </tr>
                <AnimatePresence>
                  {expandedId === student.id && (
                    <tr key={`${student.id}-detail`}>
                      <td colSpan={5} className="px-6 py-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="py-4 pl-12 space-y-3">
                            <div className="flex items-center gap-2 text-zen-light/50 text-sm">
                              <Mail className="w-4 h-4" /> {student.email}
                            </div>
                            <div className="flex items-center gap-2 text-zen-light/50 text-sm">
                              <Calendar className="w-4 h-4" /> Joined: {student.joinDate}
                            </div>
                            <div>
                              <p className="text-zen-light/40 text-xs mb-2">Enrolled Classes:</p>
                              <div className="flex flex-wrap gap-2">
                                {student.enrolledClasses.map((cls) => (
                                  <span key={cls} className="text-xs px-3 py-1 rounded-full bg-zen-sage/10 text-zen-sage border border-zen-sage/20">
                                    {cls}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
