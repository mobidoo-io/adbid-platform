import React from 'react'
import { motion } from 'framer-motion'

const metrics = [
  { label: 'ROAS', value: '3.2x', color: 'text-success' },
  { label: 'CPA', value: '$24', color: 'text-accent' },
  { label: 'CTR', value: '2.4%', color: 'text-primary' },
  { label: 'Conv', value: '4.8%', color: 'text-success' },
  { label: 'Spend', value: '$125k', color: 'text-accent' },
  { label: 'LTV', value: '$156', color: 'text-primary' },
]

const AnimatedMetrics: React.FC = () => {
  return (
    <div className="absolute inset-0">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="absolute glass-effect rounded-lg px-3 py-2 text-sm"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-xs">{metric.label}</span>
            <span className={`font-bold ${metric.color}`}>{metric.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedMetrics