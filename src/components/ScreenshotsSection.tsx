import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, BarChart, Zap } from 'lucide-react'

// Import screenshots
import screenshot1 from '../assets/image_2025-08-18_17-28-31.png'
import screenshot2 from '../assets/image_2025-08-18_17-28-46.png'
import screenshot3 from '../assets/image_2025-08-18_17-29-23.png'

const ScreenshotsSection: React.FC = () => {
  const screenshots = [
    {
      image: screenshot1,
      title: 'Campaign Dashboard',
      description: 'Real-time overview of all your campaigns across platforms',
      icon: BarChart,
    },
    {
      image: screenshot2,
      title: 'Advanced Analytics',
      description: 'Deep insights into performance metrics and user behavior',
      icon: Monitor,
    },
    {
      image: screenshot3,
      title: 'Mobile Optimized',
      description: 'Manage campaigns on the go with our mobile interface',
      icon: Smartphone,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 badge-purple mb-6">
            <Zap className="w-4 h-4" />
            <span>Live Platform Preview</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            See Adbid in <span className="text-accent text-glow-lime">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of unified campaign management with our intuitive interface
          </p>
        </motion.div>

        {/* Screenshots Grid */}
        <div className="space-y-20">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Screenshot Image */}
              <div className="flex-1 w-full">
                <motion.div
                  className="relative rounded-3xl overflow-hidden border-4 border-primary shadow-2xl animate-neon-purple"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-auto"
                  />
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute top-4 right-4 badge-lime flex items-center gap-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <screenshot.icon className="w-4 h-4" />
                    <span className="font-bold">Live Demo</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Description */}
              <div className="flex-1 lg:max-w-md">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-glow-purple-sm">
                      <screenshot.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">
                    {screenshot.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {screenshot.description}
                  </p>

                  {/* Feature points */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full shadow-glow-lime-sm"></div>
                      <span className="text-gray-700">Real-time data synchronization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full shadow-glow-lime-sm"></div>
                      <span className="text-gray-700">Cross-platform compatibility</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full shadow-glow-lime-sm"></div>
                      <span className="text-gray-700">Advanced automation features</span>
                    </div>
                  </div>

                  <motion.button
                    className="btn-accent mt-8 inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore This Feature
                    <Zap className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center bg-dark rounded-3xl p-12 border-4 border-accent animate-neon-lime"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to see it in action?
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            Get a personalized demo of Adbid tailored to your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="btn-accent inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Live Demo
              <Monitor className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Video Tour
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScreenshotsSection