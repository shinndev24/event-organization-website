export default function FranquiciaHero() {
  const heroImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80';

  return (
    <section className="franquicia-hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <h1>Únete a nuestra red creativa</h1>
        <p>Descubre cómo convertir tu mirada en experiencias que conectan.</p>
        <a href="#contacto" className="cta-button">Contáctanos</a>
      </div>
    </section>
  );
}
