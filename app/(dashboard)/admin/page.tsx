'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import {
  Users, Building2, Megaphone, Trash2, Ban,
  Plus, X, ToggleLeft, ToggleRight, Pencil,
  ExternalLink, Loader2, CheckCircle
} from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  city: string;
  role: string;
  created_at: string;
}

interface Promotion {
  id: string;
  title: string;
  image_url: string;
  redirect_url: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'dashboard';

  const [students, setStudents] = useState<Profile[]>([]);
  const [studios, setStudios] = useState<Profile[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  // Promotion form
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formRedirectUrl, setFormRedirectUrl] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    const [studentsRes, studiosRes, promosRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'studio').order('created_at', { ascending: false }),
      supabase.from('promotions').select('*').order('created_at', { ascending: false }),
    ]);
    if (studentsRes.data) setStudents(studentsRes.data);
    if (studiosRes.data) setStudios(studiosRes.data);
    if (promosRes.data) setPromotions(promosRes.data);
    setLoading(false);
  };

  const handleDeleteProfile = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await supabase.from('profiles').delete().eq('id', id);
    setStudents((p) => p.filter((s) => s.id !== id));
    setStudios((p) => p.filter((s) => s.id !== id));
  };

  const handleTogglePromo = async (promo: Promotion) => {
    const { data } = await supabase
      .from('promotions')
      .update({ is_active: !promo.is_active })
      .eq('id', promo.id)
      .select()
      .single();
    if (data) setPromotions((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  const handleDeletePromo = async (id: string) => {
    if (!confirm('Delete this promotion?')) return;
    await supabase.from('promotions').delete().eq('id', id);
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const openAddForm = () => {
    setEditingPromo(null);
    setFormTitle(''); setFormImageUrl(''); setFormRedirectUrl(''); setFormActive(true);
    setShowForm(true);
  };

  const openEditForm = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormTitle(promo.title);
    setFormImageUrl(promo.image_url);
    setFormRedirectUrl(promo.redirect_url);
    setFormActive(promo.is_active);
    setShowForm(true);
  };

  const handleSavePromo = async () => {
    if (!formTitle || !formImageUrl || !formRedirectUrl) return;
    setSaving(true);
    if (editingPromo) {
      const { data } = await supabase
        .from('promotions')
        .update({ title: formTitle, image_url: formImageUrl, redirect_url: formRedirectUrl, is_active: formActive })
        .eq('id', editingPromo.id)
        .select()
        .single();
      if (data) setPromotions((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } else {
      const { data } = await supabase
        .from('promotions')
        .insert({ title: formTitle, image_url: formImageUrl, redirect_url: formRedirectUrl, is_active: formActive })
        .select()
        .single();
      if (data) setPromotions((prev) => [data, ...prev]);
    }
    setSaving(false);
    setShowForm(false);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const statCards = [
    { label: 'Total Students', value: students.length, icon: Users, color: '#3B82F6' },
    { label: 'Total Studios', value: studios.length, icon: Building2, color: '#10B981' },
    { label: 'Active Promos', value: promotions.filter((p) => p.is_active).length, icon: Megaphone, color: '#7C3AED' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-white">
          Admin Dashboard <span style={{ color: '#7C3AED' }}>🛡️</span>
        </h1>
        <p className="text-gray-400 mt-2">Manage students, studios, and promotions.</p>
      </div>

      {/* Stats Cards - Always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)', borderColor: 'rgba(124, 58, 237, 0.12)' }}
          >
            <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
            <p className="font-heading text-3xl text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* STUDENTS SECTION */}
      {section === 'students' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'rgba(124, 58, 237, 0.03)', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
          <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.12)' }}>
            <h2 className="font-heading text-xl text-white">All Students</h2>
            <span className="text-sm text-gray-400">{students.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }}>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Join Date</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-purple-900/10 transition-colors" style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.06)' }}>
                    <td className="py-3 px-6 text-white">{s.full_name || '—'}</td>
                    <td className="py-3 px-6 text-gray-300">{s.email}</td>
                    <td className="py-3 px-6 text-gray-400">{formatDate(s.created_at)}</td>
                    <td className="py-3 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-green-800/40 text-green-300">Active</span></td>
                    <td className="py-3 px-6">
                      <button onClick={() => handleDeleteProfile(s.id)} className="text-red-400/60 hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-500">No students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* STUDIOS SECTION */}
      {section === 'studios' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'rgba(124, 58, 237, 0.03)', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
          <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.12)' }}>
            <h2 className="font-heading text-xl text-white">All Studios</h2>
            <span className="text-sm text-gray-400">{studios.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }}>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Studio Name</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">City</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Join Date</th>
                  <th className="text-left py-3 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studios.map((s) => (
                  <tr key={s.id} className="hover:bg-purple-900/10 transition-colors" style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.06)' }}>
                    <td className="py-3 px-6 text-white">{s.full_name || '—'}</td>
                    <td className="py-3 px-6 text-gray-300">{s.email}</td>
                    <td className="py-3 px-6 text-gray-400">{s.city || '—'}</td>
                    <td className="py-3 px-6 text-gray-400">{formatDate(s.created_at)}</td>
                    <td className="py-3 px-6">
                      <button onClick={() => handleDeleteProfile(s.id)} className="text-red-400/60 hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {studios.length === 0 && (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-500">No studios found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PROMOTIONS SECTION */}
      {section === 'promotions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl text-white">Promotions</h2>
            <button onClick={openAddForm} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {/* Promo list */}
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="rounded-2xl border p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center" style={{ backgroundColor: 'rgba(124, 58, 237, 0.03)', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
                <div className="w-full sm:w-32 h-20 rounded-xl bg-cover bg-center shrink-0 border border-purple-500/10" style={{ backgroundImage: `url(${promo.image_url})` }} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{promo.title}</h3>
                  <a href={promo.redirect_url} target="_blank" rel="noopener noreferrer" className="text-purple-300/60 text-xs hover:text-purple-300 flex items-center gap-1 mt-1 truncate">
                    {promo.redirect_url} <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => handleTogglePromo(promo)} title="Toggle active" className="transition-colors">
                    {promo.is_active
                      ? <ToggleRight className="w-7 h-7 text-green-400" />
                      : <ToggleLeft className="w-7 h-7 text-gray-500" />}
                  </button>
                  <button onClick={() => openEditForm(promo)} className="text-gray-400 hover:text-purple-300 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDeletePromo(promo.id)} className="text-red-400/60 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {promotions.length === 0 && (
              <div className="text-center py-16 text-gray-500 rounded-2xl border" style={{ borderColor: 'rgba(124, 58, 237, 0.12)' }}>
                No promotions yet. Click &quot;Add New&quot; to create one.
              </div>
            )}
          </div>

          {/* Promotion Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-2xl p-6 border" style={{ backgroundColor: '#0F1429', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-white">{editingPromo ? 'Edit' : 'Add'} Promotion</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Title</label>
                    <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/40" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.15)' }} placeholder="Promotion title" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Image URL</label>
                    <input value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/40" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.15)' }} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Redirect URL</label>
                    <input value={formRedirectUrl} onChange={(e) => setFormRedirectUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/40" style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.15)' }} placeholder="https://..." />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-400 text-sm">Active</label>
                    <button onClick={() => setFormActive(!formActive)}>
                      {formActive ? <ToggleRight className="w-7 h-7 text-green-400" /> : <ToggleLeft className="w-7 h-7 text-gray-500" />}
                    </button>
                  </div>
                  <button onClick={handleSavePromo} disabled={saving || !formTitle || !formImageUrl || !formRedirectUrl} className="w-full py-2.5 rounded-full text-white text-sm font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {editingPromo ? 'Update' : 'Save'} Promotion
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
