import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import heroImage from './assets/Inicio.png'
import './App.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './features/Home/Home.jsx'
import Buy from './features/Buy/Buy.jsx'
import Sell from './features/Sell/Sell.jsx'
import { navItems, services } from './data/siteContent.js'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('inicio')
  const [isCompact, setIsCompact] = useState(false)
  const [isColored, setIsColored] = useState(false)
  const isCompactRef = useRef(false)
  const isColoredRef = useRef(false)
  const tickingRef = useRef(false)

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

  const handleNavItemClick = (event, item) => {
    event.preventDefault()
    setMenuOpen(false)

    if (item.page === 'venta') {
      setActivePage('venta')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (item.page === 'compra') {
      setActivePage('compra')
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
    <>
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

      <main className="page-main">
        {activePage === 'inicio' && <Home services={services} heroImage={heroImage} />}
        {activePage === 'compra' && <Buy />}
        {activePage === 'venta' && <Sell />}

        <Footer />
      </main>
    </>
  )
}

export default App
