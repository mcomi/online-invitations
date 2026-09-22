// Ilustraciones acuarela por tipo de evento para la plantilla "Acuarela".
// Cada una es un SVG propio (sin dependencias externas ni assets de terceros)
// que simula textura de pincelada superponiendo formas orgánicas
// semitransparentes con blur — la misma técnica que usan las referencias
// de acuarela digital, sin necesitar un archivo bitmap.

function WatercolorDefs({ id }) {
  return (
    <defs>
      <filter id={`${id}-tex`} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        <feComposite operator="over" in2="SourceGraphic" result="withNoise" />
        <feGaussianBlur in="withNoise" stdDeviation="0.4" />
      </filter>
    </defs>
  )
}

// Bautizo: cruz floral con globos, paleta azul cielo + crema + terracota.
export function BautizoIllustration() {
  return (
    <svg viewBox="0 0 560 300" aria-hidden="true">
      <WatercolorDefs id="baut" />
      <g filter="url(#baut-tex)">
        <ellipse cx="106" cy="88" rx="38" ry="48" fill="#a9c4e0" opacity="0.55" />
        <ellipse cx="112" cy="82" rx="30" ry="38" fill="#cddaf0" opacity="0.6" />
        <line x1="108" y1="134" x2="140" y2="240" stroke="#a9c4e0" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="58" cy="130" rx="28" ry="35" fill="#e8c9a0" opacity="0.55" />
        <ellipse cx="62" cy="126" rx="21" ry="27" fill="#f3e0c4" opacity="0.6" />
        <line x1="60" y1="163" x2="82" y2="240" stroke="#e0bd8f" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="454" cy="88" rx="38" ry="48" fill="#a9c4e0" opacity="0.55" />
        <ellipse cx="448" cy="82" rx="30" ry="38" fill="#cddaf0" opacity="0.6" />
        <line x1="452" y1="134" x2="420" y2="240" stroke="#a9c4e0" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="502" cy="130" rx="28" ry="35" fill="#e8c9a0" opacity="0.55" />
        <ellipse cx="498" cy="126" rx="21" ry="27" fill="#f3e0c4" opacity="0.6" />
        <line x1="500" y1="163" x2="478" y2="240" stroke="#e0bd8f" strokeWidth="1.6" opacity="0.7" />
      </g>
      <g filter="url(#baut-tex)">
        <rect x="264" y="70" width="32" height="150" rx="6" fill="#c9a86a" opacity="0.5" />
        <rect x="212" y="120" width="136" height="30" rx="6" fill="#c9a86a" opacity="0.5" />
        <rect x="268" y="76" width="24" height="138" rx="4" fill="#e0bd8f" opacity="0.55" />
        <rect x="218" y="126" width="124" height="18" rx="4" fill="#e0bd8f" opacity="0.55" />
      </g>
      <g opacity="0.85">
        <ellipse cx="220" cy="118" rx="16" ry="11" fill="#dcbfe0" opacity="0.65" />
        <ellipse cx="340" cy="118" rx="16" ry="11" fill="#c8dcc0" opacity="0.6" />
        <ellipse cx="280" cy="66" rx="14" ry="18" fill="#f0d9ae" opacity="0.65" />
        <ellipse cx="252" cy="200" rx="13" ry="17" fill="#dcbfe0" opacity="0.55" />
        <ellipse cx="308" cy="200" rx="13" ry="17" fill="#c8dcc0" opacity="0.5" />
      </g>
      <path
        d="M225 245 Q280 195 335 245"
        fill="none"
        stroke="#8fa9c8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

// Boda: arco floral romántico, tonos malva + dorado suave.
export function BodaIllustration() {
  return (
    <svg viewBox="0 0 560 280" aria-hidden="true">
      <WatercolorDefs id="boda" />
      <g filter="url(#boda-tex)">
        <path
          d="M60 260 C60 120 180 40 280 40 C380 40 500 120 500 260"
          fill="none"
          stroke="#c9a2b8"
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M60 260 C60 120 180 40 280 40 C380 40 500 120 500 260"
          fill="none"
          stroke="#e3c9a3"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
      <g opacity="0.8">
        <ellipse cx="70" cy="250" rx="22" ry="30" fill="#d9bfd0" opacity="0.6" />
        <ellipse cx="95" cy="230" rx="18" ry="24" fill="#e3c9a3" opacity="0.55" />
        <ellipse cx="50" cy="215" rx="16" ry="22" fill="#c9d8bf" opacity="0.5" />
        <ellipse cx="490" cy="250" rx="22" ry="30" fill="#d9bfd0" opacity="0.6" />
        <ellipse cx="465" cy="230" rx="18" ry="24" fill="#e3c9a3" opacity="0.55" />
        <ellipse cx="510" cy="215" rx="16" ry="22" fill="#c9d8bf" opacity="0.5" />
        <ellipse cx="150" cy="70" rx="20" ry="26" fill="#d9bfd0" opacity="0.5" />
        <ellipse cx="410" cy="70" rx="20" ry="26" fill="#d9bfd0" opacity="0.5" />
        <ellipse cx="280" cy="46" rx="24" ry="18" fill="#e3c9a3" opacity="0.55" />
      </g>
      <g stroke="#9bab8c" strokeWidth="1.4" fill="none" opacity="0.55">
        <path d="M100 240 q-14 -30 4 -55" />
        <path d="M460 240 q14 -30 -4 -55" />
        <path d="M200 60 q10 -22 34 -26" />
        <path d="M360 60 q-10 -22 -34 -26" />
      </g>
      <circle cx="280" cy="150" r="3" fill="#c9a86a" opacity="0.5" />
    </svg>
  )
}

// XV años: corona floral sobre tiara estilizada, tonos rosa palo + dorado.
export function XvAniosIllustration() {
  return (
    <svg viewBox="0 0 560 280" aria-hidden="true">
      <WatercolorDefs id="xv" />
      <g filter="url(#xv-tex)">
        <path
          d="M210 190 L225 110 L255 150 L280 90 L305 150 L335 110 L350 190"
          fill="none"
          stroke="#d4a54a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle cx="280" cy="90" r="8" fill="#e8c88f" opacity="0.7" />
        <circle cx="225" cy="110" r="5" fill="#e8c88f" opacity="0.65" />
        <circle cx="335" cy="110" r="5" fill="#e8c88f" opacity="0.65" />
      </g>
      <g opacity="0.8">
        <ellipse cx="150" cy="180" rx="26" ry="34" fill="#e8b8c8" opacity="0.55" />
        <ellipse cx="130" cy="155" rx="20" ry="26" fill="#f0d3c4" opacity="0.5" />
        <ellipse cx="410" cy="180" rx="26" ry="34" fill="#e8b8c8" opacity="0.55" />
        <ellipse cx="430" cy="155" rx="20" ry="26" fill="#f0d3c4" opacity="0.5" />
        <ellipse cx="185" cy="210" rx="17" ry="22" fill="#dcc8e0" opacity="0.5" />
        <ellipse cx="375" cy="210" rx="17" ry="22" fill="#dcc8e0" opacity="0.5" />
      </g>
      <path
        d="M170 210 Q280 250 390 210"
        fill="none"
        stroke="#c98fa5"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <g stroke="#9bab8c" strokeWidth="1.2" fill="none" opacity="0.5">
        <path d="M160 190 q-8 -18 6 -32" />
        <path d="M400 190 q8 -18 -6 -32" />
      </g>
    </svg>
  )
}

// Cumpleaños: globos + confeti + pastel, colores alegres pastel.
export function CumpleanosIllustration() {
  return (
    <svg viewBox="0 0 560 300" aria-hidden="true">
      <WatercolorDefs id="cump" />
      <g filter="url(#cump-tex)">
        <ellipse cx="130" cy="90" rx="32" ry="40" fill="#e8b0a8" opacity="0.55" />
        <ellipse cx="135" cy="84" rx="24" ry="30" fill="#f0cbc4" opacity="0.6" />
        <line x1="132" y1="130" x2="160" y2="220" stroke="#d99a90" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="200" cy="60" rx="28" ry="36" fill="#f0d3a0" opacity="0.55" />
        <ellipse cx="204" cy="55" rx="21" ry="27" fill="#f7e4c0" opacity="0.6" />
        <line x1="202" y1="96" x2="185" y2="220" stroke="#e0bd7f" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="430" cy="90" rx="32" ry="40" fill="#a8cbe0" opacity="0.55" />
        <ellipse cx="425" cy="84" rx="24" ry="30" fill="#c4dcf0" opacity="0.6" />
        <line x1="428" y1="130" x2="400" y2="220" stroke="#90b3d9" strokeWidth="1.6" opacity="0.7" />
        <ellipse cx="360" cy="60" rx="28" ry="36" fill="#c8b8e0" opacity="0.5" />
        <ellipse cx="356" cy="55" rx="21" ry="27" fill="#dcd0f0" opacity="0.55" />
        <line x1="358" y1="96" x2="375" y2="220" stroke="#b09fd9" strokeWidth="1.6" opacity="0.65" />
      </g>
      <g filter="url(#cump-tex)">
        <path d="M220 220 h120 v34 q-60 16 -120 0 z" fill="#f0d3a0" opacity="0.6" />
        <rect x="220" y="196" width="120" height="26" rx="4" fill="#e8b0a8" opacity="0.6" />
        <rect x="275" y="170" width="10" height="30" rx="3" fill="#d99a90" opacity="0.6" />
        <ellipse cx="280" cy="166" rx="6" ry="8" fill="#f0d3a0" opacity="0.75" />
      </g>
      <g opacity="0.7">
        <rect x="90" y="180" width="8" height="8" fill="#a8cbe0" transform="rotate(20 94 184)" />
        <rect x="470" y="160" width="8" height="8" fill="#e8b0a8" transform="rotate(-15 474 164)" />
        <circle cx="120" cy="220" r="5" fill="#f0d3a0" />
        <circle cx="450" cy="200" r="5" fill="#c8b8e0" />
        <rect x="250" y="40" width="7" height="7" fill="#a8cbe0" transform="rotate(30 253 43)" />
      </g>
    </svg>
  )
}

// Baby shower: nube + cigüeña estilizada + estrellas, azul/rosa pastel neutro.
export function BabyShowerIllustration() {
  return (
    <svg viewBox="0 0 560 280" aria-hidden="true">
      <WatercolorDefs id="baby" />
      <g filter="url(#baby-tex)">
        <ellipse cx="280" cy="130" rx="90" ry="46" fill="#fdfbf6" opacity="0.9" stroke="#dcd2e0" strokeWidth="1" />
        <ellipse cx="220" cy="120" rx="46" ry="34" fill="#fdfbf6" opacity="0.9" stroke="#dcd2e0" strokeWidth="1" />
        <ellipse cx="340" cy="120" rx="46" ry="34" fill="#fdfbf6" opacity="0.9" stroke="#dcd2e0" strokeWidth="1" />
      </g>
      <g opacity="0.75">
        <ellipse cx="150" cy="90" rx="22" ry="28" fill="#c8b8e0" opacity="0.5" />
        <ellipse cx="410" cy="90" rx="22" ry="28" fill="#e8b8c8" opacity="0.5" />
        <ellipse cx="100" cy="150" rx="16" ry="20" fill="#a8cbe0" opacity="0.45" />
        <ellipse cx="460" cy="150" rx="16" ry="20" fill="#f0d3a0" opacity="0.45" />
      </g>
      <g stroke="#c9b58f" strokeWidth="1.4" fill="none" opacity="0.65">
        <path d="M200 180 l-4 40" strokeLinecap="round" />
        <path d="M280 190 l0 44" strokeLinecap="round" />
        <path d="M360 180 l4 40" strokeLinecap="round" />
      </g>
      <g opacity="0.8">
        <path d="M196 220 l4 8 l4 -8 z" fill="#a8cbe0" />
        <path d="M276 234 l4 8 l4 -8 z" fill="#e8b8c8" />
        <path d="M360 220 l4 8 l4 -8 z" fill="#f0d3a0" />
      </g>
      <g fill="#e8c88f" opacity="0.6">
        <path d="M90 60 l3 8 8 1 -6 6 1.5 8 -6.5 -4 -6.5 4 1.5 -8 -6 -6 8 -1 z" />
        <path d="M470 210 l2.5 6 6 1 -4.5 4.5 1 6 -5 -3 -5 3 1 -6 -4.5 -4.5 6 -1 z" />
      </g>
    </svg>
  )
}

// Primera comunión: acuarela real (rama de flores lila). mix-blend-mode:
// multiply quita el fondo blanco de la imagen escaneada sin necesitar un
// PNG recortado aparte.
export function ComunionIllustration() {
  return <img src="/watercolor/comunion-flores.png" alt="" aria-hidden="true" />
}

// Divisor floral pequeño, reutilizado entre secciones para dar continuidad
// visual sin repetir la ilustración grande del hero.
export function FloralDivider({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 240 40" aria-hidden="true">
      <line x1="0" y1="20" x2="90" y2="20" stroke="#d9c79a" strokeWidth="1" opacity="0.7" />
      <line x1="150" y1="20" x2="240" y2="20" stroke="#d9c79a" strokeWidth="1" opacity="0.7" />
      <ellipse cx="112" cy="16" rx="9" ry="12" fill="#dcbfe0" opacity="0.55" transform="rotate(-15 112 16)" />
      <ellipse cx="128" cy="16" rx="9" ry="12" fill="#c8dcc0" opacity="0.5" transform="rotate(15 128 16)" />
      <circle cx="120" cy="22" r="4" fill="#e8c88f" opacity="0.7" />
    </svg>
  )
}

export const ILLUSTRATIONS_BY_EVENT = [
  { match: /bautizo/i, Component: BautizoIllustration },
  { match: /boda|matrimonio|casamiento/i, Component: BodaIllustration },
  { match: /xv|quince/i, Component: XvAniosIllustration },
  { match: /cumplea/i, Component: CumpleanosIllustration },
  { match: /baby shower|shower/i, Component: BabyShowerIllustration },
  { match: /comuni[oó]n/i, Component: ComunionIllustration },
]

export function illustrationForEvent(eventType = '') {
  const found = ILLUSTRATIONS_BY_EVENT.find(({ match }) => match.test(eventType))
  const Component = found ? found.Component : CumpleanosIllustration
  return <Component />
}
