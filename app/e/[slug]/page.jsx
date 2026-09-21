import { notFound } from 'next/navigation'
import { getInvitation } from '@/lib/store'
import InvitationView from '@/components/InvitationView'
import StatusNotice from '@/components/StatusNotice'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const invitation = await getInvitation(slug)
  if (!invitation) {
    return { title: 'Invitación no encontrada' }
  }
  return {
    title: `${invitation.eventType} de ${invitation.names}`,
    description: invitation.welcome,
  }
}

export default async function InvitationPage({ params }) {
  const { slug } = await params
  const invitation = await getInvitation(slug)

  if (!invitation) {
    notFound()
  }

  // Server Component: se evalúa una vez por request, así que leer la hora
  // actual aquí (a diferencia de en un componente cliente) es correcto e
  // intencional — es lo que hace que la página se desactive sola.
  // oxlint-disable-next-line react/purity
  const isExpired = new Date(invitation.expiresAt).getTime() < Date.now()
  if (isExpired) {
    return (
      <StatusNotice
        eyebrow="Esta invitación ya no está disponible"
        title={`${invitation.eventType} de ${invitation.names}`}
        message="El evento ya tuvo lugar y esta página se desactivó automáticamente."
      />
    )
  }

  return <InvitationView invitation={invitation} watermark={invitation.tier !== 'premium'} />
}
