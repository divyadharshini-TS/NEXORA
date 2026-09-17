import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, LineChart, Target, ShieldCheck, Scale, PiggyBank, 
  ArrowRight, Play, BarChart3, TrendingUp, Sparkles, CheckCircle2, 
  Zap, Award, Users, ChevronRight, Check
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="animate-fade-in-up" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section className="relative py-24" style={{ 
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.08), transparent 70%), var(--bg-color)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            {/* Pill Badge */}
            <div className="badge badge-primary mb-6 animate-fade-in-up" style={{ 
              padding: '0.45rem 1.25rem', 
              fontSize: '0.85rem', 
              fontWeight: '600',
              letterSpacing: '0.01em',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Sparkles size={15} className="text-secondary" style={{ marginRight: '0.5rem' }} />
              Next-Generation Startup Viability Engine
            </div>

            <h1 className="mb-6 animate-fade-in-up stagger-1" style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', 
              fontWeight: '800', 
              letterSpacing: '-0.035em',
              lineHeight: 1.12 
            }}>
              Validate Your Business Idea with <span className="text-gradient">AI Precision</span> Before Investing Capital
            </h1>

            <p className="mb-8 animate-fade-in-up stagger-2" style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-light)', 
              maxWidth: '720px', 
              lineHeight: 1.6 
            }}>
              Harness predictive machine intelligence to evaluate market feasibility, uncover competitor vulnerabilities, unlock government grants, and model accurate financial projections.
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-3 mb-10">
              <Link 
                to="/analyze" 
                className="btn btn-primary hover-lift" 
                style={{ 
                  fontSize: '1.05rem', 
                  padding: '0.9rem 2.25rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.18)'
                }}
              >
                Analyze Your Idea Free <ArrowRight size={18} />
              </Link>
              <Link 
                to="/demo" 
                className="btn btn-outline hover-lift" 
                style={{ 
                  fontSize: '1.05rem', 
                  padding: '0.9rem 2rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--white)'
                }}
              >
                <Play size={18} className="text-primary" /> Explore Demo
              </Link>
            </div>

            {/* Micro Social Proof */}
            <div className="flex items-center gap-6 text-xs font-semibold text-light animate-fade-in-up stagger-4">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> No Credit Card Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> 60-Second Instant Analysis</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> 5 Govt Schemes Integrated</span>
            </div>
          </div>

          {/* Interactive Hero Showcase Card */}
          <div className="max-w-5xl mx-auto relative animate-fade-scale">
            <div style={{
              position: 'absolute',
              inset: '-10px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.1))',
              filter: 'blur(30px)',
              zIndex: 0,
              borderRadius: 'var(--radius-xl)'
            }}></div>

            <div className="card relative p-8 shadow-xl" style={{ 
              borderRadius: '24px', 
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              zIndex: 1
            }}>
              {/* Card Header */}
              <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Zap size={22} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h4 style={{ fontSize: '1.15rem', fontWeight: '700' }}>AI Venture Diagnostic</h4>
                      <span className="badge" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.2)' }}>Sample Output</span>
                    </div>
                    <p style={{ fontSize: '0.85rem' }}>EcoLogix — Automated Sustainable Logistics Platform</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="text-right">
                    <div className="text-xs text-light font-medium">Viability Probability</div>
                    <div className="text-2xl font-bold text-primary">94.8%</div>
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
                      backgroundColor: 'var(--white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      A+
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Grid Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold">MARKET READINESS</span>
                    <BarChart3 size={16} className="text-primary" />
                  </div>
                  <div className="text-xl font-bold mb-1">High Demand</div>
                  <div className="text-xs text-success font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> +24% YoY Growth
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold">COMPETITIVE THREAT</span>
                    <Target size={16} className="text-secondary" />
                  </div>
                  <div className="text-xl font-bold mb-1">Low Saturation</div>
                  <div className="text-xs text-light font-medium">3 Direct Competitors</div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold">GOVT SCHEMES</span>
                    <Award size={16} className="text-warning" />
                  </div>
                  <div className="text-xl font-bold mb-1">₹50L Match</div>
                  <div className="text-xs text-success font-medium">Startup India Seed Eligible</div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-light font-semibold">EST. BREAKEVEN</span>
                    <PiggyBank size={16} className="text-success" />
                  </div>
                  <div className="text-xl font-bold mb-1">8.5 Months</div>
                  <div className="text-xs text-light font-medium">Initial: ₹15L Capital</div>
                </div>
              </div>

              {/* Progress and Micro insights */}
              <div className="p-4 rounded-xl flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-success" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                    Strategic Moat: Proprietary route optimization yields 32% cost saving over competitors.
                  </span>
                </div>
                <Link to="/demo" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                  View Full Report Preview <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-12" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">AI</div>
              <div className="text-sm text-light font-medium">Powered Analysis Engine</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">4</div>
              <div className="text-sm text-light font-medium">Analysis Dimensions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">5</div>
              <div className="text-sm text-light font-medium">Govt Schemes in Directory</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">Free</div>
              <div className="text-sm text-light font-medium">No Credit Card Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities / Bento Features */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-primary mb-3">Enterprise-Grade Intelligence</span>
            <h2 className="mb-4">Everything You Need Before Writing Your First Line of Code</h2>
            <p className="text-lg text-light">
              NEXORA replaces months of costly exploratory consulting with an instantaneous, data-grounded intelligence suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit size={28} className="text-primary" />,
                title: 'Predictive Viability Scoring',
                desc: 'Evaluates your product-market alignment across 40+ dynamic parameters and computes a realistic 0–100 success index.',
                tag: 'Core Engine'
              },
              {
                icon: <Target size={28} className="text-primary" />,
                title: 'Market Feasibility & TAM',
                desc: 'Instant estimation of Total Addressable Market, demographic demand indices, and customer willingness-to-pay.',
                tag: 'Demographics'
              },
              {
                icon: <LineChart size={28} className="text-primary" />,
                title: 'Competitor Intelligence',
                desc: 'Maps existing incumbents, identifies their structural weaknesses, and pinpoints your strategic wedge into the sector.',
                tag: 'Moat Analysis'
              },
              {
                icon: <Award size={28} className="text-primary" />,
                title: 'Government Schemes Matching',
                desc: 'Dynamically matches your startup domain with central and state government grants, subsidies, and seed capital funds.',
                tag: 'Non-Dilutive Capital'
              },
              {
                icon: <Scale size={28} className="text-primary" />,
                title: 'Legal & Regulatory Blueprint',
                desc: 'Automates incorporation prerequisites, licenses, compliance mandates, and sector-specific statutory roadmaps.',
                tag: 'Compliance'
              },
              {
                icon: <PiggyBank size={28} className="text-primary" />,
                title: 'Financial Projections & CAC',
                desc: 'Generates cost breakdown estimates, break-even timelines, and runway simulations tailored to your business model.',
                tag: 'Forecasting'
              }
            ].map((f, i) => (
              <div key={i} className="card hover-lift flex flex-col justify-between" style={{ padding: '2rem' }}>
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border)'
                    }}>
                      {f.icon}
                    </div>
                    <span className="text-xs font-semibold text-light px-2.5 py-1 rounded-md" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: '700' }}>{f.title}</h3>
                  <p className="text-light" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-primary mb-3">Structured Workflow</span>
            <h2 className="mb-4">From Raw Concept to Execution Roadmap in 5 Steps</h2>
            <p className="text-light text-lg">Fast, transparent, and entirely automated.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Submit Hypothesis', desc: 'Detail your business concept, target sector, and initial pricing model.' },
              { step: '02', title: 'Deep AI Parsing', desc: 'Our multi-tier models evaluate historical venture benchmarks.' },
              { step: '03', title: 'Competitor & TAM', desc: 'Synthesizes market dynamics and identifies untapped whitespace.' },
              { step: '04', title: 'Viability Scoring', desc: 'Computes multidimensional feasibility and risk ratings.' },
              { step: '05', title: 'Actionable Report', desc: 'Delivers PDF summaries, funding pathways, and financial runways.' }
            ].map((item, i) => (
              <div key={i} className="card p-6 flex flex-col items-start hover-lift" style={{ borderRadius: 'var(--radius-lg)' }}>
                <span className="font-extrabold text-2xl text-secondary mb-3">{item.step}</span>
                <h4 className="mb-2 font-bold" style={{ fontSize: '1.1rem' }}>{item.title}</h4>
                <p className="text-light text-xs" style={{ lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Traditional vs NEXORA */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="badge badge-primary mb-3">The Modern Advantage</span>
              <h2>Why Founders Rely on NEXORA</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="card p-8" style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--bg-color)' }}>
                <h3 className="text-xl font-bold mb-4 text-light">Traditional Feasibility Study</h3>
                <ul className="flex flex-col gap-3 text-sm text-light">
                  <li className="flex items-center gap-2">❌ 4 to 8 weeks of manual research</li>
                  <li className="flex items-center gap-2">❌ ₹1,50,000+ consultant fees</li>
                  <li className="flex items-center gap-2">❌ Outdated static PDFs</li>
                  <li className="flex items-center gap-2">❌ Misses real-time government scheme criteria</li>
                  <li className="flex items-center gap-2">❌ Subjective consultant bias</li>
                </ul>
              </div>

              {/* NEXORA */}
              <div className="card p-8 shadow-lg" style={{ 
                border: '1.5px solid var(--primary)', 
                backgroundColor: 'var(--white)',
                position: 'relative'
              }}>
                <div className="badge badge-success mb-3">Recommended</div>
                <h3 className="text-xl font-bold mb-4 text-primary">NEXORA AI Intelligence</h3>
                <ul className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-main)', fontWeight: '500' }}>
                  <li className="flex items-center gap-2.5"><Check size={18} className="text-success" /> AI-powered analysis in minutes</li>
                  <li className="flex items-center gap-2.5"><Check size={18} className="text-success" /> Free to use — no credit card needed</li>
                  <li className="flex items-center gap-2.5"><Check size={18} className="text-success" /> Dynamic dashboard to track your ideas</li>
                  <li className="flex items-center gap-2.5"><Check size={18} className="text-success" /> Curated government grant scheme directory</li>
                  <li className="flex items-center gap-2.5"><Check size={18} className="text-success" /> Objective AI-grounded feasibility scoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container">
          <div className="card p-12 text-center relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, var(--dark-navy) 0%, #1e1b4b 100%)',
            color: 'var(--white)',
            borderRadius: '28px'
          }}>
            <div className="relative" style={{ zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
              <h2 style={{ color: 'var(--white)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Test Your Venture Hypothesis Today
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.15rem', marginBottom: '2rem' }}>
                Join thousands of entrepreneurs who avoid costly missteps and build backed by empirical intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/analyze" 
                  className="btn hover-lift" 
                  style={{ 
                    backgroundColor: 'var(--white)', 
                    color: '#0f172a', 
                    padding: '0.9rem 2.25rem',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  Start Free Analysis <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/schemes" 
                  className="btn btn-outline hover-lift" 
                  style={{ 
                    color: 'var(--white)', 
                    borderColor: 'rgba(255, 255, 255, 0.25)', 
                    padding: '0.9rem 2rem',
                    fontSize: '1.05rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  Browse Govt Schemes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
