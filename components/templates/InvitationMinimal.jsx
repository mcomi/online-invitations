'use client'

import { useEffect, useMemo, useState } from 'react'
import './InvitationMinimal.css'

const DEFAULT_PHOTOS = [
  { name: 'Foto 1', src: '/photos/regina-placeholder.svg' },
  { name: 'Foto 2', src: '/photos/natalia-placeholder.svg' },
  { name: 'Foto 3', src: '/photos/together-placeholder.svg' },
]

function getCountdown(eventDate) {
  const diff = Math.max(eventDate.getTime() - Date.now(), 0)
  return [
    { label: 'Días', value: Math.floor(diff / 86400000) },
    { label: 'Hrs', value: Math.floor((diff / 3600000) % 24) },
    { label: 'Min', value: Math.floor((diff / 60000) % 60) },
  ]
}

export default function InvitationMinimal({ invitation, watermark = false }) {
  const eventDate = useMemo(() => new Date(invitation.eventDate), [invitation.eventDate])
  const [countdown, setCountdown] = useState(() => getCountdown(eventDate))

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown(eventDate)), 1000)
    return () => window.clearInterval(timer)
  }, [eventDate])

  const rsvpHref = useMemo(
    () => `https://wa.me/${invitation.rsvpPhone}?text=${encodeURIComponent(invitation.rsvpMessage || '')}`,
    [invitation.rsvpPhone, invitation.rsvpMessage],
  )

  const dateLabel = useMemo(
    () => new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(eventDate),
    [eventDate],
  )
  const timeLabel = useMemo(
    () => new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit' }).format(eventDate),
    [eventDate],
  )

  const nameParts = invitation.names.split(/\s*(?:&|y)\s*/i)
  const photos = invitation.photos?.length ? invitation.photos : DEFAULT_PHOTOS

  return (
    <div className="tpl-minimal">
      <main>
        <section className="hero" style={{ borderBottom: '1px solid var(--mn-line)' }}>
          <div className="hero-top">
            <span>Save the date</span>
            <span>{invitation.city}</span>
          </div>
          <div className="hero-center">
            <p className="eyebrow">{invitation.eventType}</p>
            <h1>
              {nameParts.length > 1 ? (
                <>
                  {nameParts[0]}
                  <br />
                  <span className="amp">&amp;</span>
                  <br />
                  {nameParts.slice(1).join(' y ')}
                </>
              ) : (
                invitation.names
              )}
            </h1>
          </div>
          <div className="hero-bottom">
            <span>{dateLabel}</span>
            <span className="rule" />
            <span>{timeLabel}</span>
          </div>
        </section>

        <section className="two-col">
          <div>
            <p className="eyebrow">Bienvenida</p>
            <p className="welcome-text">{invitation.welcome}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p className="eyebrow">Cuenta regresiva</p>
            <div className="countdown-row">
              {countdown.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="eyebrow">Itinerario</p>
          <div>
            <div className="itinerary-row">
              <span className="itinerary-time">{invitation.church.time}</span>
              <div>
                <div className="itinerary-title">{invitation.church.name}</div>
                <div className="itinerary-address">{invitation.church.address}</div>
              </div>
              <a className="btn" href={invitation.church.maps} target="_blank" rel="noreferrer">
                Mapa
              </a>
            </div>
            <div className="itinerary-row">
              <span className="itinerary-time">{invitation.reception.time}</span>
              <div>
                <div className="itinerary-title">{invitation.reception.name}</div>
                <div className="itinerary-address">{invitation.reception.address}</div>
              </div>
              <a className="btn" href={invitation.reception.maps} target="_blank" rel="noreferrer">
                Mapa
              </a>
            </div>
          </div>
        </section>

        {(invitation.dressCode || invitation.giftRegistry) && (
          <section className="two-col">
            {invitation.dressCode && (
              <div>
                <p className="eyebrow">Dress code</p>
                <p className="details-text">{invitation.dressCode}</p>
              </div>
            )}
            {invitation.giftRegistry && (
              <div>
                <p className="eyebrow">Mesa de regalos</p>
                <p className="details-copy">Tu presencia es nuestro regalo más especial.</p>
                <a className="btn" href={invitation.giftRegistry} target="_blank" rel="noreferrer">
                  Ver mesa
                </a>
              </div>
            )}
          </section>
        )}

        <section>
          <p className="eyebrow">Momentos</p>
          <div className="photo-grid">
            <div className="photo-tile tall">
              {photos[0] && <img src={photos[0].src} alt={photos[0].name} />}
            </div>
            <div className="photo-col">
              {photos[1] && (
                <div className="photo-tile">
                  <img src={photos[1].src} alt={photos[1].name} />
                </div>
              )}
              {photos[3] && (
                <div className="photo-tile">
                  <img src={photos[3].src} alt={photos[3].name} />
                </div>
              )}
            </div>
            <div className="photo-tile tall">
              {photos[2] && <img src={photos[2].src} alt={photos[2].name} />}
            </div>
          </div>
        </section>

        <section className="rsvp-section" style={{ borderBottom: watermark ? '1px solid var(--mn-line)' : 'none' }}>
          <p className="eyebrow">RSVP</p>
          <h2>Confírmanos tu asistencia</h2>
          <a className="btn primary" href={rsvpHref} target="_blank" rel="noreferrer">
            Confirmar por WhatsApp
          </a>
        </section>

        <div className="minimal-footer">
          <span>{invitation.names} · {eventDate.getFullYear()}</span>
          {watermark && <a href="/">Hecho con esta app</a>}
        </div>
      </main>
    </div>
  )
}
