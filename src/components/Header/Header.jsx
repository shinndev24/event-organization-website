import './Header.css'

function Header({
  logo,
  navItems,
  isColored,
  isCompact,
  menuOpen,
  setMenuOpen,
  onGoTop,
  onNavItemClick,
}) {
  return (
    <header
      className={`navbar ${isColored ? 'is-colored' : 'is-transparent'} ${isCompact ? 'is-compact' : ''}`}
      id="inicio"
    >
      <div className="container navbar-inner">
        <a className="brand" href="#inicio" onClick={onGoTop}>
          <img className="brand-logo" src={logo} alt="Logo Encuentro" />
        </a>

        <button
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`menu ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`menu-link ${item.page === 'private' ? 'menu-link-private' : ''}`}
              onClick={(event) => onNavItemClick(event, item)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
