import React, { useEffect, useState } from "react";

/**
 * Animated hero with dramatic logo entrance and refined reveals.
 */
const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Stage 1: Logo appears huge
    const timer1 = setTimeout(() => setAnimationStage(1), 100);
    // Stage 2: Logo zooms out to normal size
    const timer2 = setTimeout(() => setAnimationStage(2), 800);
    // Stage 3: Text elements fade in
    const timer3 = setTimeout(() => setAnimationStage(3), 1300);
    // Stage 4: Button appears
    const timer4 = setTimeout(() => setAnimationStage(4), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero loaded"
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        {/* Animated Logo */}
        <div
          style={{
            transform: animationStage === 0 
              ? 'scale(8) translateY(20px)' 
              : animationStage === 1 
              ? 'scale(8) translateY(0px)'
              : 'scale(1) translateY(0px)',
            opacity: animationStage >= 1 ? 1 : 0,
            transition: animationStage === 0 ? 'opacity 0.3s ease' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: animationStage < 2 ? 'blur(2px)' : 'blur(0px)',
            marginBottom: '20px'
          }}
        >
          <img
            className="hero-logo"
            src="/logo.png"
            alt="Creative Core"
            style={{ 
              width: "140px", 
              height: "140px",
              filter: 'drop-shadow(0 10px 30px rgba(177, 6, 26, 0.4))'
            }}
          />
        </div>

        {/* Title */}
        <h1 
          className="headline"
          style={{
            opacity: animationStage >= 3 ? 1 : 0,
            transform: animationStage >= 3 ? 'translateY(0px)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.2s',
            filter: animationStage >= 3 ? 'blur(0px)' : 'blur(4px)'
          }}
        >
          Creative Core
        </h1>

        {/* Subtitle - Single line quote */}
        <p 
          className="subtext"
          style={{
            opacity: animationStage >= 3 ? 1 : 0,
            transform: animationStage >= 3 ? 'translateY(0px)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.4s',
            filter: animationStage >= 3 ? 'blur(0px)' : 'blur(4px)'
          }}
        >
          "Core of Innovation Heart of Design."
        </p>

        {/* Button */}
        <a 
          href="#projects" 
          className="btn-primary"
          style={{
            opacity: animationStage >= 4 ? 1 : 0,
            transform: animationStage >= 4 ? 'translateY(0px)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.2s',
            filter: animationStage >= 4 ? 'blur(0px)' : 'blur(4px)'
          }}
        >
          Explore Work
        </a>
      </div>
    </section>
  );
};

export default Hero;