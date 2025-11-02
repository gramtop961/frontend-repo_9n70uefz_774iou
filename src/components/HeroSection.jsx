import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Camera, Volume2, VolumeX } from 'lucide-react';

export default function HeroSection({ onStart, musicEnabled, setMusicEnabled, onScreenshotToggle, screenshotMode }) {
  const [booting, setBooting] = useState(true);
  const [avatarWave, setAvatarWave] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = musicEnabled ? 0.6 : 0;
  }, [musicEnabled]);

  const handleAvatarClick = () => {
    setAvatarWave(true);
    setTimeout(() => setAvatarWave(false), 600);
  };

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Cinematic gradient/atmosphere overlay (allow interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-transparent to-black/60" />

      {/* HUD */}
      {!screenshotMode && (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 text-white/90">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm tracking-wide">Litecor Creative World</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMusicEnabled((v) => !v)}
              className="group rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"
              aria-label={musicEnabled ? 'Mute music' : 'Unmute music'}
            >
              {musicEnabled ? (
                <div className="flex items-center gap-2 text-xs">
                  <Volume2 size={16} /> <span>Music On</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <VolumeX size={16} /> <span>Music Off</span>
                </div>
              )}
            </button>
            <button
              onClick={onScreenshotToggle}
              className={`rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs backdrop-blur hover:bg-white/20 ${screenshotMode ? 'ring-2 ring-rose-400/60' : ''}`}
            >
              <div className="flex items-center gap-2"><Camera size={16} /> {screenshotMode ? 'Exit Shot' : 'Screenshot'}</div>
            </button>
          </div>
        </div>
      )}

      {/* Center CTA and title */}
      {!screenshotMode && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="pointer-events-auto select-none bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text text-3xl font-semibold text-transparent md:text-5xl">
            Welcome to Litecor World
          </h1>
          <p className="pointer-events-auto mt-3 max-w-xl px-4 text-sm text-white/80 md:text-base">
            Explore floating islands, discover hidden collectibles, and play with delightful interactions.
          </p>
          <div className="pointer-events-auto mt-6 flex items-center gap-3">
            <button
              onClick={onStart}
              className="group flex items-center gap-2 rounded-full bg-cyan-400/90 px-5 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-cyan-500/30 backdrop-blur transition hover:bg-cyan-300"
            >
              <Rocket size={16} className="transition-transform group-hover:-translate-y-0.5" /> Start Journey
            </button>
            <button
              onClick={handleAvatarClick}
              className={`rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur transition ${avatarWave ? 'scale-105 ring-2 ring-emerald-400/50' : 'hover:bg-white/20'}`}
            >
              Say hi to Litecor
            </button>
          </div>
        </div>
      )}

      {/* Boot sequence */}
      {booting && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-black/80 text-white">
          <div className="text-center">
            <div className="mb-3 text-xs uppercase tracking-widest text-white/70">Booting up the Litecor Universe…</div>
            <div className="mx-auto h-1.5 w-60 overflow-hidden rounded bg-white/10">
              <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] bg-gradient-to-r from-cyan-400 to-violet-400" />
            </div>
          </div>
        </div>
      )}

      {/* Ambient Music */}
      <audio ref={audioRef} loop autoPlay className="hidden">
        <source src="https://cdn.pixabay.com/download/audio/2022/11/09/audio_1f6b0dbe47.mp3?filename=ambient-violin-125586.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
}
