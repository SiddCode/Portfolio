import { useEffect, useRef, useState } from 'react';

const SKILLS = {
  Frontend: {
    icon: '🎨',
    color: '#7BA7D9',
    items: [
      { name: 'React.js',      level: 90, icon: '⚛️'  },
      { name: 'React Router',  level: 85, icon: '🔀'  },
      { name: 'Tailwind CSS',  level: 80, icon: '💨'  },
      { name: 'Framer Motion', level: 75, icon: '✨'  },
      { name: 'HTML / CSS',    level: 95, icon: '🌐'  },
      { name: 'JavaScript',    level: 90, icon: '⚡'  },
    ],
  },
  Backend: {
    icon: '⚙️',
    color: '#4A9B8E',
    items: [
      { name: 'Node.js',    level: 85, icon: '🟢' },
      { name: 'Express.js', level: 85, icon: '🚀' },
    ],
  },
  Database: {
    icon: '🗄️',
    color: '#E8A838',
    items: [
      { name: 'MongoDB',  level: 80, icon: '🍃' },
      { name: 'Mongoose', level: 78, icon: '📦' },
    ],
  },
  Deployment: {
    icon: '☁️',
    color: '#A8C8F0',
    items: [
      { name: 'Vercel',          level: 85, icon: '▲' },
      { name: 'Render',          level: 80, icon: '🔷' },
      { name: 'MongoDB Atlas',   level: 75, icon: '🌐' },
    ],
  },
};

function SkillBar({ name, level, icon, color, animate }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.9rem', fontWeight: 600, color: '#F5F0E8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{icon}</span>{name}
        </span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: color }}>{level}%</span>
      </div>
      <div style={{ height: '7px', background: 'rgba(74,111,165,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: animate ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: '999px',
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}

function CategoryCard({ cat, data, animate }) {
  return (
    <div style={{
      background: 'rgba(15,31,61,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid rgba(74,111,165,0.25)`,
      borderRadius: '20px',
      padding: '28px',
      transition: 'all 0.35s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = data.color + '66';
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${data.color}22`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(74,111,165,0.25)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '14px',
          background: data.color + '22',
          border: `1px solid ${data.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>{data.icon}</div>
        <div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#F5F0E8' }}>{cat}</div>
          <div style={{ fontSize: '0.78rem', color: data.color, fontWeight: 600 }}>{data.items.length} Skills</div>
        </div>
      </div>

      {data.items.map(s => (
        <SkillBar key={s.name} {...s} color={data.color} animate={animate} />
      ))}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [animate,  setAnimate]  = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimate(true), 200);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .skills-section { padding: var(--section-pad); position: relative; overflow: hidden; }
        .skills-inner { max-width: 1100px; margin: 0 auto; }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 60px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease;
        }
        .skills-grid.visible { opacity: 1; transform: translateY(0); }
        .skills-orb {
          position: absolute; right: -150px; top: 50%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,111,165,0.12) 0%, transparent 70%);
          pointer-events: none; transform: translateY(-50%);
        }
        @media (max-width: 700px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="skills-section section" id="skills" ref={sectionRef}>
        <div className="skills-orb" />
        <div className="skills-inner">
          <div className="section-header">
            <div className="section-tag">✦ My Arsenal</div>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">A complete MERN stack toolkit for building modern full-stack applications</p>
            <div className="divider" />
          </div>

          <div className={`skills-grid ${visible ? 'visible' : ''}`}>
            {Object.entries(SKILLS).map(([cat, data]) => (
              <CategoryCard key={cat} cat={cat} data={data} animate={animate} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
