import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function CTA() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 60, scale: 0.95 })
    gsap.to(contentRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)',
    })
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '4rem 2rem 6rem' }}>
      <div ref={contentRef} style={{
        maxWidth: '900px', margin: '0 auto', textAlign: 'center',
        background: 'linear-gradient(135deg, #FF6B6B, #FFAB76, #A78BFA)',
        borderRadius: '40px', padding: '5rem 3rem',
        boxShadow: '0 16px 0 rgba(255,107,107,0.25), 0 40px 100px rgba(255,107,107,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs inside */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
          animation: 'floatAlt 5s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
          animation: 'float 4s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'white', lineHeight: 1.2, marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.15)',
          }}>
            Stop writing docs.<br />Start merging them.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)',
            marginBottom: '2.5rem', lineHeight: 1.6,
          }}>
            Install the GitHub App and your first automated doc PR will arrive within minutes. Zero config. Any stack.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={INSTALL_URL} className="clay-btn" style={{
              background: 'white',
              color: 'var(--coral)', padding: '16px 36px',
              fontWeight: 800, fontSize: '1rem',
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 6px 0 rgba(0,0,0,0.12), 0 12px 30px rgba(0,0,0,0.1)',
            }}>Install AutoDocs Free ✨</a>
            <a href="https://github.com/apps/autodoc-test-110" className="clay-btn" style={{
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              color: 'white', padding: '16px 36px',
              fontWeight: 800, fontSize: '1rem',
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 6px 0 rgba(0,0,0,0.08)',
            }}>View on GitHub →</a>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)',
            marginTop: '1.5rem',
          }}>No credit card · Free forever plan · 2 min setup</p>
        </div>
      </div>
    </section>
  )
}
