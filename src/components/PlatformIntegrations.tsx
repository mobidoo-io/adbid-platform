import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap } from 'lucide-react'

const platforms = [
  {
    name: 'Meta',
    description: 'Facebook, Instagram, WhatsApp & Messenger',
    features: ['Campaign Management', 'Audience Insights', 'Creative Testing', 'Pixel Tracking'],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    logo: 'f',
  },
  {
    name: 'Google Ads',
    description: 'Search, Display, YouTube & Shopping',
    features: ['Keyword Optimization', 'Shopping Campaigns', 'YouTube Ads', 'Smart Bidding'],
    color: 'from-red-500 to-yellow-500',
    bgColor: 'bg-red-50',
    logo: 'G',
  },
  {
    name: 'TikTok',
    description: 'For You Page & TopView Ads',
    features: ['Video Campaigns', 'Spark Ads', 'Collection Ads', 'Dynamic Showcase'],
    color: 'from-black to-gray-800',
    bgColor: 'bg-gray-50',
    logo: '♪',
  },
  {
    name: 'LinkedIn',
    description: 'B2B Marketing & Lead Generation',
    features: ['Sponsored Content', 'Message Ads', 'Lead Gen Forms', 'Account Targeting'],
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    logo: 'in',
  },
  {
    name: 'Twitter',
    description: 'Promoted Tweets & Trends',
    features: ['Promoted Ads', 'Follower Campaigns', 'App Installs', 'Website Traffic'],
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-sky-50',
    logo: 'X',
  },
  {
    name: 'Amazon',
    description: 'Sponsored Products & DSP',
    features: ['Product Ads', 'Brand Stores', 'Video Ads', 'Display Ads'],
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    logo: 'A',
  },
  {
    name: 'Pinterest',
    description: 'Shopping & Idea Pins',
    features: ['Shopping Ads', 'Video Pins', 'Collections', 'Try-On Products'],
    color: 'from-red-600 to-red-800',
    bgColor: 'bg-red-50',
    logo: 'P',
  },
  {
    name: 'Snapchat',
    description: 'Stories & AR Lenses',
    features: ['Snap Ads', 'AR Lenses', 'Collection Ads', 'Story Ads'],
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    logo: '👻',
  },
]

const PlatformIntegrations: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge-purple mb-4">
            All-in-One Platform
          </span>
          <h2 className="text-4xl sm:text-5xl font-ubuntu font-bold mb-4">
            Connect Every{' '}
            <span className="text-primary text-glow-purple">Advertising Channel</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-manrope">
            Unify all your advertising efforts in one powerful dashboard. 
            No more switching between platforms.
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`h-full card-neon`}>
                {/* Platform Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-glow-purple-sm`}>
                    {platform.logo}
                  </div>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>

                {/* Platform Info */}
                <h3 className="text-lg font-bold mb-2 font-ubuntu">{platform.name}</h3>
                <p className="text-sm text-text-secondary mb-4 font-manrope">
                  {platform.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {platform.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-text-secondary rounded-full" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="bg-dark rounded-3xl p-12 text-center border-4 border-accent animate-neon-lime"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <Zap className="w-12 h-12 text-accent mx-auto mb-4 drop-shadow-glow-lime" />
            <h3 className="text-3xl font-bold text-white mb-4 font-ubuntu">
              Stop Platform Hopping. Start Scaling.
            </h3>
            <p className="text-white/80 text-lg mb-8 font-manrope">
              Average customer saves 20+ hours per week by managing all campaigns in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See All Integrations
              </motion.button>
              <motion.button
                className="btn-neon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PlatformIntegrations