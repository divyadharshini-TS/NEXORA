import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, FileBarChart, Landmark, Settings, User, Bell, Rocket, PlusCircle
} from 'lucide-react';

export default function Sidebar({ isDemo = false }) {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    // Fetch unread count from notifications if logged in
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
            setUnreadCount(data.length);
          }
        }
      } catch (e) {
        // keep fallback
      }
    };
    fetchNotes();
  }, []);

  const navItems = [
    {
      to: isDemo ? '/demo' : '/dashboard',
      label: isDemo ? 'Demo Dashboard' : 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/my-ideas',
      label: 'My Ideas',
      icon: FolderOpen,
    },
    {
      to: '/reports',
      label: 'Reports',
      icon: FileBarChart,
    },
    {
      to: '/saved-schemes',
      label: 'Saved Schemes',
      icon: Landmark,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <aside style={{ 
      width: '300px', 
      minWidth: '300px',
      backgroundColor: 'var(--white)', 
      borderRight: '1px solid var(--border)', 
      padding: '2.5rem 1.75rem', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'sticky',
      top: '86px',
      height: 'calc(100vh - 86px)',
      overflowY: 'auto'
    }}>
      <div className="flex flex-col gap-7">
        <NavLink 
          to="/analyze" 
          className="btn btn-primary w-full flex items-center justify-center gap-2.5"
          style={{ 
            textDecoration: 'none', 
            padding: '0.85rem 1.25rem', 
            fontSize: '0.95rem', 
            fontWeight: '600',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <PlusCircle size={19} /> New Analysis
        </NavLink>

        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all"
                style={{
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-light)',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '0.97rem',
                  letterSpacing: '-0.01em'
                }}
              >
                <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'var(--text-light)' }} />
                <span>{item.label}</span>
                {isActive && (
                  <span style={{ 
                    marginLeft: 'auto', 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--primary)' 
                  }}></span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <NavLink 
          to="/notifications" 
          className="flex items-center justify-between px-4 py-3.5 rounded-xl hover-lift transition-all"
          style={{ 
            backgroundColor: location.pathname === '/notifications' ? 'var(--bg-secondary)' : 'transparent',
            textDecoration: 'none', 
            color: 'var(--text-main)',
            fontWeight: '600',
            fontSize: '0.97rem',
            border: '1px solid var(--border)'
          }}
        >
          <div className="flex items-center gap-2.5">
            <Bell size={18} className="text-primary" />
            <span>Notifications</span>
          </div>
          {unreadCount > 0 && (
            <span style={{ 
              background: 'var(--error)', 
              color: 'white', 
              fontSize: '0.75rem', 
              padding: '0.15rem 0.55rem', 
              borderRadius: 'var(--radius-full)',
              fontWeight: '700'
            }}>
              {unreadCount}
            </span>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
