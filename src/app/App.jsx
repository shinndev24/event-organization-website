import { useEffect, useRef, useState } from 'react'
import logo from '@assets/logo.png'
import heroImage from '@assets/Inicio.png'
import './App.css'
import Header from '@components/Header/Header.jsx'
import Footer from '@components/Footer/Footer.jsx'
import Home from '@features/Home/index.jsx'
import Buy from '@features/Buy/index.jsx'
import Sell from '@features/Sell/index.jsx'
import Services from '@features/Services/index.jsx'
import Contact from '@features/Contact/index.jsx'
import Nosotros from '@features/Nosotros/index.jsx'
import Franquicia from '@features/Franquicia/index.jsx'
import Unete from '@features/Unete/index.jsx'
import PrivateZone from '@features/PrivateZone/index.jsx'
import SellTemplate from '@features/Sell/components/SellTemplate.jsx'
import PropertyLanding from '@features/Sell/components/PropertyLanding.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { navItems, officeLandingContents, officeLandingPages, services, servicesPageSections } from '@data/creativeContent.js'

const servicesHeroImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState(() => {
    try {
      const hash = (window.location.hash || '').replace('#', '')
      const allowed = [
        'inicio',
        'compra',
        'venta',
        'servicios',
        'franquiciate',
        'unete',
        'contacto',
        'nosotros',
        'private',
        'property',
        ...Object.keys(officeLandingContents),
      ]
      return allowed.includes(hash) ? hash : 'inicio'
    } catch {
      return 'inicio'
    }
  })
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isCompact, setIsCompact] = useState(false)
  const [isColored, setIsColored] = useState(false)
  const isCompactRef = useRef(false)
  const isColoredRef = useRef(false)
  const tickingRef = useRef(false)

  // activePage is initialized from the URL hash synchronously

  useEffect(() => {
    if (activePage) {
      try {
        window.history.replaceState(null, '', `#${activePage}`)
      } catch {
        window.location.hash = `#${activePage}`
      }
    }
  }, [activePage])

  useEffect(() => {
    const updateFromScroll = () => {
      const y = window.scrollY

      const nextColored = isColoredRef.current ? y > 4 : y > 18
      const nextCompact = isCompactRef.current ? y > 110 : y > 150

      if (nextColored !== isColoredRef.current) {
        isColoredRef.current = nextColored
        setIsColored(nextColored)
      }

      if (nextCompact !== isCompactRef.current) {
        isCompactRef.current = nextCompact
        setIsCompact(nextCompact)
      }

      tickingRef.current = false
    }

    const handleScroll = () => {
      if (tickingRef.current) {
        return
      }

      tickingRef.current = true
      window.requestAnimationFrame(updateFromScroll)
    }

    updateFromScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleGoTop = (event) => {
    event.preventDefault()
    setActivePage('inicio')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProperty = (property, returnTo = 'oficina-1') => {
    setSelectedProperty({ property, returnTo })
    setActivePage('property')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateOrSelect = (page, property = null) => {
    setMenuOpen(false)
    if (page === 'selectProperty' && property?.property) {
      handleSelectProperty(property.property, property.returnTo)
    } else if (property) {
      handleSelectProperty(property)
    } else {
      setActivePage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavItemClick = (event, item) => {
    event.preventDefault()
    setMenuOpen(false)
    // set the active page and perform scrolling when appropriate
    const routedPages = ['venta', 'contacto', 'compra', 'servicios', 'franquiciate', 'unete', 'nosotros', 'private', 'oficina-1', 'oficina-2', 'oficina-3', 'property']

    if (routedPages.includes(item.page)) {
      setActivePage(item.page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setActivePage('inicio')

    window.requestAnimationFrame(() => {
      const target = document.querySelector(item.href)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <div className="app-shell">
      <LanguageToggle />
      {!activePage.startsWith('oficina-') && activePage !== 'property' && (
        <Header
          logo={logo}
          navItems={navItems}
          isColored={isColored}
          isCompact={isCompact}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onGoTop={handleGoTop}
          onNavItemClick={handleNavItemClick}
        />
      )}

      <main className="page-main">
        {activePage === 'inicio' && (
          <Home
            heroImage={heroImage}
            services={services}
            serviceSections={servicesPageSections}
            onNavigate={handleNavigateOrSelect}
          />
        )}
        {activePage === 'compra' && <Buy onNavigate={handleNavigateOrSelect} />}
        {activePage === 'venta' && <Sell onNavigate={handleNavigateOrSelect} />}
        {activePage === 'servicios' && (
          <Services
            heroImage={servicesHeroImage}
            services={services}
            serviceSections={servicesPageSections}
            onNavigate={handleNavigateOrSelect}
          />
        )}
        {activePage === 'franquiciate' && <Franquicia />}
        {activePage === 'unete' && <Unete />}
        {activePage === 'private' && <PrivateZone onNavigate={handleNavigateOrSelect} />}
        {activePage === 'nosotros' && <Nosotros officeLandings={officeLandingPages} onNavigate={handleNavigateOrSelect} />}
        {activePage.startsWith('oficina-') && officeLandingContents[activePage] && (
          <SellTemplate content={officeLandingContents[activePage]} onNavigate={handleNavigateOrSelect} />
        )}
        {activePage === 'contacto' && <Contact />}
        {activePage === 'property' && selectedProperty && (
          <PropertyLanding
            property={selectedProperty.property}
            returnTo={selectedProperty.returnTo}
            onNavigate={handleNavigateOrSelect}
          />
        )}
      </main>

      {!activePage.startsWith('oficina-') && activePage !== 'property' && <Footer variant={activePage} />}
    </div>
  )
}

export default App
