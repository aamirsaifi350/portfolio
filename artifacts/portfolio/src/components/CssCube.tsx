import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

const cubeProjects = projects.slice(0, 6);

interface FaceProps {
  label: string;
  index: number;
  hovered: number | null;
  onHover: (i: number | null) => void;
  onClick: (i: number) => void;
}

const faceClasses = [
  "translate-z-[140px]",           // front
  "translate-z-[-140px] rotate-y-180", // back
  "translate-x-[-140px] rotate-y-[-90deg]", // left
  "translate-x-[140px] rotate-y-90",  // right
  "translate-y-[-140px] rotate-x-90", // top
  "translate-y-[140px] rotate-x-[-90deg]", // bottom
];

// Inline styles for each face since Tailwind dynamic translate-z isn't available
const faceStyles: React.CSSProperties[] = [
  { transform: "translateZ(140px)" },
  { transform: "rotateY(180deg) translateZ(140px)" },
  { transform: "rotateY(-90deg) translateZ(140px)" },
  { transform: "rotateY(90deg) translateZ(140px)" },
  { transform: "rotateX(90deg) translateZ(140px)" },
  { transform: "rotateX(-90deg) translateZ(140px)" },
];

export function CssCube() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(30);
  const [, setLocation] = useLocation();
  const animRef = useRef<number | null>(null);
  const lastTime = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mousePos.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      const delta = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      if (!isHovering.current) {
        setRotX(prev => prev + delta * 15);
        setRotY(prev => prev + delta * 22);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const mouseOffsetX = mousePos.current.x * 12;
  const mouseOffsetY = mousePos.current.y * 12;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 320, height: 320, perspective: "900px" }}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; setHovered(null); }}
    >
      <div
        style={{
          width: 280,
          height: 280,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${-rotX + mouseOffsetY}deg) rotateY(${rotY + mouseOffsetX}deg)`,
          transition: hovered !== null ? "transform 0.4s ease" : undefined,
        }}
      >
        {faceStyles.map((style, i) => (
          <div
            key={i}
            data-testid={`cube-face-${i}`}
            style={{
              ...style,
              position: "absolute",
              width: 280,
              height: 280,
              left: 0,
              top: 0,
              backfaceVisibility: "hidden",
              background: hovered === i
                ? "linear-gradient(135deg, #111 0%, #1a0000 100%)"
                : "linear-gradient(135deg, #050505 0%, #0e0e0e 100%)",
              border: `1px solid ${hovered === i ? "#FF3B30" : "rgba(255,255,255,0.08)"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s, border-color 0.3s",
              boxShadow: hovered === i
                ? "inset 0 0 40px rgba(255,59,48,0.15), 0 0 40px rgba(255,59,48,0.1)"
                : "inset 0 0 20px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              if (cubeProjects[i]) setLocation(`/projects/${cubeProjects[i].id}`);
            }}
          >
            {/* Red corner accents */}
            <div style={{ position: "absolute", top: 8, left: 8, width: 20, height: 20, borderTop: "2px solid #FF3B30", borderLeft: "2px solid #FF3B30" }} />
            <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderTop: "2px solid #FF3B30", borderRight: "2px solid #FF3B30" }} />
            <div style={{ position: "absolute", bottom: 8, left: 8, width: 20, height: 20, borderBottom: "2px solid #FF3B30", borderLeft: "2px solid #FF3B30" }} />
            <div style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderBottom: "2px solid #FF3B30", borderRight: "2px solid #FF3B30" }} />

            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 500,
              color: hovered === i ? "#FFFFFF" : "#888888",
              textAlign: "center",
              padding: "0 24px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              lineHeight: 1.4,
              transition: "color 0.3s",
            }}>
              {cubeProjects[i]?.name ?? ""}
            </span>
            {hovered === i && (
              <span style={{
                marginTop: 8,
                fontFamily: "'Tenali Ramakrishna', sans-serif",
                fontSize: 11,
                color: "#FF3B30",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}>
                View →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
