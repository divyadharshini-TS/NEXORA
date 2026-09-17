import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FolderOpen, PlusCircle, ArrowRight, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function MyIdeas() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('nexoraToken');
        const res = await fetch('/api/analyze/mine', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to load ideas');
        const data = await res.json();
        setIdeas(data || []);
      } catch (err) {
        console.warn('Failed to load ideas', err);
        // Also check localStorage fallback
        try {
          const user = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
          const key = user ? `nexoraIdeas_${user.email}` : 'nexoraIdeas_anonymous';
          const local = JSON.parse(localStorage.getItem(key) || '[]');
          if (local.length > 0) {
            setIdeas(local);
            setLoading(false);
            return;
          }
        } catch {}
        setError('Failed to load your ideas. Are you logged in?');
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openInDashboard = (idea) => {
    localStorage.setItem('latestAnalysis', JSON.stringify(idea));
    navigate('/dashboard');
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-5xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <FolderOpen size={26} className="text-primary" />
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Venture Library</h1>
              <span className="badge badge-primary">{ideas.length} Saved</span>
            </div>
            <p className="text-light text-sm">
              All generated hypotheses, market evaluations, and viability ratings.
            </p>
          </div>

          <Link 
            to="/analyze" 
            className="btn btn-primary flex items-center gap-2 hover-lift"
            style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.4rem' }}
          >
            <PlusCircle size={17} /> New Analysis
          </Link>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center">Loading your saved concepts...</div>
        ) : error && ideas.length === 0 ? (
          <div className="card p-8 text-center max-w-lg mx-auto" style={{ borderRadius: '20px' }}>
            <h3 className="mb-2">Session Expired or Login Required</h3>
            <p className="text-light text-sm mb-4">{error}</p>
            <Link to="/login" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>Sign In to Sync Ideas</Link>
          </div>
        ) : ideas.length === 0 ? (
          <div className="card p-10 text-center max-w-lg mx-auto" style={{ borderRadius: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Sparkles size={26} className="text-secondary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">No Venture Concepts Yet</h3>
            <p className="text-light text-sm mb-6">Submit your first business idea to run the AI Decision Engine and unlock full reports.</p>
            <Link to="/analyze" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2rem' }}>
              Launch First Analysis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-5xl">
            {ideas.map((it) => (
              <div 
                key={it._id || it.id || it.businessName} 
                className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover-lift"
                style={{ borderRadius: '18px', border: '1px solid var(--border)' }}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-lg">{it.businessName || 'Untitled Venture'}</h3>
                    {it.category && (
                      <span className="badge badge-primary uppercase text-xs">
                        {it.category}
                      </span>
                    )}
                    {it.isViable !== false ? (
                      <span className="badge badge-success text-xs">Viable</span>
                    ) : (
                      <span className="badge badge-error text-xs">High Risk</span>
                    )}
                  </div>
                  <div className="text-xs text-light mb-2">
                    Evaluated on {new Date(it.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {it.targetLocation && ` • Location: ${it.targetLocation}`}
                  </div>
                  <p className="text-sm text-light max-w-2xl line-clamp-2" style={{ lineHeight: '1.5' }}>
                    {it.description || it.viabilityReason || 'AI analysis report generated.'}
                  </p>
                </div>

                <div className="flex items-center md:flex-col md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--border)' }}>
                  {typeof it.aiScore === 'number' && (
                    <div className="text-right">
                      <div className="text-xs text-light font-medium uppercase">Score</div>
                      <div className="text-2xl font-extrabold text-primary">{it.aiScore}/100</div>
                    </div>
                  )}
                  <button 
                    onClick={() => openInDashboard(it)} 
                    className="btn btn-outline flex items-center gap-1.5 hover-lift"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)' }}
                  >
                    View Report <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
