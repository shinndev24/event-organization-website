export default function FranquiciaContact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="franquicia-contact" id="contacto">
      <h2 className="section-title">Contáctanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre y apellidos"
            aria-label="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            aria-label="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Teléfono"
            aria-label="Teléfono"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Zona de interés"
            aria-label="Zona de interés"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Mensaje"
            aria-label="Mensaje"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button" aria-label="Enviar">Enviar</button>
      </form>
    </section>
  );
}
