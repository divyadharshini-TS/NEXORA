import React, { useEffect } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  useEffect(() => {
    const url = import.meta.env.VITE_PRICING_URL;
    if (url) {
      window.location.replace(url);
    }
  }, []);

  return (
    <div className="container py-16 animate-fade-in-up" style={{ maxWidth: '1100px' }}>
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <span className="badge badge-primary mb-3 font-mono">TRANSPARENT CAPITAL MODELS</span>
        <h1 className="mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
          Simple, Predictable Venture Intelligence
        </h1>
        <p className="text-light text-base">
          Validate your concepts with our free tier, or upgrade for comprehensive financial modeling and institutional memo generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift" style={{ borderRadius: '24px' }}>
          <div>
            <div className="badge badge-neutral mb-4 font-mono">COMMUNITY</div>
            <h3 className="text-xl font-bold mb-1">Starter</h3>
            <p className="text-light text-xs mb-5">For aspiring founders exploring initial venture concepts.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl font-mono text-main">₹0</span>
              <span className="text-light text-xs">/ forever</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-light mb-8">
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> 3 AI venture evaluations / month</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Basic competitor analysis</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Full Government scheme directory</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Standard PDF memo export</li>
            </ul>
          </div>

          <Link to="/signup" className="btn btn-outline w-full justify-center" style={{ borderRadius: 'var(--radius-full)' }}>
            Get Started Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift relative" style={{ 
          borderRadius: '24px',
          border: '2px solid var(--accent)',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.18)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--brand-gradient)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.04em',
            padding: '2px 14px',
            borderRadius: '999px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.45)'
          }}>
            RECOMMENDED
          </div>

          <div>
            <div className="badge badge-primary mb-4 font-mono">FOUNDER PRO</div>
            <h3 className="text-xl font-bold mb-1">Founder Studio</h3>
            <p className="text-light text-xs mb-5">For serial entrepreneurs and venture studios launching products.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl font-mono text-accent">₹1,999</span>
              <span className="text-light text-xs">/ month</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-light mb-8">
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Unlimited AI venture diagnostic runs</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Dynamic financial break-even simulator</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Priority grant application tracking</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Custom Gemini API integration</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> White-label investor memo generation</li>
            </ul>
          </div>

          <Link to="/signup" className="btn btn-accent w-full justify-center hover-lift" style={{ borderRadius: 'var(--radius-full)' }}>
            Upgrade to Studio &rarr;
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="card p-8 flex flex-col justify-between hover-lift" style={{ borderRadius: '24px' }}>
          <div>
            <div className="badge badge-neutral mb-4 font-mono">INSTITUTIONAL</div>
            <h3 className="text-xl font-bold mb-1">Incubator / VC</h3>
            <p className="text-light text-xs mb-5">For accelerator cohorts and angel syndicates.</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-extrabold text-4xl font-mono text-main">Custom</span>
              <span className="text-light text-xs">/ annual</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-light mb-8">
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Batch applicant screening engine</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Dedicated grant compliance advisory</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Multi-seat founder workspace</li>
              <li className="flex items-center gap-2 text-main font-medium"><Check size={16} className="text-success flex-shrink-0" /> Dedicated SLA & webhook integrations</li>
            </ul>
          </div>

          <Link to="/signup" className="btn btn-outline w-full justify-center" style={{ borderRadius: 'var(--radius-full)' }}>
            Contact Institutional Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
