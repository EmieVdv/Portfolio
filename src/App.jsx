import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import SectionTitle from './components/SectionTitle/SectionTitle.jsx'
import ProjectPreview from './components/ProjectPreview/ProjectPreview.jsx'
import { projects } from './data/projects';
import Footer from './components/Footer/Footer.jsx'
import { useSectionSnap } from './hooks/useSectionSnap.js';



function App() {
  useSectionSnap(); // custom hook to enable section snapping

  return (
    <>
        <Navbar />
        <Hero />
        <SectionTitle id="projects" text="Projects" hint="Scroll to continue" />

      {projects.map((project) => (
          <ProjectPreview key={project.slug} {...project} />
        
      ))}

      <Footer />

    </>
  )
}

export default App
