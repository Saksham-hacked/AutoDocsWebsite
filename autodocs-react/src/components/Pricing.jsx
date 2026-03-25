import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

const plans = [
  {
    name: 'HOBBY', price: { monthly: '$0', annual: '$0' },
    color: '#f5f0e8', dark: false, primary: false,
    features: ['3 repositories', '50 doc PRs / month', 'API, architecture, env docs', 'Community support'],
    missing: ['Custom templates', 'Priority processing', 'SSO / SAML'],
    cta: 'Get started free',
  },
  {
    name: 'PRO', price: { monthly: '$9', annual: '$5' },
    color: '#f5e642', dark: false, primary: true, badge: 'MOST POPULAR',
    features: ['Unlimited repositories', 'Unlimited doc PRs', 'All doc types', 'Custom templates', 'Priority processing', 'Email support'],
    missing: ['SSO / SAML'],
    cta: 'Start free trial',
  },
  {
    name: 'ENTERPRISE', price: { monthly: 'CUSTOM', annual: 'CUSTOM' },
    color: '#0a0a0a', dark: true, primary: false,
    features: ['Everything in Pro', 'SSO / SAML', 'Self-hosted option', 'Custom LLM', 'SLA guarantee', 'Dedicated support'],
    missing: [],
    cta: 'Contact sales',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
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
      gsap.set(card, { opacity: 0, y: 50 })
      gsap.to(card, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 0, opacity: 1, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="pricing" style={{ padding: '5rem 2rem', borderBottom: '3px solid #0a0a0a', background: '#f5f0e8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666', marginBottom: '0.5rem' }}>// PRICING</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.02em', lineHeight: 0.9 }}>SIMPLE.<br />TRANSPARENT.</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', opacity: annual ? 0.4 : 1 }}>Monthly</span>
            <div onClick={() => setAnnual(!annual)} style={{ width: 50, height: 26, background: '#0a0a0a', border: '3px solid #0a0a0a', boxShadow: '3px 3px 0 #0a0a0a', position: 'relative', cursor: 'none' }}>
              <div style={{ width: 16, height: 16, background: '#f5e642', border: '2px solid #0a0a0a', position: 'absolute', top: 2, left: annual ? 26 : 4, transition: 'left 0.2s' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', opacity: annual ? 1 : 0.4 }}>
              Annual <span style={{ background: '#f5e642', border: '2px solid #0a0a0a', padding: '1px 5px', fontSize: '0.6rem', boxShadow: '2px 2px 0 #0a0a0a' }}>-20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '3px solid #0a0a0a' }}>
          {plans.map((plan, i) => (
            <div key={plan.name} ref={el => cardsRef.current[i] = el} style={{
              padding: '2.5rem 2rem',
              borderRight: i < 2 ? '3px solid #0a0a0a' : 'none',
              background: plan.dark ? '#0a0a0a' : plan.primary ? plan.color : '#f5f0e8',
              position: 'relative',
            }}>
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%) rotate(-2deg)',
                  background: '#ff3b30', border: '3px solid #0a0a0a', padding: '3px 12px',
                  fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: '#fff',
                  letterSpacing: '0.05em', boxShadow: '3px 3px 0 #0a0a0a', whiteSpace: 'nowrap', zIndex: 5,
                }}>{plan.badge}</div>
              )}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '0.1em', color: plan.dark ? '#f5f0e8' : '#0a0a0a', marginBottom: '0.8rem' }}>{plan.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: 1, color: plan.dark ? '#f5e642' : '#0a0a0a', marginBottom: '0.3rem' }}>
                {annual ? plan.price.annual : plan.price.monthly}
                {plan.price.monthly !== '$0' && plan.price.monthly !== 'CUSTOM' && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: plan.dark ? '#888' : '#666' }}>/mo</span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: plan.dark ? '#888' : '#666', marginBottom: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {plan.price.monthly === '$0' ? 'Free forever' : plan.price.monthly === 'CUSTOM' ? 'Contact us' : `Billed ${annual ? 'annually' : 'monthly'}`}
              </div>
              <div style={{ marginBottom: '2rem' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginBottom: '0.6rem', color: plan.dark ? '#f5f0e8' : '#0a0a0a' }}>
                    <span style={{ width: 16, height: 16, background: plan.dark ? '#f5e642' : '#0a0a0a', color: plan.dark ? '#0a0a0a' : '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.55rem', marginTop: '1px' }}>✓</span>
                    {f}
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginBottom: '0.6rem', opacity: 0.3, color: plan.dark ? '#f5f0e8' : '#0a0a0a' }}>
                    <span style={{ width: 16, height: 16, border: `2px solid ${plan.dark ? '#555' : '#999'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', fontSize: '0.55rem' }}>—</span>
                    {f}
                  </div>
                ))}
              </div>
              <a href={plan.name === 'ENTERPRISE' ? 'mailto:hello@autodocs.dev' : INSTALL_URL} style={{
                display: 'block', padding: '11px', textAlign: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700,
                background: plan.dark ? '#f5e642' : '#0a0a0a',
                color: plan.dark ? '#0a0a0a' : '#f5f0e8',
                border: `3px solid ${plan.dark ? '#f5e642' : '#0a0a0a'}`,
                boxShadow: `4px 4px 0 ${plan.dark ? '#f5e642' : '#0a0a0a'}`,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.target.style.transform = 'translate(-2px,-2px)'; e.target.style.boxShadow = `6px 6px 0 ${plan.dark ? '#f5e642' : '#0a0a0a'}` }}
                onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = `4px 4px 0 ${plan.dark ? '#f5e642' : '#0a0a0a'}` }}
              >{plan.cta} →</a>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > div { border-right: none !important; border-bottom: 3px solid #0a0a0a !important; }
          .pricing-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  )
}
