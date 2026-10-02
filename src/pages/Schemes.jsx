import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, Landmark, Search, ExternalLink, Bookmark, Check, 
  Filter, Sparkles, CheckCircle2, DollarSign, Layers
} from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import { apiGet } from '../utils/safeApi';

export default function Schemes() {
  const [schemes, setSchemes] = useState(DEFAULT_SCHEMES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedSchemeNames') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiGet('/api/schemes');
        if (data && Array.isArray(data) && data.length > 0) {
          setSchemes(data);
        } else {
          setSchemes(DEFAULT_SCHEMES);
        }
      } catch {
        setSchemes(DEFAULT_SCHEMES);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleSave = (schemeName) => {
    let next;
    if (savedIds.includes(schemeName)) {
      next = savedIds.filter(id => id !== schemeName);
    } else {
      next = [...savedIds, schemeName];
    }
    setSavedIds(next);
    localStorage.setItem('savedSchemeNames', JSON.stringify(next));
  };

  const categories = ['All', 'Grants & Seed Capital', 'MSME & Loans', 'Women & Youth', 'CleanTech & Tech'];

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = 
      (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.eligibility || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Grants & Seed Capital') return (s.fundingAmount || '').toLowerCase().includes('grant') || (s.fundingAmount || '').toLowerCase().includes('seed') || (s.fundingAmount || '').toLowerCase().includes('50') || (s.fundingAmount || '').toLowerCase().includes('20');
    if (activeCategory === 'MSME & Loans') return (s.name || '').toLowerCase().includes('mudra') || (s.name || '').toLowerCase().includes('credit') || (s.name || '').toLowerCase().includes('cgtsme');
    if (activeCategory === 'Women & Youth') return (s.name || '').toLowerCase().includes('women') || (s.eligibility || '').toLowerCase().includes('women') || (s.description || '').toLowerCase().includes('women');
    return true;
  });

  return (
    <div className="container py-12 animate-fade-in-up" style={{ maxWidth: '1140px' }}>
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="badge badge-primary mb-3 font-mono">
          <Landmark size={13} className="text-accent" /> NON-DILUTIVE FINANCING DIRECTORY
        </div>
        <h1 className="mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
          Government Schemes & Grant Intelligence
        </h1>
        <p className="text-light text-base leading-relaxed">
          Access vetted central and state grants, subsidized debt mechanisms, and innovation seed funds for Indian startups without diluting founding equity.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-5 mb-8 shadow-sm" style={{ borderRadius: '20px' }}>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-5/12">
            <Search size={17} className="text-light" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search by scheme name, keywords, domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="btn text-xs font-semibold"
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeCategory === cat ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: activeCategory === cat ? 'var(--bg-color)' : 'var(--text-light)',
                  border: activeCategory === cat ? '1px solid transparent' : '1px solid var(--border)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme, idx) => {
          const isBookmarked = savedIds.includes(scheme.name);
          return (
            <div 
              key={idx} 
              className="card p-6 flex flex-col justify-between hover-lift relative overflow-hidden" 
              style={{ borderRadius: '20px' }}
            >
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-main leading-snug">{scheme.name}</h3>
                    <span className="text-xs text-light">{scheme.ministry || 'Ministry of Commerce & Industry'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="badge badge-success font-mono text-xs">
                      {scheme.fundingAmount}
                    </span>
                    <button
                      onClick={() => toggleSave(scheme.name)}
                      className="btn btn-ghost"
                      title={isBookmarked ? "Remove bookmark" : "Save scheme"}
                      style={{ padding: '0.35rem', color: isBookmarked ? 'var(--accent)' : 'var(--text-muted)' }}
                    >
                      <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-light leading-relaxed mb-4">
                  {scheme.description}
                </p>

                {/* Eligibility & Sector Pill Matrix */}
                <div className="p-3.5 rounded-xl mb-5" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <div className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Eligibility:</strong> {scheme.eligibility}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Instruments:</strong> {scheme.type || 'Grant / Seed Capital / Low-Interest Credit'}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs text-muted font-mono">
                  {isBookmarked ? 'Saved to Bookmarks' : 'Public Registry'}
                </span>
                <a
                  href={scheme.applicationUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-xs flex items-center gap-1.5"
                  style={{ padding: '0.45rem 1.15rem' }}
                >
                  Official Portal <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="card p-12 text-center" style={{ borderRadius: '20px' }}>
          <p className="text-light text-base mb-3">No government schemes matched your specific search criteria.</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline text-xs">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
