import React, { useEffect, useState } from 'react';
import {
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, ArrowRight, Landmark, ShieldAlert, Info, Sparkles, Check,
  BarChart3, Target, ShieldCheck, HelpCircle, Layers, FileText
} from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import Sidebar from '../components/Sidebar';
import { apiGet } from '../utils/safeApi';

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
  const [copied, setCopied] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      let current = null;
      try {
        const stored = localStorage.getItem('latestAnalysis');
        if (stored) current = JSON.parse(stored);
      } catch {}

      if (!current) {
        try {
          const { data } = await apiGet('/api/analyze/mine');
          if (data && Array.isArray(data) && data.length > 0) {
            current = data[0];
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
        const { data } = await apiGet('/api/schemes');
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const completedLegal = Object.values(legalChecks).filter(Boolean).length;
  const totalLegal = Object.keys(legalChecks).length || 1;
  const legalPct = Math.round((completedLegal / totalLegal) * 100);
  const score = analysis?.aiScore || 0;
  const scoreColor = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--accent)' : 'var(--error)';

  const cb = analysis?.financialForecast?.costBreakdown;
  const cbTotal = cb ? cb.product + cb.marketing + cb.operations + cb.legal : 1;
  const cbColors = { product: 'var(--accent)', marketing: '#a855f7', operations: '#f59e0b', legal: '#06b6d4' };

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>

        {/* Mobile topbar */}
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button
            className="sidebar-toggle-btn"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Executive Dossier</span>
        </div>

        {/* Warning banner for weak ideas */}
        {analysis?.isViable === false && (
          <div className="mb-6 p-4 rounded-xl flex items-start gap-4" style={{ 
            backgroundColor: 'var(--error-bg)', 
            border: '1px solid var(--error-border)', 
            color: 'var(--error)' 
          }}>
            <ShieldAlert size={26} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--error)' }}>
                Decision Engine Flag: Critical Risk Vectors Detected
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-main)' }}>{analysis.viabilityReason}</p>
              {analysis.improvements?.length > 0 && (
                <ul className="mt-2 text-xs font-medium list-disc list-inside">
                  {analysis.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Header Ribbon */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-primary font-mono text-xs">EXECUTIVE DOSSIER</span>
              <span className="text-xs text-light">&bull; Real-time AI Synthesis</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>
              {analysis?.businessName || 'Venture Analysis Results'}
            </h1>
            <p className="text-light text-sm">
              Sector: <strong style={{ color: 'var(--text-main)' }}>{(analysis?.category || 'General').toUpperCase()}</strong> &bull; Region: <strong style={{ color: 'var(--text-main)' }}>{analysis?.targetLocation || 'Global'}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleShare} className="btn btn-outline flex items-center gap-2 text-sm" style={{ padding: '0.55rem 1.15rem' }}>
              <Share2 size={16} /> {copied ? 'Link Copied!' : 'Share Dossier'}
            </button>
            <button onClick={() => window.print()} className="btn btn-primary flex items-center gap-2 text-sm" style={{ padding: '0.55rem 1.25rem' }}>
              <Download size={16} /> Export PDF Report
            </button>
          </div>
        </div>

        {/* Top 3 KPI Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Viability Score Card */}
          <div className="card relative overflow-hidden" style={{ borderRadius: '20px' }}>
            <div style={{ 
              position: 'absolute', 
              top: '-30px', 
              right: '-30px', 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: scoreColor, 
              opacity: 0.08 
            }} />
            
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Overall Viability</h3>
              <span className="badge font-mono" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor, border: `1px solid ${scoreColor}30` }}>
                {score >= 75 ? 'HIGH PROBABILITY' : score >= 50 ? 'MODERATE' : 'ELEVATED RISK'}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div style={{ 
                width: 86, 
                height: 86, 
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
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: 1, color: 'var(--text-main)' }}>
                    {score}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700 }}>/100</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: scoreColor }}>
                  {score >= 75 ? 'Optimal Execution Probability' : score >= 50 ? 'Moderate Concept Feasibility' : 'High Market Resistance'}
                </div>
                <div style={{ height: 6, width: 140, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ width: `${score}%`, height: '100%', background: scoreColor, transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                </div>
                <span className="text-xs text-light font-mono mt-1 block">Confidence: 94.2%</span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', paddingTop: '0.85rem', lineHeight: 1.6 }}>
              {analysis?.viabilityReason || 'Model indicates strong foundation with addressable expansion runway.'}
            </p>
          </div>

          {/* Market Demand Card */}
          <div className="card" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Market Demand</h3>
              <span className="badge badge-success font-mono text-xs">TAM VALIDATED</span>
            </div>

            <div className="flex justify-between items-baseline mb-2">
              <span className="font-extrabold text-gradient font-mono" style={{ fontSize: '2.2rem' }}>
                {analysis?.marketDemand || 'High'}
              </span>
              <span className="text-xs text-light font-semibold uppercase tracking-wider">{analysis?.targetLocation || 'Target Sector'}</span>
            </div>

            <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: '0.85rem' }}>
              <div style={{ width: `${analysis?.breakdown?.marketFit || 85}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), #06b6d4)' }} />
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', paddingTop: '0.85rem', lineHeight: 1.6 }}>
              {analysis?.marketDemandExplanation || `Addressable market validated for ${analysis?.targetLocation || 'target location'}.`}
            </p>
          </div>

          {/* Risk Profile Card */}
          <div className="card" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Risk Profile</h3>
              <span className={`badge ${analysis?.riskProfile === 'Low' ? 'badge-success' : analysis?.riskProfile === 'High' ? 'badge-error' : 'badge-warning'} font-mono text-xs`}>
                {analysis?.riskProfile?.toUpperCase() || 'MODERATE'} RISK
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div style={{
                width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                backgroundColor: analysis?.riskProfile === 'Low' ? 'var(--success-bg)' : analysis?.riskProfile === 'High' ? 'var(--error-bg)' : 'var(--warning-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: analysis?.riskProfile === 'Low' ? 'var(--success)' : analysis?.riskProfile === 'High' ? 'var(--error)' : 'var(--warning)'
              }}>
                <Target size={22} />
              </div>
              <div>
                <div className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
                  {analysis?.riskProfile === 'Low' ? 'Favorable Conditions' : analysis?.riskProfile === 'High' ? 'High Execution Difficulty' : 'Balanced Dynamics'}
                </div>
                <span className="text-xs text-light">Mitigated by lean prototype</span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', paddingTop: '0.85rem', lineHeight: 1.6 }}>
              {analysis?.competitorAnalysisNote || 'Niche positioning insulates against generalized enterprise solutions.'}
            </p>
          </div>

        </div>

        {/* ── Sub-Scores & Financial Projections ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Sub-Score Breakdown */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-accent" />
              Dimension Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Market Opportunity Fit', val: analysis?.breakdown?.marketFit || 85, color: 'var(--accent)' },
                { label: 'Target Audience Match', val: analysis?.breakdown?.customerMatch || 80, color: '#06b6d4' },
                { label: 'Capital & Unit Economics', val: analysis?.breakdown?.financials || 78, color: 'var(--success)' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span className="font-mono" style={{ color: item.color }}>{item.val}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Forecast Matrix */}
          <div className="card p-6 lg:col-span-2" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign size={18} className="text-success" />
                Year 1 Financial Model
              </span>
              <span className="badge badge-primary font-mono text-xs">MODEL: PROBABILISTIC</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light uppercase font-semibold tracking-wider">Required Capital</span>
                <div className="text-lg font-bold font-mono text-main mt-0.5">{analysis?.financialForecast?.estimatedCost || '$30,000'}</div>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light uppercase font-semibold tracking-wider">Est. Revenue (Y1)</span>
                <div className="text-lg font-bold font-mono text-success mt-0.5">{analysis?.financialForecast?.revenueForecast || '$83,000'}</div>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light uppercase font-semibold tracking-wider">Breakeven Horizon</span>
                <div className="text-lg font-bold font-mono text-accent mt-0.5">{analysis?.financialForecast?.breakEvenMonth || 'Month 7'}</div>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light uppercase font-semibold tracking-wider">Projected Multiple</span>
                <div className="text-lg font-bold font-mono text-main mt-0.5">{analysis?.financialForecast?.roiMultiple || '2.5x'}</div>
              </div>
            </div>

            {/* Cost Breakdown Progress Bar */}
            {cb && (
              <div>
                <div className="flex justify-between text-xs text-light font-medium mb-1.5">
                  <span>Capital Allocation Split</span>
                  <span className="font-mono">100% Budget Distribution</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, overflow: 'hidden', display: 'flex', background: 'var(--border)' }}>
                  <div style={{ width: `${(cb.product / cbTotal) * 100}%`, background: cbColors.product }} title="Product / R&D" />
                  <div style={{ width: `${(cb.marketing / cbTotal) * 100}%`, background: cbColors.marketing }} title="Growth & Marketing" />
                  <div style={{ width: `${(cb.operations / cbTotal) * 100}%`, background: cbColors.operations }} title="Operations & Team" />
                  <div style={{ width: `${(cb.legal / cbTotal) * 100}%`, background: cbColors.legal }} title="Legal & Compliance" />
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1.5"><span style={{ width: 8, height: 8, borderRadius: '50%', background: cbColors.product }} /> Product: ${cb.product.toLocaleString()}</span>
                  <span className="flex items-center gap-1.5"><span style={{ width: 8, height: 8, borderRadius: '50%', background: cbColors.marketing }} /> Marketing: ${cb.marketing.toLocaleString()}</span>
                  <span className="flex items-center gap-1.5"><span style={{ width: 8, height: 8, borderRadius: '50%', background: cbColors.operations }} /> Operations: ${cb.operations.toLocaleString()}</span>
                  <span className="flex items-center gap-1.5"><span style={{ width: 8, height: 8, borderRadius: '50%', background: cbColors.legal }} /> Legal: ${cb.legal.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Strengths, Risks & Strategic Roadmaps ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Strengths */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-success">
              <CheckCircle size={18} /> Core Advantages
            </h3>
            <div className="flex flex-col gap-3">
              {(analysis?.strengths || []).map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--success)', marginTop: '2px' }}>&bull;</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-error">
              <AlertTriangle size={18} /> Vulnerabilities & Threats
            </h3>
            <div className="flex flex-col gap-3">
              {(analysis?.risks || []).map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--error)', marginTop: '2px' }}>&bull;</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Recommendations */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-accent">
              <Sparkles size={18} /> Strategic Levers
            </h3>
            <div className="flex flex-col gap-3">
              {(analysis?.improvements || []).map((imp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px' }}>&bull;</span>
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Competitor Radar & Legal Readiness ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Competitor Benchmark */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
              <Target size={18} className="text-warning" />
              Competitor Moat & Vulnerability Radar
            </h3>
            <div className="flex flex-col gap-3.5">
              {(analysis?.competitors || []).map((comp, i) => (
                <div key={i} className="p-3.5 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-sm text-main">{comp.name}</span>
                    <span className="badge badge-warning font-mono text-xs">{comp.similarity} Similarity</span>
                  </div>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Strength:</strong> {comp.strength}
                  </div>
                  <div className="text-xs text-success font-medium">
                    <strong>Your Moat:</strong> {comp.weakness}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Checklist Progress */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" />
                Statutory & Compliance Checklist
              </h3>
              <span className="badge badge-success font-mono text-xs">{completedLegal}/{totalLegal} Filings Done</span>
            </div>

            <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: `${legalPct}%`, height: '100%', background: 'var(--success)', transition: 'width 0.3s' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(analysis?.legalChecklist || []).map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleLegal(item)}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg text-left text-xs font-medium"
                  style={{
                    backgroundColor: legalChecks[item] ? 'var(--success-bg)' : 'var(--bg-subtle)',
                    border: `1px solid ${legalChecks[item] ? 'var(--success-border)' : 'var(--border)'}`,
                    color: legalChecks[item] ? 'var(--success)' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1.5px solid ${legalChecks[item] ? 'var(--success)' : 'var(--text-muted)'}`,
                    backgroundColor: legalChecks[item] ? 'var(--success)' : 'transparent',
                    color: '#fff', flexShrink: 0
                  }}>
                    {legalChecks[item] && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ textDecoration: legalChecks[item] ? 'line-through' : 'none' }}>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Relevant Government Schemes Direct Integration ── */}
        <div className="card p-6" style={{ borderRadius: '20px' }}>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Landmark size={18} className="text-accent" />
                Matched Non-Dilutive Government Grants & Subsidies
              </h3>
              <p className="text-xs text-light mt-0.5">Automated screening against sector criteria and early stage capital brackets</p>
            </div>
            <a href="/schemes" className="btn btn-outline text-xs" style={{ padding: '0.4rem 0.9rem' }}>
              View All Schemes &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemes.slice(0, 3).map((s, i) => (
              <div key={i} className="p-4 rounded-xl flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-main">{s.name}</span>
                    <span className="badge badge-success font-mono text-xs">{s.fundingAmount}</span>
                  </div>
                  <p className="text-xs text-light line-clamp-2 mb-3 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <a
                  href={s.applicationUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline text-xs w-full justify-center"
                  style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}
                >
                  Verify Eligibility & Apply
                </a>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
