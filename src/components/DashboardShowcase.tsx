import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, TrendingUp, BarChart3, Users, Target, Zap } from 'lucide-react'

const DashboardShowcase: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track performance across all ad platforms in one dashboard'
    },
    {
      icon: Target,
      title: 'Campaign Management',
      description: 'Create, edit and optimize campaigns without leaving Adbid'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Deep cohort analysis with predictive LTV modeling'
    },
    {
      icon: Zap,
      title: 'Automated Optimization',
      description: 'AI-powered bid adjustments and budget allocation'
    }
  ]

  return (
    <section id="use-cases" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to <span className="gradient-text">scale profitably</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage all your advertising campaigns from one powerful dashboard. 
            No more switching between platforms.
          </p>
        </motion.div>

        {/* Dashboard Screenshots Grid */}
        <div className="space-y-20">
          {/* Main Dashboard View */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-primary p-1">
                <div className="bg-white rounded-t-3xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Campaign Performance Overview</h3>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Today</button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">7 Days</button>
                        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">30 Days</button>
                      </div>
                    </div>
                    
                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Total Spend</div>
                        <div className="text-2xl font-bold">$425,320</div>
                        <div className="text-sm text-green-600 mt-1">↑ 12.5%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Revenue</div>
                        <div className="text-2xl font-bold">$1,785,344</div>
                        <div className="text-sm text-green-600 mt-1">↑ 24.3%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">ROAS</div>
                        <div className="text-2xl font-bold">4.2x</div>
                        <div className="text-sm text-green-600 mt-1">↑ 0.8x</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Active Campaigns</div>
                        <div className="text-2xl font-bold">47</div>
                        <div className="text-sm text-blue-600 mt-1">12 optimizing</div>
                      </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-gray-50 rounded-xl p-8 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">Interactive Performance Chart</p>
                        <p className="text-sm text-gray-400 mt-1">Real-time data visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Campaign Management View */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Direct Campaign Control</h3>
                <p className="text-gray-600 mb-6">
                  Edit campaigns, adjust budgets, and optimize targeting across all platforms 
                  without leaving Adbid. Our unified interface saves you hours every day.
                </p>
                <ul className="space-y-3">
                  {[
                    'Bulk edit campaigns across platforms',
                    'Real-time synchronization with ad networks',
                    'Automated A/B testing and optimization',
                    'Custom automation rules and triggers'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-6 bg-gradient-primary text-white">
                  <h4 className="font-semibold mb-2">Campaign Editor</h4>
                  <p className="text-sm opacity-90">Make changes across all platforms instantly</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">f</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Summer Sale Campaign</div>
                          <div className="text-xs text-gray-500">Meta Ads • Active</div>
                        </div>
                      </div>
                      <button className="text-primary text-sm font-medium">Edit</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Search - Brand Terms</div>
                          <div className="text-xs text-gray-500">Google Ads • Optimizing</div>
                        </div>
                      </div>
                      <button className="text-primary text-sm font-medium">Edit</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">♪</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Influencer Collab #5</div>
                          <div className="text-xs text-gray-500">TikTok Ads • Scaling</div>
                        </div>
                      </div>
                      <button className="text-primary text-sm font-medium">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to take control of your advertising?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join 500+ growth teams already using Adbid
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-900 transition-colors">
              Start Free Trial
            </button>
            <button className="bg-white border-2 border-gray-300 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardShowcase