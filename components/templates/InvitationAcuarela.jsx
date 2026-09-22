'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Cross,
  Gift,
  Heart,
  MapPin,
  Music2,
  Navigation,
  Sparkles,
  Star,
} from 'lucide-react'
import { illustrationForEvent } from './acuarela-illustrations'
import './InvitationAcuarela.css'

const DEFAULT_PHOTOS = [
  { name: 'Foto 1', src: '/photos/regina-placeholder.svg' },
  { name: 'Foto 2', src: '/photos/natalia-placeholder.svg' },
  { name: 'Foto 3', src: '/photos/together-placeholder.svg' },
]

function getCountdown(eventDate) {
  const diff = Math.max(eventDate.getTime() - Date.now(), 0)
  const pad = (n) => String(n).padStart(2, '0')
  return [
    { label: 'días', value: pad(Math.floor(diff / 86400000)) },
    { label: 'horas', value: pad(Math.floor((diff / 3600000) % 24)) },
    { label: 'minutos', value: pad(Math.floor((diff / 60000) % 60)) },
    { label: 'segundos', value: pad(Math.floor((diff / 1000) % 60)) },
  ]
}

const COUNTDOWN_PLACEHOLDER = [
  { label: 'días', value: '--' },
  { label: 'horas', value: '--' },
  { label: 'minutos', value: '--' },
  { label: 'segundos', value: '--' },
]

const PALETTE_SWATCHES = ['#bda6c6', '#e4c9d3', '#d5b878', '#ffffff']

export default function InvitationAcuarela({ invitation, watermark = false }) {
  const isPremium = invitation.tier === 'premium'
  const eventDate = useMemo(() => new Date(invitation.eventDate), [invitation.eventDate])
  // Arranca en null (no en un valor calculado con Date.now()) para que el
  // primer render coincida entre servidor y cliente; getCountdown solo
  // corre después de montar, dentro de useEffect.
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    setCountdown(getCountdown(eventDate))
    const timer = window.setInterval(() => setCountdown(getCountdown(eventDate)), 1000)
    return () => window.clearInterval(timer)
  }, [eventDate])

  const rsvpHref = useMemo(
    () => `https://wa.me/${invitation.rsvpPhone}?text=${encodeURIComponent(invitation.rsvpMessage || '')}`,
    [invitation.rsvpPhone, invitation.rsvpMessage],
  )

  const dayLabel = eventDate.getDate()
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(eventDate).toUpperCase(),
    [eventDate],
  )
  const yearLabel = eventDate.getFullYear()

  const photos = invitation.photos?.length ? invitation.photos : DEFAULT_PHOTOS
  const heroIllustration = illustrationForEvent(invitation.eventType)
  const nameParts = invitation.names.split(/\s+/)
  const firstName = nameParts[0]
  const restName = nameParts.slice(1).join(' ')

  return (
    <div className="tpl-acuarela">
      <main>
        <nav className="ac-nav">
          <span className="ac-brand">
            INVITA <span>•</span> MOMENTOS
          </span>
        </nav>

        {isPremium && (
          <div className="ac-premium-banner">
            <div>
              <span>EXPERIENCIA PREMIUM</span>
              <strong>Tu invitación, sin límites.</strong>
            </div>
            <p>Sin marca de agua · música personalizada · confirmaciones inteligentes · dominio propio</p>
          </div>
        )}

        <section className="ac-cover">
          <div className="ac-cover-copy">
            <p className="eyebrow">{invitation.eventType.toUpperCase()}</p>
            <h1>
              {firstName}
              {restName && (
                <>
                  <br />
                  <em>{restName}</em>
                </>
              )}
            </h1>
            <p className="ac-cover-intro">{invitation.welcome ? invitation.eventType : ''}</p>
            <div className="ac-cover-line" />
            <p className="ac-cover-date">
              {dayLabel}
              <span>•</span>
              {monthLabel}
              <span>•</span>
              {yearLabel}
            </p>
          </div>
          <div className="ac-cover-art">{heroIllustration}</div>
        </section>

        <section className="ac-block">
          <div className="ac-section-number">
            01 <span>BIENVENIDA</span>
          </div>
          <div className="ac-welcome-layout">
            <div>
              <p className="eyebrow">CON EL CORAZÓN LLENO DE ALEGRÍA</p>
              <h2>
                Hay días que
                <br />
                <em>se quedan para siempre.</em>
              </h2>
            </div>
            <div className="ac-welcome-text">
              <p>{invitation.welcome}</p>
            </div>
          </div>
        </section>

        <section className="ac-block ac-event">
          <div className="ac-section-number">
            02 <span>EL EVENTO</span>
          </div>
          <div className="ac-event-heading">
            <div>
              <p className="eyebrow">GUARDA LA FECHA</p>
              <h2>
                Un día lleno
                <br />
                <em>de momentos especiales.</em>
              </h2>
            </div>
            <div className="ac-countdown">
              {(countdown ?? COUNTDOWN_PLACEHOLDER).map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ac-event-cards">
            <article>
              <div className="ac-card-top">
                <Cross />
                <span>{invitation.church.time}</span>
              </div>
              <p className="eyebrow">CEREMONIA</p>
              <h3>{invitation.church.name}</h3>
              <p>{invitation.church.address}</p>
              <a className="ac-card-link" href={invitation.church.maps} target="_blank" rel="noreferrer">
                <MapPin /> Ver ubicación <ArrowUpRight />
              </a>
            </article>
            <article className="featured">
              <div className="ac-card-top">
                <Heart />
                <span>{invitation.reception.time}</span>
              </div>
              <p className="eyebrow">RECEPCIÓN</p>
              <h3>{invitation.reception.name}</h3>
              <p>{invitation.reception.address}</p>
              <a className="ac-card-link" href={invitation.reception.maps} target="_blank" rel="noreferrer">
                <MapPin /> Ver ubicación <ArrowUpRight />
              </a>
            </article>
          </div>
        </section>

        {invitation.dressCode && (
          <section className="ac-style-break">
            <div>
              <p className="eyebrow">UN DETALLE DE ESTILO</p>
              <h2>
                Su día,
                <br />
                <em>su esencia.</em>
              </h2>
              <p className="copy">{invitation.dressCode}</p>
              <div className="ac-swatches">
                {PALETTE_SWATCHES.map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </div>
            </div>
            <div className="ac-style-card">
              <Sparkles />
              <p>
                {invitation.eventType.toUpperCase()}
                <br />
                <b>{invitation.names.toUpperCase()}</b>
              </p>
              <small>
                {invitation.names.toUpperCase()} · {yearLabel}
              </small>
            </div>
          </section>
        )}

        <section className="ac-premium-features">
          <div className="ac-premium-features-head">
            <p className="eyebrow">PARA QUIENES QUIEREN TODO</p>
            <h2>
              Hazla <em>inolvidable.</em>
            </h2>
            <p>Más que una invitación: una experiencia completa para compartir, organizar y recordar.</p>
          </div>
          <div className="ac-premium-feature-grid">
            <article className={isPremium ? '' : 'locked'}>
              <Music2 />
              <strong>Música al entrar</strong>
              <span>{isPremium ? 'Elige la canción de tu familia' : 'Desbloquea esta experiencia'}</span>
            </article>
            <article className={isPremium ? '' : 'locked'}>
              <Star />
              <strong>RSVP inteligente</strong>
              <span>{isPremium ? 'Lista de invitados en tiempo real' : 'Respuestas y acompañantes'}</span>
            </article>
            <article className={isPremium ? '' : 'locked'}>
              <Sparkles />
              <strong>Sin marca de agua</strong>
              <span>{isPremium ? 'Identidad completamente personalizada' : 'Tu celebración, solo tuya'}</span>
            </article>
            {invitation.giftRegistry ? (
              <article>
                <Gift />
                <strong>Mesa de regalos</strong>
                <a href={invitation.giftRegistry} target="_blank" rel="noreferrer" style={{ fontSize: '0.76rem', color: '#7d877d' }}>
                  Ver mesa de regalos
                </a>
              </article>
            ) : (
              <article className={isPremium ? '' : 'locked'}>
                <Navigation />
                <strong>Dominio propio</strong>
                <span>{isPremium ? `${invitation.slug}.invita.mx` : 'Comparte un link memorable'}</span>
              </article>
            )}
          </div>
        </section>

        <section className="ac-block ac-gallery">
          <div className="ac-section-number">
            03 <span>RECUERDOS</span>
          </div>
          <div className="ac-gallery-head">
            <div>
              <p className="eyebrow">MOMENTOS PARA COMPARTIR</p>
              <h2>
                Un recuerdo
                <br />
                <em>bonito para guardar.</em>
              </h2>
            </div>
            <p>
              Cada instante de este día
              <br />
              merece una fotografía.
            </p>
          </div>
          <div className="ac-photo-grid">
            {photos.map((photo, index) => (
              <div className={`ac-photo ${index === 1 ? 'two' : index === 2 ? 'three' : ''}`} key={`${photo.name}-${photo.src}`}>
                <img src={photo.src} alt={photo.name} />
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{photo.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ac-rsvp">
          <div className="ac-rsvp-flower">{illustrationForEvent(invitation.eventType)}</div>
          <div>
            <p className="eyebrow">NOS ENCANTARÍA CONTAR CONTIGO</p>
            <h2>
              ¿Vienes a
              <br />
              <em>celebrar?</em>
            </h2>
            <p>Confirma tu asistencia para {invitation.names}.</p>
            <a className="ac-rsvp-button" href={rsvpHref} target="_blank" rel="noreferrer">
              Confirmar asistencia <ArrowUpRight />
            </a>
          </div>
        </section>

        <footer className="ac-footer">
          <span>Con cariño,</span>
          <strong>{invitation.names}</strong>
          <div>
            <CalendarDays /> {dayLabel} {monthLabel} {yearLabel} <Heart /> Invita
          </div>
        </footer>

        {watermark && (
          <footer className="watermark ac-watermark">
            <a href="/">✦ Hecho con esta app — crea la tuya gratis</a>
          </footer>
        )}
      </main>
    </div>
  )
}
