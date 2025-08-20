import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from 'recharts'
import './dashboard.css'

// Данные для графиков
const revenueData = [
  { date: '01', revenue: 2100, sessions: 1200 },
  { date: '02', revenue: 2400, sessions: 1400 },
  { date: '03', revenue: 2200, sessions: 1300 },
  { date: '04', revenue: 2800, sessions: 1600 },
  { date: '05', revenue: 3200, sessions: 1800 },
  { date: '06', revenue: 2900, sessions: 1700 },
  { date: '07', revenue: 3400, sessions: 1900 },
]

const campaignData = [
  { name: 'Facebook', value: 35, color: '#8B5CF6' },
  { name: 'Google', value: 30, color: '#A78BFA' },
  { name: 'TikTok', value: 20, color: '#C4B5FD' },
  { name: 'Instagram', value: 15, color: '#DDD6FE' },
]

// Данные приложений
const applications = [
  { id: 'golive-android', name: 'GoLive Android', icon: 'G', platforms: ['android'], status: 'active', revenue: 3420, growth: 12.3 },
  { id: 'ava-android', name: 'AVA android', icon: 'A', platforms: ['android'], status: 'active', revenue: 2180, growth: -5.2 },
  { id: 'tarot-guru', name: 'Tarot Guru', icon: 'T', platforms: ['ios'], status: 'active', revenue: 1890, growth: 8.7 },
  { id: 'video-gen', name: 'Video gen', icon: 'V', platforms: ['android'], status: 'active', revenue: 1560, growth: 15.4 },
]

const Dashboard = () => {
  const [selectedApp, setSelectedApp] = useState('all')
  const [dateRange, setDateRange] = useState('7d')

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">AdBid Analytics</h1>
            <select 
              className="app-selector"
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
            >
              <option value="all">All Applications</option>
              {applications.map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
          </div>
          <div className="header-right">
            <select 
              className="date-selector"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon purple">
                <span>$</span>
              </div>
              <span className="stat-badge positive">+12.3%</span>
            </div>
            <div className="stat-value">$12,426</div>
            <div className="stat-label">Total Revenue</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon blue">
                <span>👥</span>
              </div>
              <span className="stat-badge positive">+8.1%</span>
            </div>
            <div className="stat-value">23,456</div>
            <div className="stat-label">Active Users</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon green">
                <span>🎯</span>
              </div>
              <span className="stat-badge negative">-2.4%</span>
            </div>
            <div className="stat-value">3.24%</div>
            <div className="stat-label">Conversion Rate</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon orange">
                <span>📈</span>
              </div>
              <span className="stat-badge positive">+18.7%</span>
            </div>
            <div className="stat-value">$0.68</div>
            <div className="stat-label">CPC Average</div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="value">
                  {campaignData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications Table */}
        <div className="table-card">
          <div className="table-header">
            <h3 className="table-title">Active Applications</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Platform</th>
                  <th>Status</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="app-info">
                        <div className="app-icon">{app.icon}</div>
                        <span className="app-name">{app.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="platform-badges">
                        {app.platforms.map(platform => (
                          <span key={platform} className="platform-badge">
                            {platform === 'android' ? '🤖' : '🍎'} {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="revenue-cell">
                      ${app.revenue?.toLocaleString() || '0'}
                    </td>
                    <td>
                      <span className={`growth-value ${app.growth > 0 ? 'positive' : 'negative'}`}>
                        {app.growth > 0 ? '+' : ''}{app.growth}%
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
  )
}

export default Dashboard