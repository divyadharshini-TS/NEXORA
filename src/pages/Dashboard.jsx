import React, { useEffect, useState } from 'react';
import {
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, ArrowRight, Landmark, ShieldAlert, Info, Sparkles, Check,
  BarChart3, Target, ShieldCheck, HelpCircle, Layers, FileText,
  ThumbsUp, ThumbsDown, MessageSquare, Sliders, Calculator, Calendar,
  Clock, ArrowUpRight, Percent, RefreshCw, Cpu
} from 'lucide-react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import Sidebar from '../components/Sidebar';
import { apiGet, apiFetch } from '../utils/safeApi';

const FALLBACK = {
  _id: 'sample_anl_001',
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
    { name: 'Amazon / Flipkart', similarity: 'High', pricingInfo: '15-22% commission take rate', strength: 'Unmatched logistics network and brand trust', weakness: 'Poor support for niche/sustainable D2C brands — your focus area' },
    { name: 'Shopify / Meesho', similarity: 'Medium', pricingInfo: '$39/mo + 2% transaction fee', strength: 'Easy store setup with growing merchant base', weakness: 'Generic tooling with no sector specialization' },
  ],
  sentimentAnalysis: {
    competitor: 'Amazon / Flipkart',
    overall_sentiment: 'Positive',
    polarity_score: 0.68,
    sentiment_distribution: {
      positive_pct: 68.0,
      neutral_pct: 22.0,
      negative_pct: 10.0,
      positive_count: 34,
      neutral_count: 11,
      negative_count: 5,
      total_reviews_analyzed: 50
    },
    customer_reviews: [
      { user: 'D2C Founder', text: 'Packaging arrived pristine and fully biodegradable as promised. Great unboxing experience!', sentiment: 'Positive' },
      { user: 'Retail Partner', text: 'Reliable wholesale dispatch, though shipping tracking could be updated faster.', sentiment: 'Neutral' },
      { user: 'Verified Brand', text: 'Return policy took over 10 days to process refund. Needs better customer support.', sentiment: 'Negative' },
      { user: 'Eco Enthusiast', text: 'Outstanding product quality. Love supporting brands that avoid single-use plastics.', sentiment: 'Positive' }
    ]
  },
  dynamicPricing: {
    category: 'ecommerce',
    pricing_unit: 'per product / order',
    unit_cost: 18.0,
    recommended_price: 45.0,
    min_suggested_price: 28.0,
    max_suggested_price: 85.0,
    gross_profit_per_unit: 27.0,
    gross_margin_pct: 60.0,
    estimated_net_margin_pct: 27.0,
    pricing_strategy: 'Value-Based Competitive Penetration Strategy',
    competitor_price_benchmarks: {
      budget_entry: 25.0,
      market_median: 45.0,
      premium_tier: 85.0
    },
    investment_suitability: {
      status: 'Lean & Optimal Seed Runway',
      score: 86,
      analysis: 'Your budget ($30,000) aligns well with a 9-12 month lean seed runway. Allocate 45% to product/engineering, 35% to customer acquisition, and 20% to operational contingency.',
      budget_entered: 30000
    }
  },
  financialForecast: {
    inputs: {
      total_investment: 30000,
      unit_price: 45,
      variable_cost_per_unit: 18,
      monthly_fixed_costs: 2400,
      projected_monthly_units: 180
    },
    startup_capital_allocation: {
      capital_expenditure_capex: 9000,
      operating_reserve_opex: 13500,
      working_capital_buffer: 7500,
      total_startup_capital: 30000
    },
    unit_economics: {
      contribution_margin_dollar: 27,
      contribution_margin_ratio: 60.0,
      gross_margin_pct: 60.0,
      net_profit_margin_pct: 28.5
    },
    break_even_analysis: {
      is_achievable: true,
      break_even_units_monthly: 89,
      break_even_revenue_monthly: 4005,
      break_even_summary: 'Break-even is achieved around Month 7 at 89 units/month ($4,005 run-rate).'
    },
    annual_projections: {
      year_1_gross_revenue: 83000,
      year_1_net_profit: 24900,
      roi_pct: 83.0,
      investment_recovery_timeline: 'Month 7 (Full principal capital recovered within Year 1)',
      payback_month: 7
    },
    monthly_cash_flows: [
      { month: 'M1', units: 30, revenue: 1350, expenses: 2940, net_cash_flow: -1590 },
      { month: 'M3', units: 75, revenue: 3375, expenses: 3750, net_cash_flow: -375 },
      { month: 'M6', units: 140, revenue: 6300, expenses: 4920, net_cash_flow: 1380 },
      { month: 'M9', units: 190, revenue: 8550, expenses: 5820, net_cash_flow: 2730 },
      { month: 'M12', units: 250, revenue: 11250, expenses: 6900, net_cash_flow: 4350 }
    ],
    estimatedCost: '$30,000',
    revenueForecast: '$83,000',
    breakEvenMonth: 'Month 7',
    roiMultiple: '2.5x',
    costBreakdown: { product: 12000, marketing: 7500, operations: 6000, legal: 4500 },
  },
  milestones: [
    { id: 'm1', title: 'Idea Viability & Moats Validated', status: 'completed', targetDate: 'Month 1', completedAt: new Date().toISOString() },
    { id: 'm2', title: 'Legal Structure & MSME Registration', status: 'in_progress', targetDate: 'Month 2' },
    { id: 'm3', title: 'MVP / Prototype Developed', status: 'pending', targetDate: 'Month 4' },
    { id: 'm4', title: 'Government Grant (SISFS/TANSEED) Filed', status: 'pending', targetDate: 'Month 5' },
    { id: 'm5', title: 'First 50 Paying Customers Acquired', status: 'pending', targetDate: 'Month 7' },
    { id: 'm6', title: 'Break-Even Run Rate Reached', status: 'pending', targetDate: 'Month 10' }
  ],
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
  const [milestones, setMilestones] = useState([]);
  const [copied, setCopied] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Interactive Financial Calculator state (Module 6)
  const [calcInputs, setCalcInputs] = useState({
    unitPrice: 45,
    variableCost: 18,
    fixedCosts: 2400,
    monthlyUnits: 180
  });

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
      
      // Initialize legal checks
      const checks = {};
      (current.legalChecklist || []).forEach((item, i) => { checks[item] = i < 2; });
      setLegalChecks(checks);

      // Initialize milestones
      setMilestones(current.milestones || FALLBACK.milestones);

      // Initialize financial calculator inputs
      const dynPrice = current.dynamicPricing?.recommended_price || 45;
      const dynCost = current.dynamicPricing?.unit_cost || 18;
      const budget = current.investmentAmount || 30000;
      setCalcInputs({
        unitPrice: dynPrice,
        variableCost: dynCost,
        fixedCosts: Math.round(budget * 0.08),
        monthlyUnits: Math.max(50, Math.round(budget * 0.005))
      });
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
  
  const toggleMilestone = async (mId) => {
    const updated = milestones.map(m => {
      if (m.id === mId) {
        const nextStatus = m.status === 'completed' ? 'pending' : m.status === 'pending' ? 'in_progress' : 'completed';
        return {
          ...m,
          status: nextStatus,
          completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined
        };
      }
      return m;
    });

    setMilestones(updated);

    // Save to backend and local cache
    try {
      if (analysis?._id) {
        const token = localStorage.getItem('nexoraToken');
        await apiFetch(`/api/analyze/${analysis._id}/milestones`, {
          method: 'PUT',
          body: JSON.stringify({ milestones: updated }),
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
    } catch {}

    try {
      const stored = JSON.parse(localStorage.getItem('latestAnalysis') || '{}');
      stored.milestones = updated;
      localStorage.setItem('latestAnalysis', JSON.stringify(stored));
    } catch {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${analysis?.businessName} AI Report`, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Live Financial Calculations (Module 6)
  const p = Number(calcInputs.unitPrice) || 1;
  const vc = Number(calcInputs.variableCost) || 0;
  const fc = Number(calcInputs.fixedCosts) || 100;
  const units = Number(calcInputs.monthlyUnits) || 1;

  const contributionMargin = Math.max(0, p - vc);
  const contributionRatio = p > 0 ? ((contributionMargin / p) * 100).toFixed(1) : 0;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fc / contributionMargin) : 99999;
  const breakEvenRevenue = breakEvenUnits * p;
  const monthlyRevenue = units * p;
  const monthlyExpenses = fc + (units * vc);
  const monthlyNetProfit = monthlyRevenue - monthlyExpenses;
  const netMarginPct = monthlyRevenue > 0 ? ((monthlyNetProfit / monthlyRevenue) * 100).toFixed(1) : 0;
  const annualNet = monthlyNetProfit * 12;
  const totalInv = analysis?.investmentAmount || 30000;
  const roiPct = totalInv > 0 ? ((annualNet / totalInv) * 100).toFixed(1) : 0;
  const paybackMonths = monthlyNetProfit > 0 ? Math.ceil(totalInv / monthlyNetProfit) : 99;

  const completedLegal = Object.values(legalChecks).filter(Boolean).length;
  const totalLegal = Object.keys(legalChecks).length || 1;
  const legalPct = Math.round((completedLegal / totalLegal) * 100);
  const score = analysis?.aiScore || 0;
  const scoreColor = score >= 70 ? 'var(--success)' : score >= 50 ? 'var(--accent)' : 'var(--error)';

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'in_progress').length;
  const totalMilestonesCount = milestones.length || 6;
  const milestonePct = Math.round((completedMilestones / totalMilestonesCount) * 100);

  const cb = analysis?.financialForecast?.costBreakdown;
  const cbTotal = cb ? cb.product + cb.marketing + cb.operations + cb.legal : 1;
  const cbColors = { product: 'var(--accent)', marketing: '#a855f7', operations: '#f59e0b', legal: '#06b6d4' };

  const sentiment = analysis?.sentimentAnalysis || FALLBACK.sentimentAnalysis;
  const dynamicPricing = analysis?.dynamicPricing || FALLBACK.dynamicPricing;

  return (
    <div style={{ minHeight: 'calc(100vh - 74px)', backgroundColor: 'var(--bg-color)' }}>
      <main className="container" style={{ padding: '2rem 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>

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
              <span className="text-xs text-light">&bull; AI & ML Predictive Intelligence</span>
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
                <span className="text-xs text-light font-mono mt-1 block">
                  ML Model: Scikit-learn (RF 91.3% Acc)
                </span>
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

        {/* ── MODULE 3: COMPETITOR & REVIEW SENTIMENT ANALYSIS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Competitor Price Comparison & Moats */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Target size={18} className="text-warning" />
                Competitor Pricing & Moat Radar
              </h3>
              <span className="badge badge-warning font-mono text-xs">MODULE 3</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {(analysis?.competitors || []).map((comp, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-sm text-main">{comp.name}</span>
                      <span className="badge badge-outline font-mono text-xs ml-2">{comp.similarity} Similarity</span>
                    </div>
                    {comp.pricingInfo && (
                      <span className="badge badge-primary font-mono text-xs">{comp.pricingInfo}</span>
                    )}
                  </div>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Advantage:</strong> {comp.strength}
                  </div>
                  <div className="text-xs text-success font-medium">
                    <strong>Your Differentiation:</strong> {comp.weakness}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Review Sentiment Analysis */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-accent" />
                Customer Review Sentiment Analysis (NLTK & ML)
              </h3>
              <span className="badge badge-success font-mono text-xs">POLARITY: {sentiment.polarity_score}</span>
            </div>

            {/* Sentiment Gauge & Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-border)' }}>
                <span className="text-xs text-success font-semibold flex items-center justify-center gap-1 mb-1">
                  <ThumbsUp size={13} /> Positive
                </span>
                <span className="text-lg font-bold font-mono text-success">{sentiment.sentiment_distribution?.positive_pct || 68}%</span>
              </div>

              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light font-semibold mb-1 block">Neutral</span>
                <span className="text-lg font-bold font-mono text-main">{sentiment.sentiment_distribution?.neutral_pct || 22}%</span>
              </div>

              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)' }}>
                <span className="text-xs text-error font-semibold flex items-center justify-center gap-1 mb-1">
                  <ThumbsDown size={13} /> Negative
                </span>
                <span className="text-lg font-bold font-mono text-error">{sentiment.sentiment_distribution?.negative_pct || 10}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 8, borderRadius: 4, overflow: 'hidden', display: 'flex', background: 'var(--border)', marginBottom: '1.25rem' }}>
              <div style={{ width: `${sentiment.sentiment_distribution?.positive_pct || 68}%`, background: 'var(--success)' }} title="Positive" />
              <div style={{ width: `${sentiment.sentiment_distribution?.neutral_pct || 22}%`, background: '#94a3b8' }} title="Neutral" />
              <div style={{ width: `${sentiment.sentiment_distribution?.negative_pct || 10}%`, background: 'var(--error)' }} title="Negative" />
            </div>

            {/* Review Samples */}
            <h4 className="text-xs font-bold text-light uppercase tracking-wider mb-2">Customer Feedback Samples</h4>
            <div className="flex flex-col gap-2">
              {(sentiment.customer_reviews || []).slice(0, 3).map((rev, ri) => (
                <div key={ri} className="p-2.5 rounded-lg text-xs flex justify-between items-start gap-3" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <p className="text-secondary leading-relaxed mb-0">"{rev.text}"</p>
                  <span className={`badge ${rev.sentiment === 'Positive' ? 'badge-success' : rev.sentiment === 'Negative' ? 'badge-error' : 'badge-outline'} text-xs font-mono flex-shrink-0`}>
                    {rev.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── MODULE 4: DYNAMIC PRICING & BUDGET RECOMMENDATION ── */}
        <div className="card p-6 mb-8" style={{ borderRadius: '20px' }}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <DollarSign size={18} className="text-success" />
                Dynamic Pricing Strategy & Budget Suitability
              </h3>
              <p className="text-xs text-light mt-0.5">Transparent unit economics and data-grounded pricing percentiles</p>
            </div>
            <span className="badge badge-primary font-mono text-xs">MODULE 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <span className="text-xs text-light font-semibold uppercase tracking-wider">Unit Production Cost</span>
              <div className="text-xl font-bold font-mono text-main mt-1">${dynamicPricing.unit_cost}</div>
              <span className="text-xs text-light">COGS / customer monthly load</span>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-border)' }}>
              <span className="text-xs text-success font-semibold uppercase tracking-wider">Recommended Selling Price</span>
              <div className="text-2xl font-extrabold font-mono text-success mt-1">${dynamicPricing.recommended_price}</div>
              <span className="text-xs text-success font-medium">{dynamicPricing.pricing_unit}</span>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <span className="text-xs text-light font-semibold uppercase tracking-wider">Suggested Price Bounds</span>
              <div className="text-base font-bold font-mono text-main mt-1">
                ${dynamicPricing.min_suggested_price} &mdash; ${dynamicPricing.max_suggested_price}
              </div>
              <span className="text-xs text-light">Min floor vs premium ceiling</span>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <span className="text-xs text-light font-semibold uppercase tracking-wider">Target Gross Margin</span>
              <div className="text-xl font-bold font-mono text-accent mt-1">{dynamicPricing.gross_margin_pct}%</div>
              <span className="text-xs text-light">~{dynamicPricing.estimated_net_margin_pct}% estimated net margin</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <h4 className="text-xs font-bold text-main uppercase tracking-wider mb-1">Pricing Strategy Formulation</h4>
              <p className="text-xs text-secondary leading-relaxed mb-0">{dynamicPricing.pricing_strategy}</p>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-main uppercase tracking-wider">Capital Suitability</h4>
                <span className="badge badge-success font-mono text-xs">{dynamicPricing.investment_suitability?.status}</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed mb-0">{dynamicPricing.investment_suitability?.analysis}</p>
            </div>
          </div>
        </div>

        {/* ── MODULE 6: FINANCIAL CALCULATOR & BREAK-EVEN ANALYSIS ── */}
        <div className="card p-6 mb-8" style={{ borderRadius: '20px' }}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Calculator size={18} className="text-accent" />
                Interactive Financial Calculator & Break-Even Simulation
              </h3>
              <p className="text-xs text-light mt-0.5">Adjust variables to recalculate break-even units, cash flows, and ROI in real-time</p>
            </div>
            <span className="badge badge-primary font-mono text-xs">MODULE 6</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Interactive Inputs */}
            <div className="flex flex-col gap-3 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <h4 className="text-xs font-bold text-main uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sliders size={14} /> Model Parameters
              </h4>

              <div>
                <label className="text-xs font-medium text-light block mb-1">Selling Price ($/unit)</label>
                <input
                  type="number"
                  min="1"
                  value={calcInputs.unitPrice}
                  onChange={(e) => setCalcInputs({ ...calcInputs, unitPrice: e.target.value })}
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-light block mb-1">Variable Cost ($/unit)</label>
                <input
                  type="number"
                  min="0"
                  value={calcInputs.variableCost}
                  onChange={(e) => setCalcInputs({ ...calcInputs, variableCost: e.target.value })}
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-light block mb-1">Monthly Fixed Costs ($)</label>
                <input
                  type="number"
                  min="100"
                  value={calcInputs.fixedCosts}
                  onChange={(e) => setCalcInputs({ ...calcInputs, fixedCosts: e.target.value })}
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-light block mb-1">Projected Monthly Units</label>
                <input
                  type="number"
                  min="1"
                  value={calcInputs.monthlyUnits}
                  onChange={(e) => setCalcInputs({ ...calcInputs, monthlyUnits: e.target.value })}
                  className="form-input text-xs"
                />
              </div>
            </div>

            {/* Calculated Results */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light font-semibold uppercase tracking-wider">Contribution Margin</span>
                <div className="text-xl font-bold font-mono text-main mt-1">${contributionMargin.toFixed(2)}</div>
                <span className="text-xs text-light font-mono">{contributionRatio}% of price</span>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light font-semibold uppercase tracking-wider">Break-Even Threshold</span>
                <div className="text-xl font-bold font-mono text-accent mt-1">{breakEvenUnits.toLocaleString()} units</div>
                <span className="text-xs text-light font-mono">${breakEvenRevenue.toLocaleString()} run-rate</span>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light font-semibold uppercase tracking-wider">Net Monthly Profit</span>
                <div className={`text-xl font-bold font-mono ${monthlyNetProfit >= 0 ? 'text-success' : 'text-error'} mt-1`}>
                  ${monthlyNetProfit.toLocaleString()}
                </div>
                <span className="text-xs text-light font-mono">{netMarginPct}% Net Margin</span>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span className="text-xs text-light font-semibold uppercase tracking-wider">Projected Year 1 ROI</span>
                <div className="text-xl font-bold font-mono text-success mt-1">{roiPct}%</div>
                <span className="text-xs text-light">Payback: ~{paybackMonths} Months</span>
              </div>

              {/* 12-Month Cash Flow Ramp Table */}
              <div className="col-span-2 sm:col-span-4 mt-2">
                <h4 className="text-xs font-bold text-main uppercase tracking-wider mb-2">12-Month Cash Flow Simulation</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '450px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                        <th className="pb-2 font-semibold">Milestone Month</th>
                        <th className="pb-2 font-semibold">Units Sold</th>
                        <th className="pb-2 font-semibold">Gross Revenue</th>
                        <th className="pb-2 font-semibold">Total Expenses</th>
                        <th className="pb-2 font-semibold text-right">Net Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(analysis?.financialForecast?.monthly_cash_flows || [
                        { month: 'M1', units: 30, revenue: 1350, expenses: 2940, net_cash_flow: -1590 },
                        { month: 'M3', units: 75, revenue: 3375, expenses: 3750, net_cash_flow: -375 },
                        { month: 'M6', units: 140, revenue: 6300, expenses: 4920, net_cash_flow: 1380 },
                        { month: 'M12', units: 250, revenue: 11250, expenses: 6900, net_cash_flow: 4350 }
                      ]).map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.8rem' }}>
                          <td className="py-2 font-mono font-medium text-main">{row.month}</td>
                          <td className="py-2 font-mono">{row.units}</td>
                          <td className="py-2 font-mono text-success">${Number(row.revenue).toLocaleString()}</td>
                          <td className="py-2 font-mono text-light">${Number(row.expenses).toLocaleString()}</td>
                          <td className={`py-2 font-mono text-right font-bold ${row.net_cash_flow >= 0 ? 'text-success' : 'text-error'}`}>
                            ${Number(row.net_cash_flow).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MODULE 7: PROGRESS & MILESTONE TRACKING ── */}
        <div className="card p-6 mb-8" style={{ borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
          
          {/* Header & Overall Metric */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge badge-primary font-mono text-xs">MODULE 7 • EXECUTION ROADMAP</span>
                <span className="text-xs text-light">• Horizon: Month 1 to Month 10</span>
              </div>
              <h3 className="font-bold text-lg flex items-center gap-2.5" style={{ letterSpacing: '-0.02em' }}>
                <Target size={20} className="text-accent" />
                Venture Milestone & Execution Progress Tracking
              </h3>
              <p className="text-xs text-light mt-0.5">
                Sequential checkpoints tracking your startup from hypothesis validation to break-even scale
              </p>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="text-xs text-light font-medium">Roadmap Progress</div>
                <div className="font-extrabold text-sm font-mono" style={{ color: milestonePct === 100 ? 'var(--success)' : 'var(--accent)' }}>
                  {completedMilestones} of {totalMilestonesCount} Done ({milestonePct}%)
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `conic-gradient(var(--accent) ${milestonePct * 3.6}deg, var(--border) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                flexShrink: 0
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--card-bg, #ffffff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  color: 'var(--text-main)'
                }}>
                  {milestonePct}%
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Summary Ribbon */}
          <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div className="flex flex-wrap justify-between items-center text-xs gap-2 mb-2.5 font-medium">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge badge-success text-xs font-mono py-0.5 px-2">✓ {completedMilestones} Completed</span>
                <span className="badge badge-primary text-xs font-mono py-0.5 px-2">⏳ {inProgressMilestones} Active</span>
                <span className="text-muted text-xs font-mono">○ {totalMilestonesCount - completedMilestones - inProgressMilestones} Pending</span>
              </div>
              <span className="text-light text-xs">
                Financial Break-Even Horizon: <strong className="text-main font-mono">Month 7–10</strong>
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                width: `${milestonePct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 50%, #10b981 100%)',
                borderRadius: 999,
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>

          {/* Sequential Milestone Stepper Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, idx) => {
              const isDone = m.status === 'completed';
              const isInProg = m.status === 'in_progress';
              const stepNumber = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(m.id)}
                  className="rounded-2xl p-4 cursor-pointer hover-lift flex flex-col justify-between relative group transition-all"
                  style={{
                    backgroundColor: isDone ? 'var(--success-bg)' : isInProg ? 'var(--accent-bg, rgba(37, 99, 235, 0.05))' : 'var(--bg-subtle)',
                    border: `1.5px solid ${isDone ? 'var(--success-border, #10b981)' : isInProg ? 'var(--accent)' : 'var(--border)'}`,
                    boxShadow: isDone ? '0 4px 14px rgba(16, 185, 129, 0.08)' : isInProg ? '0 4px 14px rgba(37, 99, 235, 0.1)' : 'none',
                    minHeight: '142px'
                  }}
                  title="Click to advance status (Pending → Active → Done)"
                >
                  {/* Top row: Step Pill & Status Badge */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        fontFamily: 'monospace',
                        color: isDone ? 'var(--success)' : isInProg ? 'var(--accent)' : 'var(--text-muted)',
                        backgroundColor: isDone ? 'rgba(16, 185, 129, 0.15)' : isInProg ? 'rgba(37, 99, 235, 0.12)' : 'var(--border)',
                        padding: '2px 7px',
                        borderRadius: '6px'
                      }}>
                        STEP {stepNumber}
                      </span>
                      <span className="text-xs text-light font-medium">
                        Target: <strong className="text-main">{m.targetDate}</strong>
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      letterSpacing: '0.03em',
                      backgroundColor: isDone ? 'var(--success)' : isInProg ? 'var(--accent)' : 'transparent',
                      color: isDone || isInProg ? '#ffffff' : 'var(--text-muted)',
                      border: isDone || isInProg ? 'none' : '1px solid var(--border)'
                    }}>
                      {isDone ? (
                        <>
                          <Check size={11} strokeWidth={3} />
                          <span>DONE</span>
                        </>
                      ) : isInProg ? (
                        <>
                          <Activity size={11} />
                          <span>ACTIVE</span>
                        </>
                      ) : (
                        <>
                          <Clock size={11} />
                          <span>PENDING</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Milestone Title */}
                  <h4 className="font-bold text-sm mb-3" style={{
                    color: 'var(--text-main)',
                    lineHeight: 1.4
                  }}>
                    {m.title}
                  </h4>

                  {/* Footer Action Hint */}
                  <div className="flex justify-between items-center text-xs pt-2.5 border-t" style={{ borderColor: isDone ? 'rgba(16, 185, 129, 0.2)' : isInProg ? 'rgba(37, 99, 235, 0.2)' : 'var(--border)' }}>
                    <span className="text-light" style={{ fontSize: '0.72rem' }}>
                      {isDone ? 'Checkpoint validated' : isInProg ? 'Active execution phase' : 'Upcoming objective'}
                    </span>
                    <span className="font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" style={{
                      fontSize: '0.72rem',
                      color: isDone ? 'var(--success)' : isInProg ? 'var(--accent)' : 'var(--text-light)'
                    }}>
                      <span>Toggle status</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Competitor Radar & Legal Readiness ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

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

          {/* Relevant Government Schemes */}
          <div className="card p-6" style={{ borderRadius: '20px' }}>
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Landmark size={18} className="text-accent" />
                  Matched Non-Dilutive Government Grants
                </h3>
                <p className="text-xs text-light mt-0.5">Automated screening against sector criteria</p>
              </div>
              <a href="/schemes" className="btn btn-outline text-xs" style={{ padding: '0.4rem 0.9rem' }}>
                View All &rarr;
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {schemes.slice(0, 3).map((s, i) => (
                <div key={i} className="p-3.5 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                  <div>
                    <span className="font-bold text-xs text-main block">{s.name}</span>
                    <span className="text-xs text-success font-semibold">{s.fundingAmount}</span>
                  </div>
                  <a
                    href={s.officialLink || s.applicationUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-xs py-1 px-3"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
