import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';
import { apiPost } from '../utils/safeApi';

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
    localStorage.setItem('nexoraUser', JSON.stringify({ id: 'guest', name: 'Guest Founder', email: 'guest@nexora.ai', isAdmin: false }));
    navigate(redirectTo);
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailVal = String(formData.email || '').trim();
    const passwordVal = String(formData.password || '');

    if (!emailVal || !emailRegex.test(emailVal)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!passwordVal) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    const normalizedEmail = String(formData.email || '').trim().toLowerCase();

    try {
      const { data, error, isOffline } = await apiPost('/api/auth/login', {
        email: normalizedEmail,
        password: String(formData.password || ''),
      });

      if (data && data.token) {
        localStorage.setItem('nexoraToken', data.token);
        localStorage.setItem('nexoraUser', JSON.stringify(data.user));
        setLoginStatus('Authentication successful. Redirecting...');
        setTimeout(() => navigate(redirectTo), 700);
        return;
      }

      // If backend is offline or on static host (like Vercel preview), fall back to client session
      if (isOffline) {
        const demoUser = {
          id: 'usr_' + Date.now(),
          name: normalizedEmail.split('@')[0] || 'Executive Founder',
          email: normalizedEmail,
          company: 'Nexora Ventures'
        };
        localStorage.setItem('nexoraToken', 'client-token-' + Date.now());
        localStorage.setItem('nexoraUser', JSON.stringify(demoUser));
        setLoginStatus('Offline preview — signed in via local workspace. Redirecting...');
        setTimeout(() => navigate(redirectTo), 700);
        return;
      }

      setErrors({ form: error || 'Could not log in. Check credentials.' });
    } catch {
      setErrors({ form: 'An unexpected connection error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-16 animate-fade-in-up flex justify-center items-center" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="w-full max-w-md">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            marginBottom: '1rem',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
          }}>
            <Sparkles size={22} />
          </div>
          <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
            Welcome to NEXORA
          </h1>
          <p className="text-xs text-light">
            Sign in to access your venture intelligence dossier and grant tracking.
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="p-3.5 rounded-xl mb-6 flex items-center justify-between gap-3" style={{
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <div className="text-xs">
            <span className="font-bold text-main block">Quick Demo Mode</span>
            <span className="text-light">Auto-fill verified reviewer account</span>
          </div>
          <button 
            type="button" 
            onClick={fillDemo} 
            className="btn btn-outline text-xs" 
            style={{ padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)' }}
          >
            Auto Fill
          </button>
        </div>

        {/* Form Card */}
        <div className="card p-8 shadow-lg" style={{ borderRadius: '24px' }}>
          {errors.form && (
            <div className="p-3 mb-5 rounded-lg text-xs font-semibold" style={{ backgroundColor: 'var(--error-bg)', color: 'var(--error)', border: '1px solid var(--error-border)' }}>
              {errors.form}
            </div>
          )}
          {loginStatus && (
            <div className="p-3 mb-5 rounded-lg text-xs font-semibold" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
              {loginStatus}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <span>Email Address</span>
              </label>
              <div className="relative">
                <Mail size={16} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="founder@venture.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.6rem' }}
                />
              </div>
              {errors.email && <span className="text-xs text-error mt-1 block">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                <span>Password</span>
              </label>
              <div className="relative">
                <Lock size={16} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-ghost"
                  style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '0.25rem', color: 'var(--text-light)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-error mt-1 block">{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-accent w-full justify-center mt-2 hover-lift"
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}
            </button>
          </form>

          {/* Guest Access Alternative */}
          <div className="mt-5 text-center pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
            <button
              type="button"
              onClick={continueAsGuest}
              className="btn btn-outline w-full justify-center text-xs"
              style={{ padding: '0.65rem', borderRadius: 'var(--radius-md)' }}
            >
              Explore as Guest Founder &rarr;
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-xs text-light">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
