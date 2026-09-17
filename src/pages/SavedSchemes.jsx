import React, { useEffect, useState } from 'react';
import { ArrowRight, Landmark, ExternalLink, BookmarkCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('nexoraToken');
        const res = await fetch('/api/schemes/saved', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSchemes(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn(err);
      }

      // Fallback: check locally bookmarked names
      try {
        const localNames = JSON.parse(localStorage.getItem('savedSchemeNames') || '[]');
        if (localNames.length > 0) {
          const matched = DEFAULT_SCHEMES.filter(s => localNames.includes(s.name));
          setSchemes(matched.length > 0 ? matched : DEFAULT_SCHEMES.slice(0, 3));
          setLoading(false);
          return;
        }
      } catch {}

      setSchemes(DEFAULT_SCHEMES.slice(0, 3));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-5xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <BookmarkCheck size={26} className="text-primary" />
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Bookmarked Schemes</h1>
              <span className="badge badge-primary">{schemes.length} Saved</span>
            </div>
            <p className="text-light text-sm">
              Government grants and financial facilities saved for active application tracking.
            </p>
          </div>

          <Link 
            to="/schemes" 
            className="btn btn-primary flex items-center gap-2 hover-lift"
            style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.4rem' }}
          >
            Explore Directory <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center">Loading your saved schemes...</div>
        ) : error && schemes.length === 0 ? (
          <div className="card p-8 text-center max-w-md mx-auto" style={{ borderRadius: '20px' }}>
            <h3>{error}</h3>
          </div>
        ) : schemes.length === 0 ? (
          <div className="card p-10 text-center max-w-lg mx-auto" style={{ borderRadius: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Landmark size={26} className="text-light" />
            </div>
            <h3 className="mb-2 text-xl font-bold">No Saved Schemes Yet</h3>
            <p className="text-light text-sm mb-6">Browse the government grant scheme directory and bookmark the ones relevant to your venture.</p>
            <Link to="/schemes" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2rem' }}>
              Browse Schemes Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 max-w-5xl">
            {schemes.map((s) => (
              <div 
                key={s._id || s.id || s.name} 
                className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover-lift"
                style={{ borderRadius: '20px', border: '1px solid var(--border)' }}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="font-bold text-lg">{s.name}</h3>
                    <span className="badge badge-success text-xs font-semibold">
                      {s.fundingAmount || 'Grant Eligible'}
                    </span>
                  </div>
                  <p className="text-sm text-light max-w-2xl mb-2" style={{ lineHeight: '1.6' }}>
                    {s.description || s.eligibility || s.note}
                  </p>
                  {s.eligibility && (
                    <div className="text-xs text-light">
                      <span className="font-semibold text-primary">Prerequisites: </span>
                      {s.eligibility}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--border)' }}>
                  {s.officialLink && (
                    <a 
                      className="btn btn-primary flex items-center gap-1.5 hover-lift" 
                      href={s.officialLink} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-full)' }}
                    >
                      Official Portal <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
