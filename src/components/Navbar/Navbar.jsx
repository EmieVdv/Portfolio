// components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const closeMenu = () => setIsMenuOpen(false);
  const closeCvMenu = () => setIsCvMenuOpen(false);

  const handleProjectsClick = (event) => {
    event.preventDefault();
    closeMenu();

    if (isHome) {
      const projectsSection = document.getElementById("projects");
      projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/", { state: { scrollTo: "projects" } });
  };

  const handleMenuLinkClick = () => {
    closeMenu();
  };

  const handleCvDownload = () => {
    closeCvMenu();
    closeMenu();
  };

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isHome) return;

    const getSections = () =>
      Array.from(document.querySelectorAll(".scroll-stage"));

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
    window.addEventListener("scroll", updateNavbarTheme, { passive: true });
    window.addEventListener("resize", updateNavbarTheme);

    return () => {
      window.removeEventListener("scroll", updateNavbarTheme);
      window.removeEventListener("resize", updateNavbarTheme);
    };
  }, [isHome]);

  const navClass = [
    "navbar",
    isHome && isDarkBackground ? "navbar--cream" : "",
    !isHome ? "navbar--detail navbar--cream" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass}>
      <div className="navbar-logo">
        <a className="text-logo" href="/">
          EmieVdV
        </a>
      </div>

      <div className={`navbar-cv${isCvMenuOpen ? " navbar-cv--open" : ""}`}>
        <button
          className="navbar-cv-trigger text-nav"
          type="button"
          aria-expanded={isCvMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsCvMenuOpen((isOpen) => !isOpen)}
        >
          Download CV
          <span className="navbar-cv-chevron" aria-hidden="true" />
        </button>
        <div className="navbar-cv-options" role="menu">
          <a href="/cv_emie_english.pdf" download role="menuitem" onClick={handleCvDownload}>
            English version
          </a>
          <a href="/cv_emie_nederlands.pdf" download role="menuitem" onClick={handleCvDownload}>
            Dutch version
          </a>
        </div>
      </div>

      <ul className="navbar-links">
        <li>
          <a className="text-nav" href="/#projects" onClick={handleProjectsClick}>
            Projects
          </a>
        </li>
        <li>
          <a className="text-nav" href="#contact">
            Contact
          </a>
        </li>
      </ul>

      <button
        className="navbar-menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Menu"}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <svg
          className="navbar-menu-toggle-icon"
          viewBox="0 0 32 24"
          aria-hidden="true"
        >
          <path d="M1 4C6 0 10 8 15 4S24 0 31 4" />
          <path d="M1 12C6 8 10 16 15 12S24 8 31 12" />
          <path d="M1 20C6 16 10 24 15 20S24 16 31 20" />
        </svg>
      </button>

      <div className={`navbar-menu${isMenuOpen ? " navbar-menu--open" : ""}`}>
        <button
          className="navbar-menu-close"
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <span />
          <span />
        </button>
        <div className="navbar-menu-content">
          <a className="text-nav" href="/#projects" onClick={handleProjectsClick}>
            Projects
          </a>
          <a className="text-nav" href="#contact" onClick={handleMenuLinkClick}>
            Contact
          </a>
          <div className={`navbar-cv${isCvMenuOpen ? " navbar-cv--open" : ""}`}>
            <button
              className="navbar-cv-trigger text-nav"
              type="button"
              aria-expanded={isCvMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsCvMenuOpen((isOpen) => !isOpen)}
            >
              Download CV
              <span className="navbar-cv-chevron" aria-hidden="true" />
            </button>
            <div className="navbar-cv-options" role="menu">
              <a href="/cv_emie_english.pdf" download role="menuitem" onClick={handleCvDownload}>
                English version
              </a>
              <a href="/cv_emie_nederlands.pdf" download role="menuitem" onClick={handleCvDownload}>
                Dutch version
              </a>
            </div>
          </div>
        </div>
        <button className="navbar-menu-dismiss" type="button" aria-label="Close menu" onClick={closeMenu} />
      </div>
    </nav>
  );
}
