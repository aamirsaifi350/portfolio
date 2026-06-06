import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck } from "react-icons/fa";
import { highlightCode } from "@/utils/syntax";
import { componentsData } from "@/data/components-data";

type CodeTab = "HTML" | "CSS" | "JavaScript";

/* ─── Live Preview Components ─── */

function NavbarPreview() {
  return (
    <div style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.06)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <span style={{ fontWeight: 700, letterSpacing: "0.15em", fontSize: 14, textTransform: "uppercase" }}>
        PORTFOLIO<span style={{ color: "#FF3B30" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {["Home","About","Work","Contact"].map(l => (
          <span key={l} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <span style={{ padding: "6px 14px", border: "1px solid #FF3B30", color: "#FF3B30", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Hire Me</span>
    </div>
  );
}

function GlassCardPreview() {
  return (
    <div style={{ padding: "2rem 1.75rem", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", maxWidth: 260, position: "relative" }}>
      <div style={{ fontSize: 24, color: "#FF3B30", marginBottom: 12 }}>✦</div>
      <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", margin: "0 0 8px" }}>Premium Feature</h3>
      <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7, margin: "0 0 16px" }}>Beautiful glassmorphism card with frosted glass effect, subtle glow, and smooth hover.</p>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FF3B30", cursor: "pointer" }}>Learn More →</span>
    </div>
  );
}

function PricingPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: "100%", maxWidth: 600 }}>
      {[{ name: "Starter", price: "$0", features: ["5 Projects","Basic Analytics"], featured: false },
        { name: "Pro", price: "$29", features: ["Unlimited Projects","Priority Support"], featured: true },
        { name: "Enterprise", price: "$99", features: ["Everything in Pro","Dedicated Manager"], featured: false }
      ].map(plan => (
        <div key={plan.name} style={{ padding: "1.25rem", background: plan.featured ? "linear-gradient(135deg,#0E0E0E,#1a0000)" : "#0E0E0E", border: `1px solid ${plan.featured ? "#FF3B30" : "rgba(255,255,255,0.08)"}` }}>
          {plan.featured && <span style={{ display: "inline-block", padding: "2px 8px", background: "#FF3B30", color: "#fff", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Popular</span>}
          <p style={{ fontSize: 10, color: "#888", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>{plan.name}</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>{plan.price}<span style={{ fontSize: 12, color: "#888" }}>/mo</span></p>
          {plan.features.map(f => <p key={f} style={{ fontSize: 11, color: "#666", margin: "4px 0" }}>✓ {f}</p>)}
          <div style={{ marginTop: 12, padding: "6px", textAlign: "center", border: `1px solid ${plan.featured ? "#FF3B30" : "rgba(255,255,255,0.1)"}`, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: plan.featured ? "#FF3B30" : "#888", cursor: "pointer" }}>Get Started</div>
        </div>
      ))}
    </div>
  );
}

function HeroPreview() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem", width: "100%" }}>
      <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#FF3B30", margin: "0 0 12px" }}>Welcome to my portfolio</p>
      <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Building <span style={{ color: "#FF3B30" }}>Digital</span> Experiences</h2>
      <p style={{ fontSize: 13, color: "#888", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.7 }}>Premium frontend development with clean code and pixel-perfect execution.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <span style={{ padding: "8px 20px", background: "#FF3B30", color: "#fff", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>View Projects</span>
        <span style={{ padding: "8px 20px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Contact Me</span>
      </div>
    </div>
  );
}

function ButtonsPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "1rem", alignItems: "center" }}>
      {[
        { label: "Primary", bg: "#FF3B30", color: "#fff", border: "#FF3B30" },
        { label: "Ghost", bg: "transparent", color: "#fff", border: "rgba(255,255,255,0.15)" },
        { label: "Outline", bg: "transparent", color: "#FF3B30", border: "#FF3B30" },
        { label: "Danger", bg: "transparent", color: "#ef4444", border: "#ef4444" },
      ].map(b => (
        <button key={b.label} style={{ padding: "8px 18px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: b.bg, color: b.color, border: `1px solid ${b.border}`, cursor: "pointer", transition: "all 0.3s" }}>{b.label}</button>
      ))}
      <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }} style={{ padding: "8px 18px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: loading ? "rgba(255,59,48,0.3)" : "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        {loading && <span style={{ width: 10, height: 10, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />}
        {loading ? "Loading..." : "Click Me"}
      </button>
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <button data-testid="modal-open-btn" onClick={() => setOpen(true)} style={{ padding: "10px 24px", background: "#FF3B30", color: "#fff", border: "none", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Open Modal</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 20 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "#0E0E0E", border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem", maxWidth: 360, width: "90%", textAlign: "center", position: "relative" }}>
              <button data-testid="modal-close-btn" onClick={() => setOpen(false)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#555", fontSize: 16, cursor: "pointer" }}>✕</button>
              <div style={{ fontSize: 28, color: "#FF3B30", marginBottom: 12 }}>✦</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", margin: "0 0 8px" }}>Confirm Action</h3>
              <p style={{ fontSize: 12, color: "#888", lineHeight: 1.7, margin: "0 0 20px" }}>Are you sure you want to proceed? This action cannot be undone once confirmed.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button data-testid="modal-confirm-btn" onClick={() => setOpen(false)} style={{ padding: "8px 20px", background: "#FF3B30", color: "#fff", border: "none", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Confirm</button>
                <button data-testid="modal-cancel-btn" onClick={() => setOpen(false)} style={{ padding: "8px 20px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccordionPreview() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    { q: "What technologies do you use?", a: "React, TypeScript, Tailwind CSS, Three.js, Framer Motion, GSAP, and Node.js." },
    { q: "How long does a project take?", a: "A typical project takes 2–6 weeks depending on scope and complexity." },
    { q: "Do you offer design services?", a: "Yes — I can work from Figma or design the entire UI/UX from scratch." },
    { q: "What is your development process?", a: "Discovery → Design → Development → Testing → Launch." },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button data-testid={`accordion-trigger-${i}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0", background: "none", border: "none", color: openIdx === i ? "#fff" : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "color 0.3s" }}>
            <span>{item.q}</span>
            <span style={{ color: "#FF3B30", transition: "transform 0.4s", transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginLeft: 12 }}>↓</span>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                <p style={{ fontSize: 12, color: "#666", lineHeight: 1.7, margin: "0 0 1rem" }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function HoverCardsPreview() {
  const cards = [
    { num: "01", icon: "⬡", title: "UI Design", desc: "Pixel-perfect interfaces." },
    { num: "02", icon: "◈", title: "Development", desc: "Clean, maintainable code." },
    { num: "03", icon: "◎", title: "Animation", desc: "Fluid motion design." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: "100%" }}>
      {cards.map((card) => (
        <motion.div key={card.num} whileHover={{ y: -8, borderColor: "rgba(255,59,48,0.3)" }}
          style={{ padding: "1.25rem 1rem", background: "#0E0E0E", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 10, letterSpacing: "0.2em", color: "#FF3B30" }}>
            <span>{card.num}</span><span style={{ fontSize: 16, color: "#333" }}>{card.icon}</span>
          </div>
          <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", margin: "0 0 6px" }}>{card.title}</h4>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ThreeDCardPreview() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  return (
    <div style={{ perspective: 800, width: 220, height: 280 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        setRot({ x: -((y - r.height/2) / r.height) * 18, y: ((x - r.width/2) / r.width) * 18 });
        setMx((x / r.width) * 100); setMy((y / r.height) * 100);
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}>
      <motion.div animate={{ rotateX: rot.x, rotateY: rot.y }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#111,#0a0a0a)", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.06) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, background: "linear-gradient(135deg, #1a0000, #050505)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem" }}>
          <span style={{ display: "block", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF3B30", marginBottom: 6 }}>Featured Project</span>
          <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", color: "#fff", margin: "0 0 6px", letterSpacing: "0.05em" }}>Weather App</h3>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6, margin: "0 0 10px" }}>Real-time weather with dynamic backgrounds.</p>
          <div style={{ display: "flex", gap: 4 }}>
            {["HTML","CSS","JS"].map(t => <span key={t} style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", padding: "2px 6px", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const LIVE_PREVIEWS: Record<string, React.ReactNode> = {
  "animated-navbar": <NavbarPreview />,
  "glass-card": <GlassCardPreview />,
  "pricing-section": <PricingPreview />,
  "hero-section": <HeroPreview />,
  "buttons": <ButtonsPreview />,
  "modals": <ModalPreview />,
  "accordions": <AccordionPreview />,
  "hover-cards": <HoverCardsPreview />,
  "3d-cards": <ThreeDCardPreview />,
};

/* ─── Main Page ─── */

export default function Components() {
  const [activeId, setActiveId] = useState(componentsData[0].id);
  const [activeTab, setActiveTab] = useState<CodeTab>("HTML");
  const [copied, setCopied] = useState(false);

  const activeComp = componentsData.find(c => c.id === activeId)!;

  const getCode = () => {
    if (activeTab === "HTML") return activeComp.html;
    if (activeTab === "CSS") return activeComp.css;
    return activeComp.js;
  };

  const getLang = (): "html" | "css" | "javascript" => {
    if (activeTab === "HTML") return "html";
    if (activeTab === "CSS") return "css";
    return "javascript";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
        <h1 className="font-heading text-5xl md:text-6xl tracking-widest uppercase text-foreground">
          COMPONENT <span className="text-accent">LIBRARY</span>
        </h1>
        <p className="text-secondary mt-4 max-w-xl text-sm leading-relaxed">
          Premium, reusable UI components with live previews and copy-ready HTML, CSS & JavaScript code.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[800px]">
        {/* Sidebar */}
        <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-56 shrink-0">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4 px-4">Components</p>
          <ul className="space-y-1">
            {componentsData.map(comp => (
              <li key={comp.id}>
                <button data-testid={`comp-${comp.id}`} onClick={() => { setActiveId(comp.id); setActiveTab("HTML"); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 border-l-2 ${
                    activeId === comp.id
                      ? "bg-accent/10 border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}>
                  {comp.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Main Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex-1 flex flex-col gap-6">

          {/* Component title */}
          <div>
            <h2 className="text-2xl font-heading uppercase tracking-widest text-foreground">{activeComp.name}</h2>
            <p className="text-secondary text-sm mt-1">{activeComp.description}</p>
          </div>

          {/* Live Preview */}
          <div className="border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/40" />
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-2">Live Preview</span>
            </div>
            <div className="p-8 min-h-[240px] flex items-center justify-center bg-background/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="relative z-10 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div key={activeId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                    className="flex items-center justify-center w-full">
                    {LIVE_PREVIEWS[activeId]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="border border-border bg-card overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border bg-surface items-center">
              {(["HTML","CSS","JavaScript"] as CodeTab[]).map(tab => (
                <button key={tab} data-testid={`code-tab-${tab}`} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab ? "bg-card text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}>
                  {tab}
                </button>
              ))}
              <div className="flex-grow" />
              <button data-testid="copy-code-btn" onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                {copied ? <><FaCheck className="text-green-400" /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
            </div>

            {/* Code */}
            <div className="overflow-auto max-h-96" style={{ background: "#080808" }}>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div key={`${activeId}-${activeTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {highlightCode(getCode(), getLang())}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
