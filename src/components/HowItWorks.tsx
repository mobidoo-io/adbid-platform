import React from 'react'
import { motion } from 'framer-motion'
import { Plug, Brain, Zap, BarChart3, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Plug,
    title: 'Connect Your Meta Account',
    description: 'Secure OAuth integration with your Meta Business Manager in 60 seconds',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'AI Analyzes Your Data',
    description: 'Our ML models analyze your historical data to understand patterns and opportunities',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Automated Optimization',
    description: 'Real-time bid adjustments, budget allocation, and audience optimization 24/7',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Track & Scale Success',
    description: 'Monitor performance with advanced analytics and scale winning campaigns',
    color: 'from-green-500 to-emerald-500',
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/30">
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
            <span className="text-sm font-medium">Simple Process</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Get Started in{' '}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From connection to optimization in minutes, not days
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <div className="glass-effect rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 group">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{step.description}</p>

                  {/* Arrow to next step */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <motion.div
          className="mt-16 glass-effect rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                See It in Action
              </h3>
              <p className="text-text-secondary mb-6">
                Watch how Adbid transforms your Meta Ads performance with intelligent automation 
                and real-time optimization.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">No credit card required</div>
                    <div className="text-sm text-text-secondary">Start with a 14-day free trial</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Full access to all features</div>
                    <div className="text-sm text-text-secondary">No limitations during trial</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Cancel anytime</div>
                    <div className="text-sm text-text-secondary">No questions asked</div>
                  </div>
                </li>
              </ul>

              <div className="flex gap-4">
                <button className="btn-primary">
                  Start Free Trial
                </button>
                <button className="btn-secondary">
                  Book a Demo
                </button>
              </div>
            </div>

            {/* Demo Preview */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-2">
                <div className="bg-dark-secondary rounded-xl p-6">
                  {/* Animated Demo UI */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
                      <div className="h-4 bg-success/20 rounded w-20 animate-pulse" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="bg-white/5 rounded-lg p-3"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <div className="h-3 bg-white/10 rounded mb-2" />
                          <div className="h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded" />
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-end justify-between h-32 gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                            animate={{ height: [`${height}%`, `${height + 20}%`, `${height}%`] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-dark rounded-xl px-3 py-2 shadow-xl"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs font-bold text-primary">Live Updates</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-dark rounded-xl px-3 py-2 shadow-xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <span className="text-xs font-bold text-success">Auto-Optimizing</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks