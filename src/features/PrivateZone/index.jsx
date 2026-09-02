import { useState } from 'react'
import './PrivateZone.css'

function PrivateZone() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <section className="login-page">
        <div className="login-container">
          <div className="login-card">
            <h1>Área de cliente</h1>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Correo</label>
                <input type="text" id="username" placeholder="Escribe tu correo" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Escribe tu contraseña" required />
              </div>

              <button type="submit" className="login-button">Acceder</button>
            </form>

            <p className="login-note">* Acceso privado para consultar proyectos y materiales</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="private-zone">
      {isBannerVisible && (
        <div className="banner">
          <p>Bienvenido a tu espacio de proyecto</p>
          <button
            type="button"
            className="banner-close"
            onClick={() => setIsBannerVisible(false)}
            aria-label="Cerrar banner"
          >
            ×
          </button>
        </div>
      )}

      <div className="private-zone-container">
        <header className="private-header">
          <h1>Panel de proyecto</h1>
          <button
            type="button"
            className="logout-button"
            onClick={() => setIsLoggedIn(false)}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="private-content">
          <div className="dashboard-grid">
            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1505691723518-36a3e8c8d7e0?auto=format&fit=crop&w=900&q=80"
                  alt="Portada - Recursos"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Laboratorio creativo</h2>
                <p>Explora herramientas de Inteligencia Artificial para investigar, idear y dar forma a experiencias con más rapidez.</p>
                <p><b>Entrar al laboratorio</b></p>
                <button className="edit-button">Acceder</button>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1560185127-6b6f3b5f2b2e?auto=format&fit=crop&w=900&q=80"
                  alt="Área de formación"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Área de formación</h2>
                <p>Accede a cursos, referencias y materiales que te ayudarán a crecer creativamente.</p>
                <button className="edit-button">Ver recursos de formación</button>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80"
                  alt="Acceder a la biblioteca de proyectos"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Biblioteca de proyectos</h2>
                <p>Consulta referencias, contactos y materiales de proyectos para trabajar de forma eficiente y mantener todo actualizado.</p>
                <button className="edit-button">Acceder</button>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80"
                  alt="Recursos"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Recursos</h2>
                <p>En esta zona encontrarás una amplia variedad de materiales y guías para apoyar tu trabajo diario. Explora documentos actualizados y accede a información clave en todo momento. Estos recursos son para tu información de tal manera que puedas hacer los pedidos según tus necesidades.</p>
                <p><b>Catálogo de Recursos</b></p>
                <button className="edit-button">Consultar</button>
                <p><b>Pedido Online</b></p>
                <button className="edit-button">Realizar pedido</button>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
                  alt="Merchandising"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Merchandising</h2>
                <p>Accede a la zona de Ecommerce-Merchandising, donde explorar el catálogo actualizado de productos de merchandising y realizar tus pedidos de forma sencilla. Mantén tu oficina provista con los últimos artículos promocionales</p>
                <p><b>Catálogo de Productos</b></p>
                <button className="edit-button">Consultar</button>
                <p><b>Tienda Online</b></p>
                <button className="edit-button">Realizar pedido</button>
              </div>
            </section>

            <section className="dashboard-card">
              <div className="card-media">
                <img
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80"
                  alt="Soporte Técnico"
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h2>Soporte Técnico</h2>
                <p>¿Tienes problemas con un proyecto o parte de la web? Abre un ticket y nuestro equipo te ayudará con cualquier incidencia.</p>
                <p><b>Soporte Técnico</b></p>
                <button className="edit-button">Abrir Ticket</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  )
}

export default PrivateZone
