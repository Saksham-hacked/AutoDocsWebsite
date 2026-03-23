import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -60 })
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', delay: 0.2 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '12px 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,245,240,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
            boxShadow: '0 4px 0 rgba(255,107,107,0.4), 0 8px 20px rgba(255,107,107,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>📝</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.4rem',
            color: 'var(--text)', letterSpacing: '0.02em',
          }}>AutoDocs</span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {['How it works', 'Features', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem',
              color: 'var(--text-soft)', textDecoration: 'none',
              padding: '8px 18px', borderRadius: '100px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = 'rgba(167,139,250,0.12)'; e.target.style.color = 'var(--lavender)' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-soft)' }}
            >{item}</a>
          ))}
          <a href={INSTALL_URL} className="clay-btn" style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
            color: '#fff', padding: '10px 24px',
            fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
            display: 'inline-block', marginLeft: '0.5rem',
            letterSpacing: '0.01em',
          }}>Install Free ✨</a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'white', border: 'none',
          borderRadius: '12px', padding: '8px 12px',
          boxShadow: 'var(--clay-sm)', cursor: 'pointer',
          flexDirection: 'column', gap: '4px',
        }} className="hamburger-clay">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 20, height: 2.5, background: 'var(--text)', borderRadius: '2px' }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 70, left: '1rem', right: '1rem', zIndex: 199,
          background: 'white', borderRadius: '24px',
          boxShadow: 'var(--clay-xl)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {['How it works', 'Features', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                color: 'var(--text)', textDecoration: 'none',
                padding: '12px 16px', borderRadius: '14px',
                background: 'var(--bg)',
              }}>{item}</a>
          ))}
          <a href={INSTALL_URL} className="clay-btn" style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
            color: '#fff', padding: '14px',
            fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
            textAlign: 'center',
          }}>Install Free ✨</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hamburger-clay { display: flex !important; }
        }
      `}</style>
    </>
  )
}
