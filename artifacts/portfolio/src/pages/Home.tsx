import { useEffect, useRef, Suspense } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { Cube } from "@/components/Cube";
import { CssCube } from "@/components/CssCube";
import { useWebGL } from "@/hooks/useWebGL";
import { BrewHavenProject } from "@/components/BrewHavenProject";

export default function Home() {
  const rightColRef = useRef<HTMLDivElement>(null);
  const webglAvailable = useWebGL();

  useEffect(() => {
    if (!rightColRef.current) return;
    const texts = rightColRef.current.querySelectorAll(".gsap-text");
    gsap.fromTo(
      texts,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <div className="relative overflow-hidden min-h-[calc(100vh-6rem)]">
        <div className="container mx-auto px-4 sm:px-6 min-h-[calc(100vh-6rem)] grid grid-cols-1 md:grid-cols-[1fr_minmax(0,420px)_1fr] items-center gap-6 md:gap-4 py-12 md:py-0">

          {/* LEFT: Introduction */}
          <motion.div
            className="flex flex-col items-start z-10 space-y-5 order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="space-y-1">
              <p className="font-subheading text-secondary text-xl sm:text-2xl">Hello I'm</p>
              <h2 className="font-subheading text-3xl sm:text-4xl text-accent">Aamir Saifi</h2>
            </div>

            <h1
              className="font-heading leading-tight uppercase"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              FRONTEND<br />DEVELOPER
            </h1>

            <p className="text-secondary text-base max-w-xs">
              Building modern web experiences with clean code and creative design.
            </p>

            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Specializing in crafting premium digital interfaces using HTML, CSS, JavaScript,
              Tailwind CSS, and React. I bridge the gap between design and engineering.
            </p>

            <div className="flex items-center space-x-5 pt-2">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform">
                <FaGithub size={22} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform">
                <FaLinkedin size={22} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform">
                <FaEnvelope size={22} />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/projects"
                className="px-6 py-3 bg-accent text-foreground font-bold tracking-widest uppercase text-sm hover:bg-accent/90 transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-border text-foreground font-bold tracking-widest uppercase text-sm hover:border-accent hover:text-accent transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* CENTER: Cube */}
          <div className="order-2 flex items-center justify-center w-full">
            <div
              className="w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ height: "clamp(280px, 45vw, 560px)" }}
            >
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

          {/* RIGHT: Decorative typography */}
          <div
            ref={rightColRef}
            className="order-3 hidden md:flex flex-col items-end justify-center overflow-hidden"
          >
            <h2
              className="gsap-text font-heading text-right leading-none tracking-tighter w-full uppercase text-border select-none"
              style={{ fontSize: "clamp(3rem, 6vw, 8rem)", opacity: 0.12 }}
            >
              CREATE
            </h2>
            <h2
              className="gsap-text font-heading text-right leading-none tracking-tighter w-full uppercase text-foreground select-none"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 7rem)", opacity: 0.1 }}
            >
              BUILD
            </h2>
            <h2
              className="gsap-text font-heading text-right leading-none tracking-tighter w-full uppercase text-accent select-none"
              style={{ fontSize: "clamp(3rem, 6vw, 8rem)", opacity: 0.18 }}
            >
              INNOVATE
            </h2>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-muted-foreground z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <FaChevronDown />
          </motion.div>
        </motion.div>
      </div>

      {/* ── FEATURED PROJECT ── */}
      <BrewHavenProject />
    </div>
  );
}
