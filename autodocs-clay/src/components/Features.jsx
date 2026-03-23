import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '🔍', title: 'Semantic Memory', body: 'Every file embedded in pgvector. Finds related files across your entire codebase — not just what changed.', color: '#FF6B6B', bg: 'linear-gradient(135deg, #FFE4E4, #FFF0F5)' },
  { icon: '⚖️', title: 'Confidence Scoring', body: 'Every section scored High / Medium / Low. Low confidence auto-flags for human review.', color: '#A78BFA', bg: 'linear-gradient(135deg, #F0E8FF, #E8F0FF)' },
  { icon: '🎯', title: 'Smart Routing', body: 'Rule-based + LLM classification detects routes, env vars, schemas — routing each to the right doc.', color: '#4ECDC4', bg: 'linear-gradient(135deg, #E4FFF8, #E4F8FF)' },
  { icon: '🔒', title: 'Source References', body: 'Every paragraph cites file + line numbers. Always verify what the AI wrote and trace it to code.', color: '#FFAB76', bg: 'linear-gradient(135deg, #FFF4E4, #FFFBE4)' },
  { icon: '⚡', title: 'Fast Exit Logic', body: 'Minor refactors and comment-only changes are detected instantly and skipped. No noise PRs.', color: '#60B8FF', bg: 'linear-gradient(135deg, #E4F4FF, #E4EEFF)' },
  { icon: '🌐', title: 'Any Stack', body: 'JavaScript, Python, Go, Rust — AutoDocs reads your code directly. No language plugins needed.', color: '#86EFAC', bg: 'linear-gradient(135deg, #E4FFE8, #E8FFE4)' },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const headRef = useRef(null)

  useEffect(() => {
    gsap.set(headRef.current, { opacity: 0, y: 50 })
    gsap.to(headRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)',
    })
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 50, scale: 0.92 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        opacity: 1, y: 0, scale: 1, duration: 0.6,
        delay: (i % 3) * 0.1, ease: 'back.out(1.4)',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="features" style={{ padding: '4rem 2rem 6rem', position: 'relative' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '20%', right: '-5%', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.12), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block', background: 'white', borderRadius: '100px',
            padding: '6px 20px', marginBottom: '1.2rem',
            boxShadow: 'var(--clay-sm)',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.8rem',
            color: 'var(--text-soft)',
          }}>🚀 Features</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text)', lineHeight: 1.2,
          }}>
            Built for real codebases.<br />
            <span style={{ color: 'var(--lavender)' }}>Not just demos.</span>
          </h2>
        </div>

        <div className="features-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
        }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={el => cardsRef.current[i] = el}
              className="clay-card"
              style={{
                background: f.bg, padding: '2rem',
                boxShadow: `0 8px 0 ${f.color}30, 0 20px 40px ${f.color}15`,
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: '16px',
                background: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.2rem',
                boxShadow: `0 4px 0 ${f.color}40, 0 8px 15px ${f.color}20`,
              }}>{f.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                color: 'var(--text)', marginBottom: '0.6rem',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-soft)', lineHeight: 1.65, fontWeight: 600,
              }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
