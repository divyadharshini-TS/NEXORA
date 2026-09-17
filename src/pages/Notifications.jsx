import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, Award, Sparkles, CheckCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('nexoraToken');
        const res = await fetch('/api/notifications', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('Failed to load notifications');
        const data = await res.json();
        setNotes(Array.isArray(data) && data.length > 0 ? data : defaultNotes);
      } catch (err) {
        console.warn(err);
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
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-4xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Bell size={26} className="text-primary" />
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Notifications & Alerts</h1>
            </div>
            <p className="text-light text-sm">
              Real-time updates regarding grant application windows, sector policy updates, and AI reports.
            </p>
          </div>

          {notes.some(n => n.unread) && (
            <button 
              onClick={markAllRead} 
              className="btn btn-outline flex items-center gap-1.5"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <CheckCheck size={16} /> Mark All as Read
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-light p-12 text-center">Fetching your notification feeds...</div>
        ) : notes.length === 0 ? (
          <div className="card p-10 text-center max-w-md mx-auto" style={{ borderRadius: '24px' }}>
            <Bell size={32} className="text-light mx-auto mb-3" />
            <h3 className="mb-1 text-lg font-bold">All Caught Up</h3>
            <p className="text-light text-sm">No unread notifications or funding alerts right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {notes.map((n) => (
              <div 
                key={n.id} 
                className="card p-6 flex items-start gap-4 hover-lift"
                style={{ 
                  borderRadius: '18px', 
                  border: '1px solid var(--border)',
                  backgroundColor: n.unread ? 'rgba(99, 102, 241, 0.02)' : 'var(--white)'
                }}
              >
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  backgroundColor: n.unread ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)', 
                  color: n.unread ? 'var(--secondary)' : 'var(--primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  flexShrink: 0 
                }}>
                  <Sparkles size={20} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-base text-primary flex items-center gap-2">
                      {n.title}
                      {n.unread && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'inline-block' }}></span>
                      )}
                    </div>
                    <span className="text-xs text-light">
                      {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-light" style={{ lineHeight: '1.6' }}>{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
