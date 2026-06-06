import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const timelineEvents = [
  {
    year: "2023",
    title: "Started learning web development",
    desc: "Began the journey into HTML, CSS, and vanilla JavaScript. Built first static websites and fell in love with the craft of building things for the browser.",
  },
  {
    year: "2024",
    title: "Built multiple projects & improved skills",
    desc: "Mastered frontend fundamentals. Explored frameworks, responsive design, and started working with APIs to build dynamic applications.",
  },
  {
    year: "2025",
    title: "Focused on React & modern tools",
    desc: "Transitioned fully to React, Tailwind CSS, TypeScript, and advanced state management. Created full-stack applications and polished my design sense.",
  },
  {
    year: "Future",
    title: "Building impactful digital products",
    desc: "Continuing to push the boundary with 3D web experiences, creative coding, and building tools that make a real difference to users worldwide.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep dive into your goals, users, and constraints. Define the problem space before touching a line of code.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Wireframes to high-fidelity Figma mockups. Iterate on layout, typography, and visual hierarchy until it feels right.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Clean, modular code written with long-term maintainability in mind. Semantic HTML, accessible interactions, optimized assets.",
  },
  {
    num: "04",
    title: "Testing",
    desc: "Cross-browser, cross-device testing. Lighthouse audits, performance profiling, and accessibility checks before anything ships.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "Deploy with CI/CD, monitor post-launch performance, and iterate based on real-world feedback.",
  },
];

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Dot */}
      <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent z-10"
        style={{ boxShadow: "0 0 14px rgba(255,59,48,0.6)" }} />

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
        <div className="bg-surface/50 border border-border p-6 hover:border-accent/40 transition-colors duration-400 group">
          <span className="text-accent font-mono text-xs font-bold block mb-2 tracking-widest uppercase">{event.year}</span>
          <h4 className="text-base font-bold uppercase tracking-wide text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{event.title}</h4>
          <p className="text-secondary text-sm leading-relaxed">{event.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex gap-6 group"
    >
      <div className="shrink-0 w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-300">
        <span className="text-accent font-mono text-xs font-bold">{step.num}</span>
      </div>
      <div className="pb-8 border-b border-border last:border-0 flex-1">
        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{step.title}</h4>
        <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-24 text-center">
        <h1 className="font-heading text-6xl md:text-7xl tracking-widest mb-2 uppercase">
          ABOUT <span className="text-accent">ME</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">My Journey</p>
      </motion.div>

      {/* Top Section: Portrait + Who I Am */}
      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto mb-32">

        {/* Portrait */}
        <motion.div className="lg:w-1/3 space-y-8"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-surface via-background to-surface border border-border flex items-center justify-center relative overflow-hidden group">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent" />
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center">
              <div className="text-6xl text-accent/20 font-heading mb-2">YN</div>
              <span className="text-muted-foreground text-xs uppercase tracking-widest">Your Photo Here</span>
            </div>
          </div>

          {/* Who I Am */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground whitespace-nowrap">Who I Am</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
            </div>
            <p className="text-secondary leading-relaxed text-sm">
              I'm a meticulous frontend developer focused on crafting highly polished, performant, and accessible digital experiences. I believe that engineering and design are two sides of the same craft — and I care deeply about both.
            </p>
          </div>

          {/* My Goals */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground whitespace-nowrap">My Goals</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
            </div>
            <p className="text-secondary leading-relaxed text-sm">
              To build software that feels intuitive, precise, and alive. I strive to write code that is as elegant as the interfaces it renders — and ship work that genuinely improves people's lives.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="lg:w-2/3" ref={timelineRef}>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground whitespace-nowrap">Timeline</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Desktop center line */}
            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-px overflow-hidden">
              <motion.div className="w-full bg-accent origin-top" style={{ height: lineHeight }} />
            </div>
            {/* Mobile left line */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border overflow-hidden">
              <motion.div className="w-full bg-accent origin-top" style={{ height: lineHeight }} />
            </div>

            <div className="space-y-16">
              {timelineEvents.map((event, i) => (
                <TimelineItem key={i} event={event} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Development Process */}
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="font-heading text-5xl md:text-6xl tracking-widest uppercase mb-3">
            MY <span className="text-accent">PROCESS</span>
          </h2>
          <p className="font-subheading text-2xl text-secondary">How I Build</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-0">
          <div className="space-y-0">
            {processSteps.slice(0, 3).map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
          <div className="space-y-0 lg:pt-16">
            {processSteps.slice(3).map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i + 3} />
            ))}
            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 grid grid-cols-3 gap-4 border border-border bg-surface p-6"
            >
              {[{ num: "20+", label: "Projects Built" }, { num: "100%", label: "Client Satisfaction" }, { num: "2+", label: "Years Experience" }].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-heading text-accent mb-1">{stat.num}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
