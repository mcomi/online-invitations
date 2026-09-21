import './globals.css'

export const metadata = {
  title: {
    default: 'Invitaciones digitales — crea la tuya en minutos',
    template: '%s',
  },
  description: 'Crea una invitación digital para tu boda, XV años o evento y compártela con un link.',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fffaf1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
