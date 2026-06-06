import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCheck, FaCopy } from "react-icons/fa";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find(p => p.id === params.id);
  const [activeTab, setActiveTab] = useState<"Preview" | "HTML" | "CSS" | "JavaScript">("Preview");
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-heading text-accent mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Project not found.</p>
        <Link href="/projects" className="px-6 py-3 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "HTML") textToCopy = project.htmlCode;
    if (activeTab === "CSS") textToCopy = project.cssCode;
    if (activeTab === "JavaScript") textToCopy = project.jsCode;
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCodeForTab = () => {
    switch (activeTab) {
      case "HTML": return project.htmlCode;
      case "CSS": return project.cssCode;
      case "JavaScript": return project.jsCode;
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <Link href="/projects" className="text-muted-foreground hover:text-accent text-sm uppercase tracking-widest mb-12 inline-block transition-colors">
        &larr; Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Details */}
        <motion.div 
          className="lg:col-span-1 space-y-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-5xl font-heading mb-4 leading-tight uppercase">{project.name}</h1>
            <p className="text-secondary text-lg leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4 border-b border-border pb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs text-accent border border-accent/20 bg-accent/5 px-3 py-1.5 uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4 border-b border-border pb-2">Key Features</h3>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary text-sm">
                  <FaCheck className="text-accent mt-1 shrink-0" size={12} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 bg-accent text-white uppercase tracking-widest text-sm font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
              <FaExternalLinkAlt /> Live Site
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 border border-border text-foreground uppercase tracking-widest text-sm font-bold hover:border-foreground transition-colors flex items-center justify-center gap-2">
              <FaGithub /> Source
            </a>
          </div>
        </motion.div>

        {/* Right Column: Code/Preview Showcase */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border border-border bg-card overflow-hidden h-full flex flex-col min-h-[600px]">
            {/* Tabs Header */}
            <div className="flex border-b border-border bg-surface">
              {(["Preview", "HTML", "CSS", "JavaScript"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab ? "bg-card text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 flex-grow relative bg-background/50">
              {activeTab === "Preview" ? (
                <div className="w-full h-full min-h-[400px] border border-border/50 bg-surface rounded flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground mb-4">Live preview placeholder for {project.name}</p>
                    <div className="w-full max-w-sm h-48 bg-gradient-to-br from-surface to-background border border-border rounded shadow-xl flex items-center justify-center">
                      <span className="text-accent/50 font-heading text-2xl uppercase opacity-50">Preview</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-surface border border-border text-muted-foreground hover:text-accent transition-colors rounded"
                    title="Copy Code"
                  >
                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                  <pre className="font-mono text-sm leading-relaxed text-secondary overflow-x-auto p-4 h-full">
                    <code>
                      {getCodeForTab().split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell text-right pr-4 text-muted select-none opacity-50 border-r border-border/30 mr-4">
                            {i + 1}
                          </span>
                          <span className="table-cell pl-4 text-foreground/80">{line || ' '}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
