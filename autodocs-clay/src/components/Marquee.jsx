const items = ['Git Push', '🚀', 'Webhook', '⚡', 'AI Analysis', '🧠', 'Vector Search', '🔍', 'Doc Generation', '📝', 'PR Opened', '🎉', 'Zero Config', '✨', 'Any Stack', '💫']

export default function Marquee() {
  return (
    <div style={{ overflow: 'hidden', padding: '1.5rem 0', position: 'relative' }}>
      {/* Gradient fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2 }} />

      <div style={{ display: 'flex', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            background: i % 2 === 0 ? 'white' : 'transparent',
            borderRadius: i % 2 === 0 ? '100px' : '0',
            padding: i % 2 === 0 ? '8px 20px' : '8px 12px',
            margin: '0 8px',
            boxShadow: i % 2 === 0 ? 'var(--clay-sm)' : 'none',
            fontFamily: 'var(--font-body)', fontWeight: 800,
            fontSize: '0.85rem', color: 'var(--text-soft)',
            whiteSpace: 'nowrap',
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
