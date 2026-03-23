import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function CTA() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    gsap.set(titleRef.current, { opacity: 0, y: 60 })
    gsap.set(boxRef.current, { opacity: 0, scale: 0.9 })
    gsap.to(titleRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
    })
    gsap.to(boxRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.2,
    })
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '6rem 4rem',
      background: '#f5e642',
      borderBottom: '3px solid #0a0a0a',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Diagonal stripe pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div ref={titleRef}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            color: '#666', marginBottom: '1rem',
          }}>// GET STARTED</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            letterSpacing: '0.02em', lineHeight: 0.9,
            marginBottom: '1.5rem',
          }}>
            STOP WRITING DOCS.<br/>
            <span style={{
              WebkitTextStroke: '3px #0a0a0a', color: 'transparent',
            }}>START MERGING THEM.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1.1rem',
            color: '#333', marginBottom: '3rem', lineHeight: 1.6,
          }}>
            Install the GitHub App and your first automated doc PR will arrive within minutes. Zero config. Any stack.
          </p>
        </div>

        <div ref={boxRef} style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          background: '#0a0a0a', border: '3px solid #0a0a0a',
          padding: '3rem 4rem',
          boxShadow: '10px 10px 0 #0a0a0a',
        }}>
          <a
            href={INSTALL_URL}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              letterSpacing: '0.1em',
              background: '#f5e642', color: '#0a0a0a',
              padding: '16px 40px', border: '3px solid #f5e642',
              textDecoration: 'none',
              boxShadow: '6px 6px 0 #f5e642',
              transition: 'all 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translate(-3px,-3px)'; e.target.style.boxShadow = '9px 9px 0 #f5e642' }}
            onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = '6px 6px 0 #f5e642' }}
          >
            INSTALL AUTODOCS FREE →
          </a>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            No credit card · Free forever plan · 2 min setup
          </span>
        </div>
      </div>
    </section>
  )
}
