import { useReveal } from './lib/motion';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Work from './sections/Work';
import Process from './sections/Process';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
