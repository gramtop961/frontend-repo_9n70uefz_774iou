import { useEffect, useRef } from 'react';
import { Youtube, Twitter, Instagram, Mail, Copy } from 'lucide-react';

export default function SocialOrbit({ hidden }) {
  const ringRef = useRef(null);

  useEffect(() => {
    let raf;
    let a = 0;
    const el = ringRef.current;
    const animate = () => {
      a += 0.004;
      if (el) el.style.transform = `rotate(${a}rad)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText('litecor');
      alert('Discord handle copied: litecor');
    } catch (e) {
      console.error(e);
    }
  };

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-30 select-none">
      <div className="relative h-40 w-40">
        <div ref={ringRef} className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full">
          <a
            href="#" onClick={(e)=>{e.preventDefault(); copyDiscord();}}
            className="pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-white/10 p-3 text-white/90 backdrop-blur hover:bg-white/20"
            aria-label="Copy Discord"
            title="Copy Discord: litecor"
          >
            <Copy size={18} />
          </a>
          <a
            href="https://youtube.com/@litecor" target="_blank" rel="noreferrer"
            className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/90 backdrop-blur hover:bg-white/20"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>
          <a
            href="https://x.com/litecor" target="_blank" rel="noreferrer"
            className="pointer-events-auto absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-white/10 p-3 text-white/90 backdrop-blur hover:bg-white/20"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://instagram.com/litecor" target="_blank" rel="noreferrer"
            className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/90 backdrop-blur hover:bg-white/20"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
        <a
          href="mailto:litecorclips@gmail.com"
          className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 p-4 text-slate-900 shadow-xl"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>
    </div>
  );
}
