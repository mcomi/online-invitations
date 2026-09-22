// Almacenamiento en Supabase (Postgres). Se activa automáticamente cuando
// existen SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el entorno — ver
// lib/store.js y .env.example. El esquema de la tabla está en supabase/schema.sql.
import { createClient } from '@supabase/supabase-js'

let client = null

function getClient() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
  }
  return client
}

function rowToInvitation(row) {
  return {
    slug: row.slug,
    tier: row.tier,
    template: row.template || 'acuarela',
    eventType: row.event_type,
    names: row.names,
    eventDate: row.event_date,
    city: row.city,
    welcome: row.welcome,
    church: row.church,
    reception: row.reception,
    dressCode: row.dress_code ?? '',
    giftRegistry: row.gift_registry ?? '',
    rsvpPhone: row.rsvp_phone,
    rsvpMessage: row.rsvp_message ?? '',
    photos: row.photos ?? [],
    finalMessage: row.final_message,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  }
}

function invitationToRow(invitation) {
  return {
    slug: invitation.slug,
    tier: invitation.tier,
    template: invitation.template || 'acuarela',
    event_type: invitation.eventType,
    names: invitation.names,
    event_date: invitation.eventDate,
    city: invitation.city,
    welcome: invitation.welcome,
    church: invitation.church,
    reception: invitation.reception,
    dress_code: invitation.dressCode || null,
    gift_registry: invitation.giftRegistry || null,
    rsvp_phone: invitation.rsvpPhone,
    rsvp_message: invitation.rsvpMessage || null,
    photos: invitation.photos || [],
    final_message: invitation.finalMessage,
    created_at: invitation.createdAt,
    expires_at: invitation.expiresAt,
  }
}

export async function getInvitation(slug) {
  const { data, error } = await getClient().from('invitations').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data ? rowToInvitation(data) : null
}

export async function slugExists(slug) {
  const { count, error } = await getClient()
    .from('invitations')
    .select('slug', { count: 'exact', head: true })
    .eq('slug', slug)
  if (error) throw error
  return (count ?? 0) > 0
}

export async function createInvitation(invitation) {
  const { error } = await getClient().from('invitations').insert(invitationToRow(invitation))
  if (error) {
    if (error.code === '23505') {
      throw new Error('Ese link ya está en uso. Elige otro.')
    }
    throw error
  }
  return invitation
}
