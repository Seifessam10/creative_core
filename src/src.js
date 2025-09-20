import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Packages from "./components/Packages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * Root app — sets smooth scrolling and global reveal-on-scroll observer.
 * Now includes global mouse glow effect.
 */
const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // IntersectionObserver to add .revealed when section enters viewport
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        }),
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Global mouse tracking for glow effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Global mouse glow effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(177, 6, 26, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
            transition: 'transform 0.3s ease-out',
            pointerEvents: 'none',
            opacity: 0.7,
            filter: 'blur(80px)'
          }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;