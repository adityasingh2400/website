import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/ui/Hero';
import { VoiceAgent } from '@/components/ui/VoiceAgent';
import { OpenSource } from '@/components/ui/OpenSource';
import { Experience } from '@/components/ui/Experience';
import { Projects } from '@/components/ui/Projects';
import { Fun } from '@/components/ui/Fun';
import { Footer } from '@/components/ui/Footer';
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
        <OpenSource />
        <Experience />
        <Projects projects={projects} />
        <Fun />
      </main>
      <Footer />
    </>
  );
}
