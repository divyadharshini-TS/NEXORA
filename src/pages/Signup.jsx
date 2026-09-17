import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Rocket, Mail, Lock, User, Phone, Building, Globe, 
  CheckSquare, Square, AlertCircle, Eye, EyeOff, Sparkles, CheckCircle2 
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
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';

    const emailVal = String(formData.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) newErrors.email = 'Enter a valid email address';
    
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password || !passRegex.test(formData.password)) {
      newErrors.password = 'Password must be 8+ chars with uppercase, lowercase, number, and special character.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the Terms & Conditions';
    if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the Privacy Policy';

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
    const normalizedEmail = String(formData.email || '').trim().toLowerCase();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: normalizedEmail,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('nexoraToken', data.token);
      localStorage.setItem('nexoraUser', JSON.stringify(data.user));
      navigate('/analyze');
    } catch (error) {
      setErrors({ form: error.message || 'Signup failed' });
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
            minHeight: '600px'
          }}>
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="badge mb-6" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Sparkles size={14} className="text-secondary" style={{ marginRight: '0.4rem' }} />
                Early Access
              </div>
              <h2 style={{ color: '#fff', fontSize: '2.25rem', lineHeight: '1.25', marginBottom: '1.25rem' }}>
                "Start Your Entrepreneurial Journey with Empirical Validation."
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
                Create your workspace to generate comprehensive AI reports, assess TAM, and track eligible government funding schemes.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 p-5 rounded-xl mt-8" style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 1 }}>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <CheckCircle2 size={16} className="text-success" />
                <span>No credit card required • Free to get started</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <CheckCircle2 size={16} className="text-success" />
                <span>Unlimited saved business analyses</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <CheckCircle2 size={16} className="text-success" />
                <span>Comprehensive PDF export and shareable links</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="card p-8 md:p-10 shadow-lg" style={{ borderRadius: '24px' }}>
            <div className="text-center mb-6">
              <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Create Account</h2>
              <p className="text-light" style={{ fontSize: '0.95rem' }}>Set up your workspace to begin testing hypotheses.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errors.form && (
                <div className="p-3.5 bg-red-50 text-error rounded-xl text-sm border border-red-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} /> {errors.form}
                  </div>
                  <Link to="/login" className="text-primary font-semibold text-xs hover:underline">Log in</Link>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <User size={14} className="text-light"/> Full Name *
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Alex Morgan"
                    value={formData.fullName} 
                    onChange={e => setFormData({...formData, fullName: e.target.value})} 
                  />
                  {errors.fullName && <div className="text-error mt-1 text-xs flex items-center gap-1"><AlertCircle size={13}/> {errors.fullName}</div>}
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Mail size={14} className="text-light"/> Email Address *
                  </label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="alex@company.com"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                  {errors.email && <div className="text-error mt-1 text-xs flex items-center gap-1"><AlertCircle size={13}/> {errors.email}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Phone size={14} className="text-light"/> Mobile (Optional)
                  </label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+91 98765 43210"
                    value={formData.mobile} 
                    onChange={e => setFormData({...formData, mobile: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Building size={14} className="text-light"/> Organization (Optional)
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Venture Labs Ltd"
                    value={formData.organization} 
                    onChange={e => setFormData({...formData, organization: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock size={14} className="text-light"/> Password *
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
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <div className="text-error mt-1 text-xs">{errors.password}</div>}
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock size={14} className="text-light"/> Confirm Password *
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showConfirm ? 'text' : 'password'} 
                      className="form-input" 
                      placeholder="••••••••"
                      value={formData.confirmPassword} 
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                      style={{ paddingRight: '2.5rem' }}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirm(s => !s)} 
                      style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }} 
                      aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="text-error mt-1 text-xs">{errors.confirmPassword}</div>}
                </div>
              </div>

              <div className="flex flex-col gap-2 my-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="visually-hidden" 
                    checked={formData.termsAccepted} 
                    onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} 
                  />
                  {formData.termsAccepted ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} className="text-light"/>}
                  <span>I agree to the <span className="text-primary font-semibold">Terms & Conditions</span></span>
                </label>
                {errors.termsAccepted && <div className="text-error">{errors.termsAccepted}</div>}

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="visually-hidden" 
                    checked={formData.privacyAccepted} 
                    onChange={e => setFormData({...formData, privacyAccepted: e.target.checked})} 
                  />
                  {formData.privacyAccepted ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} className="text-light"/>}
                  <span>I agree to the <span className="text-primary font-semibold">Privacy Policy</span></span>
                </label>
                {errors.privacyAccepted && <div className="text-error">{errors.privacyAccepted}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full py-3 mt-1 justify-center hover-lift" 
                disabled={isSubmitting}
                style={{ borderRadius: 'var(--radius-lg)', fontWeight: '600' }}
              >
                {isSubmitting ? 'Creating workspace...' : 'Create Free Account'}
              </button>

              <div className="text-center text-sm pt-2">
                <span className="text-light">Already have an account? </span>
                <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
