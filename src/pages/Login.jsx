import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Mail, Lock, CheckSquare, Square, AlertCircle, Shield, BrainCircuit, Save, Download } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('');

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API verification
      if (formData.email === 'test@example.com' && formData.password === 'WrongPass1!') {
        setErrors({ form: 'Incorrect email or password' });
      } else if (formData.email === 'notfound@example.com') {
        setErrors({ form: 'Account not found' });
      } else {
        setLoginStatus('Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="flex flex-grow" style={{ minHeight: 'calc(100vh - 70px - 100px)' }}>
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center p-12 w-1/2 bg-gradient-blue text-center relative overflow-hidden">
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--primary)', opacity: '0.05' }}></div>
          <LineChart size={80} className="text-primary mb-8" />
          <h2 style={{ maxWidth: '400px' }}>"Transform Your Business Idea into Reality with AI"</h2>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="card w-full" style={{ maxWidth: '450px' }}>
            <div className="text-center mb-8">
              <h2 className="mb-2">Welcome Back</h2>
              <p className="text-light">Sign in to continue your business journey.</p>
            </div>

            {loginStatus && (
              <div className="mb-4 p-3 bg-green-50 text-success rounded text-sm text-center border border-green-200">
                {loginStatus}
              </div>
            )}

            {errors.form && (
              <div className="mb-4 p-3 bg-red-50 text-error rounded text-sm text-center border border-red-200 flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Mail size={16}/> Email Address</label>
                <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                {errors.email && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label flex items-center gap-2"><Lock size={16}/> Password</label>
                <input type="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                {errors.password && <div className="text-error mt-1 text-sm flex items-center gap-1"><AlertCircle size={14}/> {errors.password}</div>}
              </div>

              <div className="flex justify-between items-center mb-6 mt-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="hidden" checked={formData.rememberMe} onChange={e => setFormData({...formData, rememberMe: e.target.checked})} />
                  {formData.rememberMe ? <CheckSquare size={18} className="text-primary"/> : <Square size={18} className="text-light"/>}
                  <span className="text-light">Remember Me</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium">Forgot Password?</a>
              </div>

              <button type="submit" className="btn btn-primary w-full py-3 mb-6 justify-center">Login</button>
              
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
                <span className="text-light">Don't have an account? </span>
                <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Small Features Section */}
      <div className="w-full bg-white py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container flex justify-center flex-wrap gap-8 text-sm font-medium" style={{ color: 'var(--dark-navy)' }}>
          <div className="flex items-center gap-2"><Shield className="text-success" size={18} /> Secure Authentication</div>
          <div className="flex items-center gap-2"><BrainCircuit className="text-primary" size={18} /> AI-Powered Business Analysis</div>
          <div className="flex items-center gap-2"><Save className="text-primary" size={18} /> Save Unlimited Business Ideas</div>
          <div className="flex items-center gap-2"><Download className="text-primary" size={18} /> Download Business Reports</div>
        </div>
      </div>

      {/* Basic Footer specific for auth pages if desired, but App.jsx has one. We'll leave it simple for these pages. */}
      <footer className="w-full py-6 text-center text-sm text-light border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--white)' }}>
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms & Conditions</a>
          <a href="#" className="hover:text-primary">Contact Support</a>
        </div>
        <div>&copy; {new Date().getFullYear()} AI Startup Launchpad</div>
      </footer>
    </div>
  );
}
