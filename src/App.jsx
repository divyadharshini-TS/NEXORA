import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import FormPage from './pages/FormPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DemoDashboard from './pages/DemoDashboard';
import { Rocket, ShieldAlert } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Rocket className="text-primary" size={28} />
          <span className="font-bold text-gradient" style={{ fontSize: '1.25rem' }}>AI Startup Launchpad</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#features" className="nav-link">Features</a>
          <a href="#schemes" className="nav-link">Government Schemes</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Login</Link>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dark-navy)', color: 'var(--white)', padding: '4rem 0 2rem' }}>
      <div className="container grid grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={24} />
            <span className="font-bold">AI Startup Launchpad</span>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
            Validate your business idea with AI before you invest.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Product</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <li>Features</li>
            <li>Pricing</li>
            <li>Case Studies</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <li>Blog</li>
            <li>Government Schemes</li>
            <li>Legal Checklist</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} AI Startup Launchpad. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 300px)' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/analyze" element={<FormPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/demo" element={<DemoDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
