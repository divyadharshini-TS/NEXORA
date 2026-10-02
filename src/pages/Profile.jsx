import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Briefcase, Award, LogOut, CheckCircle, Save, TrendingUp, BarChart2, Lightbulb, Sparkles, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nexoraUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [name, setName] = useState(user?.name || 'Divyadharshini');
  const [email, setEmail] = useState(user?.email || 'founder@nexora.ai');
  const [company, setCompany] = useState(user?.company || 'EcoBox Solutions');
  const [industry, setIndustry] = useState(user?.industry || 'CleanTech / Sustainability');
  const [savedMsg, setSavedMsg] = useState(false);
  const [ideaCount, setIdeaCount] = useState(3);
  const [savedSchemeCount, setSavedSchemeCount] = useState(4);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
      const key = u ? `nexoraIdeas_${u.email}` : 'nexoraIdeas_anonymous';
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (stored.length > 0) setIdeaCount(stored.length);
      const schemes = JSON.parse(localStorage.getItem('savedSchemeNames') || '[]');
      if (schemes.length > 0) setSavedSchemeCount(schemes.length);
    } catch {}
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, name, email, company, industry };
    localStorage.setItem('nexoraUser', JSON.stringify(updated));
    setUser(updated);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexoraToken');
    localStorage.removeItem('nexoraUser');
    navigate('/login');
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button className="sidebar-toggle-btn" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Founder Profile</span>
        </div>
        <div className="flex justify-between items-center mb-8 max-w-5xl">
          <div className="flex items-center gap-3">
            <User size={24} className="text-accent" />
            <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Founder Identity & Venture Profile</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline text-xs flex items-center gap-1.5"
            style={{ color: 'var(--error)', borderColor: 'var(--error-border)' }}
          >
            <LogOut size={14} /> End Session
          </button>
        </div>

        {savedMsg && (
          <div className="p-4 mb-6 rounded-xl flex items-center gap-2 max-w-5xl" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
            <CheckCircle size={18} /> Founder profile updated successfully.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
          {/* Profile Overview Card */}
          <div className="card p-6 flex flex-col items-center text-center justify-between" style={{ borderRadius: '22px' }}>
            <div className="flex flex-col items-center">
              <div style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.8rem',
                fontWeight: '800',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)'
              }}>
                {name ? name[0].toUpperCase() : 'F'}
              </div>
              <h3 className="text-lg font-bold text-main">{name}</h3>
              <span className="text-xs text-light mb-3">{email}</span>
              <span className="badge badge-primary font-mono text-xs mb-6">VERIFIED FOUNDER</span>

              <div className="w-full grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <span className="text-xs text-light block mb-0.5">Dossiers</span>
                  <span className="text-xl font-bold font-mono text-main">{ideaCount}</span>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <span className="text-xs text-light block mb-0.5">Saved Grants</span>
                  <span className="text-xl font-bold font-mono text-success">{savedSchemeCount}</span>
                </div>
              </div>
            </div>

            <div className="w-full pt-6 mt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs text-light flex items-center justify-center gap-1.5 font-mono">
                <Sparkles size={13} className="text-accent" /> TIER: PRO STUDIO
              </span>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
            <h3 className="font-bold text-base mb-1">Founder Details</h3>
            <p className="text-xs text-light mb-6">Manage personal information and primary venture entity.</p>

            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="name"><span>Full Name</span></label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="email"><span>Email</span></label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="company"><span>Primary Venture / Company</span></label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="industry"><span>Primary Industry Domain</span></label>
                  <input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-accent flex items-center gap-2 hover-lift"
                style={{ padding: '0.65rem 1.6rem', borderRadius: 'var(--radius-md)' }}
              >
                <Save size={16} /> Update Profile
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
