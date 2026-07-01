import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dot.classList.add('cursor-grow');
      ring.classList.add('cursor-grow');
    };
    const onLeaveLink = () => {
      dot.classList.remove('cursor-grow');
      ring.classList.remove('cursor-grow');
    };
    const onDown = () => ring.classList.add('cursor-click');
    const onUp   = () => ring.classList.remove('cursor-click');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    const bindLinks = () => {
      document.querySelectorAll('a,button,[role="button"],input,textarea,select,.btn').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    bindLinks();

    const observer = new MutationObserver(bindLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor-dot {
          position: fixed;
          width: 8px; height: 8px;
          background: #7BA7D9;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 99999;
          transition: width 0.2s, height 0.2s, background 0.2s;
          box-shadow: 0 0 10px #7BA7D9, 0 0 20px rgba(123,167,217,0.4);
        }
        .custom-cursor-ring {
          position: fixed;
          width: 36px; height: 36px;
          border: 2px solid rgba(123, 167, 217, 0.6);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 99998;
          transition: width 0.2s, height 0.2s, border-color 0.2s;
        }
        .custom-cursor-dot.cursor-grow {
          width: 14px; height: 14px;
          background: #F5F0E8;
          box-shadow: 0 0 15px #F5F0E8;
        }
        .custom-cursor-ring.cursor-grow {
          width: 52px; height: 52px;
          border-color: rgba(245, 240, 232, 0.6);
        }
        .custom-cursor-ring.cursor-click {
          width: 24px; height: 24px;
          border-color: #7BA7D9;
        }
      `}</style>
      <div className="custom-cursor-dot"  ref={dotRef}  />
      <div className="custom-cursor-ring" ref={ringRef} />
    </>
  );
}
