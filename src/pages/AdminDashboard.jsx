import React from 'react';
import { 
  Users, FolderOpen, FileBarChart, Landmark, Settings, 
  Activity, ArrowUpRight, ShieldCheck, Sparkles, CheckCircle2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 74px)' }}>
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck size={24} className="text-accent" />
            <h1 style={{ fontSize: '1.85rem', letterSpacing: '-0.03em' }}>Platform Governance & System Throughput</h1>
          </div>
          <p className="text-light text-sm">Real-time diagnostic API metrics, hypothesis throughput, and system health.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Registered Founders', value: '12,450', increase: '+15.4%' },
            { label: 'Venture Concepts Tested', value: '3,842', increase: '+22.1%' },
            { label: 'Dossiers Exported', value: '9,211', increase: '+18.0%' },
            { label: 'Active Sessions (24h)', value: '1,120', increase: '+5.2%' }
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

        <div className="card p-6 shadow-sm" style={{ borderRadius: '22px' }}>
          <h3 className="font-bold text-base mb-1">Live Diagnostic Ingestion Stream</h3>
          <p className="text-light text-xs mb-6">Real-time validation events and automated grant lookups</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th className="pb-3 font-semibold">User Identity</th>
                  <th className="pb-3 font-semibold">Triggered Operation</th>
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold text-right">Engine State</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: 'alex.m@venturehub.io', action: 'Diagnostic: EcoBox Packaging', date: '2 mins ago', status: 'Optimal' },
                  { user: 'divya@technovate.co', action: 'PDF Memo Generation', date: '14 mins ago', status: 'Exported' },
                  { user: 'rahul.k@agripro.in', action: 'Matched SISFS Seed Grant', date: '45 mins ago', status: 'Bookmarked' },
                  { user: 'sarah.t@biotechlab.org', action: 'Competitor Blindspot Scan', date: '1 hour ago', status: 'Completed' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3.5 text-xs font-mono font-medium text-main">{row.user}</td>
                    <td className="py-3.5 text-xs text-light">{row.action}</td>
                    <td className="py-3.5 text-xs text-muted font-mono">{row.date}</td>
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
      </main>
    </div>
  );
}
