import React, { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

interface NavbarProps {
  onLoginClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 lg:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow-purple-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl">Adbid</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#product" className="text-gray-700 hover:text-black transition-colors">
              Product
            </a>
            <a href="#use-cases" className="text-gray-700 hover:text-black transition-colors">
              Use cases
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-black transition-colors">
              Pricing
            </a>
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Blog
                  </a>
                  <a href="#docs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Documentation
                  </a>
                  <a href="#guides" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Guides
                  </a>
                  <a href="#api" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                    API Reference
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="text-gray-700 hover:text-black transition-colors"
            >
              Log in
            </button>
            <button className="btn-accent text-sm">
              Schedule a demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#product" className="block text-gray-700">Product</a>
              <a href="#use-cases" className="block text-gray-700">Use cases</a>
              <a href="#pricing" className="block text-gray-700">Pricing</a>
              <a href="#resources" className="block text-gray-700">Resources</a>
              <button
                onClick={onLoginClick}
                className="block w-full text-left text-gray-700"
              >
                Log in
              </button>
              <button className="w-full btn-accent">
                Schedule a demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar