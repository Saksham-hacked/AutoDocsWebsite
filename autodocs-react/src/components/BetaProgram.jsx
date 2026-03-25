import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SPOTS_TOTAL = 100
const SPOTS_TAKEN = 67

const PERKS = [
  {
    icon: '🧪',
    tag: 'EARLY ACCESS',
    title: 'SHAPE THE PRODUCT',
    body: 'Every feature ships to you first. Your feedback directly decides what we build — not a roadmap made in a vacuum.',
    color: '#f5e642',
    dark: false,
  },
  {
    icon: '💬',
    tag: 'DIRECT LINE',
    title: 'PRIVATE DISCORD',
    body: 'A dedicated channel with the core team. Drop bugs, ideas, or war stories — we read everything and respond fast.',
    color: '#0a0a0a',
    dark: true,
  },
  {
    icon: '🔓',
    tag: 'BETA DEAL',
    title: 'LOCKED-IN PRICING',
    body: "Beta testers lock in 50% off Pro — forever. When we go public, you keep your rate. No surprises, no price hikes.",
    color: '#ff3b30',
    dark: true,
  },
  {
    icon: '🏷️',
    tag: 'RECOGNITION',
    title: 'FOUNDING TESTER BADGE',
    body: 'Your name in the credits, a Founding Tester badge on your profile, and genuine gratitude from the team.',
    color: '#f5f0e8',
    dark: false,
  },
]

const TIMELINE = [
  {
    phase: '01',
    label: 'ALPHA',
    date: 'NOW — APR 2026',
    status: 'active',
    desc: 'Closed testing with 100 hand-picked devs. Core pipeline stability, edge-case hunting.',
    tasks: ['Webhook reliability', 'Multi-repo support', 'Confidence scoring tuning'],
  },
  {
    phase: '02',
    label: 'BETA',
    date: 'MAY 2026',
    status: 'upcoming',
    desc: 'Wider rollout. Custom doc templates, team dashboards, GitHub Actions integration.',
    tasks: ['Custom templates', 'Team workspace', 'GitHub Actions'],
  },
  {
    phase: '03',
    label: 'RC',
    date: 'JUN 2026',
    status: 'upcoming',
    desc: 'Release candidate. Performance hardening, SLA guarantees, and billing infrastructure.',
    tasks: ['99.9% uptime SLA', 'Usage analytics', 'Billing & invoices'],
  },
  {
    phase: '04',
    label: 'GA',
    date: 'JUL 2026',
    status: 'upcoming',
    desc: 'General availability. Public launch on Product Hunt + Hacker News.',
    tasks: ['Public launch', 'Pro & Team plans', 'Changelog feed'],
  },
]

const COLLABORATIONS = [
  { icon: '🐛', title: 'BUG HUNTER', desc: 'Report a verified bug via our Discord or GitHub Issue tracker.', reward: '+10 pts per bug' },
  { icon: '💡', title: 'IDEA CONTRIBUTOR', desc: 'Submit a feature idea that gets added to the roadmap.', reward: '+25 pts per idea' },
  { icon: '✍️', title: 'DOCS REVIEWER', desc: 'Review and improve the docs AutoDocs generates for your repo.', reward: '+15 pts per review' },
  { icon: '📣', title: 'REFERRAL', desc: 'Refer a dev who joins the beta and installs AutoDocs.', reward: '+20 pts per referral' },
  { icon: '🎙️', title: 'USER INTERVIEW', desc: 'Join a 30-min call with the team to discuss your experience.', reward: '+50 pts flat' },
  { icon: '🔬', title: 'STRESS TESTER', desc: 'Run AutoDocs on a large monorepo (500+ files) and report results.', reward: '+40 pts flat' },
]

const FAQS = [
  { q: 'WHEN WILL I GET ACCESS?', a: 'We review applications and onboard testers in weekly batches. You\'ll receive your access link within 48 hours of submitting.' },
  { q: 'DO I NEED TO PAY ANYTHING?', a: 'No. The beta is completely free. You\'ll have access to all Pro features at no cost during the entire testing phase.' },
  { q: 'WHAT REPOS CAN I TEST ON?', a: 'Any public or private GitHub repository. We recommend testing on an active repo you\'re currently pushing to — that\'s where you\'ll see the most value.' },
  { q: 'HOW IS THE 50% DISCOUNT APPLIED?', a: 'When we launch paid plans, your account will automatically be on the Founding Tester tier — half the public price, locked in permanently.' },
  { q: 'CAN I LEAVE THE BETA EARLY?', a: 'Yes, anytime. Just uninstall the GitHub App. You keep the Founding Tester discount regardless of how long you stayed in the program.' },
  { q: 'WHAT TECH STACK IS SUPPORTED?', a: 'AutoDocs reads raw source code — JavaScript, TypeScript, Python, Go, Rust, Ruby, and more. No language plugins or parsers needed.' },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BetaProgram() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])
  const timelineRef = useRef([])
  const formBoxRef = useRef(null)
  const barRef = useRef(null)
  const collabRef = useRef([])

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [useCase, setUseCase] = useState('')
  const [repoSize, setRepoSize] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN
  const pctFilled = (SPOTS_TAKEN / SPOTS_TOTAL) * 100

  useEffect(() => {
    // Head
    gsap.set(headRef.current, { opacity: 0, y: 50 })
    gsap.to(headRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
    })

    // Perk cards
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 40 })
      gsap.to(card, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        y: 0, opacity: 1, duration: 0.5, delay: i * 0.12, ease: 'power2.out',
      })
    })

    // Timeline items
    timelineRef.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: 0, x: -30 })
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        x: 0, opacity: 1, duration: 0.5, delay: i * 0.1, ease: 'power2.out',
      })
    })

    // Collab cards
    collabRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 30 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 0, opacity: 1, duration: 0.45, delay: (i % 3) * 0.08, ease: 'power2.out',
      })
    })

    // Form box
    gsap.set(formBoxRef.current, { opacity: 0, y: 40 })
    gsap.to(formBoxRef.current, {
      scrollTrigger: { trigger: formBoxRef.current, start: 'top 85%' },
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
    })

    // Progress bar
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { width: '0%' },
        {
          width: `${pctFilled}%`,
          duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }
  }, [])

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1300))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="beta"
      style={{
        padding: '5rem 2rem',
        background: '#f5f0e8',
        borderBottom: '3px solid #0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ── HEADER ── */}
        <div ref={headRef} style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: '#ff3b30', border: '2px solid #0a0a0a',
            padding: '5px 14px', marginBottom: '1.2rem',
            boxShadow: '3px 3px 0 #0a0a0a',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff',
          }}>
            <span style={{
              width: 8, height: 8, background: '#f5e642',
              borderRadius: '50%', display: 'inline-block',
              animation: 'betapulse 1.4s infinite',
            }} />
            Alpha Phase · {spotsLeft} Spots Left
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '0.02em', lineHeight: 0.9,
              }}>
                TEST IT BEFORE<br />
                <span style={{ WebkitTextStroke: '3px #0a0a0a', color: 'transparent' }}>THE WORLD DOES.</span>
              </h2>
            </div>

            {/* Spot counter */}
            <div style={{
              border: '3px solid #0a0a0a', padding: '1rem 1.5rem',
              background: '#fff', boxShadow: '5px 5px 0 #0a0a0a',
              textAlign: 'center', minWidth: 140,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: 1, color: '#ff3b30' }}>{spotsLeft}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginTop: '0.2rem' }}>Spots Remaining</div>
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1.05rem',
            color: '#444', maxWidth: '600px',
            marginTop: '1.2rem', lineHeight: 1.65,
          }}>
            We're opening AutoDocs to a small group of developers before the public launch. Help us stress-test, break things, and make it bulletproof — in return, you get perks that never expire.
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: '1.8rem', maxWidth: 440 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>{SPOTS_TAKEN}/{SPOTS_TOTAL} testers joined</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#ff3b30', fontWeight: 700 }}>{Math.round(pctFilled)}% full</span>
            </div>
            <div style={{ height: 14, background: '#e0ddd6', border: '2px solid #0a0a0a', position: 'relative', overflow: 'hidden' }}>
              <div ref={barRef} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: '#ff3b30', width: '0%' }} />
            </div>
          </div>
        </div>

        {/* ── PERKS GRID ── */}
        <div className="beta-perks-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '3px solid #0a0a0a', marginBottom: '5rem',
        }}>
          {PERKS.map((p, i) => (
            <div
              key={p.title}
              ref={el => cardsRef.current[i] = el}
              style={{
                padding: '2rem 1.5rem',
                background: p.color,
                borderRight: i < 3 ? '3px solid #0a0a0a' : 'none',
                transition: 'transform 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'inline-block',
                background: p.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                border: `2px solid ${p.dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}`,
                padding: '3px 10px', marginBottom: '1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: p.dark ? '#f5e642' : '#0a0a0a',
              }}>{p.tag}</div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{p.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                letterSpacing: '0.05em',
                color: p.dark ? '#f5f0e8' : '#0a0a0a',
                marginBottom: '0.6rem',
              }}>{p.title}</div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                color: p.dark ? '#aaa' : '#555', lineHeight: 1.6,
              }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* ── LAUNCH TIMELINE ── */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '0.5rem' }}>// LAUNCH TIMELINE</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 0.9 }}>
              THE ROAD<br />
              <span style={{ WebkitTextStroke: '2px #0a0a0a', color: 'transparent' }}>TO GA.</span>
            </h3>
          </div>

          <div className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '3px solid #0a0a0a' }}>
            {TIMELINE.map((item, i) => (
              <div
                key={item.phase}
                ref={el => timelineRef.current[i] = el}
                style={{
                  padding: '2rem 1.5rem',
                  borderRight: i < 3 ? '3px solid #0a0a0a' : 'none',
                  background: item.status === 'active' ? '#0a0a0a' : '#f5f0e8',
                  position: 'relative',
                }}
              >
                {/* Phase number */}
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '3.5rem',
                  lineHeight: 1, letterSpacing: '0.02em',
                  color: item.status === 'active' ? 'rgba(245,230,66,0.15)' : 'rgba(10,10,10,0.08)',
                  position: 'absolute', top: '1rem', right: '1.2rem',
                }}>{item.phase}</div>

                {/* Status badge */}
                <div style={{
                  display: 'inline-block',
                  background: item.status === 'active' ? '#f5e642' : 'transparent',
                  border: `2px solid ${item.status === 'active' ? '#f5e642' : '#0a0a0a'}`,
                  padding: '3px 10px', marginBottom: '1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: item.status === 'active' ? '#0a0a0a' : '#888',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                }}>
                  {item.status === 'active' && (
                    <span style={{ width: 6, height: 6, background: '#00c853', borderRadius: '50%', display: 'inline-block', animation: 'betapulse 1.4s infinite' }} />
                  )}
                  {item.status === 'active' ? 'LIVE NOW' : 'UPCOMING'}
                </div>

                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.8rem',
                  letterSpacing: '0.05em',
                  color: item.status === 'active' ? '#f5e642' : '#0a0a0a',
                  marginBottom: '0.3rem',
                }}>{item.label}</div>

                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: item.status === 'active' ? '#888' : '#999',
                  marginBottom: '0.9rem',
                }}>{item.date}</div>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                  color: item.status === 'active' ? '#999' : '#555',
                  lineHeight: 1.55, marginBottom: '1.2rem',
                }}>{item.desc}</p>

                {item.tasks.map((t, j) => (
                  <div key={j} style={{
                    display: 'flex', gap: '0.5rem', alignItems: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    color: item.status === 'active' ? '#666' : '#777',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    <span style={{
                      width: 14, height: 14, flexShrink: 0,
                      border: `2px solid ${item.status === 'active' ? '#f5e642' : '#ccc'}`,
                      background: item.status === 'active' ? 'rgba(245,230,66,0.1)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.45rem', color: item.status === 'active' ? '#f5e642' : '#ccc',
                    }}>→</span>
                    {t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── WAYS TO COLLABORATE ── */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '0.5rem' }}>// CONTRIBUTE & EARN POINTS</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 0.9 }}>
                HOW TO<br />
                <span style={{ WebkitTextStroke: '2px #0a0a0a', color: 'transparent' }}>COLLABORATE.</span>
              </h3>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#555', maxWidth: 340, lineHeight: 1.6 }}>
              Earn points for every contribution. Top testers get extra perks at launch — lifetime Pro access, swag, and a shout-out in our public changelog.
            </p>
          </div>

          <div className="collab-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '3px solid #0a0a0a' }}>
            {COLLABORATIONS.map((c, i) => (
              <div
                key={c.title}
                ref={el => collabRef.current[i] = el}
                style={{
                  padding: '1.8rem',
                  borderRight: (i + 1) % 3 !== 0 ? '3px solid #0a0a0a' : 'none',
                  borderBottom: i < 3 ? '3px solid #0a0a0a' : 'none',
                  background: '#f5f0e8',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0ead8'}
                onMouseLeave={e => e.currentTarget.style.background = '#f5f0e8'}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>{c.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{c.title}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#555', lineHeight: 1.6, marginBottom: '0.8rem' }}>{c.desc}</p>
                <div style={{
                  display: 'inline-block',
                  background: '#0a0a0a', color: '#f5e642',
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '4px 10px', border: '2px solid #0a0a0a',
                  boxShadow: '2px 2px 0 #f5e642',
                }}>{c.reward}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT TESTERS GET + WHAT WE ASK ── */}
        <div className="beta-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '3px solid #0a0a0a', marginBottom: '5rem' }}>
          {/* What you get */}
          <div style={{ padding: '2.5rem', borderRight: '3px solid #0a0a0a', background: '#f5e642' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(10,10,10,0.5)', marginBottom: '0.8rem' }}>// WHAT YOU GET</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.03em', marginBottom: '1.5rem' }}>TESTER BENEFITS</h4>
            {[
              ['Full Pro access, free', 'All Pro features unlocked during the beta — no billing.'],
              ['50% discount, locked forever', 'When paid plans launch, your rate is half the public price.'],
              ['Private Discord channel', 'Direct line to the founding team. Fast responses, always.'],
              ['Founding Tester badge', 'Permanent recognition on your profile and in our credits.'],
              ['Changelog shout-outs', 'Top contributors get called out in every release note.'],
              ['Early access to features', 'You get every feature before it ships publicly.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, flexShrink: 0,
                  background: '#0a0a0a', color: '#f5e642',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem', marginTop: '1px',
                }}>✓</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#333', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* What we ask */}
          <div style={{ padding: '2.5rem', background: '#0a0a0a' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', marginBottom: '0.8rem' }}>// WHAT WE ASK</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.03em', color: '#f5f0e8', marginBottom: '1.5rem' }}>YOUR COMMITMENT</h4>
            {[
              ['Install on at least one active repo', 'A repo you\'re actively pushing to gives us the best signal.'],
              ['Report bugs you encounter', 'Submit to Discord or GitHub Issues — screenshots welcome.'],
              ['Fill out a 2-min feedback form', 'Once a week, we\'ll send a short pulse check.'],
              ['Optional: 30-min team interview', 'Not required, but deeply appreciated if you\'re up for it.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, flexShrink: 0,
                  background: '#f5e642', color: '#0a0a0a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem', marginTop: '1px',
                }}>→</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f5f0e8', marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#777', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #222' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555', marginBottom: '0.8rem' }}>Join the community</div>
              <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Discord →', href: '#', bg: '#5865F2' },
                  { label: 'GitHub →', href: 'https://github.com/apps/autodoc-test-110', bg: '#24292e' },
                ].map(btn => (
                  <a key={btn.label} href={btn.href} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    background: btn.bg, color: '#fff',
                    padding: '8px 16px', textDecoration: 'none',
                    border: '2px solid #444',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    transition: 'all 0.15s', display: 'inline-block',
                    boxShadow: '3px 3px 0 #333',
                  }}
                    onMouseEnter={e => { e.target.style.transform = 'translate(-2px,-2px)'; e.target.style.boxShadow = '5px 5px 0 #333' }}
                    onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = '3px 3px 0 #333' }}
                  >{btn.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '0.5rem' }}>// COMMON QUESTIONS</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '0.02em', lineHeight: 0.9, marginBottom: '2rem' }}>FAQ</h3>
          <div style={{ border: '3px solid #0a0a0a' }}>
            {FAQS.map((item, i) => (
              <div
                key={i}
                style={{ borderBottom: i < FAQS.length - 1 ? '2px solid #0a0a0a' : 'none' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '1.2rem 1.5rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: openFaq === i ? '#0a0a0a' : '#f5f0e8',
                    border: 'none', cursor: 'none', textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: openFaq === i ? '#f5e642' : '#0a0a0a',
                  }}>{item.q}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                    color: openFaq === i ? '#f5e642' : '#0a0a0a',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    display: 'inline-block', flexShrink: 0, marginLeft: '1rem',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '1.2rem 1.5rem',
                    background: '#0a0a0a',
                    borderTop: '2px solid #1a1a1a',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: '#999', lineHeight: 1.65,
                    }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── SIGN-UP FORM ── */}
        <div
          ref={formBoxRef}
          className="beta-form-layout"
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            border: '3px solid #0a0a0a',
            boxShadow: '8px 8px 0 #0a0a0a',
            background: '#0a0a0a',
          }}
        >
          {/* Left panel */}
          <div style={{
            padding: '3rem', borderRight: '3px solid #1a1a1a',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f5e642', marginBottom: '0.8rem' }}>// JOIN THE BETA</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '0.03em', lineHeight: 1,
                color: '#f5f0e8', marginBottom: '1.2rem',
              }}>
                BE A FOUNDING<br />TESTER.
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#888', lineHeight: 1.65, maxWidth: 300 }}>
                We review every application and onboard testers in weekly batches. You'll get a confirmation email with your access link within 48 hours.
              </p>
            </div>

            {/* Process steps */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555', marginBottom: '0.8rem' }}>After you apply</div>
              {[
                ['48h', 'We review your application'],
                ['Day 1', 'Access link arrives in your inbox'],
                ['Day 2', 'Install the GitHub App on a repo'],
                ['Day 3', 'Push a commit. Watch your first PR.'],
              ].map(([step, desc], i) => (
                <div key={i} style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  marginBottom: '0.6rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.75rem',
                    background: '#f5e642', color: '#0a0a0a',
                    padding: '2px 6px', flexShrink: 0, marginTop: '1px',
                    minWidth: 36, textAlign: 'center',
                  }}>{step}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ padding: '3rem' }}>
            {submitted ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem' }}>
                <div style={{
                  width: 64, height: 64, background: '#00c853',
                  border: '3px solid #f5e642',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', boxShadow: '4px 4px 0 #f5e642',
                }}>✓</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#f5f0e8', letterSpacing: '0.05em' }}>YOU'RE ON THE LIST.</div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', maxWidth: 260, lineHeight: 1.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Check your inbox within 48 hours. We'll send your access link when your spot is confirmed.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', marginBottom: '0.2rem' }}>// APPLICATION FORM</div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '0.4rem' }}>
                    Work / GitHub Email *
                  </label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={{
                      width: '100%', padding: '11px 13px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                      background: '#111', border: '2px solid #2a2a2a',
                      color: '#f5f0e8', outline: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#f5e642'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>

                {/* Role */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '0.4rem' }}>
                    Your Role
                  </label>
                  <select value={role} onChange={e => setRole(e.target.value)}
                    style={{
                      width: '100%', padding: '11px 13px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                      background: '#111', border: '2px solid #2a2a2a',
                      color: role ? '#f5f0e8' : '#555', outline: 'none',
                      appearance: 'none', cursor: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#f5e642'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="solo">Solo Developer</option>
                    <option value="eng">Engineer / Tech Lead</option>
                    <option value="devrel">DevRel / Developer Advocate</option>
                    <option value="em">Engineering Manager</option>
                    <option value="founder">Founder / CTO</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Use case */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '0.4rem' }}>
                    Primary Use Case
                  </label>
                  <select value={useCase} onChange={e => setUseCase(e.target.value)}
                    style={{
                      width: '100%', padding: '11px 13px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                      background: '#111', border: '2px solid #2a2a2a',
                      color: useCase ? '#f5f0e8' : '#555', outline: 'none',
                      appearance: 'none', cursor: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#f5e642'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  >
                    <option value="" disabled>What will you use it for?</option>
                    <option value="api">API / backend documentation</option>
                    <option value="oss">Open source project docs</option>
                    <option value="internal">Internal team knowledge base</option>
                    <option value="sdk">SDK / library documentation</option>
                    <option value="explore">Just exploring</option>
                  </select>
                </div>

                {/* Repo size */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '0.4rem' }}>
                    Approx. Repo Size
                  </label>
                  <select value={repoSize} onChange={e => setRepoSize(e.target.value)}
                    style={{
                      width: '100%', padding: '11px 13px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                      background: '#111', border: '2px solid #2a2a2a',
                      color: repoSize ? '#f5f0e8' : '#555', outline: 'none',
                      appearance: 'none', cursor: 'none', transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#f5e642'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  >
                    <option value="" disabled>Number of files</option>
                    <option value="small">&lt; 50 files</option>
                    <option value="mid">50 – 200 files</option>
                    <option value="large">200 – 500 files</option>
                    <option value="xl">500+ files (monorepo)</option>
                  </select>
                </div>

                {error && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ff3b30', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{error}</div>
                )}

                <button
                  onClick={handleSubmit} disabled={loading}
                  style={{
                    marginTop: '0.4rem', padding: '14px',
                    fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.1em',
                    background: loading ? '#333' : '#f5e642', color: '#0a0a0a',
                    border: `3px solid ${loading ? '#333' : '#f5e642'}`,
                    boxShadow: loading ? 'none' : '5px 5px 0 #f5e642',
                    cursor: loading ? 'not-allowed' : 'none', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translate(-2px,-2px)'; e.target.style.boxShadow = '7px 7px 0 #f5e642' } }}
                  onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = loading ? 'none' : '5px 5px 0 #f5e642' }}
                >
                  {loading ? 'SUBMITTING...' : 'APPLY FOR BETA ACCESS →'}
                </button>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                  No credit card. We never share your email. Unsubscribe anytime.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes betapulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.65); }
        }
        /* Perks */
        @media (max-width: 1000px) {
          .beta-perks-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .beta-perks-grid > div:nth-child(2) { border-right: none !important; }
          .beta-perks-grid > div:nth-child(1),
          .beta-perks-grid > div:nth-child(2) { border-bottom: 3px solid #0a0a0a !important; }
          .beta-perks-grid > div:nth-child(odd):not(:last-child) { border-right: 3px solid #0a0a0a !important; }
        }
        @media (max-width: 600px) {
          .beta-perks-grid { grid-template-columns: 1fr !important; }
          .beta-perks-grid > div { border-right: none !important; border-bottom: 3px solid #0a0a0a !important; }
          .beta-perks-grid > div:last-child { border-bottom: none !important; }
        }
        /* Timeline */
        @media (max-width: 900px) {
          .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .timeline-grid > div { border-right: none !important; border-bottom: 3px solid #0a0a0a !important; }
          .timeline-grid > div:nth-child(odd) { border-right: 3px solid #0a0a0a !important; }
          .timeline-grid > div:last-child { border-bottom: none !important; }
        }
        @media (max-width: 500px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
          .timeline-grid > div { border-right: none !important; }
        }
        /* Collab grid */
        @media (max-width: 900px) {
          .collab-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .collab-grid > div { border-right: none !important; }
          .collab-grid > div:nth-child(odd) { border-right: 3px solid #0a0a0a !important; }
          .collab-grid > div:nth-child(5), .collab-grid > div:nth-child(6) { border-bottom: none !important; }
        }
        @media (max-width: 500px) {
          .collab-grid { grid-template-columns: 1fr !important; }
          .collab-grid > div { border-right: none !important; }
          .collab-grid > div:last-child { border-bottom: none !important; }
        }
        /* Two col */
        @media (max-width: 800px) {
          .beta-two-col { grid-template-columns: 1fr !important; }
          .beta-two-col > div:first-child { border-right: none !important; border-bottom: 3px solid #0a0a0a !important; }
        }
        /* Form */
        @media (max-width: 800px) {
          .beta-form-layout { grid-template-columns: 1fr !important; }
          .beta-form-layout > div:first-child { border-right: none !important; border-bottom: 3px solid #1a1a1a !important; }
        }
        select option { background: #1a1a1a; color: #f5f0e8; }
      `}</style>
    </section>
  )
}
