import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open (mobile UX)
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backdropFilter: "blur(12px)",
        background: isScrolled ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "background 0.3s ease",
      }}
    >
      <div
        className="nav-inner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* BRAND — removed hover color change */}
        <a
          href="#hero"
          className="brand"
          onClick={closeMobileMenu}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: "1.35rem", // desktop bigger
            color: "var(--fg)",
            textDecoration: "none",
          }}
        >
          <img
            src="/logo.png"
            alt="Creative Core Logo"
            style={{
              width: "64px",  // desktop bigger
              height: "64px",
              filter: "drop-shadow(0 3px 10px rgba(255, 255, 255, 0.3))",
              objectFit: "contain",
            }}
          />
          <span className="brand-text">Creative Core</span>
        </a>

        {/* HAMBURGER */}
        <button
          className="nav-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
          style={{
            display: "none",
            flexDirection: "column",
            cursor: "pointer",
            gap: "5px",
            padding: "10px", // larger tap target
            background: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "var(--fg)",
              transition: "0.3s",
              borderRadius: "2px",
              transform: isMobileMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
            }}
          />
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "var(--fg)",
              transition: "0.3s",
              borderRadius: "2px",
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "var(--fg)",
              transition: "0.3s",
              borderRadius: "2px",
              transform: isMobileMenuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none",
            }}
          />
        </button>

        {/* DESKTOP NAV */}
        <nav
          className="nav-menu desktop-menu"
          style={{ display: "flex", gap: "2rem", alignItems: "center" }}
        >
          {[
            { href: "#about", label: "About" },
            { href: "#projects", label: "Portfolio" },
            { href: "#packages", label: "Packages" },
            { href: "#contact", label: "Contact" },
          ].map((i) => (
            <a
              key={i.href}
              href={i.href}
              onClick={closeMobileMenu}
              style={{
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
                transition: "color 0.2s ease, transform 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--fg)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {i.label}
            </a>
          ))}
        </nav>
      </div>

      {/* MOBILE OVERLAY MENU (full-screen) */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      >
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <button className="close-x" aria-label="Close menu" onClick={closeMobileMenu}>
            &times;
          </button>
          <a href="#about" onClick={closeMobileMenu}>About</a>
          <a href="#projects" onClick={closeMobileMenu}>Portfolio</a>
          <a href="#packages" onClick={closeMobileMenu}>Packages</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        </div>
      </div>

      <style jsx>{`
        /* Remove brand hover color globally */
        .brand:hover,
        .brand:hover .brand-text {
          color: var(--fg) !important;
        }

        /* Hide desktop menu on small screens */
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .nav-toggle {
            display: flex !important;
          }
          .nav-inner {
            padding: 0.85rem 1rem !important;
          }
          /* Brand sizes on mobile */
          .brand img {
            width: 56px !important;
            height: 56px !important;
          }
          .brand-text {
            font-size: 1.15rem !important;
          }
        }
        @media (max-width: 480px) {
          .brand-text {
            display: none;
          }
          .brand img {
            width: 48px !important;
            height: 48px !important;
          }
        }

        /* Full-screen mobile overlay */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
          z-index: 998; /* below header but covers page */
        }
        .mobile-menu.active {
          opacity: 1;
          visibility: visible;
        }
        .mobile-menu-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 20px 28px;
          transform: translateY(-100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .mobile-menu.active .mobile-menu-panel {
          transform: translateY(0);
        }
        .mobile-menu-panel .close-x {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 34px;
          line-height: 1;
          background: transparent;
          border: 0;
          color: var(--fg);
          cursor: pointer;
          padding: 8px;
        }
        .mobile-menu-panel a {
          display: block;
          text-align: center;
          color: var(--fg);
          text-decoration: none;
          font-size: 1.35rem;        /* big, thumb-friendly */
          padding: 16px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          transition: color 0.2s ease;
        }
        .mobile-menu-panel a:first-of-type {
          border-top: 0;
          margin-top: 36px;
        }
        .mobile-menu-panel a:hover {
          color: var(--accent);
        }
      `}</style>
    </header>
  );
};

export default Navbar;
