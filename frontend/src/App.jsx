import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider }  from './context/ToastContext';
import CustomCursor from './components/CustomCursor';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Experience  from './components/Experience';
import Education   from './components/Education';
import Services    from './components/Services';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import Admin       from './pages/Admin';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/"      element={<HomePage />} />
          <Route path="/admin" element={<Admin />}    />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
