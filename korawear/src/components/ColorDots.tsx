import type { Colorway } from '../types'

interface Props {
  colors: Colorway[]
  value: number
  onChange: (index: number) => void
  large?: boolean
}

export function ColorDots({ colors, value, onChange, large }: Props) {
  return (
    <div className="sw" role="group" aria-label="Colours">
      {colors.map((c, i) => (
        <button
          key={c.name}
          type="button"
          className={`dot${large ? ' lg' : ''}`}
          aria-pressed={i === value}
          aria-label={c.name}
          style={{ background: `linear-gradient(135deg, ${c.bg} 50%, ${c.fg} 50%)` }}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  )
}
