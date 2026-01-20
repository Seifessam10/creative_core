import React from "react";

/**
 * Packages with glassmorphism cards using existing CSS variables
 * Updated for EGP currency with refined design
 */
const tiers = [
  {
    name: "Essentials",
    price: "3,200",
    currency: "EGP",
    discount: "25%",
    features: [
      "Logo & Basic Identity",
      "2 Clothing Designs",
      "Hang Tag & Label Design",
      "2 Social Media Posts"
    ]
  },
  {
    name: "Signature",
    price: "4,500",
    currency: "EGP",
    discount: "25%",
    features: [
      "Premium Logo",
      "4 Clothing Designs",
      "Motion & launch assets",
      "4 Social Media Posts",
    ],
    popular: true
  },
  {
    name: "Bespoke",
    price: "Custom",
    currency: "",
    features: [
      "End-to-end brand & product",
      "Website Design",
      "Social Media Posts",
      "Brand Guidelines",
    ]
  }
];

const Packages = () => {
  return (
    <section id="packages" className="section reveal">
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
          Packages
        </h3>
        <div className="grid">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`price-card glass hover-rise ${tier.popular ? 'popular-card' : ''}`}
              style={{
                position: 'relative',
                border: '1px solid var(--glass-brd)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(14px)',
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease',
                ...(tier.popular && {
                  borderColor: 'rgba(177, 6, 26, 0.4)',
                  transform: 'translateY(-8px)',
                })
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = tier.popular ? 'translateY(-12px)' : 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(177, 6, 26, 0.32)';
                e.currentTarget.style.borderColor = 'rgba(177, 6, 26, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = tier.popular ? 'translateY(-8px)' : 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.style.borderColor = tier.popular ? 'rgba(177, 6, 26, 0.4)' : 'var(--glass-brd)';
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, var(--accent), #dc2677)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(177, 6, 26, 0.4)',
                    zIndex: 10
                  }}
                >
                  Most Popular
                </div>
              )}
              
              {/* Animated glow on hover */}
              <div 
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  background: 'linear-gradient(135deg, rgba(177, 6, 26, 0.2), rgba(220, 38, 127, 0.2))',
                  borderRadius: '18px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                  filter: 'blur(8px)'
                }}
                className="glow-effect"
              />
              
              <h3 className="price-title" style={{ color: 'var(--fg)', marginBottom: '8px' }}>
                {tier.name}
              </h3>
              
              <div
                className="price"
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Main price with EGP */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ 
                    fontSize: '32px', 
                    fontWeight: 800, 
                    color: 'var(--fg)', 
                    letterSpacing: '-0.5px',
                    lineHeight: '1'
                  }}>
                    {tier.price}
                  </span>
                  
                  {/* EGP currency */}
                  {tier.currency && (
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: 'var(--muted)',
                      letterSpacing: '0.5px'
                    }}>
                      {tier.currency}
                    </span>
                  )}
                </div>

                {/* Discount badge */}
                {tier.discount && tier.price !== "Custom" && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      color: '#fff',
                      background: 'linear-gradient(135deg, var(--accent), #dc2677)',
                      boxShadow: '0 4px 14px rgba(177, 6, 26, 0.3)',
                      alignSelf: 'center'
                    }}
                  >
                    Save {tier.discount}
                  </span>
                )}
              </div>
              
              <ul className="features" style={{ marginBottom: '24px' }}>
                {tier.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      margin: '12px 0',
                      color: 'var(--muted)',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--fg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--muted)';
                    }}
                  >
                    <span 
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent), #dc2677)',
                        marginRight: '12px',
                        marginTop: '2px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="10" height="8" fill="white" viewBox="0 0 10 8">
                        <path d="M8.293.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2A1 1 0 0 1 2.707 3.293L4 4.586 7.293.293Z"/>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact" 
                className="btn-outline"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  width: '100%',
                  padding: '14px 20px',
                  background: tier.popular 
                    ? 'linear-gradient(135deg, rgba(177, 6, 26, 0.8), rgba(228, 57, 57, 0.8))' 
                    : 'linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
                  border: `1px solid ${tier.popular ? 'rgba(177, 6, 26, 0.6)' : 'rgba(255,255,255,.22)'}`,
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 38px rgba(177,6,26,.35)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.45)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                  e.currentTarget.style.borderColor = tier.popular ? 'rgba(177, 6, 26, 0.6)' : 'rgba(255,255,255,.22)';
                  e.currentTarget.style.color = 'var(--fg)';
                }}
              >
                Start a Project
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .popular-card .glow-effect {
          opacity: 0.3 !important;
        }
        .price-card:hover .glow-effect {
          opacity: 0.6 !important;
        }
      `}</style>
    </section>
  );
};

export default Packages;