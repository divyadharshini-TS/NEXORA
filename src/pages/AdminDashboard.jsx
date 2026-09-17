import React from 'react';
import { 
  Users, FolderOpen, FileBarChart, Landmark, Settings, 
  Activity, ArrowUpRight, ShieldCheck
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 86px)' }}>
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck size={26} className="text-primary" />
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Platform Governance & Analytics</h1>
          </div>
          <p className="text-light text-sm">System performance, cohort conversion rates, and global venture throughput.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Registered Founders', value: '12,450', increase: '+15.4%' },
            { label: 'Venture Concepts Tested', value: '3,842', increase: '+22.1%' },
            { label: 'Dossiers Exported', value: '9,211', increase: '+18.0%' },
            { label: 'Active Sessions (24h)', value: '1,120', increase: '+5.2%' }
          ].map((stat, i) => (
            <div key={i} className="card p-6 hover-lift" style={{ borderRadius: '20px' }}>
              <p className="text-light text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
              <div className="flex justify-between items-baseline">
                <span className="font-extrabold text-2xl text-primary">{stat.value}</span>
                <span className="badge badge-success flex items-center gap-1 text-xs">
                  <ArrowUpRight size={13}/> {stat.increase}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-7 shadow-sm" style={{ borderRadius: '22px' }}>
          <h3 className="font-bold text-lg mb-1">Real-time Platform Activity</h3>
          <p className="text-light text-xs mb-6">Recent user interactions, grant matches, and report triggers</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-light)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Action Trigger</th>
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold">Diagnostic State</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: 'alex.m@venturehub.io', action: 'Analyzed Idea: EcoBox Packaging', date: '2 mins ago', status: 'Completed' },
                  { user: 'divya@technovate.co', action: 'Generated Full PDF Dossier', date: '14 mins ago', status: 'Completed' },
                  { user: 'rahul.k@agripro.in', action: 'Bookmarked Startup India Seed Fund', date: '45 mins ago', status: 'Bookmarked' },
                  { user: 'sarah.lin@nexora.ai', action: 'Created Verified Workspace', date: '2 hours ago', status: 'Completed' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.88rem' }}>
                    <td className="py-4 font-medium text-primary">{row.user}</td>
                    <td className="py-4 text-light">{row.action}</td>
                    <td className="py-4 text-light text-xs">{row.date}</td>
                    <td className="py-4">
                      <span className={`badge ${row.status === 'Completed' ? 'badge-success' : 'badge-primary'}`}>
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
