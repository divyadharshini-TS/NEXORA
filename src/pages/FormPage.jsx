import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FormPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Simulate AI analysis
    }
  };

  return (
    <div className="container py-16 animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-12">
        <h1 className="mb-4">Analyze Your Idea</h1>
        <p>Provide details about your business concept for AI evaluation.</p>
      </div>

      <div className="card p-8 shadow-lg">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 relative">
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '0', width: `${((step - 1) / 2) * 100}%`, height: '2px', backgroundColor: 'var(--primary)', zIndex: 0, transition: 'width 0.3s ease' }}></div>
          
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              backgroundColor: step >= num ? 'var(--primary)' : 'var(--white)',
              border: `2px solid ${step >= num ? 'var(--primary)' : 'var(--border)'}`,
              color: step >= num ? 'white' : 'var(--text-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 1,
              transition: 'all 0.3s ease'
            }}>
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Business Name</label>
                <input type="text" className="form-input" placeholder="e.g. EcoBox" required />
              </div>
              <div className="form-group">
                <label className="form-label">Business Category</label>
                <select className="form-input" required>
                  <option value="">Select a category</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="healthtech">HealthTech</option>
                  <option value="edtech">EdTech</option>
                  <option value="fintech">FinTech</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Business Description</label>
                <textarea className="form-input" rows="4" placeholder="Describe the core problem you are solving..." required></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Initial Investment Amount ($)</label>
                <input type="number" className="form-input" placeholder="e.g. 50000" required />
              </div>
              <div className="form-group">
                <label className="form-label">Target Location / Market</label>
                <input type="text" className="form-input" placeholder="e.g. North America, India, Global" required />
              </div>
              <div className="form-group">
                <label className="form-label">Target Customers (Demographics)</label>
                <input type="text" className="form-input" placeholder="e.g. Gen Z college students, Small businesses" required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Current Business Stage</label>
                <select className="form-input" required>
                  <option value="idea">Just an Idea</option>
                  <option value="prototype">Prototype / MVP</option>
                  <option value="revenue">Generating Revenue</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Primary Business Goal (Next 12 Months)</label>
                <textarea className="form-input" rows="3" placeholder="e.g. Reach 1000 users, Secure seed funding..." required></textarea>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              style={{ padding: '1rem', fontSize: '1.1rem' }}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="animate-pulse" /> Analyzing with AI...
                </>
              ) : step === 3 ? (
                <>
                  <Sparkles /> Analyze My Idea
                </>
              ) : (
                <>
                  Next Step <ArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
