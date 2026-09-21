import StatusNotice from '@/components/StatusNotice'

export default function InvitationNotFound() {
  return (
    <StatusNotice
      eyebrow="404"
      title="No encontramos esta invitación"
      message="Revisa que el link esté completo, o crea la tuya en un par de minutos."
    />
  )
}
