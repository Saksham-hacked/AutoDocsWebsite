const INSTALL_URL = 'https://github.com/apps/autodoc-test-110/installations/new'

export default function Footer() {
  return (
    <footer style={{
      background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: '3rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF6B6B, #FFAB76)',
              boxShadow: '0 4px 0 rgba(255,107,107,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
            }}>📝</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text)' }}>AutoDocs</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            LangGraph + Gemini + pgvector
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            ['GitHub App', 'https://github.com/apps/autodoc-test-110'],
            ['Install Free', INSTALL_URL],
            ['Contact', 'mailto:hello@autodocs.dev'],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '0.85rem', color: 'var(--text-soft)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--coral)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-soft)'}
            >{label}</a>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          © 2026 AutoDocs
        </p>
      </div>
    </footer>
  )
}
