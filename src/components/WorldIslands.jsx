import { useEffect, useMemo, useRef, useState } from 'react';
import { MonitorPlay, Info, Terminal, Sparkles, Film, PenTool } from 'lucide-react';

function FloatingCard({ title, subtitle, icon: Icon, children, id }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-16">
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur-md transition-transform will-change-transform hover:translate-y-[-2px]">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-400/80 to-violet-400/80 p-2 text-slate-900"><Icon size={18} /></div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-xs text-white/70">{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function WorldIslands({ onVisitedChange }) {
  const containerRef = useRef(null);
  const [visited, setVisited] = useState({ edit: false, about: false, contact: false });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('id');
            if (id && !visited[id]) {
              setVisited((v) => ({ ...v, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.45 }
    );
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll('section[id]').forEach((sec) => io.observe(sec));
    return () => io.disconnect();
  }, [visited]);

  useEffect(() => {
    const count = Object.values(visited).filter(Boolean).length;
    const pct = Math.round((count / 3) * 100);
    onVisitedChange?.(pct);
  }, [visited, onVisitedChange]);

  const collectibles = useMemo(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      t: 4000 + Math.random() * 4000,
    }))
  ), []);

  const [popCount, setPopCount] = useState(0);

  return (
    <div ref={containerRef} className="relative z-0 w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12">
      {/* Progress */}
      <div className="sticky top-0 z-20 mx-auto mb-6 w-full max-w-6xl px-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-white/70">Exploration Progress</span>
            <span className="text-xs text-white/90">{Object.values(visited).filter(Boolean).length}/3 islands</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded bg-white/10">
            <div
              className="h-full rounded bg-gradient-to-r from-cyan-400 to-violet-400 transition-[width]"
              style={{ width: `${Math.round((Object.values(visited).filter(Boolean).length / 3) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Floating Collectibles */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {collectibles.map((c) => (
          <div
            key={c.id}
            className="pointer-events-auto absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-pink-400 text-slate-900 shadow-lg"
            style={{ left: `${c.x}%`, top: `${c.y}%`, animation: `floaty ${c.t}ms ease-in-out infinite alternate` }}
            onClick={() => setPopCount((n) => n + 1)}
          >
            <Sparkles size={14} />
          </div>
        ))}
      </div>

      {/* Edit Island */}
      <FloatingCard id="edit" title="Edit Island" subtitle="Portfolio Previews" icon={MonitorPlay}>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <video
                className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                src={`https://cdn.coverr.co/videos/coverr-aerial-view-of-a-city-at-night-2697/1080p.mp4`}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
                Hover to unmute • Click to expand
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>

      {/* About Island */}
      <FloatingCard id="about" title="Skyline Island" subtitle="About + Creative Values" icon={Info}>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Cinematic Cuts', icon: Film },
            { label: 'Story Flow', icon: Info },
            { label: 'Creative Sync', icon: PenTool },
          ].map(({ label, icon: I }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-white/90">
              <div className="rounded-lg bg-gradient-to-br from-cyan-400/80 to-violet-400/80 p-2 text-slate-900"><I size={18} /></div>
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-xs text-white/70">Hover to reveal a tip</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/70">
          Floating statues whisper design notes as you explore. Move closer to reveal hidden highlights.
        </p>
      </FloatingCard>

      {/* Contact Island (terminal themed) */}
      <FloatingCard id="contact" title="Terminal Island" subtitle="Send a message" icon={Terminal}>
        <p className="text-sm text-white/80">Jump to the console below to type in your message. Sparks appear on success!</p>
      </FloatingCard>

      {/* Pop counter */}
      <div className="mx-auto mt-4 w-full max-w-6xl px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Sparkles size={14} className="text-amber-300" /> {popCount} collectibles activated
        </div>
      </div>

      <style>{`
        @keyframes floaty { from { transform: translate(-50%, -50%) translateY(-6px) } to { transform: translate(-50%, -50%) translateY(6px) }}
      `}</style>
    </div>
  );
}
