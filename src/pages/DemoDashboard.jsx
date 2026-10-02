import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, Lock, Landmark, Sparkles, ArrowRight, BarChart3, Target, PiggyBank, ShieldCheck
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
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 74px)' }}>
      {/* Demo Ribbon Banner */}
      <div className="w-full text-center py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 border-b" style={{ 
        backgroundColor: 'rgba(99, 102, 241, 0.08)', 
        borderColor: 'rgba(99, 102, 241, 0.2)',
        color: 'var(--text-main)'
      }}>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Sparkles size={14} className="text-accent" />
          <span>Interactive Demo Benchmark: Pre-computed diagnostic dossier for D2C AgriTech.</span>
        </div>
        <Link 
          to="/signup" 
          className="btn btn-accent" 
          style={{ padding: '0.3rem 0.95rem', fontSize: '0.78rem', borderRadius: 'var(--radius-full)' }}
        >
          Evaluate Your Venture Free &rarr;
        </Link>
      </div>

      <div className="flex flex-grow">
        <Sidebar isDemo={true} />

        {/* Main Content */}
        <main className="flex-grow p-6 lg:p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Benchmark Idea Dossier</h1>
                <span className="badge badge-primary font-mono text-xs">DEMO PREVIEW</span>
              </div>
              <p className="text-light text-sm">Venture: <strong style={{ color: 'var(--text-main)' }}>FreshHarvest Organic Delivery</strong> (D2C E-COMMERCE / AGRI)</p>
            </div>
            <div className="flex gap-3">
              <Link to="/signup" className="btn btn-outline flex items-center gap-1.5 text-xs" style={{ padding: '0.55rem 1.15rem' }}>
                <Share2 size={15} /> Share Report
              </Link>
              <Link to="/signup" className="btn btn-primary flex items-center gap-1.5 text-xs hover-lift" style={{ padding: '0.55rem 1.25rem' }}>
                <Download size={15} /> Download PDF Dossier
              </Link>
            </div>
          </div>

          {/* Metric Grid Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="stat-widget">
              <span className="text-xs text-light font-semibold uppercase tracking-wider mb-2">Market Readiness</span>
              <div className="text-2xl font-bold font-mono text-main mb-1">High Demand</div>
              <div className="text-xs text-success font-medium flex items-center gap-1 font-mono">
                <TrendingUp size={12} /> +28% YoY Growth
              </div>
            </div>

            <div className="stat-widget">
              <span className="text-xs text-light font-semibold uppercase tracking-wider mb-2">Viability Rating</span>
              <div className="text-2xl font-bold font-mono text-accent mb-1">87 / 100</div>
              <div className="text-xs text-light">Grade: Optimal Conviction</div>
            </div>

            <div className="stat-widget">
              <span className="text-xs text-light font-semibold uppercase tracking-wider mb-2">Govt Scheme Match</span>
              <div className="text-2xl font-bold font-mono text-success mb-1">₹50L Match</div>
              <div className="text-xs text-success font-medium">Startup India Seed Ready</div>
            </div>

            <div className="stat-widget">
              <span className="text-xs text-light font-semibold uppercase tracking-wider mb-2">Est. Breakeven</span>
              <div className="text-2xl font-bold font-mono text-main mb-1">8.5 Months</div>
              <div className="text-xs text-light">Initial Cap: $35,000</div>
            </div>
          </div>

          {/* Locked Feature Pro Banner */}
          <div className="card-glass p-8 text-center max-w-3xl mx-auto my-8 relative overflow-hidden" style={{ borderRadius: '24px' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '1rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
            }}>
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Run Live Diagnostic on Your Business Concept</h3>
            <p className="text-sm text-light max-w-lg mx-auto mb-6">
              Create a free founder account to model your custom financials, pinpoint competitor blindspots, and apply for government grants.
            </p>
            <Link to="/signup" className="btn btn-accent hover-lift" style={{ padding: '0.75rem 2.2rem', fontSize: '0.92rem' }}>
              Launch Full Diagnostic Free <ArrowRight size={16} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
