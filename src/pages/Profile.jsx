import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Briefcase, Award, LogOut, CheckCircle, Save, TrendingUp, BarChart2, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nexoraUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [name, setName] = useState(user?.name || 'Divyadharshini');
  const [email, setEmail] = useState(user?.email || 'founder@nexora.ai');
  const [company, setCompany] = useState(user?.company || 'EcoBox Solutions');
  const [industry, setIndustry] = useState(user?.industry || 'CleanTech / Sustainability');
  const [savedMsg, setSavedMsg] = useState(false);
  const [ideaCount, setIdeaCount] = useState(3);
  const [savedSchemeCount, setSavedSchemeCount] = useState(4);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('nexoraUser') || 'null');
      const key = u ? `nexoraIdeas_${u.email}` : 'nexoraIdeas_anonymous';
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (stored.length > 0) setIdeaCount(stored.length);
      const schemes = JSON.parse(localStorage.getItem('savedSchemeNames') || '[]');
      if (schemes.length > 0) setSavedSchemeCount(schemes.length);
    } catch {}
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, name, email, company, industry };
    localStorage.setItem('nexoraUser', JSON.stringify(updated));
    setUser(updated);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexoraToken');
    localStorage.removeItem('nexoraUser');
    navigate('/login');
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-8 max-w-6xl">
          <div className="flex items-center gap-3">
            <User size={26} className="text-primary" />
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Founder Profile</h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="btn btn-outline flex items-center gap-2 hover-lift"
            style={{ borderColor: 'var(--border)', color: 'var(--error)', borderRadius: 'var(--radius-full)', padding: '0.45rem 1.2rem', fontSize: '0.85rem' }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {savedMsg && (
          <div className="p-4 mb-6 rounded-xl flex items-center gap-2 max-w-6xl" style={{ backgroundColor: '#dcfce7', color: 'var(--success)', border: '1px solid #bbf7d0' }}>
            <CheckCircle size={18} /> Founder profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
          {/* Left Column: ID Card & Stats */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Identity Card */}
            <div className="card text-center p-8 relative overflow-hidden shadow-sm" style={{ borderRadius: '24px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />
              
              <div className="mx-auto mb-4 relative" style={{ width: '90px', height: '90px' }}>
                <div style={{ 
                  width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '2.5rem', fontWeight: 'bold', border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ position: 'absolute', bottom: '2px', right: '2px', background: 'var(--success)', width: '20px', height: '20px', borderRadius: '50%', border: '3px solid white' }} />
              </div>

              <h2 className="font-bold text-xl mb-1">{name}</h2>
              <p className="text-light text-xs mb-4 flex justify-center items-center gap-1.5"><Mail size={13} /> {email}</p>
              
              <div className="inline-block px-3.5 py-1 rounded-full mb-2 badge badge-primary font-semibold text-xs">
                Verified Founder
              </div>
              <div className="text-xs text-light">Unlimited Diagnostic Runs</div>
            </div>

            {/* Platform Stats */}
            <div className="card p-6 shadow-sm" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-xs text-light uppercase tracking-wider">
                <BarChart2 size={15} /> Platform Activity
              </h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-primary"><Lightbulb size={17} /></div>
                    <div>
                      <div className="font-bold text-sm">Ideas Analyzed</div>
                      <div className="text-xs text-light">Lifetime tests</div>
                    </div>
                  </div>
                  <div className="font-extrabold text-lg">{ideaCount}</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50 text-success"><TrendingUp size={17} /></div>
                    <div>
                      <div className="font-bold text-sm">Mean Viability</div>
                      <div className="text-xs text-light">Across concepts</div>
                    </div>
                  </div>
                  <div className="font-extrabold text-lg text-success">84%</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 text-secondary"><Award size={17} /></div>
                    <div>
                      <div className="font-bold text-sm">Saved Schemes</div>
                      <div className="text-xs text-light">Tracked grants</div>
                    </div>
                  </div>
                  <div className="font-extrabold text-lg">{savedSchemeCount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Form */}
          <div className="lg:col-span-2">
            <div className="card p-8 h-full shadow-sm" style={{ borderRadius: '24px' }}>
              <h2 className="mb-6 font-bold flex items-center gap-3 border-b pb-4 text-xl" style={{ borderColor: 'var(--border)' }}>
                <Briefcase size={22} className="text-primary" /> Professional Details
              </h2>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="fullNameInput">Full Name</label>
                    <input
                      id="fullNameInput"
                      type="text"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="emailAddressInput">Email Address</label>
                    <input
                      id="emailAddressInput"
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="startupCompanyInput">Current Venture / Organization</label>
                    <input
                      id="startupCompanyInput"
                      type="text"
                      className="form-input"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="industrySectorInput">Domain Focus</label>
                    <select
                      id="industrySectorInput"
                      className="form-input"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option value="SaaS / Software">SaaS & Enterprise Software</option>
                      <option value="E-Commerce / D2C">E-Commerce & D2C Brands</option>
                      <option value="HealthTech">HealthTech & Life Sciences</option>
                      <option value="EdTech">EdTech & Continuous Learning</option>
                      <option value="FinTech">FinTech & Web3</option>
                      <option value="CleanTech / Sustainability">CleanTech & Sustainability</option>
                      <option value="AI / Machine Learning">AI & Automation</option>
                      <option value="Other">Other / Multi-Sector</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Founder Bio / Objectives</label>
                  <textarea 
                    className="form-input" 
                    rows="4" 
                    placeholder="Briefly describe your venture focus, background, or current fundraising milestones..."
                  ></textarea>
                </div>

                <div className="pt-5 border-t flex justify-end" style={{ borderColor: 'var(--border)' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex items-center gap-2 hover-lift"
                    style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2rem', fontWeight: '600' }}
                  >
                    <Save size={17} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
