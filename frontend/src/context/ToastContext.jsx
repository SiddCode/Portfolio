import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ICONS = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
};

const COLORS = {
  success: { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.5)',  icon: '#22c55e' },
  error:   { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.5)',   icon: '#ef4444' },
  warning: { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.5)',   icon: '#eab308' },
  info:    { bg: 'rgba(74,111,165,0.2)',   border: 'rgba(123,167,217,0.5)', icon: '#7BA7D9' },
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div style={{
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '380px',
    width: 'calc(100% - 40px)',
  }}>
    {toasts.map(toast => {
      const c = COLORS[toast.type] || COLORS.info;
      return (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            background: c.bg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${c.border}`,
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            animation: 'toastSlideIn 0.4s cubic-bezier(0.4,0,0.2,1)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{ICONS[toast.type]}</span>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: '#F5F0E8',
            lineHeight: '1.5',
            flex: 1,
          }}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none', border: 'none', color: '#8BA3C0',
              fontSize: '1rem', lineHeight: 1, padding: 0, flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      );
    })}
    <style>{`
      @keyframes toastSlideIn {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  </div>
);
