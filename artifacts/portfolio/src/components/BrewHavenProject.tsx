import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { FaExternalLinkAlt, FaEye, FaCheckCircle } from "react-icons/fa";

const features = [
  { icon: "📱", label: "Responsive Design" },
  { icon: "✨", label: "Modern UI/UX" },
  { icon: "☕", label: "Coffee Menu Showcase" },
  { icon: "🎨", label: "Interactive Layout" },
  { icon: "📲", label: "Mobile Friendly" },
  { icon: "⚡", label: "Fast Performance" },
];

const techStack = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"];

function ProjectMockup() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 12,
      overflow: "hidden",
      width: "100%",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#141414",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{
          flex: 1,
          background: "#222",
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 10,
          color: "#555",
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.03em",
        }}>
          brew-haven-india.netlify.app
        </div>
      </div>

      {/* Site content mockup */}
      <div style={{ background: "#110700", position: "relative", overflow: "hidden", minHeight: 300 }}>
        {/* Background gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #110700 0%, #2E1200 45%, #110700 100%)",
        }} />
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", background: "rgba(180,110,50,0.08)", filter: "blur(30px)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(180,110,50,0.06)", filter: "blur(25px)" }} />

        {/* Navbar */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(180,110,50,0.15)",
        }}>
          <span style={{ color: "#C89060", fontWeight: 800, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            ☕ BREW HAVEN
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {["Menu", "About", "Gallery", "Contact"].map(l => (
              <span key={l} style={{ color: "#6B5040", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div style={{ position: "relative", zIndex: 2, padding: "28px 24px 16px", textAlign: "center" }}>
          <p style={{ color: "#7B5A40", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
            Est. 2024 — Premium Artisanal Coffee
          </p>
          <h2 style={{
            color: "#C89060",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.08em",
            lineHeight: 1.15,
            marginBottom: 10,
            textShadow: "0 0 60px rgba(200,144,96,0.25)",
            textTransform: "uppercase",
          }}>
            BREW HAVEN
          </h2>
          <p style={{ color: "#5C4030", fontSize: 10, lineHeight: 1.7, maxWidth: 260, margin: "0 auto 18px" }}>
            Where every sip tells a story. Artisanal coffee crafted with passion, served with love.
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 18px",
            border: "1px solid rgba(200,144,96,0.35)",
            color: "#C89060",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}>
            ☕ Explore Menu
          </div>
        </div>

        {/* Menu cards */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", gap: 8,
          padding: "10px 16px 22px",
          justifyContent: "center",
        }}>
          {[
            { name: "Espresso", price: "₹120", desc: "Bold & Rich" },
            { name: "Cappuccino", price: "₹180", desc: "Creamy Froth" },
            { name: "Cold Brew", price: "₹220", desc: "Slow Steeped" },
          ].map(item => (
            <div key={item.name} style={{
              background: "rgba(180,110,50,0.07)",
              border: "1px solid rgba(180,110,50,0.15)",
              borderRadius: 8,
              padding: "10px 12px",
              textAlign: "center",
              flex: 1,
            }}>
              <div style={{ fontSize: 18, marginBottom: 5 }}>☕</div>
              <div style={{ color: "#C89060", fontSize: 9, fontWeight: 700, marginBottom: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.name}</div>
              <div style={{ color: "#6B5040", fontSize: 8, marginBottom: 4 }}>{item.desc}</div>
              <div style={{ color: "#C89060", fontSize: 10, fontWeight: 800 }}>{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrewHavenProject() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 250, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 250, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="py-24 px-4 sm:px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2 font-bold">Featured Project</p>
            <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-tight">Case Study</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 border border-green-500/30 bg-green-500/5 rounded-full w-fit"
          >
            <FaCheckCircle className="text-green-400" size={11} />
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Completed</span>
          </motion.div>
        </motion.div>

        {/* Main showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 15% 60%, rgba(180,110,50,0.05) 0%, transparent 55%)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT — Tiltable mockup */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="p-8 lg:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}
            >
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
                whileHover={{ scale: 1.025 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="w-full"
              >
                <ProjectMockup />
              </motion.div>
            </motion.div>

            {/* RIGHT — Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="p-8 lg:p-12 flex flex-col justify-center space-y-7"
            >
              {/* Title block */}
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Frontend Website</p>
                <h3 className="font-heading text-4xl md:text-5xl uppercase tracking-tight mb-4">
                  BREW HAVEN
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  A modern coffee shop website featuring elegant UI design, responsive layouts,
                  smooth user experience, menu showcase sections, and contemporary visual aesthetics.
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(t => (
                    <motion.span
                      key={t}
                      whileHover={{ borderColor: "#FF3B30", color: "#FF3B30", scale: 1.04 }}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-white/10 text-muted-foreground transition-colors duration-300 rounded-sm cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Features</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {features.map(f => (
                    <div key={f.label} className="flex items-center gap-2.5 text-xs text-secondary">
                      <span className="text-sm flex-shrink-0">{f.icon}</span>
                      <span className="tracking-wide">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: "linear-gradient(to right, rgba(255,59,48,0.3), rgba(255,255,255,0.06), transparent)" }} />

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://brew-haven-india.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-foreground text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors"
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(255,59,48,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaExternalLinkAlt size={11} />
                  Live Demo
                </motion.a>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 px-6 py-3 border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                  >
                    <FaEye size={11} />
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
