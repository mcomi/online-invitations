import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CalendarHeart,
  Church,
  Clock3,
  Gift,
  Heart,
  MapPin,
  Music2,
  Navigation,
  Pause,
  Play,
  Send,
  Shirt,
  Sparkles,
} from 'lucide-react'
import './App.css'

const eventDate = new Date('2026-11-14T12:00:00-06:00')

const details = {
  names: 'Regina y Natalia',
  dateLabel: '14 de noviembre de 2026',
  city: 'Atizapán de Zaragoza, Estado de México',
  welcome:
    'Con mucha alegría damos gracias a Dios por este día tan especial. Nos encantará compartirlo con las personas que forman parte de nuestra historia.',
  church: {
    name: 'Parroquia por confirmar',
    time: '12:00 p.m.',
    address: 'Atizapán de Zaragoza, Estado de México',
    maps: 'https://www.google.com/maps/search/?api=1&query=Atizapan%20de%20Zaragoza%20Iglesia',
  },
  reception: {
    name: 'Recepción por confirmar',
    time: 'Después de la ceremonia',
    address: 'Atizapán de Zaragoza, Estado de México',
    maps: 'https://www.google.com/maps/search/?api=1&query=Atizapan%20de%20Zaragoza%20recepcion',
  },
  giftRegistry: 'https://www.liverpool.com.mx/tienda/mesa-de-regalos',
  rsvp: {
    name: 'Confirmar asistencia',
    href: 'https://wa.me/525500000000?text=Hola%2C%20confirmo%20mi%20asistencia%20a%20la%20Primera%20Comuni%C3%B3n%20de%20Regina%20y%20Natalia.',
  },
  finalMessage:
    'Gracias por acompañarnos con su cariño, sus oraciones y su presencia en este momento tan importante para Regina y Natalia.',
}

const photos = [
  { name: 'Regina', src: '/photos/regina-placeholder.svg' },
  { name: 'Natalia', src: '/photos/natalia-placeholder.svg' },
  { name: 'Regina y Natalia', src: '/photos/together-placeholder.svg' },
]

function getCountdown() {
  const diff = Math.max(eventDate.getTime() - Date.now(), 0)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff / 3600000) % 24)
  const minutes = Math.floor((diff / 60000) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Seg', value: seconds },
  ]
}

function Butterfly({ className = '' }) {
  return (
    <svg className={`butterfly ${className}`} viewBox="0 0 120 90" aria-hidden="true">
      <path d="M58 43C43 9 6 5 7 34c1 25 29 35 50 18z" />
      <path d="M62 43C77 9 114 5 113 34c-1 25-29 35-50 18z" />
      <path d="M57 49C36 45 18 58 29 77c10 16 30 5 31-23z" />
      <path d="M63 49c21-4 39 9 28 28-10 16-30 5-31-23z" />
      <line x1="60" x2="60" y1="37" y2="72" />
      <path d="M58 36c-7-11-15-15-23-17M62 36c7-11 15-15 23-17" />
    </svg>
  )
}

function BotanicalDivider({ className = '' }) {
  return (
    <svg className={`botanical-divider ${className}`} viewBox="0 0 420 64" aria-hidden="true">
      <path d="M24 32h132M264 32h132" />
      <path d="M150 31c-18-16-42-19-68-9 22 9 45 11 68 9zM270 31c18-16 42-19 68-9-22 9-45 11-68 9z" />
      <path d="M174 34c-10 16-24 25-43 28 7-18 21-27 43-28zM246 34c10 16 24 25 43 28-7-18-21-27-43-28z" />
      <path d="M188 30c-6-19-3-36 11-52 4 20 0 37-11 52zM232 30c6-19 3-36-11-52-4 20 0 37 11 52z" />
      <path d="M210 24c16 0 28 8 28 19 0 10-12 18-28 18s-28-8-28-18c0-11 12-19 28-19z" />
    </svg>
  )
}

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <div className="section-title">
      <span className="section-icon">
        <Icon size={18} />
      </span>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <BotanicalDivider />
    </div>
  )
}

function Location({ place, icon: Icon }) {
  return (
    <article className="location-card">
      <div className="location-icon">
        <Icon size={24} />
      </div>
      <div>
        <p className="time">{place.time}</p>
        <h3>{place.name}</h3>
        <p>{place.address}</p>
      </div>
      <a className="button ghost" href={place.maps} target="_blank" rel="noreferrer">
        <Navigation size={17} />
        Maps
      </a>
    </article>
  )
}

function App() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(eventDate),
    [],
  )

  const toggleMusic = async () => {
    if (!audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      const gain = context.createGain()
      const oscillator = context.createOscillator()
      const filter = context.createBiquadFilter()

      oscillator.type = 'sine'
      oscillator.frequency.value = 392
      filter.type = 'lowpass'
      filter.frequency.value = 880
      gain.gain.value = 0.035
      oscillator.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)
      oscillator.start()
      audioRef.current = { context, gain, oscillator }
    }

    if (audioRef.current.context.state === 'suspended') {
      await audioRef.current.context.resume()
      setIsPlaying(true)
      return
    }

    await audioRef.current.context.suspend()
    setIsPlaying(false)
  }

  return (
    <main>
      <section className="hero-section" id="inicio">
        <div className="paper-glow" aria-hidden="true" />
        <div className="lace-border" aria-hidden="true" />
        <div className="gold-dust" aria-hidden="true" />
        <Butterfly className="butterfly-one" />
        <Butterfly className="butterfly-two" />
        <Butterfly className="butterfly-four" />
        <div className="floral-corner top-left" aria-hidden="true" />
        <div className="floral-corner bottom-right" aria-hidden="true" />
        <div className="gold-frame" aria-hidden="true" />

        <div className="hero-content">
          <p className="save">Save the Date</p>
          <BotanicalDivider className="hero-divider" />
          <h1>Primera Comunión</h1>
          <p className="de">de</p>
          <p className="names">{details.names}</p>
          <p className="date">{details.dateLabel}</p>
          <p className="city">
            <MapPin size={17} />
            {details.city}
          </p>
        </div>
      </section>

      <section className="welcome band">
        <div className="section-flourish left" aria-hidden="true" />
        <div className="section-flourish right" aria-hidden="true" />
        <SectionTitle icon={Sparkles} eyebrow="Con amor" title="Nos llenará de alegría verte" />
        <p>{details.welcome}</p>
      </section>

      <section className="countdown-section">
        <SectionTitle icon={Clock3} eyebrow={formattedDate} title="Falta muy poquito" />
        <div className="countdown-grid">
          {countdown.map((item) => (
            <div className="countdown-box" key={item.label}>
              <strong>{String(item.value).padStart(2, '0')}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="locations band">
        <div className="section-flourish left" aria-hidden="true" />
        <SectionTitle icon={MapPin} eyebrow="Dónde y cuándo" title="Ceremonia y recepción" />
        <div className="location-grid">
          <Location place={details.church} icon={Church} />
          <Location place={details.reception} icon={CalendarHeart} />
        </div>
      </section>

      <section className="dress-gifts">
        <article className="info-panel">
          <SectionTitle icon={Shirt} eyebrow="Dress code" title="Elegante en tonos claros" />
          <p>Marfil, lila empolvado, lavanda, gris perla o colores suaves.</p>
        </article>
        <article className="info-panel">
          <SectionTitle icon={Gift} eyebrow="Mesa de regalos" title="Liverpool" />
          <p>Tu presencia es nuestro regalo más especial. Si deseas tener un detalle, puedes verlo aquí.</p>
          <a className="button" href={details.giftRegistry} target="_blank" rel="noreferrer">
            <Gift size={17} />
            Ver mesa
          </a>
        </article>
      </section>

      <section className="photos band">
        <div className="section-flourish right" aria-hidden="true" />
        <SectionTitle icon={Heart} eyebrow="Momentos" title="Regina y Natalia" />
        <div className="photo-grid">
          {photos.map((photo) => (
            <figure className="photo-card" key={photo.name}>
              <img src={photo.src} alt={photo.name} />
              <figcaption>{photo.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rsvp-music">
        <article className="info-panel rsvp">
          <SectionTitle icon={Send} eyebrow="RSVP" title="Confirmación de asistencia" />
          <p>Ayúdanos a confirmar tu asistencia para preparar todo con mucho cariño.</p>
          <a className="button" href={details.rsvp.href} target="_blank" rel="noreferrer">
            <Send size={17} />
            {details.rsvp.name}
          </a>
        </article>
        <article className="info-panel music">
          <SectionTitle icon={Music2} eyebrow="Música" title="Un detalle para ambientar" />
          <p>Activa una nota suave mientras recorres la invitación.</p>
          <button className="button" type="button" onClick={toggleMusic}>
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
        </article>
      </section>

      <section className="final-message">
        <div className="lace-border" aria-hidden="true" />
        <Butterfly className="butterfly-three" />
        <BotanicalDivider />
        <p>{details.finalMessage}</p>
        <strong>{details.names}</strong>
      </section>
    </main>
  )
}

export default App
