import { useEffect, useRef, Suspense } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { Cube } from "@/components/Cube";
import { CssCube } from "@/components/CssCube";
import { useWebGL } from "@/hooks/useWebGL";

export default function Home() {
  const rightColRef = useRef<HTMLDivElement>(null);
  const webglAvailable = useWebGL();

  useEffect(() => {
    if (!rightColRef.current) return;
    const texts = rightColRef.current.querySelectorAll('.gsap-text');
    
    gsap.fromTo(
      texts,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <div className="min-h-[calc(100vh-6rem)] relative flex flex-col md:flex-row items-center justify-between px-6 container mx-auto gap-8">
      
      {/* LEFT COLUMN */}
      <motion.div 
        className="w-full md:w-1/3 flex flex-col items-start z-10 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <div className="space-y-1">
          <p className="font-subheading text-secondary text-2xl">Hello I'm</p>
          <h2 className="font-subheading text-4xl text-foreground">Your Name</h2>
        </div>
        
        <h1 className="font-heading text-6xl md:text-7xl leading-tight">
          FRONTEND<br/>DEVELOPER
        </h1>
        
        <p className="text-secondary text-lg max-w-sm">
          Building modern web experiences with clean code and creative design.
        </p>
        
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          Specializing in crafting premium digital interfaces using HTML, CSS, JavaScript, Tailwind CSS, and React. I bridge the gap between design and engineering.
        </p>

        <div className="flex items-center space-x-6 pt-4">
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110"><FaGithub size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110"><FaLinkedin size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110"><FaTwitter size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110"><FaEnvelope size={24} /></a>
        </div>

        <div className="flex space-x-4 pt-4">
          <Link href="/projects" className="px-8 py-3 bg-accent text-foreground font-bold tracking-widest uppercase text-sm hover:bg-accent/90 transition-colors">
            View Projects
          </Link>
          <Link href="/contact" className="px-8 py-3 border border-border text-foreground font-bold tracking-widest uppercase text-sm hover:border-accent hover:text-accent transition-colors">
            Contact Me
          </Link>
        </div>
      </motion.div>

      {/* CENTER COLUMN (3D Canvas with CSS fallback) */}
      <div className="w-full h-[50vh] md:h-auto md:w-1/3 absolute md:relative inset-0 md:inset-auto z-0 opacity-40 md:opacity-100 flex items-center justify-center pointer-events-none md:pointer-events-auto">
        <div className="w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing">
          {webglAvailable ? (
            <Suspense fallback={<CssCube />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Cube />
              </Canvas>
            </Suspense>
          ) : (
            <CssCube />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div 
        ref={rightColRef}
        className="w-full md:w-1/3 hidden md:flex flex-col items-end justify-center z-10 space-y-4"
      >
        <h2 className="gsap-text font-heading text-8xl xl:text-[8rem] text-border text-right leading-none tracking-tighter w-full uppercase">
          CREATE
        </h2>
        <h2 className="gsap-text font-heading text-7xl xl:text-[7rem] text-muted text-right leading-none tracking-tighter w-full uppercase">
          BUILD
        </h2>
        <h2 className="gsap-text font-heading text-8xl xl:text-[8rem] text-accent text-right leading-none tracking-tighter w-full uppercase">
          INNOVATE
        </h2>
      </div>

      {/* Scroll Down */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-muted-foreground z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>

    </div>
  );
}
