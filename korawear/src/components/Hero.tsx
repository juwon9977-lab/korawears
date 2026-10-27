import { useEffect, useRef } from 'react'
import { getProduct } from '../data/products'
import { Garment } from './Garment'

const RIBBON_TEXT = 'KORAWEAR • HARMATTAN EDIT • CUT IN LAGOS • '.repeat(4)

const RIBBON_LOOP = 840 // path units scrolled per loop
const RIBBON_SPEED = 26 // path units per second

function Ribbon() {
  const textPath = useRef<SVGTextPathElement>(null)

  // Decorative, slow, and always on. It loops forever regardless of the OS motion setting.
  useEffect(() => {
    let frame = 0
    let last = 0
    let offset = 0

    const tick = (now: number) => {
      if (last) offset = (offset + ((now - last) / 1000) * RIBBON_SPEED) % RIBBON_LOOP
      last = now
      textPath.current?.setAttribute('startOffset', String(-offset))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg className="ribbon" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <path id="ribbon-path" d="M-40 190 C 90 90, 210 270, 340 180 S 520 70, 590 150 S 520 270, 450 200 S 650 80, 780 160 S 930 190, 1040 110" />
      </defs>
      <use href="#ribbon-path" stroke="var(--ochre)" strokeWidth="46" fill="none" />
      <text dy="7">
        <textPath ref={textPath} href="#ribbon-path" startOffset="0">{RIBBON_TEXT}</textPath>
      </text>
    </svg>
  )
}

export function Hero({ onShop }: { onShop: () => void }) {
  const left = getProduct('indigo-duster-coat')
  const mid = getProduct('ankara-maxi-dress')
  const right = getProduct('kente-panel-shirt')
  if (!left || !mid || !right) return null

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="copy">
        <span className="eyebrow">Harmattan Edit · Autumn 2026</span>
        <h1 id="hero-title">Pattern with a pulse.</h1>
        <p className="lead">
          Contemporary pieces cut in Lagos from adire, ankara, kente and mudcloth-inspired cloth. Made to be worn, not kept for best.
        </p>
        <div className="cta">
          <button className="btn ghost" onClick={onShop}>
            Shop the edit
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M1 6h15M11 1l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="art">
        <div className="g g1"><Garment product={left} colorIndex={0} /></div>
        <div className="g g2"><Garment product={mid} colorIndex={0} /></div>
        <div className="g g3"><Garment product={right} colorIndex={0} /></div>
      </div>
      <Ribbon />
    </section>
  )
}
