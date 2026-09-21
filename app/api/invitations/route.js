import { NextResponse } from 'next/server'
import { buildAndSaveInvitation, ValidationError } from '@/lib/invitation'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'El formulario no se pudo leer. Intenta de nuevo.' }, { status: 400 })
  }

  try {
    const invitation = await buildAndSaveInvitation(body)
    return NextResponse.json({ slug: invitation.slug }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Error creando invitación:', error)
    return NextResponse.json(
      { error: error?.message || 'No se pudo guardar tu invitación. Intenta de nuevo en unos minutos.' },
      { status: 500 },
    )
  }
}
