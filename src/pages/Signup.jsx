import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Mail, Lock, User, Phone, Building, Globe, CheckSquare, Square, AlertCircle } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', password: '', confirmPassword: '',
    organization: '', location: '', termsAccepted: false, privacyAccepted: false
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email address';
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => navigate('/login'), 500);
    }
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: 'var(--bg-color)' }}>
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center p-12 w-1/2 bg-gradient-blue text-center relative overflow-hidden">
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--primary)', opacity: '0.05' }}></div>
        <Rocket size={80} className="text-primary mb-8" />
        <h2 style={{ maxWidth: '400px' }}>"Start Your Entrepreneurial Journey with AI"</h2>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="card w-full" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-8">
            <h2 className="mb-2">Create Your Account</h2>
            <p className="text-light">Join AI Startup Launchpad and validate your business ideas with AI.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><User size={16}/> Full Name *</label>
                <input type="text" className="form-input" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                {errors.fullName && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.fullName}</div>}
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Mail size={16}/> Email Address *</label>
                <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                {errors.email && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.email}</div>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Phone size={16}/> Mobile (Optional)</label>
                <input type="tel" className="form-input" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Building size={16}/> Organization (Optional)</label>
                <input type="text" className="form-input" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center gap-2"><Globe size={16}/> Country / State (Optional)</label>
              <input type="text" className="form-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Lock size={16}/> Password *</label>
                <input type="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                {errors.password && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.password}</div>}
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Lock size={16}/> Confirm Password *</label>
                <input type="password" className="form-input" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                {errors.confirmPassword && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" className="hidden" checked={formData.termsAccepted} onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} />
                {formData.termsAccepted ? <CheckSquare size={18} className="text-primary"/> : <Square size={18} className="text-light"/>}
                <span>I agree to the <span className="text-primary font-medium">Terms & Conditions</span></span>
              </label>
              {errors.termsAccepted && <div className="text-error text-sm">{errors.termsAccepted}</div>}

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" className="hidden" checked={formData.privacyAccepted} onChange={e => setFormData({...formData, privacyAccepted: e.target.checked})} />
                {formData.privacyAccepted ? <CheckSquare size={18} className="text-primary"/> : <Square size={18} className="text-light"/>}
                <span>I agree to the <span className="text-primary font-medium">Privacy Policy</span></span>
              </label>
              {errors.privacyAccepted && <div className="text-error text-sm">{errors.privacyAccepted}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 mb-6 justify-center">Create Account</button>
            
            <div className="flex items-center gap-4 mb-6 text-light text-sm">
              <div className="flex-grow h-px bg-gray-200" style={{ backgroundColor: 'var(--border)' }}></div>
              <span>OR</span>
              <div className="flex-grow h-px bg-gray-200" style={{ backgroundColor: 'var(--border)' }}></div>
            </div>

            <div className="flex gap-4 mb-6">
              <button type="button" className="btn btn-outline w-full justify-center text-sm">Google</button>
              <button type="button" className="btn btn-outline w-full justify-center text-sm">Microsoft</button>
            </div>

            <div className="text-center text-sm">
              <span className="text-light">Already have an account? </span>
              <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
