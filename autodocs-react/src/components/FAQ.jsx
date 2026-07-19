import { useState } from 'react'

const faqs = [
  {
    question: 'How does AutoDocs generate documentation?',
    answer:
      'AutoDocs listens for push events via a GitHub App webhook. When you push code, it analyzes the diff using Gemini AI, generates human-readable summaries, and opens a pull request with updated docs — all automatically.',
  },
  {
    question: 'Which languages and frameworks are supported?',
    answer:
      'AutoDocs works with any language GitHub supports. The AI layer understands JavaScript, TypeScript, Python, Go, Rust, Java, C#, and more. Framework-specific patterns (React, FastAPI, Express, etc.) are recognized automatically.',
  },
  {
    question: 'Does it work with private repositories?',
    answer:
      'Yes. AutoDocs uses GitHub App installation tokens scoped to the repositories you grant access to. Your code never leaves the secure pipeline between GitHub and the AI layer.',
  },
  {
    question: 'Can I customize the documentation style?',
    answer:
      'Absolutely. You can configure output format (Markdown, JSDoc, docstrings), verbosity level, and which files or directories to include or exclude — all through a simple .autodocs.yml config in your repo root.',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'Yes! The free tier covers up to 50 pushes per month with full AI-powered documentation generation. No credit card required to get started.',
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="faq-item"
      style={{
        borderBottom: '1px solid rgba(245, 230, 66, 0.15)',
        padding: '1.5rem 0',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: 0,
          color: '#f5f5f5',
          fontSize: '1.15rem',
          fontWeight: 600,
          fontFamily: 'inherit',
        }}
      >
        {question}
        <span
          style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            fontSize: '1.5rem',
            color: '#f5e642',
            marginLeft: '1rem',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          style={{
            color: 'rgba(245, 245, 245, 0.7)',
            lineHeight: 1.7,
            marginTop: '0.75rem',
            fontSize: '1rem',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#f5f5f5',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Frequently Asked{' '}
        <span style={{ color: '#f5e642' }}>Questions</span>
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: 'rgba(245, 245, 245, 0.6)',
          marginBottom: '3rem',
          fontSize: '1.1rem',
        }}
      >
        Everything you need to know about AutoDocs
      </p>
      <div>
        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  )
}
