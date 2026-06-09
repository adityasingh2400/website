import { Navigation } from '@/components/ui/Navigation';
import { Intro } from '@/components/ui/Intro';
import { Projects } from '@/components/ui/Projects';
import { OpenSource } from '@/components/ui/OpenSource';
import { Milestones } from '@/components/ui/Milestones';
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
        <Intro />
        <Projects projects={projects} />
        <OpenSource />
        <Milestones />
        <Fun />
      </main>
      <Footer />
    </>
  );
}
