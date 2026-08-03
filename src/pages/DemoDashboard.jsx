import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, FileBarChart, Landmark, Settings, User, Bell,
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, ArrowRight, Lock
} from 'lucide-react';

export default function DemoDashboard() {
  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 70px)' }}>
      {/* Demo Banner */}
      <div className="w-full bg-gradient-blue text-center py-3 flex items-center justify-center gap-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="font-medium" style={{ color: 'var(--dark-navy)' }}>You are viewing a Demo with preloaded sample data.</span>
        <Link to="/signup" className="btn btn-primary" style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}>Sign up to analyze your own ideas</Link>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside style={{ width: '250px', backgroundColor: 'var(--white)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div className="flex flex-col gap-2 flex-grow opacity-75">
            <a href="#" className="flex items-center gap-3 p-3 rounded bg-blue-50 text-primary font-medium" style={{ backgroundColor: '#eff6ff' }}>
              <LayoutDashboard size={20} /> Demo Dashboard
            </a>
            <div className="flex items-center gap-3 p-3 rounded text-light cursor-not-allowed" style={{ color: 'var(--text-light)' }}>
              <FolderOpen size={20} /> My Ideas <Lock size={14} className="ml-auto"/>
            </div>
            <div className="flex items-center gap-3 p-3 rounded text-light cursor-not-allowed" style={{ color: 'var(--text-light)' }}>
              <FileBarChart size={20} /> Reports <Lock size={14} className="ml-auto"/>
            </div>
            <div className="flex items-center gap-3 p-3 rounded text-light cursor-not-allowed" style={{ color: 'var(--text-light)' }}>
              <Landmark size={20} /> Saved Schemes <Lock size={14} className="ml-auto"/>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 style={{ fontSize: '2rem' }}>Idea Analysis Results <span style={{ fontSize: '1rem', background: '#e0e7ff', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '1rem', verticalAlign: 'middle', marginLeft: '0.5rem' }}>SAMPLE DATA</span></h1>
              <p className="text-light">Project: Organic Food Delivery</p>
            </div>
            <div className="flex gap-4">
              <Link to="/signup" className="btn btn-outline cursor-not-allowed opacity-50">
                <Share2 size={18} /> Share Report
              </Link>
              <Link to="/signup" className="btn btn-primary cursor-not-allowed opacity-50">
                <Download size={18} /> Download PDF
              </Link>
            </div>
          </div>

          {/* Top Widgets */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="card text-center relative overflow-hidden">
              <h3 className="mb-4">Viability Score</h3>
              <div className="flex justify-center mb-4">
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #eff6ff', borderTopColor: 'var(--success)', borderRightColor: 'var(--success)', borderBottomColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--dark-navy)', transform: 'rotate(45deg)' }}>87<span style={{ fontSize: '1rem', color: 'var(--text-light)' }}>/100</span></span>
                </div>
              </div>
              <p className="text-success font-medium flex items-center justify-center gap-1">
                <TrendingUp size={18} /> High Probability of Success
              </p>
            </div>
            
            <div className="card">
              <h3 className="mb-4">Market Demand</h3>
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-gradient" style={{ fontSize: '2rem' }}>High</span>
                <span className="text-success font-medium">+18% YoY</span>
              </div>
              <p className="text-light mb-4">Growing trend in health-conscious consumer behavior.</p>
              <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>

            <div className="card">
              <h3 className="mb-4">Risk Profile</h3>
              <div className="flex items-center gap-4 mb-4">
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <div className="font-bold" style={{ fontSize: '1.25rem' }}>Medium</div>
                  <div className="text-light" style={{ fontSize: '0.875rem' }}>Competition Risk</div>
                </div>
              </div>
              <ul className="text-sm" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> High Margin Potential</li>
                <li className="flex items-center gap-2"><Activity size={16} className="text-error" /> Delivery Logistics Overhead</li>
              </ul>
            </div>
          </div>

          {/* Competitor Analysis & Government Schemes */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="mb-4 flex items-center gap-2"><Activity size={24} className="text-primary" /> Competitor Analysis</h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'FreshEats', rating: '4.2/5', weak: 'Limited coverage', strong: 'Fast delivery' },
                  { name: 'GreenGrocer Daily', rating: '3.9/5', weak: 'High delivery fees', strong: 'Local farms network' }
                ].map((comp, idx) => (
                  <div key={idx} className="card p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{comp.name}</h4>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Rating: {comp.rating}</div>
                    </div>
                    <div className="text-right" style={{ fontSize: '0.875rem' }}>
                      <div className="text-error">Weakness: {comp.weak}</div>
                      <div className="text-success">Strength: {comp.strong}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2"><Landmark size={24} className="text-primary" /> Eligible Government Schemes</h3>
              <div className="flex flex-col gap-4">
                <div className="card p-4 border-l-4" style={{ borderLeftColor: 'var(--primary)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">Startup India Seed Fund</h4>
                    <span style={{ background: '#dcfce7', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>Eligible</span>
                  </div>
                  <p className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Assistance for prototype development and market entry.</p>
                </div>
                
                <div className="card p-4 border-l-4" style={{ borderLeftColor: 'var(--success)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">MSME Registration Benefits</h4>
                    <span style={{ background: '#dcfce7', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>Eligible</span>
                  </div>
                  <p className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Collateral-free loans and lower interest rates for registered businesses.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Forecast */}
          <div className="card">
            <h3 className="mb-4">Financial Forecast (Year 1)</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '0.5rem', color: 'var(--error)' }}><DollarSign size={20} /></div>
                <div>
                  <div className="font-bold">Estimated Cost</div>
                  <div className="font-bold text-error" style={{ fontSize: '1.25rem' }}>$35,000</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ padding: '0.5rem', background: '#dcfce7', borderRadius: '0.5rem', color: 'var(--success)' }}><TrendingUp size={20} /></div>
                <div>
                  <div className="font-bold">Revenue Forecast</div>
                  <div className="font-bold text-success" style={{ fontSize: '1.25rem' }}>$95,000</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ padding: '0.5rem', background: '#e0e7ff', borderRadius: '0.5rem', color: 'var(--primary)' }}><Activity size={20} /></div>
                <div>
                  <div className="font-bold">Break-even Analysis</div>
                  <div className="font-bold text-primary" style={{ fontSize: '1.25rem' }}>Month 5</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
