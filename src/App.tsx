import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FilmClip } from './components/FilmClip';
import { Lessons } from './components/Lessons';
import { ServiceArea } from './components/ServiceArea';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { useReveal } from './hooks/useUI';

export const App: React.FC = () => {
  useReveal();

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <FilmClip />
        <Lessons />
        <ServiceArea />
        <Testimonials />
        <FAQ />
      </main>
      <Contact />
    </>
  );
};

export default App;
