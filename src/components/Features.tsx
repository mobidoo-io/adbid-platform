import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Bell, 
  PiggyBank,
  BarChart3,
  Target,
  Rocket,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Optimization',
    description: 'Machine learning algorithms that continuously improve your campaigns based on real-time data',
    isPurple: true,
  },
  {
    icon: Target,
    title: 'Audience Intelligence',
    description: 'Discover and target high-value audiences with predictive modeling and lookalike expansion',
    isPurple: false,
  },
  {
    icon: Zap,
    title: 'Instant Automation',
    description: 'Set rules once and let our system handle bid adjustments, budget allocation, and scaling',
    isPurple: true,
  },
  {
    icon: BarChart3,
    title: 'Cohort Analytics',
    description: 'Track user behavior patterns across time to understand true LTV and retention metrics',
    isPurple: false,
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified instantly when campaigns need attention or new opportunities arise',
    isPurple: true,
  },
  {
    icon: PiggyBank,
    title: 'Budget Guardian',
    description: 'Prevent overspend and automatically redistribute budget to top-performing campaigns',
    isPurple: false,
  },
]

const stats = [
  { value: '47%', label: 'Lower CPA', icon: TrendingUp },
  { value: '3.8x', label: 'Average ROAS', icon: Award },
  { value: '92%', label: 'Time Saved', icon: Clock },
  { value: '2.5x', label: 'Faster Scaling', icon: Rocket },
]

const Features: React.FC = () => {
  return (
    <section id="product" className="py-16 bg-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge-lime mb-4 inline-block">
            Platform Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Everything You Need to{' '}
            <span className="text-primary text-glow-purple">Dominate Ads</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools that work together to optimize every aspect of your advertising
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={feature.isPurple ? 'card-neon h-full' : 'card-lime h-full'}>
                {/* Icon */}
                <div className={`w-14 h-14 ${feature.isPurple ? 'bg-primary shadow-glow-purple-sm' : 'bg-accent shadow-glow-lime-sm'} rounded-2xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.isPurple ? 'text-white' : 'text-black'}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-dark rounded-3xl p-12 border-4 border-primary animate-neon-purple"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-3">
              Real Results from Real Customers
            </h3>
            <p className="text-gray-400 text-lg">
              Average improvements after 30 days of using Adbid
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3 drop-shadow-glow-lime" />
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features