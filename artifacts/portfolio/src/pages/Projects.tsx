import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";

const FILTERS = ["All", "HTML", "CSS", "JavaScript", "Tailwind", "React"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="font-heading text-6xl tracking-widest mb-2 uppercase">
          MY <span className="text-accent">PROJECTS</span>
        </h1>
        <p className="font-subheading text-3xl text-secondary">Things I've Built</p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 border ${
              activeFilter === filter 
                ? "border-accent text-accent bg-accent/10" 
                : "border-border text-muted-foreground hover:border-muted-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        layout
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative border border-border bg-card p-6 flex flex-col h-full hover:border-accent/50 transition-colors duration-500"
          >
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs text-muted-foreground bg-surface px-2 py-1 uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold font-heading mb-3">{project.name}</h3>
            <p className="text-secondary text-sm flex-grow mb-8 line-clamp-3">
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <Link href={`/projects/${project.id}`} className="text-accent uppercase tracking-widest text-xs font-bold hover:text-white transition-colors flex items-center gap-2 group-hover:pl-2 duration-300">
                View Project <span>&rarr;</span>
              </Link>
              
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-10 scale-105 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
