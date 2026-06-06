import { useState } from "react";
import { motion } from "framer-motion";
import { FaCopy, FaCheck } from "react-icons/fa";

const componentsList = [
  "Animated Navbar",
  "Glass Card",
  "Pricing Section",
  "Hero Section",
  "Buttons",
  "Modals",
  "Accordions",
  "Hover Cards",
  "3D Cards"
];

export default function Components() {
  const [activeComp, setActiveComp] = useState(componentsList[0]);
  const [activeTab, setActiveTab] = useState<"HTML" | "CSS" | "JavaScript">("HTML");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<div class="preview">${activeComp}</div>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="font-heading text-5xl tracking-widest uppercase text-foreground">
          COMPONENT <span className="text-accent">LIBRARY</span>
        </h1>
        <p className="text-secondary mt-4 max-w-xl">
          A collection of premium, reusable UI components built with modern web technologies. Ready to drop into your next project.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/4 border-r border-border pr-8"
        >
          <ul className="space-y-2">
            {componentsList.map((comp) => (
              <li key={comp}>
                <button
                  onClick={() => setActiveComp(comp)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                    activeComp === comp
                      ? "bg-accent/10 border-l-2 border-accent text-accent"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground border-l-2 border-transparent"
                  }`}
                >
                  {comp}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Main Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-3/4 flex flex-col gap-8"
        >
          {/* Live Preview */}
          <div className="border border-border bg-card rounded-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border bg-surface flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">Live Preview</h3>
            </div>
            <div className="p-12 min-h-[300px] flex items-center justify-center bg-background/50 relative overflow-hidden">
              {/* Decorative grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              {/* Component Placeholder */}
              <div className="relative z-10 p-8 border border-accent/20 bg-card/80 backdrop-blur shadow-2xl rounded text-center">
                <p className="text-accent uppercase tracking-widest font-bold mb-2">Rendering:</p>
                <h4 className="text-2xl font-heading">{activeComp}</h4>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="border border-border bg-card rounded-sm overflow-hidden flex flex-col">
            <div className="flex border-b border-border bg-surface">
              {(["HTML", "CSS", "JavaScript"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab ? "bg-card text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div className="flex-grow flex items-center justify-end pr-4">
                <button 
                  onClick={handleCopy}
                  className="p-2 text-muted-foreground hover:text-accent transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
            </div>
            <div className="p-6 bg-[#0a0a0a] h-64 overflow-y-auto">
              <pre className="font-mono text-sm text-secondary">
                <code>
                  {`// Implementation code for ${activeComp}\n// View source for full details`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
