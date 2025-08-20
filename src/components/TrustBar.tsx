import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, BarChart3, Target } from 'lucide-react'

const TrustBar: React.FC = () => {
  const [counts, setCounts] = useState({
    adSpend: 0,
    campaigns: 0,
    roas: 0,
    clients: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        adSpend: Math.min(prev.adSpend + 5, 500),
        campaigns: Math.min(prev.campaigns + 50, 10000),
        roas: Math.min(prev.roas + 0.05, 3.2),
        clients: Math.min(prev.clients + 2, 500),
      }))
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta Partner Badge */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 glass-effect rounded-2xl px-8 py-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#1877F2" />
              <path d="M2 17L12 22L22 17" stroke="#1877F2" strokeWidth="2" />
              <path d="M2 12L12 17L22 12" stroke="#00D4FF" strokeWidth="2" />
            </svg>
            <div className="text-left">
              <p className="text-xs text-text-secondary">Official</p>
              <p className="text-lg font-bold">Meta Business Partner</p>
            </div>
          </div>
        </motion.div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold">
                ${counts.adSpend}M+
              </span>
            </div>
            <p className="text-text-secondary">Ad Spend Optimized</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              <span className="text-3xl font-bold">
                {counts.campaigns.toLocaleString()}+
              </span>
            </div>
            <p className="text-text-secondary">Campaigns Managed</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-3xl font-bold">
                {counts.roas.toFixed(1)}x
              </span>
            </div>
            <p className="text-text-secondary">Average ROAS</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold">
                {counts.clients}+
              </span>
            </div>
            <p className="text-text-secondary">Happy Clients</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustBar