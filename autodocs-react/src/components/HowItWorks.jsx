import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'INSTALL THE APP', body: 'Connect AutoDocs to any GitHub repo in one click. No YAML, no config files, no setup scripts.', color: '#f5e642', icon: '🔗' },
  { num: '02', title: 'PUSH YOUR CODE', body: 'Every push triggers AutoDocs. It reads changed files, diffs, and your commit message in real time.', color: '#ff3b30', icon: '⚡' },
  { num: '03', title: 'AI ANALYSES', body: 'A 7-node LangGraph pipeline summarises files, retrieves semantic context via pgvector, and classifies the impact.', color: '#0047ff', icon: '🧠' },
  { num: '04', title: 'PR OPENED', body: 'A pull request appears with updated docs, confidence scores, and source references. Review and merge.', color: '#00c853', icon: '📄' },
]

export default function HowItWorks() {
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
      gsap.set(card, { opacity: 0, y: 60 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 0, opacity: 1, duration: 0.6,
        delay: i * 0.1, ease: 'power3.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" style={{
      padding: '5rem 2rem',
      borderBottom: '3px solid #0a0a0a',
      background: '#f5f0e8',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headRef} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666', marginBottom: '0.5rem' }}>// HOW IT WORKS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.02em', lineHeight: 0.9 }}>PUSH CODE.<br />GET DOCS.</h2>
          </div>
          <div style={{
            background: '#0a0a0a', color: '#f5e642',
            padding: '10px 18px', border: '3px solid #0a0a0a',
            boxShadow: '4px 4px 0 #f5e642',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>4 STEPS. THAT'S IT.</div>
        </div>

        <div className="steps-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '3px solid #0a0a0a',
        }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={el => cardsRef.current[i] = el}
              className="step-card"
              style={{
                padding: '2rem',
                borderRight: i < steps.length - 1 ? '3px solid #0a0a0a' : 'none',
                background: '#f5f0e8',
                transition: 'background 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => e.currentTarget.style.background = step.color}
              onMouseLeave={e => e.currentTarget.style.background = '#f5f0e8'}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '4rem',
                color: 'rgba(0,0,0,0.06)', position: 'absolute',
                top: -5, right: 8, lineHeight: 1, userSelect: 'none',
              }}>{step.num}</div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{step.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>{step.title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#444', lineHeight: 1.6 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid > div { border-right: none !important; border-bottom: 3px solid #0a0a0a; }
          .steps-grid > div:last-child { border-bottom: none; }
        }
        @media (max-width: 500px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
