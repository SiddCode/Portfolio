import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState('home');
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 60);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (sy / docH) * 100 : 0);

      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .navbar.scrolled {
          background: rgba(10, 20, 40, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(74,111,165,0.25);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .nav-logo {
          font-family: 'Outfit', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #F5F0E8, #7BA7D9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }
        .nav-logo span { color: #7BA7D9; -webkit-text-fill-color: #7BA7D9; }
        .nav-links { display: flex; align-items: center; gap: 6px; }
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(245,240,232,0.75);
          padding: 7px 16px;
          border-radius: 999px;
          border: none;
          background: transparent;
          transition: all 0.25s ease;
          position: relative;
        }
        .nav-link:hover { color: #F5F0E8; background: rgba(74,111,165,0.2); }
        .nav-link.active {
          color: #7BA7D9;
          background: rgba(74,111,165,0.25);
          border: 1px solid rgba(74,111,165,0.4);
        }
        .nav-admin {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #7BA7D9;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid rgba(74,111,165,0.5);
          background: transparent;
          margin-left: 8px;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .nav-admin:hover {
          background: rgba(74,111,165,0.2);
          border-color: #7BA7D9;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 6px;
          z-index: 1001;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: #F5F0E8;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          top: 70px;
          background: rgba(10, 20, 40, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          z-index: 999;
          animation: menuSlide 0.3s ease;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu .nav-link { font-size: 1.2rem; padding: 12px 32px; }
        .scroll-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #4A6FA5, #7BA7D9);
          transition: width 0.1s linear;
          border-radius: 2px;
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-admin-desktop { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          SIDD
        </div>

        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              className={`nav-link ${active === link.href.replace('#','') ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <a href="/admin" className="nav-admin nav-admin-desktop">⚙ Admin</a>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              className={`nav-link ${active === link.href.replace('#','') ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <a href="/admin" className="nav-admin">⚙ Admin Console</a>
        </div>

        {scrolled && (
          <div className="scroll-bar" style={{ width: `${scrollPct}%` }} />
        )}
      </nav>
    </>
  );
}
