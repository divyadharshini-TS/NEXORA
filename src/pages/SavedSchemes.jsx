import React, { useEffect, useState } from 'react';
import { ArrowRight, Landmark, ExternalLink, BookmarkCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import { apiGet } from '../utils/safeApi';

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await apiGet('/api/schemes/saved');
        if (data && Array.isArray(data) && data.length > 0) {
          setSchemes(data);
          setLoading(false);
          return;
        }
      } catch {
        // Fall back to local bookmarks
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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button className="sidebar-toggle-btn" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Saved Schemes</span>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-5xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <BookmarkCheck size={24} className="text-accent" />
              <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Bookmarked Schemes</h1>
              <span className="badge badge-primary font-mono text-xs">{schemes.length} Saved</span>
            </div>
            <p className="text-light text-sm">
              Shortlisted non-dilutive grants, seed funds, and subsidized credit facilities.
            </p>
          </div>

          <Link 
            to="/schemes" 
            className="btn btn-outline text-xs flex items-center gap-2"
            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.25rem' }}
          >
            Explore Directory &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center text-sm">Loading bookmarked schemes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {schemes.map((scheme, idx) => (
              <div 
                key={idx} 
                className="card p-6 flex flex-col justify-between hover-lift" 
                style={{ borderRadius: '22px' }}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-base font-bold text-main leading-snug">{scheme.name}</h3>
                    <span className="badge badge-success font-mono text-xs flex-shrink-0">
                      {scheme.fundingAmount}
                    </span>
                  </div>

                  <p className="text-xs text-light line-clamp-3 mb-4 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="p-3 rounded-xl mb-4" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <span className="text-xs text-secondary font-medium block">
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </span>
                  </div>
                </div>

                <a
                  href={scheme.applicationUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-xs w-full justify-center flex items-center gap-1.5"
                  style={{ padding: '0.55rem' }}
                >
                  Visit Official Application <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
