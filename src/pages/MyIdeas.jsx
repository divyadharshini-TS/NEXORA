import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderOpen, PlusCircle, ArrowRight, Sparkles, CheckCircle2, 
  AlertTriangle, Target, Layers
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { apiGet } from '../utils/safeApi';

export default function MyIdeas() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await apiGet('/api/analyze/mine');
        if (data && Array.isArray(data) && data.length > 0) {
          setIdeas(data);
          return;
        }

        // Check localStorage fallback
        try {
          const user = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
          const key = user ? `nexoraIdeas_${user.email}` : 'nexoraIdeas_anonymous';
          const local = JSON.parse(localStorage.getItem(key) || '[]');
          if (local.length > 0) {
            setIdeas(local);
            return;
          }
        } catch {}

        // High-end default sample ideas
        setIdeas([
          {
            businessName: 'EcoBox Sustainable Packaging',
            category: 'ecommerce',
            aiScore: 84,
            marketDemand: 'High',
            targetLocation: 'India',
            description: 'Eco-friendly biodegradable packaging subscription for D2C brands.'
          },
          {
            businessName: 'AgroPulse Sensor AI',
            category: 'agritech',
            aiScore: 91,
            marketDemand: 'High',
            targetLocation: 'India',
            description: 'Autonomous crop health telemetry using micro-sensors and satellite vision.'
          },
          {
            businessName: 'MediRoute Cold Chain',
            category: 'healthtech',
            aiScore: 78,
            marketDemand: 'Moderate',
            targetLocation: 'Global',
            description: 'IoT-monitored refrigerated transport for insulin and biologics.'
          }
        ]);
      } catch (err) {
        console.warn('Load ideas fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openInDashboard = (idea) => {
    localStorage.setItem('latestAnalysis', JSON.stringify(idea));
    navigate('/dashboard');
  };

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>
        {/* Mobile topbar */}
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button className="sidebar-toggle-btn" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Venture Library</span>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4 max-w-5xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <FolderOpen size={24} className="text-accent" />
              <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Venture Hypothesis Library</h1>
              <span className="badge badge-primary font-mono text-xs">{ideas.length} Dossiers</span>
            </div>
            <p className="text-light text-sm">
              All generated concepts, market validation indices, and financial models.
            </p>
          </div>

          <Link 
            to="/analyze" 
            className="btn btn-accent flex items-center gap-2 hover-lift"
            style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.4rem' }}
          >
            <PlusCircle size={16} /> New Venture Test
          </Link>
        </div>

        {loading ? (
          <div className="text-light p-12 text-center text-sm">Loading venture dossiers...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {ideas.map((idea, index) => {
              const score = idea.aiScore || 80;
              const scoreColor = score >= 75 ? 'var(--success)' : score >= 50 ? 'var(--accent)' : 'var(--error)';
              return (
                <div 
                  key={index} 
                  className="card p-6 flex flex-col justify-between hover-lift" 
                  style={{ borderRadius: '22px' }}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold text-main line-clamp-1">{idea.businessName}</h3>
                        <span className="badge badge-neutral font-mono text-xs mt-1">
                          {(idea.category || 'General').toUpperCase()}
                        </span>
                      </div>
                      <span className="badge font-mono text-xs" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor, border: `1px solid ${scoreColor}30` }}>
                        {score}/100
                      </span>
                    </div>

                    <p className="text-xs text-light line-clamp-3 mb-5 leading-relaxed">
                      {idea.description || 'Predictive viability and unit economics modeled.'}
                    </p>

                    <div className="p-3 rounded-xl mb-4" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-light">Market Demand:</span>
                        <strong className="text-main">{idea.marketDemand || 'High'}</strong>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-light">Geography:</span>
                        <strong className="text-main">{idea.targetLocation || 'India'}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openInDashboard(idea)}
                    className="btn btn-outline text-xs w-full justify-center flex items-center gap-1.5"
                    style={{ padding: '0.55rem' }}
                  >
                    Open Diagnostic Dossier <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
