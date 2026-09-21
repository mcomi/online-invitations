import { slugify, randomSuffix } from './slug'
import { graceDaysFor } from './tiers'
import { slugExists, createInvitation as saveInvitation } from './store'

export class ValidationError extends Error {}

function required(value, field) {
  const text = value == null ? '' : String(value).trim()
  if (!text) {
    throw new ValidationError(`Falta el campo "${field}".`)
  }
  return text
}

function mapsSearchUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || '')}`
}

async function uniqueSlug(base) {
  let slug = base
  let attempts = 0
  // eslint-disable-next-line no-await-in-loop
  while (await slugExists(slug)) {
    attempts += 1
    if (attempts > 5) {
      throw new ValidationError('Ese link ya está en uso. Elige otro nombre para tu invitación.')
    }
    slug = `${base}-${randomSuffix(4)}`
  }
  return slug
}

// Recibe el payload del formulario de /crear, lo valida, arma el registro
// completo de la invitación (slug único, vigencia calculada, valores por
// defecto) y lo guarda. Lanza ValidationError con un mensaje mostrable al
// usuario cuando el input no es válido.
export async function buildAndSaveInvitation(input) {
  const names = required(input.names, 'Nombres')
  const eventType = required(input.eventType, 'Tipo de evento')
  const city = required(input.city, 'Ciudad')
  const welcome = required(input.welcome, 'Mensaje de bienvenida')
  const rsvpPhoneRaw = required(input.rsvpPhone, 'Teléfono de WhatsApp para RSVP')
  const finalMessage = required(input.finalMessage, 'Mensaje final')

  const eventDate = new Date(input.eventDate)
  if (Number.isNaN(eventDate.getTime())) {
    throw new ValidationError('La fecha y hora del evento no son válidas.')
  }

  const church = {
    name: required(input.church?.name, 'Nombre del lugar de la ceremonia'),
    time: required(input.church?.time, 'Hora de la ceremonia'),
    address: required(input.church?.address, 'Dirección de la ceremonia'),
    maps: input.church?.maps?.trim() || mapsSearchUrl(input.church?.address),
  }

  const reception = {
    name: required(input.reception?.name, 'Nombre del lugar de la recepción'),
    time: required(input.reception?.time, 'Hora de la recepción'),
    address: required(input.reception?.address, 'Dirección de la recepción'),
    maps: input.reception?.maps?.trim() || mapsSearchUrl(input.reception?.address),
  }

  const photos = Array.isArray(input.photos)
    ? input.photos.filter((photo) => photo?.src?.trim()).map((photo) => ({
        name: photo.name?.trim() || names,
        src: photo.src.trim(),
      }))
    : []

  const rsvpPhone = rsvpPhoneRaw.replace(/[^\d]/g, '')
  if (rsvpPhone.length < 10) {
    throw new ValidationError('El teléfono de RSVP debe tener al menos 10 dígitos (incluye código de país si aplica).')
  }

  const tier = input.tier === 'premium' ? 'premium' : 'free'
  const graceDays = graceDaysFor(tier)
  const expiresAt = new Date(eventDate.getTime() + graceDays * 86400000)

  const slugBase = slugify(input.slug || names)
  if (!slugBase) {
    throw new ValidationError('No se pudo generar un link a partir de ese nombre. Prueba con otro texto.')
  }
  const slug = await uniqueSlug(slugBase)

  const invitation = {
    slug,
    tier,
    eventType,
    names,
    eventDate: eventDate.toISOString(),
    city,
    welcome,
    church,
    reception,
    dressCode: input.dressCode?.trim() || '',
    giftRegistry: input.giftRegistry?.trim() || '',
    rsvpPhone,
    rsvpMessage: input.rsvpMessage?.trim() || `Hola, confirmo mi asistencia a ${eventType} de ${names}.`,
    photos,
    finalMessage,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
  }

  await saveInvitation(invitation)
  return invitation
}
