import React from 'react'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  Linkedin, 
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight
} from 'lucide-react'

interface FooterProps {
  onLoginClick: () => void
}

const Footer: React.FC<FooterProps> = ({ onLoginClick }) => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'API Docs', href: '#api' },
      { name: 'Changelog', href: '#changelog' },
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers', badge: 'Hiring' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Contact', href: '#contact' },
    ],
    Resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Case Studies', href: '#cases' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Security', href: '#security' },
    ],
  }

  return (
    <footer className="relative bg-dark-secondary/50 border-t border-white/5">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="glass-effect rounded-3xl p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to{' '}
              <span className="gradient-text">10x Your ROAS?</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Join 500+ companies using Adbid to automate and optimize their Meta Ads campaigns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={onLoginClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-xl font-black text-white">A</span>
              </div>
              <span className="text-xl font-bold">Adbid</span>
            </div>
            <p className="text-text-secondary mb-6 max-w-xs">
              AI-powered Meta Ads optimization platform with advanced cohort analytics for mobile and web apps.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="px-2 py-0.5 bg-success/20 text-success rounded text-xs">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <a href="mailto:hello@adbid.ai" className="hover:text-primary transition-colors">
                  hello@adbid.ai
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-text-secondary">Phone</p>
                <a href="tel:+14155551234" className="hover:text-accent transition-colors">
                  +1 (415) 555-1234
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm text-text-secondary">Office</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © {currentYear} Adbid. All rights reserved.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full" />
                <span className="text-xs text-text-secondary">Meta Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-success rounded-full" />
                <span className="text-xs text-text-secondary">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent rounded-full" />
                <span className="text-xs text-text-secondary">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer