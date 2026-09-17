import React, { useEffect, useState } from 'react';
import { ArrowRight, Landmark, Search, ExternalLink, Bookmark, Check, Filter } from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';

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
        const res = await fetch('/api/schemes');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSchemes(data);
        } else {
          setSchemes(DEFAULT_SCHEMES);
        }
      } catch (err) {
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
    if (activeCategory === 'Grants & Seed Capital') return (s.fundingAmount || '').toLowerCase().includes('grant') || (s.fundingAmount || '').toLowerCase().includes('seed');
    if (activeCategory === 'MSME & Loans') return (s.name || '').toLowerCase().includes('mudra') || (s.name || '').toLowerCase().includes('credit');
    if (activeCategory === 'Women & Youth') return (s.name || '').toLowerCase().includes('women') || (s.eligibility || '').toLowerCase().includes('women');
    return true;
  });

  return (
    <div className="container py-12 animate-fade-in-up" style={{ maxWidth: '1100px' }}>
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="badge badge-primary mb-3">Non-Dilutive Financing</div>
        <h1 className="mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.025em' }}>
          Government Schemes & Grant Directory
        </h1>
        <p className="text-light text-lg">
          Explore validated central and state grants, subsidised credit facilities, and seed funds tailored for Indian enterprises.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="card p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/2">
            <Search size={18} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search by scheme name, keyword, or domain..."
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
                  backgroundColor: activeCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: activeCategory === cat ? 'var(--white)' : 'var(--text-light)',
                  border: '1px solid var(--border)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="text-center py-16 text-light">Loading available government schemes...</div>
      ) : filteredSchemes.length === 0 ? (
        <div className="card text-center py-16 p-8">
          <Landmark size={40} className="text-light mx-auto mb-3" />
          <h3 className="mb-2">No matching schemes found</h3>
          <p className="text-light">Try refining your search query or reset category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((s) => {
            const isSaved = savedIds.includes(s.name);
            return (
              <div 
                key={s._id || s.id || s.name} 
                className="card p-6 flex flex-col justify-between hover-lift shadow-sm"
                style={{ border: '1px solid var(--border)', borderRadius: '20px' }}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-bold text-lg" style={{ lineHeight: '1.3' }}>{s.name}</h3>
                    <button 
                      onClick={() => toggleSave(s.name)}
                      className="btn"
                      style={{ 
                        padding: '0.4rem', 
                        borderRadius: '50%', 
                        color: isSaved ? 'var(--secondary)' : 'var(--text-light)',
                        backgroundColor: isSaved ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)'
                      }}
                      title={isSaved ? 'Saved to bookmarks' : 'Bookmark scheme'}
                    >
                      <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge badge-success font-semibold" style={{ fontSize: '0.78rem' }}>
                      {s.fundingAmount || 'Grant / Subsidized Loan'}
                    </span>
                    {s.category && (
                      <span className="badge badge-primary font-medium" style={{ fontSize: '0.75rem' }}>
                        {s.category}
                      </span>
                    )}
                  </div>

                  <p className="text-light text-sm mb-4" style={{ lineHeight: '1.6' }}>
                    {s.description || s.eligibility || s.note}
                  </p>

                  {s.eligibility && s.description && (
                    <div className="p-3 rounded-xl mb-4 text-xs" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                      <span className="font-semibold text-primary">Eligibility: </span>
                      <span className="text-light">{s.eligibility}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-xs font-medium text-light">Official Govt Portal</span>
                  {s.officialLink ? (
                    <a 
                      className="btn btn-outline flex items-center gap-1.5" 
                      href={s.officialLink} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)' }}
                    >
                      Apply & Guidelines <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-xs text-light">Details on official portal</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
