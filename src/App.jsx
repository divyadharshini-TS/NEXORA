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
import Pricing from './pages/Pricing';
import { 
  Sparkles, Sun, Moon, LogOut, User as UserIcon, Menu, X, 
  Compass, ShieldCheck, ArrowRight, Bell, FolderOpen,
  LayoutDashboard, FileBarChart, Landmark, Settings as SettingsIcon, PlusCircle
} from 'lucide-react';

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
    { to: '/', label: 'Overview' },
    { to: '/schemes', label: 'Govt Schemes' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/my-ideas', label: 'Venture Library' },
    { to: '/reports', label: 'Analytics' },
    { to: '/saved-schemes', label: 'Bookmarks' },
  ];

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <Sparkles size={19} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight" style={{ fontSize: '1.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              NEXORA
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: '600', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              AI Intelligence
            </span>
          </div>
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

          {/* Theme switcher */}
          <button 
            onClick={toggleTheme} 
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"} 
            className="btn btn-outline" 
            style={{ 
              padding: '0.5rem', 
              borderRadius: 'var(--radius-sm)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={17} className="text-warning" /> : <Moon size={17} />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/profile" 
                className="btn btn-outline flex items-center gap-2" 
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.86rem', borderRadius: 'var(--radius-full)' }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: '700'
                }}>
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span>{user?.name ? user.name.split(' ')[0] : 'Account'}</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="btn btn-ghost" 
                title="Logout"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-full)', color: 'var(--error)' }}
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Sign In
              </Link>
              <Link to="/analyze" className="btn btn-accent" style={{ padding: '0.55rem 1.35rem', fontSize: '0.88rem' }}>
                Analyze Idea <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <div className="mobile-nav-toggle-wrap" style={{ display: 'none', gap: '0.5rem' }}>
          <button 
            onClick={toggleTheme}
            className="btn btn-outline"
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', width: '40px', height: '40px' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-warning" /> : <Moon size={17} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="btn btn-outline"
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', width: '40px', height: '40px' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu animate-fade-in-up" style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1rem', padding: '0.4rem 0' }}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button onClick={toggleTheme} className="btn btn-outline flex items-center gap-2" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="btn btn-outline flex items-center gap-1.5" style={{ padding: '0.5rem 0.85rem' }}>
                  <UserIcon size={16} /> Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 0.85rem', color: 'var(--error)' }}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-subtle)', 
      borderTop: '1px solid var(--border)', 
      color: 'var(--text-main)', 
      padding: '4.5rem 0 2.5rem' 
    }}>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sparkles size={16} />
            </div>
            <span className="font-extrabold tracking-tight text-lg">NEXORA</span>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Predictive machine intelligence engine for validating business hypotheses, competitor moats, and grant feasibility.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="badge badge-success font-mono" style={{ fontSize: '0.7rem' }}>
              SYSTEM STATUS: ALL OPERATIONAL
            </span>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Intelligence</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.88rem' }}>
            <li><Link to="/analyze" style={{ color: 'inherit', textDecoration: 'none' }}>AI Venture Diagnostic</Link></li>
            <li><Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Executive Dossier</Link></li>
            <li><Link to="/demo" style={{ color: 'inherit', textDecoration: 'none' }}>Benchmark Demo Model</Link></li>
            <li><Link to="/reports" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Capital & Grants</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.88rem' }}>
            <li><Link to="/schemes" style={{ color: 'inherit', textDecoration: 'none' }}>Govt Schemes Directory</Link></li>
            <li><Link to="/saved-schemes" style={{ color: 'inherit', textDecoration: 'none' }}>Bookmarked Programs</Link></li>
            <li><Link to="/my-ideas" style={{ color: 'inherit', textDecoration: 'none' }}>Hypothesis Library</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Security & Policy</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-light)', fontSize: '0.88rem' }}>
            <li>Enterprise Data Encryption</li>
            <li>Confidentiality Terms</li>
            <li>API SLA Guarantees</li>
            <li><Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>Workspace Preferences</Link></li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        <div>&copy; {new Date().getFullYear()} NEXORA AI Systems. Built for high-conviction founders.</div>
        <div className="flex items-center gap-4">
          <span>GDPR Compliant</span>
          <span>&bull;</span>
          <span>Zero Data Retention for Training</span>
        </div>
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

function MobileBottomNav() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('nexoraToken');

  const items = isLoggedIn ? [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/my-ideas', icon: FolderOpen, label: 'Ideas' },
    { to: '/analyze', icon: PlusCircle, label: 'Analyze', accent: true },
    { to: '/reports', icon: FileBarChart, label: 'Reports' },
    { to: '/profile', icon: UserIcon, label: 'Profile' },
  ] : [
    { to: '/', icon: Sparkles, label: 'Home' },
    { to: '/schemes', icon: Landmark, label: 'Schemes' },
    { to: '/analyze', icon: PlusCircle, label: 'Analyze', accent: true },
    { to: '/login', icon: UserIcon, label: 'Sign In' },
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-items">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to === '/' && location.pathname === '/');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              <span className="nav-icon-wrap" style={item.accent && !isActive ? {
                background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                color: 'white',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
              } : {}}>
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ paddingTop: '74px', flexGrow: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/demo" element={<DemoDashboard />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Protected routes */}
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
        <MobileBottomNav />
      </div>
    </Router>
  );
}
