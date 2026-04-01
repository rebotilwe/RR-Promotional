import { useState, useEffect, useRef } from "react";
import './App.css';
import logo from './assets/logo.jpeg';
import conferenceBag from './assets/products/conference.jpg';
import coolerBag from './assets/products/cooler.jpg';
import school from './assets/products/school.avif';
import schoolTog from './assets/products/schoolTop.avif';
import promoBackpack from './assets/products/promo.avif';
import shoppingBag from './assets/products/shoppingBag.avif';
// import handbag from './assets/products/handbag.jpg';
// import togBag from './assets/products/tog-bag.jpg';
// import misc from './assets/products/misc.jpg';

//Sublimation
import fullSports from './assets/sublimation/fullSports.avif';
import golf from './assets/sublimation/golf.avif';
import sport from './assets/sublimation/sport.avif';
import tracksuit from './assets/sublimation/tracksuits.avif';
import workers from './assets/sublimation/workers.png';

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const BAG_MFR_COLOR = "#F0D080"; // Much brighter than GOLD — visible on dark bg
const DARK = "#0f0e0a";
const DARK2 = "#161510";
const DARK3 = "#1e1c14";
const DARK_WARM = "#1a1810";

// ── Updated: Sublimation added, email updated, address updated ──
const EMAIL = "sales@rrmanufacturers.co.za";
const LOCATION = "Verulam, KwaZulu-Natal";
const LOCATION_SHORT = "Verulam, KZN";
const WHATSAPP_NUMBER = "27834436915";

const PAGES = ["Home", "About", "Products", "Sublimation", "Gallery", "Values", "Contact"];

const PRODUCTS = [
  {
    name: "Conference Bags",
    icon: "💼",
    desc: "Premium corporate conference bags tailored for your brand.",
    image: conferenceBag,
  },
  {
    name: "Cooler Bags",
    icon: "🧊",
    desc: "Insulated cooler bags with custom branding options.",
    image: coolerBag,
  },
  {
    name: "School Backpacks",
    icon: "🎒",
    desc: "Durable school backpacks manufactured to SABS standards.",
    image: school,
  },
  {
    name: "School Tog Bags",
    icon: "🏫",
    desc: "Spacious tog bags ideal for learners at all levels.",
    image: schoolTog,
  },
  {
    name: "Promo Backpacks",
    icon: "🎽",
    desc: "Eye-catching promotional backpacks for campaigns.",
    image: promoBackpack,
  },
  {
    name: "Shopping Bags",
    icon: "🛍️",
    desc: "Reusable branded shopping bags for retail and events.",
    image: shoppingBag,
  },
  {
    name: "Handbags",
    icon: "👜",
    desc: "Stylish handbags manufactured to client specifications.",
    image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Tog Bags",
    icon: "🗃️",
    desc: "Versatile tog bags for corporate gifting and sports.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Miscellaneous",
    icon: "📦",
    desc: "Custom solutions for any bag type or specification.",
    image: "https://images.unsplash.com/photo-1520975922327-6a3c1c3c0a3f?w=600&h=400&fit=crop&auto=format",
  },
];

const SUBLIMATION_ITEMS = [
  {
    icon: "🏃",
    name: "Tracksuits",
    desc: "Full sublimation tracksuits with vibrant all-over prints — perfect for teams, schools, and corporates.",
    // Athletes in branded sublimated tracksuits
    image:tracksuit,
  },
  {
    icon: "🔧",
    name: "Workwear",
    desc: "Custom branded workwear and uniforms that keep your team looking professional on site.",
    // Workers in branded / uniform workwear
    image: workers,
  },
  {
    icon: "⛳",
    name: "Golf Shirts",
    desc: "Premium sublimated golf shirts ideal for corporate events, sponsorships, and staff uniforms.",
    // Clean polo / golf shirt on hanger or flat lay
    image: golf,
  },
  {
    icon: "👕",
    name: "T-Shirts & Jerseys",
    desc: "Fully customised sublimated t-shirts and jerseys for sports clubs, events, and promotions.",
    // Bright sublimated sports jersey / t-shirt
    image: sport,
  },
  {
    icon: "🎽",
    name: "Sports Kits",
    desc: "Complete sporting kits including shorts, socks, and tops — all produced in-house.",
    // Full sports kit / team uniforms
    image: fullSports,
  },
  {
    icon: "🖨️",
    name: "Custom Branding",
    desc: "In-house sublimation, embroidery, and silk screen printing — all under one roof.",
    // Embroidery / branding machine or branded garment close-up
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
];

// Gallery images — real photos matched to bag manufacturing & branding context
const GALLERY_ITEMS = [
  {
    label: "Corporate Conference Bags",
    image: conferenceBag,
  },
  {
    label: "Custom Branded Backpacks",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&h=400&fit=crop&auto=format",
  },
  {
    label: "Promotional Shopping Bags",
    image: shoppingBag,
  },
  {
    label: "School Bags & Tog Bags",
    image: school,
  },
  {
    label: "In-House Branding",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
  {
    label: "Cooler & Event Bags",
    image: coolerBag,
  },
];
 const STATS = [
  { num: "20+", label: "Years Experience" },
  { num: "70+", label: "Production Staff" },
  { num: "10+", label: "Bag Categories" },
  { num: "SABS", label: "Standards Tested" },
];

const BRANDING = ["Logo Printing", "Embroidery", "Sublimation", "Plain (No Branding)"];
const BAG_TYPES = PRODUCTS.map((p) => p.name);

// ── Hooks ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ── Shared UI components ────────────────────────────────────────────────────
function Crown({ size = 40 }) {
  const w = useWindowWidth();
  const s = w <= 480 ? size * 0.7 : w <= 768 ? size * 0.85 : size;
  return (
    <svg width={s} height={s * 0.7} viewBox="0 0 60 42" fill="none">
      <polygon points="0,42 10,10 30,28 50,10 60,42" fill={GOLD} opacity="0.9" />
      <circle cx="0" cy="10" r="4" fill={GOLD_LIGHT} />
      <circle cx="30" cy="4" r="5" fill={GOLD_LIGHT} />
      <circle cx="60" cy="10" r="4" fill={GOLD_LIGHT} />
      <rect x="0" y="38" width="60" height="4" rx="2" fill={GOLD} />
    </svg>
  );
}

function GoldDivider() {
  const w = useWindowWidth();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: w <= 480 ? 6 : 12, margin: w <= 480 ? "12px 0" : "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <Crown size={w <= 480 ? 16 : 22} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

function SectionLabel({ children }) {
  const w = useWindowWidth();
  return (
    <p style={{
      letterSpacing: w <= 480 ? "0.2em" : "0.35em",
      fontSize: w <= 480 ? 9 : 11, fontWeight: 700,
      color: GOLD, textTransform: "uppercase",
      marginBottom: w <= 480 ? 8 : 12,
      fontFamily: "'Montserrat', sans-serif",
      textAlign: "center",
    }}>{children}</p>
  );
}

function Heading({ children, size = 40 }) {
  const w = useWindowWidth();
  let s = size;
  if (w <= 320) s = size * 0.5;
  else if (w <= 480) s = size * 0.62;
  else if (w <= 768) s = size * 0.82;
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: s, fontWeight: 800, lineHeight: 1.2,
      color: "#fff", textAlign: "center", margin: 0,
    }}>{children}</h2>
  );
}

const KEYFRAMES = `
  @keyframes pulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.7;transform:scale(1.06)} }
  @keyframes float { 0%,100%{transform:translate(50%,-50%) translateY(0)} 50%{transform:translate(50%,-50%) translateY(-18px)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
`;

// ── Navigation ──────────────────────────────────────────────────────────────
function Nav({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const w = useWindowWidth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTo = (page) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMobile = w <= 768;
  const logoH = w <= 480 ? 30 : 40;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,14,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${GOLD}25` : "none",
      transition: "all 0.4s ease",
      padding: w <= 480 ? "0 3%" : "0 5%",
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: w <= 480 ? 60 : 72 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: w <= 480 ? 8 : 12, cursor: "pointer", flexShrink: 0 }} onClick={() => goTo("Home")}>
          <img src={logo} alt="RR Logo" style={{ height: logoH, width: "auto", objectFit: "contain", borderRadius: 4 }} />
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 13 : 17, fontWeight: 800, color: "#fff", letterSpacing: "0.05em", lineHeight: 1.2 }}>RR PROMOTIONAL</div>
            {/* ── BRIGHTER "BAG MANUFACTURERS" text ── */}
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 7 : 9, letterSpacing: w <= 480 ? "0.2em" : "0.35em", color: BAG_MFR_COLOR, fontWeight: 700 }}>BAG MANUFACTURERS</div>
          </div>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: w <= 1100 ? 12 : 20 }}>
            {PAGES.map(p => (
              <button key={p} onClick={() => goTo(p)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif", fontSize: w <= 1100 ? 9 : 10, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: activePage === p ? GOLD : "#bbb",
                borderBottom: activePage === p ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom: 2, transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = activePage === p ? GOLD : "#bbb"}
              >{p}</button>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <button onClick={() => goTo("Contact")} style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            border: "none", borderRadius: 2, cursor: "pointer", flexShrink: 0,
            fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", color: DARK, padding: "9px 18px",
            textTransform: "uppercase", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >Get Quote</button>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#ccc", fontSize: w <= 480 ? 24 : 28, cursor: "pointer", padding: "6px" }}>
              {mobileOpen ? "✕" : "☰"}
            </button>
            {mobileOpen && (
              <div style={{
                position: "absolute", top: "100%", right: 0,
                background: "rgba(15,14,10,0.98)", backdropFilter: "blur(14px)",
                padding: w <= 480 ? "16px" : "20px", borderRadius: "0 0 8px 8px",
                borderLeft: `2px solid ${GOLD}`, minWidth: 200,
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}>
                {PAGES.map(p => (
                  <button key={p} onClick={() => goTo(p)} style={{
                    display: "block", width: "100%", textAlign: "left",
                    marginBottom: 14, background: "none", border: "none",
                    color: activePage === p ? GOLD : "#ccc",
                    fontSize: w <= 480 ? 12 : 14, fontWeight: 600,
                    letterSpacing: "0.1em", padding: "6px 0", cursor: "pointer",
                  }}>{p}</button>
                ))}
                <button onClick={() => goTo("Contact")} style={{
                  display: "block", width: "100%", marginTop: 8,
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  border: "none", borderRadius: 2, cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.15em", color: DARK, padding: "10px 16px", textTransform: "uppercase",
                }}>Get Quote</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// ── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setActivePage }) {
  const [loaded, setLoaded] = useState(false);
  const w = useWindowWidth();
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  const hSize = w > 768 ? 58 : w > 480 ? 44 : 34;

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `radial-gradient(ellipse at 60% 40%, #2e2710 0%, ${DARK_WARM} 55%, ${DARK} 100%)`,
      position: "relative", overflow: "hidden",
      padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px",
    }}>
      <style>{KEYFRAMES}</style>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 65% 45%, ${GOLD}10 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`, backgroundSize: w <= 480 ? "40px 40px" : "56px 56px" }} />
      <div style={{ position: "absolute", right: "5%", top: "18%", width: w <= 480 ? 180 : 460, height: w <= 480 ? 180 : 460, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}1a 0%, transparent 70%)`, animation: "pulse 9s ease-in-out infinite", pointerEvents: "none" }} />
      {w > 768 && [300, 400, 500].map((s, i) => (
        <div key={i} style={{ position: "absolute", right: "12%", top: "50%", transform: "translate(50%, -50%)", width: s, height: s, borderRadius: "50%", border: `1px solid ${GOLD}${["30", "20", "10"][i]}`, animation: `float ${10 + i * 2}s ease-in-out infinite`, pointerEvents: "none" }} />
      ))}

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
          {/* ── Updated location label ── */}
          <SectionLabel>Est. 2003 · {LOCATION_SHORT}</SectionLabel>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Heading size={hSize}>
              Premium Custom<br />
              <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Bag Manufacturers
              </span>
            </Heading>
          </div>

          {/* ── Tagline from brochure ── */}
          <p style={{
            fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 13 : 17,
            color: GOLD_LIGHT, fontStyle: "italic", margin: "14px 0 0",
            letterSpacing: "0.04em",
          }}>
            "Setting Your Promotional Ideas Free!"
          </p>

          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 16, lineHeight: 1.75, color: "#bbb", maxWidth: 620, margin: "0 auto 36px", textAlign: "center" }}>
            From corporate bags to sublimated workwear — we manufacture to your exact specifications.
            70 skilled staff · SABS-tested materials · In-house screen printing, embroidery &amp; sublimation.
          </p>

          <div style={{ display: "flex", gap: w <= 480 ? 12 : 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setActivePage("Contact")} style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              border: "none", borderRadius: 2, cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, fontWeight: 700,
              letterSpacing: "0.15em", color: DARK, padding: w <= 480 ? "12px 24px" : "15px 34px",
              textTransform: "uppercase", transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >Request a Quote</button>

            <button onClick={() => setActivePage("Products")} style={{
              background: "transparent", border: `1px solid ${GOLD}66`, borderRadius: 2, cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, fontWeight: 600,
              letterSpacing: "0.15em", color: GOLD, padding: w <= 480 ? "12px 24px" : "15px 34px",
              textTransform: "uppercase", transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.background = `${GOLD}11`; }}
              onMouseLeave={e => { e.target.style.borderColor = `${GOLD}66`; e.target.style.background = "transparent"; }}
            >Our Products</button>

            <button onClick={() => setActivePage("Sublimation")} style={{
              background: "transparent", border: `1px solid ${GOLD}44`, borderRadius: 2, cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, fontWeight: 600,
              letterSpacing: "0.15em", color: "#aaa", padding: w <= 480 ? "12px 24px" : "15px 34px",
              textTransform: "uppercase", transition: "border-color 0.2s, background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `${GOLD}0d`; e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}44`; e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#aaa"; }}
            >Sublimation</button>
          </div>

          <div style={{ display: "flex", gap: w <= 480 ? 20 : 44, flexWrap: "wrap", marginTop: w <= 480 ? 44 : 68, paddingTop: w <= 480 ? 24 : 36, borderTop: `1px solid ${GOLD}20`, justifyContent: "center" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 24 : 32, fontWeight: 800, color: GOLD }}>{s.num}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 8 : 10, letterSpacing: "0.2em", color: "#777", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT PAGE ──────────────────────────────────────────────────────────────
function AboutPage() {
  const [ref, inView] = useInView();
  const w = useWindowWidth();

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(160deg, ${DARK_WARM} 0%, ${DARK} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 25% 40%, ${GOLD}07 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div ref={ref} style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
        <SectionLabel>Who We Are</SectionLabel>
        <Heading size={44}>Crafting Excellence<br /><span style={{ color: GOLD }}>Since 2003</span></Heading>
        <GoldDivider />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, lineHeight: 1.85, color: "#999", maxWidth: 780, margin: "0 auto 24px" }}>
          RR Promotional Bag Manufacturers (T/A RML) has been a cornerstone of quality bag manufacturing for over 20 years.
          Based at our state-of-the-art facility in <strong style={{ color: "#ddd" }}>{LOCATION}</strong>, we serve corporate clients, schools, and promotional agencies across South Africa.
        </p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, lineHeight: 1.85, color: "#999", maxWidth: 780, margin: "0 auto 40px" }}>
          Our <strong style={{ color: "#ddd" }}>70-person production team</strong> works alongside a specialized design studio to bring every specification to life — whether from a physical sample or a technical drawing. All materials and components, including zips and fabric, are tested to <strong style={{ color: "#ddd" }}>SABS standards</strong>.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: w <= 600 ? "1fr" : "1fr 1fr", gap: 16, maxWidth: 700, margin: "0 auto 48px", textAlign: "left" }}>
          {[
            "In-house screen printing, embroidery & sublimation",
            "Custom manufacturing from drawings or samples",
            "Committed to skills development & social upliftment",
            "Cost-effective without compromising quality",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: DARK3, border: `1px solid ${GOLD}20`, borderRadius: 4, padding: "16px 20px" }}>
              <span style={{ color: GOLD, fontSize: 14, marginTop: 2, flexShrink: 0 }}>◆</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 12 : 13, color: "#aaa", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: DARK3, border: `1px solid ${GOLD}33`, borderRadius: 4, padding: w <= 480 ? 28 : 48, position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <div style={{ position: "absolute", top: -1, left: 60, right: 60, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <Crown size={w <= 480 ? 30 : 44} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 15 : 18, lineHeight: 1.75, color: "#ccc", fontStyle: "italic", margin: "20px 0 12px" }}>
            "Our mission is to provide customers with the highest possible quality in the most cost-effective manner."
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, lineHeight: 1.7, color: `${GOLD_LIGHT}cc`, fontStyle: "italic", margin: "0 0 16px" }}>
            "Setting Your Promotional Ideas Free!"
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginTop: 4, marginBottom: 0 }}>Our Mission</p>
        </div>
      </div>
    </section>
  );
}

// ── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ setActivePage }) {
  const [ref, inView] = useInView(0.05);
  const w = useWindowWidth();

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(170deg, ${DARK} 0%, ${DARK_WARM} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: w <= 480 ? 40 : 60 }}>
          <SectionLabel>What We Manufacture</SectionLabel>
          <Heading size={44}>Our Product Range</Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, color: "#888", maxWidth: 560, margin: "0 auto" }}>
            Every bag custom-built to your exact specifications, branding, and dimensions. Click any product to request a quote.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: w <= 480 ? "1fr" : w <= 768 ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: w <= 480 ? 16 : 24 }}>
          {PRODUCTS.map((p, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={p.name}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                onClick={() => { setActivePage("Contact"); window.scrollTo({ top: 0 }); }}
                style={{ background: hov ? DARK3 : "#100f0c", border: `1px solid ${hov ? GOLD + "70" : GOLD + "20"}`, borderRadius: 6, cursor: "pointer", transition: "all 0.3s ease", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transitionDelay: `${i * 55}ms`, overflow: "hidden" }}
              >
                <div style={{ position: "relative", height: w <= 480 ? 140 : 170, background: "#f5f5f5", overflow: "hidden" }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, background: `${GOLD}EE`, color: DARK, padding: "4px 10px", borderRadius: 3, fontSize: w <= 480 ? 8 : 9, fontWeight: 800, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.06em" }}>
                    ADD YOUR LOGO
                  </div>
                </div>
                <div style={{ padding: w <= 480 ? 16 : 22, textAlign: "center" }}>
                  <div style={{ fontSize: w <= 480 ? 24 : 30, marginBottom: 10 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 17 : 19, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{p.name}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#888", lineHeight: 1.6, margin: "0 0 14px" }}>{p.desc}</p>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase" }}>Request Quote →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── SUBLIMATION PAGE (NEW) ──────────────────────────────────────────────────
function SublimationPage({ setActivePage }) {
  const [ref, inView] = useInView(0.05);
  const w = useWindowWidth();

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(165deg, ${DARK} 0%, #1a1508 60%, ${DARK_WARM} 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Decorative background texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 30%, ${GOLD}09 0%, transparent 55%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: w <= 480 ? 40 : 64 }}>
          <SectionLabel>In-House Branding Suite</SectionLabel>
          <Heading size={44}>Sublimation &amp; Workwear</Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, color: "#888", maxWidth: 620, margin: "0 auto 24px" }}>
            Beyond bags — we offer a complete in-house branding solution. From vibrant sublimated tracksuits to corporate golf shirts, everything is produced under one roof alongside our embroidery and silk screen printing services.
          </p>
          {/* Branding methods strip */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 20 }}>
            {["Sublimation Printing", "Silk Screen Printing", "Embroidery"].map(method => (
              <span key={method} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 9 : 10, fontWeight: 700, letterSpacing: "0.15em", color: DARK, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, padding: "6px 14px", borderRadius: 2, textTransform: "uppercase" }}>{method}</span>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: w <= 480 ? "1fr" : w <= 768 ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: w <= 480 ? 16 : 24, marginBottom: w <= 480 ? 48 : 72 }}>
          {SUBLIMATION_ITEMS.map((item, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={item.name}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                onClick={() => { setActivePage("Contact"); window.scrollTo({ top: 0 }); }}
                style={{ background: hov ? DARK3 : "#100f0c", border: `1px solid ${hov ? GOLD + "70" : GOLD + "20"}`, borderRadius: 6, cursor: "pointer", transition: "all 0.3s ease", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transitionDelay: `${i * 60}ms`, overflow: "hidden" }}
              >
                <div style={{ position: "relative", height: w <= 480 ? 140 : 170, background: "#f5f5f5", overflow: "hidden" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, background: `${GOLD}EE`, color: DARK, padding: "4px 10px", borderRadius: 3, fontSize: w <= 480 ? 8 : 9, fontWeight: 800, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.06em" }}>
                    ADD YOUR LOGO
                  </div>
                </div>
                <div style={{ padding: w <= 480 ? 16 : 22, textAlign: "center" }}>
                  <div style={{ fontSize: w <= 480 ? 24 : 30, marginBottom: 10 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 17 : 19, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{item.name}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#888", lineHeight: 1.6, margin: "0 0 14px" }}>{item.desc}</p>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase" }}>Get a Quote →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div style={{ background: `linear-gradient(135deg, #1e1a08, ${DARK3})`, border: `1px solid ${GOLD}30`, borderRadius: 6, padding: w <= 480 ? "28px 20px" : "44px 56px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: 60, right: 60, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <Crown size={w <= 480 ? 28 : 38} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 22 : 28, color: "#fff", margin: "16px 0 10px" }}>One Supplier. Complete Branding.</h3>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, color: "#888", maxWidth: 540, margin: "0 auto 24px", lineHeight: 1.7 }}>
            Order your bags and your branded clothing together. One quote, one supplier, one delivery.
          </p>
          <button onClick={() => { setActivePage("Contact"); window.scrollTo({ top: 0 }); }} style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            border: "none", borderRadius: 2, cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, fontWeight: 700,
            letterSpacing: "0.15em", color: DARK, padding: w <= 480 ? "12px 24px" : "14px 32px",
            textTransform: "uppercase", transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "none"}
          >Request a Quote</button>
        </div>
      </div>
    </section>
  );
}

// ── GALLERY PAGE ────────────────────────────────────────────────────────────
function GalleryPage() {
  const [ref, inView] = useInView();
  const w = useWindowWidth();

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(160deg, ${DARK_WARM} 0%, ${DARK} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Real Projects</SectionLabel>
        <Heading size={44}>Manufacturing Gallery</Heading>
        <GoldDivider />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, color: "#888", maxWidth: 560, margin: "0 auto 36px" }}>
          Browse our recent manufacturing projects and custom bag solutions.
        </p>
        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: w <= 480 ? "1fr" : w <= 768 ? "repeat(2,1fr)" : "repeat(3,1fr)",
          gap: w <= 480 ? 16 : 24,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(28px)",
          transition: "all 0.8s ease",
        }}>
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} style={{
              height: w <= 480 ? 220 : 270,
              borderRadius: 6,
              border: `1px solid ${GOLD}20`,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.3s, border-color 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.025)"; e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = `${GOLD}20`; }}
            >
              <img
                src={item.image}
                alt={item.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Label overlay on hover */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,9,6,0.85) 0%, transparent 55%)",
                display: "flex", alignItems: "flex-end", padding: "16px 18px",
              }}>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: w <= 480 ? 11 : 13,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#555", marginTop: 32, fontStyle: "italic" }}>
          * Replace with actual client project photos once provided
        </p>
      </div>
    </section>
  );
}

// ── VALUES PAGE ─────────────────────────────────────────────────────────────
function ValuesPage() {
  const [ref, inView] = useInView(0.1);
  const w = useWindowWidth();
  const values = [
    { icon: "🤝", title: "Skills Development", desc: "We invest in our people. Every team member is trained and upskilled, building long-term careers within our production facility." },
    { icon: "🌍", title: "Community First", desc: "We are committed to promoting staff from previously disadvantaged communities, creating meaningful employment and opportunity." },
    { icon: "⭐", title: "Quality Without Compromise", desc: "All materials are SABS-tested. Our reputation is built on bags that last and branding that impresses." },
    { icon: "✏️", title: "Made to Your Specs", desc: "We manufacture from physical samples, technical drawings, or detailed descriptions — no order is too specific." },
  ];

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(170deg, ${DARK3} 0%, ${DARK} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.022, backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: "30px 30px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: w <= 480 ? 40 : 60 }}>
          <SectionLabel>What Drives Us</SectionLabel>
          <Heading size={44}>Our Values &amp; Impact</Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, color: "#888", maxWidth: 540, margin: "0 auto" }}>
            Manufacturing excellence is only part of who we are. We believe business should uplift people and communities.
          </p>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: w <= 640 ? "1fr" : "repeat(2,1fr)", gap: w <= 480 ? 16 : 24 }}>
          {values.map((v, i) => (
            <div key={v.title} style={{ background: DARK2, border: `1px solid ${GOLD}20`, borderRadius: 6, padding: w <= 480 ? 22 : 34, display: "flex", gap: 20, alignItems: "flex-start", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 16, bottom: 16, width: 3, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, borderRadius: 2 }} />
              <div style={{ fontSize: w <= 480 ? 26 : 34, flexShrink: 0, width: w <= 480 ? 46 : 56, height: w <= 480 ? 46 : 56, background: `${GOLD}10`, border: `1px solid ${GOLD}30`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>{v.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 16 : 19, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 12 : 13, color: "#888", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT PAGE ────────────────────────────────────────────────────────────
function ContactPage() {
  const [ref, inView] = useInView();
  const w = useWindowWidth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", bagType: "", dimensions: "", quantity: "", branding: "", notes: "", logoFile: null, logoFileName: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const isMobile = w <= 768;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, logoFile: file, logoFileName: file.name }));
  };

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "logoFile" && v) fd.append("logo", v);
        else if (k !== "logoFile" && k !== "logoFileName") fd.append(k, v);
      });
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (res.ok) setSubmitted(true);
      else throw new Error();
    } catch { setError("Failed to submit. Please try again or contact us directly."); }
    finally { setLoading(false); }
  };

  const inp = { width: "100%", background: "#0c0b08", border: `1px solid ${GOLD}30`, borderRadius: 2, padding: w <= 480 ? "10px 12px" : "13px 15px", color: "#fff", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 12 : 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const lbl = { fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 11, fontWeight: 700, letterSpacing: "0.15em", color: "#777", textTransform: "uppercase", display: "block", marginBottom: 7, textAlign: "left" };

  return (
    <section style={{ minHeight: "100vh", padding: w <= 480 ? "90px 4% 60px" : "110px 5% 80px", background: `linear-gradient(160deg, ${DARK_WARM} 0%, ${DARK} 100%)`, position: "relative" }}>
      <div ref={ref} style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <Heading size={44}>Request a <span style={{ color: GOLD }}>Custom Quote</span></Heading>
          <GoldDivider />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 13 : 15, lineHeight: 1.8, color: "#888", marginBottom: 28 }}>
            Tell us your specifications and we'll get back to you with a competitive manufacturing quote.
          </p>
        </div>

        {/* Contact details */}
        <div style={{ display: "flex", flexDirection: w <= 640 ? "column" : "row", gap: 16, justifyContent: "center", marginBottom: 24, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.1s" }}>
          {[
            { icon: "📞", label: "Phone", val: "031 537 3788 / 083 443 6915", href: "tel:0315373788" },
            { icon: "✉️", label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
            { icon: "📍", label: "Location", val: LOCATION, href: null },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", gap: 12, alignItems: "center", background: DARK3, border: `1px solid ${GOLD}18`, borderRadius: 4, padding: "14px 18px", flex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: 2, background: `${GOLD}14`, border: `1px solid ${GOLD}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", margin: "0 0 3px" }}>{c.label}</p>
                {c.href ? <a href={c.href} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#ccc", textDecoration: "none" }}>{c.val}</a>
                  : <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#ccc", margin: 0 }}>{c.val}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20custom%20bags.`} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#128C7E1a", border: "1px solid #128C7E55", borderRadius: 2, padding: "11px 24px", textDecoration: "none", transition: "background 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#128C7E2e"; e.currentTarget.style.borderColor = "#25D366"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#128C7E1a"; e.currentTarget.style.borderColor = "#128C7E55"; }}
          >
            <svg width={w <= 480 ? 18 : 22} height={w <= 480 ? 18 : 22} viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#25D366" />
              <path d="M23.5 8.5A10.44 10.44 0 0 0 16 5.5C10.75 5.5 6.5 9.75 6.5 15a9.44 9.44 0 0 0 1.27 4.74L6.5 26.5l6.93-1.82A9.44 9.44 0 0 0 16 25.5c5.25 0 9.5-4.25 9.5-9.5a9.44 9.44 0 0 0-2-6.5zm-7.5 14.6a7.85 7.85 0 0 1-4-.96l-.29-.17-3 .79.8-2.93-.19-.3A7.9 7.9 0 1 1 16 23.1zm4.33-5.9c-.24-.12-1.4-.69-1.61-.77s-.37-.12-.53.12-.61.77-.75.93-.28.18-.51.06a6.43 6.43 0 0 1-1.9-1.17 7.13 7.13 0 0 1-1.31-1.63c-.14-.24 0-.37.1-.49s.24-.28.36-.42a1.6 1.6 0 0 0 .24-.4.44.44 0 0 0 0-.42c-.06-.12-.53-1.28-.73-1.75s-.38-.4-.53-.4h-.45a.87.87 0 0 0-.63.3 2.65 2.65 0 0 0-.82 1.97 4.6 4.6 0 0 0 .96 2.44 10.54 10.54 0 0 0 4.03 3.57c.56.24 1 .39 1.34.5a3.22 3.22 0 0 0 1.48.09 2.43 2.43 0 0 0 1.59-1.12 1.97 1.97 0 0 0 .14-1.12c-.06-.1-.22-.16-.46-.28z" fill="#fff"/>
            </svg>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 12, fontWeight: 700, color: "#25D366", margin: 0, letterSpacing: "0.1em" }}>WHATSAPP US</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 9 : 10, color: "#777", margin: 0 }}>083 443 6915 · Quick response</p>
            </div>
          </a>
        </div>

        {/* Quote form */}
        <div style={{ background: DARK3, border: `1px solid ${GOLD}30`, borderRadius: 6, padding: w <= 480 ? 22 : 44, position: "relative", textAlign: "left", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease 0.2s" }}>
          <div style={{ position: "absolute", top: -1, left: 48, right: 48, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <Crown size={w <= 480 ? 38 : 52} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 22 : 28, color: "#fff", margin: "18px 0 12px" }}>Quote Received!</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#888", fontSize: w <= 480 ? 12 : 14, lineHeight: 1.7 }}>
                Thank you, <strong style={{ color: GOLD }}>{form.name}</strong>. We'll review your specs and get back to you shortly.
              </p>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", company: "", email: "", phone: "", bagType: "", dimensions: "", quantity: "", branding: "", notes: "", logoFile: null, logoFileName: "" }); }}
                style={{ marginTop: 20, background: "none", border: `1px solid ${GOLD}44`, borderRadius: 2, color: GOLD, padding: "8px 20px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.15em" }}>
                SUBMIT ANOTHER
              </button>
            </div>
          ) : (
            <>
              {error && <div style={{ background: "#ff000014", border: "1px solid #ff0000", borderRadius: 4, padding: "10px", marginBottom: 16, color: "#ff6666", fontSize: 13, textAlign: "center" }}>{error}</div>}
              <div style={{ display: "flex", gap: 8, marginBottom: w <= 480 ? 22 : 30 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <div style={{ width: w <= 480 ? 24 : 28, height: w <= 480 ? 24 : 28, borderRadius: "50%", flexShrink: 0, background: step >= s ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#1a1a1a", border: `1px solid ${step >= s ? "transparent" : GOLD + "28"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 11, fontWeight: 700, color: step >= s ? DARK : "#555" }}>{s}</div>
                    {s < 3 && <div style={{ flex: 1, height: 1, background: step > s ? GOLD : `${GOLD}20` }} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: w <= 480 ? 14 : 18 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 18 : 20, color: "#fff", margin: "0 0 6px", textAlign: "center" }}>Your Details</p>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                    <div><label style={lbl}>Full Name *</label><input value={form.name} onChange={set("name")} placeholder="Jane Smith" style={inp} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = `${GOLD}30`} /></div>
                    <div><label style={lbl}>Company / School</label><input value={form.company} onChange={set("company")} placeholder="Optional" style={inp} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                    <div><label style={lbl}>Email *</label><input value={form.email} onChange={set("email")} type="email" placeholder="you@company.com" style={inp} /></div>
                    <div><label style={lbl}>Phone</label><input value={form.phone} onChange={set("phone")} placeholder="0xx xxx xxxx" style={inp} /></div>
                  </div>
                  <button onClick={() => setStep(2)} disabled={!form.name || !form.email} style={{ background: form.name && form.email ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#1e1e1e", border: "none", borderRadius: 2, cursor: form.name && form.email ? "pointer" : "not-allowed", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: form.name && form.email ? DARK : "#444", padding: "13px 24px", textTransform: "uppercase", width: "100%" }}>Continue →</button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: w <= 480 ? 14 : 18 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 18 : 20, color: "#fff", margin: "0 0 6px", textAlign: "center" }}>Order Specifications</p>
                  <div><label style={lbl}>Product Type *</label>
                    <select value={form.bagType} onChange={set("bagType")} style={{ ...inp, appearance: "none" }}>
                      <option value="">Select a category...</option>
                      <optgroup label="── Bags ──">{BAG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</optgroup>
                      <optgroup label="── Sublimation & Workwear ──">{SUBLIMATION_ITEMS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}</optgroup>
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                    <div><label style={lbl}>Dimensions (H×W×D cm)</label><input value={form.dimensions} onChange={set("dimensions")} placeholder="e.g. 40×30×15 or N/A" style={inp} /></div>
                    <div><label style={lbl}>Quantity *</label><input value={form.quantity} onChange={set("quantity")} type="number" placeholder="e.g. 500" style={inp} /></div>
                  </div>
                  <div>
                    <label style={lbl}>Branding Preference</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {BRANDING.map(b => (<button key={b} onClick={() => setForm(f => ({ ...f, branding: b }))} style={{ background: form.branding === b ? `${GOLD}20` : "transparent", border: `1px solid ${form.branding === b ? GOLD : GOLD + "28"}`, borderRadius: 2, cursor: "pointer", padding: "7px 14px", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 12, fontWeight: 600, color: form.branding === b ? GOLD : "#666" }}>{b}</button>))}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Upload Logo / Artwork</label>
                    <div onClick={() => fileInputRef.current?.click()} style={{ width: "100%", boxSizing: "border-box", background: "#0c0b08", border: `1px dashed ${form.logoFileName ? GOLD : GOLD + "38"}`, borderRadius: 2, padding: "16px", cursor: "pointer", textAlign: "center", transition: "border-color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                      onMouseLeave={e => e.currentTarget.style.borderColor = form.logoFileName ? GOLD : `${GOLD}38`}
                    >
                      <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps" onChange={handleFile} style={{ display: "none" }} />
                      {form.logoFileName ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                          <span>✅</span>
                          <div><p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: GOLD, margin: 0, fontWeight: 600 }}>{form.logoFileName}</p><p style={{ fontSize: 10, color: "#666", margin: "2px 0 0" }}>Click to change</p></div>
                        </div>
                      ) : (
                        <div><p style={{ fontSize: 26, marginBottom: 6 }}>📎</p><p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#777", margin: 0 }}>Click to upload logo or artwork</p><p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#555", margin: "4px 0 0" }}>PNG, JPG, SVG, PDF, AI, EPS</p></div>
                      )}
                    </div>
                    {form.logoFileName && <button onClick={(e) => { e.stopPropagation(); setForm(f => ({ ...f, logoFile: null, logoFileName: "" })); if (fileInputRef.current) fileInputRef.current.value = ""; }} style={{ marginTop: 6, background: "none", border: "none", cursor: "pointer", fontSize: 10, color: "#666", textDecoration: "underline", display: "block" }}>Remove file</button>}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
                    <button onClick={() => setStep(1)} style={{ background: "none", border: `1px solid ${GOLD}28`, borderRadius: 2, cursor: "pointer", color: "#666", padding: "11px 18px", flex: 1 }}>← Back</button>
                    <button onClick={() => setStep(3)} disabled={!form.bagType || !form.quantity} style={{ background: form.bagType && form.quantity ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#1e1e1e", border: "none", borderRadius: 2, cursor: form.bagType && form.quantity ? "pointer" : "not-allowed", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: form.bagType && form.quantity ? DARK : "#444", padding: "11px 18px", flex: 1 }}>Continue →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: w <= 480 ? 14 : 18 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 18 : 20, color: "#fff", margin: "0 0 6px", textAlign: "center" }}>Additional Notes</p>
                  <div><label style={lbl}>Special Requirements / Notes</label><textarea value={form.notes} onChange={set("notes")} rows={4} placeholder="Describe any specific requirements, materials, colors..." style={{ ...inp, resize: "vertical" }} /></div>
                  <div style={{ background: "#0a0906", border: `1px solid ${GOLD}18`, borderRadius: 2, padding: 18 }}>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 12, textAlign: "center" }}>QUOTE SUMMARY</p>
                    {[["Contact", form.name + (form.company ? ` · ${form.company}` : "")], ["Product", form.bagType], ["Quantity", form.quantity], ["Branding", form.branding || "Not specified"], ["Logo", form.logoFileName || "Not uploaded"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "#666" }}>{k}</span>
                        <span style={{ fontSize: 12, color: "#ccc", fontWeight: 600, maxWidth: "60%", textAlign: "right", wordBreak: "break-word" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
                    <button onClick={() => setStep(2)} style={{ background: "none", border: `1px solid ${GOLD}28`, borderRadius: 2, cursor: "pointer", color: "#666", padding: "11px 18px", flex: 1 }}>← Back</button>
                    <button onClick={handleSubmit} disabled={loading} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, border: "none", borderRadius: 2, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: DARK, padding: "11px 18px", textTransform: "uppercase", opacity: loading ? 0.7 : 1, flex: 1 }}>
                      {loading ? "Sending..." : "Submit Quote Request"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setActivePage }) {
  const w = useWindowWidth();
  const isMobile = w <= 768;

  return (
    <footer style={{ background: "#080705", padding: w <= 480 ? "40px 4% 28px" : "70px 5% 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #110e00, #0a0806)", border: `1px solid ${GOLD}28`, borderRadius: 6, padding: w <= 480 ? "24px 18px" : "44px 52px", marginBottom: w <= 480 ? 40 : 56, textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: 48, right: 48, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
          <Crown size={w <= 480 ? 24 : 34} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 14 : w <= 768 ? 16 : 18, lineHeight: 1.75, color: "#bbb", fontStyle: "italic", maxWidth: 700, margin: "18px auto 0" }}>
            "And Jabez called on the God of Israel saying, 'Oh, that You would bless me indeed, and enlarge my territory, that Your hand would be with me, and that You would keep me from evil, that I may not cause pain!' So God granted him what he requested."
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 11, letterSpacing: "0.2em", color: GOLD, marginTop: 16, textTransform: "uppercase" }}>— 1 Chronicles 4:10 (NKJV)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 28 : 44, marginBottom: isMobile ? 28 : 44, textAlign: isMobile ? "center" : "left" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, justifyContent: isMobile ? "center" : "flex-start" }}>
              <img src={logo} alt="RR Logo" style={{ height: w <= 480 ? 28 : 34, width: "auto", objectFit: "contain", borderRadius: 4 }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: w <= 480 ? 13 : 15, fontWeight: 800, color: "#fff" }}>RR PROMOTIONAL</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, letterSpacing: "0.3em", color: BAG_MFR_COLOR, fontWeight: 700 }}>BAG MANUFACTURERS</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", lineHeight: 1.7, maxWidth: isMobile ? "100%" : 270 }}>
              Premium custom bag manufacturers since 2003. 70 staff · SABS-tested · {LOCATION_SHORT}.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>Products</p>
            {["Conference Bags", "Cooler Bags", "School Bags", "Promotional Bags", "Sublimation"].map(p => (
              <p key={p} onClick={() => { setActivePage(p === "Sublimation" ? "Sublimation" : "Products"); window.scrollTo({ top: 0 }); }}
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#555"}
              >{p}</p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>Contact</p>
            <a href="tel:0315373788" style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", marginBottom: 8, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = "#555"}>031 537 3788</a>
            <a href="tel:0834436915" style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", marginBottom: 8, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = "#555"}>083 443 6915</a>
            <a href={`mailto:${EMAIL}`} style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", marginBottom: 8, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = "#555"}>{EMAIL}</a>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 11 : 13, color: "#555", marginBottom: 10 }}>{LOCATION}</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#25D366", textDecoration: "none" }}>
              <span>💬</span> WhatsApp Us
            </a>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${GOLD}12`, paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, flexDirection: isMobile ? "column" : "row", textAlign: "center", alignItems: "center" }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 11, color: "#3a3830", margin: 0 }}>
            © {new Date().getFullYear()} RR Promotional Bag Manufacturers (T/A RML). All rights reserved.
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: w <= 480 ? 10 : 11, color: "#3a3830", margin: 0 }}>
            Developed by{" "}
            <a href="https://afribizconnect.co.za/" target="_blank" rel="noopener noreferrer"
              style={{ color: GOLD, textDecoration: "none", fontWeight: 500, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.8"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >Afribiz</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Scroll To Top ─────────────────────────────────────────────────────────
function ScrollToTop() {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label="Scroll to top"
      style={{ position: "fixed", bottom: 30, right: 26, zIndex: 200, width: 46, height: 46, borderRadius: "50%", border: `1px solid ${hov ? GOLD : GOLD + "55"}`, background: hov ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "rgba(15,14,10,0.93)", backdropFilter: "blur(10px)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hov ? `0 0 22px ${GOLD}44` : "0 4px 18px rgba(0,0,0,0.5)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(14px) scale(0.85)", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", pointerEvents: vis ? "auto" : "none" }}>
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 11.5L9 5.5L14.5 11.5" stroke={hov ? DARK : GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────
function App() {
  const [activePage, setActivePage] = useState("Home");
  const renderPage = () => {
    switch (activePage) {
      case "Home":         return <HomePage setActivePage={setActivePage} />;
      case "About":        return <AboutPage />;
      case "Products":     return <ProductsPage setActivePage={setActivePage} />;
      case "Sublimation":  return <SublimationPage setActivePage={setActivePage} />;
      case "Gallery":      return <GalleryPage />;
      case "Values":       return <ValuesPage />;
      case "Contact":      return <ContactPage />;
      default:             return <HomePage setActivePage={setActivePage} />;
    }
  };
  return (
    <div style={{ background: DARK, minHeight: "100vh" }}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <Footer setActivePage={setActivePage} />
      <ScrollToTop />
    </div>
  );
}

export default App;