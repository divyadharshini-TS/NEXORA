import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, Award, Sparkles, CheckCheck, Info, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { apiGet } from '../utils/safeApi';

export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const defaultNotes = [
    {
      id: 'n1',
      title: 'Startup India Seed Fund Scheme (SISFS) Window Active',
      body: 'Application round for SISFS early-stage grants up to ₹20 lakh is now active. Check eligibility criteria and guidelines in the Schemes directory.',
      createdAt: new Date().toISOString(),
      unread: true
    },
    {
      id: 'n2',
      title: 'Venture Viability Analysis Completed',
      body: 'Your business concept "EcoBox Sustainable Packaging" received a comprehensive viability score of 84/100.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      unread: false
    },
    {
      id: 'n3',
      title: 'TANSEED 6.0 Grant Window Announced',
      body: 'Tamil Nadu Startup and Innovation Mission opens grant call offering up to ₹15 Lakhs for green-tech startups.',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      unread: false
    }
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await apiGet('/api/notifications');
        setNotes(Array.isArray(data) && data.length > 0 ? data : defaultNotes);
      } catch {
        setNotes(defaultNotes);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const markAllRead = () => {
    setNotes(notes.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button className="sidebar-toggle-btn" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Alerts & Feed</span>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-4xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Bell size={24} className="text-accent" />
              <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>System Alerts & Grant Feed</h1>
            </div>
            <p className="text-light text-sm">
              Regulatory deadlines, grant application openings, and diagnostic completions.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="btn btn-outline text-xs flex items-center gap-1.5"
            style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.15rem' }}
          >
            <CheckCheck size={14} /> Mark All as Read
          </button>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center text-sm">Fetching notifications...</div>
        ) : (
          <div className="flex flex-col gap-3.5 max-w-4xl">
            {notes.map((n) => (
              <div
                key={n.id}
                className="card p-5 transition-all"
                style={{
                  borderRadius: '16px',
                  backgroundColor: n.unread ? 'var(--bg-secondary)' : 'var(--bg-subtle)',
                  borderColor: n.unread ? 'rgba(99, 102, 241, 0.3)' : 'var(--border)',
                  boxShadow: n.unread ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    {n.unread ? (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
                    ) : (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                    <h4 className="text-sm font-bold text-main">{n.title}</h4>
                  </div>
                  <span className="text-xs text-muted font-mono flex-shrink-0">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-light leading-relaxed pl-4">
                  {n.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
