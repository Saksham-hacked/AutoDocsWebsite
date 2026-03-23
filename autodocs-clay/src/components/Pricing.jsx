import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

const plans = [
  {
    name: 'Hobby', emoji: '🌱', price: { m: '$0', a: '$0' },
    period: 'Free forever',
    bg: 'linear-gradient(135deg, #E8FFF8, #E0F8FF)',
    accent: '#4ECDC4', shadow: 'rgba(78,205,196,0.3)',
    features: ['3 repositories', '50 doc PRs / month', 'API, architecture, env docs', 'Community support'],
    missing: ['Custom templates', 'Priority processing'],
    cta: 'Get started free', ctaBg: 'linear-gradient(135deg, #4ECDC4, #60B8FF)',
  },
  {
    name: 'Pro', emoji: '🚀', price: { m: '$19', a: '$15' },
    period: '/mo per user', badge: 'Most Popular 🔥',
    bg: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
    accent: '#FF6B6B', shadow: 'rgba(255,107,107,0.4)',
    features: ['Unlimited repositories', 'Unlimited doc PRs', 'All doc types', 'Custom templates', 'Priority processing', 'Email support'],
    missing: [],
    cta: 'Start free trial', ctaBg: 'white', dark: true,
  },
  {
    name: 'Enterprise', emoji: '🏢', price: { m: 'Custom', a: 'Custom' },
    period: 'Contact us',
    bg: 'linear-gradient(135deg, #F0E8FF, #E8EEFF)',
    accent: '#A78BFA', shadow: 'rgba(167,139,250,0.3)',
    features: ['Everything in Pro', 'SSO / SAML', 'Self-hosted option', 'Custom LLM', 'SLA guarantee', 'Dedicated support'],
    missing: [],
    cta: 'Contact sales', ctaBg: 'linear-gradient(135deg, #A78BFA, #60B8FF)',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])

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
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 1, y: 0, scale: 1, duration: 0.7,
        delay: i * 0.15, ease: 'back.out(1.4)',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="pricing" style={{ padding: '4rem 2rem 6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block', background: 'white', borderRadius: '100px',
            padding: '6px 20px', marginBottom: '1.2rem', boxShadow: 'var(--clay-sm)',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-soft)',
          }}>💰 Pricing</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Simple, transparent pricing.<br />
            <span style={{ color: 'var(--coral)' }}>Start free today.</span>
          </h2>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', color: annual ? 'var(--text-muted)' : 'var(--text)' }}>Monthly</span>
            <div onClick={() => setAnnual(!annual)} style={{
              width: 56, height: 30, borderRadius: '100px',
              background: annual ? 'linear-gradient(135deg, #4ECDC4, #60B8FF)' : '#E5E7EB',
              boxShadow: 'var(--clay-sm)', cursor: 'pointer',
              position: 'relative', transition: 'background 0.3s',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 4, left: annual ? 30 : 4,
                transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', color: annual ? 'var(--text)' : 'var(--text-muted)' }}>
              Annual <span style={{
                background: 'linear-gradient(135deg, #4ECDC4, #60B8FF)',
                color: 'white', borderRadius: '100px', padding: '2px 10px',
                fontSize: '0.7rem', fontWeight: 800, marginLeft: '4px',
              }}>-20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={el => cardsRef.current[i] = el}
              className="clay-card"
              style={{
                background: plan.bg, padding: '2.5rem 2rem',
                boxShadow: `0 8px 0 ${plan.shadow}, 0 20px 50px ${plan.shadow}`,
                position: 'relative',
                transform: i === 1 ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
                  color: 'white', borderRadius: '100px',
                  padding: '6px 20px', fontFamily: 'var(--font-body)',
                  fontWeight: 800, fontSize: '0.78rem',
                  boxShadow: '0 4px 0 rgba(255,107,107,0.4)',
                  whiteSpace: 'nowrap',
                }}>{plan.badge}</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{plan.emoji}</span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                  color: plan.dark ? 'white' : 'var(--text)',
                }}>{plan.name}</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '3rem',
                  color: plan.dark ? 'white' : 'var(--text)', lineHeight: 1,
                }}>{annual ? plan.price.a : plan.price.m}</span>
                {plan.price.m !== 'Custom' && plan.price.m !== '$0' && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: plan.dark ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 700 }}>{plan.period}</span>
                )}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: plan.dark ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>
                  {plan.price.m === '$0' ? 'Free forever' : plan.price.m === 'Custom' ? 'Contact us for pricing' : `Billed ${annual ? 'annually' : 'monthly'}`}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: plan.dark ? 'rgba(255,255,255,0.3)' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', flexShrink: 0, marginTop: '1px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}>✓</div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: plan.dark ? 'rgba(255,255,255,0.95)' : 'var(--text-soft)' }}>{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px', opacity: 0.4 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', flexShrink: 0, marginTop: '1px' }}>—</div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-soft)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href={plan.name === 'Enterprise' ? 'mailto:hello@autodocs.dev' : INSTALL_URL}
                className="clay-btn"
                style={{
                  display: 'block', textAlign: 'center', padding: '14px',
                  background: plan.ctaBg,
                  color: plan.dark ? 'var(--coral)' : 'white',
                  textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                }}
              >{plan.cta} →</a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > div { transform: scale(1) !important; }
        }
      `}</style>
    </section>
  )
}
