// Almacenamiento en archivos JSON, uno por invitación.
//
// Sirve para desarrollo local y para el seed de demo (data/invitations/*.json)
// sin necesitar ninguna cuenta externa. NO funciona en producción en Vercel:
// el sistema de archivos ahí es de solo lectura fuera de /tmp, así que
// createInvitation fallará con un mensaje explicando cómo conectar Supabase
// (ver supabase/schema.sql y .env.example).
import fs from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'data', 'invitations')

function filePath(slug) {
  return path.join(DATA_DIR, `${slug}.json`)
}

export async function getInvitation(slug) {
  try {
    const raw = await fs.readFile(filePath(slug), 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

export async function slugExists(slug) {
  return (await getInvitation(slug)) !== null
}

export async function createInvitation(invitation) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.writeFile(filePath(invitation.slug), JSON.stringify(invitation, null, 2), {
      flag: 'wx', // falla si el archivo ya existe, en vez de sobrescribir en silencio
    })
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error('Ese link ya está en uso. Elige otro.')
    }
    if (error.code === 'EROFS' || error.code === 'EACCES') {
      throw new Error(
        'Este entorno no permite guardar archivos (normalmente pasa en producción en Vercel). ' +
          'Conecta Supabase para poder crear invitaciones ahí: ver supabase/schema.sql y .env.example.',
      )
    }
    throw error
  }
  return invitation
}
