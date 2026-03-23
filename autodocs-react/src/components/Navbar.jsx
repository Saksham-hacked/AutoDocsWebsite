import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -80 })
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bg = scrolled ? '#0a0a0a' : '#f5f0e8'
  const fg = scrolled ? '#f5f0e8' : '#0a0a0a'
  const border = scrolled ? '#333' : '#0a0a0a'

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: bg, borderBottom: `3px solid ${border}`,
        padding: '0 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '64px',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.8rem',
          color: fg, textDecoration: 'none', letterSpacing: '0.05em',
          transition: 'color 0.3s',
        }}>
          AUTO<span style={{
            background: '#f5e642', padding: '0 5px',
            border: '2px solid #0a0a0a', marginLeft: '3px',
            color: '#0a0a0a',
          }}>DOCS</span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          listStyle: 'none',
          '@media(max-width:768px)': { display: 'none' },
        }} className="nav-desktop">
          {['How it works', 'Features', 'Pricing'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: fg, textDecoration: 'none', padding: '6px 12px',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'color 0.3s',
                display: 'block',
              }}>{item}</a>
            </li>
          ))}
          <li>
            <a href={INSTALL_URL} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              background: '#f5e642', color: '#0a0a0a',
              padding: '8px 16px', border: '2px solid #0a0a0a',
              textDecoration: 'none', textTransform: 'uppercase',
              letterSpacing: '0.05em', boxShadow: '3px 3px 0 #0a0a0a',
              display: 'block', fontWeight: 700,
            }}>Install Free →</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'none', border: `2px solid ${fg}`,
            padding: '6px 10px', cursor: 'none',
            display: 'none', flexDirection: 'column', gap: '4px',
            transition: 'border-color 0.3s',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: fg, transition: 'background 0.3s',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: '#0a0a0a', borderBottom: '3px solid #f5e642',
          padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {['How it works', 'Features', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '1rem',
                color: '#f5f0e8', textDecoration: 'none',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.5rem 0', borderBottom: '1px solid #333',
              }}>{item}</a>
          ))}
          <a href={INSTALL_URL} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
            background: '#f5e642', color: '#0a0a0a',
            padding: '12px 20px', border: '2px solid #f5e642',
            textDecoration: 'none', textTransform: 'uppercase',
            letterSpacing: '0.05em', fontWeight: 700, textAlign: 'center',
            boxShadow: '4px 4px 0 #f5e642',
          }}>Install Free →</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
