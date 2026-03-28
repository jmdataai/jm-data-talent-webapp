import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import {
  Loader2, Plus, Pencil, Trash2, LogOut, Briefcase, X, Check,
} from 'lucide-react';

const EMPTY_FORM = {
  title: '', company: '', location: '', type: 'Permanent',
  experience: '', skills: '', description: '', salary_range: '',
};

// ── Auth Gate ────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/jobs', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        onLogin(password);
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-[#0e1629] rounded-xl p-3">
            <Briefcase className="text-[#3c83f5]" size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#0e1629] text-center mb-1">Admin Panel</h1>
        <p className="text-gray-500 text-center text-sm mb-8">JM Data Talent</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-[#0e1629]">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="mt-1"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3c83f5] hover:bg-[#1a6ae8] text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Job Form Modal ───────────────────────────────────────────────────────────
function JobFormModal({ job, onSave, onClose, password }) {
  const [form, setForm] = useState(
    job
      ? { ...job, skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = job ? 'PUT' : 'POST';
      const body = job ? { ...form, id: job.id } : form;

      const res = await fetch('/api/jobs', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      toast.success(job ? 'Job updated!' : 'Job created!');
      onSave(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-[#0e1629]">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0e1629]">Job Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Senior React Developer"
                required className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[#0e1629]">Company *</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Leading Tech Company"
                required className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0e1629]">Location *</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Dublin, Ireland"
                required className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[#0e1629]">Job Type *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Permanent">Permanent</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#0e1629]">Experience Required *</Label>
              <Input
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="e.g. 3+ years"
                required className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[#0e1629]">Salary Range</Label>
              <Input
                value={form.salary_range}
                onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
                placeholder="e.g. €60,000 - €80,000"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-[#0e1629]">Skills * <span className="text-gray-400 font-normal">(comma separated)</span></Label>
            <Input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="e.g. React, Node.js, AWS, MongoDB"
              required className="mt-1"
            />
          </div>

          <div>
            <Label className="text-[#0e1629]">Description *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the role and what you're looking for..."
              rows={4}
              required className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#3c83f5] hover:bg-[#1a6ae8] text-white"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><Check size={16} className="mr-2" />{job ? 'Save Changes' : 'Create Job'}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Admin Panel ─────────────────────────────────────────────────────────
export function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin_pw') || '');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | 'add' | job object

  const isLoggedIn = !!password;

  useEffect(() => {
    if (isLoggedIn) fetchJobs();
  }, [isLoggedIn]);

  const handleLogin = (pw) => {
    sessionStorage.setItem('admin_pw', pw);
    setPassword(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pw');
    setPassword('');
    setJobs([]);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setJobs(data);
    } catch (err) {
      toast.error('Failed to load jobs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = (savedJob) => {
    setJobs((prev) => {
      const exists = prev.find((j) => j.id === savedJob.id);
      return exists
        ? prev.map((j) => (j.id === savedJob.id ? savedJob : j))
        : [savedJob, ...prev];
    });
    setModal(null);
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch('/api/jobs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ id: job.id }),
      });
      if (!res.ok) throw new Error('Failed to delete');
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      toast.success('Job deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!isLoggedIn) return <><LoginScreen onLogin={handleLogin} /><Toaster position="top-right" richColors /></>;

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <header className="bg-[#0e1629] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-[#3c83f5] rounded-lg p-1.5">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">JM Data Talent</h1>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-sm"
        >
          <LogOut size={14} className="mr-2" /> Logout
        </Button>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0e1629]">Open Positions</h2>
            <p className="text-gray-500 text-sm mt-0.5">{jobs.length} job{jobs.length !== 1 ? 's' : ''} listed</p>
          </div>
          <Button
            onClick={() => setModal('add')}
            className="bg-[#3c83f5] hover:bg-[#1a6ae8] text-white"
          >
            <Plus size={16} className="mr-2" /> Add Job
          </Button>
        </div>

        {/* Jobs list */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-[#3c83f5]" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No jobs yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Job" to create your first listing</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between gap-4 hover:border-[#3c83f5] transition-colors shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-[#0e1629] text-lg">{job.title}</h3>
                    <Badge className="bg-[#3c83f5] text-white text-xs">{job.type}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{job.company} · {job.location} · {job.experience}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(job.skills) ? job.skills : job.skills.split(',')).slice(0, 5).map((s) => (
                      <Badge key={s} variant="outline" className="border-[#3c83f5] text-[#3c83f5] text-xs">
                        {s.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setModal(job)}
                    className="border-gray-200 hover:border-[#3c83f5] hover:text-[#3c83f5]"
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(job)}
                    className="border-gray-200 hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Job Form Modal */}
      {modal && (
        <JobFormModal
          job={modal === 'add' ? null : modal}
          password={password}
          onSave={handleSaved}
          onClose={() => setModal(null)}
        />
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}
