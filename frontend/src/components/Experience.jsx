import { useEffect, useRef, useState } from 'react';

export default function Experience() {
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

  const experiences = [
    {
      role: 'MERN Stack Developer',
      company: 'Freelance / Self-Employed',
      period: '2026 – Present',
      type: 'Part-time',
      color: '#7BA7D9',
      desc: 'Designed and developed responsive websites using React, Node.js, Express, and MongoDB. Delivered complete full-stack applications with clean architecture and modern UI/UX.',
      highlights: [
        'Built SGS HR Workforce Solution — a full corporate consultancy platform',
        'Developed Sweet Tooth Trichy — a beautiful bakery e-commerce website',
        'Implemented RESTful APIs with Node.js + Express.js',
        'Managed MongoDB databases with Mongoose schemas & relations',
        'Deployed applications on Vercel, Render & MongoDB Atlas',
        'Integrated authentication systems and admin dashboards',
      ],
    },
  ];

  return (
    <>
      <style>{`
        .exp-section { padding: var(--section-pad); position: relative; overflow: hidden; }
        .exp-inner { max-width: 900px; margin: 0 auto; }
        .exp-timeline { margin-top: 60px; position: relative; }
        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 28px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(74,111,165,0.8), rgba(74,111,165,0.1));
        }
        .exp-item {
          position: relative;
          padding-left: 80px;
          margin-bottom: 48px;
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .exp-item.visible { opacity: 1; transform: translateX(0); }
        .exp-dot {
          position: absolute;
          left: 18px; top: 22px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4A6FA5, #7BA7D9);
          border: 3px solid #0F1F3D;
          box-shadow: 0 0 20px rgba(74,111,165,0.6);
          z-index: 1;
        }
        .exp-card {
          background: rgba(15,31,61,0.7);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(74,111,165,0.25);
          border-radius: 20px; padding: 30px;
          transition: all 0.35s ease;
          position: relative; overflow: hidden;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #4A6FA5, #7BA7D9);
          border-radius: 4px 0 0 4px;
        }
        .exp-card:hover {
          border-color: rgba(74,111,165,0.5);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 30px rgba(74,111,165,0.15);
          transform: translateX(6px);
        }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
        .exp-role { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: #F5F0E8; }
        .exp-company { font-size: 0.92rem; color: #7BA7D9; font-weight: 600; margin-top: 2px; }
        .exp-meta { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
        .exp-period {
          font-size: 0.82rem; font-weight: 600; color: #A8C8F0;
          background: rgba(74,111,165,0.15); border: 1px solid rgba(74,111,165,0.35);
          padding: 4px 12px; border-radius: 999px;
        }
        .exp-type {
          font-size: 0.75rem; font-weight: 700; color: #22c55e;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3);
          padding: 4px 12px; border-radius: 999px; letter-spacing: 0.5px;
        }
        .exp-desc { font-size: 0.92rem; color: #8BA3C0; line-height: 1.7; margin-bottom: 18px; }
        .exp-highlights { display: flex; flex-direction: column; gap: 8px; }
        .exp-highlight {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.87rem; color: #8BA3C0; line-height: 1.5;
        }
        .exp-highlight-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7BA7D9; flex-shrink: 0; margin-top: 6px;
          box-shadow: 0 0 6px #7BA7D9;
        }
        .exp-orb {
          position: absolute; right: -100px; top: 0;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,111,165,0.1) 0%, transparent 70%); pointer-events: none;
        }
      `}</style>

      <section className="exp-section section" id="experience" ref={sectionRef}>
        <div className="exp-orb" />
        <div className="exp-inner">
          <div className="section-header">
            <div className="section-tag">✦ My Journey</div>
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">Building real-world solutions with modern web technologies</p>
            <div className="divider" />
          </div>

          <div className="exp-timeline">
            {experiences.map((exp, i) => (
              <div key={i} className={`exp-item ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="exp-dot" />
                <div className="exp-card">
                  <div className="exp-header">
                    <div>
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-company">🏢 {exp.company}</div>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-period">📅 {exp.period}</span>
                      <span className="exp-type">{exp.type}</span>
                    </div>
                  </div>
                  <p className="exp-desc">{exp.desc}</p>
                  <div className="exp-highlights">
                    {exp.highlights.map((h, j) => (
                      <div key={j} className="exp-highlight">
                        <div className="exp-highlight-dot" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
