import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, LineChart, Target, ShieldCheck, Scale, PiggyBank, ArrowRight, Play, FileText, BarChart3, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-blue py-24">
        <div className="container grid grid-cols-2 gap-8 items-center" style={{ minHeight: '60vh' }}>
          <div>
            <h1 className="mb-4">Validate Your Business Idea with <span className="text-gradient">AI</span> Before You Invest</h1>
            <p className="mb-8" style={{ fontSize: '1.25rem' }}>
              Get AI-powered feasibility analysis, competitor insights, government scheme recommendations, legal guidance, and financial forecasting.
            </p>
            <div className="flex gap-4">
              <Link to="/signup" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/demo" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem', backgroundColor: 'transparent' }}>
                <Play size={20} /> Try Demo
              </Link>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className="glass-card p-6 w-full" style={{ maxWidth: '500px', transform: 'rotate(2deg)' }}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 style={{ color: 'var(--text-main)' }}>AI Analysis</h4>
                  <p style={{ fontSize: '0.875rem' }}>Processing idea viability...</p>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  94%
                </div>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ width: '94%', height: '100%', backgroundColor: 'var(--success)' }}></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 text-center shadow-sm">
                  <BarChart3 className="text-primary mx-auto mb-2" size={24} />
                  <div className="font-bold">High Demand</div>
                </div>
                <div className="card p-4 text-center shadow-sm">
                  <TrendingUp className="text-success mx-auto mb-2" size={24} />
                  <div className="font-bold">Low Risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2>Everything you need to launch</h2>
            <p className="mt-4" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
              Our AI analyzes every aspect of your business idea to ensure you're ready for the market.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: <BrainCircuit size={32} className="text-primary" />, title: 'AI Idea Analysis', desc: 'Deep learning models evaluate your idea against millions of successful startups.' },
              { icon: <Target size={32} className="text-primary" />, title: 'Market Feasibility', desc: 'Real-time data on market size, trends, and target demographic readiness.' },
              { icon: <LineChart size={32} className="text-primary" />, title: 'Competitor Analysis', desc: 'Identify key players, their strengths, weaknesses, and your unique advantage.' },
              { icon: <ShieldCheck size={32} className="text-primary" />, title: 'AI Viability Score', desc: 'Get a concrete 0-100 score predicting the likelihood of your startup success.' },
              { icon: <Scale size={32} className="text-primary" />, title: 'Legal Compliance', desc: 'Automated checklist for registrations, licenses, and legal requirements.' },
              { icon: <PiggyBank size={32} className="text-primary" />, title: 'Financial Planning', desc: 'AI-generated cost estimates, revenue forecasts, and break-even analysis.' }
            ].map((feature, i) => (
              <div key={i} className="card">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2" style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-blue py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2>How It Works</h2>
            <p className="mt-4">From raw idea to actionable business plan in minutes.</p>
          </div>

          <div className="flex justify-between items-center relative" style={{ overflowX: 'auto', paddingBottom: '2rem' }}>
            <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: '2px', backgroundColor: 'var(--primary)', zIndex: 0, opacity: 0.2 }}></div>
            
            {[
              { step: '1', title: 'Business Idea' },
              { step: '2', title: 'AI Analysis' },
              { step: '3', title: 'Market Research' },
              { step: '4', title: 'Business Score' },
              { step: '5', title: 'Generate Report' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center" style={{ zIndex: 1, minWidth: '150px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem', boxShadow: 'var(--shadow-md)' }}>
                  {item.step}
                </div>
                <div className="font-bold text-center">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
