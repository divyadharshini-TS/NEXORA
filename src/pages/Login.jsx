import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LineChart, Mail, Lock, CheckSquare, Square, AlertCircle, 
  Shield, BrainCircuit, Save, Download, Eye, EyeOff, Sparkles, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fillDemo = () => {
    setFormData(prev => ({ ...prev, email: 'demo@nexora.ai', password: 'demo1234' }));
    setErrors({});
  };

  const continueAsGuest = () => {
    localStorage.setItem('nexoraToken', 'guest-token');
    localStorage.setItem('nexoraUser', JSON.stringify({ id: 'guest', name: 'Guest', email: 'guest@nexora.ai', isAdmin: false }));
    navigate(redirectTo);
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailVal = String(formData.email || '').trim();
    const passwordVal = String(formData.password || '');

    if (!emailVal || !emailRegex.test(emailVal)) {
      newErrors.email = 'Invalid email format';
    }

    if (!passwordVal) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(formData.email || '').trim().toLowerCase(),
          password: String(formData.password || ''),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('nexoraToken', data.token);
      localStorage.setItem('nexoraUser', JSON.stringify(data.user));
      setLoginStatus('Login successful! Redirecting...');

      setTimeout(() => navigate(redirectTo), 800);
    } catch (error) {
      setErrors({ form: error.message || 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="flex flex-grow items-center justify-center py-12 px-4">
        <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Showcase Banner */}
          <div className="hidden md:flex flex-col justify-between p-10 h-full rounded-2xl relative overflow-hidden text-white" style={{
            background: 'linear-gradient(135deg, var(--dark-navy) 0%, #1e1b4b 100%)',
            minHeight: '520px'
          }}>
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="badge mb-6" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Sparkles size={14} className="text-secondary" style={{ marginRight: '0.4rem' }} />
                Empirical Venture Intelligence
              </div>
              <h2 style={{ color: '#fff', fontSize: '2.25rem', lineHeight: '1.25', marginBottom: '1.25rem' }}>
                "Turn intuitive guesswork into data-backed execution."
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
                Join founders who stress-test their business models against real competitor data and financial projections.
              </p>
            </div>

            <div className="relative p-5 rounded-xl mt-8" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 1 }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
                <span className="text-xs font-semibold text-white tracking-wide uppercase">AI Viability Engine</span>
              </div>
              <div className="text-xs text-slate-300" style={{ color: '#cbd5e1' }}>
                Full SWOT, Government Grants Match, Market Feasibility & Breakeven Analysis — powered by AI.
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="card p-8 md:p-10 shadow-lg" style={{ borderRadius: '24px' }}>
            <div className="text-center mb-6">
              <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
              <p className="text-light" style={{ fontSize: '0.95rem' }}>Log in to access your saved ideas and reports.</p>
            </div>

            {/* Demo credentials hint */}
            <div className="mb-6 p-3.5 rounded-xl text-sm" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--text-main)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-secondary mb-1">⚡ Quick Demo Login</div>
                  <div className="text-xs font-mono text-light">demo@nexora.ai / demo1234</div>
                </div>
                <button 
                  type="button" 
                  onClick={fillDemo} 
                  className="btn btn-outline" 
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                >
                  Fill Demo
                </button>
              </div>
            </div>

            {loginStatus && (
              <div className="mb-5 p-3.5 bg-green-50 text-success rounded-xl text-sm text-center border border-green-200">
                {loginStatus}
              </div>
            )}

            {errors.form && (
              <div className="mb-5 p-3.5 bg-red-50 text-error rounded-xl text-sm text-center border border-red-200 flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="form-label flex items-center gap-2">
                  <Mail size={15} className="text-light" /> Email Address
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="name@company.com"
                  autoComplete="email"
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                />
                {errors.email && <div className="text-error mt-1 text-xs flex items-center gap-1"><AlertCircle size={13}/> {errors.email}</div>}
              </div>

              <div>
                <label className="form-label flex items-center gap-2">
                  <Lock size={15} className="text-light" /> Password
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input" 
                    placeholder="••••••••"
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(s => !s)} 
                    style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }} 
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div className="text-error mt-1 text-xs flex items-center gap-1"><AlertCircle size={13}/> {errors.password}</div>}
              </div>

              <div className="flex justify-between items-center text-xs mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="visually-hidden" 
                    checked={formData.rememberMe} 
                    onChange={e => setFormData({...formData, rememberMe: e.target.checked})} 
                  />
                  {formData.rememberMe ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} className="text-light"/>}
                  <span className="text-light">Remember me</span>
                </label>
                <span className="text-primary hover:underline font-medium cursor-pointer">Forgot password?</span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full py-3 mt-2 justify-center hover-lift" 
                disabled={isSubmitting}
                style={{ borderRadius: 'var(--radius-lg)', fontWeight: '600' }}
              >
                {isSubmitting ? 'Verifying...' : 'Sign In'}
              </button>

              <button 
                type="button" 
                onClick={continueAsGuest} 
                className="btn btn-outline w-full justify-center text-xs text-light"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                Continue as Guest Explorer →
              </button>

              <div className="text-center text-sm pt-2">
                <span className="text-light">Don't have an account? </span>
                <Link to="/signup" className="text-primary font-bold hover:underline">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
