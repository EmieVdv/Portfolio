import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

export function useSectionSnap() {
  const lenis = useLenis();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    const getSections = () => Array.from(document.querySelectorAll('.scroll-stage'));

    const unlockScroll = () => {
      isScrollingRef.current = false;
      window.removeEventListener('scrollend', unlockScroll);
    };

    const handleWheel = (event) => {
      event.preventDefault();

      if (isScrollingRef.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentScroll = window.scrollY;

      let currentIndex = 0;
      for (let index = 0; index < sections.length; index += 1) {
        if (sections[index].offsetTop <= currentScroll + 2) {
          currentIndex = index;
        }
      }

      const nextIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction)
      );

      if (nextIndex === currentIndex) return;

      isScrollingRef.current = true;

      window.addEventListener('scrollend', unlockScroll, { once: true });

      window.setTimeout(unlockScroll, 1600);

      lenis.scrollTo(sections[nextIndex].offsetTop, {
        duration: 1.5,
        lock: true,
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scrollend', unlockScroll);
      isScrollingRef.current = false;
    };
  }, [lenis]);
}