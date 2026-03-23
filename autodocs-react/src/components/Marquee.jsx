import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items = [
  'GIT PUSH', '→', 'WEBHOOK', '→', 'LLM ANALYSIS', '→', 'VECTOR SEARCH', '→',
  'DOC GENERATION', '→', 'PR OPENED', '★', 'ZERO CONFIG', '★', 'HIGH CONFIDENCE',
  '★', 'AUTONOMOUS', '★', 'ANY STACK', '★',
]

export default function Marquee() {
  const track1 = useRef(null)
  const track2 = useRef(null)

  useEffect(() => {
    gsap.to(track1.current, {
      x: '-50%', duration: 20, ease: 'none', repeat: -1,
    })
    gsap.to(track2.current, {
      x: '0%', duration: 20, ease: 'none', repeat: -1,
      from: { x: '-50%' },
    })
  }, [])

  const Item = ({ text }) => (
    <span style={{
      fontFamily: 'var(--font-display)', fontSize: '1.2rem',
      letterSpacing: '0.1em', padding: '0 1.5rem',
      color: text === '→' || text === '★' ? '#f5e642' : 'inherit',
      flexShrink: 0,
    }}>{text}</span>
  )

  return (
    <div style={{ overflow: 'hidden', borderBottom: '3px solid #0a0a0a' }}>
      {/* Top strip — yellow bg */}
      <div style={{
        background: '#f5e642', borderBottom: '3px solid #0a0a0a',
        padding: '12px 0', display: 'flex', overflow: 'hidden',
      }}>
        <div ref={track1} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[...items, ...items].map((item, i) => <Item key={i} text={item} />)}
        </div>
      </div>

      {/* Bottom strip — black bg */}
      <div style={{
        background: '#0a0a0a',
        padding: '10px 0', display: 'flex', overflow: 'hidden',
      }}>
        <div ref={track2} style={{
          display: 'flex', whiteSpace: 'nowrap', willChange: 'transform',
          transform: 'translateX(-50%)',
        }}>
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.12em', padding: '0 1.5rem',
              color: item === '→' || item === '★' ? '#ff3b30' : '#f5f0e8',
              flexShrink: 0, textTransform: 'uppercase',
            }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
