import React from 'react'
import WebinarBanner from './components/WebinarBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScreenshotsSection from './components/ScreenshotsSection'
import DashboardShowcase from './components/DashboardShowcase'
import PlatformIntegrations from './components/PlatformIntegrations'
import Features from './components/Features'
import CohortAnalytics from './components/CohortAnalytics'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function App() {
  const [showLogin, setShowLogin] = React.useState(false)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <WebinarBanner />
      <Navbar onLoginClick={() => setShowLogin(true)} />
      
      <Hero onLoginClick={() => setShowLogin(true)} />
      <ScreenshotsSection />
      <Features />
      <DashboardShowcase />
      <PlatformIntegrations />
      <CohortAnalytics />
      <HowItWorks />
      <Footer onLoginClick={() => setShowLogin(true)} />
      
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default App