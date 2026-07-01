import { useEffect, useRef, useState } from 'react';

const WORDS = ['MERN Stack Developer', 'React Specialist', 'Full Stack Engineer', 'API Architect', 'UI/UX Enthusiast'];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const delay = isDeleting ? speed / 2 : speed;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx(i => i + 1);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
}

function Particles({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    const particles = Array.from({ length: count }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      r:   Math.random() * 2 + 0.5,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      a:   Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 167, 217, ${p.a})`;
        ctx.fill();
      });

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74, 111, 165, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [canvasRef]);

  return null;
}

export default function Hero() {
  const canvasRef   = useRef(null);
  const typedText   = useTypewriter(WORDS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 5% 60px;
          overflow: hidden;
          background: linear-gradient(135deg, #060d1a 0%, #0F1F3D 40%, #1a2d50 70%, #0d1b35 100%);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .hero-orb-1 {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(74,111,165,0.25) 0%, transparent 70%);
          top: -100px; right: -100px;
          border-radius: 50%;
          animation: orbFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-orb-2 {
          position: absolute;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(44,74,124,0.2) 0%, transparent 70%);
          bottom: 50px; left: -80px;
          border-radius: 50%;
          animation: orbFloat 10s ease-in-out infinite reverse;
          pointer-events: none;
        }
        @keyframes orbFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-30px) scale(1.05); }
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 60px;
          align-items: center;
        }
        .hero-content { }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(74,111,165,0.15);
          border: 1px solid rgba(74,111,165,0.4);
          border-radius: 999px;
          padding: 8px 18px;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #7BA7D9;
          letter-spacing: 1px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease;
        }
        .hero-badge.visible { opacity: 1; transform: translateY(0); }
        .hero-badge-dot {
          width: 7px; height: 7px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-greeting {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease;
          color: #F5F0E8;
        }
        .hero-greeting.visible { opacity: 1; transform: translateY(0); }
        .hero-name {
          background: linear-gradient(135deg, #F5F0E8 0%, #A8C8F0 50%, #7BA7D9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-typewriter-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s 0.35s ease, transform 0.7s 0.35s ease;
        }
        .hero-typewriter-wrap.visible { opacity: 1; transform: translateY(0); }
        .hero-typewriter-label {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #8BA3C0;
          font-weight: 500;
        }
        .hero-typewriter {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 700;
          color: #7BA7D9;
          min-width: 280px;
        }
        .cursor-blink {
          display: inline-block;
          width: 3px;
          background: #7BA7D9;
          animation: blink 0.8s step-end infinite;
          margin-left: 2px;
          height: 1.2em;
          vertical-align: text-bottom;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        .hero-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #8BA3C0;
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s 0.45s ease, transform 0.7s 0.45s ease;
        }
        .hero-desc.visible { opacity: 1; transform: translateY(0); }
        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s 0.55s ease, transform 0.7s 0.55s ease;
        }
        .hero-btns.visible { opacity: 1; transform: translateY(0); }
        .hero-stats {
          display: flex;
          gap: 36px;
          margin-top: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s 0.65s ease, transform 0.7s 0.65s ease;
        }
        .hero-stats.visible { opacity: 1; transform: translateY(0); }
        .stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7BA7D9, #A8C8F0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: #8BA3C0;
          font-weight: 500;
          margin-top: 4px;
        }
        .stat-div { width: 1px; background: rgba(74,111,165,0.3); }
        /* Photo */
        .hero-photo-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s 0.4s ease, transform 0.8s 0.4s ease;
        }
        .hero-photo-wrap.visible { opacity: 1; transform: translateX(0); }
        .hero-photo-ring {
          position: relative;
          width: 340px; height: 420px;
        }
        .hero-photo-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 32px;
          background: linear-gradient(135deg, #4A6FA5, #7BA7D9, #4A6FA5);
          animation: rotateBorder 6s linear infinite;
          z-index: 0;
        }
        .hero-photo-ring::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 38px;
          background: radial-gradient(ellipse, rgba(74,111,165,0.3) 0%, transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes rotateBorder {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        .hero-photo {
          position: relative;
          z-index: 1;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 28px;
          border: 3px solid rgba(15,31,61,0.5);
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
        }
        .hero-photo-badge {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10,20,40,0.9);
          border: 1px solid rgba(74,111,165,0.5);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          z-index: 2;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .badge-icon { font-size: 1.4rem; }
        .badge-text { font-size: 0.82rem; font-weight: 600; color: #F5F0E8; }
        .badge-sub  { font-size: 0.72rem; color: #8BA3C0; }
        /* Social sidebar */
        .hero-socials {
          position: absolute;
          left: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 18px;
          z-index: 2;
        }
        .hero-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(74,111,165,0.3);
          background: rgba(15,31,61,0.5);
          backdrop-filter: blur(8px);
          color: #8BA3C0;
          font-size: 1rem;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .hero-social-link:hover {
          border-color: #7BA7D9;
          color: #7BA7D9;
          background: rgba(74,111,165,0.2);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(74,111,165,0.4);
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hero-photo-wrap { margin: 0 auto; }
          .hero-photo-ring { width: 250px; height: 310px; }
          .hero-desc { margin: 0 auto 36px; }
          .hero-btns { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-typewriter-wrap { justify-content: center; }
          .hero-socials { display: none; }
        }
      `}</style>

      <section className="hero" id="home">
        <canvas className="hero-canvas" ref={canvasRef} id="particles-canvas" />
        <Particles canvasRef={canvasRef} />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        {/* Social Sidebar */}
        <div className="hero-socials">
          <a href="https://github.com/SiddCode" target="_blank" rel="noreferrer" className="hero-social-link" title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/siddharthan-k-315baa252/" target="_blank" rel="noreferrer" className="hero-social-link" title="LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.instagram.com/sidd_6_10/" target="_blank" rel="noreferrer" className="hero-social-link" title="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="mailto:siddharthank45@gmail.com" className="hero-social-link" title="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
          </a>
        </div>

        <div className="hero-inner">
          <div className="hero-content">
            <div className={`hero-badge ${visible ? 'visible' : ''}`}>
              <div className="hero-badge-dot" />
              Available for Freelance Work
            </div>

            <h1 className={`hero-greeting ${visible ? 'visible' : ''}`}>
              Hi, I'm{' '}
              <span className="hero-name">Siddharthan K</span>
            </h1>

            <div className={`hero-typewriter-wrap ${visible ? 'visible' : ''}`}>
              <span className="hero-typewriter-label">I'm a</span>
              <span className="hero-typewriter">
                {typedText}
                <span className="cursor-blink" />
              </span>
            </div>

            <p className={`hero-desc ${visible ? 'visible' : ''}`}>
              Passionate about building <strong style={{color:'#A8C8F0'}}>scalable, responsive, and user-friendly</strong> web applications.
              Turning ideas into powerful digital experiences with clean, efficient code.
            </p>

            <div className={`hero-btns ${visible ? 'visible' : ''}`}>
              <button className="btn btn-primary" onClick={scrollToContact}>
                Let's Work Together →
              </button>
              <button className="btn btn-outline" onClick={scrollToAbout}>
                Explore My Work
              </button>
              <a href="/Siddharthan_K_Resume.pdf" download="Siddharthan_K_Resume.pdf" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                📄 Download Resume
              </a>
            </div>

            <div className={`hero-stats ${visible ? 'visible' : ''}`}>
              <div>
                <div className="stat-num">2+</div>
                <div className="stat-label">Years Coding</div>
              </div>
              <div className="stat-div" />
              <div>
                <div className="stat-num">10+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-div" />
              <div>
                <div className="stat-num">5+</div>
                <div className="stat-label">Tech Stack</div>
              </div>
            </div>
          </div>

          <div className={`hero-photo-wrap ${visible ? 'visible' : ''}`}>
            <div className="hero-photo-ring">
              <img
                src="/assets/profile.jpg"
                alt="Siddharthan K — MERN Stack Developer"
                className="hero-photo"
                onError={e => { e.target.src = 'https://via.placeholder.com/340x420/1E3A5F/7BA7D9?text=SK'; }}
              />
            </div>
            <div className="hero-photo-badge">
              <span className="badge-icon"></span>
              <div>
                <div className="badge-text" style={{ alignItems: 'center' }}>MERN Stack</div>
                <div className="badge-sub" style={{ alignItems: 'center' }}>Full Stack Developer</div>
              </div>
            </div>
          </div>
        </div>


      </section>
    </>
  );
}
