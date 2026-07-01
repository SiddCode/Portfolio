import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const leftRef  = useReveal();
  const rightRef = useReveal();
  const statsRef = useReveal();

  return (
    <>
      <style>{`
        .about { padding: var(--section-pad); background: rgba(8,16,32,0.6); position: relative; overflow: hidden; }
        .about-orb {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(44,74,124,0.2) 0%, transparent 70%);
          top: -100px; left: -100px; border-radius: 50%; pointer-events: none;
        }
        .about-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
        }
        .about-left { }
        .about-tag {
          display: inline-block;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #7BA7D9; background: rgba(74,111,165,0.15);
          border: 1px solid rgba(74,111,165,0.3);
          padding: 6px 16px; border-radius: 999px; margin-bottom: 16px;
        }
        .about-title {
          font-family: 'Outfit', sans-serif; font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800; line-height: 1.2; margin-bottom: 24px;
        }
        .about-title span {
          background: linear-gradient(135deg, #F5F0E8, #7BA7D9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .about-text {
          font-family: 'Inter', sans-serif; font-size: 0.97rem; color: #8BA3C0;
          line-height: 1.85; margin-bottom: 16px;
        }
        .about-text strong { color: #A8C8F0; font-weight: 600; }
        .about-cta { margin-top: 28px; }
        /* Right side */
        .about-right { display: flex; flex-direction: column; gap: 20px; }
        /* Info cards */
        .about-info-card {
          background: rgba(15,31,61,0.7);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(74,111,165,0.25);
          border-radius: 18px; padding: 24px;
          transition: all 0.35s ease;
        }
        .about-info-card:hover {
          border-color: rgba(74,111,165,0.55);
          box-shadow: 0 0 24px rgba(74,111,165,0.25);
          transform: translateY(-3px);
        }
        .info-card-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
        }
        .info-card-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(74,111,165,0.2); border: 1px solid rgba(74,111,165,0.3);
          display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
        }
        .info-card-title {
          font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 700; color: #F5F0E8;
        }
        .info-card-sub { font-size: 0.82rem; color: #7BA7D9; margin-top: 2px; }
        .info-card-body { font-size: 0.9rem; color: #8BA3C0; line-height: 1.6; }
        /* Education card special */
        .edu-card {
          background: linear-gradient(135deg, rgba(44,74,124,0.3), rgba(74,111,165,0.15));
          border-color: rgba(74,111,165,0.4);
        }
        .edu-card .info-card-icon { background: rgba(74,111,165,0.3); }
        /* Stats */
        .about-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 4px;
        }
        .about-stat-card {
          background: rgba(15,31,61,0.7);
          border: 1px solid rgba(74,111,165,0.25);
          border-radius: 14px; padding: 20px 16px; text-align: center;
          transition: all 0.3s ease;
        }
        .about-stat-card:hover { border-color: rgba(74,111,165,0.5); transform: translateY(-3px); }
        .stat-value {
          font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 800;
          background: linear-gradient(135deg, #7BA7D9, #A8C8F0);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-lbl { font-size: 0.78rem; color: #8BA3C0; margin-top: 4px; font-weight: 500; }
        /* Skill chips */
        .about-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .about-chip {
          padding: 5px 13px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;
          background: rgba(74,111,165,0.15); border: 1px solid rgba(74,111,165,0.35); color: #A8C8F0;
        }
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; }
          .about-stats { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .about-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="about section" id="about">
        <div className="about-orb" />
        <div className="about-inner">
          {/* Left: Bio */}
          <div className="reveal-left" ref={leftRef}>
            <span className="about-tag">Who I Am</span>
            <h2 className="about-title">
              Crafting Digital<br />
              <span>Experiences That Matter</span>
            </h2>
            <p className="about-text">
              Hi, I'm <strong>Siddharthan K</strong>, a passionate MERN Stack Developer with a strong interest in creating modern, responsive,
              and user-friendly web applications. I enjoy turning ideas into functional digital solutions by combining clean design with efficient, scalable code.
            </p>
            <p className="about-text">
              My expertise includes <strong>HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB</strong>, enabling me to build
              complete full-stack applications from frontend interfaces to backend APIs and database management.
            </p>
            <p className="about-text">
              As a developer, I believe in <strong>continuous learning</strong> and staying up to date with the latest technologies.
              My goal is to contribute to innovative teams, build impactful products, and grow into a highly skilled full-stack software engineer.
            </p>

            <div className="about-chips">
              {['React.js','Node.js','Express.js','MongoDB','REST APIs','Responsive Design','Git'].map(s => (
                <span key={s} className="about-chip">{s}</span>
              ))}
            </div>

            <div className="about-cta">
              <a
                href="mailto:siddharthank45@gmail.com"
                className="btn btn-primary"
                style={{ marginRight: '14px' }}
              >
                📧 Hire Me
              </a>
              <a
                href="https://github.com/SiddCode"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                 GitHub
              </a>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="about-right reveal-right" ref={rightRef}>
            {/* Stats */}
            <div className="about-stats reveal" ref={statsRef}>
              {[
                { val: '2+',  lbl: 'Years Coding'    },
                { val: '10+', lbl: 'Projects'         },
                { val: '5+',  lbl: 'Technologies'     },
              ].map(s => (
                <div key={s.lbl} className="about-stat-card">
                  <div className="stat-value">{s.val}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="about-info-card edu-card">
              <div className="info-card-header">
                <div className="info-card-icon"></div>
                <div>
                  <div className="info-card-title">Education</div>
                  <div className="info-card-sub">Academic Background</div>
                </div>
              </div>
              <div className="info-card-body">
                <strong style={{color:'#A8C8F0',display:'block',marginBottom:'4px'}}>
                  B.E. Electrical & Electronics Engineering
                </strong>
                Saranathan College of Engineering<br />
                <span style={{color:'#7BA7D9',fontWeight:'600'}}>2022 – 2026</span>
              </div>
            </div>

            {/* Interests */}
            <div className="about-info-card">
              <div className="info-card-header">
                <div className="info-card-icon"></div>
                <div>
                  <div className="info-card-title">My Focus</div>
                  <div className="info-card-sub">Current Expertise</div>
                </div>
              </div>
              <div className="info-card-body">
                Full-Stack MERN development, REST API design, responsive UI/UX,
                authentication systems, and cloud deployment on Vercel, Render & MongoDB Atlas.
              </div>
            </div>

            {/* Location */}
            <div className="about-info-card">
              <div className="info-card-header">
                <div className="info-card-icon"></div>
                <div>
                  <div className="info-card-title">Location</div>
                  <div className="info-card-sub">Based In</div>
                </div>
              </div>
              <div className="info-card-body">
                Trichy, Tamil Nadu, India 🇮🇳<br />
                <span style={{color:'#22c55e',fontWeight:'600'}}>✓ Open to remote opportunities worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
