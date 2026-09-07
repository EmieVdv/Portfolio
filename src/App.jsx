import './App.css'
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import SectionTitle from './components/SectionTitle/SectionTitle.jsx'
import ProjectPreview from './components/ProjectPreview/ProjectPreview.jsx'
import ScrollProgressBar from './components/ScrollProgressBar/ScrollProgressBar.jsx'
import { projects } from './data/projects';
import Footer from './components/Footer/Footer.jsx'
import { useSectionSnap } from './hooks/useSectionSnap.js';
import ProjectPage from './pages/ProjectPage.jsx';

function HomePage() {
  useSectionSnap();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldScrollToProjects =
      location.hash === '#projects' || location.state?.scrollTo === 'projects';

    if (!shouldScrollToProjects) return;

    window.requestAnimationFrame(() => {
      const projectsSection = document.getElementById('projects');
      projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (location.state?.scrollTo === 'projects') {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <ScrollProgressBar />
      <Hero />
      <SectionTitle id="projects" text="Projects" hint="Scroll to continue" />

      {projects.map((project) => (
        <ProjectPreview key={project.slug} {...project} />
      ))}

      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const pageClass = location.pathname === "/" ? "page-home" : "page-detail";
    document.body.classList.remove("page-home", "page-detail");
    document.body.classList.add(pageClass);

    return () => document.body.classList.remove(pageClass);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projecten/:slug" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App
