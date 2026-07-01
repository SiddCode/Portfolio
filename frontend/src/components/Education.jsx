import { useEffect, useRef, useState } from 'react';

export default function Education() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .edu-section { padding: var(--section-pad); background: rgba(8,16,32,0.5); position: relative; overflow: hidden; }
        .edu-inner { max-width: 900px; margin: 0 auto; }
        .edu-card-wrap {
          margin-top: 60px;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .edu-card-wrap.visible { opacity: 1; transform: translateY(0); }
        .edu-main-card {
          background: linear-gradient(135deg, rgba(30,58,95,0.8), rgba(74,111,165,0.2));
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(74,111,165,0.4);
          border-radius: 24px; padding: 40px;
          display: grid; grid-template-columns: auto 1fr;
          gap: 36px; align-items: center;
          position: relative; overflow: hidden;
          transition: all 0.4s ease;
        }
        .edu-main-card:hover {
          border-color: rgba(123,167,217,0.6);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(74,111,165,0.2);
          transform: translateY(-5px);
        }
        .edu-main-card::before {
          content: '🎓';
          position: absolute; right: 40px; top: 50%;
          transform: translateY(-50%);
          font-size: 8rem; opacity: 0.05; pointer-events: none;
          filter: blur(2px);
        }
        .edu-icon-wrap {
          width: 90px; height: 90px; border-radius: 22px;
          background: linear-gradient(135deg, rgba(74,111,165,0.4), rgba(123,167,217,0.2));
          border: 2px solid rgba(74,111,165,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.8rem;
          box-shadow: 0 0 30px rgba(74,111,165,0.3), inset 0 0 20px rgba(74,111,165,0.1);
          animation: eduIconPulse 4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes eduIconPulse {
          0%,100% { box-shadow: 0 0 30px rgba(74,111,165,0.3), inset 0 0 20px rgba(74,111,165,0.1); }
          50% { box-shadow: 0 0 50px rgba(74,111,165,0.5), inset 0 0 30px rgba(74,111,165,0.2); }
        }
        .edu-info { position: relative; z-index: 1; }
        .edu-degree {
          font-family: 'Outfit', sans-serif; font-size: clamp(1.3rem, 3vw, 1.7rem); font-weight: 800;
          background: linear-gradient(135deg, #F5F0E8, #A8C8F0);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 6px;
        }
        .edu-short { font-size: 0.88rem; color: #7BA7D9; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; }
        .edu-institution {
          font-size: 1.05rem; font-weight: 600; color: #EDE5D8; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .edu-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        .edu-badge {
          padding: 6px 16px; border-radius: 999px; font-size: 0.82rem; font-weight: 700;
          display: flex; align-items: center; gap: 6px;
        }
        .edu-badge-period {
          background: rgba(74,111,165,0.25); border: 1px solid rgba(74,111,165,0.45);
          color: #A8C8F0;
        }
        .edu-badge-status {
          background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4);
          color: #22c55e;
        }
        /* Mini courses grid */
        .edu-extras {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 24px;
        }
        .edu-extra-card {
          background: rgba(15,31,61,0.6);
          border: 1px solid rgba(74,111,165,0.2);
          border-radius: 14px; padding: 18px;
          text-align: center; transition: all 0.3s ease;
        }
        .edu-extra-card:hover {
          border-color: rgba(74,111,165,0.45);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .edu-extra-icon { font-size: 1.8rem; margin-bottom: 8px; }
        .edu-extra-title { font-size: 0.85rem; font-weight: 700; color: #F5F0E8; margin-bottom: 4px; }
        .edu-extra-sub { font-size: 0.74rem; color: #8BA3C0; }
        @media (max-width: 600px) {
          .edu-main-card { grid-template-columns: 1fr; text-align: center; }
          .edu-icon-wrap { margin: 0 auto; }
          .edu-institution { justify-content: center; }
          .edu-badges { justify-content: center; }
          .edu-extras { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="edu-section section" id="education" ref={sectionRef}>
        <div className="edu-inner">
          <div className="section-header">
            <div className="section-tag">✦ My Background</div>
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">Academic foundation that fuels my passion for technology and innovation</p>
            <div className="divider" />
          </div>

          <div className={`edu-card-wrap ${visible ? 'visible' : ''}`}>
            <div className="edu-main-card">
              <div className="edu-icon-wrap"></div>
              <div className="edu-info">
                <div className="edu-degree">Bachelor of Engineering</div>
                <div className="edu-short">B.E. — Electrical & Electronics Engineering (EEE)</div>
                <div className="edu-institution">
                  <span></span>
                  Saranathan College of Engineering, Trichy
                </div>
                <div className="edu-badges">
                  <span className="edu-badge edu-badge-period">2022 – 2026</span>
                  <span className="edu-badge edu-badge-status">Currently Pursuing</span>
                </div>
              </div>
            </div>

            <div className="edu-extras">
              {[
                { icon: '', title: 'Electronics & Circuits', sub: 'Core EEE Coursework' },
                { icon: '', title: 'Web Development', sub: 'Self-Taught + Projects' },
                { icon: '', title: 'Database Systems', sub: 'MongoDB & SQL' },
                { icon: '', title: 'Embedded Systems', sub: 'Microcontrollers' },
                { icon: '', title: 'System Design', sub: 'Architecture & APIs' },
                { icon: '', title: 'Cloud Deployment', sub: 'Vercel & Render' },
              ].map((item) => (
                <div key={item.title} className="edu-extra-card">
                  <div className="edu-extra-icon">{item.icon}</div>
                  <div className="edu-extra-title">{item.title}</div>
                  <div className="edu-extra-sub">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
