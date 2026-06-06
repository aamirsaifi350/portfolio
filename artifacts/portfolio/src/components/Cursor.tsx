import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const dotX = useSpring(0, { damping: 50, stiffness: 400, mass: 0.1 });
  const dotY = useSpring(0, { damping: 50, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Hide on mobile via CSS
  return (
    <div className="hidden md:block pointer-events-none z-[9999] fixed inset-0 overflow-hidden mix-blend-difference">
      {/* Outer Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "hsl(var(--accent))" : "hsl(var(--foreground))",
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground"
      />
    </div>
  );
}
