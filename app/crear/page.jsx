'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  Link2,
  MapPin,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { slugify } from '@/lib/slug'
import '@/components/CrearBuilder.css'

const EVENT_TYPE_OPTIONS = ['Primera Comunión', 'Boda', 'XV Años', 'Bautizo', 'Cumpleaños', 'Baby Shower']

const TEMPLATE_OPTIONS = [
  { value: 'acuarela', name: 'Acuarela suave', detail: 'Ilustrada · pastel · hecha a mano' },
  { value: 'clasico', name: 'Dorado clásico', detail: 'Floral · dorado y morado' },
  { value: 'minimal', name: 'Minimalista', detail: 'Tipográfica · líneas finas' },
]

const STEPS = [
  { title: 'Tu evento', detail: 'Tipo, nombres y fecha' },
  { title: 'La celebración', detail: 'Ceremonia y recepción' },
  { title: 'Tu estilo', detail: 'Plantilla, fotos y detalles' },
  { title: 'Publicar', detail: 'RSVP y privacidad' },
]

const initialForm = {
  eventType: '',
  names: '',
  slug: '',
  eventDate: '',
  city: '',
  welcome: '',
  template: 'acuarela',
  church: { name: '', time: '', address: '', maps: '' },
  reception: { name: '', time: '', address: '', maps: '' },
  dressCode: '',
  giftRegistry: '',
  rsvpPhone: '',
  rsvpMessage: '',
  finalMessage: '',
  tier: 'free',
  photos: [
    { name: '', src: '' },
    { name: '', src: '' },
    { name: '', src: '' },
  ],
}

function Field({ label, hint, className = '', children }) {
  return (
    <label className={className}>
      {label}
      {children}
      {hint && <span className="builder2-hint">{hint}</span>}
    </label>
  )
}

export default function CrearPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [createdSlug, setCreatedSlug] = useState('')
  const [copied, setCopied] = useState(false)

  const slugPreview = useMemo(() => slugify(form.slug || form.names || ''), [form.slug, form.names])
  const isPremium = form.tier === 'premium'

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateNested(group, field, value) {
    setForm((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }))
  }

  function updatePhoto(index, field, value) {
    setForm((prev) => {
      const photos = prev.photos.map((photo, i) => (i === index ? { ...photo, [field]: value } : photo))
      return { ...prev, photos }
    })
  }

  function goNext() {
    setStep((value) => Math.min(value + 1, STEPS.length - 1))
  }

  function goBack() {
    setStep((value) => Math.max(value - 1, 0))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const payload = {
      ...form,
      eventDate: form.eventDate ? `${form.eventDate}:00-06:00` : '',
      photos: form.photos.filter((photo) => photo.src.trim()),
    }

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'No se pudo crear tu invitación.')
        setStatus('error')
        return
      }

      setCreatedSlug(data.slug)
      setStatus('success')
    } catch {
      setError('No hay conexión. Revisa tu internet e intenta de nuevo.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    const link = `/e/${createdSlug}`
    return (
      <main className="form-page" style={{ display: 'block' }}>
        <div className="success-panel">
          <p className="status-eyebrow">Lista</p>
          <h1>Tu invitación ya está publicada</h1>
          <p>Compártela con tus invitados por WhatsApp, mensaje o donde quieras.</p>
          <div className="success-link">
            <code>{link}</code>
            <button
              type="button"
              className="button ghost"
              onClick={async () => {
                await navigator.clipboard.writeText(`${window.location.origin}${link}`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              {copied ? 'Copiado' : 'Copiar link'}
            </button>
          </div>
          <div className="landing-cta" style={{ justifyContent: 'center' }}>
            <Link className="button" href={link}>
              Ver invitación
            </Link>
            <Link className="button ghost" href="/crear">
              Crear otra
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={`builder2 ${isPremium ? 'builder2-premium' : ''}`}>
      <aside className="builder2-side">
        <Link className="builder2-brand" href="/">
          <span>✦</span> Invita
        </Link>
        <div className="builder2-side-intro">
          <p>
            CREA ALGO
            <br />
            <em>inolvidable.</em>
          </p>
          <span>Tu invitación toma forma mientras la completas.</span>
        </div>
        <nav className="builder2-steps" aria-label="Pasos de creación">
          {STEPS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`${index === step ? 'current' : ''} ${index < step ? 'done' : ''}`}
              onClick={() => setStep(index)}
            >
              <b>{index < step ? <Check /> : `0${index + 1}`}</b>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
            </button>
          ))}
        </nav>
        <div className="builder2-side-note">
          <Sparkles />
          <p>
            <strong>Un tip de diseño</strong>
            <br />
            Las fotos verticales hacen que tu invitación se sienta más editorial.
          </p>
        </div>
      </aside>

      <section className="builder2-main">
        <form onSubmit={handleSubmit}>
          <header className="builder2-top">
            <div>
              <span className="builder2-kicker">
                NUEVA INVITACIÓN · {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
              </span>
              <h1>{STEPS[step].title}</h1>
            </div>
            <div className="plan-choice">
              <span>Publicar como</span>
              <button type="button" className={!isPremium ? 'active' : ''} onClick={() => update('tier', 'free')}>
                Gratis
              </button>
              <button
                type="button"
                className={isPremium ? 'active premium' : ''}
                onClick={() => update('tier', 'premium')}
              >
                Premium <em>PRO</em>
              </button>
            </div>
          </header>

          {isPremium && (
            <div className="upgrade-banner">
              <WandSparkles />
              <div>
                <strong>Estás creando una experiencia Premium</strong>
                <span>Sin marca de agua · vigencia extendida a 6 meses</span>
              </div>
              <small>Próximamente</small>
            </div>
          )}

          {error && <p className="builder2-error-banner">{error}</p>}

          <div className="builder2-content">
            {step === 0 && (
              <section className="builder2-form-section">
                <div className="builder2-section-heading">
                  <span>01</span>
                  <div>
                    <h2>Cuéntanos de tu evento</h2>
                    <p>Lo esencial para darle una identidad a tu invitación.</p>
                  </div>
                </div>
                <div className="builder2-form-grid">
                  <Field label="Tipo de evento">
                    <input
                      list="event-types"
                      value={form.eventType}
                      onChange={(e) => update('eventType', e.target.value)}
                      placeholder="Boda, XV Años, Primera Comunión…"
                      required
                    />
                    <datalist id="event-types">
                      {EVENT_TYPE_OPTIONS.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </Field>
                  <Field label="Nombre de los festejados">
                    <input
                      value={form.names}
                      onChange={(e) => update('names', e.target.value)}
                      placeholder="Ana & Luis"
                      required
                    />
                  </Field>
                  <Field label="Fecha y hora del evento" hint="Hora local de Ciudad de México (UTC-6)">
                    <input
                      type="datetime-local"
                      value={form.eventDate}
                      onChange={(e) => update('eventDate', e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Ciudad">
                    <input value={form.city} onChange={(e) => update('city', e.target.value)} required />
                  </Field>
                  <Field
                    label="Link para compartir (opcional)"
                    hint={slugPreview ? `tuapp.com/e/${slugPreview}` : 'Se genera a partir de los nombres si lo dejas vacío'}
                  >
                    <input
                      value={form.slug}
                      onChange={(e) => update('slug', e.target.value)}
                      placeholder="ana-y-luis"
                    />
                  </Field>
                  <Field label="Mensaje de bienvenida" className="wide">
                    <textarea
                      rows={3}
                      value={form.welcome}
                      onChange={(e) => update('welcome', e.target.value)}
                      placeholder="Con el corazón lleno de alegría…"
                      required
                    />
                  </Field>
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="builder2-form-section">
                <div className="builder2-section-heading">
                  <span>02</span>
                  <div>
                    <h2>Diseña el recorrido</h2>
                    <p>Haz que tus invitados sepan dónde estar y cuándo.</p>
                  </div>
                </div>

                <div className="builder2-place-card">
                  <div className="builder2-place-icon">
                    <MapPin />
                  </div>
                  <div>
                    <span className="place-label">CEREMONIA</span>
                    <div className="builder2-place-fields">
                      <Field label="Nombre del lugar">
                        <input
                          value={form.church.name}
                          onChange={(e) => updateNested('church', 'name', e.target.value)}
                          required
                        />
                      </Field>
                      <Field label="Hora">
                        <input
                          value={form.church.time}
                          onChange={(e) => updateNested('church', 'time', e.target.value)}
                          placeholder="12:00 p.m."
                          required
                        />
                      </Field>
                      <Field label="Dirección" className="wide">
                        <input
                          value={form.church.address}
                          onChange={(e) => updateNested('church', 'address', e.target.value)}
                          required
                        />
                      </Field>
                      <Field label="Link de Google Maps (opcional)" className="wide" hint="Si lo dejas vacío, generamos una búsqueda con la dirección">
                        <input value={form.church.maps} onChange={(e) => updateNested('church', 'maps', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="builder2-place-card">
                  <div className="builder2-place-icon warm">
                    <MapPin />
                  </div>
                  <div>
                    <span className="place-label">RECEPCIÓN</span>
                    <div className="builder2-place-fields">
                      <Field label="Nombre del lugar">
                        <input
                          value={form.reception.name}
                          onChange={(e) => updateNested('reception', 'name', e.target.value)}
                          required
                        />
                      </Field>
                      <Field label="Hora">
                        <input
                          value={form.reception.time}
                          onChange={(e) => updateNested('reception', 'time', e.target.value)}
                          placeholder="Después de la ceremonia"
                          required
                        />
                      </Field>
                      <Field label="Dirección" className="wide">
                        <input
                          value={form.reception.address}
                          onChange={(e) => updateNested('reception', 'address', e.target.value)}
                          required
                        />
                      </Field>
                      <Field label="Link de Google Maps (opcional)" className="wide">
                        <input
                          value={form.reception.maps}
                          onChange={(e) => updateNested('reception', 'maps', e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="builder2-form-section">
                <div className="builder2-section-heading">
                  <span>03</span>
                  <div>
                    <h2>Hazla tuya</h2>
                    <p>Elige una estética y agrega los detalles que hacen especial este día.</p>
                  </div>
                </div>

                <div className="builder2-template-grid">
                  {TEMPLATE_OPTIONS.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`builder2-template-card ${form.template === option.value ? 'selected' : ''}`}
                      onClick={() => update('template', option.value)}
                    >
                      <div className={`builder2-template-art ${option.value}`}>
                        <span>
                          {form.names.split(/\s+/)[0] || 'Tu'}
                          <br />
                          <em>{form.names.split(/\s+/).slice(1).join(' ') || 'invitación'}</em>
                        </span>
                      </div>
                      <strong>
                        {option.name}
                        {form.template === option.value && <Check size={14} />}
                      </strong>
                      <small>{option.detail}</small>
                    </button>
                  ))}
                </div>

                <div className="builder2-upload-row">
                  {form.photos.map((photo, index) => (
                    <div className="builder2-upload-card" key={index}>
                      <ImagePlus />
                      <strong>Foto {index + 1}</strong>
                      <input
                        value={photo.src}
                        onChange={(e) => updatePhoto(index, 'src', e.target.value)}
                        placeholder="https://…"
                      />
                    </div>
                  ))}
                </div>

                <div className="builder2-form-grid" style={{ marginTop: 24 }}>
                  <Field label="Dress code">
                    <input value={form.dressCode} onChange={(e) => update('dressCode', e.target.value)} />
                  </Field>
                  <Field label="Link de mesa de regalos">
                    <input
                      value={form.giftRegistry}
                      onChange={(e) => update('giftRegistry', e.target.value)}
                      placeholder="https://"
                    />
                  </Field>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="builder2-form-section">
                <div className="builder2-section-heading">
                  <span>04</span>
                  <div>
                    <h2>Lista para compartir</h2>
                    <p>Último paso: decide cómo quieres recibir confirmaciones.</p>
                  </div>
                </div>
                <div className="builder2-publish-card">
                  <div className="builder2-publish-preview">
                    <span>INVITA</span>
                    <strong>{form.names || 'Tu invitación'}</strong>
                    <em>{form.eventType || 'Tu evento'}</em>
                    <small>{slugPreview ? `invita.mx/${slugPreview}` : ''}</small>
                  </div>
                  <div className="builder2-publish-details">
                    <Field label="WhatsApp para confirmaciones" hint="Con código de país, solo números">
                      <input
                        value={form.rsvpPhone}
                        onChange={(e) => update('rsvpPhone', e.target.value)}
                        placeholder="525500000000"
                        required
                      />
                    </Field>
                    <Field label="Mensaje final">
                      <textarea
                        rows={2}
                        value={form.finalMessage}
                        onChange={(e) => update('finalMessage', e.target.value)}
                        placeholder="Será un placer contar contigo."
                        required
                      />
                    </Field>
                    <div className="builder2-publish-link">
                      <Link2 />
                      <span>tuapp.com/e/{slugPreview || '…'}</span>
                    </div>
                  </div>
                </div>

                <div className={`watermark-choice ${isPremium ? 'premium-choice' : ''}`}>
                  <Sparkles />
                  <div>
                    <strong>{isPremium ? 'Experiencia Premium activada' : 'Plan gratuito'}</strong>
                    <span>
                      {isPremium
                        ? 'Tu invitación se publica sin marca de agua y con vigencia extendida.'
                        : 'Incluye una firma discreta de Invita al final de tu invitación.'}
                    </span>
                  </div>
                  <button type="button" onClick={() => update('tier', isPremium ? 'free' : 'premium')}>
                    {isPremium ? 'Cambiar a Gratis' : 'Ver Premium'}
                  </button>
                </div>
              </section>
            )}
          </div>

          <footer className="builder2-actions">
            <button className="back" type="button" onClick={goBack} disabled={step === 0}>
              <ArrowLeft /> Atrás
            </button>
            <span>Guardado automáticamente</span>
            {step < STEPS.length - 1 ? (
              <button className="next" type="button" onClick={goNext}>
                Continuar <ArrowRight />
              </button>
            ) : (
              <button className="publish" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Publicando…' : 'Publicar invitación'} <Sparkles />
              </button>
            )}
          </footer>
        </form>
      </section>
    </main>
  )
}
