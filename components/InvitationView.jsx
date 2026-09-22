import InvitationAcuarela from './templates/InvitationAcuarela'
import InvitationClasico from './templates/InvitationClasico'
import InvitationMinimal from './templates/InvitationMinimal'

const TEMPLATES = {
  acuarela: InvitationAcuarela,
  clasico: InvitationClasico,
  minimal: InvitationMinimal,
}

// Elige la plantilla visual según invitation.template (ver lib/invitation.js).
// El resto de la app (la página pública, la API) solo conoce este selector,
// nunca las plantillas individuales.
export default function InvitationView({ invitation, watermark = false }) {
  const Template = TEMPLATES[invitation.template] || InvitationAcuarela
  return <Template invitation={invitation} watermark={watermark} />
}
