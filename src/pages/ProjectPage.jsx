import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import ProjectDetail from '../components/ProjectDetail/ProjectDetail.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { projects } from '../data/projects.js';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((entry) => entry.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <ProjectDetail
        category={project.category}
        title={project.title}
        content={project.detail.content}
        techs={project.detail.techs}
      />
      <Footer />
    </>
  );
}