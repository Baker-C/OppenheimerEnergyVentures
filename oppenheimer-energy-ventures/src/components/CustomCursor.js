import { useEffect } from 'react';
import '../index.css';

const CustomCursor = () => {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;
    
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('touchmove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('touchmove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CustomCursor;
