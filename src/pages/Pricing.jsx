import React, { useEffect } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  useEffect(() => {
    // If Vite env provides an official pricing URL, redirect there.
    const url = import.meta.env.VITE_PRICING_URL;
    if (url) {
      window.location.replace(url);
    }
  }, []);

  return (
    <div className="container py-16 animate-fade-in-up" style={{ maxWidth: '1100px' }}>
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <span className="badge badge-primary mb-3">Transparent Plans</span>
        <h1 className="mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.025em' }}>
          Simple, Predictable Venture Intelligence
        </h1>
        <p className="text-light text-lg">
          Validate your concepts with our free tier, or upgrade for comprehensive financial modeling and grant tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift" style={{ borderRadius: '24px' }}>
          <div>
            <div className="badge badge-primary mb-4">Community</div>
            <h3 className="text-xl font-bold mb-1">Starter</h3>
            <p className="text-light text-xs mb-5">For aspiring founders exploring initial concepts.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl text-primary">₹0</span>
              <span className="text-light text-xs">/ forever</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-light mb-8">
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> 3 AI venture evaluations / month</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Basic competitor analysis</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Full Government scheme directory</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Standard PDF export</li>
            </ul>
          </div>

          <Link to="/signup" className="btn btn-outline w-full justify-center" style={{ borderRadius: 'var(--radius-full)' }}>
            Get Started Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift shadow-xl relative" style={{ 
          borderRadius: '24px',
          border: '2px solid var(--primary)',
          backgroundColor: 'var(--white)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary)',
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '0.25rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Most Popular
          </div>

          <div>
            <div className="badge badge-success mb-4">Professional</div>
            <h3 className="text-xl font-bold mb-1">Founder Pro</h3>
            <p className="text-light text-xs mb-5">For active entrepreneurs raising capital and launching.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl text-primary">₹1,999</span>
              <span className="text-light text-xs">/ month</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-main font-medium mb-8">
              <li className="flex items-center gap-2"><Check size={16} className="text-success" /> Unlimited AI concept evaluations</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-success" /> In-depth competitor strengths & moats</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-success" /> Custom Gemini API integration</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-success" /> Detailed financial projection models</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-success" /> Priority government grant alerts</li>
            </ul>
          </div>

          <Link to="/signup" className="btn btn-primary w-full justify-center hover-lift" style={{ borderRadius: 'var(--radius-full)' }}>
            Upgrade to Pro <ArrowRight size={16} />
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift" style={{ borderRadius: '24px' }}>
          <div>
            <div className="badge badge-primary mb-4">Institutions</div>
            <h3 className="text-xl font-bold mb-1">Incubator</h3>
            <p className="text-light text-xs mb-5">For venture studios, incubators, and college E-cells.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl text-primary">Custom</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-light mb-8">
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Multi-seat cohort analytics</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Custom rubric benchmarking</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> API and webhook integration</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success" /> Dedicated account manager</li>
            </ul>
          </div>

          <a href="mailto:support@nexora.ai" className="btn btn-outline w-full justify-center" style={{ borderRadius: 'var(--radius-full)' }}>
            Contact Institutional Sales
          </a>
        </div>
      </div>
    </div>
  );
}
