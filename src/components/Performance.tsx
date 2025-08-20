import React from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Clock, Award } from 'lucide-react'

const performanceMetrics = [
  {
    title: 'Campaign Optimization',
    before: '3-5 hours/day',
    after: '15 minutes/day',
    improvement: '95% time saved',
    icon: Clock,
  },
  {
    title: 'Average ROAS',
    before: '1.8x',
    after: '3.2x',
    improvement: '78% increase',
    icon: TrendingUp,
  },
  {
    title: 'Cost Per Acquisition',
    before: '$45',
    after: '$24',
    improvement: '47% reduction',
    icon: Award,
  },
  {
    title: 'Campaign Performance',
    before: '35% profitable',
    after: '82% profitable',
    improvement: '134% better',
    icon: Zap,
  },
]

const Performance: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Real Results</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Performance That{' '}
            <span className="gradient-text">Speaks for Itself</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how our platform transforms Meta Ads performance with real client results
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold">{metric.title}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Before</span>
                  <span className="text-sm font-medium line-through opacity-50">{metric.before}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">After</span>
                  <span className="text-lg font-bold text-success">{metric.after}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-center">
                    <span className="text-xs text-text-secondary">Improvement</span>
                    <div className="text-lg font-bold gradient-text">{metric.improvement}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study */}
        <motion.div
          className="glass-effect rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/20 rounded-full mb-4">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-medium text-success">Case Study</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                How MobileApp Inc. Scaled to $1M Monthly Revenue
              </h3>
              
              <p className="text-text-secondary mb-6">
                "Before Adbid, we were spending 6+ hours daily managing campaigns with mediocre results. 
                Now, our campaigns run on autopilot with 3x better performance. It's been a game-changer 
                for our growth."
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full" />
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-sm text-text-secondary">Head of Growth, MobileApp Inc.</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold gradient-text">3.8x</div>
                  <div className="text-xs text-text-secondary">ROAS Achieved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">$1M+</div>
                  <div className="text-xs text-text-secondary">Monthly Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">-62%</div>
                  <div className="text-xs text-text-secondary">CPA Reduction</div>
                </div>
              </div>
            </div>

            {/* Performance Graph */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 bg-dark-secondary/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Revenue Growth</h4>
                  <span className="text-xs text-success">+245% YoY</span>
                </div>
                
                {/* Animated Chart */}
                <div className="h-48 flex items-end justify-between gap-2">
                  {[40, 45, 52, 48, 65, 72, 88, 95, 110, 125, 145, 180].map((height, index) => (
                    <motion.div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(height / 180) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between mt-4 text-xs text-text-secondary">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-dark rounded-xl px-3 py-2 shadow-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs font-bold text-success">Best Month Ever!</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-4">
            Ready to see similar results for your business?
          </p>
          <button className="btn-primary">
            Start Your Success Story
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Performance