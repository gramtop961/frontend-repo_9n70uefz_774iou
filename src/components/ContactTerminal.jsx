import { useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function ContactTerminal() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Editing');
  const sfxRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xvgpgvne', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setStatus('sent');
        sfxRef.current?.play();
        setMessage('');
        setName('');
        setEmail('');
        setType('Editing');
      } else {
        setStatus('error');
      }
    } catch (_) {
      setStatus('error');
    }
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pb-24">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-black/70 p-6 text-white shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center gap-2 text-sm text-white/80">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">ONLINE</span>
          <span>Holographic Console</span>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-wider text-white/60">Name</label>
            <input name="name" value={name} onChange={(e)=>setName(e.target.value)} required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40" placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-wider text-white/60">Email</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40" placeholder="you@email.com" />
          </div>
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-wider text-white/60">Project Type</label>
            <select name="project_type" value={type} onChange={(e)=>setType(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none">
              <option>Editing</option>
              <option>Color Grading</option>
              <option>Short Form</option>
              <option>VFX</option>
            </select>
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-white/60">Message</label>
            <textarea name="message" value={message} onChange={(e)=>setMessage(e.target.value)} required rows={5} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40" placeholder="Tell me about your project…" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-white/70">
              <Sparkles size={14} className="text-amber-300" />
              {status === 'sent' ? 'Message Sent! Check your inbox for confirmation.' : 'Responses usually within 24 hours.'}
            </div>
            <button disabled={status==='sending'} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-2 font-medium text-slate-900 shadow-lg disabled:opacity-60">
              <Send size={16} /> {status==='sending' ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      <audio ref={sfxRef} className="hidden">
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_4b3b9a1b01.mp3?filename=correct-2-46134.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
}
