import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, Lock, Landmark, Sparkles, ArrowRight
} from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import Sidebar from '../components/Sidebar';

export default function DemoDashboard() {
  const [schemes, setSchemes] = useState(DEFAULT_SCHEMES);
  const [loadingSchemes, setLoadingSchemes] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState('$35,000');
  const [revenueForecast, setRevenueForecast] = useState('$94,500');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch('/api/schemes');
        if (!res.ok) throw new Error('Failed to load schemes');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSchemes(data);
        } else {
          setSchemes(DEFAULT_SCHEMES);
        }
      } catch (err) {
        setSchemes(DEFAULT_SCHEMES);
      } finally {
        setLoadingSchemes(false);
      }
    };
    fetchSchemes();
  }, []);

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 86px)' }}>
      {/* Demo Banner */}
      <div className="w-full text-center py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 border-b" style={{ 
        backgroundColor: 'rgba(99, 102, 241, 0.08)', 
        borderColor: 'rgba(99, 102, 241, 0.2)',
        color: 'var(--text-main)'
      }}>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Sparkles size={14} className="text-secondary" />
          <span>Interactive Demo Mode: Displaying preloaded benchmark diagnostic dossier.</span>
        </div>
        <Link 
          to="/signup" 
          className="btn btn-primary" 
          style={{ padding: '0.25rem 0.85rem', fontSize: '0.78rem', borderRadius: 'var(--radius-full)' }}
        >
          Sign Up to Test Your Idea Free &rarr;
        </Link>
      </div>

      <div className="flex flex-grow">
        <Sidebar isDemo={true} />

        {/* Main Content */}
        <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Idea Analysis Results</h1>
                <span className="badge badge-primary text-xs">PREVIEW DATA</span>
              </div>
              <p className="text-light text-sm">Venture: <strong>FreshHarvest Organic Delivery</strong> (D2C E-COMMERCE)</p>
            </div>
            <div className="flex gap-3">
              <Link to="/signup" className="btn btn-outline flex items-center gap-1.5" style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
                <Share2 size={16} /> Share Report
              </Link>
              <Link to="/signup" className="btn btn-primary flex items-center gap-1.5 hover-lift" style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
                <Download size={16} /> Download PDF
              </Link>
            </div>
          </div>

          {/* Top Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="card text-center p-6 relative overflow-hidden hover-lift" style={{ borderRadius: '20px' }}>
              <div className="flex justify-between items-center mb-3">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Viability Score</h3>
                <span className="badge badge-success">Optimal</span>
              </div>
              <div className="flex justify-center mb-4">
                <div style={{ 
                  width: '90px', 
                  height: '90px', 
                  borderRadius: '50%', 
                  background: 'conic-gradient(var(--success) 0% 87%, var(--border) 87% 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '7px' 
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', lineHeight: 1, color: 'var(--dark-navy)' }}>87</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 600 }}>/100</span>
                  </div>
                </div>
              </div>
              <p className="text-success font-semibold text-sm flex items-center justify-center gap-1">
                <TrendingUp size={16} /> Strong Market Viability Detected
              </p>
            </div>
            
            <div className="card p-6 hover-lift" style={{ borderRadius: '20px' }}>
              <div className="flex justify-between items-center mb-3">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Market Demand</h3>
                <span className="badge badge-success">+18% YoY Growth</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-extrabold text-gradient" style={{ fontSize: '2.25rem' }}>Very High</span>
                <span className="text-xs text-light font-medium">Tier-1 Metros</span>
              </div>
              <p className="text-light text-xs mb-3">Structural shift towards farm-to-table organic consumer baskets.</p>
              <div style={{ height: '7px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
              </div>
            </div>

            <div className="card p-6 hover-lift" style={{ borderRadius: '20px' }}>
              <div className="flex justify-between items-center mb-3">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Risk Profile</h3>
                <span className="badge badge-primary">Medium Risk</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--warning-bg)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">Competitive Pressure</div>
                  <div className="text-light text-xs">Cold-chain logistics overhead</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 text-xs text-success font-medium">
                  <CheckCircle size={14} /> High Gross Margin Potential (38%)
                </div>
                <div className="flex items-center gap-2 text-xs text-error font-medium">
                  <Activity size={14} /> Last-mile delivery margin risk
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Analysis & Government Schemes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={20} className="text-primary" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Competitor Analysis</h3>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'FreshEats Direct', strength: 'Dominant hyper-local fleet', weakness: 'Low organic product assortment', similarity: 'High' },
                  { name: 'GreenGrocer Daily', strength: 'Strong direct farm partnerships', weakness: 'Poor mobile application UX', similarity: 'Medium' }
                ].map((comp, idx) => (
                  <div key={idx} className="card p-5 hover-lift" style={{ borderRadius: '16px' }}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-base">{comp.name}</h4>
                      <span className="badge" style={{
                        background: comp.similarity === 'High' ? 'var(--error-bg)' : 'var(--warning-bg)',
                        color: comp.similarity === 'High' ? 'var(--error)' : 'var(--warning)',
                      }}>{comp.similarity} Threat</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--error)' }}>⚔ Incumbent Moat: </span>
                      <span style={{ color: 'var(--text-light)' }}>{comp.strength}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--success)' }}>✓ Your Advantage: </span>
                      <span style={{ color: 'var(--text-main)' }}>{comp.weakness}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Landmark size={20} className="text-primary" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Matched Government Schemes</h3>
              </div>
              <div className="flex flex-col gap-3">
                {schemes.slice(0, 2).map((s) => (
                  <div key={s._id || s.id || s.name} className="card p-5 hover-lift" style={{ borderRadius: '16px' }}>
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-bold text-base">{s.name}</h4>
                      <span className="badge badge-success whitespace-nowrap ml-2">
                        {s.fundingAmount || 'Grant Eligible'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                      {s.description || s.eligibility || s.note}
                    </p>
                    <Link 
                      to="/signup" 
                      className="btn btn-outline inline-flex items-center gap-1.5"
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}
                    >
                      Unlock Direct Scheme Application &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Forecast */}
          <div className="card p-7 hover-lift" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-lg">Financial Modeling Benchmark</h3>
              <span className="badge badge-success">2.7x Projected ROI</span>
            </div>
            <p className="text-light text-xs mb-5">Simulated Year 1 capital projection for FreshHarvest organic model.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div className="text-xs text-light font-medium mb-1">Estimated Setup Budget</div>
                <div className="font-extrabold text-2xl text-primary">{estimatedCost}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div className="text-xs text-light font-medium mb-1">Projected Gross Revenue</div>
                <div className="font-extrabold text-2xl text-success">{revenueForecast}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <div className="text-xs text-light font-medium mb-1">Breakeven Horizon</div>
                <div className="font-extrabold text-2xl text-secondary">Month 5</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
