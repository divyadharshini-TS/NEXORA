import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import FormPage from './pages/FormPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DemoDashboard from './pages/DemoDashboard';
import Schemes from './pages/Schemes';
import MyIdeas from './pages/MyIdeas';
import Reports from './pages/Reports';
import SavedSchemes from './pages/SavedSchemes';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { Rocket, Sun, Moon, LogOut, User as UserIcon, Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('nexoraToken'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nexoraUser') || 'null');
    } catch {
      return null;
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync login status when location changes & close mobile menu
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('nexoraToken'));
    try {
      setUser(JSON.parse(localStorage.getItem('nexoraUser') || 'null'));
    } catch {
      setUser(null);
    }
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleLogout = () => {
    localStorage.removeItem('nexoraToken');
    localStorage.removeItem('nexoraUser');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/schemes', label: 'Government Schemes' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/my-ideas', label: 'My Ideas' },
    { to: '/reports', label: 'Reports' },
    { to: '/saved-schemes', label: 'Saved Schemes' },
    { to: '/notifications', label: 'Notifications' },
  ];

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5">
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--white)'
          }}>
            <Rocket size={20} />
          </div>
          <span className="font-bold tracking-tight" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>NEXORA</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}

          <button onClick={toggleTheme} title="Toggle theme" className="btn btn-outline" style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="btn btn-outline flex items-center gap-1.5" style={{ padding: '0.45rem 0.85rem', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' }}>
                <UserIcon size={16} className="text-primary" />
                <span>{user?.name ? user.name.split(' ')[0] : 'Profile'}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline flex items-center gap-1" style={{ padding: '0.45rem 0.85rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'var(--error)', borderRadius: 'var(--radius-md)' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.4rem', borderRadius: 'var(--radius-full)' }}>Login</Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="mobile-nav-toggle-wrap" style={{ display: 'none' }}>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="btn btn-outline"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-md)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu animate-fade-in-up" style={{
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--border)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1.05rem', padding: '0.4rem 0' }}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button onClick={toggleTheme} className="btn btn-outline flex items-center gap-2" style={{ padding: '0.5rem 1rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="btn btn-outline flex items-center gap-1.5" style={{ padding: '0.5rem 0.85rem' }}>
                  <UserIcon size={16} /> Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 0.85rem', color: 'var(--error)', borderColor: 'var(--error)' }}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)' }}>Login</Link>
            )}
          </div>
        </div>
      )}
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
            <span className="font-bold">NEXORA</span>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
            Validate your business idea with AI before you invest.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Product</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <li><Link to="/analyze" style={{ color: 'inherit', textDecoration: 'none' }}>AI Analysis</Link></li>
            <li><Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard</Link></li>
            <li><Link to="/demo" style={{ color: 'inherit', textDecoration: 'none' }}>Demo Mode</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
            <li><Link to="/schemes" style={{ color: 'inherit', textDecoration: 'none' }}>Government Schemes</Link></li>
            <li><Link to="/my-ideas" style={{ color: 'inherit', textDecoration: 'none' }}>My Ideas</Link></li>
            <li><Link to="/reports" style={{ color: 'inherit', textDecoration: 'none' }}>Reports</Link></li>
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
        &copy; {new Date().getFullYear()} NEXORA. All rights reserved.
      </div>
    </footer>
  );
}

// Guard: redirects to /login if no token found
function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('nexoraToken');
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ paddingTop: '86px', minHeight: 'calc(100vh - 300px)' }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/demo" element={<DemoDashboard />} />

            {/* Protected routes — require login */}
            <Route path="/analyze" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/my-ideas" element={<ProtectedRoute><MyIdeas /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/saved-schemes" element={<ProtectedRoute><SavedSchemes /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
