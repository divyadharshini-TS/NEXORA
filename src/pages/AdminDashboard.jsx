import React from 'react';
import { 
  Users, FolderOpen, FileBarChart, Landmark, Settings, 
  Activity, ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--dark-navy)', color: 'var(--white)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 className="mb-8" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>Admin Panel</h2>
        <div className="flex flex-col gap-2 flex-grow">
          <a href="#" className="flex items-center gap-3 p-3 rounded text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Activity size={20} /> Overview
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded" style={{ color: 'var(--text-light)' }}>
            <Users size={20} /> Users
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded" style={{ color: 'var(--text-light)' }}>
            <FolderOpen size={20} /> Business Categories
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded" style={{ color: 'var(--text-light)' }}>
            <Landmark size={20} /> Government Schemes
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded" style={{ color: 'var(--text-light)' }}>
            <FileBarChart size={20} /> Reports
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded" style={{ color: 'var(--text-light)' }}>
            <Settings size={20} /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8" style={{ backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
        <h1 className="mb-8" style={{ fontSize: '2rem' }}>Platform Analytics</h1>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '12,450', increase: '+15%' },
            { label: 'Business Ideas', value: '3,842', increase: '+22%' },
            { label: 'Reports Generated', value: '9,211', increase: '+18%' },
            { label: 'Active Users (24h)', value: '1,120', increase: '+5%' }
          ].map((stat, i) => (
            <div key={i} className="card">
              <p className="text-light mb-2">{stat.label}</p>
              <div className="flex justify-between items-end">
                <span className="font-bold" style={{ fontSize: '2rem' }}>{stat.value}</span>
                <span className="flex items-center text-success font-medium text-sm"><ArrowUpRight size={16}/> {stat.increase}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="mb-6">Recent Activity</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-light)' }}>
                <th className="pb-3">User</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: 'john.doe@example.com', action: 'Analyzed Idea: EcoBox', date: '2 mins ago', status: 'Completed' },
                { user: 'jane.smith@example.com', action: 'Generated PDF Report', date: '15 mins ago', status: 'Completed' },
                { user: 'mike.jones@example.com', action: 'Applied for Startup India', date: '1 hour ago', status: 'Pending' },
                { user: 'sarah.w@example.com', action: 'Registered Account', date: '3 hours ago', status: 'Completed' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-4 font-medium">{row.user}</td>
                  <td className="py-4">{row.action}</td>
                  <td className="py-4" style={{ color: 'var(--text-light)' }}>{row.date}</td>
                  <td className="py-4">
                    <span style={{ 
                      background: row.status === 'Completed' ? '#dcfce7' : '#fef3c7', 
                      color: row.status === 'Completed' ? 'var(--success)' : '#d97706', 
                      padding: '0.3rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' 
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
