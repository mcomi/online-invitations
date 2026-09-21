'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { slugify } from '@/lib/slug'

const EVENT_TYPE_OPTIONS = ['Primera Comunión', 'Boda', 'XV Años', 'Bautizo', 'Cumpleaños', 'Baby Shower']

const initialForm = {
  eventType: '',
  names: '',
  slug: '',
  eventDate: '',
  city: '',
  welcome: '',
  church: { name: '', time: '', address: '', maps: '' },
  reception: { name: '', time: '', address: '', maps: '' },
  dressCode: '',
  giftRegistry: '',
  rsvpPhone: '',
  rsvpMessage: '',
  finalMessage: '',
  photos: [
    { name: '', src: '' },
    { name: '', src: '' },
    { name: '', src: '' },
  ],
}

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="hint">{hint}</span>}
    </label>
  )
}

export default function CrearPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [createdSlug, setCreatedSlug] = useState('')
  const [copied, setCopied] = useState(false)

  const slugPreview = useMemo(
    () => slugify(form.slug || form.names || ''),
    [form.slug, form.names],
  )

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
      <main className="form-page">
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
          <div className="landing-cta">
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
    <main className="form-page">
      <form className="form-shell" onSubmit={handleSubmit}>
        <header className="form-header">
          <p className="status-eyebrow">Nueva invitación</p>
          <h1>Cuéntanos de tu evento</h1>
          <p>Se publica en el plan gratis: link para compartir, con una pequeña marca de agua.</p>
        </header>

        {error && <p className="error-banner">{error}</p>}

        <fieldset className="form-section">
          <legend>Datos generales</legend>
          <div className="field-row">
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
            <Field label="Nombres de los festejados">
              <input
                value={form.names}
                onChange={(e) => update('names', e.target.value)}
                placeholder="Ana &amp; Luis"
                required
              />
            </Field>
          </div>

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

          <div className="field-row">
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
          </div>

          <Field label="Mensaje de bienvenida">
            <textarea
              rows={3}
              value={form.welcome}
              onChange={(e) => update('welcome', e.target.value)}
              required
            />
          </Field>
        </fieldset>

        <fieldset className="form-section">
          <legend>Ceremonia</legend>
          <div className="field-row">
            <Field label="Nombre del lugar">
              <input value={form.church.name} onChange={(e) => updateNested('church', 'name', e.target.value)} required />
            </Field>
            <Field label="Hora">
              <input
                value={form.church.time}
                onChange={(e) => updateNested('church', 'time', e.target.value)}
                placeholder="12:00 p.m."
                required
              />
            </Field>
          </div>
          <Field label="Dirección">
            <input value={form.church.address} onChange={(e) => updateNested('church', 'address', e.target.value)} required />
          </Field>
          <Field label="Link de Google Maps (opcional)" hint="Si lo dejas vacío, generamos una búsqueda con la dirección">
            <input value={form.church.maps} onChange={(e) => updateNested('church', 'maps', e.target.value)} />
          </Field>
        </fieldset>

        <fieldset className="form-section">
          <legend>Recepción</legend>
          <div className="field-row">
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
          </div>
          <Field label="Dirección">
            <input
              value={form.reception.address}
              onChange={(e) => updateNested('reception', 'address', e.target.value)}
              required
            />
          </Field>
          <Field label="Link de Google Maps (opcional)">
            <input value={form.reception.maps} onChange={(e) => updateNested('reception', 'maps', e.target.value)} />
          </Field>
        </fieldset>

        <fieldset className="form-section">
          <legend>Detalles opcionales</legend>
          <Field label="Dress code">
            <input value={form.dressCode} onChange={(e) => update('dressCode', e.target.value)} />
          </Field>
          <Field label="Link de mesa de regalos">
            <input value={form.giftRegistry} onChange={(e) => update('giftRegistry', e.target.value)} placeholder="https://" />
          </Field>
          <div className="field-row">
            {form.photos.map((photo, index) => (
              <Field label={`Foto ${index + 1} (URL)`} key={index}>
                <input
                  value={photo.src}
                  onChange={(e) => updatePhoto(index, 'src', e.target.value)}
                  placeholder="https://…"
                />
              </Field>
            ))}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>RSVP</legend>
          <div className="field-row">
            <Field label="WhatsApp para confirmaciones" hint="Con código de país, solo números">
              <input
                value={form.rsvpPhone}
                onChange={(e) => update('rsvpPhone', e.target.value)}
                placeholder="525500000000"
                required
              />
            </Field>
          </div>
          <Field label="Mensaje final">
            <textarea
              rows={2}
              value={form.finalMessage}
              onChange={(e) => update('finalMessage', e.target.value)}
              required
            />
          </Field>
        </fieldset>

        <button className="button submit" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Publicando…' : 'Publicar invitación'}
        </button>
      </form>
    </main>
  )
}
