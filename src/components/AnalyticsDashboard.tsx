import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Target, Users, 
  ChevronDown, Calendar, Filter, Settings, HelpCircle,
  Bell, Edit3, Download, RefreshCw
} from 'lucide-react';

// Types
interface MetricData {
  value: string;
  change: number;
  period: string;
}

interface ChartDataPoint {
  date: string;
  revenue: number;
  costs: number;
  roi: number;
  profit: number;
  mrr?: number;
  arr?: number;
}

interface CohortData {
  cohort: string;
  startRevenue: number;
  periods: { [key: string]: number };
  total: number;
  arpu: number;
  arppu: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'predictions' | 'cohorts' | 'targets'>('performance');
  const [dateRange, setDateRange] = useState('01.07.2025 - 20.07.2025');
  const [selectedCountries, setSelectedCountries] = useState('All Countries');
  const [selectedCampaigns, setSelectedCampaigns] = useState('All Campaigns');
  const [selectedPlatforms, setSelectedPlatforms] = useState('All Platforms');

  // Sample data
  const performanceMetrics = {
    revenue: { value: '$8,582.65', change: 12.5, period: 'vs last period' },
    costs: { value: '$12,820.34', change: -3.2, period: 'vs last period' },
    profit: { value: '-$4,237.69', change: -33.05, period: 'vs last period' },
    roi: { value: '-33.05%', change: -16.44, period: 'vs last period' }
  };

  const moneyMetrics = {
    revenue: { value: '$45.2k', trend: 'up' },
    mrr: { value: '$39.2k', trend: 'stable' },
    arr: { value: '$469.8k', trend: 'up' }
  };

  const arpuMetrics = {
    arpu: { value: '$0.36', trend: 'up' },
    arppu: { value: '$4', trend: 'stable' },
    arpas: { value: '$4', trend: 'stable' }
  };

  // Chart data
  const chartData: ChartDataPoint[] = [
    { date: '01.07', revenue: 600, costs: 1200, roi: -50, profit: -600 },
    { date: '02.07', revenue: 550, costs: 600, roi: -8, profit: -50 },
    { date: '03.07', revenue: 600, costs: 620, roi: -3, profit: -20 },
    { date: '04.07', revenue: 580, costs: 600, roi: -3, profit: -20 },
    { date: '05.07', revenue: 540, costs: 580, roi: -7, profit: -40 },
    { date: '06.07', revenue: 550, costs: 500, roi: 10, profit: 50 },
    { date: '07.07', revenue: 560, costs: 520, roi: 8, profit: 40 },
    { date: '08.07', revenue: 540, costs: 480, roi: 12, profit: 60 },
    { date: '09.07', revenue: 570, costs: 500, roi: 14, profit: 70 },
    { date: '10.07', revenue: 540, costs: 480, roi: 12, profit: 60 },
    { date: '11.07', revenue: 520, costs: 460, roi: 13, profit: 60 },
    { date: '12.07', revenue: 510, costs: 450, roi: 13, profit: 60 },
    { date: '13.07', revenue: 520, costs: 460, roi: 13, profit: 60 },
    { date: '14.07', revenue: 500, costs: 1800, roi: -72, profit: -1300 },
    { date: '15.07', revenue: 1200, costs: 1850, roi: -35, profit: -650 },
    { date: '16.07', revenue: 1250, costs: 1900, roi: -34, profit: -650 },
    { date: '17.07', revenue: 1300, costs: 1950, roi: -33, profit: -650 },
    { date: '18.07', revenue: 1350, costs: 2000, roi: -32, profit: -650 },
    { date: '19.07', revenue: 1400, costs: 2050, roi: -32, profit: -650 },
    { date: '20.07', revenue: 1450, costs: 2100, roi: -31, profit: -650 }
  ];

  // Cohort data
  const cohortData: CohortData[] = [
    { cohort: '1 Jun 2025', startRevenue: 65.4, periods: { P2: 92, P3: 28.5, P4: 12.7 }, total: 199, arpu: 0.09, arppu: 1.84 },
    { cohort: '2 Jun 2025', startRevenue: 651, periods: { P2: 752, P3: 331, P4: 192 }, total: 2100, arpu: 0.14, arppu: 3.49 },
    { cohort: '9 Jun 2025', startRevenue: 663, periods: { P2: 1260, P3: 553, P4: 293 }, total: 3220, arpu: 0.19, arppu: 3.6 },
    { cohort: '16 Jun 2025', startRevenue: 705, periods: { P2: 1100, P3: 568, P4: 344 }, total: 3090, arpu: 0.2, arppu: 4.08 },
    { cohort: '23 Jun 2025', startRevenue: 593, periods: { P2: 850, P3: 409, P4: 184 }, total: 2160, arpu: 0.13, arppu: 2.52 },
    { cohort: '30 Jun 2025', startRevenue: 1180, periods: { P2: 1880, P3: 668, P4: 334 }, total: 4130, arpu: 0.17, arppu: 2.43 },
    { cohort: '7 Jul 2025', startRevenue: 828, periods: { P2: 1270, P3: 307, P4: 40.7 }, total: 2490, arpu: 0.11, arppu: 2.04 },
    { cohort: '14 Jul 2025', startRevenue: 876, periods: { P2: 955, P3: 216 }, total: 2050, arpu: 0.09, arppu: 2.16 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold">GoLive Android</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Help</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">App settings</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Account</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('performance')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'performance' 
                ? 'border-purple-600 text-purple-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'predictions' 
                ? 'border-purple-600 text-purple-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Early Predictions
          </button>
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'cohorts' 
                ? 'border-purple-600 text-purple-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Cohort Analysis
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'targets' 
                ? 'border-purple-600 text-purple-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Targets
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'performance' && (
          <>
            {/* Performance Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <MetricCard 
                title="Total Revenue (After VAT)"
                value={performanceMetrics.revenue.value}
                change={performanceMetrics.revenue.change}
                period={performanceMetrics.revenue.period}
                icon="$"
              />
              <MetricCard 
                title="Total Costs"
                value={performanceMetrics.costs.value}
                change={performanceMetrics.costs.change}
                period={performanceMetrics.costs.period}
                icon="@"
              />
              <MetricCard 
                title="Profit"
                value={performanceMetrics.profit.value}
                change={performanceMetrics.profit.change}
                period={performanceMetrics.profit.period}
                icon="%"
              />
              <MetricCard 
                title="ROI"
                value={performanceMetrics.roi.value}
                change={performanceMetrics.roi.change}
                period={performanceMetrics.roi.period}
                icon="%"
              />
            </div>

            {/* Money Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Money</h3>
              <div className="grid grid-cols-3 gap-4">
                <ChartCard title="Revenue" value={moneyMetrics.revenue.value} data={chartData} dataKey="revenue" />
                <ChartCard title="MRR" value={moneyMetrics.mrr.value} data={chartData} dataKey="revenue" />
                <ChartCard title="ARR" value={moneyMetrics.arr.value} data={chartData} dataKey="revenue" />
              </div>
            </div>

            {/* ARPU Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">ARPU</h3>
              <div className="grid grid-cols-3 gap-4">
                <ChartCard title="ARPU" value={arpuMetrics.arpu.value} data={chartData} dataKey="revenue" small />
                <ChartCard title="ARPPU" value={arpuMetrics.arppu.value} data={chartData} dataKey="revenue" small />
                <ChartCard title="ARPAS" value={arpuMetrics.arpas.value} data={chartData} dataKey="revenue" small />
              </div>
            </div>
          </>
        )}

        {activeTab === 'predictions' && (
          <>
            {/* Filters & Settings */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filters & Settings</h3>
              <div className="flex items-center space-x-4 mb-4">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
                  Show Countries
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                  Show Campaigns
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <FilterTag label="Show Countries" />
                <FilterTag label="Distribute Unknowns" removable />
                <FilterTag label="Distribute Direct" removable />
                <FilterTag label="Show VAT" removable />
                <FilterTag label="Show Early Predicted" removable />
                <FilterTag label="Show Campaigns" />
                <FilterTag label="Show Predicted Revenue" removable />
                <FilterTag label="Show P Count" removable />
                <FilterTag label="Show P+ Churn" removable />
                <FilterTag label="Hide All P+" />
                <FilterTag label="Show Platform" removable />
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">All Countries</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">All Campaigns</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">All Platforms</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2 ml-auto">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{dateRange}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Clear Saved Settings
                </button>
              </div>
            </div>

            {/* Performance Metrics Over Time */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Performance Metrics Over Time</h3>
              <p className="text-sm text-gray-500 mb-4">Overall performance metrics</p>
              <div className="flex items-center space-x-4 mb-4">
                <LegendItem color="bg-red-500" label="Costs" />
                <LegendItem color="bg-green-500" label="Revenue" />
                <LegendItem color="bg-blue-500" label="ROI (%)" />
                <LegendItem color="bg-gray-400" label="Previous Period" />
              </div>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <span className="text-gray-400">Chart Area</span>
              </div>
            </div>

            {/* Campaign Performance Predictions */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Campaign Performance Predictions</h3>
                <p className="text-sm text-gray-500">AI-powered predictions and recommendations with country breakdown</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Date/Campaign</th>
                      <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Platform</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Revenue Activation Count</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Revenue Activation Purchase Count</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Total Revenue</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Profit</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">ROI (%)</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Predicted ROI (%)</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Total Predicted Revenue</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">CPA</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">CPU</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">LTV</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Predicted LTV</th>
                      <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">ARPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="font-semibold bg-gray-50">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3 text-right">2541</td>
                      <td className="px-4 py-3 text-right">1171</td>
                      <td className="px-4 py-3 text-right">$1265716</td>
                      <td className="px-4 py-3 text-right">$10819.39</td>
                      <td className="px-4 py-3 text-right text-red-600">-$1837.77</td>
                      <td className="px-4 py-3 text-right text-red-600">-14.52%</td>
                      <td className="px-4 py-3 text-right text-red-600">-12.15%</td>
                      <td className="px-4 py-3 text-right">$11119.68</td>
                      <td className="px-4 py-3 text-right">$10.81</td>
                      <td className="px-4 py-3 text-right">$4.08</td>
                      <td className="px-4 py-3 text-right">3.47</td>
                      <td className="px-4 py-3 text-right">3.57</td>
                      <td className="px-4 py-3 text-right">3.47</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'cohorts' && (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cohort Analysis</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">1 Jun - 27 Jul Week</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="text-sm text-gray-600">All products</button>
                  <button className="text-sm text-gray-600">By Data</button>
                  <button className="text-sm text-gray-600">By Company</button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-sm">
                    Add filter
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Revenue | Ab</span>
                <span className="text-sm text-gray-600">by renewals</span>
                <button className="px-3 py-1 bg-gray-900 text-white rounded text-sm">
                  by days % Pro
                </button>
                <button className="p-1">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button className="text-sm text-gray-600">Columns</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Cohort</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Revenue on start</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P2</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P3</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P4</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P5</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P6</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P7</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P8</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P9</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">P10</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Total revenue</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">ARPU</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">ARPPU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="font-semibold bg-gray-50">
                    <td className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right bg-purple-100">$6.43K</td>
                    <td className="px-4 py-3 text-right bg-purple-100">$8.38K</td>
                    <td className="px-4 py-3 text-right bg-purple-100">$3.08K</td>
                    <td className="px-4 py-3 text-right bg-purple-100">$1.40K</td>
                    <td className="px-4 py-3 text-right">$699</td>
                    <td className="px-4 py-3 text-right">$341</td>
                    <td className="px-4 py-3 text-right">$163</td>
                    <td className="px-4 py-3 text-right">$15.3</td>
                    <td className="px-4 py-3 text-right">$0</td>
                    <td className="px-4 py-3 text-right">$0</td>
                    <td className="px-4 py-3 text-right bg-green-100">$20.50K</td>
                    <td className="px-4 py-3 text-right">$0.14</td>
                    <td className="px-4 py-3 text-right">$2.51</td>
                  </tr>
                  {cohortData.map((cohort, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center">
                        <span className="text-gray-400 mr-2">△</span>
                        {cohort.cohort}
                        <span className="text-gray-400 text-xs ml-2">2 195</span>
                      </td>
                      <td className="px-4 py-3 text-right">${cohort.startRevenue}</td>
                      <td className="px-4 py-3 text-right">${cohort.periods.P2 || 0}</td>
                      <td className="px-4 py-3 text-right">${cohort.periods.P3 || 0}</td>
                      <td className="px-4 py-3 text-right">${cohort.periods.P4 || 0}</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">$0</td>
                      <td className="px-4 py-3 text-right">${cohort.total}</td>
                      <td className="px-4 py-3 text-right">${cohort.arpu}</td>
                      <td className="px-4 py-3 text-right">${cohort.arppu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Helper Components
const MetricCard: React.FC<{
  title: string;
  value: string;
  change: number;
  period: string;
  icon: string;
}> = ({ title, value, change, period, icon }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-500 uppercase">{title}</span>
      <span className="text-gray-400">{icon}</span>
    </div>
    <div className="text-2xl font-bold mb-2">{value}</div>
    <div className="flex items-center space-x-1 text-sm">
      {change > 0 ? (
        <TrendingUp className="w-4 h-4 text-green-500" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500" />
      )}
      <span className={change > 0 ? 'text-green-500' : 'text-red-500'}>
        {change > 0 ? '+' : ''}{change}%
      </span>
      <span className="text-gray-400">{period}</span>
    </div>
  </div>
);

const ChartCard: React.FC<{
  title: string;
  value: string;
  data: ChartDataPoint[];
  dataKey: string;
  small?: boolean;
}> = ({ title, value, small }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-600">{title}</span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
    <div className={`${small ? 'text-xl' : 'text-2xl'} font-bold mb-4`}>{value}</div>
    <div className="h-20 bg-gradient-to-r from-purple-100 to-purple-50 rounded">
      {/* Simplified chart representation */}
      <svg className="w-full h-full">
        <polyline
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          points="0,40 30,35 60,38 90,30 120,32 150,28 180,25 210,20 240,22 270,18"
        />
      </svg>
    </div>
  </div>
);

const FilterTag: React.FC<{ label: string; removable?: boolean }> = ({ label, removable }) => (
  <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
    <span className="text-gray-700">{label}</span>
    {removable && (
      <button className="ml-2 text-gray-400 hover:text-gray-600">
        ×
      </button>
    )}
  </div>
);

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default AnalyticsDashboard;