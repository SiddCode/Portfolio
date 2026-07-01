import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  { icon: '📱', title: 'Responsive Websites',      desc: 'Mobile-first, pixel-perfect designs that look stunning on every screen size and device.',          color: '#7BA7D9' },
  { icon: '⚡', title: 'Full Stack Development',   desc: 'End-to-end MERN stack apps — from React frontends to Node.js APIs and MongoDB backends.',       color: '#4A9B8E' },
  { icon: '🔌', title: 'REST API Development',     desc: 'Scalable, well-documented RESTful APIs built with Express.js and best security practices.',       color: '#E8A838' },
  { icon: '🖥️', title: 'Admin Dashboard',          desc: 'Custom admin panels for managing content, users, analytics, and business data efficiently.',     color: '#A064C8' },
  { icon: '🗄️', title: 'MongoDB Database Design',  desc: 'Optimized NoSQL schemas, indexing strategies, and complex aggregation pipelines.',               color: '#4A9B8E' },
  { icon: '🔐', title: 'Authentication System',    desc: 'Secure JWT-based auth with login, register, role-based access, protected routes & sessions.',    color: '#E85838' },
  { icon: '🔍', title: 'SEO Optimization',         desc: 'Technical SEO, semantic HTML, meta tags, structured data and Core Web Vitals improvements.',     color: '#7BA7D9' },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(15,31,61,0.95), rgba(74,111,165,0.15))`
          : 'rgba(15,31,61,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? service.color + '55' : 'rgba(74,111,165,0.2)'}`,
        borderRadius: '20px',
        padding: '28px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: visible
          ? (hovered ? 'translateY(-8px)' : 'translateY(0)')
          : 'translateY(50px)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${(index % 4) * 0.08}s` : '0s',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${service.color}22` : '0 4px 20px rgba(0,0,0,0.2)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        borderRadius: '20px 20px 0 0',
      }} />

      {/* BG number */}
      <div style={{
        position: 'absolute', right: '20px', top: '16px',
        fontSize: '3.5rem', fontFamily: "'Outfit',sans-serif", fontWeight: 900,
        color: service.color, opacity: 0.06, lineHeight: 1, pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div style={{
        width: '54px', height: '54px', borderRadius: '16px',
        background: service.color + '20',
        border: `1px solid ${service.color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: '18px',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 20px ${service.color}44` : 'none',
        transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
      }}>
        {service.icon}
      </div>

      <h3 style={{
        fontFamily: "'Outfit',sans-serif", fontSize: '1.05rem', fontWeight: 700,
        color: '#F5F0E8', marginBottom: '10px', lineHeight: 1.3,
      }}>
        {service.title}
      </h3>
      <p style={{ fontSize: '0.86rem', color: '#8BA3C0', lineHeight: '1.65' }}>
        {service.desc}
      </p>

      {/* Check mark */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        marginTop: '16px', fontSize: '0.78rem', fontWeight: 700,
        color: service.color, opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        ✔ Available
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <style>{`
        .services-section { padding: var(--section-pad); position: relative; overflow: hidden; }
        .services-inner { max-width: 1100px; margin: 0 auto; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 22px; margin-top: 60px;
        }
        .services-orb {
          position: absolute; right: -100px; bottom: -100px;
          width: 450px; height: 450px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,111,165,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="services-section section" id="services">
        <div className="services-orb" />
        <div className="services-inner">
          <div className="section-header">
            <div className="section-tag">✦ What I Offer</div>
            <h2 className="section-title">Services</h2>
            <p className="section-subtitle">Comprehensive web development solutions tailored to your business needs</p>
            <div className="divider" />
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
