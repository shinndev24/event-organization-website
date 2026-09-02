export const navItems = [
  { label: 'Experiencias', href: '#compra', page: 'compra' },
  { label: 'Proyectos', href: '#vende', page: 'venta' },
  { label: 'Servicios', href: '#servicios', page: 'servicios' },
  { label: 'Colabora', href: '#franquiciate', page: 'franquiciate' },
  { label: 'Únete', href: '#unete', page: 'unete' },
  { label: 'Contacto', href: '#contacto', page: 'contacto' },
  { label: 'Estudio', href: '#nosotros', page: 'nosotros' },
  { label: 'Área de cliente', href: '#private', page: 'private' },
]

const images = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80',
]

export const services = [
  { title: 'Eventos en vivo', description: 'Diseñamos experiencias en directo que convierten cada encuentro en una historia memorable.', category: 'vender', image: images[0] },
  { title: 'Festivales y cultura', description: 'Creamos formatos culturales con identidad, ritmo y una producción impecable.', category: 'vender', image: images[1] },
  { title: 'Experiencias de marca', description: 'Conectamos marcas y personas a través de ideas que se viven, se comparten y permanecen.', category: 'vender', image: images[2] },
  { title: 'Bodas con personalidad', description: 'Convertimos una celebración especial en una puesta en escena que habla de quienes sois.', category: 'vender', image: images[3] },
  { title: 'Eventos corporativos', description: 'Diseñamos convenciones, lanzamientos y encuentros que mueven equipos y negocios.', category: 'comprar', image: images[4] },
  { title: 'Producción audiovisual', description: 'Capturamos la energía de cada proyecto en piezas visuales listas para compartir.', category: 'comprar', image: images[5] },
  { title: 'Instalaciones inmersivas', description: 'Creamos espacios que invitan a mirar, participar y recordar la experiencia.', category: 'comprar', image: images[2] },
  { title: 'Dirección artística', description: 'Damos coherencia visual y personalidad a cada detalle de una producción.', category: 'comprar', image: images[3] },
]

const section = (title, description, expandedDescription, image) => ({ title, description, expandedDescription, image })

export const servicesPageSections = {
  comprar: [
    section('Eventos corporativos', 'Diseñamos encuentros que alinean equipos, objetivos y emociones.', 'Desde la idea inicial hasta el último aplauso, producimos convenciones, presentaciones y experiencias corporativas con una narrativa clara y una ejecución precisa.', images[4]),
    section('Producción audiovisual', 'Convertimos cada proyecto en imágenes que siguen contando la historia.', 'Creamos fotografía, vídeo y piezas digitales para documentar eventos, amplificar campañas y construir un archivo visual con personalidad.', images[5]),
  ],
  vender: [
    section('Eventos en vivo', 'Diseñamos experiencias en directo que convierten cada encuentro en una historia memorable.', 'Conceptualizamos, producimos y coordinamos eventos de principio a fin: espacios, programación, proveedores, puesta en escena y experiencia del público.', images[0]),
    section('Festivales y cultura', 'Creamos formatos culturales con identidad, ritmo y una producción impecable.', 'Unimos artistas, espacios y comunidades para crear festivales, exposiciones y encuentros culturales que generan conversación.', images[1]),
    section('Experiencias de marca', 'Conectamos marcas y personas a través de ideas que se viven, se comparten y permanecen.', 'Diseñamos activaciones, pop-ups y lanzamientos que convierten los valores de una marca en una experiencia tangible.', images[2]),
    section('Bodas con personalidad', 'Convertimos una celebración especial en una puesta en escena que habla de quienes sois.', 'Cuidamos concepto, ambientación, ritmo y coordinación para que cada celebración sea auténtica, fluida y profundamente vuestra.', images[3]),
  ],
  independiente: [
    section('Estrategia creativa', 'Ideas con dirección para que cada proyecto tenga una voz reconocible.', 'Acompañamos a marcas y equipos desde el briefing hasta la ejecución con estrategia, concepto, diseño y producción.', images[2]),
  ],
}

export const serviceAccordionContent = Object.fromEntries(
  Object.values(servicesPageSections).flat().map((service) => [service.title, [
    { id: `${service.title}-concepto`, title: 'Concepto y narrativa +', body: ['Definimos una idea central que da sentido a cada decisión creativa y conecta con el público.'] },
    { id: `${service.title}-produccion`, title: 'Producción y coordinación +', body: ['Gestionamos equipo, calendario, proveedores y detalles para que la experiencia suceda con precisión.'] },
    { id: `${service.title}-impacto`, title: 'Contenido e impacto +', body: ['Medimos la respuesta, documentamos el proyecto y convertimos lo vivido en contenido que sigue circulando.'] },
  ]]),
)

export const sellSteps = [
  { title: '1. Briefing con intención', text: 'Escuchamos el reto, el público y la emoción que quieres provocar para construir una dirección clara.', image: images[0] },
  { title: '2. Idea y diseño de experiencia', text: 'Desarrollamos concepto, estética, recorrido y programación para que el proyecto tenga una identidad propia.', image: images[2] },
  { title: '3. Producción con método', text: 'Coordinamos equipos, espacios y proveedores para transformar la idea en una experiencia real.', image: images[4] },
  { title: '4. Lanzamiento y memoria', text: 'Activamos el evento y generamos piezas que prolongan su impacto después de que termine.', image: images[5] },
]

export const officeLandingPages = ['Lisboa', 'Copenhague', 'Ciudad de México', 'Buenos Aires', 'Tokio', 'Berlín'].map((city, index) => ({
  title: `Estudio ${city}`,
  description: `Proyectos y experiencias producidos desde nuestro estudio de ${city}.`,
  page: `oficina-${index + 1}`,
  cta: 'Ver proyectos',
}))

export const officeLandingContents = Object.fromEntries(officeLandingPages.map((office, index) => [office.page, {
  sectionId: office.page,
  officeName: `Estudio ${office.title.replace('Estudio ', '')}`,
  formTitle: 'Agencia creativa de experiencias',
  topActions: [{ label: 'Producción local' }, { label: 'Contacto directo' }, { label: 'proyectos@estudio.es' }],
  heroImage: images[index % images.length],
  heroAlt: `Experiencia creativa en ${office.title.replace('Estudio ', '')}`,
  sectionTitle: `Proyectos de ${office.title.replace('Estudio ', '')}`,
  listings: [
    { id: `${office.page}-1`, title: 'Festival de ideas', subtitle: 'Cultura y comunidad', description: 'Un formato vivo para reunir talento, música y conversaciones.', specs: 'Concepto · Producción · Contenido', image: images[index % images.length] },
    { id: `${office.page}-2`, title: 'Lanzamiento de marca', subtitle: 'Experiencia inmersiva', description: 'Una puesta en escena diseñada para presentar una nueva identidad.', specs: 'Estrategia · Diseño · Activación', image: images[(index + 1) % images.length] },
    { id: `${office.page}-3`, title: 'Encuentro anual', subtitle: 'Evento corporativo', description: 'Una jornada para celebrar avances y conectar equipos.', specs: 'Guion · Producción · Audiovisual', image: images[(index + 2) % images.length] },
  ],
  loadMoreLabel: 'Ver más proyectos',
  contactTitle: 'Hablemos de tu proyecto',
  contactItems: [{ label: 'Estudio creativo' }, { value: '+34 999 999 999' }, { value: 'hola@estudio.es' }],
  aboutTitle: `Sobre el estudio de ${office.title.replace('Estudio ', '')}`,
  aboutText: 'Un equipo cercano para crear experiencias con carácter, ritmo y una producción cuidada.',
  formRows: [[{ id: `${office.page}-name`, type: 'text', placeholder: 'Nombre', required: false }]],
}]))

export const locationData = { Lisboa: { municipalities: ['Alfama', 'Bairro Alto', 'Belém'] }, Copenhague: { municipalities: ['Nørrebro', 'Vesterbro', 'Østerbro'] }, 'Ciudad de México': { municipalities: ['Roma Norte', 'Condesa', 'Coyoacán'] }, 'Buenos Aires': { municipalities: ['Palermo', 'San Telmo', 'Recoleta'] }, Tokio: { municipalities: ['Shibuya', 'Shinjuku', 'Meguro'] }, Berlín: { municipalities: ['Kreuzberg', 'Mitte', 'Neukölln'] } }
export const propertyTypes = ['Evento', 'Festival', 'Experiencia', 'Producción']
export const operationTypes = ['Próximos', 'Realizados', 'A medida']
export const spainBounds = [[27.4, -18.3], [44.3, 4.9]]

export const buyResults = officeLandingPages.flatMap((office, index) => [
  { id: index + 1, title: 'Proyecto destacado', subtitle: `${office.title.replace('Estudio ', '')}, red internacional`, description: 'Experiencia creativa desarrollada por nuestro equipo.', specs: 'Evento · Diseño · Producción', propertyReference: `PRO-${1000 + index}`, status: 'Disponible', priceValue: 0, label: 'Destacado', bedrooms: 1, bathrooms: 1, areaM2: 100, province: office.title.replace('Estudio ', ''), municipality: 'Centro', propertyType: 'Experiencia', operationType: 'Realizados', coordinates: { lat: 40.416 + index * 0.1, lng: -3.703 + index * 0.1 }, image: images[index % images.length] },
])
