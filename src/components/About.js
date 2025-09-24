import React, { useState, useRef, useEffect } from "react";

/**
 * Professional About section with sophisticated animations and interactions
 * Mouse glow effect removed (now handled globally in App.js)
 */
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section reveal"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(17,17,17,0.9) 100%)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Geometric background patterns */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          border: '1px solid rgba(177, 6, 26, 0.2)',
          borderRadius: '50%',
          animation: isVisible ? 'float 6s ease-in-out infinite' : 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(177, 6, 26, 0.1), transparent)',
          transform: 'rotate(45deg)',
          animation: isVisible ? 'float 4s ease-in-out infinite reverse' : 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main content with staggered animations */}
        <div
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.2s'
          }}
        >
          <h3 
            className="title"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--fg) 0%, rgba(177, 6, 26, 0.8) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '2rem'
            }}
          >
            About Creative Core
          </h3>
        </div>

        {/* Glass content container */}
        <div
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-brd)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 3rem)',
            boxShadow: 'var(--shadow)',
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.4s',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = isVisible ? 'translateY(-5px) scale(1.02)' : e.currentTarget.style.transform;
            e.currentTarget.style.borderColor = 'rgba(177, 6, 26, 0.4)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(177, 6, 26, 0.2), var(--shadow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isVisible ? 'translateY(0) scale(1)' : e.currentTarget.style.transform;
            e.currentTarget.style.borderColor = 'var(--glass-brd)';
            e.currentTarget.style.boxShadow = 'var(--shadow)';
          }}
        >
          {/* Subtle inner glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(177, 6, 26, 0.5), transparent)',
              opacity: 0.7
            }}
          />

          <p 
            className="lead" 
            style={{
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease',
              transitionDelay: '0.6s'
            }}
          >
            I'm{" "}
            <span 
              className="emph" 
              style={{
                color: 'var(--accent)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.textShadow = '0 0 20px rgba(177, 6, 26, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Abdelrahman Darwesh
            </span>
            , founder of{" "}
           <span 
              className="emph" 
              style={{
                color: 'var(--accent)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.textShadow = '0 0 20px rgba(177, 6, 26, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Creative Core
            </span>{" "}
            — a creative agency that turns ideas into timeless design. We craft identities, campaigns, and websites that are as functional as they are beautiful.
          </p>

          <p 
            className="muted" 
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease',
              transitionDelay: '0.8s',
              borderLeft: '3px solid rgba(177, 6, 26, 0.3)',
              paddingLeft: '1.5rem',
              fontStyle: 'italic'
            }}
          >
            "Core of Innovation Heart of Design."
          </p>

          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1.5rem',
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent))',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease',
              transitionDelay: '1s'
            }}
          />
        </div>

        {/* Statistics or key points */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.9s ease',
            transitionDelay: '1s'
          }}
        >
          {[
            { label: 'Years Experience', value: '2+' },
            { label: 'Projects Completed', value: '99+' },
            { label: 'Client Satisfaction', value: '101%' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(177, 6, 26, 0.4)';
                e.currentTarget.style.background = 'rgba(177, 6, 26, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default About;