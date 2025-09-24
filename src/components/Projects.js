import React from "react";

/**
 * Projects — horizontal auto-scrolling slider with animated glass cards.
 * Clean showcase for graphic design work.
 */
const projects = [
  { img: "/IMG_5662.PNG" },
  { img: "/IMG_5663.PNG" },
  { img: "/IMG_5668.PNG" },
  { img: "/IMG_5729.JPG" },
  { img: "/IMG_5730.JPG" },
  { img: "/IMG_5736.JPG" },
  { img: "/IMG_5751.JPG" },
  { img: "/IMG_5752.JPG" },
  { img: "/IMG_5753.JPG" },
  { img: "/IMG_9129.PNG" },
  { img: "/IMG_9148.PNG" },
  { img: "/IMG_9208.JPG" },
  { img: "/IMG_9209.JPG" },
  { img: "/IMG_9210.JPG" },
  { img: "/IMG_9214.JPG" },
  { img: "/IMG_9215.JPEG" },
  { img: "/IMG_9233.JPG" },
  { img: "/IMG_9235.JPG" },
  { img: "/IMG_4811.PNG" },
  { img: "/IMG_6036.JPG" },
];

const Projects = () => {
  const cardStyle = {
    width: '320px',
    height: '400px',
    background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(40, 40, 40, 0.8))',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease'
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '40%',
    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.95) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    color: 'white'
  };

  const titleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #ffffff, rgba(177, 6, 26, 0.9))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const techStyle = {
    fontSize: '0.9rem',
    opacity: '0.8',
    color: '#cccccc'
  };

  return (
    <section id="projects" className="section reveal">
      <div className="container">
        <h3 
          className="title" 
          style={{
            background: 'linear-gradient(135deg, var(--fg) 0%, rgba(177, 6, 26, 0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Projects
        </h3>

        <div className="slider">
          <div className="track">
            {projects.concat(projects).map((p, i) => (
              <figure 
                key={i} 
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(177, 6, 26, 0.6)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(177, 6, 26, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(177, 6, 26, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={p.img} 
                  alt="Design work"
                  style={imageStyle}
                />
                
                {/* Animated border glow */}
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: 'linear-gradient(45deg, rgba(177, 6, 26, 0.3), transparent, rgba(177, 6, 26, 0.3))',
                  borderRadius: '22px',
                  zIndex: '-1',
                  opacity: '0',
                  transition: 'opacity 0.3s ease'
                }} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;