import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', icon: '🔗', title: 'Install the App', body: 'Connect AutoDocs to any GitHub repo in one click. No YAML, no config files, no setup scripts.', grad: 'linear-gradient(135deg, #FFE4E4, #FFF0E8)', accent: '#FF6B6B', shadow: 'rgba(255,107,107,0.3)' },
  { num: '02', icon: '⚡', title: 'Push your code', body: 'Every push triggers AutoDocs. It reads changed files, diffs, and your commit message in real time.', grad: 'linear-gradient(135deg, #E8FFF8, #E0F8FF)', accent: '#4ECDC4', shadow: 'rgba(78,205,196,0.3)' },
  { num: '03', icon: '🧠', title: 'AI analyses it', body: 'A 7-node LangGraph pipeline summarises files, retrieves semantic context via pgvector, and classifies the impact.', grad: 'linear-gradient(135deg, #F0E8FF, #E8EEFF)', accent: '#A78BFA', shadow: 'rgba(167,139,250,0.3)' },
  { num: '04', icon: '📄', title: 'PR opened!', body: 'A pull request appears with updated docs, confidence scores, and source references. Review and merge.', grad: 'linear-gradient(135deg, #FFF8E8, #FFFCE8)', accent: '#FFAB76', shadow: 'rgba(255,171,118,0.3)' },
]

export default function HowItWorks() {
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
      gsap.set(card, { opacity: 0, y: 60, scale: 0.9 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        opacity: 1, y: 0, scale: 1, duration: 0.7,
        delay: i * 0.12, ease: 'back.out(1.4)',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block', background: 'white', borderRadius: '100px',
            padding: '6px 20px', marginBottom: '1.2rem',
            boxShadow: 'var(--clay-sm)',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.8rem',
            color: 'var(--text-soft)',
          }}>✨ How it works</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text)', lineHeight: 1.2,
          }}>
            Push code. Get docs.<br />
            <span style={{ color: 'var(--coral)' }}>It's that simple.</span>
          </h2>
        </div>

        <div className="steps-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
        }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={el => cardsRef.current[i] = el}
              className="clay-card"
              style={{
                background: step.grad, padding: '2rem',
                boxShadow: `0 8px 0 ${step.shadow}, 0 20px 50px ${step.shadow}`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Big number watermark */}
              <div style={{
                position: 'absolute', top: -10, right: 10,
                fontFamily: 'var(--font-display)', fontSize: '5rem',
                color: step.accent, opacity: 0.15, lineHeight: 1,
                userSelect: 'none',
              }}>{step.num}</div>

              <div style={{
                width: 52, height: 52, borderRadius: '16px',
                background: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.2rem',
                boxShadow: `0 4px 0 ${step.shadow}, 0 8px 15px ${step.shadow}`,
              }}>{step.icon}</div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                color: 'var(--text)', marginBottom: '0.6rem',
              }}>{step.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-soft)', lineHeight: 1.65, fontWeight: 600,
              }}>{step.body}</p>

              {i < steps.length - 1 && (
                <div className="step-arrow hide-mobile" style={{
                  position: 'absolute', right: -20, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'white',
                  boxShadow: 'var(--clay-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', zIndex: 10,
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .step-arrow { display: none !important; }
        }
        @media (max-width: 500px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
