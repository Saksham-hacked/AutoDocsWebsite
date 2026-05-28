import { useEffect, useRef } from "react";

export default function LiveActivity() {
  const breakdownRef = useRef(null);
  const sparkRef = useRef(null);

  const sparkData = [2,4,3,7,6,9,8,12,10,14,11,16,13,9,10,12,8,7,11,9,14,16,12];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          breakdownRef.current?.querySelectorAll(".br-fill").forEach((el) => {
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
      num: "01",
      repo: "acme-corp / api-gateway",
      desc: "AutoDocs: NEW_API_ROUTE — docs/api.md updated",
      tag: "NEW_ROUTE", tagClass: "t-new",
      conf: "High", confClass: "c-hi", pipClass: "pi-hi", pips: 3,
      time: "2m ago", statusClass: "sd-ok",
    },
    {
      num: "02",
      repo: "biofast / pipeline-core",
      desc: "AutoDocs: ENV_CHANGE — docs/config.md updated",
      tag: "ENV_CHANGE", tagClass: "t-env",
      conf: "Medium", confClass: "c-md", pipClass: "pi-md", pips: 2,
      time: "9m ago", statusClass: "sd-ok",
    },
    {
      num: "03",
      repo: "devstudio / auth-service",
      desc: "AutoDocs: SCHEMA_CHANGE — docs/database.md updated",
      tag: "SCHEMA_CHANGE", tagClass: "t-schema",
      conf: "High", confClass: "c-hi", pipClass: "pi-hi", pips: 3,
      time: "23m ago", statusClass: "sd-ok",
    },
    {
      num: "04",
      repo: "quant-labs / ml-infra",
      desc: "Skipped — refactor only, no doc impact detected",
      tag: "REFACTOR", tagClass: "t-refactor",
      conf: null, time: "41m ago", statusClass: "sd-skip",
    },
    {
      num: "05",
      repo: "wavenet / realtime-sdk",
      desc: "AutoDocs: DEPENDENCY_UPDATE — docs/changelog.md updated",
      tag: "DEPS_UPDATE", tagClass: "t-deps",
      conf: "Low · review", confClass: "c-lo", pipClass: "pi-lo", pips: 1,
      time: "1h ago", statusClass: "sd-warn",
    },
  ];

  const metrics = [
    { val: "1,284", label: "PRs this week" },
    { val: "94%",   label: "High confidence" },
    { val: "~58s",  label: "Median push → PR" },
    { val: "312",   label: "Repos monitored" },
  ];

  const breakdown = [
    { label: "New routes",  pct: 71, color: "#79b8ff" },
    { label: "Env changes", pct: 52, color: "#f0b87a" },
    { label: "Schema",      pct: 38, color: "#c084fc" },
    { label: "Deps",        pct: 24, color: "#ff6b82" },
    { label: "Refactors",   pct: 15, color: "#3fd98a" },
  ];

  const syslog = [
    { time: "14:22", icon: "ok",   msg: "webhook received" },
    { time: "14:21", icon: "ok",   msg: "PR #8821 merged" },
    { time: "14:19", icon: "skip", msg: "refactor skip" },
    { time: "14:17", icon: "ok",   msg: "diff classified" },
    { time: "14:12", icon: "warn", msg: "low conf flagged" },
    { time: "14:08", icon: "ok",   msg: "PR #8820 merged" },
  ];

  const maxSpark = Math.max(...sparkData);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

        .la-wrap {
          font-family: 'JetBrains Mono', monospace;
          background: #0d0e11;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          color: #e8e9ef;
          max-width: 900px;
          margin: 0 auto;
        }

        /* TOP BAR */
        .la-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #141519;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .la-tb-left { display: flex; align-items: center; gap: 10px; }
        .la-dots { display: flex; gap: 5px; }
        .la-dot { width: 9px; height: 9px; border-radius: 50%; }
        .la-d1 { background: #ff5f57; }
        .la-d2 { background: #febc2e; }
        .la-d3 { background: #2ac940; }
        .la-tb-label { font-size: 11px; color: #6b6e7f; letter-spacing: .1em; }
        .la-tb-right { display: flex; align-items: center; gap: 12px; }
        .la-live-badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: #3fd98a;
          background: rgba(63,217,138,.08);
          border: 1px solid rgba(63,217,138,.18);
          border-radius: 20px; padding: 3px 10px;
        }
        .la-pulse {
          width: 6px; height: 6px; border-radius: 50%; background: #3fd98a;
          animation: laPulse 1.6s infinite;
        }
        @keyframes laPulse {
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(63,217,138,.4)}
          60%{opacity:.5;box-shadow:0 0 0 5px rgba(63,217,138,0)}
        }
        .la-tb-stat { font-size: 11px; color: #6b6e7f; }
        .la-tb-stat span { color: #9d7bff; }

        /* METRICS STRIP */
        .la-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .la-metric {
          padding: 16px 20px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .la-metric:last-child { border-right: none; }
        .la-m-val {
          font-size: 22px; font-weight: 700; color: #9d7bff;
          letter-spacing: -.03em; line-height: 1;
        }
        .la-m-label {
          font-size: 10px; color: #6b6e7f;
          margin-top: 4px; letter-spacing: .06em; text-transform: uppercase;
        }

        /* BODY */
        .la-body {
          display: grid;
          grid-template-columns: 1fr 260px;
        }
        @media(max-width: 680px) { .la-body { grid-template-columns: 1fr; } }

        /* FEED */
        .la-feed { border-right: 1px solid rgba(255,255,255,0.07); }
        .la-feed-hdr {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #141519;
        }
        .la-feed-title { font-size: 10px; color: #6b6e7f; letter-spacing: .1em; text-transform: uppercase; }
        .la-feed-count {
          font-size: 10px; color: #9d7bff;
          background: rgba(157,123,255,0.15);
          border-radius: 4px; padding: 2px 7px;
        }

        .la-event {
          display: grid;
          grid-template-columns: 28px 1fr 14px;
          gap: 0 12px;
          align-items: start;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: background .15s;
          animation: laFade .3s ease both;
        }
        .la-event:last-child { border-bottom: none; }
        .la-event:hover { background: rgba(157,123,255,.04); }
        @keyframes laFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .la-ev-num {
          font-size: 10px; color: #6b6e7f;
          padding-top: 2px; text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .la-ev-repo { font-size: 11px; color: #9d7bff; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .la-ev-desc { font-size: 12px; color: #e8e9ef; line-height: 1.5; margin-bottom: 6px; }
        .la-ev-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .la-ev-time { font-size: 10px; color: #6b6e7f; white-space: nowrap; }

        .la-tag { font-size: 10px; padding: 2px 6px; border-radius: 3px; border: 1px solid; letter-spacing: .04em; }
        .t-new    { color:#79b8ff; border-color:rgba(121,184,255,.22); background:rgba(121,184,255,.06); }
        .t-env    { color:#f0b87a; border-color:rgba(240,184,122,.22); background:rgba(240,184,122,.06); }
        .t-schema { color:#c084fc; border-color:rgba(192,132,252,.22); background:rgba(192,132,252,.06); }
        .t-refactor { color:#3fd98a; border-color:rgba(63,217,138,.22); background:rgba(63,217,138,.06); }
        .t-deps   { color:#ff6b82; border-color:rgba(255,107,130,.22); background:rgba(255,107,130,.06); }

        .la-conf { display: flex; align-items: center; gap: 4px; font-size: 10px; }
        .c-hi { color: #3fd98a; } .c-md { color: #f0b87a; } .c-lo { color: #ff6b82; }
        .la-pips { display: flex; gap: 2px; }
        .la-pip { width: 12px; height: 2px; border-radius: 1px; background: rgba(255,255,255,0.07); }
        .pi-hi { background: #3fd98a; } .pi-md { background: #f0b87a; } .pi-lo { background: #ff6b82; }

        .la-ev-status { padding-top: 2px; display: flex; justify-content: flex-end; }
        .la-status-dot { width: 6px; height: 6px; border-radius: 50%; }
        .sd-ok   { background: #3fd98a; box-shadow: 0 0 6px rgba(63,217,138,.5); }
        .sd-warn { background: #f0b87a; }
        .sd-skip { background: #6b6e7f; }

        /* SIDEBAR */
        .la-sidebar { display: flex; flex-direction: column; }
        .la-sb-section { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .la-sb-hdr {
          font-size: 10px; color: #6b6e7f;
          letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px;
        }

        /* Sparkline */
        .la-sparkbar { display: flex; align-items: flex-end; gap: 2px; height: 32px; }
        .la-sb-bar { flex: 1; border-radius: 2px 2px 0 0; background: rgba(157,123,255,0.15); }
        .la-sb-bar.active { background: #9d7bff; }

        /* Breakdown */
        .la-br-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .la-br-row:last-child { margin-bottom: 0; }
        .la-br-label { font-size: 10px; color: #6b6e7f; width: 76px; flex-shrink: 0; }
        .la-br-track { flex: 1; height: 3px; background: rgba(255,255,255,.07); border-radius: 2px; overflow: hidden; }
        .br-fill { height: 100%; border-radius: 2px; width: 0; transition: width 1.1s cubic-bezier(.4,0,.2,1); }
        .la-br-pct { font-size: 10px; color: #6b6e7f; width: 28px; text-align: right; }

        /* Syslog */
        .la-log-line { font-size: 10px; color: #6b6e7f; padding: 3px 0; display: flex; gap: 6px; line-height: 1.5; }
        .la-log-time { color: #9d7bff; flex-shrink: 0; }
        .la-log-ok   { color: #3fd98a; }
        .la-log-skip { color: #6b6e7f; }
        .la-log-warn { color: #f0b87a; }
      `}</style>

      <div className="la-wrap">

        {/* TOP BAR */}
        <div className="la-topbar">
          <div className="la-tb-left">
            <div className="la-dots">
              <div className="la-dot la-d1" />
              <div className="la-dot la-d2" />
              <div className="la-dot la-d3" />
            </div>
            <span className="la-tb-label">autodocs · event-stream · v2.4.1</span>
          </div>
          <div className="la-tb-right">
            <div className="la-live-badge">
              <div className="la-pulse" />
              LIVE
            </div>
            <span className="la-tb-stat">uptime <span>99.97%</span></span>
            <span className="la-tb-stat">latency <span>38ms</span></span>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="la-metrics">
          {metrics.map((m, i) => (
            <div className="la-metric" key={i}>
              <div className="la-m-val">{m.val}</div>
              <div className="la-m-label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="la-body">

          {/* FEED */}
          <div className="la-feed">
            <div className="la-feed-hdr">
              <span className="la-feed-title">Recent events</span>
              <span className="la-feed-count">12 today</span>
            </div>

            {events.map((e, i) => (
              <div className="la-event" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="la-ev-num">{e.num}</div>
                <div>
                  <div className="la-ev-repo">{e.repo}</div>
                  <div className="la-ev-desc">{e.desc}</div>
                  <div className="la-ev-footer">
                    <span className={`la-tag ${e.tagClass}`}>{e.tag}</span>
                    {e.conf ? (
                      <div className={`la-conf ${e.confClass}`}>
                        <div className="la-pips">
                          {[...Array(3)].map((_, p) => (
                            <div key={p} className={`la-pip ${p < e.pips ? e.pipClass : ""}`} />
                          ))}
                        </div>
                        {e.conf}
                      </div>
                    ) : (
                      <span style={{ fontSize: "10px", color: "#6b6e7f" }}>0 files updated</span>
                    )}
                    <span className="la-ev-time">{e.time}</span>
                  </div>
                </div>
                <div className="la-ev-status">
                  <div className={`la-status-dot ${e.statusClass}`} />
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <div className="la-sidebar">

            {/* Sparkline */}
            <div className="la-sb-section">
              <div className="la-sb-hdr">PRs / hour (today)</div>
              <div className="la-sparkbar" ref={sparkRef}>
                {sparkData.map((v, i) => (
                  <div
                    key={i}
                    className={`la-sb-bar${i === sparkData.length - 1 ? " active" : ""}`}
                    style={{ height: `${Math.round((v / maxSpark) * 100)}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Breakdown */}
            <div className="la-sb-section" ref={breakdownRef}>
              <div className="la-sb-hdr">Change type breakdown</div>
              {breakdown.map((b, i) => (
                <div className="la-br-row" key={i}>
                  <span className="la-br-label">{b.label}</span>
                  <div className="la-br-track">
                    <div
                      className="br-fill"
                      data-fill={`${b.pct}%`}
                      style={{ background: b.color }}
                    />
                  </div>
                  <span className="la-br-pct">{b.pct}%</span>
                </div>
              ))}
            </div>

            {/* Syslog */}
            <div className="la-sb-section">
              <div className="la-sb-hdr">System log</div>
              {syslog.map((l, i) => (
                <div className="la-log-line" key={i}>
                  <span className="la-log-time">{l.time}</span>
                  <span className={`la-log-${l.icon}`}>
                    {l.icon === "ok" ? "✓" : l.icon === "warn" ? "!" : "—"}
                  </span>
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}