// Punto único de acceso a datos. Elige automáticamente entre el almacenamiento
// local en JSON (desarrollo, cero configuración) y Supabase (producción),
// según si las variables de entorno de Supabase están presentes.
//
// El resto de la app importa siempre desde aquí, nunca directamente de
// store.local.js / store.supabase.js — así, conectar una base de datos real
// es cambiar variables de entorno, no código.
import { cache } from 'react'
import * as localStore from './store.local'
import * as supabaseStore from './store.supabase'

const useSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
const impl = useSupabase ? supabaseStore : localStore

export const backend = useSupabase ? 'supabase' : 'local'

// cache() deduplica llamadas por request (p. ej. generateMetadata y la página
// piden la misma invitación dentro de la misma petición).
export const getInvitation = cache(impl.getInvitation)
export const slugExists = impl.slugExists
export const createInvitation = impl.createInvitation
