import React, { useEffect, useState } from 'react';
import {
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, ArrowRight, Landmark, ShieldAlert, Info
} from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import Sidebar from '../components/Sidebar';

const FALLBACK = {
  businessName: 'EcoBox Sustainable Packaging',
  category: 'ecommerce',
  description: 'Eco-friendly biodegradable packaging subscription for D2C brands.',
  aiScore: 84,
  isViable: true,
  viabilityReason: 'EcoBox is at prototype stage with early validation underway. The ECOMMERCE sector in India aligns well with your target customer base (D2C Brands). With a budget of $30,000, the projected Year 1 revenue of $83,000 indicates a 2.5x return potential. The decision engine flags this as a viable, fundable concept.',
  marketDemand: 'High',
  marketDemandExplanation: 'The ECOMMERCE market in India is experiencing strong growth driven by digital adoption trends and expanding customer segments. Comparable solutions are seeing 20–35% YoY growth, indicating a validated and growing addressable market.',
  competitorAnalysisNote: 'Analysis identified 2 primary competitive forces. Your differentiation opportunity lies in niche D2C sustainability positioning that large players cannot serve effectively.',
  riskProfile: 'Low',
  targetLocation: 'India',
  breakdown: { marketFit: 88, customerMatch: 82, financials: 80 },
  strengths: [
    'ECOMMERCE sector in India shows high addressable demand',
    'Target segment (D2C brands) is actively seeking sustainable alternatives',
    'Working prototype reduces execution risk and investor skepticism',
  ],
  risks: [
    'Customer acquisition cost in ecommerce segment can erode early margins',
    'Competitive pressure from established ECOMMERCE players requires distinct positioning',
    'Scaling beyond India will require localization investment',
  ],
  improvements: [
    'Run a 30-day pre-launch validation experiment targeting D2C brands',
    'Apply for SISFS or TANSEED seed grants to extend runway',
    'Build a 3-month MVP traction report before approaching investors',
  ],
  competitors: [
    { name: 'Amazon / Flipkart', similarity: 'High', strength: 'Unmatched logistics network and brand trust', weakness: 'Poor support for niche/sustainable D2C brands — your focus area' },
    { name: 'Shopify / Meesho', similarity: 'Medium', strength: 'Easy store setup with growing merchant base', weakness: 'Generic tooling with no sector specialization' },
  ],
  financialForecast: {
    estimatedCost: '$30,000',
    revenueForecast: '$83,000',
    breakEvenMonth: 'Month 7',
    roiMultiple: '2.5x',
    costBreakdown: { product: 12000, marketing: 7500, operations: 6000, legal: 4500 },
  },
  legalChecklist: [
    'Business Registration (LLP / Pvt Ltd)',
    'PAN & TAN Application',
    'GST Registration',
    'MSME (Udyam) Registration',
    'Shops & Establishment Act License',
    'Trade License',
    'Consumer Protection Compliance',
    'Packaging & Labelling Rules',
  ],
};

export default function Dashboard() {
  const [analysis, setAnalysis] = useState(null);
  const [schemes, setSchemes] = useState(DEFAULT_SCHEMES);
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [legalChecks, setLegalChecks] = useState({});

  useEffect(() => {
    const load = async () => {
      let current = null;
      try {
        const stored = localStorage.getItem('latestAnalysis');
        if (stored) current = JSON.parse(stored);
      } catch {}

      if (!current) {
        try {
          const token = localStorage.getItem('nexoraToken');
          const res = await fetch('/api/analyze/mine', {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const list = await res.json();
            if (Array.isArray(list) && list.length > 0) current = list[0];
          }
        } catch {}
      }

      if (!current) current = FALLBACK;

      setAnalysis(current);
      const checks = {};
      (current.legalChecklist || []).forEach((item, i) => { checks[item] = i < 2; });
      setLegalChecks(checks);
    };
    load();
  }, []);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch('/api/schemes');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSchemes(Array.isArray(data) && data.length > 0 ? data : DEFAULT_SCHEMES);
      } catch {
        setSchemes(DEFAULT_SCHEMES);
      } finally {
        setLoadingSchemes(false);
      }
    };
    fetchSchemes();
  }, []);

  const toggleLegal = (item) => setLegalChecks((p) => ({ ...p, [item]: !p[item] }));
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${analysis?.businessName} AI Report`, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  const completedLegal = Object.values(legalChecks).filter(Boolean).length;
  const totalLegal = Object.keys(legalChecks).length || 1;
  const legalPct = Math.round((completedLegal / totalLegal) * 100);
  const score = analysis?.aiScore || 0;
  const scoreColor = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--primary)' : 'var(--error)';

  const cb = analysis?.financialForecast?.costBreakdown;
  const cbTotal = cb ? cb.product + cb.marketing + cb.operations + cb.legal : 1;
  const cbColors = { product: 'var(--primary)', marketing: 'var(--secondary)', operations: '#f59e0b', legal: '#8b5cf6' };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <Sidebar />
      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>

        {/* Warning banner for weak ideas */}
        {analysis?.isViable === false && (
          <div className="mb-6 p-4 rounded flex items-start gap-4" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: 'var(--error)' }}>
            <ShieldAlert size={28} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Decision Engine: Weak / Invalid Idea Detected</h3>
              <p className="text-sm mt-1">{analysis.viabilityReason}</p>
              {analysis.improvements?.length > 0 && (
                <ul className="mt-2 text-xs font-medium list-disc list-inside">
                  {analysis.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 style={{ fontSize: '2rem' }}>Idea Analysis Results</h1>
            <p className="text-light">
              Project: <strong>{analysis?.businessName || '—'}</strong>
              {analysis?.category && ` (${analysis.category.toUpperCase()})`}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleShare} className="btn btn-outline flex items-center gap-2"><Share2 size={18} /> Share</button>
            <button onClick={() => window.print()} className="btn btn-primary flex items-center gap-2"><Download size={18} /> Download PDF</button>
          </div>
        </div>

        {/* ── Top 3 cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Viability Score */}
          <div className="card relative overflow-hidden hover-lift" style={{ borderRadius: '20px' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: scoreColor, opacity: 0.08 }} />
            <div className="flex justify-between items-center mb-3">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Viability Score</h3>
              <span className="badge" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
                {score >= 75 ? 'Optimal' : score >= 50 ? 'Moderate' : 'Caution'}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div style={{ 
                width: 84, 
                height: 84, 
                borderRadius: '50%', 
                background: `conic-gradient(${scoreColor} 0% ${score}%, var(--border) ${score}% 100%)`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '7px',
                flexShrink: 0 
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
                  <span style={{ fontSize: '1.45rem', fontWeight: '800', lineHeight: 1, color: 'var(--dark-navy)' }}>
                    {score}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 600 }}>/100</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: scoreColor }}>
                  {score >= 75 ? 'High Probability of Success' : score >= 50 ? 'Moderate Feasibility' : 'High Execution Risk'}
                </div>
                <div style={{ height: 6, width: 130, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginTop: 6 }}>
                  <div style={{ width: `${score}%`, height: '100%', background: scoreColor, transition: 'width 0.5s' }} />
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', lineHeight: 1.6 }}>
              {analysis?.viabilityReason || '—'}
            </p>
          </div>

          {/* Market Demand */}
          <div className="card hover-lift" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-3">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Market Demand</h3>
              <span className="badge badge-success">Validated TAM</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-extrabold text-gradient" style={{ fontSize: '2.25rem' }}>{analysis?.marketDemand || 'High'}</span>
              <span className="text-xs text-light font-medium">{analysis?.targetLocation || 'Target Sector'}</span>
            </div>
            <div style={{ height: 7, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: '0.85rem' }}>
              <div style={{ width: `${analysis?.breakdown?.marketFit || 82}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', lineHeight: 1.6 }}>
              {analysis?.marketDemandExplanation || `Market validated for ${analysis?.targetLocation || 'target region'}.`}
            </p>
          </div>

          {/* Risk Profile */}
          <div className="card hover-lift" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-3">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Risk Profile</h3>
              <span className="badge badge-primary">{analysis?.riskProfile || 'Moderate'} Risk</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{
                width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                backgroundColor: analysis?.riskProfile === 'Low' ? 'var(--success-bg)' : analysis?.riskProfile === 'High' ? 'var(--error-bg)' : 'var(--warning-bg)',
                color: analysis?.riskProfile === 'Low' ? 'var(--success)' : analysis?.riskProfile === 'High' ? 'var(--error)' : 'var(--warning)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="font-bold text-base">{analysis?.riskProfile || 'Moderate'} Threat Level</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Calculated against market competitors</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
              {(analysis?.strengths || []).slice(0, 2).map((s, i) => (
                <div key={i} className="flex items-start gap-2" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
              {(analysis?.risks || []).slice(0, 1).map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-error" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                  <Activity size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Competitor Analysis & Government Schemes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Competitor Analysis */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={20} className="text-primary" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Competitor Analysis</h3>
            </div>
            {analysis?.competitorAnalysisNote && (
              <div className="p-3.5 rounded-xl mb-4 text-xs" style={{ background: 'rgba(99, 102, 241, 0.06)', borderLeft: '3px solid var(--secondary)', color: 'var(--text-main)', lineHeight: 1.5 }}>
                <Info size={13} className="inline mr-1 text-secondary" /> {analysis.competitorAnalysisNote}
              </div>
            )}
            <div className="flex flex-col gap-3">
              {(analysis?.competitors || []).map((comp, i) => (
                <div key={i} className="card p-5 hover-lift" style={{ borderRadius: '16px' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-base">{comp.name}</h4>
                    <span className="badge" style={{
                      background: comp.similarity === 'High' ? 'var(--error-bg)' : 'var(--warning-bg)',
                      color: comp.similarity === 'High' ? 'var(--error)' : 'var(--warning)',
                    }}>{comp.similarity} Threat</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--error)' }}>⚔ Incumbent Advantage: </span>
                    <span style={{ color: 'var(--text-light)' }}>{comp.strength}</span>
                  </div>
                  {comp.weakness && (
                    <div style={{ fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--success)' }}>✓ Your Strategic Moat: </span>
                      <span style={{ color: 'var(--text-main)' }}>{comp.weakness}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Government Schemes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Landmark size={20} className="text-primary" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Matched Government Schemes</h3>
            </div>
            <div className="flex flex-col gap-3">
              {loadingSchemes ? (
                <div className="text-light p-6 text-center">Loading matched schemes...</div>
              ) : (
                schemes.slice(0, 3).map((s) => (
                  <div key={s._id || s.name} className="card p-5 hover-lift" style={{ borderRadius: '16px' }}>
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="font-bold text-base">{s.name}</h4>
                      <span className="badge badge-success whitespace-nowrap ml-2">
                        {s.fundingAmount || 'Grant Eligible'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                      {s.description || s.eligibility}
                    </p>
                    {s.officialLink && (
                      <a 
                        className="btn btn-outline inline-flex items-center gap-1.5" 
                        href={s.officialLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}
                      >
                        Official Application Portal <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Legal Checklist & Financial Forecast ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Legal Checklist */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-lg mb-1">Regulatory & Legal Checklist</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
              Statutory roadmap for <strong>{analysis?.category?.toUpperCase() || 'your venture'}</strong> in <strong>{analysis?.targetLocation || 'your region'}</strong>.
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {Object.keys(legalChecks).map((item, i) => (
                <label 
                  key={i} 
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" 
                  style={{ 
                    background: legalChecks[item] ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)', 
                    border: '1px solid var(--border)' 
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={!!legalChecks[item]} 
                    onChange={() => toggleLegal(item)} 
                    style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--primary)' }} 
                  />
                  <span style={{ 
                    textDecoration: legalChecks[item] ? 'line-through' : 'none', 
                    color: legalChecks[item] ? 'var(--text-light)' : 'var(--text-main)', 
                    fontSize: '0.88rem',
                    fontWeight: '500'
                  }}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <div>
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${legalPct}%`, height: '100%', background: 'var(--success)', transition: 'width 0.3s' }} />
              </div>
              <div className="flex justify-between mt-2" style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                <span>Compliance Progress</span>
                <span className="font-semibold text-primary">{completedLegal}/{totalLegal} Items Completed ({legalPct}%)</span>
              </div>
            </div>
          </div>

          {/* Financial Forecast */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-lg">Financial Projections (Year 1)</h3>
              <span className="badge badge-success">
                {analysis?.financialForecast?.roiMultiple || '2.5x'} Projected ROI
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
              Simulated modeling based on <strong>{analysis?.financialForecast?.estimatedCost}</strong> allocation.
            </p>

            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-center p-3.5 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2.5">
                  <DollarSign size={18} className="text-light" />
                  <div>
                    <div className="font-bold text-sm">Initial Capital Budget</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Setup & Pre-launch OpEx</div>
                  </div>
                </div>
                <div className="font-extrabold text-base text-primary">{analysis?.financialForecast?.estimatedCost || '$30,000'}</div>
              </div>

              <div className="flex justify-between items-center p-3.5 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={18} className="text-success" />
                  <div>
                    <div className="font-bold text-sm">Expected Y1 Gross Revenue</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Target Run Rate</div>
                  </div>
                </div>
                <div className="font-extrabold text-base text-success">{analysis?.financialForecast?.revenueForecast || '$83,000'}</div>
              </div>

              <div className="flex justify-between items-center p-3.5 rounded-xl" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <div className="flex items-center gap-2.5">
                  <Activity size={18} className="text-secondary" />
                  <div>
                    <div className="font-bold text-sm">Target Breakeven Horizon</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Cash-flow positive milestone</div>
                  </div>
                </div>
                <div className="font-extrabold text-base text-secondary">{analysis?.financialForecast?.breakEvenMonth || 'Month 7'}</div>
              </div>

              {/* Budget breakdown bars */}
              {cb && (
                <div className="pt-3 border-t mt-1" style={{ borderColor: 'var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.6rem' }}>Budget Allocation Strategy</div>
                  {Object.entries(cb).map(([key, val]) => {
                    const pct = Math.round((val / cbTotal) * 100);
                    return (
                      <div key={key} style={{ marginBottom: '0.5rem' }}>
                        <div className="flex justify-between" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          <span style={{ textTransform: 'capitalize', color: 'var(--text-light)', fontWeight: 500 }}>{key}</span>
                          <span className="font-semibold">${val.toLocaleString()} ({pct}%)</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: cbColors[key] || 'var(--primary)', borderRadius: 3 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
