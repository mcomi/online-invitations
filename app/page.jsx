import Link from 'next/link'
import { CalendarHeart, Clock3, Gift, MapPin, Send, Sparkles } from 'lucide-react'

const FEATURES = [
  { icon: Clock3, title: 'Cuenta regresiva en vivo', text: 'Tus invitados ven exactamente cuánto falta para el gran día.' },
  { icon: MapPin, title: 'Ceremonia y recepción', text: 'Dirección, hora y link a Maps para llegar sin perderse.' },
  { icon: Send, title: 'RSVP por WhatsApp', text: 'Confirman su asistencia con un mensaje ya redactado.' },
  { icon: Gift, title: 'Mesa de regalos y dress code', text: 'Opcionales, solo aparecen si tú los llenas.' },
]

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landing-hero">
        <p className="landing-eyebrow">
          <Sparkles size={15} />
          Invitaciones digitales
        </p>
        <h1>Tu invitación, lista en minutos</h1>
        <p className="landing-sub">
          Llena un formulario y recibe una página para compartir por WhatsApp — con cuenta regresiva, mapa, RSVP y
          mesa de regalos. Sin diseñador, sin esperar días.
        </p>
        <div className="landing-cta">
          <Link className="button" href="/crear">
            Crear mi invitación
          </Link>
          <Link className="button ghost" href="/e/regina-natalia">
            Ver un ejemplo
          </Link>
        </div>
      </section>

      <section className="landing-features">
        {FEATURES.map((feature) => (
          <article className="landing-feature" key={feature.title}>
            <span className="section-icon">
              <feature.icon size={18} />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="landing-pricing">
        <article className="landing-plan">
          <p className="landing-plan-name">Gratis</p>
          <p className="landing-plan-price">$0</p>
          <p>1 plantilla, invitados sin límite marcado, con marca de agua. Se desactiva 15 días después del evento.</p>
        </article>
        <article className="landing-plan featured">
          <p className="landing-plan-name">Premium</p>
          <p className="landing-plan-price">Próximamente</p>
          <p>Sin marca de agua y vigencia extendida a 6 meses. El cobro todavía no está conectado — por ahora, toda invitación se crea en el plan gratis.</p>
        </article>
      </section>

      <footer className="landing-footer">
        <CalendarHeart size={15} />
        <span>Cada invitación se desactiva sola después de su fecha — no tienes que hacer nada.</span>
      </footer>
    </main>
  )
}
