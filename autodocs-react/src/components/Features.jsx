import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '🔍', title: 'SEMANTIC MEMORY', body: 'Every file is embedded in pgvector. AutoDocs finds related files across your entire codebase — not just what changed.', tag: 'pgvector' },
  { icon: '⚖️', title: 'CONFIDENCE SCORING', body: 'Every section gets a High / Medium / Low score. Low confidence flags itself for human review automatically.', tag: 'Quality' },
  { icon: '🎯', title: 'SMART ROUTING', body: 'Rule-based + LLM classification detects routes, env vars, schema changes — routing each to the right doc file.', tag: 'LangGraph' },
  { icon: '🔒', title: 'SOURCE REFS', body: 'Every paragraph cites file + line numbers. You can always verify what the AI wrote and trace it back to code.', tag: 'Traceable' },
  { icon: '⚡', title: 'FAST EXIT', body: 'Minor refactors and comment-only changes are detected instantly and skipped. No noise PRs, no wasted API calls.', tag: 'Efficient' },
  { icon: '🌐', title: 'ANY STACK', body: 'JavaScript, Python, Go, Rust — AutoDocs reads your code directly. No language plugins, no parsers needed.', tag: 'Universal' },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const headRef = useRef(null)

  useEffect(() => {
    gsap.set(headRef.current, { opacity: 0, y: 40 })
    gsap.to(headRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
    })
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 40 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 0, opacity: 1, duration: 0.5,
        delay: (i % 3) * 0.1, ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="features" style={{
      padding: '5rem 2rem',
      borderBottom: '3px solid #0a0a0a',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headRef} style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f5e642', marginBottom: '0.5rem' }}>// FEATURES</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.02em', lineHeight: 0.9, color: '#f5f0e8' }}>BUILT FOR<br />REAL CODE.</h2>
        </div>

        <div className="features-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          border: '3px solid #333',
        }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={el => cardsRef.current[i] = el}
              style={{
                padding: '2rem',
                borderRight: (i + 1) % 3 !== 0 ? '3px solid #333' : 'none',
                borderBottom: i < 3 ? '3px solid #333' : 'none',
                background: '#0a0a0a',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
            >
              <div style={{
                display: 'inline-flex',
                background: '#f5e642', border: '2px solid #333',
                padding: '4px 8px', marginBottom: '1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0a0a0a',
              }}>{f.tag}</div>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.7rem' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', letterSpacing: '0.05em', color: '#f5f0e8', marginBottom: '0.5rem' }}>{f.title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#888', lineHeight: 1.65 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid > div { border-right: none !important; border-bottom: 3px solid #333 !important; }
          .features-grid > div:last-child { border-bottom: none !important; }
        }
        @media (max-width: 500px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
