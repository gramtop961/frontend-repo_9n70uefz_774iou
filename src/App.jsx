import { useEffect, useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import WorldIslands from './components/WorldIslands';
import SocialOrbit from './components/SocialOrbit';
import ContactTerminal from './components/ContactTerminal';

function useDayNightCycle() {
  const [hue, setHue] = useState(220);
  useEffect(() => {
    let raf;
    let t = 0;
    const step = () => {
      t += 0.0025;
      const val = 200 + Math.sin(t) * 40; // 160..240
      setHue(val);
      raf = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, []);
  return hue;
}

export default function App() {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const worldRef = useRef(null);
  const hue = useDayNightCycle();

  const handleStart = () => {
    worldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full text-white" style={{ background: `linear-gradient(180deg, hsl(${hue} 50% 8%), #000)` }}>
      <HeroSection
        onStart={handleStart}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        onScreenshotToggle={() => setScreenshotMode((v) => !v)}
        screenshotMode={screenshotMode}
      />

      {/* World wrapper and progress display */}
      <div ref={worldRef}>
        {!screenshotMode && (
          <div className="sticky top-2 z-30 mx-auto w-full max-w-6xl px-4">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
              <span>Journey Progress</span>
              <span className="font-medium text-white/90">{progress}%</span>
            </div>
          </div>
        )}
        <WorldIslands onVisitedChange={setProgress} />
        <ContactTerminal />
      </div>

      {/* Orbiting social icons */}
      <SocialOrbit hidden={screenshotMode} />

      {/* Subtle vignette + starfield */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none fixed inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,.2), transparent), radial-gradient(1px 1px at 200px 120px, rgba(255,255,255,.12), transparent), radial-gradient(1px 1px at 340px 80px, rgba(255,255,255,.18), transparent), radial-gradient(1px 1px at 120px 220px, rgba(255,255,255,.14), transparent)' }} />

      {/* Global styles for small keyframes */}
      <style>{`
        @keyframes loading { 0% { transform: translateX(-66%) } 50% { transform: translateX(10%) } 100% { transform: translateX(110%) } }
      `}</style>
    </div>
  );
}
