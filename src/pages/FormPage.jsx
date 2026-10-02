import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, 
  ShieldAlert, Zap, Compass, DollarSign, Target, Loader2, Info
} from 'lucide-react';

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

      // Navigate straight to executive dossier
      navigate('/dashboard');
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage('Failed to complete AI analysis. Please verify your connection or inputs.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Concept', subtitle: 'Name & value proposition' },
    { num: 2, title: 'Economics', subtitle: 'Capital & audience' },
    { num: 3, title: 'Execution', subtitle: 'Maturity & milestones' }
  ];

  return (
    <div className="container py-14 animate-fade-in-up" style={{ maxWidth: '840px' }}>
      {/* Wizard Header */}
      <div className="text-center mb-10">
        <div className="badge badge-primary mb-3 font-mono">
          <Sparkles size={13} className="text-accent" /> AI DIAGNOSTIC ENGINE
        </div>
        <h1 className="mb-2" style={{ fontSize: '2.4rem', letterSpacing: '-0.03em' }}>
          Evaluate Your Venture Hypothesis
        </h1>
        <p className="text-light text-base max-w-lg mx-auto">
          Input your business model parameters. Our multi-tiered decision engine evaluates TAM, competitive moats, and grant feasibility.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="card p-4 mb-8" style={{ borderRadius: '18px' }}>
        <div className="grid grid-cols-3 gap-2">
          {stepsMeta.map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div 
                key={s.num} 
                className="flex items-center gap-3 p-2 rounded-xl transition-all"
                style={{
                  backgroundColor: isCurrent ? 'var(--bg-subtle)' : 'transparent',
                  border: isCurrent ? '1px solid var(--border)' : '1px solid transparent'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  backgroundColor: isDone ? 'var(--success)' : isCurrent ? 'var(--accent)' : 'var(--bg-subtle)',
                  color: isDone || isCurrent ? '#fff' : 'var(--text-muted)',
                  flexShrink: 0
                }}>
                  {isDone ? <CheckCircle size={16} /> : s.num}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold leading-tight" style={{ color: isCurrent ? 'var(--text-main)' : 'var(--text-light)' }}>
                    {s.title}
                  </div>
                  <div className="text-xs text-muted" style={{ fontSize: '0.72rem' }}>
                    {s.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error)' }}>
          <AlertTriangle size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="card p-8 shadow-md" style={{ borderRadius: '24px' }}>
        <form onSubmit={handleSubmit}>
          
          {/* Step 1: Concept */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-bold mb-1">Venture Concept & Sector</h3>
              <p className="text-xs text-light mb-6">Describe the foundational problem and value proposition.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="businessName">
                  <span>Business or Project Name</span>
                  <span className="text-xs text-light font-normal">Required</span>
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. EcoBox Logistics, AgroPulse AI"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  <span>Industry / Sector</span>
                  <span className="text-xs text-light font-normal">Required</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select Primary Domain...</option>
                  <option value="ecommerce">E-Commerce & D2C</option>
                  <option value="agritech">Agritech & Food Processing</option>
                  <option value="fintech">Fintech & Payments</option>
                  <option value="healthtech">Healthtech & Diagnostics</option>
                  <option value="edtech">EdTech & Upskilling</option>
                  <option value="cleantech">CleanTech & Renewable Energy</option>
                  <option value="saas">B2B SaaS / Enterprise Software</option>
                  <option value="logistics">Supply Chain & Mobility</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  <span>Elevator Pitch & Core Value Proposition</span>
                  <span className="text-xs text-light font-normal">2-3 sentences</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What fundamental pain point are you solving, what is your unfair advantage or proprietary methodology, and why now?"
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Economics */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-bold mb-1">Market Geography & Target Economics</h3>
              <p className="text-xs text-light mb-6">Clarify addressable geography, user persona, and budget allocations.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="investmentAmount">
                    <span>Estimated Budget / Capital ($ or ₹)</span>
                  </label>
                  <input
                    id="investmentAmount"
                    name="investmentAmount"
                    type="text"
                    required
                    value={formData.investmentAmount}
                    onChange={handleChange}
                    placeholder="e.g. $25,000 or ₹20 Lakh"
                    className="form-input font-mono"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="targetLocation">
                    <span>Primary Target Region</span>
                  </label>
                  <input
                    id="targetLocation"
                    name="targetLocation"
                    type="text"
                    required
                    value={formData.targetLocation}
                    onChange={handleChange}
                    placeholder="e.g. India (Tier 1 & 2), Southeast Asia"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="targetCustomers">
                  <span>Ideal Customer Profile (ICP)</span>
                </label>
                <input
                  id="targetCustomers"
                  name="targetCustomers"
                  type="text"
                  required
                  value={formData.targetCustomers}
                  onChange={handleChange}
                  placeholder="e.g. D2C sustainable brands with >$50k monthly GMV"
                  className="form-input"
                />
              </div>
            </div>
          )}

          {/* Step 3: Execution */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-bold mb-1">Maturity & 12-Month Horizon</h3>
              <p className="text-xs text-light mb-6">Define current readiness and key targets for precision scoring.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="businessStage">
                  <span>Current Venture Stage</span>
                </label>
                <select
                  id="businessStage"
                  name="businessStage"
                  value={formData.businessStage}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="idea">Hypothesis / Concept Stage</option>
                  <option value="prototype">Working Prototype / Alpha Built</option>
                  <option value="early-revenue">Beta Testing / First 10 Customers</option>
                  <option value="scaling">Commercial Traction / Scaling</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="goal12Months">
                  <span>Primary 12-Month Target Milestone</span>
                </label>
                <input
                  id="goal12Months"
                  name="goal12Months"
                  type="text"
                  value={formData.goal12Months}
                  onChange={handleChange}
                  placeholder="e.g. ₹1 Crore ARR, 50 B2B enterprise pilots, ISO certification"
                  className="form-input"
                />
              </div>

              <div className="p-4 rounded-xl flex items-center gap-3 mt-4" style={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.06)', 
                border: '1px solid rgba(99, 102, 241, 0.15)' 
              }}>
                <Sparkles size={18} className="text-accent flex-shrink-0" />
                <span className="text-xs text-secondary leading-relaxed">
                  Upon submission, the multi-agent diagnostic models your hypothesis against 1,200+ industry benchmarks, active govt grants, and competitive vectors.
                </span>
              </div>
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-outline flex items-center gap-2"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn btn-accent flex items-center gap-2 hover-lift"
              style={{ padding: '0.75rem 2rem', opacity: isAnalyzing ? 0.7 : 1 }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Synthesizing Venture Dossier...
                </>
              ) : step === 3 ? (
                <>
                  Generate Intelligence Dossier <Sparkles size={16} />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
