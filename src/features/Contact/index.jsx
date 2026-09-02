import './Contact.css'

const contactImage = 'https://images.unsplash.com/photo-1505691723518-36a3e8c8d7e0?auto=format&fit=crop&w=1000&q=80'
import instagramIcon from '@assets/Instagram.png'
import facebookIcon from '@assets/Facebook.png'
import linkedInIcon from '@assets/LinkedIn.png'
import ubicacionIcon from '@assets/ubicacion.png'
import contactoIcon from '@assets/contacto.png'

const socialLinks = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Facebook', icon: facebookIcon },
  { label: 'LinkedIn', icon: linkedInIcon },
]

function Contact() {
  return (
    <section className="contact-section" id="contacto-page">
      <div className="contact-shell">
        <div className="contact-hero">
          <div className="contact-hero-copy">
            <h1>
              CONTACTA CON NOSOTROS
            </h1>

            <div className="contact-socials" aria-label="Redes sociales">
              {socialLinks.map((link) => (
                <a key={link.label} href="#" aria-label={link.label}>
                  <img className="contact-social-icon" src={link.icon} alt="" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-hero-image-wrap">
            <img className="contact-hero-image" src={contactImage} alt="Casa destacada" />
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-form-card">
            <h2>CONTÁCTANOS</h2>

            <form className="contact-form">
              <input type="text" placeholder="Nombre y apellidos" aria-label="Nombre y apellidos" />
              <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" />

              <div className="contact-form-row">
                <input type="tel" placeholder="Teléfono" aria-label="Teléfono" />
                <input type="text" placeholder="Email" aria-label="Email" />
              </div>

              <p className="selectOption">Selecciona una opción</p>

              <div className="contact-radio-row" role="group" aria-label="Tipo de contacto">
                <label>
                  <input type="radio" name="contact-type" defaultChecked />
                  <span>Enviar consulta</span>
                </label>
                <label>
                  <input type="radio" name="contact-type" />
                  <span>Concertar llamada</span>
                </label>
                <label>
                  <input type="radio" name="contact-type" />
                  <span>Solicitar cita</span>
                </label>
              </div>

              <textarea placeholder="Escribir mensaje..." aria-label="Escribir mensaje" rows="4" />

              <p className="contact-policy">*Política de privacidad*</p>
              <button type="button">Enviar</button>
            </form>
          </div>

          <aside className="contact-info-card" aria-label="Información de contacto">
            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">
                <img src={ubicacionIcon} alt="" />
              </div>
              <p>Calle Calle, 00<br />28905 - Madrid</p>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">
                <img src={contactoIcon} alt="" />
              </div>
              <p>+34 999 999 999<br />info@iencuentro.es</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Contact
