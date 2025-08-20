import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, TrendingUp, Shield } from 'lucide-react'

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Startup',
      description: 'For early stage apps with up to $20k monthly ad spend',
      price: '$500',
      priceUnit: '/monthly per app',
      features: [
        '1 Platform (iOS or Android)',
        '1 Dashboard',
        'Simple LTV Prediction',
        'Limited cohort analysis',
        'Daily dashboard updates',
        'Email support'
      ],
      highlighted: false,
      cta: 'Schedule a demo'
    },
    {
      name: 'Pro',
      description: 'For publishers with $20k to $300k monthly ad spend',
      price: '3%',
      priceUnit: '/of monthly ad spend',
      features: [
        'All platforms (iOS, Android, Web)',
        '6 Dashboards',
        'Advanced LTV Prediction',
        'Limited cohort analysis',
        'Daily dashboard updates',
        'Slack chat support'
      ],
      highlighted: true,
      badge: 'Most Popular',
      cta: 'Schedule a demo'
    },
    {
      name: 'Enterprise',
      description: 'For publishers with >$300k monthly ad spend',
      price: "Let's talk",
      priceUnit: 'We provide volume discounts',
      features: [
        'All platforms (iOS, Android, Web)',
        '6 Dashboards',
        'Advanced LTV Prediction',
        'Extended cohort analysis',
        'Dashboard updates up to every 5 min',
        'Slack chat support + regular catch-ups'
      ],
      highlighted: false,
      cta: 'Schedule a demo'
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge-purple mb-4 inline-block">
            Pricing Plans
          </span>
          <h2 className="text-5xl font-black mb-4">
            Integrate within <span className="text-accent text-glow-lime">days</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save over a year and $1M+ in costs - this<br />
            is what building in-house analytics takes
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge-lime z-10">
                  {plan.badge}
                </div>
              )}
              
              <div className={`h-full ${plan.highlighted ? 'card-lime scale-105' : 'card-neon'} p-8`}>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-6 h-12">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-8">
                  <div className="text-4xl font-black mb-2">
                    {plan.price}
                  </div>
                  <p className="text-sm text-gray-600">{plan.priceUnit}</p>
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full ${plan.highlighted ? 'btn-accent' : 'bg-black text-white hover:bg-gray-900'} py-3 px-6 rounded-full font-semibold mb-8`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 ${plan.highlighted ? 'text-accent' : 'text-primary'} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-dark rounded-3xl p-12 border-4 border-primary animate-neon-purple">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to scale your advertising?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Start with a 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-accent inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <Zap className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Compare Plans
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing