import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, User, Eye, EyeOff, CheckCircle2, ShieldCheck
} from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', password: '', confirmPassword: '',
    organization: '', location: '', termsAccepted: false, privacyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    const emailVal = String(formData.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) newErrors.email = 'Enter a valid email address';
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: normalizedEmail,
          password: formData.password,
          company: formData.organization || 'Venture Studio',
          location: formData.location || 'India'
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('nexoraToken', data.token);
      localStorage.setItem('nexoraUser', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      // Local fallback for client-only prototype
      localStorage.setItem('nexoraToken', 'client-token-' + Date.now());
      localStorage.setItem('nexoraUser', JSON.stringify({
        id: 'usr_' + Date.now(),
        name: formData.fullName,
        email: normalizedEmail,
        company: formData.organization || 'Venture Studio'
      }));
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-14 animate-fade-in-up flex justify-center items-center">
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
            Create Founder Account
          </h1>
          <p className="text-xs text-light">
            Unlock full access to predictive analysis, grant eligibility, and financial models.
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8 shadow-lg" style={{ borderRadius: '24px' }}>
          {errors.form && (
            <div className="p-3 mb-5 rounded-lg text-xs font-semibold" style={{ backgroundColor: 'var(--error-bg)', color: 'var(--error)', border: '1px solid var(--error-border)' }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                <span>Full Name</span>
              </label>
              <div className="relative">
                <User size={16} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.6rem' }}
                />
              </div>
              {errors.fullName && <span className="text-xs text-error mt-1 block">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <span>Work / Founder Email</span>
              </label>
              <div className="relative">
                <Mail size={16} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@ecologix.co"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '2.6rem' }}
                />
              </div>
              {errors.email && <span className="text-xs text-error mt-1 block">{errors.email}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    style={{ paddingLeft: '2.6rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  <span>Confirm</span>
                </label>
                <div className="relative">
                  <Lock size={16} className="text-light" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '2.6rem' }}
                  />
                </div>
              </div>
            </div>
            {errors.password && <span className="text-xs text-error mt-1 block">{errors.password}</span>}
            {errors.confirmPassword && <span className="text-xs text-error mt-1 block">{errors.confirmPassword}</span>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-accent w-full justify-center mt-3 hover-lift"
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-xs text-light">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
