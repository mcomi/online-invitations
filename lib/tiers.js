// Días de vigencia después de la fecha del evento antes de que la
// invitación se marque como vencida y deje de mostrarse a los invitados.
export const FREE_GRACE_DAYS = 15
export const PREMIUM_GRACE_DAYS = 180

export function graceDaysFor(tier) {
  return tier === 'premium' ? PREMIUM_GRACE_DAYS : FREE_GRACE_DAYS
}
