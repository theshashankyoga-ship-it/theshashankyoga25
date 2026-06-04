'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
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
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF9933]" />
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}

function AdminContent() {
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

  const fetchAllData = useCallback(async () => {
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
  }, [supabase]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
    { label: 'Total Students', value: students.length, icon: Users, bg: '#EFF6FF', iconColor: '#3B82F6' },
    { label: 'Total Studios', value: studios.length, icon: Building2, bg: '#ECFDF5', iconColor: '#10B981' },
    { label: 'Active Promos', value: promotions.filter((p) => p.is_active).length, icon: Megaphone, bg: '#FFF4E6', iconColor: '#FF9933' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF9933]" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-gray-900 font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Manage students, studios, and promotions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: stat.bg }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.iconColor }} />
            </div>
            <p className="font-heading text-3xl text-gray-900 font-bold">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* STUDENTS SECTION */}
      {section === 'students' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="font-heading text-xl text-gray-900 font-semibold">All Students</h2>
            <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{students.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Join Date</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FFF9F0] transition-colors border-b border-gray-50 last:border-0">
                    <td className="py-3.5 px-6 text-gray-900 font-medium">{s.full_name || '—'}</td>
                    <td className="py-3.5 px-6 text-gray-600">{s.email}</td>
                    <td className="py-3.5 px-6 text-gray-500">{formatDate(s.created_at)}</td>
                    <td className="py-3.5 px-6"><span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium border border-emerald-100">Active</span></td>
                    <td className="py-3.5 px-6">
                      <button onClick={() => handleDeleteProfile(s.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr><td colSpan={5} className="py-16 text-center text-gray-400">No students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* STUDIOS SECTION */}
      {section === 'studios' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="font-heading text-xl text-gray-900 font-semibold">All Studios</h2>
            <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{studios.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Studio Name</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">City</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Join Date</th>
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studios.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FFF9F0] transition-colors border-b border-gray-50 last:border-0">
                    <td className="py-3.5 px-6 text-gray-900 font-medium">{s.full_name || '—'}</td>
                    <td className="py-3.5 px-6 text-gray-600">{s.email}</td>
                    <td className="py-3.5 px-6 text-gray-500">{s.city || '—'}</td>
                    <td className="py-3.5 px-6 text-gray-500">{formatDate(s.created_at)}</td>
                    <td className="py-3.5 px-6">
                      <button onClick={() => handleDeleteProfile(s.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {studios.length === 0 && (
                  <tr><td colSpan={5} className="py-16 text-center text-gray-400">No studios found</td></tr>
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
            <h2 className="font-heading text-xl text-gray-900 font-semibold">Promotions</h2>
            <button onClick={openAddForm} className="gold-button text-sm">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {/* Promo list */}
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full sm:w-32 h-20 rounded-xl bg-cover bg-center shrink-0 border border-gray-100" style={{ backgroundImage: `url(${promo.image_url})` }} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold truncate">{promo.title}</h3>
                  <a href={promo.redirect_url} target="_blank" rel="noopener noreferrer" className="text-[#FF9933]/70 text-xs hover:text-[#FF9933] flex items-center gap-1 mt-1 truncate">
                    {promo.redirect_url} <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => handleTogglePromo(promo)} title="Toggle active" className="transition-colors">
                    {promo.is_active
                      ? <ToggleRight className="w-7 h-7 text-emerald-500" />
                      : <ToggleLeft className="w-7 h-7 text-gray-300" />}
                  </button>
                  <button onClick={() => openEditForm(promo)} className="text-gray-400 hover:text-[#FF9933] transition-colors p-1.5 rounded-lg hover:bg-[#FFF4E6]"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDeletePromo(promo.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {promotions.length === 0 && (
              <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
                No promotions yet. Click &quot;Add New&quot; to create one.
              </div>
            )}
          </div>

          {/* Promotion Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg bg-white rounded-2xl p-6 border border-gray-100 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-gray-900 font-semibold">{editingPromo ? 'Edit' : 'Add'} Promotion</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div className="floating-label-input">
                    <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder=" " id="promo-title" />
                    <label htmlFor="promo-title">Title</label>
                  </div>
                  <div className="floating-label-input">
                    <input value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} placeholder=" " id="promo-image" />
                    <label htmlFor="promo-image">Image URL</label>
                  </div>
                  <div className="floating-label-input">
                    <input value={formRedirectUrl} onChange={(e) => setFormRedirectUrl(e.target.value)} placeholder=" " id="promo-redirect" />
                    <label htmlFor="promo-redirect">Redirect URL</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-gray-600 text-sm font-medium">Active</label>
                    <button onClick={() => setFormActive(!formActive)}>
                      {formActive ? <ToggleRight className="w-7 h-7 text-emerald-500" /> : <ToggleLeft className="w-7 h-7 text-gray-300" />}
                    </button>
                  </div>
                  <button onClick={handleSavePromo} disabled={saving || !formTitle || !formImageUrl || !formRedirectUrl} className="gold-button w-full justify-center text-sm disabled:opacity-40">
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
