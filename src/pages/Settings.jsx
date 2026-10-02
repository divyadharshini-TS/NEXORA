import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon, Moon, Sun, Key, Bell, Shield, Save, Check, CheckSquare, Square } from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('userGeminiApiKey') || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reportNotify, setReportNotify] = useState(true);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userGeminiApiKey', apiKey.trim());
    localStorage.setItem('emailAlerts', JSON.stringify(emailAlerts));
    localStorage.setItem('reportNotify', JSON.stringify(reportNotify));
    
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex dashboard-layout" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main className="flex-grow dashboard-main" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto', padding: '1.5rem 2rem' }}>
        <div className="dashboard-mobile-topbar" style={{ marginBottom: '0.5rem' }}>
          <button className="sidebar-toggle-btn" onClick={() => setMobileSidebarOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Settings</span>
        </div>
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-1">
            <SettingsIcon size={24} className="text-accent" />
            <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Workspace Settings</h1>
          </div>
          <p className="text-light text-sm">
            Configure visual themes, custom AI keys, and automated report notifications.
          </p>
        </div>

        {savedStatus && (
          <div className="p-4 mb-6 rounded-xl flex items-center gap-2 max-w-3xl" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
            <Check size={18} /> Settings successfully preserved across workspace.
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 max-w-3xl">
          {/* Appearance */}
          <div className="card p-6" style={{ borderRadius: '22px' }}>
            <h3 className="mb-1 text-base font-bold flex items-center gap-2">
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Theme & Appearance
            </h3>
            <p className="text-light text-xs mb-4">Choose your preferred lighting mode for the NEXORA console.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className="p-4 rounded-xl flex items-center gap-3 text-left transition-all"
                style={{
                  backgroundColor: theme === 'light' ? 'var(--bg-subtle)' : 'transparent',
                  border: theme === 'light' ? '2px solid var(--accent)' : '1px solid var(--border)'
                }}
              >
                <Sun size={20} className={theme === 'light' ? 'text-accent' : 'text-light'} />
                <div>
                  <div className="font-bold text-xs text-main">Studio Light</div>
                  <div className="text-xs text-light" style={{ fontSize: '0.72rem' }}>Clean obsidian contrast</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className="p-4 rounded-xl flex items-center gap-3 text-left transition-all"
                style={{
                  backgroundColor: theme === 'dark' ? 'var(--bg-subtle)' : 'transparent',
                  border: theme === 'dark' ? '2px solid var(--accent)' : '1px solid var(--border)'
                }}
              >
                <Moon size={20} className={theme === 'dark' ? 'text-accent' : 'text-light'} />
                <div>
                  <div className="font-bold text-xs text-main">Cyber Slate</div>
                  <div className="text-xs text-light" style={{ fontSize: '0.72rem' }}>High-contrast dark mode</div>
                </div>
              </button>
            </div>
          </div>

          {/* AI Model Credentials */}
          <div className="card p-6" style={{ borderRadius: '22px' }}>
            <h3 className="mb-1 text-base font-bold flex items-center gap-2">
              <Key size={18} className="text-accent" /> Custom Gemini API Key (Optional)
            </h3>
            <p className="text-light text-xs mb-4">
              Override the built-in system quota with your personal Gemini 2.5/3.0 API key for unlimited analysis.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="form-input font-mono text-xs"
              style={{ padding: '0.75rem 1rem' }}
            />
          </div>

          {/* Notifications */}
          <div className="card p-6" style={{ borderRadius: '22px' }}>
            <h3 className="mb-1 text-base font-bold flex items-center gap-2">
              <Bell size={18} className="text-accent" /> Notification Dispatch
            </h3>
            <p className="text-light text-xs mb-4">Select event triggers for automated email and dashboard alerts.</p>
            
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 text-xs font-semibold text-main cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ accentColor: 'var(--accent)', width: 16, height: 16 }}
                />
                <span>Email me when matching government grant rounds open</span>
              </label>

              <label className="flex items-center gap-3 text-xs font-semibold text-main cursor-pointer">
                <input
                  type="checkbox"
                  checked={reportNotify}
                  onChange={(e) => setReportNotify(e.target.checked)}
                  style={{ accentColor: 'var(--accent)', width: 16, height: 16 }}
                />
                <span>Notify upon completion of long-running financial simulation models</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-accent flex items-center justify-center gap-2 hover-lift"
            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}
          >
            <Save size={16} /> Save Workspace Configuration
          </button>
        </form>
      </main>
    </div>
  );
}
