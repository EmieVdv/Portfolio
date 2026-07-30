import { useEffect, useState } from 'react';
import './ScrollProgressBar.css';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, nextProgress)));
      rafId = 0;
    }

    function handleScroll() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleY(${progress})` }}
      />
    </div>
  );
}
