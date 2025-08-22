import React, { useState } from 'react'
import { Bell, TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Filter, X, Settings, HelpCircle, User, Apple, Smartphone, Plus, Clock, Pause, Play } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from 'recharts'
import './App.css'

// Chart data
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

// Application data
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">AdBid Analytics</h1>
              <select 
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                <option value="all">All Applications</option>
                {applications.map(app => (
                  <option key={app.id} value={app.id}>{app.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                +12.3%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">$12,426</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                +8.1%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">23,456</div>
            <div className="text-sm text-gray-500">Active Users</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-red-600 font-semibold bg-red-100 px-2 py-1 rounded">
                -2.4%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">3.24%</div>
            <div className="text-sm text-gray-500">Conversion Rate</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                +18.7%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">$0.68</div>
            <div className="text-sm text-gray-500">CPC Average</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Active Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-bold">{app.icon}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {app.platforms.map(platform => (
                          <span key={platform} className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {platform === 'android' ? '🤖' : '🍎'} {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${app.revenue?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        app.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
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