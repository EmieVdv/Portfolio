import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projecten/:slug" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App
