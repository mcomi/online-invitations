// Pantalla compartida para "invitación vencida" y "invitación no encontrada".
export default function StatusNotice({ eyebrow, title, message, ctaHref = '/', ctaLabel = 'Crear una invitación' }) {
  return (
    <main className="status-notice">
      <div className="status-card">
        <p className="status-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <a className="button" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </main>
  )
}
