import { useId, type ReactNode } from 'react'
import type { Colorway, GarmentType, PatternKind, Product } from '../types'

/** Each garment is drawn as an SVG silhouette filled with a woven-pattern tile. */

function Pattern({ id, kind, c }: { id: string; kind: PatternKind; c: Colorway }) {
  const { bg, fg, acc } = c
  switch (kind) {
    case 'dots':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="56" height="56" patternTransform="scale(.62)">
          <rect width="56" height="56" fill={bg} />
          <circle cx="14" cy="14" r="12" fill={fg} /><circle cx="14" cy="14" r="7" fill={bg} /><circle cx="14" cy="14" r="3" fill={acc} />
          <circle cx="42" cy="42" r="12" fill={fg} /><circle cx="42" cy="42" r="7" fill={bg} /><circle cx="42" cy="42" r="3" fill={acc} />
          <circle cx="42" cy="12" r="3" fill={acc} /><circle cx="12" cy="42" r="3" fill={acc} />
        </pattern>
      )
    case 'zig':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="40" height="28" patternTransform="scale(.7)">
          <rect width="40" height="28" fill={bg} />
          <polyline points="0,20 10,6 20,20 30,6 40,20" fill="none" stroke={fg} strokeWidth="5" />
          <circle cx="10" cy="24" r="2" fill={acc} /><circle cx="30" cy="24" r="2" fill={acc} /><circle cx="20" cy="3" r="2" fill={acc} />
        </pattern>
      )
    case 'diamond':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="scale(.7)">
          <rect width="30" height="30" fill={bg} />
          <polygon points="15,2 28,15 15,28 2,15" fill={fg} />
          <polygon points="15,9 21,15 15,21 9,15" fill={acc} />
        </pattern>
      )
    case 'adire':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(.7)">
          <rect width="60" height="60" fill={bg} />
          <circle cx="30" cy="30" r="24" fill="none" stroke={fg} strokeWidth="2.4" opacity=".85" />
          <circle cx="30" cy="30" r="16" fill="none" stroke={acc} strokeWidth="2.4" />
          <circle cx="30" cy="30" r="8" fill="none" stroke={fg} strokeWidth="2.4" opacity=".85" />
          <circle cx="30" cy="30" r="2.5" fill={fg} />
          {[[0, 0], [60, 0], [0, 60], [60, 60]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="8" fill="none" stroke={acc} strokeWidth="2" />
          ))}
        </pattern>
      )
    case 'bars':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="48" height="48" patternTransform="scale(.7)">
          <rect width="48" height="48" fill={bg} />
          <rect width="48" height="9" fill={fg} /><rect y="13" width="48" height="3" fill={acc} />
          <rect y="22" width="12" height="10" fill={fg} /><rect x="18" y="22" width="12" height="10" fill={acc} /><rect x="36" y="22" width="12" height="10" fill={fg} />
          <rect y="38" width="48" height="3" fill={acc} />
        </pattern>
      )
    case 'kente':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="48" height="48" patternTransform="scale(.7)">
          <rect width="48" height="48" fill={bg} />
          <rect width="10" height="48" fill={fg} /><rect x="14" width="3" height="48" fill={acc} />
          <rect x="22" width="10" height="10" fill={fg} /><rect x="22" y="14" width="10" height="10" fill={acc} />
          <rect x="22" y="28" width="10" height="10" fill={fg} /><rect x="22" y="42" width="10" height="6" fill={acc} />
          <rect x="38" width="3" height="48" fill={acc} />
        </pattern>
      )
    case 'mud':
      return (
        <pattern id={id} patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="scale(.7)">
          <rect width="50" height="50" fill={bg} />
          <path d="M25 8V42M8 25H42" stroke={fg} strokeWidth="4" strokeLinecap="round" />
          <path d="M0 0l6 6M50 0l-6 6M0 50l6-6M50 50l-6-6" stroke={acc} strokeWidth="3" strokeLinecap="round" />
          <circle cx="25" cy="25" r="4" fill={acc} />
        </pattern>
      )
  }
}

const SHADE = 'rgba(0,0,0,.3)'
const DOT = 'rgba(0,0,0,.4)'

const SHAPES: Record<Exclude<GarmentType, 'set'>, { d: string; detail: ReactNode }> = {
  dress: {
    d: 'M90 38 Q120 60 150 38 L158 124 L178 296 Q120 312 62 296 L82 124 Z',
    detail: (<><path d="M82 124 Q120 136 158 124" className="ln" /><path d="M96 46 Q120 84 144 46" className="ln" /></>),
  },
  shirt: {
    d: 'M88 44 L120 36 L152 44 L206 84 L188 122 L160 100 L160 282 L80 282 L80 100 L52 122 L34 84 Z',
    detail: (
      <>
        <path d="M104 38 L120 62 L96 52 Z M136 38 L120 62 L144 52 Z" fill="rgba(0,0,0,.28)" />
        <path d="M120 62V282" className="ln" />
        {[96, 142, 188, 234].map((y) => <circle key={y} cx="120" cy={y} r="2.6" fill={DOT} />)}
      </>
    ),
  },
  jacket: {
    d: 'M84 44 L120 36 L156 44 L212 92 L202 232 L168 238 L166 272 L74 272 L72 238 L38 232 L28 92 Z',
    detail: (
      <>
        <path d="M120 38V272" className="ln" /><path d="M74 250H166V272H74Z" fill={SHADE} />
        <path d="M28 92 L38 232 M212 92 L202 232" className="ln" /><path d="M92 170h26M122 170h26" className="ln" />
      </>
    ),
  },
  trousers: {
    d: 'M82 40 H158 L172 304 H128 L120 140 L112 304 H68 Z',
    detail: (
      <>
        <path d="M82 40H158V58H82Z" fill={SHADE} /><path d="M120 58V132" className="ln" />
        <path d="M90 66 Q104 96 98 112 M150 66 Q136 96 142 112" className="ln" />
      </>
    ),
  },
  skirt: {
    d: 'M84 62 H156 L192 292 Q120 310 48 292 Z',
    detail: (
      <>
        <path d="M84 62H156V78H84Z" fill={SHADE} /><path d="M104 78 L176 296" className="ln" />
        <path d="M156 66 q16 6 14 28 M156 66 q-4 18 4 30" className="ln" />
      </>
    ),
  },
  coat: {
    d: 'M82 36 L120 30 L158 36 L216 92 L198 124 L174 104 L180 306 H60 L66 104 L42 124 L24 92 Z',
    detail: (
      <>
        <path d="M120 32 L124 306" className="ln" /><path d="M66 170H174" className="ln" />
        <path d="M76 210 H106 V258 H76Z M134 210 H164 V258 H134Z" className="ln" />
      </>
    ),
  },
}

interface GarmentProps {
  product: Product
  colorIndex: number
}

export function Garment({ product, colorIndex }: GarmentProps) {
  const uid = useId().replace(/:/g, '')
  const colour = product.colors[colorIndex] ?? product.colors[0]
  const fill = `url(#p${uid})`
  const shade = `url(#s${uid})`

  return (
    <svg viewBox="0 0 240 320" role="img" aria-label={`${product.name} in ${colour.name}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <Pattern id={`p${uid}`} kind={product.pattern} c={colour} />
        <linearGradient id={`s${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".26" />
          <stop offset=".38" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".7" stopColor="#000" stopOpacity=".02" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
        <style>{'.ln{fill:none;stroke:rgba(0,0,0,.28);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'}</style>
      </defs>
      <ellipse cx="120" cy="313" rx="64" ry="4.5" fill="#000" opacity=".13" />
      {product.type === 'set' ? (
        <>
          {['M88 44 L120 40 L152 44 L192 72 L178 106 L158 94 L158 170 L82 170 L82 94 L62 106 L48 72 Z', 'M82 186 H158 L170 280 H126 L120 224 L114 280 H70 Z'].map((d) => (
            <g key={d}>
              <path d={d} fill={fill} />
              <path d={d} fill={shade} />
            </g>
          ))}
          <path d="M100 42 Q120 62 140 42" className="ln" />
          <path d="M82 186H158V198H82Z" fill={SHADE} />
          <path d="M116 198V206M124 198V206" className="ln" />
        </>
      ) : (
        <>
          <path d={SHAPES[product.type].d} fill={fill} />
          <path d={SHAPES[product.type].d} fill={shade} />
          {SHAPES[product.type].detail}
        </>
      )}
    </svg>
  )
}
