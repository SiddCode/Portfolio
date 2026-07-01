import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'SGS HR Workforce Solution',
    description: 'A professional HR consultancy platform with modern UI, service listings, and contact management for workforce solutions in India.',
    image: '/assets/sgs_project.png',
    link: 'https://sgsconsultancy.onrender.com/',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    featured: true,
  },
  {
    id: '2',
    title: 'Sweet Tooth Trichy',
    description: 'An elegant bakery and desserts website with menu showcase, smooth animations, and beautiful sweet-themed design.',
    image: '/assets/sweettooth_project.png',
    link: 'https://sweettoothtrichy-github-io.onrender.com/',
    tags: ['React', 'CSS', 'JavaScript'],
    featured: true,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(15,31,61,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? 'rgba(123,167,217,0.5)' : 'rgba(74,111,165,0.2)'}`,
        borderRadius: '22px',
        overflow: 'hidden',
        transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
        transform: visible
          ? hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(50px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.15}s`,
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,111,165,0.2)' : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          onError={e => {
            e.target.src = `https://via.placeholder.com/600x300/1E3A5F/7BA7D9?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(10,20,40,0.95) 100%)',
        }} />
        {/* Live badge */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)',
          borderRadius: '999px', padding: '4px 12px',
          fontSize: '0.72rem', fontWeight: 700, color: '#22c55e',
          display: 'flex', alignItems: 'center', gap: '6px',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 6px #22c55e' }} />
          LIVE
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px' }}>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '10px' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#8BA3C0', lineHeight: '1.65', marginBottom: '16px' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
          {(project.tags || []).map(tag => (
            <span key={tag} style={{
              padding: '4px 11px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
              background: 'rgba(74,111,165,0.2)', border: '1px solid rgba(74,111,165,0.35)', color: '#A8C8F0',
            }}>{tag}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              padding: '10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600,
              background: 'linear-gradient(135deg, #4A6FA5, #7BA7D9)',
              color: '#fff', textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 14px rgba(74,111,165,0.4)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    axios.get('/api/projects').then(r => {
      if (r.data && r.data.length) setProjects(r.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .projects-section { padding: var(--section-pad); background: rgba(8,16,32,0.5); position: relative; overflow: hidden; }
        .projects-inner { max-width: 1100px; margin: 0 auto; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; margin-top: 60px; }
        .projects-orb {
          position: absolute; left: -100px; bottom: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(44,74,124,0.15) 0%, transparent 70%); pointer-events: none;
        }
      `}</style>

      <section className="projects-section section" id="projects">
        <div className="projects-orb" />
        <div className="projects-inner">
          <div className="section-header">
            <div className="section-tag">✦ My Work</div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Real-world applications built with the MERN stack, designed for performance and user experience</p>
            <div className="divider" />
          </div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id || i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
