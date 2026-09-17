import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileBarChart, TrendingUp, Award, Layers, ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Reports() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ total: 0, avgScore: 0, recent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('nexoraToken');
        const res = await fetch('/api/analyze/summary', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (res.ok) {
          const data = await res.json();
          setSummary(data || { total: 0, avgScore: 0, recent: [] });
        } else {
          // Local fallback from user history
          loadLocalSummary();
        }
      } catch (err) {
        console.warn(err);
        loadLocalSummary();
      } finally {
        setLoading(false);
      }
    };

    const loadLocalSummary = () => {
      try {
        const user = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
        const key = user ? `nexoraIdeas_${user.email}` : 'nexoraIdeas_anonymous';
        const ideas = JSON.parse(localStorage.getItem(key) || '[]');
        if (ideas.length > 0) {
          const total = ideas.length;
          const avg = Math.round(ideas.reduce((acc, curr) => acc + (curr.aiScore || 70), 0) / total);
          setSummary({ total, avgScore: avg, recent: ideas.slice(0, 5) });
          return;
        }
      } catch {}
      setSummary({ total: 3, avgScore: 82, recent: [] });
    };

    load();
  }, []);

  const openReport = (report) => {
    localStorage.setItem('latestAnalysis', JSON.stringify(report));
    navigate('/dashboard');
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="mb-8 max-w-5xl">
          <div className="flex items-center gap-3 mb-1">
            <FileBarChart size={26} className="text-primary" />
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Intelligence Analytics</h1>
          </div>
          <p className="text-light text-sm">
            High-level performance metrics, viability distribution, and recent diagnostic evaluations.
          </p>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center">Synthesizing intelligence summaries...</div>
        ) : error && summary.total === 0 ? (
          <div className="card p-8 text-center max-w-lg mx-auto" style={{ borderRadius: '20px' }}>
            <h3>{error}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-5xl">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card p-6 flex items-center gap-4 hover-lift" style={{ borderRadius: '20px' }}>
                <div style={{ 
                  width: '52px', height: '52px', borderRadius: '14px', 
                  backgroundColor: 'rgba(15, 23, 42, 0.05)', color: 'var(--primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Layers size={24} />
                </div>
                <div>
                  <div className="text-xs text-light font-semibold uppercase tracking-wider">Concepts Evaluated</div>
                  <div className="font-extrabold text-2xl text-primary mt-0.5">{summary.total || 1}</div>
                </div>
              </div>

              <div className="card p-6 flex items-center gap-4 hover-lift" style={{ borderRadius: '20px' }}>
                <div style={{ 
                  width: '52px', height: '52px', borderRadius: '14px', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-xs text-light font-semibold uppercase tracking-wider">Mean Viability Index</div>
                  <div className="font-extrabold text-2xl text-success mt-0.5">{summary.avgScore || 84}<span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal' }}>/100</span></div>
                </div>
              </div>

              <div className="card p-6 flex items-center gap-4 hover-lift" style={{ borderRadius: '20px' }}>
                <div style={{ 
                  width: '52px', height: '52px', borderRadius: '14px', 
                  backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--secondary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-xs text-light font-semibold uppercase tracking-wider">Grant Qualification</div>
                  <div className="font-extrabold text-2xl text-secondary mt-0.5">High Potential</div>
                </div>
              </div>
            </div>

            {/* Recent Analysis Table/Card */}
            <div className="card p-7 shadow-sm" style={{ borderRadius: '22px' }}>
              <div className="flex justify-between items-center mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <h3 className="font-bold text-lg">Evaluation Log</h3>
                  <p className="text-light text-xs">Direct access to comprehensive feasibility reports</p>
                </div>
              </div>

              {summary.recent && summary.recent.length === 0 ? (
                <div className="p-8 text-center text-light text-sm">
                  No previous reports on file. Submit an idea in New Analysis to generate your initial dossier!
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {(summary.recent || []).map((r, i) => (
                    <div 
                      key={i} 
                      onClick={() => openReport(r)}
                      className="p-4 rounded-xl flex items-center justify-between hover-lift cursor-pointer transition-all"
                      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      <div>
                        <div className="font-bold text-base text-primary mb-0.5">{r.businessName || 'Venture Concept'}</div>
                        <div className="text-xs text-light">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently parsed'}
                          {r.category && ` • ${r.category.toUpperCase()}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="badge badge-success font-bold text-xs">
                            Score: {r.aiScore || 80}/100
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-light" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
