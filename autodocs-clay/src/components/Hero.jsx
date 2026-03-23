import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

const FloatingBlob = ({ color, size, top, left, delay }) => (
  <div style={{
    position: 'absolute', width: size, height: size,
    borderRadius: '50%', background: color, filter: 'blur(60px)',
    opacity: 0.35, top, left, pointerEvents: 'none',
    animation: `floatAlt ${3 + delay}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  }} />
)

export default function Hero() {
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const els = [badgeRef, titleRef, subRef, ctaRef, statsRef]
    els.forEach(r => gsap.set(r.current, { opacity: 0, y: 40 }))
    gsap.set(cardRef.current, { opacity: 0, scale: 0.85, y: 30 })

    const tl = gsap.timeline({ delay: 0.4 })
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(cardRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.5')
  }, [])

  return (
    <section style={{
      minHeight: '100vh', paddingTop: '80px',
      display: 'flex', alignItems: 'center',
      padding: '100px 2rem 5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <FloatingBlob color="#FF6B6B" size="400px" top="-10%" left="-10%" delay={0} />
      <FloatingBlob color="#A78BFA" size="350px" top="40%" left="60%" delay={1.5} />
      <FloatingBlob color="#4ECDC4" size="300px" top="70%" left="10%" delay={0.8} />
      <FloatingBlob color="#FFAB76" size="250px" top="20%" left="70%" delay={2} />

      <div className="hero-grid" style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2,
      }}>
        <div>
          {/* Badge */}
          <div ref={badgeRef} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'white', borderRadius: '100px',
            padding: '8px 18px', marginBottom: '2rem',
            boxShadow: '0 4px 0 rgba(78,205,196,0.3), 0 8px 20px rgba(78,205,196,0.15)',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.8rem',
            color: 'var(--text-soft)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ECDC4', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
            GitHub App · Zero Config · AI-Powered
          </div>

          {/* Title */}
          <h1 ref={titleRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.1, color: 'var(--text)',
            marginBottom: '1.5rem',
          }}>
            Your docs
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FF6B6B, #FFAB76, #A78BFA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>write themselves.</span>
          </h1>

          <p ref={subRef} style={{
            fontFamily: 'var(--font-body)', fontWeight: 400,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-soft)', lineHeight: 1.7,
            maxWidth: '480px', marginBottom: '2.5rem',
          }}>
            AutoDocs watches every commit and automatically opens pull requests keeping your documentation perfectly in sync. Push code, get docs.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href={INSTALL_URL} className="clay-btn" style={{
              background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
              color: 'white', padding: '14px 32px', fontSize: '1rem',
              fontWeight: 800, textDecoration: 'none', display: 'inline-block',
              letterSpacing: '0.01em',
            }}>Install Free ✨</a>
            <a href="#how-it-works" className="clay-btn" style={{
              background: 'white', color: 'var(--text)',
              padding: '14px 32px', fontSize: '1rem',
              fontWeight: 800, textDecoration: 'none', display: 'inline-block',
            }}>See how it works →</a>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { num: '7', label: 'Pipeline nodes', color: '#FF6B6B' },
              { num: '~60s', label: 'Push to PR', color: '#4ECDC4' },
              { num: '0', label: 'Config needed', color: '#A78BFA' },
            ].map(({ num, label, color }) => (
              <div key={label} style={{
                background: 'white', borderRadius: '20px',
                padding: '16px 20px', textAlign: 'center',
                boxShadow: `0 4px 0 ${color}40, 0 8px 20px ${color}20`,
                minWidth: '90px',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div ref={cardRef} style={{ position: 'relative' }}>
          {/* Main terminal card */}
          <div style={{
            background: 'white', borderRadius: '32px',
            boxShadow: '0 12px 0 rgba(167,139,250,0.3), 0 30px 80px rgba(167,139,250,0.2)',
            overflow: 'hidden',
            animation: 'float 6s ease-in-out infinite',
          }}>
            {/* Card header */}
            <div style={{
              background: 'linear-gradient(135deg, #A78BFA, #60B8FF)',
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#FF6B6B', '#FFAB76', '#86EFAC'].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: `0 2px 4px ${c}80` }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>
                🤖 autodocs pipeline
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: '1.5rem', background: '#1E1040' }}>
              {[
                { icon: '💻', text: '$ git push origin main', color: '#9D8EC4' },
                { icon: '⚡', text: '→ Webhook received', color: '#FFAB76' },
                { icon: '✅', text: '  validate_input  [1 file]', color: '#86EFAC' },
                { icon: '🧠', text: '  update_memory   [embedded]', color: '#86EFAC' },
                { icon: '🔍', text: '  retrieve_context [5 matches]', color: '#86EFAC' },
                { icon: '🎯', text: '  impact_analysis  [NEW_API_ROUTE]', color: '#86EFAC' },
                { icon: '📝', text: '  generate_docs    [High confidence]', color: '#86EFAC' },
                { icon: '🎉', text: '  PR opened: docs/api.md', color: '#60B8FF' },
              ].map((line, i) => (
                <div key={i} style={{
                  fontFamily: 'monospace', fontSize: '0.78rem',
                  color: line.color, lineHeight: 2.2, display: 'flex', gap: '8px',
                  alignItems: 'center',
                }}>
                  <span>{line.icon}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>

            {/* PR preview card inside */}
            <div style={{
              margin: '1rem', borderRadius: '16px',
              background: 'linear-gradient(135deg, #FFF5F0, #F0F5FF)',
              padding: '1rem 1.2rem',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.8)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1rem' }}>📋</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.82rem', color: 'var(--text)' }}>
                  📝 AutoDocs: NEW_API_ROUTE (abc1234)
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                docs/api.md · High confidence · Ready to merge
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <span style={{ background: '#86EFAC', color: '#15803D', borderRadius: '100px', padding: '3px 10px', fontSize: '0.68rem', fontWeight: 800 }}>✓ Merged</span>
                <span style={{ background: '#DBEAFE', color: '#1D4ED8', borderRadius: '100px', padding: '3px 10px', fontSize: '0.68rem', fontWeight: 800 }}>docs</span>
              </div>
            </div>
          </div>

          {/* Floating decorative clay blobs */}
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 70, height: 70,
            background: 'linear-gradient(135deg, #FFAB76, #FF6B6B)',
            borderRadius: '50%',
            boxShadow: '0 6px 0 rgba(255,107,107,0.4), 0 12px 25px rgba(255,107,107,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            animation: 'floatAlt 4s ease-in-out infinite',
          }}>⚡</div>

          <div style={{
            position: 'absolute', bottom: 20, left: -25, width: 56, height: 56,
            background: 'linear-gradient(135deg, #4ECDC4, #60B8FF)',
            borderRadius: '50%',
            boxShadow: '0 6px 0 rgba(78,205,196,0.4), 0 12px 25px rgba(78,205,196,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
            animation: 'float 5s ease-in-out infinite 1s',
          }}>🎯</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
