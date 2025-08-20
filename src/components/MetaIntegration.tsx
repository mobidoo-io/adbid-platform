import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, Globe, Smartphone, Monitor } from 'lucide-react'

const platforms = [
  { name: 'Facebook', icon: '📘', active: true },
  { name: 'Instagram', icon: '📷', active: true },
  { name: 'Messenger', icon: '💬', active: true },
  { name: 'WhatsApp', icon: '💚', active: true },
  { name: 'Audience Network', icon: '🌐', active: true },
  { name: 'Meta Quest', icon: '🥽', active: false },
]

const MetaIntegration: React.FC = () => {
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
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Official Integration</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Seamless{' '}
            <span className="gradient-text">Meta Integration</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Direct API access to all Meta platforms with enterprise-grade security and compliance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Integration Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center z-10">
                <div className="text-white font-bold text-xl">Adbid</div>
              </div>

              {/* Orbiting Platforms */}
              {platforms.map((platform, index) => {
                const angle = (index * 360) / platforms.length
                const radius = 140
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={index}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      platform.active ? '' : 'opacity-30'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    animate={{
                      scale: platform.active ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <div className="glass-effect rounded-2xl p-4 flex flex-col items-center">
                      <div className="text-3xl mb-1">{platform.icon}</div>
                      <div className="text-xs font-medium whitespace-nowrap">{platform.name}</div>
                    </div>

                    {/* Connection Line */}
                    {platform.active && (
                      <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                          width: Math.abs(x) + 50,
                          height: Math.abs(y) + 50,
                          left: x < 0 ? x / 2 : -25,
                          top: y < 0 ? y / 2 : -25,
                        }}
                      >
                        <line
                          x1="50%"
                          y1="50%"
                          x2={x < 0 ? '100%' : '0%'}
                          y2={y < 0 ? '100%' : '0%'}
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          opacity="0.3"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;10"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <defs>
                          <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#1877F2" />
                            <stop offset="100%" stopColor="#00D4FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Enterprise Security</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      SOC 2 Type II certified with end-to-end encryption and regular security audits
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/20 rounded text-xs">OAuth 2.0</span>
                      <span className="px-2 py-1 bg-primary/20 rounded text-xs">256-bit SSL</span>
                      <span className="px-2 py-1 bg-primary/20 rounded text-xs">GDPR Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Granular Permissions</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      Control exactly what data Adbid can access with role-based permissions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-accent/20 rounded text-xs">Read-Only Mode</span>
                      <span className="px-2 py-1 bg-accent/20 rounded text-xs">Custom Roles</span>
                      <span className="px-2 py-1 bg-accent/20 rounded text-xs">Audit Logs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Real-time Sync</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      Instant updates from Meta with webhook-based real-time data synchronization
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-success/20 rounded text-xs">&lt;100ms latency</span>
                      <span className="px-2 py-1 bg-success/20 rounded text-xs">99.9% uptime</span>
                      <span className="px-2 py-1 bg-success/20 rounded text-xs">Auto-retry</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full" />
                <div>
                  <div className="text-xs text-text-secondary">Meta</div>
                  <div className="text-sm font-bold">Business Partner</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-success" />
                <div>
                  <div className="text-xs text-text-secondary">SOC 2</div>
                  <div className="text-sm font-bold">Type II</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-xs text-text-secondary">GDPR</div>
                  <div className="text-sm font-bold">Compliant</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Platform Support Grid */}
        <motion.div
          className="mt-16 glass-effect rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Full Platform Coverage</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Monitor, label: 'Desktop Feed' },
              { icon: Smartphone, label: 'Mobile Apps' },
              { icon: '📺', label: 'Stories' },
              { icon: '🎬', label: 'Reels' },
              { icon: '🛍️', label: 'Shops' },
              { icon: '🎮', label: 'Gaming' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {typeof item.icon === 'string' ? (
                  <div className="text-3xl mb-2">{item.icon}</div>
                ) : (
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                )}
                <div className="text-xs font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MetaIntegration