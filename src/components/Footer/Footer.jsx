import './Footer.css'
import instagramIcon from '@assets/Instagram.png'
import facebookIcon from '@assets/Facebook.png'

const footerSocials = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Facebook', icon: facebookIcon },
  { label: 'LinkedIn' },
]

function Footer() {
  return (
    <section className="footer-bar" id="contacto">
      <div className="footer-content">
        <div className="footer-contact-block">
          <span className="footer-label">Llámanos</span>
        </div>
        <div className="footer-contact-block">
          <span className="footer-label">Escríbenos</span>
        </div>

        <div className="footer-socials" aria-label="Redes sociales">
          {footerSocials.map((social) => (
            social.label === 'LinkedIn'
              ? (
                <span key={social.label} className="footer-social-linkedin" aria-label="LinkedIn">
                  in
                </span>
                )
              : (
                <img key={social.label} className="footer-social-icon" src={social.icon} alt={social.label} />
                )
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer
