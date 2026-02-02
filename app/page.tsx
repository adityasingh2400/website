import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/ui/Hero';
import { About } from '@/components/ui/About';
import { Projects } from '@/components/ui/Projects';
import { Contact } from '@/components/ui/Contact';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
