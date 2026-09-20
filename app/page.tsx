import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
