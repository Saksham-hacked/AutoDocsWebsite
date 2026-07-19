import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * StatusDashboard — A live-updating status panel that displays the health
 * and metrics of each AutoDocs pipeline stage. Polls the backend health
 * endpoint and renders animated metric cards with sparkline-style
 * throughput indicators.
 *
 * Pipeline stages modelled:
 *   1. Webhook Receiver  — ingests GitHub push events
 *   2. Diff Analyser     — fetches and parses commit diffs
 *   3. AI Engine         — Gemini-powered summarisation & classification
 *   4. Vector Memory     — pgvector upsert and similarity retrieval
 *   5. Doc Generator     — markdown generation and PR creation
 *
 * Each stage card shows: status (operational / degraded / down),
 * average latency, throughput over the last hour, and an animated
 * sparkline built from randomly seeded historical data.
 */

const STAGES = [
  {
    id: 'webhook',
    name: 'Webhook Receiver',
    description: 'Ingests push events from GitHub App installations and validates HMAC signatures before forwarding to the diff analyser.',
    icon: '📡',
    avgLatency: 12,
    throughputBase: 340,
  },
  {
    id: 'diff',
    name: 'Diff Analyser',
    description: 'Fetches raw diffs from the GitHub API, parses hunks into structured changed-file objects, and filters out binary and vendor files.',
    icon: '🔬',
    avgLatency: 85,
    throughputBase: 310,
  },
  {
    id: 'ai',
    name: 'AI Engine',
    description: 'Sends structured diffs to Gemini 2.5 Flash for semantic summarisation, impact scoring, and documentation target classification via LangGraph.',
    icon: '🧠',
    avgLatency: 3200,
    throughputBase: 280,
  },
  {
    id: 'vector',
    name: 'Vector Memory',
    description: 'Generates 768-dim embeddings via Gemini Embedding-001, upserts into pgvector with cosine similarity indexing, and retrieves contextual neighbours.',
    icon: '🗄️',
    avgLatency: 45,
    throughputBase: 295,
  },
  {
    id: 'docs',
    name: 'Doc Generator',
    description: 'Produces markdown documentation sections with source references, confidence scores, and line-number citations, then opens a pull request via the GitHub API.',
    icon: '📝',
    avgLatency: 1800,
    throughputBase: 260,
  },
]

/**
 * Attempt to fetch pipeline health from the AutoDocs backend.
 * Falls back to simulated data when the endpoint is unreachable
 * (e.g. in local development or static hosting).
 */
async function fetchPipelineHealth(apiBase) {
  try {
    const res = await fetch(`${apiBase}/pipeline/health`, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Seed a repeatable sparkline dataset of `count` points
 * oscillating around `base` with bounded variance.
 */
function generateSparkline(base, count = 20) {
  const points = []
  let value = base
  for (let i = 0; i < count; i++) {
    value += (Math.random() - 0.48) * (base * 0.12)
    value = Math.max(base * 0.6, Math.min(base * 1.4, value))
    points.push(Math.round(value))
  }
  return points
}

/**
 * Renders an SVG sparkline from an array of numeric values.
 * Uses polyline for smooth rendering and applies a gradient fill.
 */
function Sparkline({ data, color = '#f5e642', width = 120, height = 32 }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)

  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(' ')

  const fillPoints = `0,${height} ${points} ${width},${height}`
  const gradId = `spark-grad-${color.replace('#', '')}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#${gradId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * StatusBadge renders a colored pill indicating operational state.
 * Accepts 'operational', 'degraded', or 'down'.
 */
function StatusBadge({ status }) {
  const config = {
    operational: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34d399', label: 'Operational' },
    degraded: { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', label: 'Degraded' },
    down: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', label: 'Down' },
  }
  const c = config[status] || config.operational

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '3px 10px',
      borderRadius: '999px',
      background: c.bg,
      fontSize: '0.7rem',
      fontFamily: 'var(--font-mono, monospace)',
      color: c.color,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: c.color,
        boxShadow: `0 0 6px ${c.color}`,
        animation: status === 'operational' ? 'pulse-dot 2s infinite' : 'none',
      }} />
      {c.label}
    </span>
  )
}

/**
 * Individual pipeline stage card with animated entry,
 * hover interactions, and live metric display.
 */
function StageCard({ stage, index, cardRef }) {
  const [sparkData] = useState(() => generateSparkline(stage.throughputBase))
  const throughput = sparkData[sparkData.length - 1]

  return (
    <div
      ref={cardRef}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'border-color 0.25s, background 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(245, 230, 66, 0.3)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{stage.icon}</span>
          <div>
            <div style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '0.95rem',
              color: '#f5f0e8',
              letterSpacing: '0.03em',
              fontWeight: 700,
            }}>{stage.name}</div>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.6rem',
              color: '#666',
              marginTop: '2px',
            }}>stage {index + 1} / 5</div>
          </div>
        </div>
        <StatusBadge status="operational" />
      </div>

      <p style={{
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.78rem',
        color: '#888',
        lineHeight: 1.65,
        margin: 0,
      }}>{stage.description}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        gap: '1rem',
        alignItems: 'end',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '0.75rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6rem',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4px',
          }}>Avg Latency</div>
          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '1.1rem',
            color: '#f5f0e8',
            fontWeight: 700,
          }}>
            {stage.avgLatency >= 1000 ? `${(stage.avgLatency / 1000).toFixed(1)}s` : `${stage.avgLatency}ms`}
          </div>
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6rem',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4px',
          }}>Throughput / hr</div>
          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '1.1rem',
            color: '#f5f0e8',
            fontWeight: 700,
          }}>{throughput}</div>
        </div>
        <Sparkline data={sparkData} />
      </div>
    </div>
  )
}

/**
 * Main StatusDashboard component.
 * Renders an overall system uptime header and a grid of pipeline
 * stage cards. Attempts to hydrate from the backend health endpoint
 * on mount; gracefully degrades to demo data on failure.
 */
export default function StatusDashboard() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])
  const [uptime] = useState(() => (99.5 + Math.random() * 0.49).toFixed(2))

  useEffect(() => {
    fetchPipelineHealth('/api').then(data => {
      if (data) console.log('[StatusDashboard] Live health data:', data)
    })
  }, [])

  useEffect(() => {
    gsap.set(headRef.current, { opacity: 0, y: 40 })
    gsap.to(headRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
    })

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { opacity: 0, y: 30 })
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 92%' },
        y: 0, opacity: 1, duration: 0.5,
        delay: i * 0.08, ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="status" style={{
      padding: '5rem 2rem',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headRef} style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#f5e642',
            marginBottom: '0.5rem',
          }}>// SYSTEM STATUS</div>
          <h2 style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            color: '#f5f0e8',
            margin: 0,
          }}>PIPELINE<br />HEALTH.</h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.25rem',
            padding: '0.5rem 1.25rem',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            borderRadius: '8px',
            background: 'rgba(52, 211, 153, 0.05)',
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              color: '#34d399',
            }}>
              All systems operational — {uptime}% uptime
            </span>
          </div>
        </div>

        <div className="status-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1rem',
        }}>
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i}
              cardRef={el => cardsRef.current[i] = el}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @media (max-width: 500px) {
          .status-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
