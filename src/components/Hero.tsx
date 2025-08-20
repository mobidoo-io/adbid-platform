import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, TrendingUp, DollarSign } from 'lucide-react'

interface HeroProps {
  onLoginClick: () => void
}

const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container-max section-padding pt-24 pb-32">
        <div className="relative">
          {/* Floating MRR Cards with neon glow */}
          <motion.div
            className="absolute -left-20 top-0 card-neon w-48 hidden lg:block"
            animate={{ 
              y: [0, -20, 0],
              rotate: [-5, -8, -5]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="text-xs text-gray-500 mb-2">Client: Health & Fitness app</div>
            <div className="text-3xl font-bold text-primary">$15 MRR</div>
            <div className="text-sm text-accent font-bold mt-1">↑ 32% this month</div>
            <div className="mt-3 pt-3 border-t border-primary/20">
              <div className="text-xs text-gray-500">Campaign performance</div>
              <div className="text-sm font-semibold">Meta: 4.2x ROAS</div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-20 top-20 card-lime w-48 hidden lg:block"
            animate={{ 
              y: [0, 20, 0],
              rotate: [5, 8, 5]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            <div className="text-xs text-gray-500 mb-2">Client: E-learning platform</div>
            <div className="text-3xl font-bold text-black">$5M MRR</div>
            <div className="text-sm text-accent font-bold mt-1">↑ 18% this month</div>
            <div className="mt-3 pt-3 border-t border-accent/30">
              <div className="text-xs text-gray-500">Top channel</div>
              <div className="text-sm font-semibold">Google: $2.1M spend</div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 badge-lime mb-6">
                <Zap className="w-4 h-4" />
                <span>For apps, games or e-commerce businesses</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                Scale your ad spend<br />
                <span className="text-primary text-glow-purple">with confidence</span>
              </h1>

              <div className="mb-8">
                <p className="text-xl text-gray-700 mb-2">
                  Our client <span className="text-accent font-black text-glow-lime">scaled theirs to $600k a day</span> within a month,
                </p>
                <p className="text-xl text-gray-700">
                  with 40-60% ROI. Yes, our data is that reliable
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  * and validated by $30M MRR companies
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  className="btn-accent inline-flex items-center justify-center gap-2 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  className="btn-secondary text-lg"
                  onClick={onLoginClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login to Dashboard
                </motion.button>
              </div>

              {/* Trust Indicators with neon badges */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="badge-purple flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold">500+ teams</span>
                </div>
                <div className="badge-lime flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-bold">$2.5B+ managed</span>
                </div>
                <div className="badge-purple flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">90%+ accuracy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dashboard Preview Section with neon border */}
        <motion.div
          className="mt-24 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-primary animate-neon-purple">
            <div className="bg-dark p-8">
              <div className="bg-black/50 backdrop-blur rounded-2xl p-6 border border-primary/30">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-white">
                      <div className="text-sm text-accent">Total Ad Spend</div>
                      <div className="text-3xl font-bold">$425,320</div>
                    </div>
                    <div className="text-white">
                      <div className="text-sm text-accent">Avg ROAS</div>
                      <div className="text-3xl font-bold">4.2x</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="badge-purple">Today</button>
                    <button className="badge-lime">7 Days</button>
                    <button className="badge-purple">30 Days</button>
                  </div>
                </div>

                {/* Platform Performance Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-primary/30 hover:border-primary hover:shadow-glow-purple-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-glow-purple-sm">
                          <span className="text-white text-xs font-bold">f</span>
                        </div>
                        <span className="font-semibold text-white">Meta Ads</span>
                      </div>
                      <span className="badge-lime text-xs">Active</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">$125,430</div>
                    <div className="text-sm text-gray-400">ROAS: 5.2x</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-accent/30 hover:border-accent hover:shadow-glow-lime-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="font-semibold text-white">Google Ads</span>
                      </div>
                      <span className="badge-purple text-xs">Optimizing</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">$189,200</div>
                    <div className="text-sm text-gray-400">ROAS: 3.8x</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-primary/30 hover:border-primary hover:shadow-glow-purple-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center border border-accent">
                          <span className="text-accent text-xs">♪</span>
                        </div>
                        <span className="font-semibold text-white">TikTok Ads</span>
                      </div>
                      <span className="badge-lime text-xs">Scaling</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">$110,690</div>
                    <div className="text-sm text-gray-400">ROAS: 4.5x</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="mt-6 bg-white/5 rounded-xl p-4 border border-accent/20">
                  <div className="flex items-end justify-between h-32 gap-1">
                    {[65, 45, 78, 52, 88, 72, 95, 84, 92, 78, 85, 90].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-accent rounded-t shadow-glow-lime-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero