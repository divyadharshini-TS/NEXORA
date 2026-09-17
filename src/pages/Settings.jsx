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
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-1">
            <SettingsIcon size={26} className="text-primary" />
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Workspace Settings</h1>
          </div>
          <p className="text-light text-sm">
            Manage your interface appearance, custom API integrations, and notification preferences.
          </p>
        </div>

        {savedStatus && (
          <div className="p-4 mb-6 rounded-xl flex items-center gap-2 max-w-3xl" style={{ backgroundColor: '#dcfce7', color: 'var(--success)', border: '1px solid #bbf7d0' }}>
            <Check size={18} /> Settings successfully updated!
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 max-w-3xl">
          {/* Appearance */}
          <div className="card p-7 hover-lift" style={{ borderRadius: '22px' }}>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />} Interface Theme
            </h3>
            <p className="text-light text-xs mb-4">Choose your preferred lighting mode for the NEXORA console.</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.4rem' }}
              >
                <Sun size={17} /> Light Mode
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.4rem' }}
              >
                <Moon size={17} /> Dark Mode
              </button>
            </div>
          </div>

          {/* AI Credentials */}
          <div className="card p-7 hover-lift" style={{ borderRadius: '22px' }}>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
              <Key size={20} className="text-primary" /> Gemini AI Integration
            </h3>
            <p className="text-light text-xs mb-4">
              Provide your dedicated Google AI Studio API key to bypass shared rate limits.
            </p>
            <div>
              <label className="form-label" htmlFor="apiKeyInput">Gemini API Key</label>
              <input
                id="apiKeyInput"
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <span className="text-xs text-light mt-1.5 block">Stored securely inside your local browser storage.</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-7 hover-lift" style={{ borderRadius: '22px' }}>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
              <Bell size={20} className="text-primary" /> Notification Alerts
            </h3>
            <p className="text-light text-xs mb-4">Control what automated updates you receive.</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer text-sm">
                <input 
                  type="checkbox" 
                  className="visually-hidden" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)} 
                />
                {emailAlerts ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} className="text-light" />}
                <span className="font-medium">Government Scheme deadline alerts and funding opportunities</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-sm">
                <input 
                  type="checkbox" 
                  className="visually-hidden" 
                  checked={reportNotify} 
                  onChange={(e) => setReportNotify(e.target.checked)} 
                />
                {reportNotify ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} className="text-light" />}
                <span className="font-medium">AI analysis diagnostic completion notifications</span>
              </label>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className="btn btn-primary flex items-center gap-2 hover-lift"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2.25rem', fontWeight: '600' }}
            >
              <Save size={18} /> Save Workspace Settings
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
