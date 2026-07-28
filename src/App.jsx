import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import SectionTitle from './components/SectionTitle/SectionTitle.jsx'


function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <SectionTitle text="Projects" hint="Scroll to continue" />
    </>
  )
}

export default App
