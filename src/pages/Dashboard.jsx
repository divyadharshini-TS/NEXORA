import React from 'react';
import { 
  LayoutDashboard, FolderOpen, FileBarChart, Landmark, Settings, User, Bell,
  TrendingUp, AlertTriangle, CheckCircle, Download, Share2, DollarSign,
  Activity, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--white)', borderRight: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div className="flex flex-col gap-2 flex-grow">
          <a href="#" className="flex items-center gap-3 p-3 rounded bg-blue-50 text-primary font-medium" style={{ backgroundColor: '#eff6ff' }}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded text-light hover:bg-gray-50" style={{ color: 'var(--text-light)' }}>
            <FolderOpen size={20} /> My Ideas
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded text-light hover:bg-gray-50" style={{ color: 'var(--text-light)' }}>
            <FileBarChart size={20} /> Reports
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded text-light hover:bg-gray-50" style={{ color: 'var(--text-light)' }}>
            <Landmark size={20} /> Saved Schemes
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded text-light hover:bg-gray-50" style={{ color: 'var(--text-light)' }}>
            <Settings size={20} /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded text-light hover:bg-gray-50" style={{ color: 'var(--text-light)' }}>
            <User size={20} /> Profile
          </a>
        </div>
        <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <button className="flex items-center gap-2 w-full justify-center p-2 border rounded" style={{ borderColor: 'var(--border)' }}>
            <Bell size={18} /> Notifications
            <span style={{ background: 'var(--error)', color: 'white', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>2</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 style={{ fontSize: '2rem' }}>Idea Analysis Results</h1>
            <p className="text-light">Project: EcoBox Sustainable Packaging</p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-outline">
              <Share2 size={18} /> Share Report
            </button>
            <button className="btn btn-primary">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        {/* Top Widgets */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="card text-center relative overflow-hidden">
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', opacity: '0.1' }}></div>
            <h3 className="mb-4">Viability Score</h3>
            <div className="flex justify-center mb-4">
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #eff6ff', borderTopColor: 'var(--success)', borderRightColor: 'var(--success)', borderBottomColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--dark-navy)', transform: 'rotate(45deg)' }}>84<span style={{ fontSize: '1rem', color: 'var(--text-light)' }}>/100</span></span>
              </div>
            </div>
            <p className="text-success font-medium flex items-center justify-center gap-1">
              <TrendingUp size={18} /> High Probability of Success
            </p>
          </div>
          
          <div className="card">
            <h3 className="mb-4">Market Demand</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="font-bold text-gradient" style={{ fontSize: '2rem' }}>$4.2B</span>
              <span className="text-success font-medium">+12% YoY</span>
            </div>
            <p className="text-light mb-4">Estimated addressable market in your target region.</p>
            <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">Risk Profile</h3>
            <div className="flex items-center gap-4 mb-4">
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <div className="font-bold" style={{ fontSize: '1.25rem' }}>Moderate</div>
                <div className="text-light" style={{ fontSize: '0.875rem' }}>Supply chain dependencies</div>
              </div>
            </div>
            <ul className="text-sm" style={{ listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Validated customer need</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Clear monetization path</li>
              <li className="flex items-center gap-2"><Activity size={16} className="text-error" /> High initial CapEx</li>
            </ul>
          </div>
        </div>

        {/* Competitor Analysis & Government Schemes */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="mb-4 flex items-center gap-2"><Activity size={24} className="text-primary" /> Competitor Analysis</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'PackGreen Inc.', rating: '4.5/5', weak: 'High prices', strong: 'Brand loyalty' },
                { name: 'EcoWrap Co.', rating: '3.8/5', weak: 'Poor customer service', strong: 'Wide distribution' }
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
                <p className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Financial assistance for proof of concept, prototype development, and product trials.</p>
                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>Apply Now <ArrowRight size={14} /></button>
              </div>
              
              <div className="card p-4 border-l-4" style={{ borderLeftColor: 'var(--success)' }}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">MSME Subsidy Scheme</h4>
                  <span style={{ background: '#dcfce7', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>Eligible</span>
                </div>
                <p className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Up to 25% subsidy on machinery and tech integration for eco-friendly manufacturing.</p>
                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>Apply Now <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Financial */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h3 className="mb-4">Legal Compliance Checklist</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Business Registration (LLP/Pvt Ltd)', done: true },
                { label: 'GST Registration', done: true },
                { label: 'PAN & TAN Application', done: false },
                { label: 'Trade License', done: false },
                { label: 'Environmental Clearance', done: false },
                { label: 'MSME (Udyam) Registration', done: false }
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded" style={{ backgroundColor: 'var(--bg-color)' }}>
                  <input type="checkbox" defaultChecked={item.done} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }} />
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-light)' : 'var(--text-main)' }}>{item.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <div style={{ height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '33%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
              </div>
              <div className="text-right mt-1" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>2/6 Completed</div>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">Financial Forecast (Year 1)</h3>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div style={{ padding: '0.5rem', background: '#fee2e2', borderRadius: '0.5rem', color: 'var(--error)' }}><DollarSign size={20} /></div>
                  <div>
                    <div className="font-bold">Estimated Cost</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Initial Setup & OpEx</div>
                  </div>
                </div>
                <div className="font-bold text-error" style={{ fontSize: '1.25rem' }}>$45,000</div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div style={{ padding: '0.5rem', background: '#dcfce7', borderRadius: '0.5rem', color: 'var(--success)' }}><TrendingUp size={20} /></div>
                  <div>
                    <div className="font-bold">Revenue Forecast</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Expected Sales</div>
                  </div>
                </div>
                <div className="font-bold text-success" style={{ fontSize: '1.25rem' }}>$120,000</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div style={{ padding: '0.5rem', background: '#e0e7ff', borderRadius: '0.5rem', color: 'var(--primary)' }}><Activity size={20} /></div>
                  <div>
                    <div className="font-bold">Break-even Analysis</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Estimated Timeline</div>
                  </div>
                </div>
                <div className="font-bold text-primary" style={{ fontSize: '1.25rem' }}>Month 7</div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
