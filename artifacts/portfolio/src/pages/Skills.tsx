import { motion } from "framer-motion";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTailwindcss, SiReact, 
  SiGit, SiGithub, SiVisualstudiocode, SiFigma 
} from "react-icons/si";

const frontendSkills = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
];

const toolsSkills = [
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="font-heading text-6xl tracking-widest mb-2 uppercase">
          MY <span className="text-accent">SKILLS</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">Technologies I work with</p>
      </motion.div>

      <div className="space-y-24 max-w-5xl mx-auto">
        {/* Frontend Section */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Frontend</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent"></div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {frontendSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative bg-card border border-border p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-accent"
              >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <skill.icon 
                  size={48} 
                  className="text-muted-foreground group-hover:scale-110 transition-transform duration-500" 
                  style={{ transition: 'color 0.5s, transform 0.5s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = skill.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                />
                <span className="text-sm uppercase tracking-widest font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Tools Section */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Tools</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent"></div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {toolsSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative bg-card border border-border p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-accent"
              >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <skill.icon 
                  size={48} 
                  className="text-muted-foreground group-hover:scale-110 transition-transform duration-500"
                  style={{ transition: 'color 0.5s, transform 0.5s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = skill.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                />
                <span className="text-sm uppercase tracking-widest font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
