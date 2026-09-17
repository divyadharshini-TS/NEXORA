import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, ShieldAlert, Zap, Compass, DollarSign, Target } from 'lucide-react';

const initialFormData = {
  businessName: '',
  category: '',
  description: '',
  investmentAmount: '',
  targetLocation: '',
  targetCustomers: '',
  businessStage: 'idea',
  goal12Months: '',
};

export default function FormPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [analyzedIdea, setAnalyzedIdea] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('nexoraToken');
      const userApiKey = localStorage.getItem('userGeminiApiKey');

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          apiKey: userApiKey || undefined
        })
      });

      if (!res.ok) {
        throw new Error('Analysis request failed.');
      }

      const result = await res.json();
      setAnalyzedIdea(result);

      // Store as latest analysis for the Dashboard
      localStorage.setItem('latestAnalysis', JSON.stringify(result));

      // Also persist to history list
      const user = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
      const key = user ? `nexoraIdeas_${user.email}` : 'nexoraIdeas_anonymous';
      try {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.unshift(result);
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (err) {
        console.warn('History save failed:', err);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage('Failed to complete AI analysis. Please verify your connection or inputs.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Concept', subtitle: 'Name & value prop' },
    { num: 2, title: 'Economics', subtitle: 'Capital & audience' },
    { num: 3, title: 'Execution', subtitle: 'Stage & milestones' }
  ];

  return (
    <div className="container py-16 animate-fade-in-up" style={{ maxWidth: '820px' }}>
      <div className="text-center mb-10">
        <span className="badge badge-primary mb-3">AI Diagnostic Wizard</span>
        <h1 className="mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
          Evaluate Your Venture Hypothesis
        </h1>
        <p className="text-light text-lg max-w-xl mx-auto">
          Input your business model parameters. Our multi-tiered decision engine analyzes market fit, competitors, and funding feasibility.
        </p>
      </div>

      <div className="card p-8 md:p-10 shadow-lg" style={{ borderRadius: '24px' }}>
        {/* Step Progression Bar */}
        <div className="grid grid-cols-3 gap-2 mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
          {stepsMeta.map((s) => (
            <div 
              key={s.num} 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => { if (s.num < step) setStep(s.num); }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: step >= s.num ? 'var(--primary)' : 'var(--bg-secondary)',
                color: step >= s.num ? 'var(--white)' : 'var(--text-light)',
                border: `1.5px solid ${step >= s.num ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                {s.num}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold" style={{ color: step >= s.num ? 'var(--text-main)' : 'var(--text-light)' }}>
                  {s.title}
                </div>
                <div className="text-xs text-light font-normal">{s.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 text-error flex items-center gap-2 border border-red-200">
            <AlertTriangle size={18} /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {step === 1 && (
            <div className="animate-fade-in flex flex-col gap-4">
              <div>
                <label className="form-label" htmlFor="bName">Venture / Business Name *</label>
                <input
                  id="bName"
                  type="text"
                  name="businessName"
                  className="form-input"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. CleanPulse Technologies"
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="bCat">Primary Industry Sector *</label>
                <select
                  id="bCat"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select industry category</option>
                  <option value="saas">SaaS & Cloud Software</option>
                  <option value="ecommerce">D2C & E-Commerce</option>
                  <option value="healthtech">HealthTech & BioTech</option>
                  <option value="edtech">EdTech & Upskilling</option>
                  <option value="fintech">FinTech & Payments</option>
                  <option value="cleantech">CleanTech & Sustainability</option>
                  <option value="other">Other / Multi-Sector</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="bDesc">Core Value Proposition & Description *</label>
                <textarea
                  id="bDesc"
                  name="description"
                  className="form-input"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Articulate what problem you solve, how your product delivers customer value, and why alternatives fall short."
                  required
                ></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in flex flex-col gap-4">
              <div>
                <label className="form-label" htmlFor="bInv">Initial Investment Budget (INR ₹ or USD $) *</label>
                <input
                  id="bInv"
                  type="text"
                  name="investmentAmount"
                  className="form-input"
                  value={formData.investmentAmount}
                  onChange={handleChange}
                  placeholder="e.g. ₹15,00,000 or $30,000"
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="bLoc">Target Geographic Market *</label>
                <input
                  id="bLoc"
                  type="text"
                  name="targetLocation"
                  className="form-input"
                  value={formData.targetLocation}
                  onChange={handleChange}
                  placeholder="e.g. Tier-1 Indian Metros, Pan-India, Global"
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="bCust">Ideal Customer Profile (ICP) *</label>
                <input
                  id="bCust"
                  type="text"
                  name="targetCustomers"
                  className="form-input"
                  value={formData.targetCustomers}
                  onChange={handleChange}
                  placeholder="e.g. Mid-sized logistics operators, D2C fashion founders"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in flex flex-col gap-4">
              <div>
                <label className="form-label" htmlFor="bStage">Venture Maturity Stage *</label>
                <select
                  id="bStage"
                  name="businessStage"
                  className="form-input"
                  value={formData.businessStage}
                  onChange={handleChange}
                  required
                >
                  <option value="idea">Conceptual / Hypothesis Stage</option>
                  <option value="prototype">Functional Prototype / Working MVP</option>
                  <option value="revenue">Generating Early Revenue & Traction</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="bGoal">Primary 12-Month Objective *</label>
                <textarea
                  id="bGoal"
                  name="goal12Months"
                  className="form-input"
                  rows="3"
                  value={formData.goal12Months}
                  onChange={handleChange}
                  placeholder="e.g. Validate product-market fit with 50 paying pilot clients and qualify for Startup India seed grants."
                  required
                ></textarea>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-6 pt-6 border-t flex justify-between items-center" style={{ borderColor: 'var(--border)' }}>
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="btn btn-outline flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.4rem' }}
              >
                <ArrowLeft size={16} /> Previous
              </button>
            ) : <div></div>}

            <button 
              type="submit" 
              className="btn btn-primary flex items-center gap-2 hover-lift"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2rem', fontWeight: '600' }}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles size={18} className="animate-pulse" /> Synthesizing AI Analysis...
                </>
              ) : step === 3 ? (
                <>
                  <Sparkles size={18} /> Run Venture Analysis
                </>
              ) : (
                <>
                  Next Step <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Completion Result Card */}
        {analyzedIdea && (
          <div className="mt-8 pt-8 border-t animate-fade-in-up" style={{ borderColor: 'var(--border)' }}>
            <div className="p-6 rounded-2xl" style={{ 
              border: `1.5px solid ${analyzedIdea.isViable !== false ? 'var(--success)' : 'var(--error)'}`,
              backgroundColor: analyzedIdea.isViable !== false ? 'rgba(16, 185, 129, 0.04)' : 'rgba(239, 68, 68, 0.04)'
            }}>
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {analyzedIdea.isViable !== false ? (
                    <CheckCircle size={28} className="text-success" />
                  ) : (
                    <ShieldAlert size={28} className="text-error" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">
                      {analyzedIdea.isViable !== false ? 'Viable Opportunity Detected' : 'Caution: High Execution Risk'}
                    </h3>
                    <p className="text-xs text-light">
                      {analyzedIdea.businessName} • {analyzedIdea.category?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-light uppercase">Viability Index</div>
                  <div className="text-3xl font-extrabold text-primary">{analyzedIdea.aiScore}/100</div>
                </div>
              </div>

              <p className="text-sm mb-6" style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
                {analyzedIdea.viabilityReason || 'Idea successfully parsed with market feasibility benchmarks and financial forecasts.'}
              </p>

              {analyzedIdea.breakdown && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white border text-center" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-xs text-light font-medium">Market Fit</div>
                    <div className="text-lg font-bold text-primary">{analyzedIdea.breakdown.marketFit}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border text-center" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-xs text-light font-medium">Customer Match</div>
                    <div className="text-lg font-bold text-primary">{analyzedIdea.breakdown.customerMatch}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border text-center" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-xs text-light font-medium">Financials</div>
                    <div className="text-lg font-bold text-primary">{analyzedIdea.breakdown.financials}%</div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button 
                  className="btn btn-primary flex items-center gap-2 hover-lift"
                  onClick={() => navigate('/dashboard')}
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.6rem' }}
                >
                  Explore Full Report in Dashboard <ArrowRight size={16} />
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => { setAnalyzedIdea(null); setFormData(initialFormData); setStep(1); }}
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.4rem' }}
                >
                  Analyze Another Concept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
