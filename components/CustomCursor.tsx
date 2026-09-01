"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button")
      ) {
        setCursorVariant("hover");
        setCursorText("");
      } 
      else if (target.closest("[data-cursor]")) {
        const cursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        setCursorVariant("text");
        setCursorText(cursorData || "");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      width: 8,
      height: 8,
      backgroundColor: "#e11d48",
      mixBlendMode: "normal" as any,
      opacity: 1,
      transition: { 
        type: "spring", stiffness: 1000, damping: 35, mass: 0.1,
        x: { duration: 0 },
        y: { duration: 0 }
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(225, 29, 72, 0.2)",
      border: "1px solid rgba(225, 29, 72, 0.8)",
      mixBlendMode: "normal" as any,
      opacity: 1,
      transition: { 
        type: "spring", stiffness: 600, damping: 30, mass: 0.2,
        x: { duration: 0 },
        y: { duration: 0 }
      }
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: "#e11d48",
      mixBlendMode: "normal" as any,
      opacity: 1,
      transition: { 
        type: "spring", stiffness: 600, damping: 30, mass: 0.2,
        x: { duration: 0 },
        y: { duration: 0 }
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-white font-mono text-[9px] uppercase tracking-widest font-bold"
      variants={variants}
      animate={cursorVariant}
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {cursorVariant === "text" && cursorText}
    </motion.div>
  );
}
