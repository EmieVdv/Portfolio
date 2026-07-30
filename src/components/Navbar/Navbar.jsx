import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const getSections = () => Array.from(document.querySelectorAll('.scroll-stage'));

    function updateNavbarTheme() {
      const sections = getSections();
      if (sections.length === 0) return;

      const currentScroll = window.scrollY;
      let currentIndex = 0;

      for (let index = 0; index < sections.length; index += 1) {
        if (sections[index].offsetTop <= currentScroll + 2) {
          currentIndex = index;
        }
      }

      setIsDarkBackground(currentIndex > 0);
    }

    updateNavbarTheme();
    window.addEventListener('scroll', updateNavbarTheme, { passive: true });
    window.addEventListener('resize', updateNavbarTheme);

    return () => {
      window.removeEventListener('scroll', updateNavbarTheme);
      window.removeEventListener('resize', updateNavbarTheme);
    };
  }, []);

  return (
    <nav className={`navbar ${isDarkBackground ? 'navbar--cream' : ''}`}>
      <div className="navbar-logo text-nav">Emie Van de Veire</div>

      <a className="navbar-cv text-nav" href="/cv-emie-van-de-veire.pdf" download>
        Download CV
        <svg className="navbar-cv-icon" width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1V8.5M6 8.5L2.8 5.3M6 8.5L9.2 5.3M1.5 11H10.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <ul className="navbar-links">
        <li><a className="text-nav" href="#projects">Projects</a></li>
        <li><a className="text-nav" href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}