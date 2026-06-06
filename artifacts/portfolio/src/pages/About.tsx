import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    year: "2023",
    title: "Started learning web development",
    desc: "Began the journey into HTML, CSS, and vanilla JavaScript. Built first static sites."
  },
  {
    year: "2024",
    title: "Built multiple projects & improved skills",
    desc: "Mastered frontend fundamentals. Explored frameworks and responsive design principles."
  },
  {
    year: "2025",
    title: "Focused on React & modern tools",
    desc: "Transitioned to React, Tailwind CSS, and advanced state management. Created full applications."
  },
  {
    year: "Future",
    title: "Building impactful digital products",
    desc: "Continuing to push boundaries with 3D web experiences, performance optimization, and creative coding."
  }
];

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="font-heading text-6xl tracking-widest mb-2 uppercase">
          ABOUT <span className="text-accent">ME</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">My Journey</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
        {/* Left: Portrait & Intro */}
        <motion.div 
          className="lg:w-1/3 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Portrait Placeholder */}
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-surface to-background border border-border flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <span className="text-muted-foreground uppercase tracking-widest text-xs">Portrait Placeholder</span>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Who I Am</h3>
            <p className="text-secondary leading-relaxed text-sm">
              I am a meticulous frontend developer focused on crafting highly polished, performant, and accessible digital experiences. I believe that engineering and design are not separate disciplines, but two sides of the same craft.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">My Goals</h3>
            <p className="text-secondary leading-relaxed text-sm">
              To build software that feels intuitive, precise, and alive. I strive to write code that is as elegant as the interfaces it renders.
            </p>
          </div>
        </motion.div>

        {/* Right: Timeline */}
        <div className="lg:w-2/3" ref={targetRef}>
          <h3 className="text-2xl font-bold uppercase tracking-widest mb-12 border-b border-border pb-4">Timeline</h3>
          
          <div className="relative pl-8 md:pl-0">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-border -translate-x-[0.5px]">
              <motion.div 
                className="w-full bg-accent origin-top"
                style={{ height }}
              />
            </div>

            {/* Mobile Left Line */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-[1px] bg-border">
              <motion.div 
                className="w-full bg-accent origin-top"
                style={{ height }}
              />
            </div>

            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_10px_rgba(255,59,48,0.5)]" />

                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                      <div className="bg-surface/50 border border-border p-6 hover:border-accent/50 transition-colors duration-300">
                        <span className="text-accent font-mono text-sm font-bold block mb-2">{event.year}</span>
                        <h4 className="text-lg font-bold uppercase tracking-wide text-foreground mb-3">{event.title}</h4>
                        <p className="text-secondary text-sm leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
