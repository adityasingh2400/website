# Gravitational Portfolio

An innovative portfolio website featuring a novel **Gravitational Orbit Navigation System** - a physics-based UI where your cursor has gravity and pulls project orbs toward it.

## Features

### Novel Navigation System
- **Gravitational Cursor**: Your cursor acts as a gravitational force, pulling nearby project "planets" toward it
- **Capture Mechanic**: Click to capture a project into orbit around your cursor
- **Physics-Based Interaction**: Projects have different masses affecting how they respond to gravity

### Cutting-Edge Technologies
- **WebGL Fluid Metaball Background**: Custom GLSL shaders create organic, living backgrounds
- **Particle Trail System**: Cursor leaves glowing particle trails as you navigate
- **Flow Field Particles**: Simplex noise-driven particle animations in the About section
- **Magnetic Cursor**: Custom cursor that morphs and snaps to interactive elements

### Visual Effects
- **3D Project Spheres**: React Three Fiber powered orbs with distortion materials
- **Smooth Scroll**: Lenis-powered butter-smooth scrolling
- **Page Transitions**: SVG morphing transitions between pages
- **Scroll Animations**: Framer Motion powered reveal animations

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| 3D Engine | React Three Fiber + @react-three/drei |
| Animations | Framer Motion + Lenis |
| Shaders | Custom GLSL (fluid, metaball, noise) |
| Styling | Tailwind CSS |
| Language | TypeScript |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Website

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page with gravitational navigation
│   ├── globals.css         # Global styles
│   └── projects/[slug]/    # Dynamic project pages
├── components/
│   ├── canvas/             # 3D scene components
│   │   ├── GravitationalScene.tsx
│   │   ├── ProjectSphere.tsx
│   │   ├── FluidBackground.tsx
│   │   ├── ParticleTrails.tsx
│   │   └── shaders/        # GLSL shader files
│   ├── ui/                 # UI components
│   │   ├── MagneticCursor.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── AboutSection.tsx
│   │   └── Navigation.tsx
│   └── providers/          # Context providers
├── lib/                    # Utilities and data
│   ├── physics.ts          # Gravitational physics calculations
│   ├── projects.ts         # Project data
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
```

## Customization

### Adding Projects

Edit `lib/projects.ts` to add your own projects:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    slug: 'my-project',
    title: 'My Project',
    description: 'Short description',
    longDescription: 'Detailed description...',
    technologies: ['React', 'Node.js'],
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    mass: 4, // 1-5, affects gravitational behavior
    link: 'https://example.com',
    github: 'https://github.com/...',
  },
  // Add more projects...
];
```

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --accent-purple: #8b5cf6;
  --accent-cyan: #06b6d4;
  --accent-pink: #ec4899;
}
```

## Performance Notes

- The 3D scene uses `dynamic` import with SSR disabled for optimal loading
- Particle systems are optimized with buffer geometries
- Shaders run on GPU for smooth 60fps animations
- Images should be optimized before adding to `/public`

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lenis](https://lenis.studiofreight.com/)
