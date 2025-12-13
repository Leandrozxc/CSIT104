import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- DATA ---
const STUDENT_NAME = "Leandro Miguel A. Pabatao";
const STUDENT_ROLE = "BSCS - 2, F3";
const PORTFOLIO_TITLE = "CSIT104 Portfolio";

const PROJECTS = [
  {
    id: 1,
    title: "Act 1 - Wallpaper Design",
    category: "Graphics",
    description: "A creative digital wallpaper design exploring pixel art techniques and color theory using MS Paint. This project challenged me to create depth and texture with limited tools.",
    tools: ["MS Paint"],
    date: "August 2025",
    image: "https://i.imgur.com/4Jo4pWS.png",
    type: "image"
  },
  {
    id: 2,
    title: "Act 2 - Branding Moodboard",
    category: "Graphics",
    description: "A cohesive visual collection establishing the color palette, typography, and general aesthetic for a potential brand identity. Curated to convey a specific emotional tone.",
    tools: ["Canva", "Pinterest"],
    date: "August 2025",
    image: "https://i.imgur.com/KuCb0KW.jpeg",
    type: "image"
  },
  {
    id: 3,
    title: "Act 3 - Logo Designs",
    category: "Graphics",
    description: "A series of vector-based logo concepts focusing on scalability, minimalism, and brand recognition. Includes sketches, iterations, and final polished vectors.",
    tools: ["Canva"],
    date: "September 2025",
    image: "https://i.imgur.com/qVLvmU8.png",
    type: "image"
  },
  {
    id: 4,
    title: "Act 4 - Brochures",
    category: "Print",
    description: "A tri-fold brochure layout designed to balance information density with visual appeal and readability for print media. Focuses on hierarchy and grid systems.",
    tools: ["Canva"],
    date: "September 2025",
    image: "https://i.imgur.com/e1jpSQo.png",
    type: "image"
  },
  {
    id: 5,
    title: "Act 5 - Event Flyers",
    category: "Print",
    description: "High-impact flyer designs created for both digital and print distribution to promote fictional local events. Utilizes typography as a primary visual element.",
    tools: ["Canva"],
    date: "October 2025",
    image: "https://i.imgur.com/aSvEcTQ.png",
    type: "image"
  },
  {
    id: 6,
    title: "Business Card",
    category: "Print",
    description: "A professional business card layout utilizing print-ready settings, bleed margins, and modern typography to create a memorable first impression.",
    tools: ["Canva"],
    date: "October 2025",
    image: "https://i.imgur.com/nvb47bF.png",
    type: "image"
  },
  {
    id: 7,
    title: "2026 Calendar",
    category: "Print",
    description: "A functional and artistic calendar design for the year 2026, featuring custom layouts and thematic illustrations for each month. Demonstrates multi-page document management.",
    tools: ["Canva"],
    date: "November 2025",
    image: "https://i.imgur.com/0k12oDJ.png",
    type: "image"
  },
  {
    id: 8,
    title: "Mobile App Prototype",
    category: "UI/UX",
    description: "A high-fidelity user interface prototype demonstrating user flow, interactive elements, and visual consistency for a mobile application concept.",
    tools: ["Figma"],
    date: "December 2025",
    image: "https://i.imgur.com/QtiQ1CQ.png",
    type: "image"
  }
];

// --- ICONS ---
const Icons = {
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Music: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Tool: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

// --- COMPONENTS ---

const Header = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
      <div className="font-display font-bold text-lg md:text-xl tracking-tight text-white">
        {STUDENT_NAME}
      </div>
      <div className="hidden md:block h-6 w-px bg-white/20"></div>
      <div className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit">
        {STUDENT_ROLE}
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 pt-16">
    {/* Background Decorative Elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float opacity-70"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }}></div>

    <div className="text-center z-10 max-w-4xl animate-fade-in flex flex-col items-center">
      <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
        <p className="text-primary font-medium tracking-widest uppercase text-xs">Final Project Portfolio</p>
      </div>
      
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
        Designing the <br/>
        <span className="text-gradient">Multimedia Experience</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
        Welcome to my showcase for CSIT104. A curated collection of digital works exploring the intersection of technology and creativity, ranging from MS Paint pixel art to high-fidelity Figma prototypes.
      </p>
    </div>
  </section>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const isBrochure = project.title === "Act 4 - Brochures";

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative bg-surface border border-white/10 rounded-3xl w-full ${isBrochure ? 'max-w-7xl' : 'max-w-5xl'} max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-fade-in overflow-hidden`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all text-white border border-white/10 group"
          title="Close"
        >
          <Icons.X />
        </button>

        {/* Media Side */}
        <div className={`w-full ${isBrochure ? 'md:w-3/4' : 'md:w-1/2'} bg-black/50 flex items-center justify-center min-h-[300px] p-0 md:p-0`}>
           <img 
              src={project.image} 
              alt={project.title} 
              className={`w-full h-full ${isBrochure ? 'object-contain max-h-[85vh] py-8' : 'object-cover'}`}
            />
        </div>

        {/* Info Side */}
        <div className={`w-full ${isBrochure ? 'md:w-1/4' : 'md:w-1/2'} p-8 md:p-10 flex flex-col border-l border-white/5 bg-surface`}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
             <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase rounded-full tracking-wider border border-primary/20">
               {project.category}
             </span>
             <div className="flex items-center gap-1 text-gray-400 text-xs font-mono">
               <Icons.Calendar />
               <span>{project.date}</span>
             </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">{project.title}</h2>
          
          <div className="prose prose-invert prose-lg mb-8 text-gray-300 leading-relaxed font-light">
            <p>{project.description}</p>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Icons.Tool /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-200 hover:bg-white/10 transition-colors cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-xs mb-2 block">My Work</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Projects through the semester</h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed text-right hidden md:block">
            A comprehensive overview of coursework completed for the Platform-based Development module.
          </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map(project => {
          const isBrochure = project.title === "Act 4 - Brochures";
          return (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 bg-surface ${
                  isBrochure ? 'md:col-span-2 md:aspect-[2/1]' : 'aspect-[4/3]'
              }`}
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-darker via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded border border-primary/20 backdrop-blur-sm">
                    {project.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        <Icons.ArrowRight />
                    </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300 font-light">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

const About = () => {
  const allTools = Array.from(new Set(PROJECTS.flatMap(p => p.tools)));

  return (
    <section id="about" className="py-24 bg-surface/30 relative overflow-hidden scroll-mt-20 border-t border-white/5">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
                <div>
                    <span className="text-primary font-medium tracking-widest uppercase text-xs mb-3 block">The Context</span>
                    <h2 className="text-4xl font-display font-bold mb-6">About The Course</h2>
                </div>
                
                <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
                    <p>
                        CSIT104 <strong>Platform-based Development 1 (Multimedia)</strong> has been an intensive exploration of the digital canvas. From the creative constraints of pixel art in MS Paint to the vector precision of Figma, this course has challenged me to communicate effectively through visual media.
                    </p>
                    <p>
                        This portfolio acts as a curation of my growth in understanding color theory, typography, layout hierarchy, and user experience design over the semester.
                    </p>
                </div>
            </div>
            
            <div className="glass p-10 rounded-3xl border border-white/5 mt-8 md:mt-0">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <Icons.Tool />
                    </div>
                    Tools Used
                </h3>
                <div className="flex flex-wrap gap-3">
                    {allTools.map(tool => (
                        <span key={tool} className="px-4 py-2 bg-dark/50 border border-white/10 rounded-full text-gray-300 text-sm hover:border-primary/50 hover:text-primary transition-all cursor-default shadow-lg shadow-black/20">
                            {tool}
                        </span>
                    ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                   <p className="text-sm text-gray-500 italic">
                     "Design is not just what it looks like and feels like. Design is how it works."
                   </p>
                </div>
            </div>
        </div>
        </div>
    </section>
  );
}

const Footer = () => (
  <footer id="contact" className="py-16 bg-darker border-t border-white/10 text-center">
    <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        <div className="font-display font-bold text-2xl tracking-tighter text-white mb-2">
          CSIT<span className="text-primary">104</span>
        </div>
        <h3 className="font-bold text-xl text-white mb-1">{STUDENT_NAME}</h3>
        <p className="text-gray-500 text-sm mb-8">{STUDENT_ROLE}</p>

        <div className="text-gray-600 text-xs tracking-wide">
        &copy; {new Date().getFullYear()} Multimedia Portfolio. All rights reserved.
        </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-white font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <About />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
