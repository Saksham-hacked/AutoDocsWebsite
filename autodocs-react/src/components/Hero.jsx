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
            background: '#f5e642', border: '2px solid #0a0a0a',
            padding: '6px 14px', marginBottom: '1.5rem',
            boxShadow: '3px 3px 0 #0a0a0a',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{
              width: 8, height: 8, background: '#00c853',
              borderRadius: '50%', display: 'inline-block',
              animation: 'livepulse 1.5s infinite',
            }} />
            GitHub App · Zero Config · AI-Powered
          </div>

          <div ref={titleRef}>
            {['YOUR DOCS', 'WRITE', 'THEMSELVES.'].map((line, i) => (
              <div key={i} style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                lineHeight: 0.95, letterSpacing: '0.02em',
                color: i === 1 ? 'transparent' : '#0a0a0a',
                WebkitTextStroke: i === 1 ? '3px #0a0a0a' : 'none',
              }}>{line}</div>
            ))}
          </div>

          <p ref={subtitleRef} style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#333', maxWidth: '480px',
            marginTop: '1.5rem', lineHeight: 1.65,
          }}>
            AutoDocs watches every commit and opens PRs that keep your documentation perfectly in sync. Push code — get docs.
          </p>

          <div ref={ctaRef} style={{
            display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap',
          }}>
            <a href={INSTALL_URL} className="btn-primary-hero">Install Free →</a>
            <a href="#how-it-works" className="btn-ghost-hero">See How →</a>
          </div>

          <div ref={statsRef} style={{
            display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap',
          }}>
            {[['7', 'Pipeline nodes'], ['~60s', 'Push to PR'], ['0', 'Config files']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.05em' }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.62rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal card */}
        <div ref={boxRef} style={{ position: 'relative' }} className="hero-terminal">
          <div style={{
            background: '#0a0a0a', border: '3px solid #0a0a0a',
            boxShadow: '10px 10px 0 #f5e642', overflow: 'hidden',
          }}>
            <div style={{
              background: '#1a1a1a', padding: '10px 16px',
              borderBottom: '2px solid #333',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ color: '#666', marginLeft: '0.5rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>autodocs pipeline</span>
            </div>
            <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 2, overflowX: 'auto' }}>
              {[
                { color: '#666', text: '$ git push origin main' },
                { color: '#f5e642', text: '→ webhook received' },
                { color: '#888', text: '  ✓ validate_input    [1 file]' },
                { color: '#888', text: '  ✓ update_memory     [embedded]' },
                { color: '#888', text: '  ✓ retrieve_context  [5 matches]' },
                { color: '#888', text: '  ✓ impact_analysis   [NEW_API_ROUTE]' },
                { color: '#888', text: '  ✓ generate_docs     [High]' },
                { color: '#00c853', text: '  ✓ PR opened        [docs/api.md]' },
                { color: '#f5e642', text: '📝 AutoDocs: NEW_API_ROUTE (abc1234)' },
              ].map((line, i) => (
                <div key={i} style={{ color: line.color, whiteSpace: 'nowrap' }}>{line.text}</div>
              ))}
            </div>
          </div>

          <div style={{
            position: 'absolute', top: -18, right: -18,
            background: '#ff3b30', border: '3px solid #0a0a0a',
            padding: '6px 12px', transform: 'rotate(8deg)',
            boxShadow: '3px 3px 0 #0a0a0a',
            fontFamily: 'var(--font-display)', fontSize: '0.9rem',
            color: '#fff', letterSpacing: '0.05em', zIndex: 10,
          }}>IT JUST WORKS</div>
        </div>
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
