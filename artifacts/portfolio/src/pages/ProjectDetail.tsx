import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCheck, FaCopy, FaArrowLeft } from "react-icons/fa";
import { projects } from "@/data/projects";
import { highlightCode } from "@/utils/syntax";

type CodeTab = "Preview" | "HTML" | "CSS" | "JavaScript";

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find(p => p.id === params.id);
  const [activeTab, setActiveTab] = useState<CodeTab>("Preview");
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-8xl font-heading text-accent mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Project not found.</p>
        <Link href="/projects" className="px-6 py-3 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const getCode = () => {
    if (activeTab === "HTML") return project.htmlCode;
    if (activeTab === "CSS") return project.cssCode;
    if (activeTab === "JavaScript") return project.jsCode;
    return "";
  };

  const getLang = (): "html" | "css" | "javascript" => {
    if (activeTab === "HTML") return "html";
    if (activeTab === "CSS") return "css";
    return "javascript";
  };

  const handleCopy = () => {
    const code = getCode();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 bg-surface border-b border-border overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="container mx-auto px-6 pb-8 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map(t => (
                <span key={t} className="text-xs text-accent border border-accent/25 bg-accent/8 px-3 py-1 uppercase tracking-wider">{t}</span>
              ))}
            </div>
            <h1 className="font-heading text-4xl md:text-6xl uppercase tracking-widest">{project.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent text-xs uppercase tracking-widest mb-12 transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Details */}
          <motion.div className="lg:col-span-1 space-y-10"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b border-border pb-2">About</h2>
              <p className="text-secondary text-sm leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b border-border pb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs text-accent border border-accent/25 bg-accent/5 px-3 py-1.5 uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b border-border pb-2">Key Features</h2>
              <ul className="space-y-2.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary text-sm">
                    <span className="text-accent mt-0.5 shrink-0 text-xs">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" data-testid="live-demo-btn"
                className="flex items-center justify-center gap-2 py-3.5 bg-accent text-white uppercase tracking-widest text-xs font-bold hover:bg-accent/85 transition-colors">
                <FaExternalLinkAlt size={11} /> Live Demo
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" data-testid="github-btn"
                className="flex items-center justify-center gap-2 py-3.5 border border-border text-foreground uppercase tracking-widest text-xs font-bold hover:border-foreground transition-colors">
                <FaGithub size={13} /> GitHub
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Code Showcase */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Code Showcase</h2>

            <div className="border border-border bg-card overflow-hidden flex flex-col" style={{ minHeight: 560 }}>
              {/* Tab Bar */}
              <div className="flex border-b border-border bg-surface items-center">
                {(["Preview","HTML","CSS","JavaScript"] as CodeTab[]).map(tab => (
                  <button key={tab} data-testid={`tab-${tab}`} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-card text-accent border-b-2 border-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}>
                    {tab}
                  </button>
                ))}
                <div className="flex-grow" />
                {activeTab !== "Preview" && (
                  <button data-testid="copy-btn" onClick={handleCopy}
                    className="flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                    {copied ? <><FaCheck className="text-green-400" size={11} /> Copied!</> : <><FaCopy size={11} /> Copy</>}
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto" style={{ background: activeTab === "Preview" ? undefined : "#080808" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full">

                    {activeTab === "Preview" ? (
                      <div className="p-8 flex flex-col items-center justify-center min-h-[480px] bg-background/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl text-accent/50">◈</span>
                          </div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Live Preview</p>
                          <p className="font-heading text-xl uppercase tracking-widest">{project.name}</p>
                          <p className="text-secondary text-sm mt-3 max-w-sm">{project.description}</p>
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-accent text-accent uppercase tracking-widest text-xs font-bold hover:bg-accent hover:text-white transition-colors">
                            <FaExternalLinkAlt size={10} /> Open Live Site
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 overflow-auto">
                        {highlightCode(getCode(), getLang())}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
