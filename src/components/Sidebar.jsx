import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, FileBarChart, Landmark, Settings, 
  User, Bell, PlusCircle, Sparkles, ChevronRight, ShieldCheck, X
} from 'lucide-react';

export default function Sidebar({ isDemo = false, isOpen = false, onClose = () => {} }) {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('nexoraToken');
        if (!token) return;
        const res = await fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const unread = data.filter(n => n.unread !== false).length;
            setUnreadCount(unread || data.length);
          }
        }
      } catch (e) {
        // keep fallback
      }
    };
    fetchNotes();
  }, []);

  // Auto-close mobile drawer on route navigation
  useEffect(() => {
    if (onClose) onClose();
  }, [location.pathname]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-lock');
    } else {
      document.body.classList.remove('sidebar-lock');
    }
    return () => document.body.classList.remove('sidebar-lock');
  }, [isOpen]);

  const navItems = [
    { to: isDemo ? '/demo' : '/dashboard', label: isDemo ? 'Benchmark Dossier' : 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/my-ideas',      label: 'Venture Library',     icon: FolderOpen   },
    { to: '/reports',       label: 'Portfolio Analytics', icon: FileBarChart },
    { to: '/saved-schemes', label: 'Saved Schemes',       icon: Landmark     },
    { to: '/notifications', label: 'Alerts & Updates',    icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
  ];

  const bottomItems = [
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/profile',  label: 'Founder Profile',  icon: User     },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.to;
    return (
      <NavLink
        to={item.to}
        onClick={() => { if (onClose) onClose(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 14px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: isActive ? '600' : '500',
          fontSize: '0.88rem',
          letterSpacing: '-0.01em',
          color: isActive ? 'var(--text-main)' : 'var(--text-light)',
          backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
          border: isActive ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.16s ease',
          marginBottom: '3px',
          position: 'relative'
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
            e.currentTarget.style.color = 'var(--text-main)';
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-light)';
          }
        }}
      >
        <span style={{
          width: '32px',
          height: '32px',
          borderRadius: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-subtle)',
          color: isActive ? 'var(--bg-color)' : 'var(--text-light)',
          flexShrink: 0,
          transition: 'all 0.16s ease',
          boxShadow: isActive ? '0 2px 8px rgba(10, 15, 29, 0.15)' : 'none'
        }}>
          <Icon size={16} />
        </span>
        <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>

        {item.badge && (
          <span style={{
            marginLeft: 'auto',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '0.68rem',
            fontWeight: '700',
            padding: '1px 6px',
            borderRadius: '999px',
            lineHeight: 1.4
          }}>
            {item.badge}
          </span>
        )}

        {isActive && !item.badge && (
          <span style={{
            marginLeft: 'auto',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            flexShrink: 0,
            boxShadow: '0 0 8px var(--accent)'
          }} />
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="sidebar-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(6, 9, 19, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          width: '260px',
          flexShrink: 0,
          minHeight: 'calc(100vh - 74px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem 0.95rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div>
          {/* Mobile close bar */}
          <div className="sidebar-mobile-header" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>Workspace Menu</span>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.35rem' }} aria-label="Close sidebar">
              <X size={18} />
            </button>
          </div>

          {/* Quick Action Button */}
          <Link
            to="/analyze"
            onClick={() => { if (onClose) onClose(); }}
            className="btn btn-accent flex items-center justify-center gap-2 mb-6"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '12px',
              boxShadow: '0 4px 14px -1px rgba(37, 99, 235, 0.4)'
            }}
          >
            <PlusCircle size={16} />
            <span>New Venture Test</span>
          </Link>

          {/* Section Header */}
          <div style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--text-muted)',
            padding: '0 12px',
            marginBottom: '8px'
          }}>
            Diagnostic Core
          </div>

          <nav>
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </div>

        <div>
          {/* Pro Plan / Engine Status Card */}
          <div style={{
            padding: '0.85rem',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            marginBottom: '1rem'
          }}>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-accent" />
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-main)' }}>AI Diagnostic V2.4</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', lineHeight: 1.4, margin: 0 }}>
              Cobalt-Cyan model: Market sizing & financial simulators active.
            </p>
          </div>

          <div style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--text-muted)',
            padding: '0 12px',
            marginBottom: '8px'
          }}>
            Account & Prefs
          </div>

          <nav>
            {bottomItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
