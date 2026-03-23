export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      padding: '2rem 4rem',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      borderTop: '3px solid #333',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '1.5rem',
        color: '#f5e642', letterSpacing: '0.1em',
      }}>AUTODOCS</div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>
        © 2026 AutoDocs — LangGraph + Gemini + pgvector
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          ['GitHub', 'https://github.com/apps/autodoc-test-110'],
          ['Install', 'https://github.com/apps/autodoc-test-110/installations/new'],
        ].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: '#888', textDecoration: 'none',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#f5e642'}
            onMouseLeave={e => e.target.style.color = '#888'}
          >{label}</a>
        ))}
      </div>
    </footer>
  )
}
