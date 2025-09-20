import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaInstagram, FaPhone, FaEnvelope, FaTiktok } from "react-icons/fa6";

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

      // Send email with EmailJS
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
    backgroundClip: 'text', // for some browsers
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
            {/* Use textarea instead of input for longer messages */}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
