# AutoDocs

**Autonomous documentation agent for GitHub repositories.**

AutoDocs watches every commit and automatically opens pull requests keeping your documentation perfectly in sync with your code — powered by LangGraph, Gemini, and pgvector.

## How it works

1. Install the GitHub App on any repository
2. Push code as normal
3. AutoDocs detects what changed, classifies the impact, and generates updated documentation
4. A pull request appears with the new docs — review and merge

## Tech Stack

- **Layer 1** — Node.js / Express GitHub App (webhook handler, PR creation)
- **Layer 2** — Python / FastAPI + LangGraph pipeline (AI analysis, doc generation)
- **LLM** — Gemini 2.5 Flash
- **Embeddings** — Gemini Embedding 001 (768-dim)
- **Vector Store** — Postgres + pgvector (Supabase)

## Pipeline

```
git push → webhook → validate → update memory → retrieve context → impact analysis → generate docs → confidence check → PR
```

## Docs generated

| Change type | Doc updated |
|---|---|
| New API route | `docs/api.md` |
| New env variable | `docs/env.md` |
| Dependency update | `docs/setup.md` |
| Schema / module change | `docs/architecture.md` |

## Self-hosted

See `docs/setup.md` for deployment instructions.
