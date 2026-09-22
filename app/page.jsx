import Link from 'next/link'
import { ArrowUpRight, Check, ChevronRight, Gift, Heart, MapPin, MessageCircle, Sparkles, Users, Zap } from 'lucide-react'

const FEATURES = [
  { icon: Zap, title: 'Lista en minutos', text: 'Elige un diseño, personalízalo y comparte.' },
  { icon: MessageCircle, title: 'RSVP sin fricción', text: 'Tus invitados confirman desde WhatsApp.' },
  { icon: MapPin, title: 'Todo en un solo link', text: 'Ubicación, horarios y detalles del evento.' },
  { icon: Gift, title: 'Mesa de regalos', text: 'Comparte tus opciones de forma elegante.' },
]

const OCCASIONS = ['Bodas', 'XV años', 'Bautizos', 'Cumpleaños', 'Baby showers']

const COMPARE_ROWS = [
  ['Cuenta regresiva en vivo', '✓', '✕'],
  ['Mapa y ubicación con un toque', '✓', '✕'],
  ['RSVP con un clic', '✓', '✕'],
  ['Galería de fotos', '✓', '✕'],
  ['Lista para compartir en', '5 min', 'Días'],
]

function Logo() {
  return (
    <Link href="/" className="landing2-brand" aria-label="Invita — inicio">
      <span className="landing2-brand-mark">✦</span>
      <span>Invita</span>
    </Link>
  )
}

function PhonePreview() {
  return (
    <div className="landing2-hero-art" aria-hidden="true">
      <div className="landing2-glow" />
      <div className="landing2-floating-note landing2-note-top">
        <span className="landing2-check-dot">
          <Check />
        </span>
        <span>
          <b>¡Confirmado!</b>
          <small>Tu lugar está reservado</small>
        </span>
      </div>
      <div className="landing2-phone">
        <div className="landing2-phone-notch" />
        <div className="landing2-phone-content">
          <span className="landing2-phone-eyebrow">PRIMERA COMUNIÓN</span>
          <h3>
            Regina
            <br />
            <em>Sofía</em>
          </h3>
          <div className="landing2-phone-date">24 · OCT · 2026</div>
          <div className="landing2-countdown">
            <span>
              <b>08</b>
              <small>DÍAS</small>
            </span>
            <span>
              <b>14</b>
              <small>HRS</small>
            </span>
            <span>
              <b>22</b>
              <small>MIN</small>
            </span>
          </div>
          <div className="landing2-phone-place">
            <MapPin /> Parroquia Sagrada Familia · 12:00 p.m.
          </div>
          <button className="landing2-phone-button" type="button" tabIndex={-1}>
            Confirmar asistencia
          </button>
        </div>
      </div>
      <div className="landing2-floating-note landing2-note-bottom">
        <Users />
        <span>
          <b>89 invitados</b>
          <small>ya confirmaron</small>
        </span>
      </div>
    </div>
  )
}

function SectionKicker({ children }) {
  return <p className="landing2-kicker">{children}</p>
}

export default function HomePage() {
  return (
    <div className="landing2">
      <div className="landing2-announcement">
        <Sparkles /> Más de 12,400 invitaciones creadas este año · empieza gratis, sin tarjeta
      </div>

      <nav className="landing2-nav shell">
        <Logo />
        <div className="landing2-nav-links">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#plantillas">Plantillas</a>
          <a href="#precios">Precios</a>
        </div>
        <Link className="btn2 btn2-dark" href="/crear">
          Crear invitación <ArrowUpRight />
        </Link>
      </nav>

      <main>
        <section className="landing2-hero shell">
          <div className="landing2-hero-copy">
            <div className="landing2-rating">
              <span>★★★★★</span> 4.9/5 · Miles de invitaciones creadas
            </div>
            <h1>
              Haz que tu día
              <br />
              <em>empiece aquí.</em>
            </h1>
            <p className="landing2-lede">
              Una invitación digital bonita, práctica y hecha para compartir. Diseña tu evento en minutos y disfruta
              cada confirmación.
            </p>
            <div className="landing2-hero-actions">
              <Link className="btn2 btn2-accent" href="/crear">
                Crear mi invitación <ArrowUpRight />
              </Link>
              <a className="text-link" href="#plantillas">
                Ver plantillas <ChevronRight />
              </a>
            </div>
            <div className="landing2-hero-stats">
              <div>
                <strong>
                  12.4K<em>+</em>
                </strong>
                <small>invitaciones creadas</small>
              </div>
              <div>
                <strong>
                  4.9<em>★</em>
                </strong>
                <small>calificación promedio</small>
              </div>
              <div>
                <strong>
                  5 <em>min</em>
                </strong>
                <small>para tenerla lista</small>
              </div>
            </div>
          </div>
          <PhonePreview />
        </section>

        <section className="landing2-feature-strip shell">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div className="landing2-feature" key={title}>
              <span className="landing2-feature-icon">
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="landing2-occasion-section shell" id="plantillas">
          <SectionKicker>PARA CADA OCASIÓN</SectionKicker>
          <h2>Una invitación que se siente como tu evento</h2>
          <div className="landing2-occasion-pills">
            {OCCASIONS.map((item, index) => (
              <button type="button" className={index === 0 ? 'active' : ''} key={item}>
                {item}
              </button>
            ))}
          </div>
          <div className="landing2-template-grid">
            <Link className="landing2-template-card landing2-template-one" href="/e/ana-luis">
              <span>BODA</span>
              <strong>
                Una historia
                <br />
                para celebrar
              </strong>
              <small>Ana & Luis</small>
              <div className="landing2-template-line" />
            </Link>
            <Link className="landing2-template-card landing2-template-two" href="/e/regis">
              <span>PRIMERA COMUNIÓN</span>
              <strong>
                Un día
                <br />
                muy especial
              </strong>
              <small>Regina Sofía</small>
              <div className="landing2-template-line" />
            </Link>
            <Link className="landing2-template-card landing2-template-three" href="/e/regina-natalia">
              <span>DORADO CLÁSICO</span>
              <strong>
                Un momento
                <br />
                inolvidable
              </strong>
              <small>Regina & Natalia</small>
              <div className="landing2-template-line" />
            </Link>
          </div>
        </section>

        <section className="landing2-steps-section" id="como-funciona">
          <div className="shell">
            <SectionKicker>SIMPLE Y RÁPIDO</SectionKicker>
            <h2>
              De idea a invitación
              <br />
              <em>en tres pasos.</em>
            </h2>
            <div className="landing2-steps">
              <div className="landing2-step">
                <div className="landing2-step-number">01</div>
                <div>
                  <h3>Elige tu estilo</h3>
                  <p>Explora nuestras plantillas y encuentra la que cuenta tu historia.</p>
                </div>
                <div className="landing2-mini-visual landing2-palette">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="landing2-step">
                <div className="landing2-step-number">02</div>
                <div>
                  <h3>Personaliza y comparte</h3>
                  <p>Agrega tus datos, fotos y manda el link por WhatsApp.</p>
                </div>
                <div className="landing2-mini-visual landing2-share">
                  <MessageCircle />
                  <span>tuapp.com/e/regina</span>
                </div>
              </div>
              <div className="landing2-step">
                <div className="landing2-step-number">03</div>
                <div>
                  <h3>Disfruta cada confirmación</h3>
                  <p>Ve tu lista de invitados actualizarse en tiempo real.</p>
                </div>
                <div className="landing2-mini-visual landing2-confirmations">
                  <b>✓</b>
                  <span>Ana confirmó</span>
                  <b>✓</b>
                  <span>Luis confirmó</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing2-comparison shell">
          <SectionKicker>TODO LO QUE IMAGINAS</SectionKicker>
          <h2>Más que un simple mensaje.</h2>
          <p className="landing2-section-intro">Tu evento merece una experiencia tan especial como el momento.</p>
          <div className="landing2-compare-table">
            <div className="landing2-table-head">
              <b>Función</b>
              <b>Invita</b>
              <b>Mensaje</b>
            </div>
            {COMPARE_ROWS.map(([feature, us, them]) => (
              <div className="landing2-table-row" key={feature}>
                <span>{feature}</span>
                <strong>{us}</strong>
                <em>{them}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="landing2-testimonial">
          <div className="shell landing2-testimonial-inner">
            <div className="landing2-stars">★★★★★</div>
            <blockquote>
              &ldquo;En solo 5 minutos pude crear una invitación hermosa. Todos mis invitados quedaron
              encantados.&rdquo;
            </blockquote>
            <div className="landing2-person">
              <span>FR</span>
              <div>
                <b>Fernanda Rocha</b>
                <small>Mamá de Regina</small>
              </div>
            </div>
          </div>
        </section>

        <section className="landing2-cta" id="precios">
          <div className="shell">
            <Heart />
            <SectionKicker>HAZLO MEMORABLE</SectionKicker>
            <h2>
              Tu momento empieza
              <br />
              con una invitación.
            </h2>
            <p>Gratis, sin tarjeta de crédito y lista en minutos.</p>
            <Link className="btn2 btn2-light" href="/crear">
              Crear mi invitación <ArrowUpRight />
            </Link>
          </div>
        </section>

        <footer className="landing2-footer shell">
          <Logo />
          <span>Invitaciones digitales para momentos inolvidables.</span>
          <div>
            <Heart />
            <span>© 2026 Invita</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
