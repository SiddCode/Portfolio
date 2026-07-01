import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

/* ── Admin Console ────────────────────────────────────────────── */
export default function Admin() {
  const { addToast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [password,  setPassword]  = useState('');
  const [loginErr,  setLoginErr]  = useState('');
  const [loginLoad, setLoginLoad] = useState(false);
  const [tab, setTab] = useState('projects');

  // Data
  const [projects,    setProjects]    = useState([]);
  const [profile,     setProfile]     = useState({});
  const [loading,     setLoading]     = useState(false);

  // Project modal
  const [showModal,   setShowModal]   = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', link: '', tags: '' });

  useEffect(() => {
    if (authenticated) fetchAll();
  }, [authenticated]);

  const fetchAll = async () => {
    try {
      const r = await axios.get('/api/data');
      setProjects(r.data.projects || []);
      setProfile(r.data.profile || {});
    } catch { addToast('Failed to load data', 'error'); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoad(true); setLoginErr('');
    try {
      const r = await axios.post('/api/admin/login', { password });
      if (r.data.success) {
        setAuthenticated(true);
        addToast('✅ Welcome to Admin Console!', 'success');
      }
    } catch {
      setLoginErr('Incorrect password. Please try again.');
    } finally { setLoginLoad(false); }
  };

  /* ── Project CRUD ── */
  const openAdd = () => {
    setEditProject(null);
    setProjectForm({ title: '', description: '', image: '', link: '', tags: '' });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProject(p);
    setProjectForm({ title: p.title, description: p.description, image: p.image, link: p.link, tags: (p.tags || []).join(', ') });
    setShowModal(true);
  };

  const handleProjectSave = async () => {
    if (!projectForm.title.trim()) { addToast('Title is required', 'error'); return; }
    setLoading(true);
    const payload = {
      ...projectForm,
      tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editProject) {
        await axios.put(`/api/projects/${editProject.id}`, payload);
        addToast('✅ Project updated!', 'success');
      } else {
        await axios.post('/api/projects', payload);
        addToast('✅ Project added!', 'success');
      }
      setShowModal(false);
      fetchAll();
    } catch { addToast('Failed to save project', 'error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      addToast('🗑️ Project deleted', 'info');
      fetchAll();
    } catch { addToast('Failed to delete', 'error'); }
  };

  /* ── Profile Update ── */
  const handleProfileSave = async () => {
    setLoading(true);
    try {
      await axios.put('/api/profile', profile);
      addToast('✅ Profile updated!', 'success');
    } catch { addToast('Failed to update profile', 'error'); }
    finally { setLoading(false); }
  };

  /* ── Styles ── */
  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #060d1a, #0F1F3D, #1a2d50)',
      fontFamily: "'Inter',sans-serif",
      padding: '80px 5% 60px',
    },
    container: { maxWidth: '1100px', margin: '0 auto' },
    heading: { fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 800, color: '#F5F0E8', marginBottom: '8px' },
    subheading: { fontSize: '0.88rem', color: '#8BA3C0', marginBottom: '32px' },
    tabBar: { display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' },
    tab: (active) => ({
      padding: '10px 22px', borderRadius: '12px', border: `1px solid ${active ? 'rgba(123,167,217,0.6)' : 'rgba(74,111,165,0.25)'}`,
      background: active ? 'rgba(74,111,165,0.25)' : 'rgba(15,31,61,0.5)',
      color: active ? '#A8C8F0' : '#8BA3C0', fontWeight: 600, fontSize: '0.88rem',
      transition: 'all 0.2s ease',
    }),
    card: {
      background: 'rgba(15,31,61,0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(74,111,165,0.25)',
      borderRadius: '18px',
      padding: '24px',
      marginBottom: '16px',
    },
    input: {
      width: '100%', padding: '11px 14px',
      background: 'rgba(15,31,61,0.7)',
      border: '1px solid rgba(74,111,165,0.3)',
      borderRadius: '10px', color: '#F5F0E8',
      fontFamily: "'Inter',sans-serif", fontSize: '0.9rem', outline: 'none',
      marginBottom: '12px', boxSizing: 'border-box',
    },
    label: { fontSize: '0.78rem', fontWeight: 700, color: '#8BA3C0', display: 'block', marginBottom: '5px', letterSpacing: '0.5px', textTransform: 'uppercase' },
    btnPrimary: {
      padding: '11px 22px', borderRadius: '10px', border: 'none',
      background: 'linear-gradient(135deg, #4A6FA5, #7BA7D9)',
      color: '#fff', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s ease',
    },
    btnDanger: {
      padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.4)',
      background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 600, fontSize: '0.82rem',
    },
    btnEdit: {
      padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(74,111,165,0.4)',
      background: 'rgba(74,111,165,0.15)', color: '#A8C8F0', fontWeight: 600, fontSize: '0.82rem',
      marginRight: '8px',
    },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    projImg: { width: 80, height: 60, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(74,111,165,0.3)' },
    tag: {
      display: 'inline-block', padding: '3px 9px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
      background: 'rgba(74,111,165,0.2)', border: '1px solid rgba(74,111,165,0.35)', color: '#A8C8F0', marginRight: '4px',
    },
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(6,13,26,0.8)', backdropFilter: 'blur(8px)',
      zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    },
    modal: {
      background: 'rgba(15,31,61,0.98)', border: '1px solid rgba(74,111,165,0.4)',
      borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '540px',
      maxHeight: '90vh', overflowY: 'auto',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
    },
  };

  /* ── Login Screen ── */
  if (!authenticated) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...s.modal, width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔐</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#F5F0E8', marginBottom: '6px' }}>Admin Console</div>
            <div style={{ fontSize: '0.85rem', color: '#8BA3C0' }}>Enter your admin password to continue</div>
          </div>
          <form onSubmit={handleLogin}>
            <label style={s.label}>Password</label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{ ...s.input, marginBottom: '8px' }}
              autoFocus
            />
            {loginErr && <div style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '12px' }}>{loginErr}</div>}
            <button type="submit" style={{ ...s.btnPrimary, width: '100%', padding: '13px' }} disabled={loginLoad}>
              {loginLoad ? 'Verifying...' : '🔓 Login to Admin'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a href="/" style={{ fontSize: '0.82rem', color: '#7BA7D9', textDecoration: 'none' }}>← Back to Portfolio</a>
          </div>
        </div>
      </div>
    );
  }

  /* ── Admin Dashboard ── */
  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
          <div>
            <h1 style={s.heading}>⚙️ Admin Console</h1>
            <p style={s.subheading}>Manage your portfolio content — projects, profile, and contact info</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="/" style={{ ...s.btnEdit, textDecoration: 'none', padding: '10px 20px' }}>← Portfolio</a>
            <button style={s.btnDanger} onClick={() => { setAuthenticated(false); addToast('Logged out', 'info'); }}>🚪 Logout</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabBar}>
          {[['projects','🗂️ Projects'], ['profile','👤 Profile'], ['contact','📬 Contact Info']].map(([id, label]) => (
            <button key={id} style={s.tab(tab === id)} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {/* ── PROJECTS TAB ── */}
        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F5F0E8' }}>
                Projects ({projects.length})
              </h2>
              <button style={s.btnPrimary} onClick={openAdd}>＋ Add Project</button>
            </div>
            {projects.length === 0 && (
              <div style={{ ...s.card, textAlign: 'center', color: '#8BA3C0', padding: '48px' }}>
                No projects yet. Click "Add Project" to create one.
              </div>
            )}
            {projects.map(p => (
              <div key={p.id} style={{ ...s.card, display: 'flex', gap: '18px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <img src={p.image} alt={p.title} style={s.projImg}
                  onError={e => { e.target.src = 'https://via.placeholder.com/80x60/1E3A5F/7BA7D9?text=IMG'; }} />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, color: '#F5F0E8', fontSize: '1rem', marginBottom: '4px' }}>{p.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#8BA3C0', marginBottom: '8px', lineHeight: 1.5 }}>{p.description}</div>
                  <div style={{ marginBottom: '8px' }}>
                    {(p.tags || []).map(t => <span key={t} style={s.tag}>{t}</span>)}
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#7BA7D9' }}>
                    🔗 {p.link}
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button style={s.btnEdit} onClick={() => openEdit(p)}>✏️ Edit</button>
                  <button style={s.btnDanger} onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {tab === 'profile' && (
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '20px' }}>
              👤 Profile Settings
            </h2>
            <div style={s.card}>
              <div style={s.grid2}>
                <div>
                  <label style={s.label}>Full Name</label>
                  <input style={s.input} value={profile.name || ''} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Title / Role</label>
                  <input style={s.input} value={profile.title || ''} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} />
                </div>
              </div>
              <label style={s.label}>Bio</label>
              <textarea rows={6} style={{ ...s.input, resize: 'vertical' }} value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
              <div style={s.grid2}>
                <div>
                  <label style={s.label}>Email</label>
                  <input style={s.input} value={profile.email || ''} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Phone</label>
                  <input style={s.input} value={profile.phone || ''} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>GitHub URL</label>
                  <input style={s.input} value={profile.github || ''} onChange={e => setProfile(p => ({ ...p, github: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>LinkedIn URL</label>
                  <input style={s.input} value={profile.linkedin || ''} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Instagram URL</label>
                  <input style={s.input} value={profile.instagram || ''} onChange={e => setProfile(p => ({ ...p, instagram: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>WhatsApp Number</label>
                  <input style={s.input} value={profile.whatsapp || ''} onChange={e => setProfile(p => ({ ...p, whatsapp: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Address</label>
                  <input style={s.input} value={profile.address || ''} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Profile Picture (Drag & Drop or Click to Upload)</label>
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={async e => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (!file) return;
                      if (!file.type.startsWith('image/')) {
                        addToast('❌ File must be an image', 'error');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = async () => {
                        try {
                          setLoading(true);
                          const res = await axios.put('/api/profile/upload', { image: reader.result });
                          if (res.data.success) {
                            setProfile(p => ({ ...p, avatar: res.data.avatar }));
                            addToast('🎉 Profile picture updated successfully!', 'success');
                          }
                        } catch (err) {
                          addToast('❌ Upload failed', 'error');
                        } finally {
                          setLoading(false);
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = async () => {
                        const file = input.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = async () => {
                          try {
                            setLoading(true);
                            const res = await axios.put('/api/profile/upload', { image: reader.result });
                            if (res.data.success) {
                              setProfile(p => ({ ...p, avatar: res.data.avatar }));
                              addToast('🎉 Profile picture updated successfully!', 'success');
                            }
                          } catch (err) {
                            addToast('❌ Upload failed', 'error');
                          } finally {
                            setLoading(false);
                          }
                        };
                        reader.readAsDataURL(file);
                      };
                      input.click();
                    }}
                    style={{
                      border: '2px dashed rgba(74, 111, 165, 0.5)',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'center',
                      background: 'rgba(15,31,61,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '12px'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#7BA7D9';
                      e.currentTarget.style.background = 'rgba(74,111,165,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(74, 111, 165, 0.5)';
                      e.currentTarget.style.background = 'rgba(15,31,61,0.5)';
                    }}
                  >
                    {profile.avatar ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={profile.avatar}
                          alt="Avatar preview"
                          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #7BA7D9' }}
                          onError={e => { e.target.src = 'https://via.placeholder.com/80/1E3A5F/7BA7D9?text=SK'; }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#8BA3C0' }}>Drag new image here or click to change</span>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📁</div>
                        <span style={{ fontSize: '0.8rem', color: '#8BA3C0' }}>Drag profile image file here or click to select</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button style={{ ...s.btnPrimary, marginTop: '8px' }} onClick={handleProfileSave} disabled={loading}>
                {loading ? 'Saving...' : '💾 Save Profile'}
              </button>
            </div>
          </div>
        )}

        {/* ── CONTACT INFO TAB ── */}
        {tab === 'contact' && (
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '20px' }}>
              📬 Contact Information
            </h2>
            <div style={s.card}>
              <p style={{ fontSize: '0.88rem', color: '#8BA3C0', marginBottom: '20px', lineHeight: 1.6 }}>
                These fields are shared with the Profile section. Changes here will also reflect in the Contact section on your portfolio.
              </p>
              <div style={s.grid2}>
                <div>
                  <label style={s.label}>Contact Email</label>
                  <input style={s.input} value={profile.email || ''} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Phone Number</label>
                  <input style={s.input} value={profile.phone || ''} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>WhatsApp</label>
                  <input style={s.input} value={profile.whatsapp || ''} onChange={e => setProfile(p => ({ ...p, whatsapp: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>Instagram URL</label>
                  <input style={s.input} value={profile.instagram || ''} onChange={e => setProfile(p => ({ ...p, instagram: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>GitHub URL</label>
                  <input style={s.input} value={profile.github || ''} onChange={e => setProfile(p => ({ ...p, github: e.target.value }))} />
                </div>
                <div>
                  <label style={s.label}>LinkedIn URL</label>
                  <input style={s.input} value={profile.linkedin || ''} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))} />
                </div>
              </div>
              <button style={{ ...s.btnPrimary, marginTop: '8px' }} onClick={handleProfileSave} disabled={loading}>
                {loading ? 'Saving...' : '💾 Save Contact Info'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Project Modal ── */}
      {showModal && (
        <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={s.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#F5F0E8' }}>
                {editProject ? '✏️ Edit Project' : '➕ Add New Project'}
              </h3>
              <button style={{ background: 'none', border: 'none', color: '#8BA3C0', fontSize: '1.4rem' }} onClick={() => setShowModal(false)}>✕</button>
            </div>

            <label style={s.label}>Project Title *</label>
            <input style={s.input} placeholder="My Awesome Project" value={projectForm.title}
              onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} />

            <label style={s.label}>Description</label>
            <textarea rows={3} style={{ ...s.input, resize: 'vertical' }} placeholder="Brief project description..."
              value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} />

            <label style={s.label}>Image URL</label>
            <input style={s.input} placeholder="https://... or /assets/my-image.png"
              value={projectForm.image} onChange={e => setProjectForm(f => ({ ...f, image: e.target.value }))} />

            <label style={s.label}>Live Link</label>
            <input style={s.input} placeholder="https://myproject.com"
              value={projectForm.link} onChange={e => setProjectForm(f => ({ ...f, link: e.target.value }))} />

            <label style={s.label}>Tags (comma separated)</label>
            <input style={s.input} placeholder="React, Node.js, MongoDB"
              value={projectForm.tags} onChange={e => setProjectForm(f => ({ ...f, tags: e.target.value }))} />

            {projectForm.image && (
              <div style={{ marginBottom: '16px' }}>
                <label style={s.label}>Preview</label>
                <img src={projectForm.image} alt="preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(74,111,165,0.3)' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button style={{ ...s.btnPrimary, flex: 1 }} onClick={handleProjectSave} disabled={loading}>
                {loading ? 'Saving...' : (editProject ? '💾 Update' : '➕ Add Project')}
              </button>
              <button style={{ ...s.btnEdit, padding: '11px 20px' }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
