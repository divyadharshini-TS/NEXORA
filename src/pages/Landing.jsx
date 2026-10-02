import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, LineChart, Target, ShieldCheck, Scale, PiggyBank, 
  ArrowRight, Play, BarChart3, TrendingUp, Sparkles, CheckCircle2, 
  Zap, Award, Users, ChevronRight, Check, Shield, Layers, Compass
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="animate-fade-in-up" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section className="relative py-20" style={{ 
        background: 'radial-gradient(ellipse 70% 45% at 50% -10%, rgba(99, 102, 241, 0.12), transparent 70%), var(--bg-color)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            {/* Pill Badge */}
            <div className="badge badge-primary mb-6 animate-fade-in-up" style={{ 
              padding: '0.45rem 1.15rem', 
              fontSize: '0.82rem', 
              fontWeight: '600',
              backgroundColor: 'var(--bg-secondary)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <Sparkles size={14} className="text-accent" style={{ marginRight: '0.4rem' }} />
              Next-Generation Venture Viability Engine
            </div>

            <h1 className="mb-6 animate-fade-in-up stagger-1" style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', 
              fontWeight: '800', 
              letterSpacing: '-0.035em',
              lineHeight: 1.12 
            }}>
              Validate Your Business Hypothesis with <span className="text-gradient">AI Precision</span> Before Investing Capital
            </h1>

            <p className="mb-8 animate-fade-in-up stagger-2" style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-light)', 
              maxWidth: '700px', 
              lineHeight: 1.65 
            }}>
              Harness predictive machine intelligence to evaluate market feasibility, uncover competitor vulnerabilities, unlock non-dilutive government grants, and model accurate financial projections in 60 seconds.
            </p>

            <div className="hero-cta-group flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-3 mb-10">
              <Link 
                to="/analyze" 
                className="btn btn-accent hover-lift" 
                style={{ 
                  fontSize: '1rem', 
                  padding: '0.85rem 2.25rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                Analyze Your Idea Free <ArrowRight size={18} />
              </Link>
              <Link 
                to="/demo" 
                className="btn btn-outline hover-lift" 
                style={{ 
                  fontSize: '1rem', 
                  padding: '0.85rem 2rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Play size={17} className="text-accent" /> Explore Interactive Demo
              </Link>
            </div>


            {/* Micro Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-light animate-fade-in-up stagger-4">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> Zero Credit Card Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> 60-Second Instant Analysis</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> Indian Govt Grants Integrated</span>
            </div>
          </div>

          {/* Interactive Hero Showcase Card */}
          <div className="max-w-5xl mx-auto relative animate-fade-scale">
            <div style={{
              position: 'absolute',
              inset: '-15px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(6, 182, 212, 0.18))',
              filter: 'blur(35px)',
              zIndex: 0,
              borderRadius: 'var(--radius-2xl)'
            }}></div>

            <div className="card-glass relative p-8 shadow-xl" style={{ 
              borderRadius: '24px', 
              zIndex: 1
            }}>
              {/* Card Header */}
              <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                  }}>
                    <Zap size={22} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>AI Venture Diagnostic</h4>
                      <span className="badge badge-primary font-mono text-xs">BENCHMARK DOSSIER</span>
                    </div>
                    <p style={{ fontSize: '0.85rem' }}>EcoLogix — Automated Sustainable Cold-Chain Logistics</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="text-right">
                    <div className="text-xs text-light font-medium uppercase tracking-wider">Viability Probability</div>
                    <div className="text-2xl font-extrabold text-success">94.8%</div>
                  </div>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'conic-gradient(var(--success) 0% 95%, var(--border) 95% 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      color: 'var(--text-main)'
                    }}>
                      A+
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Grid Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="stat-widget">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold uppercase tracking-wider">Market Readiness</span>
                    <BarChart3 size={16} className="text-accent" />
                  </div>
                  <div className="text-xl font-bold mb-1">High Demand</div>
                  <div className="text-xs text-success font-medium flex items-center gap-1 font-mono">
                    <TrendingUp size={12} /> +28% YoY CAGR
                  </div>
                </div>

                <div className="stat-widget">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold uppercase tracking-wider">Competitive Threat</span>
                    <Target size={16} className="text-warning" />
                  </div>
                  <div className="text-xl font-bold mb-1">Low Saturation</div>
                  <div className="text-xs text-light font-medium">2 Direct Players</div>
                </div>

                <div className="stat-widget">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold uppercase tracking-wider">Govt Schemes Match</span>
                    <Award size={16} className="text-accent" />
                  </div>
                  <div className="text-xl font-bold mb-1">₹50L Seed Fund</div>
                  <div className="text-xs text-success font-medium">SISFS + TANSEED Ready</div>
                </div>

                <div className="stat-widget">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold uppercase tracking-wider">Breakeven Horizon</span>
                    <PiggyBank size={16} className="text-success" />
                  </div>
                  <div className="text-xl font-bold mb-1">Month 7</div>
                  <div className="text-xs text-light font-medium">2.6x Year 1 ROI</div>
                </div>
              </div>

              {/* Strategic Moat Banner */}
              <div className="p-4 rounded-xl flex flex-wrap items-center justify-between gap-4" style={{ 
                backgroundColor: 'var(--success-bg)', 
                border: '1px solid var(--success-border)' 
              }}>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-success flex-shrink-0" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                    Competitive Moat: Biodegradable insulation algorithm yields 35% margin advantage.
                  </span>
                </div>
                <Link to="/demo" className="text-sm font-semibold text-accent flex items-center gap-1 hover:underline">
                  Examine Dossier <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Benchmark Stats Ribbon */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1 font-mono">10,000+</div>
              <div className="text-xs text-light font-semibold uppercase tracking-wider">Business Models Evaluated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-main mb-1 font-mono">4-Tier</div>
              <div className="text-xs text-light font-semibold uppercase tracking-wider">Multi-Agent Diagnostic</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-success mb-1 font-mono">₹100 Cr+</div>
              <div className="text-xs text-light font-semibold uppercase tracking-wider">Govt Schemes Catalogued</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-main mb-1 font-mono">60s</div>
              <div className="text-xs text-light font-semibold uppercase tracking-wider">Turnaround Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities / Bento Grid */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-primary mb-3">Modular Intelligence Stack</span>
            <h2 className="mb-4">Everything You Need Before Writing Your First Line of Code</h2>
            <p className="text-base text-light">
              NEXORA replaces months of expensive advisory with an instantaneous, data-grounded intelligence suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <BrainCircuit size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Predictive Viability Scoring</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                Generates a granular 0–100 viability rating based on unit economics, addressable market saturation, and regulatory hurdles.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                <span>Algorithmic Weighting</span> &bull; <span>Confidence Metrics</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Target size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Competitor Blindspot Mapping</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                Identifies both domestic and global competitors, pinpointing exact structural weaknesses and underserved consumer segments.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <span>Moat Synthesis</span> &bull; <span>Positioning Vectors</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Non-Dilutive Grant Matching</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                Directly cross-references your sector and stage against Startup India Seed Fund, MSME Mudra, BIRAC, and state grants.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-warning">
                <span>Zero Equity Dilution</span> &bull; <span>Instant Eligibility</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                color: 'var(--info)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <LineChart size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Dynamic Financial Forecasts</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                Interactive cost modeling, breakeven month projections, burn calculations, and estimated first-year revenue multiples.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-info">
                <span>Cash Runway</span> &bull; <span>CAPEX / OPEX Splits</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Scale size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Automated Legal Roadmap</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                Step-by-step regulatory compliance checklist: GST, Udyam MSME, Pvt Ltd registration, DPIIT recognition, and IP protections.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#8b5cf6' }}>
                <span>Jurisdictional Filings</span> &bull; <span>Track Progress</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card p-7 hover-lift">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                color: '#ec4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Investor-Ready Export</h3>
              <p className="text-sm text-light leading-relaxed mb-4">
                One-click PDF generation to deliver professional, diligence-ready memos for co-founders, angel syndicates, or bank managers.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#ec4899' }}>
                <span>Dossier Generation</span> &bull; <span>Shareable Links</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden" style={{
        backgroundColor: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="container">
          <div className="card-glass p-12 text-center max-w-4xl mx-auto relative" style={{
            borderRadius: '28px',
            border: '1px solid rgba(99, 102, 241, 0.25)'
          }}>
            <div className="badge badge-primary mb-4">Launch With Certainty</div>
            <h2 className="mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
              Stop Guessing. Validate Your Startup in 60 Seconds.
            </h2>
            <p className="text-base text-light max-w-xl mx-auto mb-8">
              Join thousands of founders and operators who use NEXORA to de-risk investments and secure non-dilutive government capital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/analyze" className="btn btn-accent hover-lift" style={{ padding: '0.85rem 2.4rem', fontSize: '1rem' }}>
                Start Free Analysis <ArrowRight size={18} />
              </Link>
              <Link to="/schemes" className="btn btn-outline hover-lift" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                Browse 5+ Govt Schemes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
