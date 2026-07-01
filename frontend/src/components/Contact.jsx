import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const CONTACT_INFO = [
  { icon: '', label: 'Email',     value: 'siddharthank45@gmail.com', href: 'mailto:siddharthank45@gmail.com' },
  { icon: '', label: 'Phone',     value: '+91 63815 58844',          href: 'tel:+916381558844' },
  { icon: '', label: 'WhatsApp',  value: '+91 63815 58844',          href: 'https://wa.me/916381558844' },
  { icon: '', label: 'Instagram', value: '@sidd_6_10',               href: 'https://www.instagram.com/sidd_6_10/' },
];

const SOCIAL_LINKS = [
  { icon: '', label: 'GitHub',    href: 'https://github.com/SiddCode' },
  { icon: '', label: 'LinkedIn',  href: 'https://www.linkedin.com/in/siddharthan-k-315baa252/' },
  { icon: '', label: 'Instagram', href: 'https://www.instagram.com/sidd_6_10/' },
  { icon: '', label: 'Email',     href: 'mailto:siddharthank45@gmail.com' },
];

export default function Contact() {
  const { addToast } = useToast();
  const sectionRef = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name is required';
    if (!form.email.trim())   errs.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      addToast('✅ Message sent! I\'ll get back to you soon.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      addToast('❌ Failed to send message. Please try again or email me directly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(15,31,61,0.6)',
    border: `1.5px solid ${errors[field] ? '#ef4444' : 'rgba(74,111,165,0.3)'}`,
    borderRadius: '12px',
    color: '#F5F0E8',
    fontFamily: "'Inter',sans-serif",
    fontSize: '0.93rem',
    outline: 'none',
    transition: 'all 0.25s ease',
    resize: 'none',
  });

  return (
    <>
      <style>{`
        .contact-section { padding: var(--section-pad); background: rgba(8,16,32,0.6); position: relative; overflow: hidden; }
        .contact-inner { max-width: 1100px; margin: 0 auto; }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 48px; margin-top: 60px;
          opacity: 0; transform: translateY(40px);
          transition: all 0.7s ease;
        }
        .contact-grid.visible { opacity: 1; transform: translateY(0); }
        /* Left */
        .contact-left { display: flex; flex-direction: column; gap: 20px; }
        .contact-tagline {
          font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 700;
          background: linear-gradient(135deg, #F5F0E8, #7BA7D9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1.3; margin-bottom: 6px;
        }
        .contact-desc { font-size: 0.92rem; color: #8BA3C0; line-height: 1.7; }
        .contact-info-list { display: flex; flex-direction: column; gap: 12px; }
        .contact-info-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          background: rgba(15,31,61,0.6);
          border: 1px solid rgba(74,111,165,0.2);
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .contact-info-item:hover {
          border-color: rgba(74,111,165,0.5);
          background: rgba(74,111,165,0.1);
          transform: translateX(6px);
        }
        .contact-info-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(74,111,165,0.2); border: 1px solid rgba(74,111,165,0.3);
          display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
          flex-shrink: 0;
        }
        .contact-info-label { font-size: 0.75rem; color: #7BA7D9; font-weight: 600; margin-bottom: 2px; }
        .contact-info-val   { font-size: 0.88rem; color: #F5F0E8; font-weight: 600; }
        /* Socials */
        .contact-socials { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 4px; }
        .contact-social-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 16px; border-radius: 12px;
          background: rgba(15,31,61,0.6); border: 1px solid rgba(74,111,165,0.25);
          color: #8BA3C0; font-size: 0.83rem; font-weight: 600;
          text-decoration: none; transition: all 0.25s ease;
          font-family: 'Inter', sans-serif;
        }
        .contact-social-btn:hover { border-color: rgba(74,111,165,0.5); color: #A8C8F0; background: rgba(74,111,165,0.15); transform: translateY(-2px); }
        /* Form */
        .contact-form-card {
          background: rgba(15,31,61,0.7);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(74,111,165,0.25);
          border-radius: 22px; padding: 36px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-label { font-size: 0.82rem; font-weight: 600; color: #8BA3C0; letter-spacing: 0.5px; }
        .form-error { font-size: 0.76rem; color: #ef4444; margin-top: 2px; }
        .form-input:focus, .form-textarea:focus {
          border-color: rgba(123,167,217,0.6) !important;
          box-shadow: 0 0 0 3px rgba(74,111,165,0.15);
          background: rgba(15,31,61,0.8) !important;
        }
        .submit-btn {
          width: 100%; padding: 15px; border: none; border-radius: 14px;
          background: linear-gradient(135deg, #4A6FA5, #7BA7D9);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 700;
          transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 4px 20px rgba(74,111,165,0.4);
          cursor: pointer;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(74,111,165,0.6);
        }
        .submit-btn:disabled { opacity: 0.7; }
        .contact-orb {
          position: absolute; left: -100px; top: 0;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,111,165,0.12) 0%, transparent 70%); pointer-events: none;
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="contact-section section" id="contact" ref={sectionRef}>
        <div className="contact-orb" />
        <div className="contact-inner">
          <div className="section-header">
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">Have a project in mind? I'd love to hear from you. Drop a message and I'll respond within 24 hours.</p>
            <div className="divider" />
          </div>

          <div className={`contact-grid ${visible ? 'visible' : ''}`}>
            {/* Left: Info */}
            <div className="contact-left">
              <div>
                <h3 className="contact-tagline">Ready to Build Something Amazing?</h3>
                <p className="contact-desc">
                  Whether you need a complete web application, a stunning portfolio, or an API — I'm here to make it happen.
                  Let's turn your vision into reality!
                </p>
              </div>

              <div className="contact-info-list">
                {CONTACT_INFO.map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-info-item">
                    <div className="contact-info-icon">{c.icon}</div>
                    <div>
                      <div className="contact-info-label">{c.label}</div>
                      <div className="contact-info-val">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8BA3C0', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Find Me Online
                </div>
                <div className="contact-socials">
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact-social-btn">
                      {s.icon} {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card">
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '24px' }}>
                Send a Message 
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="Siddharthan K"
                      className="form-input" style={inputStyle('name')}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="you@example.com"
                      className="form-input" style={inputStyle('email')}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="Project Discussion / Collaboration"
                    className="form-input" style={inputStyle('subject')}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} rows={5}
                    placeholder="Hi Siddharthan, I'd like to discuss a project..."
                    className="form-textarea" style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '130px' }}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading
                    ? <><div style={{ width:20, height:20, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} /> Sending...</>
                    : <>Send Message</>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
