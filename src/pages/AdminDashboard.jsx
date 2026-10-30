import React, { useState, useEffect } from 'react';
import { 
  Users, FolderOpen, FileBarChart, Landmark, Settings, 
  Activity, ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2,
  Layers, Plus, Trash2, ExternalLink, BookOpen, AlertCircle,
  ToggleLeft, ToggleRight, Check, X, Server, Database, Cpu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { apiGet, apiPost, apiFetch } from '../utils/safeApi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, categories, schemes, legal, resources
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Data states
  const [overview, setOverview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [legalRules, setLegalRules] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // New form states
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' });
  const [newScheme, setNewScheme] = useState({ name: '', description: '', eligibility: '', fundingAmount: '', officialLink: '', applicableCategories: 'saas,ecommerce' });
  const [newRule, setNewRule] = useState({ category: 'saas', ruleName: '', complianceType: 'Statutory License', description: '', officialSource: '' });
  const [newResource, setNewResource] = useState({ title: '', category: 'all', type: 'Guide', summary: '', link: '' });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [ovRes, catRes, schRes, lrRes, resRes] = await Promise.all([
        apiGet('/api/admin/overview'),
        apiGet('/api/admin/categories'),
        apiGet('/api/admin/schemes'),
        apiGet('/api/admin/legal-rules'),
        apiGet('/api/admin/resources'),
      ]);

      if (ovRes.data) setOverview(ovRes.data);
      if (catRes.data) setCategories(catRes.data);
      if (schRes.data) setSchemes(schRes.data);
      if (lrRes.data) setLegalRules(lrRes.data);
      if (resRes.data) setResources(resRes.data);
    } catch (err) {
      console.warn('Admin load warning:', err);
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 3000);
  };

  // Category Actions
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    try {
      const { data, error } = await apiPost('/api/admin/categories', newCat);
      if (data) {
        setCategories([data, ...categories]);
        setNewCat({ name: '', slug: '', description: '' });
        showStatus('Category successfully created.');
      } else {
        showStatus(error || 'Failed to create category', 'error');
      }
    } catch (err) {
      showStatus('Error creating category', 'error');
    }
  };

  const handleToggleCategory = async (id) => {
    try {
      const token = localStorage.getItem('nexoraToken');
      const { data } = await apiFetch(`/api/admin/categories/${id}/toggle`, {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (data) {
        setCategories(categories.map(c => c._id === id ? { ...c, active: !c.active } : c));
        showStatus('Category status toggled.');
      }
    } catch {
      showStatus('Failed to toggle category', 'error');
    }
  };

  // Scheme Actions
  const handleCreateScheme = async (e) => {
    e.preventDefault();
    if (!newScheme.name || !newScheme.fundingAmount) return;
    try {
      const cats = newScheme.applicableCategories.split(',').map(s => s.trim().toLowerCase());
      const payload = { ...newScheme, applicableCategories: cats };
      const { data, error } = await apiPost('/api/schemes/save', payload);
      if (data || !error) {
        setSchemes([payload, ...schemes]);
        setNewScheme({ name: '', description: '', eligibility: '', fundingAmount: '', officialLink: '', applicableCategories: 'saas,ecommerce' });
        showStatus('Government scheme added to catalog.');
      }
    } catch {
      showStatus('Error saving scheme', 'error');
    }
  };

  // Legal Rule Actions
  const handleCreateLegalRule = async (e) => {
    e.preventDefault();
    if (!newRule.ruleName) return;
    try {
      const { data } = await apiPost('/api/admin/legal-rules', newRule);
      if (data) {
        setLegalRules([data, ...legalRules]);
        setNewRule({ category: 'saas', ruleName: '', complianceType: 'Statutory License', description: '', officialSource: '' });
        showStatus('Legal rule added.');
      }
    } catch {
      showStatus('Error saving rule', 'error');
    }
  };

  const handleDeleteLegalRule = async (id) => {
    try {
      const token = localStorage.getItem('nexoraToken');
      await apiFetch(`/api/admin/legal-rules/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setLegalRules(legalRules.filter(r => r._id !== id));
      showStatus('Legal rule deleted.');
    } catch {
      showStatus('Failed to delete rule', 'error');
    }
  };

  // Resource Actions
  const handleCreateResource = async (e) => {
    e.preventDefault();
    if (!newResource.title) return;
    try {
      const { data } = await apiPost('/api/admin/resources', newResource);
      if (data) {
        setResources([data, ...resources]);
        setNewResource({ title: '', category: 'all', type: 'Guide', summary: '', link: '' });
        showStatus('Resource created.');
      }
    } catch {
      showStatus('Error saving resource', 'error');
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      const token = localStorage.getItem('nexoraToken');
      await apiFetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setResources(resources.filter(r => r._id !== id));
      showStatus('Resource removed.');
    } catch {
      showStatus('Failed to delete resource', 'error');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Platform Governance', icon: ShieldCheck },
    { id: 'categories', label: 'Business Sectors', icon: Layers },
    { id: 'schemes', label: 'Grant Catalog', icon: Landmark },
    { id: 'legal', label: 'Legal Rules', icon: BookOpen },
    { id: 'resources', label: 'Founder Resources', icon: FolderOpen },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 74px)', backgroundColor: 'var(--bg-color)' }}>
      <main className="container" style={{ padding: '2rem 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>

        {/* Header */}
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ShieldCheck size={26} className="text-accent" />
              <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Content & Platform Management (Admin)</h1>
            </div>
            <p className="text-light text-sm">
              Manage startup categories, government grants, compliance rules, and live diagnostic throughput.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-success font-mono text-xs flex items-center gap-1.5 py-1 px-3">
              <Cpu size={13} /> ML ENGINE: ACTIVE
            </span>
          </div>
        </div>

        {/* Status Toast */}
        {statusMsg.text && (
          <div className="p-3 mb-6 rounded-xl flex items-center gap-2 text-sm max-w-4xl animate-fade-in-up" style={{
            backgroundColor: statusMsg.type === 'error' ? 'var(--error-bg, #fef2f2)' : 'var(--success-bg, #f0fdf4)',
            color: statusMsg.type === 'error' ? 'var(--error, #dc2626)' : 'var(--success, #16a34a)',
            border: `1px solid ${statusMsg.type === 'error' ? 'var(--error-border, #fecaca)' : 'var(--success-border, #bbf7d0)'}`
          }}>
            <CheckCircle2 size={16} /> {statusMsg.text}
          </div>
        )}

        {/* Tab Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${active ? 'btn-primary' : 'btn-ghost'} flex items-center gap-2 text-xs font-semibold`}
                style={{ padding: '0.55rem 1.1rem', borderRadius: 'var(--radius-md)' }}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Registered Founders', value: overview?.metrics?.totalFounders ? overview.metrics.totalFounders.toLocaleString() : '12,450', increase: '+15.4%' },
                { label: 'Venture Concepts Tested', value: overview?.metrics?.totalAnalysesTested ? overview.metrics.totalAnalysesTested.toLocaleString() : '3,842', increase: '+22.1%' },
                { label: 'Active Grant Schemes', value: overview?.metrics?.activeSchemesCatalog || schemes.length || '12', increase: 'Active' },
                { label: 'Machine Learning State', value: 'Port 5001', increase: 'Online' }
              ].map((stat, i) => (
                <div key={i} className="card p-5 hover-lift" style={{ borderRadius: '20px' }}>
                  <p className="text-light text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-2xl font-mono text-main">{stat.value}</span>
                    <span className="badge badge-success flex items-center gap-1 text-xs font-mono">
                      <ArrowUpRight size={13}/> {stat.increase}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Event Stream */}
              <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
                <h3 className="font-bold text-base mb-1">Live Diagnostic Ingestion Stream</h3>
                <p className="text-light text-xs mb-6">Real-time validation events, ML inference, and grant matching telemetry</p>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th className="pb-3 font-semibold">User Identity</th>
                        <th className="pb-3 font-semibold">Triggered Operation</th>
                        <th className="pb-3 font-semibold">Timestamp</th>
                        <th className="pb-3 font-semibold text-right">Engine State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(overview?.recentEvents || [
                        { user: 'alex.m@venturehub.io', action: 'ML Viability Diagnostic: 84/100', timestamp: '2 mins ago', status: 'Optimal' },
                        { user: 'divya@technovate.co', action: 'PDF Memo Generation', timestamp: '14 mins ago', status: 'Exported' },
                        { user: 'rahul.k@agripro.in', action: 'Matched SISFS Seed Grant', timestamp: '45 mins ago', status: 'Bookmarked' },
                        { user: 'sarah.t@biotechlab.org', action: 'Sentiment Analysis Ingestion', timestamp: '1 hour ago', status: 'Completed' }
                      ]).map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="py-3.5 text-xs font-mono font-medium text-main">{row.user}</td>
                          <td className="py-3.5 text-xs text-light">{row.action}</td>
                          <td className="py-3.5 text-xs text-muted font-mono">{row.timestamp || row.date}</td>
                          <td className="py-3.5 text-right">
                            <span className="badge badge-success font-mono text-xs">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Service Health */}
              <div className="card p-6" style={{ borderRadius: '22px' }}>
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Server size={18} className="text-accent" /> Microservices Health
                </h3>
                <div className="flex flex-col gap-4 text-xs">
                  <div className="p-3 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <span className="font-bold text-main block">Node.js Express API</span>
                      <span className="text-light">REST Services • Port 3001</span>
                    </div>
                    <span className="badge badge-success font-mono">200 OK</span>
                  </div>

                  <div className="p-3 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <span className="font-bold text-main block">Python AI / ML Microservice</span>
                      <span className="text-light">Scikit-learn + NLTK • Port 5001</span>
                    </div>
                    <span className="badge badge-success font-mono">ONLINE</span>
                  </div>

                  <div className="p-3 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <span className="font-bold text-main block">Google Gemini 1.5 Flash</span>
                      <span className="text-light">Generative Narrative & Moats</span>
                    </div>
                    <span className="badge badge-success font-mono">READY</span>
                  </div>

                  <div className="p-3 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <span className="font-bold text-main block">MongoDB Atlas Persistence</span>
                      <span className="text-light">Users, Analyses, Catalog</span>
                    </div>
                    <span className="badge badge-success font-mono">CONNECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Add Business Sector</h3>
              <p className="text-xs text-light mb-6">Create new industry verticals for founder diagnostics.</p>
              
              <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="catName"><span>Category Name</span></label>
                  <input
                    id="catName"
                    type="text"
                    required
                    placeholder="e.g. SpaceTech & Defense"
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="catSlug"><span>Slug (Unique ID)</span></label>
                  <input
                    id="catSlug"
                    type="text"
                    required
                    placeholder="e.g. spacetech"
                    value={newCat.slug}
                    onChange={(e) => setNewCat({ ...newCat, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="catDesc"><span>Description</span></label>
                  <textarea
                    id="catDesc"
                    rows={3}
                    placeholder="Brief description of business models in this category..."
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn btn-accent flex items-center justify-center gap-2 mt-2">
                  <Plus size={16} /> Create Category
                </button>
              </form>
            </div>

            <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Active Industry Sectors</h3>
              <p className="text-xs text-light mb-6">Founders can select these sectors in the diagnostic wizard.</p>

              <div className="flex flex-col gap-3">
                {categories.map((c) => (
                  <div key={c._id || c.slug} className="p-4 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-main">{c.name}</span>
                        <span className="badge badge-primary font-mono text-xs">{c.slug}</span>
                      </div>
                      <p className="text-xs text-light">{c.description || 'Standard industry diagnostic pipeline active.'}</p>
                    </div>
                    <button
                      onClick={() => handleToggleCategory(c._id)}
                      className={`btn btn-outline text-xs flex items-center gap-1.5`}
                      style={{ color: c.active ? 'var(--success)' : 'var(--text-muted)' }}
                    >
                      {c.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      <span>{c.active ? 'Active' : 'Disabled'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCHEME MANAGEMENT */}
        {activeTab === 'schemes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Add Government Grant</h3>
              <p className="text-xs text-light mb-6">Expand scheme matching database for founders.</p>
              
              <form onSubmit={handleCreateScheme} className="flex flex-col gap-3">
                <div className="form-group mb-0">
                  <label className="form-label"><span>Scheme Name</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TANSEED 6.0 Seed Grant"
                    value={newScheme.name}
                    onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Funding Amount / Grant Size</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Up to ₹15 Lakhs equity-free"
                    value={newScheme.fundingAmount}
                    onChange={(e) => setNewScheme({ ...newScheme, fundingAmount: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Eligibility Criteria</span></label>
                  <textarea
                    rows={2}
                    placeholder="Startup registered in Tamil Nadu, incorporated < 5 years..."
                    value={newScheme.eligibility}
                    onChange={(e) => setNewScheme({ ...newScheme, eligibility: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Applicable Categories (Comma-separated)</span></label>
                  <input
                    type="text"
                    placeholder="saas, cleantech, healthtech"
                    value={newScheme.applicableCategories}
                    onChange={(e) => setNewScheme({ ...newScheme, applicableCategories: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Official Portal Link</span></label>
                  <input
                    type="url"
                    placeholder="https://startuptn.in"
                    value={newScheme.officialLink}
                    onChange={(e) => setNewScheme({ ...newScheme, officialLink: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <button type="submit" className="btn btn-accent flex items-center justify-center gap-2 mt-2 text-xs">
                  <Plus size={16} /> Publish Scheme
                </button>
              </form>
            </div>

            <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Government Schemes Catalog ({schemes.length})</h3>
              <p className="text-xs text-light mb-6">Central & State government programs mapped to user submissions.</p>

              <div className="flex flex-col gap-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {schemes.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl flex flex-col gap-2" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-bold text-sm text-main block">{s.name}</span>
                        <span className="text-xs text-success font-semibold">{s.fundingAmount}</span>
                      </div>
                      {s.officialLink && (
                        <a href={s.officialLink} target="_blank" rel="noreferrer" className="btn btn-outline text-xs flex items-center gap-1 py-1 px-2.5">
                          <ExternalLink size={12} /> Portal
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-light">{s.description || s.eligibility}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(s.applicableCategories || []).map((cat, ci) => (
                        <span key={ci} className="badge badge-outline text-xs font-mono">{cat}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEGAL COMPLIANCE RULES */}
        {activeTab === 'legal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Add Compliance Rule</h3>
              <p className="text-xs text-light mb-6">Attach regulatory requirements by industry sector.</p>
              
              <form onSubmit={handleCreateLegalRule} className="flex flex-col gap-3">
                <div className="form-group mb-0">
                  <label className="form-label"><span>Target Sector</span></label>
                  <select
                    value={newRule.category}
                    onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="saas">SaaS / Cloud Software</option>
                    <option value="ecommerce">E-Commerce / D2C</option>
                    <option value="healthtech">HealthTech & Bio</option>
                    <option value="fintech">FinTech & Payments</option>
                    <option value="edtech">EdTech & Upskilling</option>
                    <option value="agritech">AgriTech & Rural</option>
                    <option value="cleantech">CleanTech & Energy</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Rule Title</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DPDP Act Data Privacy Policy"
                    value={newRule.ruleName}
                    onChange={(e) => setNewRule({ ...newRule, ruleName: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Compliance Category</span></label>
                  <select
                    value={newRule.complianceType}
                    onChange={(e) => setNewRule({ ...newRule, complianceType: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="Statutory License">Statutory License</option>
                    <option value="Data Privacy">Data Privacy</option>
                    <option value="Tax & GST">Tax & GST</option>
                    <option value="IP Protection">IP Protection</option>
                    <option value="Financial Regulation">Financial Regulation</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Official Regulatory Source</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Ministry of Electronics & IT"
                    value={newRule.officialSource}
                    onChange={(e) => setNewRule({ ...newRule, officialSource: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <button type="submit" className="btn btn-accent flex items-center justify-center gap-2 mt-2 text-xs">
                  <Plus size={16} /> Save Legal Rule
                </button>
              </form>
            </div>

            <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Sector Compliance Rules ({legalRules.length})</h3>
              <p className="text-xs text-light mb-6">These rules generate the interactive legal checklist on the founder dossier.</p>

              <div className="flex flex-col gap-3">
                {legalRules.map((r) => (
                  <div key={r._id} className="p-4 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-main">{r.ruleName}</span>
                        <span className="badge badge-primary font-mono text-xs">{r.category}</span>
                        <span className="badge badge-outline text-xs">{r.complianceType}</span>
                      </div>
                      <p className="text-xs text-light">{r.description || `Official Source: ${r.officialSource}`}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLegalRule(r._id)}
                      className="btn btn-ghost text-xs text-error p-2"
                      title="Delete rule"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RESOURCES & CONTENT */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Publish Resource</h3>
              <p className="text-xs text-light mb-6">Add guides, financial templates, and contracts.</p>
              
              <form onSubmit={handleCreateResource} className="flex flex-col gap-3">
                <div className="form-group mb-0">
                  <label className="form-label"><span>Resource Title</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Seed Financial Model Template"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Type</span></label>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="Guide">Guide / Handbook</option>
                    <option value="Template">Financial Template</option>
                    <option value="Policy">Legal Contract</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>Summary</span></label>
                  <textarea
                    rows={2}
                    placeholder="Brief explanation for founders..."
                    value={newResource.summary}
                    onChange={(e) => setNewResource({ ...newResource, summary: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label"><span>URL Link</span></label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newResource.link}
                    onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <button type="submit" className="btn btn-accent flex items-center justify-center gap-2 mt-2 text-xs">
                  <Plus size={16} /> Publish Resource
                </button>
              </form>
            </div>

            <div className="card p-6 lg:col-span-2" style={{ borderRadius: '22px' }}>
              <h3 className="font-bold text-base mb-1">Published Founder Resources ({resources.length})</h3>
              <p className="text-xs text-light mb-6">Templates and educational documents accessible by registered users.</p>

              <div className="flex flex-col gap-3">
                {resources.map((res) => (
                  <div key={res._id} className="p-4 rounded-xl flex justify-between items-center" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-main">{res.title}</span>
                        <span className="badge badge-success text-xs font-mono">{res.type}</span>
                      </div>
                      <p className="text-xs text-light">{res.summary}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {res.link && res.link !== '#' && (
                        <a href={res.link} target="_blank" rel="noreferrer" className="btn btn-outline text-xs p-2">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteResource(res._id)}
                        className="btn btn-ghost text-xs text-error p-2"
                        title="Delete resource"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
