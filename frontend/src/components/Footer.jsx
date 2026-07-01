const SOCIAL_LINKS = [
  { icon: '', label: 'GitHub',    href: 'https://github.com/SiddCode' },
  { icon: '', label: 'LinkedIn',  href: 'https://www.linkedin.com/in/siddharthan-k-315baa252/' },
  { icon: '', label: 'Instagram', href: 'https://www.instagram.com/sidd_6_10/' },
  { icon: '', label: 'Email',     href: 'mailto:siddharthank45@gmail.com' },
];

const NAV = ['Home','About','Skills','Projects','Education','Services','Contact'];
const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .footer {
          background: rgba(6,12,25,0.98);
          border-top: 1px solid rgba(74,111,165,0.2);
          padding: 60px 5% 30px;
          position: relative; overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #4A6FA5 30%, #7BA7D9 50%, #4A6FA5 70%, transparent);
        }
        .footer-inner { max-width: 1100px; margin: 0 auto; }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px; margin-bottom: 50px;
        }
        .footer-brand { }
        .footer-logo {
          font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800;
          background: linear-gradient(135deg, #F5F0E8, #7BA7D9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 14px;
        }
        .footer-logo span { -webkit-text-fill-color: #7BA7D9; }
        .footer-brand-desc { font-size: 0.88rem; color: #8BA3C0; line-height: 1.7; max-width: 280px; margin-bottom: 20px; }
        .footer-address { font-size: 0.82rem; color: #8BA3C0; line-height: 1.6; }
        .footer-address strong { color: #A8C8F0; display: block; margin-bottom: 4px; }
        .footer-col-title {
          font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700;
          color: #F5F0E8; letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 18px; position: relative;
        }
        .footer-col-title::after {
          content: ''; display: block; width: 28px; height: 2px;
          background: linear-gradient(90deg, #4A6FA5, #7BA7D9);
          margin-top: 6px; border-radius: 2px;
        }
        .footer-nav-list { display: flex; flex-direction: column; gap: 10px; }
        .footer-nav-link {
          font-size: 0.88rem; color: #8BA3C0; background: none; border: none;
          padding: 0; text-align: left; transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .footer-nav-link:hover { color: #A8C8F0; transform: translateX(5px); }
        .footer-social-list { display: flex; flex-direction: column; gap: 10px; }
        .footer-social-link {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.88rem; color: #8BA3C0; text-decoration: none;
          transition: all 0.2s ease; padding: 6px 0;
        }
        .footer-social-link:hover { color: #A8C8F0; transform: translateX(5px); }
        .footer-social-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(74,111,165,0.15); border: 1px solid rgba(74,111,165,0.25);
          display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .footer-social-link:hover .footer-social-icon {
          background: rgba(74,111,165,0.3); border-color: rgba(74,111,165,0.5);
        }
        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(74,111,165,0.15);
          padding-top: 28px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-copy { font-size: 0.82rem; color: #8BA3C0; }
        .footer-copy span { color: #7BA7D9; font-weight: 600; }
        .footer-bottom-links { display: flex; gap: 20px; }
        .footer-bottom-link {
          font-size: 0.82rem; color: #8BA3C0; text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-bottom-link:hover { color: #7BA7D9; }
        .footer-made {
          font-size: 0.8rem; color: #8BA3C0;
          display: flex; align-items: center; gap: 6px;
        }
        .footer-heart { color: #ef4444; animation: heartbeat 1.5s ease-in-out infinite; }
        @keyframes heartbeat {
          0%,100%{transform:scale(1);} 50%{transform:scale(1.2);}
        }
        .footer-orb {
          position: absolute; right: -150px; bottom: -100px;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(44,74,124,0.12) 0%, transparent 70%); pointer-events: none;
        }
        @media (max-width: 860px) {
          .footer-top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 550px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer" role="contentinfo">
        <div className="footer-orb" />
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">SIDD<span>.</span></div>
              <p className="footer-brand-desc">
                MERN Stack Developer passionate about building scalable, responsive, and user-friendly web applications
                that solve real-world problems.
              </p>
              <div className="footer-address">
                <strong>📍 Address</strong>
                <p>12 , Manimandapa Salia, Gandhi Market</p>
                <p>Trichy 620008, Tamil Nadu, India 🇮🇳</p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="footer-col-title">Navigation</div>
              <div className="footer-nav-list">
                {NAV.map(n => (
                  <button key={n} className="footer-nav-link" onClick={() => scrollTo(n)}>
                    → {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="footer-col-title">Connect</div>
              <div className="footer-social-list">
                {SOCIAL_LINKS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-social-link">
                    <span className="footer-social-icon">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="footer-col-title">Quick Links</div>
              <div className="footer-nav-list">
                <a href="/admin" className="footer-nav-link" style={{ textDecoration: 'none' }}>Admin Console</a>
                <a href="mailto:siddharthank45@gmail.com" className="footer-nav-link" style={{ textDecoration: 'none' }}>Hire Me</a>
                <a href="https://wa.me/916381558844" target="_blank" rel="noreferrer" className="footer-nav-link" style={{ textDecoration: 'none' }}>WhatsApp</a>
                <a href="https://github.com/SiddCode" target="_blank" rel="noreferrer" className="footer-nav-link" style={{ textDecoration: 'none' }}> My GitHub</a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <div className="footer-copy">
              © {currentYear} <span>Siddharthan K</span>. All rights reserved.
            </div>
            <div className="footer-made">
              Built with <span className="footer-heart">♥</span> using MERN Stack
            </div>
            <div className="footer-bottom-links">
              <a href="/admin" className="footer-bottom-link">Admin</a>
              <a href="#home" className="footer-bottom-link" onClick={e => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({behavior:'smooth'}); }}>↑ Back to Top</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
