function LandingShowcase({ title, description, items, onNavigate }) {
  return (
    <section className="landing-showcase" id="nosotros">
      <div className="container">
        <div className="landing-showcase-header">
          <p className="landing-showcase-kicker">Nosotros</p>
          <h2>{title}</h2>
          <p className="landing-showcase-description">{description}</p>
        </div>

        <div className="landing-showcase-grid">
          {items.map((item) => (
            <article className="landing-showcase-card" key={item.title}>
              <div>
                <span className="landing-showcase-badge">Editable</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <button type="button" className="landing-showcase-link" onClick={() => onNavigate(item.page)}>
                {item.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingShowcase