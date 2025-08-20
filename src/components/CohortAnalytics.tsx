import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react'

const cohortData = [
  { week: 'Week 0', retention: 100, revenue: 45, color: '#00D4FF' },
  { week: 'Week 1', retention: 85, revenue: 62, color: '#1877F2' },
  { week: 'Week 2', retention: 72, revenue: 78, color: '#00D4FF' },
  { week: 'Week 3', retention: 65, revenue: 92, color: '#1877F2' },
  { week: 'Week 4', retention: 58, revenue: 105, color: '#00D4FF' },
  { week: 'Week 5', retention: 52, revenue: 118, color: '#1877F2' },
  { week: 'Week 6', retention: 48, revenue: 125, color: '#00D4FF' },
  { week: 'Week 7', retention: 45, revenue: 132, color: '#1877F2' },
]

const CohortAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'retention' | 'revenue'>('retention')
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Advanced Analytics</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Understand Your Users with{' '}
            <span className="gradient-text">Cohort Analysis</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Track user behavior patterns, predict LTV, and optimize campaigns based on real cohort performance data
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Chart */}
          <motion.div
            className="glass-effect rounded-2xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Chart Controls */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Cohort Performance</h3>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedMetric === 'retention'
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedMetric('retention')}
                >
                  Retention
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedMetric === 'revenue'
                      ? 'bg-primary text-white'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedMetric('revenue')}
                >
                  Revenue
                </button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {cohortData.map((week, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 relative group cursor-pointer"
                    onMouseEnter={() => setHoveredWeek(index)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    initial={{ height: 0 }}
                    whileInView={{ 
                      height: `${selectedMetric === 'retention' 
                        ? week.retention 
                        : (week.revenue / 132) * 100}%` 
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div
                      className="w-full h-full rounded-t-lg transition-all duration-300"
                      style={{
                        background: `linear-gradient(180deg, ${week.color} 0%, ${week.color}40 100%)`,
                        opacity: hoveredWeek === index ? 1 : 0.8,
                      }}
                    />
                    
                    {/* Tooltip */}
                    {hoveredWeek === index && (
                      <motion.div
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-dark rounded-lg p-2 text-xs whitespace-nowrap z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="font-bold">{week.week}</div>
                        <div className="text-text-secondary">
                          {selectedMetric === 'retention' 
                            ? `${week.retention}% retained`
                            : `$${week.revenue} LTV`
                          }
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="absolute -bottom-6 inset-x-0 flex justify-between">
                {cohortData.map((week, index) => (
                  <div key={index} className="flex-1 text-center">
                    <span className="text-xs text-text-secondary">
                      {index === 0 ? 'W0' : index}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Legend */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45%</div>
                <div className="text-xs text-text-secondary">D7 Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">$132</div>
                <div className="text-xs text-text-secondary">D30 LTV</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">2.8x</div>
                <div className="text-xs text-text-secondary">LTV/CAC</div>
              </div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Time-Based Cohorts</h4>
                  <p className="text-text-secondary">
                    Group users by install date, first purchase, or custom events to track behavior over time
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Predictive LTV</h4>
                  <p className="text-text-secondary">
                    Machine learning models predict user lifetime value early, helping you optimize CAC
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Segment Analysis</h4>
                  <p className="text-text-secondary">
                    Compare cohorts by acquisition channel, device, location, or any custom attribute
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Revenue Attribution</h4>
                  <p className="text-text-secondary">
                    Track revenue per cohort and identify which campaigns drive the most valuable users
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              className="btn-primary mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Analytics Dashboard
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">15M+</div>
            <div className="text-sm text-text-secondary">Users Analyzed</div>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">92%</div>
            <div className="text-sm text-text-secondary">Prediction Accuracy</div>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">3.5x</div>
            <div className="text-sm text-text-secondary">Avg LTV Increase</div>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-sm text-text-secondary">Real-time Updates</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CohortAnalytics