import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const tagRef = useRef(null)
  const boxRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    gsap.set([tagRef.current, subtitleRef.current, ctaRef.current, statsRef.current], { opacity: 0, y: 30 })
    gsap.set(boxRef.current, { opacity: 0, x: 40 })
    if (titleRef.current?.children) {
      gsap.set(Array.from(titleRef.current.children), { opacity: 0, y: 60 })
    }

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(tagRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .to(Array.from(titleRef.current?.children || []), { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power4.out' }, '-=0.2')
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .to(statsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .to(boxRef.current, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')

    gsap.to(boxRef.current, {
      y: -10, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2,
    })
  }, [])

  return (
    <section ref={heroRef} style={{
      minHeight: '100vh', paddingTop: '64px',
      display: 'grid',
      alignItems: 'center',
      padding: '100px 2rem 4rem',
      borderBottom: '3px solid #0a0a0a',
      background: '#f5f0e8',
      position: 'relative', overflow: 'hidden',
    }} className="hero-section">
      {/* BG grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px)',
        pointerEvents: 'none',
      }} />

      <div className="hero-inner" style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center', position: 'relative',
      }}>
        <div>
          <div ref={tagRef} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',            
            fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em',
          }}>
            <div style={{ background: '#f5e642', width: '4px', height: '4px', borderRadius: '50%' }} />
            <div>Latest</div>
          </div>

          <h1 ref={titleRef} style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            <span style={{ color: '#f5e642', fontWeight: '700' }}>Autodocs</span> React
          </h1>

          <p ref={subtitleRef} style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>
            A React library for creating <span style={{ color: '#f5e642', fontWeight: '700' }}>autodocs</span> for your React components.
          </p>

          <a href={INSTALL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-hero" ref={ctaRef}>
            Install
          </a>
        </div>
        

        {/* Terminal card */}
       PYTHON_AI_TIMEOUT_MS


        <div ref={boxRef} style={{
          background: '#0a0a0a', color: '#f5e642',
          padding: '1.5rem', borderRadius: '8px',          
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          position: 'relative',
        }}>
      </div>

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .btn-primary-hero {
          font-family: var(--font-mono); font-size: 0.85rem;
          background: #0a0a0a; color: #f5e642;
          padding: 14px 28px; border: 3px solid #0a0a0a;
          text-decoration: none; text-transform: uppercase;
          letter-spacing: 0.05em; box-shadow: 5px 5px 0 #f5e642;
          transition: all 0.15s; font-weight: 700; display: inline-block;
        }
        .btn-primary-hero:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 #f5e642; }
        .btn-ghost-hero {
          font-family: var(--font-mono); font-size: 0.85rem;
          background: transparent; color: #0a0a0a;
          padding: 14px 28px; border: 3px solid #0a0a0a;
          text-decoration: none; text-transform: uppercase;
          letter-spacing: 0.05em; box-shadow: 5px 5px 0 #0a0a0a;
          transition: all 0.15s; display: inline-block;
        }
        .btn-ghost-hero:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 #0a0a0a; }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-terminal { max-width: 500px; }
        }
        @media (max-width: 600px) {
          .hero-inner { gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
