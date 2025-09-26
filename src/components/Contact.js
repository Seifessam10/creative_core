import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaInstagram, FaPhone, FaEnvelope, FaTiktok } from "react-icons/fa6";

// ⛔️ Removed CVIcon + handleDownloadCV

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  // EmailJS IDs
  const serviceId = "service_po5kx2n";
  const templateId = "template_bhy5bhk";
  const publicKey = "X1D0WrI8d3Qcs93Ep";

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);
    if (!data.get("user_name") || !data.get("user_phone") || !data.get("message")) {
      setStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", msg: "" });

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setStatus({
        type: "success",
        msg: "✅ Thanks! Your message has been sent. We'll get back to you shortly."
      });

      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        msg: "❌ Something went wrong. Please try again or email creativecore1@hotmail.com directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section reveal">
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
          Contact
        </h3>

        <form ref={formRef} onSubmit={onSubmit} className="contact-form glass">
          {/* Name */}
          <div className="field">
            <label>Name</label>
            <input name="user_name" type="text" placeholder="Your full name" />
          </div>

          {/* Mobile Number */}
          <div className="field">
            <label>Mobile Number</label>
            <input name="user_phone" type="tel" placeholder="+201234567890" />
          </div>

          {/* Message */}
          <div className="field">
            <label>Message</label>
            <input name="message" rows="5" placeholder="Tell us about your project..." />
          </div>

          <button className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status.msg && (
            <p className={`status ${status.type === "error" ? "error" : "success"}`}>
              {status.msg}
            </p>
          )}
        </form>

        {/* Social / Contact icons */}
        <div className="socials">
          <a href="tel:+201118884413" aria-label="Phone"><FaPhone /></a>
          <a href="mailto:creativecore1@hotmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="https://www.instagram.com/creativecore.io?igsh=MTJ1ZjRta2J3MmVydg==" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@creativecore.io?_t=ZS-8zjkheTWqZt&_r=1" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>

          {/* ✅ CV link matches icon styling; downloads on click */}
          <a
            href="/mano_cv.jfif"
            download="mano_cv.jfif"
            aria-label="Download CV"
            className="cv-txt"
          >
            CV
          </a>
        </div>
      </div>

      <style jsx>{`
        /* ⛔️ Removed .cv-icon-btn styles to avoid conflicts */

        /* Keep CV text sized like the react-icons glyphs without changing anything else */
        .cv-txt {
          font-size: 1.20em;   /* similar to icon size */
          font-weight: 700;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: inherit;      /* inherit same color/hover rules as other icons */
          transition: inherit;  /* inherit any transitions defined on .socials a */
        }

        /* If your .socials > a has hover color, this will pick it up automatically.
           If not, this keeps behavior consistent with your icons’ current hover color handling. */
        .cv-txt:hover {
          color: var(--accent);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default Contact;
