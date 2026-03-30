import { useState, useEffect, useRef } from "react";
import './App.css';
import logo from './assets/logo.jpeg';

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const DARK = "#0A0A0A";
const DARK2 = "#111111";
const DARK3 = "#1A1A1A";

const NAV_LINKS = ["Home", "About", "Products", "Gallery", "Contact"];

const PRODUCTS = [
  { name: "Conference Bags", icon: "💼", desc: "Premium corporate conference bags tailored for your brand." },
  { name: "Cooler Bags", icon: "🧊", desc: "Insulated cooler bags with custom branding options." },
  { name: "School Backpacks", icon: "🎒", desc: "Durable school backpacks manufactured to SABS standards." },
  { name: "School Tog Bags", icon: "🏫", desc: "Spacious tog bags ideal for learners at all levels." },
  { name: "Promo Backpacks", icon: "🎽", desc: "Eye-catching promotional backpacks for campaigns." },
  { name: "Shopping Bags", icon: "🛍️", desc: "Reusable branded shopping bags for retail and events." },
  { name: "Handbags", icon: "👜", desc: "Stylish handbags manufactured to client specifications." },
  { name: "Tog Bags", icon: "🗃️", desc: "Versatile tog bags for corporate gifting and sports." },
  { name: "Miscellaneous", icon: "📦", desc: "Custom solutions for any bag type or specification." },
];

const STATS = [
  { num: "20+", label: "Years Experience" },
  { num: "70+", label: "Production Staff" },
  { num: "10+", label: "Bag Categories" },
  { num: "SABS", label: "Standards Tested" },
];

const BRANDING = ["Logo Printing", "Embroidery", "Plain (No Branding)"];
const BAG_TYPES = PRODUCTS.map((p) => p.name);

// Custom hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Crown SVG component
function Crown({ size = 40 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,42 10,10 30,28 50,10 60,42" fill={GOLD} opacity="0.9" />
      <circle cx="0" cy="10" r="4" fill={GOLD_LIGHT} />
      <circle cx="30" cy="4" r="5" fill={GOLD_LIGHT} />
      <circle cx="60" cy="10" r="4" fill={GOLD_LIGHT} />
      <rect x="0" y="38" width="60" height="4" rx="2" fill={GOLD} />
    </svg>
  );
}

// Gold Divider
function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <Crown size={24} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// Section Label
function SectionLabel({ children }) {
  return (
    <p style={{
      letterSpacing: "0.3em", fontSize: 11, fontWeight: 700,
      color: GOLD, textTransform: "uppercase", marginBottom: 12,
      fontFamily: "'Montserrat', sans-serif"
    }}>{children}</p>
  );
}

// Heading
function Heading({ children, size = 40 }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: size, fontWeight: 800, lineHeight: 1.15,
      color: "#fff",
      textAlign: "left",
      margin: 0,
    }}>{children}</h2>
  );
}

// Navigation with Logo
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${GOLD}22` : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo Section with actual image */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <img 
            src={logo} 
            alt="RR Promotional Logo" 
            style={{ 
              height: 40, 
              width: 'auto', 
              objectFit: 'contain',
              borderRadius: 4,
            }} 
          />
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>RR PROMOTIONAL</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.35em", color: GOLD, fontWeight: 700 }}>BAG MANUFACTURERS</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 32 }} className="nav-desktop">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.15em", color: "#ccc", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = "#ccc"}
            >{l}</button>
          ))}
        </div>

        <button onClick={() => scrollTo("contact")} style={{
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
          border: "none", borderRadius: 2, cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.15em", color: DARK, padding: "10px 22px",
          textTransform: "uppercase", transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >Get Quote</button>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const headingSize = windowWidth > 768 ? 58 : 38;

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `radial-gradient(ellipse at 70% 50%, #1a1400 0%, ${DARK} 60%)`,
      position: "relative", overflow: "hidden", padding: "120px 5% 80px",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div style={{
        position: "absolute", right: "5%", top: "20%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {[320, 420, 520].map((s, i) => (
        <div key={i} style={{
          position: "absolute", right: "12%", top: "50%",
          transform: "translate(50%, -50%)",
          width: s, height: s, borderRadius: "50%",
          border: `1px solid ${GOLD}${["33", "22", "11"][i]}`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <SectionLabel>Est. 2003 · Mount Edgecombe, KZN</SectionLabel>
          <div style={{ maxWidth: 680 }}>
            <Heading size={headingSize}>
              Premium Custom<br />
              <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Bag Manufacturers
              </span>
            </Heading>
          </div>
          <GoldDivider />
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 16, lineHeight: 1.8,
            color: "#aaa", maxWidth: 540, marginBottom: 40,
          }}>
            From corporate branding to school essentials — we manufacture to your exact specifications.
            70 skilled staff. SABS-tested materials. In-house screen printing & embroidery.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none", borderRadius: 2, cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: "0.15em", color: DARK, padding: "16px 36px",
              textTransform: "uppercase", transition: "transform 0.2s, opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >Request a Quote</button>

            <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "transparent",
              border: `1px solid ${GOLD}66`, borderRadius: 2, cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.15em", color: GOLD, padding: "16px 36px",
              textTransform: "uppercase", transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.background = `${GOLD}11`; }}
              onMouseLeave={e => { e.target.style.borderColor = `${GOLD}66`; e.target.style.background = "transparent"; }}
            >Our Products</button>
          </div>

          <div style={{
            display: "flex", gap: 48, flexWrap: "wrap", marginTop: 72,
            paddingTop: 40, borderTop: `1px solid ${GOLD}22`,
          }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: GOLD }}>{s.num}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{
      padding: "100px 5%",
      background: DARK2,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-40px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <SectionLabel>Who We Are</SectionLabel>
          <Heading size={42}>Crafting Excellence<br /><span style={{ color: GOLD }}>Since 2003</span></Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, lineHeight: 1.9, color: "#999", marginBottom: 24 }}>
            RR Promotional Bag Manufacturers (T/A RML) has been a cornerstone of quality bag manufacturing for over 20 years.
            Based at our state-of-the-art facility in <strong style={{ color: "#ccc" }}>Mount Edgecombe, KZN</strong>, we serve corporate clients, schools, and promotional agencies across South Africa.
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, lineHeight: 1.9, color: "#999", marginBottom: 32 }}>
            Our <strong style={{ color: "#ccc" }}>70-person production team</strong> works alongside a specialized design studio to bring every specification to life — whether from a physical sample or a technical drawing. All materials are tested to <strong style={{ color: "#ccc" }}>SABS standards</strong>.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "In-house screen printing & embroidery facility",
              "Custom manufacturing from drawings or samples",
              "Committed to skills development & social upliftment",
              "Cost-effective without compromising quality",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ color: GOLD, fontSize: 16, marginTop: 2 }}>◆</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#aaa", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(40px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
          position: "relative",
        }}>
          <div style={{
            background: DARK3, border: `1px solid ${GOLD}33`,
            borderRadius: 4, padding: 48, position: "relative",
          }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            <Crown size={48} />
            <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: 20, lineHeight: 1.8,
              color: "#ccc", fontStyle: "italic", marginTop: 24, marginBottom: 0,
            }}>
              "Our mission is to provide customers with the highest possible quality in the most cost-effective manner."
            </p>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${GOLD}22` }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", margin: 0 }}>Our Mission</p>
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: -20, right: -20,
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            borderRadius: "50%", width: 100, height: 100,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 40px ${GOLD}44`,
          }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: DARK, lineHeight: 1 }}>20+</span>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700, color: DARK, letterSpacing: "0.1em", textAlign: "center" }}>YRS EXP</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Products Section
function Products() {
  const [ref, inView] = useInView(0.05);
  
  const ProductCard = ({ p, delay }) => {
    const [hov, setHov] = useState(false);
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          background: hov ? DARK3 : "#0e0e0e",
          border: `1px solid ${hov ? GOLD + "66" : GOLD + "22"}`,
          borderRadius: 4, padding: 32, cursor: "pointer",
          transition: "all 0.3s ease",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(24px)",
          transitionDelay: `${delay}ms`,
          position: "relative", overflow: "hidden",
        }}>
        {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />}
        <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{p.name}</h3>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.7, margin: "0 0 20px" }}>{p.desc}</p>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase" }}>
          Request Quote →
        </span>
      </div>
    );
  };

  return (
    <section id="products" ref={ref} style={{ padding: "100px 5%", background: DARK }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>What We Manufacture</SectionLabel>
          <Heading center size={42}>Our Product Range</Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: "#888", maxWidth: 500, margin: "0 auto" }}>
            Every bag custom-built to your exact specifications, branding, and dimensions.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} p={p} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Quote Form
function QuoteForm() {
  const [ref, inView] = useInView();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    bagType: "", dimensions: "", quantity: "", branding: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setFormField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputStyle = {
    width: "100%", background: "#0e0e0e", border: `1px solid ${GOLD}33`,
    borderRadius: 2, padding: "14px 16px", color: "#fff",
    fontFamily: "'Montserrat', sans-serif", fontSize: 14,
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.15em", color: "#888", textTransform: "uppercase",
    display: "block", marginBottom: 8,
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "100px 5%", background: DARK2, position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "all 0.8s ease" }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <Heading size={42}>Request a<br /><span style={{ color: GOLD }}>Custom Quote</span></Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, lineHeight: 1.9, color: "#888", marginBottom: 40 }}>
            Tell us your specifications and we'll get back to you with a competitive manufacturing quote. We work from drawings, samples, or detailed descriptions.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { icon: "📞", label: "Phone", val: "031 537 3788 / 083 443 6915" },
              { icon: "✉️", label: "Email", val: "leighshe.rml@gmail.com" },
              { icon: "📍", label: "Location", val: "Mount Edgecombe, KwaZulu-Natal" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 2, flexShrink: 0,
                  background: `${GOLD}18`, border: `1px solid ${GOLD}33`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{c.icon}</div>
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", margin: "0 0 4px" }}>{c.label}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#ccc", margin: 0 }}>{c.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: "all 0.8s ease 0.2s" }}>
          <div style={{ background: DARK3, border: `1px solid ${GOLD}33`, borderRadius: 4, padding: 48, position: "relative" }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Crown size={56} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", margin: "24px 0 12px" }}>Quote Received!</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#888", fontSize: 14, lineHeight: 1.8 }}>
                  Thank you, <strong style={{ color: GOLD }}>{form.name}</strong>. We'll review your specifications and get back to you shortly.
                </p>
                <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", company: "", email: "", phone: "", bagType: "", dimensions: "", quantity: "", branding: "", notes: "" }); }}
                  style={{ marginTop: 24, background: "none", border: `1px solid ${GOLD}55`, borderRadius: 2, color: GOLD, padding: "10px 24px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: "0.15em" }}>
                  SUBMIT ANOTHER
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                        background: step >= s ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#1a1a1a",
                        border: `1px solid ${step >= s ? "transparent" : GOLD + "33"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
                        color: step >= s ? DARK : "#555",
                      }}>{s}</div>
                      {s < 3 && <div style={{ flex: 1, height: 1, background: step > s ? GOLD : `${GOLD}22` }} />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", margin: "0 0 8px" }}>Your Details</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={setFormField("name")} placeholder="Jane Smith" style={inputStyle} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = `${GOLD}33`} /></div>
                      <div><label style={labelStyle}>Company / School</label><input value={form.company} onChange={setFormField("company")} placeholder="Optional" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Email *</label><input value={form.email} onChange={setFormField("email")} type="email" placeholder="you@company.com" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={setFormField("phone")} placeholder="0xx xxx xxxx" style={inputStyle} /></div>
                    </div>
                    <button onClick={() => setStep(2)} disabled={!form.name || !form.email} style={{ background: form.name && form.email ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#222", border: "none", borderRadius: 2, cursor: form.name && form.email ? "pointer" : "not-allowed", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: form.name && form.email ? DARK : "#555", padding: "14px 24px", textTransform: "uppercase", alignSelf: "flex-end" }}>Continue →</button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", margin: "0 0 8px" }}>Bag Specifications</p>
                    <div><label style={labelStyle}>Bag Type *</label><select value={form.bagType} onChange={setFormField("bagType")} style={{ ...inputStyle, appearance: "none" }}><option value="">Select a category...</option>{BAG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Dimensions (H×W×D cm)</label><input value={form.dimensions} onChange={setFormField("dimensions")} placeholder="e.g. 40×30×15" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Quantity *</label><input value={form.quantity} onChange={setFormField("quantity")} type="number" placeholder="e.g. 500" style={inputStyle} /></div>
                    </div>
                    <div><label style={labelStyle}>Branding Preference</label><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{BRANDING.map(b => (<button key={b} onClick={() => setForm(f => ({ ...f, branding: b }))} style={{ background: form.branding === b ? `${GOLD}22` : "transparent", border: `1px solid ${form.branding === b ? GOLD : GOLD + "33"}`, borderRadius: 2, cursor: "pointer", padding: "10px 18px", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, color: form.branding === b ? GOLD : "#666" }}>{b}</button>))}</div></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><button onClick={() => setStep(1)} style={{ background: "none", border: `1px solid ${GOLD}33`, borderRadius: 2, cursor: "pointer", color: "#666", padding: "12px 20px" }}>← Back</button><button onClick={() => setStep(3)} disabled={!form.bagType || !form.quantity} style={{ background: form.bagType && form.quantity ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#222", border: "none", borderRadius: 2, cursor: form.bagType && form.quantity ? "pointer" : "not-allowed", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: form.bagType && form.quantity ? DARK : "#555", padding: "14px 24px" }}>Continue →</button></div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", margin: "0 0 8px" }}>Additional Notes</p>
                    <div><label style={labelStyle}>Special Requirements / Notes</label><textarea value={form.notes} onChange={setFormField("notes")} rows={4} placeholder="Describe any specific requirements, materials, colors, or attach reference images info..." style={{ ...inputStyle, resize: "vertical" }} /></div>
                    <div style={{ background: "#0a0a0a", border: `1px solid ${GOLD}22`, borderRadius: 2, padding: 20 }}><p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 12 }}>Quote Summary</p>{[["Contact", form.name + (form.company ? ` · ${form.company}` : "")], ["Bag Type", form.bagType], ["Quantity", form.quantity], ["Branding", form.branding || "Not specified"]].map(([k, v]) => (<div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 12, color: "#666" }}>{k}</span><span style={{ fontSize: 12, color: "#ccc", fontWeight: 600 }}>{v}</span></div>))}</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><button onClick={() => setStep(2)} style={{ background: "none", border: `1px solid ${GOLD}33`, borderRadius: 2, cursor: "pointer", color: "#666", padding: "12px 20px" }}>← Back</button><button onClick={handleSubmit} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, border: "none", borderRadius: 2, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: DARK, padding: "14px 32px", textTransform: "uppercase" }}>{loading ? "Sending..." : "Submit Quote Request"}</button></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer with Logo
function Footer() {
  return (
    <footer style={{ background: "#050505", padding: "80px 5% 40px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg, #110e00, #0a0a0a)`, border: `1px solid ${GOLD}33`, borderRadius: 4, padding: "48px 56px", marginBottom: 64, textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: 80, right: 80, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <Crown size={36} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, lineHeight: 2, color: "#bbb", fontStyle: "italic", maxWidth: 720, margin: "24px auto 0" }}>
            "And Jabez called on the God of Israel saying, 'Oh, that You would bless me indeed, and enlarge my territory, that Your hand would be with me, and that You would keep me from evil, that I may not cause pain!' So God granted him what he requested."
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: GOLD, marginTop: 20, textTransform: "uppercase" }}>
            — 1 Chronicles 4:10 (NKJV)
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img 
                src={logo} 
                alt="RR Promotional Logo" 
                style={{ 
                  height: 35, 
                  width: 'auto', 
                  objectFit: 'contain',
                  borderRadius: 4,
                }} 
              />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: "#fff" }}>RR PROMOTIONAL</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.3em", color: GOLD, fontWeight: 700 }}>BAG MANUFACTURERS</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#666", lineHeight: 1.8, maxWidth: 280 }}>Premium custom bag manufacturers since 2003. 70 staff. SABS-tested. Mount Edgecombe, KZN.</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: 20 }}>Products</p>
            {["Conference Bags", "Cooler Bags", "School Bags", "Promotional Bags", "Shopping Bags"].map(p => <p key={p} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#666", marginBottom: 10 }}>{p}</p>)}
          </div>
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: 20 }}>Contact</p>
            {["031 537 3788","083 443 6915","leighshe.rml@gmail.com","Mount Edgecombe, KZN"].map(c => <p key={c} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#666", marginBottom: 10 }}>{c}</p>)}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${GOLD}15`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#444", margin: 0 }}>© {new Date().getFullYear()} RR Promotional Bag Manufacturers (T/A RML). All rights reserved.</p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#444", margin: 0 }}>Est. 2003 · SABS Standards</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div style={{ background: DARK, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <About />
      <Products />
      <QuoteForm />
      <Footer />
    </div>
  );
}

export default App;