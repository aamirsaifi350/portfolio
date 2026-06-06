import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiTailwindcss, SiReact,
  SiGit, SiGithub, SiVscodium, SiFigma,
  SiTypescript, SiNodedotjs, SiThreedotjs, SiFramer, SiGreensock,
} from "react-icons/si";

const frontendSkills = [
  { name: "HTML5",       icon: SiHtml5,       color: "#E34F26", level: 95 },
  { name: "CSS3",        icon: SiCss,         color: "#1572B6", level: 92 },
  { name: "JavaScript",  icon: SiJavascript,  color: "#F7DF1E", level: 88 },
  { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6", level: 78 },
  { name: "Tailwind CSS",icon: SiTailwindcss, color: "#38B2AC", level: 90 },
  { name: "React",       icon: SiReact,       color: "#61DAFB", level: 85 },
];

const librariesSkills = [
  { name: "Three.js",      icon: SiThreedotjs,  color: "#FFFFFF", level: 72 },
  { name: "Framer Motion", icon: SiFramer,      color: "#BB4BFF", level: 80 },
  { name: "GSAP",          icon: SiGreensock,   color: "#88CE02", level: 74 },
  { name: "Node.js",       icon: SiNodedotjs,   color: "#339933", level: 65 },
];

const toolsSkills = [
  { name: "Git",     icon: SiGit,      color: "#F05032", level: 85 },
  { name: "GitHub",  icon: SiGithub,   color: "#FFFFFF", level: 88 },
  { name: "VS Code", icon: SiVscodium, color: "#007ACC", level: 92 },
  { name: "Figma",   icon: SiFigma,    color: "#F24E1E", level: 70 },
];

const softSkills = [
  { title: "Problem Solving",    desc: "Breaking complex problems into simple, elegant solutions." },
  { title: "Attention to Detail", desc: "Pixel-perfect implementation and obsessive code quality." },
  { title: "Communication",      desc: "Clear, concise writing and documentation skills." },
  { title: "Continuous Learning", desc: "Staying current with the rapidly evolving frontend landscape." },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground">{name}</span>
        <span className="text-xs font-mono text-accent">{level}%</span>
      </div>
      <div className="h-[2px] bg-border overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent/60 origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: typeof frontendSkills[0] }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="group relative bg-card border border-border p-6 flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:border-accent cursor-default"
    >
      <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
      <skill.icon
        size={44}
        className="text-muted-foreground transition-all duration-500 group-hover:scale-110"
        style={{ transition: "color 0.4s, transform 0.5s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = skill.color)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "")}
      />
      <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground group-hover:text-accent transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function Skills() {
  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-20 text-center">
        <h1 className="font-heading text-6xl md:text-7xl tracking-widest mb-2 uppercase">
          MY <span className="text-accent">SKILLS</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">Technologies I work with</p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Frontend Skills (Cards) ── */}
        <section>
          <SectionHeading label="Core Frontend" />
          <motion.div
            variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {frontendSkills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
          </motion.div>
        </section>

        {/* ── Proficiency Bars ── */}
        <section>
          <SectionHeading label="Proficiency" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {[...frontendSkills, ...librariesSkills].map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.06} />
            ))}
          </div>
        </section>

        {/* ── Libraries & Frameworks ── */}
        <section>
          <SectionHeading label="Libraries & Frameworks" />
          <motion.div
            variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {librariesSkills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
          </motion.div>
        </section>

        {/* ── Tools ── */}
        <section>
          <SectionHeading label="Tools & Environment" />
          <motion.div
            variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {toolsSkills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
          </motion.div>
        </section>

        {/* ── Soft Skills ── */}
        <section>
          <SectionHeading label="Professional Strengths" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {softSkills.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-card border border-border hover:border-accent/40 transition-colors duration-400 group"
              >
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                  <span className="text-accent font-mono text-xs font-bold">0{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-1 group-hover:text-accent transition-colors duration-300">{s.title}</h4>
                  <p className="text-secondary text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-foreground whitespace-nowrap">{label}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
    </div>
  );
}
