import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/ui/Hero';
import { VoiceAgent } from '@/components/ui/VoiceAgent';
import { About } from '@/components/ui/About';
import { Experience } from '@/components/ui/Experience';
import { Education } from '@/components/ui/Education';
import { Projects } from '@/components/ui/Projects';
import { Contact } from '@/components/ui/Contact';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { getPinnedProjects } from '@/lib/projects';

export const revalidate = 60 * 60;

export default async function Home() {
  const projects = await getPinnedProjects();

  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <VoiceAgent />
        <About />
        <Experience />
        <Education />
        <Projects projects={projects} />
        <Contact />
      </main>
    </>
  );
}
