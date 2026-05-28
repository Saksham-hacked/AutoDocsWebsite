import { useEffect, useRef } from "react";

export default function LiveActivity() {
  const breakdownRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          breakdownRef.current?.querySelectorAll(".breakdown-fill").forEach((el) => {
            el.style.width = el.dataset.fill;
          });
        }
      },
      { threshold: 0.3 }
    );
    if (breakdownRef.current) observer.observe(breakdownRef.current);
    return () => observer.disconnect();
  }, []);

  const events = [
    {
      avatar: "🛰️", repo: "acme-corp / api-gateway",
      desc: "📝 AutoDocs: NEW_API_ROUTE — docs/api.md updated",
      tag: "NEW_ROUTE", tagClass: "tag-new-route",
      conf: "High", confClass: "conf-high", confFill: "filled-high", pips: 3,
      time: "2m ago",
    },
    {
      avatar: "🧬", repo: "biofast / pipeline-core",
      desc: "📝 AutoDocs: ENV_CHANGE — docs/config.md updated",
      tag: "ENV_CHANGE", tagClass: "tag-env",
      conf: "Medium", confClass: "conf-med", confFill: "filled-med", pips: 2,
      time: "9m ago",
    },
    {
      avatar: "🏗️", repo: "devstudio / auth-service",
      desc: "📝 AutoDocs: SCHEMA_CHANGE — docs/database.md updated",
      tag: "SCHEMA_CHANGE", tagClass: "tag-schema",
      conf: "High", confClass: "conf-high", confFill: "filled-high", pips: 3,
      time: "23m ago",
    },
    {
      avatar: "⚗️", repo: "quant-labs / ml-infra",
      desc: "⏩ Skipped — refactor only, no doc impact detected",
      tag: "REFACTOR", tagClass: "tag-refactor",
      conf: null, time: "41m ago",
    },
    {
      avatar: "🌊", repo: "wavenet / realtime-sdk",
      desc: "📝 AutoDocs: DEPENDENCY_UPDATE — docs/changelog.md updated",
      tag: "DEPS_UPDATE", tagClass: "tag-deps",
      conf: "Low · Review flagged", confClass: "conf-low", confFill: "filled-low", pips: 1,
      time: "1h ago",
    },
  ];

  const miniStats = [
    { val: "1,284", label: "PRs opened this week" },
    { val: "94%",   label: "High confidence rate" },
    { val: "~58s",  label: "Median push → PR" },
    { val: "312",   label: "Repos monitored" },
  ];

  const breakdown = [
    { label: "New routes",  pct: 71, color: "#79b8ff" },
    { label: "Env changes", pct: 52, color: "#f0b87a" },
    { label: "Schema",      pct: 38, color: "#c084fc" },
    { label: "Deps",        pct: 24, color: "#fb7185" },
    { label: "Refactors",   pct: 15, color: "#4ade80" },
  ];

  return (
    <>
      <style>{`
        .la-section { padding: 6rem 4rem; border-top: 1px solid var(--border); }
        .la-inner { max-width: 1200px; margin: 0 auto; }
        .la-label { font-family: var(--mono); font-size: 0.72rem; color: var(--purple); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 1rem; }
        .la-heading { font-family: var(--display); font-weight: 700; font-size: clamp(2rem,4vw,3rem); letter-spacing: -.02em; line-height: 1.15; }
        .la-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; margin-top: 3rem; }
        @media(max-width:960px){ .la-layout { grid-template-columns: 1fr; } }
        @media(max-width:768px){ .la-section { padding: 4rem 1.5rem; } }

        /* Feed */
        .la-feed { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; background: var(--surface); }
        .la-feed-header { display: flex; align-items: center; justify-content: space-between; padding: .9rem 1.2rem; border-bottom: 1px solid var(--border); background: var(--bg2); }
        .la-feed-title { display: flex; align-items: center; gap: .5rem; font-family: var(--mono); font-size: .72rem; color: var(--muted); }
        .la-live-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; animation: laPulse 1.8s infinite; }
        @keyframes laPulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(74,222,128,.4)} 50%{opacity:.6;box-shadow:0 0 0 4px rgba(74,222,128,0)} }
        .la-count { font-family: var(--mono); font-size: .65rem; color: var(--muted); background: var(--bg); border: 1px solid var(--border); border-radius: 100px; padding: .15rem .6rem; }

        .la-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.2rem; border-bottom: 1px solid var(--border); transition: background .2s; animation: laSlide .4s ease both; }
        .la-item:last-child { border-bottom: none; }
        .la-item:hover { background: rgba(155,109,255,.04); }
        @keyframes laSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }

        .la-avatar { width: 32px; height: 32px; border-radius: 8px; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: .85rem; flex-shrink: 0; }
        .la-body { flex: 1; min-width: 0; }
        .la-repo { font-family: var(--mono); font-size: .72rem; color: var(--purple); margin-bottom: .2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .la-desc { font-size: .8rem; color: var(--white); margin-bottom: .3rem; line-height: 1.4; }
        .la-meta { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
        .la-time { font-family: var(--mono); font-size: .62rem; color: var(--muted); margin-left: auto; white-space: nowrap; }

        .la-tag { font-family: var(--mono); font-size: .62rem; padding: .15rem .5rem; border-radius: 4px; border: 1px solid; }
        .tag-new-route { color:#79b8ff; border-color:rgba(121,184,255,.25); background:rgba(121,184,255,.06); }
        .tag-env       { color:#f0b87a; border-color:rgba(240,184,122,.25); background:rgba(240,184,122,.06); }
        .tag-schema    { color:#c084fc; border-color:rgba(192,132,252,.25); background:rgba(192,132,252,.06); }
        .tag-refactor  { color:#69d2a0; border-color:rgba(105,210,160,.25); background:rgba(105,210,160,.06); }
        .tag-deps      { color:#fb7185; border-color:rgba(251,113,133,.25); background:rgba(251,113,133,.06); }

        .la-conf { display: flex; align-items: center; gap: .25rem; font-family: var(--mono); font-size: .62rem; }
        .conf-high { color: #4ade80; } .conf-med { color: #f0b87a; } .conf-low { color: #fb7185; }
        .la-pips { display: flex; gap: 2px; }
        .la-pip { width: 14px; height: 3px; border-radius: 2px; background: var(--border); }
        .filled-high { background: #4ade80; } .filled-med { background: #f0b87a; } .filled-low { background: #fb7185; }

        /* Stats panel */
        .la-stats-panel { display: flex; flex-direction: column; gap: 1.5rem; }
        .la-mini-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .la-mini { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1.2rem 1.4rem; transition: border-color .2s; }
        .la-mini:hover { border-color: var(--purple-dim); }
        .la-mini-val { font-family: var(--display); font-weight: 800; font-size: 2rem; color: var(--purple); line-height: 1; }
        .la-mini-label { font-size: .78rem; color: var(--muted); margin-top: .3rem; }

        .la-breakdown { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1.4rem; }
        .la-breakdown-title { font-family: var(--mono); font-size: .68rem; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 1.1rem; }
        .la-brow { display: flex; align-items: center; gap: .8rem; margin-bottom: .75rem; }
        .la-brow:last-child { margin-bottom: 0; }
        .la-blabel { font-family: var(--mono); font-size: .7rem; color: var(--muted); width: 90px; flex-shrink: 0; }
        .la-btrack { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .breakdown-fill { height: 100%; border-radius: 2px; width: 0; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .la-bpct { font-family: var(--mono); font-size: .68rem; color: var(--muted); width: 30px; text-align: right; }
      `}</style>

      <section className="la-section">
        <div className="la-inner">
          <p className="la-label">Live activity</p>
          <h2 className="la-heading">Docs PRs, opening<br />right now.</h2>

          <div className="la-layout">
            {/* Feed */}
            <div className="la-feed">
              <div className="la-feed-header">
                <div className="la-feed-title">
                  <div className="la-live-dot" />
                  autodocs / event-stream
                </div>
                <span className="la-count">12 today</span>
              </div>

              {events.map((e, i) => (
                <div className="la-item" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="la-avatar">{e.avatar}</div>
                  <div className="la-body">
                    <div className="la-repo">{e.repo}</div>
                    <div className="la-desc">{e.desc}</div>
                    <div className="la-meta">
                      <span className={`la-tag ${e.tagClass}`}>{e.tag}</span>
                      {e.conf && (
                        <div className={`la-conf ${e.confClass}`}>
                          <div className="la-pips">
                            {[...Array(3)].map((_, p) => (
                              <div key={p} className={`la-pip ${p < e.pips ? e.confFill : ""}`} />
                            ))}
                          </div>
                          {e.conf}
                        </div>
                      )}
                      {!e.conf && (
                        <span style={{ fontFamily: "var(--mono)", fontSize: ".62rem", color: "var(--muted)" }}>
                          00 files updated

                        </span>
                      )}
                      <span className="la-time">{e.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats panel */}
            <div className="la-stats-panel">
              <div className="la-mini-row">
                {miniStats.map((s, i) => (
                  <div className="la-mini" key={i}>
                    <div className="la-mini-val">{s.val}</div>
                    <div className="la-mini-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="la-breakdown" ref={breakdownRef}>
                <div className="la-breakdown-title">Change type breakdown</div>
                {breakdown.map((b, i) => (
                  <div className="la-brow" key={i}>
                    <span className="la-blabel">{b.label}</span>
                    <div className="la-btrack">
                      <div
                        className="breakdown-fill"
                        data-fill={`${b.pct}%`}
                        style={{ background: b.color }}
                      />
                    </div>
                    <span className="la-bpct">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}