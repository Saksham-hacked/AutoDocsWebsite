import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  { t: 'comment', text: '# docs/api.md — managed by AutoDocs v1' },
  { t: 'tag', text: '<!-- AUTODOCS:ROUTES_START -->' },
  { t: 'heading', text: '## POST /api/waitlist' },
  { t: 'text', text: 'Adds an email to the waitlist.' },
  { t: 'blank', text: '' },
  { t: 'label', text: '**Parameters**' },
  { t: 'item', text: '- email: string, required' },
  { t: 'blank', text: '' },
  { t: 'label', text: '**Response** — 201 Created' },
  { t: 'item', text: '{ success: true, message: "Added" }' },
  { t: 'blank', text: '' },
  { t: 'source', text: 'SOURCE: api/waitlist.js:18-25' },
  { t: 'source', text: 'CONFIDENCE: High' },
  { t: 'tag', text: '<!-- AUTODOCS:ROUTES_END -->' },
]

const colors = { comment: '#555', tag: '#0047ff', heading: '#f5e642', text: '#f5f0e8', blank: 'transparent', label: '#00c853', item: '#ccc', source: '#ff3b30' }

export default function CodeBlock() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])
  const leftRef = useRef(null)

  useEffect(() => {
    gsap.set(leftRef.current, { opacity: 0, x: -40 })
    gsap.to(leftRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
    })
    gsap.set(linesRef.current.filter(Boolean), { opacity: 0, x: -20 })
    gsap.to(linesRef.current.filter(Boolean), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.3,
    })
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '5rem 2rem',
      borderBottom: '3px solid #0a0a0a',
      background: '#f5f0e8',
    }}>
      <div className="code-inner" style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }}>
        <div ref={leftRef}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666', marginBottom: '0.5rem' }}>// ZERO CONFIG</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: '1.5rem' }}>WORKS WITH<br />YOUR EXISTING<br />DOCS.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#444', lineHeight: 1.7, marginBottom: '2rem' }}>
            Add AutoDocs marker comments to any markdown file. The AI writes between the markers, leaving everything else untouched.
          </p>
          {[
            ['✓', 'API routes documented automatically'],
            ['✓', 'Env variables tracked on every change'],
            ['✓', 'Architecture docs stay current'],
            ['✓', 'Confidence scores on every section'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.6rem',
            }}>
              <span style={{
                background: '#f5e642', border: '2px solid #0a0a0a',
                width: 22, height: 22, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem',
                boxShadow: '2px 2px 0 #0a0a0a',
              }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        <div style={{ background: '#0a0a0a', border: '3px solid #0a0a0a', boxShadow: '8px 8px 0 #0a0a0a', overflow: 'hidden' }}>
          <div style={{
            background: '#1a1a1a', padding: '10px 16px',
            borderBottom: '2px solid #333',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ color: '#666', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>docs/api.md</span>
          </div>
          <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 2, overflowX: 'auto' }}>
            {lines.map((line, i) => (
              <div key={i} ref={el => linesRef.current[i] = el} style={{ color: colors[line.t], minHeight: '1.5em', whiteSpace: 'nowrap' }}>
                {line.text || '\u00a0'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .code-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
