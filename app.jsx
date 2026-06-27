/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Data ----------
const PROJECTS = [
  { id: "nextstep", name: "NextStep50", year: "2027", tag: "Career", filter: "career", color: "orange", titleColor: "var(--orange)", desc: "Career mentoring for professional women across generations.", span: "span-4", flower: "alstroemeria", page: "nextstep50.html" },
  { id: "ailab", name: "AI Lab", year: "2027", tag: "Learning", filter: "learning", color: "ink", titleColor: "#ffffff", desc: "AI literacy for NextStep50 women, women in career transition, and organization teams.", span: "span-4", flower: "magnolia", page: "ai-lab.html" },
  { id: "networking", name: "Networking", year: "2027", tag: "Community", filter: "career", color: "cream", titleColor: "#527318", desc: "Where women connect across generations, exchanging experience, perspectives, and what they wish someone had told them earlier.", span: "span-4", flower: "eucalyptus", page: "networking.html" },
  { id: "field", name: "Field Notes", year: "2027", tag: "Writing", filter: "writing", color: "cream", titleColor: "var(--fg)", desc: "Ongoing notes on motivation, AI, and learning at any age.", span: "span-6", flower: "cherry", page: "field-notes.html" },
  { id: "loom", name: "Bloom Sessions", year: "2027", tag: "Practice", filter: "practice", color: "ink", titleColor: "#ffffff", desc: "Live, hands-on group sessions where we build something real with AI tools — together, in real time.", span: "span-6", flower: "daisy", page: "bloom-sessions.html" },
  { id: "studio", name: "AI Studio", year: "2027", tag: "Build", filter: "build", color: "ink", titleColor: "#ffffff", desc: "AI for organizations — process automation, custom agents, web & app prototypes, and team training.", span: "span-12", flower: "studio", page: "ai-studio.html" },
];

const SERVICES = [
  { num: "01", name: "AI courses", desc: "AZAV-certified courses in artificial intelligence, in person and online. Funding-eligible, for individuals and teams starting from zero.", tags: ["AZAV", "In-person", "Online"] },
  { num: "02", name: "Tool practice", desc: "Hands-on online sessions where we do nothing but practise the tools we use: prompts, workflows, and real tasks, until they feel like yours.", tags: ["Online", "Hands-on", "Live"] },
  { num: "03", name: "Q&A sessions", desc: "Open online sessions to bring your questions: about a tool, a workflow, or where to start. No question too small.", tags: ["Online", "Group"] },
  { num: "04", name: "Career mentoring", desc: "One-to-one mentoring for professional women navigating change, re-entry, or a next step, with clarity and a plan.", tags: ["1:1", "Career"] },
  { num: "05", name: "Educational coaching", desc: "Sessions on motivation and how to actually learn: the techniques and habits that make new skills stick at any age.", tags: ["Mindset", "Technique"] },
  { num: "06", name: "For teams", desc: "AI Literacy training for your team. Practical, human-centred, and tailored to the way you actually work.", tags: ["AI Literacy"] },
];

// B2B · done-with-you build track (distinct from the "learn" services above).
const ORG_SERVICES = [
  { num: "01", name: "App & web prototypes", desc: "A working prototype of your product idea — built fast, AI-assisted, and run like a real project, so you can put it in front of real users before you commit.", tags: ["MVP", "Web", "App"] },
  { num: "02", name: "AI agents", desc: "Custom AI agents that take on real work — research, drafting, triage, support — designed around the tools your team already uses.", tags: ["Custom", "Workflows"] },
  { num: "03", name: "Process automation", desc: "Quiet automation for the repetitive work that slows you down, connecting your existing tools so your people focus on the human part.", tags: ["Automation", "Integrations"] },
];

// ---------- Positioning copy ----------
// Centralised so it can be translated per locale later (DE · ES · FR · IT).
const POSITIONING = {
  servicesLede: "AI literacy for professionals.",
  servicesTagline: "Judgment, not just prompts.",
};

const PROCESS = [
  { n: "01", name: "Listen", desc: "Understand the people and the real problem — not just the brief." },
  { n: "02", name: "Frame", desc: "One page that names the problem and the choices. Nothing more." },
  { n: "03", name: "Prototype", desc: "A working prototype in front of real users, fast. Keep what works." },
  { n: "04", name: "Ship", desc: "A small, working version that earns the right to grow." },
];

const POSTS = [
  { date: "Field Notes · 01", title: "Why connection still beats the algorithm", tag: "Essay", read: "6 min", href: "field-notes.html" },
  { date: "Field Notes · 02", title: "Learning at any age — it's never too late", tag: "Essay", read: "8 min", href: "field-notes.html" },
  { date: "Field Notes · 03", title: "AI in education: a tool, not a teacher", tag: "Notes", read: "10 min", href: "field-notes.html" },
  { date: "Field Notes · 04", title: "Staying motivated when you start over", tag: "Essay", read: "5 min", href: "field-notes.html" },
];

// ---------- Reveal hook ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute("data-shown", "true");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ---------- Nav ----------
function Nav({ theme, setTheme, time }) {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">mlcardosa<span className="bull"></span>space</a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#writing">Writing</a>
        <a href="#contact">Contact</a>
        <div className="nav-dropdown">
          <button className="nav-dd-trigger" type="button">Pages <span className="caret">▾</span></button>
          <div className="nav-dd-menu" role="menu">
            <a href="nextstep50.html">NextStep50 <span className="ext">↗</span></a>
            <a href="ai-lab.html">AI Lab <span className="ext">↗</span></a>
            <a href="bloom-sessions.html">Bloom Sessions <span className="ext">↗</span></a>
            <a href="ai-studio.html">AI Studio <span className="ext">↗</span></a>
            <a href="networking.html">Networking <span className="ext">↗</span></a>
            <a href="field-notes.html">Field Notes <span className="ext">↗</span></a>
          </div>
        </div>
      </div>
      <div className="nav-meta">
        <span className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="live-dot" /> Düsseldorf · {time}
        </span>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "◐" : "◑"} {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-mark" />
      <div className="hero-inner">
        <h1 className="hero-title" data-reveal>
          <span className="accent-orange">Connection</span>
          <br />
          is the most
          <br />
          <span className="accent-aqua">powerful</span>
          <br />
          technology.
        </h1>
        <div className="hero-side" data-reveal>
          <div className="hero-eyebrow"><span className="bar" /> María Luisa Cardosa Heredia · 2026</div>
          <div className="hero-disciplines">
            <span>Career&nbsp;Mentoring</span>
            <span className="sep" />
            <span>Educational&nbsp;Coaching</span>
            <span className="sep" />
            <span>Applied&nbsp;AI</span>
          </div>
          <p className="hero-blurb">
            I am a passionate educational coach and mentor who believes that learning happens through meaningful connections, clear communication, and trust. I help people grow by guiding their learning journey and supporting their professional development. At the same time, I am deeply interested in artificial intelligence and how it can enhance education and human-centered innovation.
          </p>
          <a className="hero-cta" href="#work">Projects →</a>
        </div>
      </div>
      <div className="hero-meta-row" data-reveal>
        <div><span className="label">Currently</span><span className="val">NextStep50 · AI Lab</span></div>
        <div><span className="label">Based in</span><span className="val">Düsseldorf · 51.2°N</span></div>
        <div><span className="label">Offering</span><span className="val">Career Mentoring · Educational Coaching · Applied AI</span></div>
        <div><span className="label">Languages</span><span className="val">DE · EN · ES · FR · IT</span></div>
      </div>
    </section>
  );
}

// ---------- Marquee ----------
function Marquee() {
  const items = (
    <span>
      Career Mentoring <span className="dot" /> Educational Coaching <span className="dot aqua" />
      AI Literacy <span className="dot lime" /> Bloom Sessions <span className="dot" />
      AI Studio <span className="dot aqua" /> Düsseldorf &amp; online <span className="dot lime" />
      AZAV-certified AI courses <span className="dot" />
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items}{items}{items}{items}
      </div>
    </div>
  );
}

// ---------- Belief ----------
function Belief() {
  return (
    <section className="belief">
      <div className="belief-inner" data-reveal>
        <span className="belief-mark" aria-hidden="true">&ldquo;</span>
        <blockquote>
          AI is not a substitute for <em>human connection.</em> It can accompany you, listen, think alongside you, but it cannot replace what another person can give you.
        </blockquote>
        <div className="attrib">Field Notes, 2026</div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <section className="section" id="about">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 01 · About</div>
        <h2 className="section-title">A <span className="accent">space</span> of one,<br/>quietly busy.</h2>
      </div>
      <div className="about-grid">
        <div className="about-bio" data-reveal>
          <p>
            I am a passionate <strong>educator and lifelong learner</strong> who believes that teaching is not just about transferring knowledge, but about creating meaningful connections and empowering people to grow. For me, communication is the heart of learning: it's in the exchange of ideas, questions and stories where real transformation happens.
          </p>
          <p>
            At the same time, I have discovered a new passion in <strong>artificial intelligence</strong> and its potential to transform education and project management. I am currently studying AI applied to project management, exploring how technology can support better planning, collaboration and decision-making, while always keeping the human element at the center.
          </p>
          <p>
            For me, the intersection of <strong>teaching, communication and AI</strong> is where the future lies: where clear connection, empathy and innovation come together to create more effective and inclusive ways of learning and working.
          </p>

        </div>
        <figure className="about-portrait-fig" data-reveal>
          <div className="about-portrait" data-c="cream" style={{ backgroundImage: 'url("' + ((window.__resources && window.__resources.portrait) || "assets/maria-luisa-portrait.png") + '")', backgroundSize: 'cover', backgroundPosition: 'center 32%', filter: 'grayscale(1) contrast(1.02)' }}>
          </div>
          <figcaption className="about-portrait-cap">
            <span className="cap-name">María Luisa Cardosa</span>
            <span>Düsseldorf · 2026</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ---------- Work ----------
function Work({ projects, onHover, onLeave }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All" },
    { id: "career", label: "Career" },
    { id: "learning", label: "Learning" },
    { id: "build", label: "Build" },
    { id: "practice", label: "Practice" },
    { id: "writing", label: "Writing" },
  ];
  return (
    <section className="section" id="work">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 02 · Projects</div>
        <h2 className="section-title">Projects,<br/><span className="accent">on purpose.</span></h2>
      </div>
      <div className="work-filters" data-reveal>
        {filters.map((f) => (
          <button key={f.id} className="work-filter" data-active={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {projects.map((p, i) => {
          const hidden = filter !== "all" && filter !== p.filter;
          return (
            <a
              key={p.id}
              className={`work-card ${p.span}`}
              data-hidden={hidden}
              data-page={p.page ? "true" : undefined}
              data-reveal
              onMouseEnter={(e) => onHover(p, e)}
              onMouseMove={(e) => onHover(p, e)}
              onMouseLeave={onLeave}
              href={p.page || `#${p.id}`}
            >
              <div className="thumb">
                <div className="thumb-fill ph" data-c={p.color} data-flower={p.flower} />
                <div className="thumb-tag">{p.tag}</div>
                <div className="thumb-num">N°{String(i + 1).padStart(2, "0")}</div>
                {p.page && <div className="thumb-visit">Visit page ↗</div>}
                <div className="thumb-big-title" style={{ color: p.titleColor }}>{p.name}</div>
              </div>
              <div className="work-meta">
                <div>
                  <div className="work-name">{p.name}{p.page && <span className="work-name-ext">↗</span>}</div>
                  <div className="work-desc">{p.desc}</div>
                </div>
                <div className="work-year">{p.year}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

// ---------- Services ----------
function Services() {
  return (
    <section className="section" id="services">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 03 · Services</div>
        <div className="section-head-main">
          <h2 className="section-title">Ways to <span className="accent">work</span><br/>together.</h2>
        </div>
      </div>
      <div className="services">
        {SERVICES.map((s) => (
          <div key={s.num} className="service" data-reveal>
            <div className="service-num">{s.num}</div>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="services-org-head" data-reveal>
        <div className="section-num">For organizations</div>
        <h3 className="services-org-title">Built <span className="accent">with</span> you, not just taught.</h3>
      </div>
      <div className="services services-org">
        {ORG_SERVICES.map((s) => (
          <div key={s.num} className="service" data-reveal>
            <div className="service-num">{s.num}</div>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="services-note" data-reveal style={{
        maxWidth: "var(--max)", margin: "0 auto", padding: "28px var(--pad) 0",
        display: "flex", flexWrap: "wrap", gap: "10px 28px", alignItems: "baseline",
        fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase",
        letterSpacing: "0.14em", color: "var(--muted)"
      }}>
        <span style={{ color: "var(--fg)" }}>Pricing</span>
        <span>By membership or by course, both available</span>
        <span>AI courses are AZAV-certified &amp; funding-eligible</span>
      </div>
    </section>
  );
}

// ---------- Prototyping / Process ----------
function Process() {
  return (
    <section className="section" id="prototyping">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 04 · How I work</div>
        <h2 className="section-title">From idea to<br/>working <span className="accent">prototype.</span></h2>
      </div>
      <div className="process">
        {PROCESS.map((p) => (
          <div key={p.n} className="process-step" data-reveal>
            <div className="step-num">{p.n}</div>
            <div className="step-name">{p.name}</div>
            <div className="step-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Writing ----------
function Writing() {
  return (
    <section className="section" id="writing">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 05 · Writing</div>
        <h2 className="section-title">Notes from the <span className="accent">desk.</span></h2>
      </div>
      <div className="writing">
        {POSTS.map((p, i) => (
          <a key={i} className="writing-item" href={p.href || "#"} data-reveal>
            <span className="date">{p.date}</span>
            <span className="title">{p.title}</span>
            <span className="tag">{p.tag}</span>
            <span className="read">{p.read} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Now ----------
function Now() {
  return (
    <section className="section" id="now">
      <div className="section-head" data-reveal>
        <div className="section-num">§ 06 · Currently</div>
        <h2 className="section-title">A page that <span className="accent">moves.</span></h2>
      </div>
      <div className="now" data-reveal>
        <div>
          <h4>Working on</h4>
          <ul>
            <li><span className="icon" /><span className="text">Opening <em>NextStep50</em>'s next mentoring cohort.</span></li>
            <li><span className="icon" /><span className="text">Building <em>AI Lab</em> course materials, AZAV-ready.</span></li>
            <li><span className="icon" /><span className="text">Writing the first <em>Field Notes</em> essay on learning at any age.</span></li>
          </ul>
          <div className="now-time"><span className="live-dot" /> Updated 14:32 · Düsseldorf</div>
        </div>
        <div>
          <h4>Reading & thinking</h4>
          <ul>
            <li className="reading"><span className="icon" /><span className="text">Following: the newsletters leading the conversation on AI.</span></li>
            <li className="reading"><span className="icon" /><span className="text">Reading: a stack of books I'll tell you about soon.</span></li>
            <li className="reading"><span className="icon" /><span className="text">Watching: YouTube talks from experts across the topics I work on, not just AI.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------- Newsletter ----------
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter" id="newsletter">
      <div data-reveal>
        <h3>A <em className="serif">slow letter,</em><br/>once a month.</h3>
        <p>Some months a few notes, some months one essay, never both. No tracking, no tricks. Reply to anything.</p>
      </div>
      <div data-reveal>
        <form onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); } }}>
          <input
            type="email" required placeholder="you@somewhere.email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe →</button>
        </form>
        <div className="ack" data-shown={sent}>✓ You're in. Check your inbox for a soft hello.</div>
      </div>
    </section>
  );
}

// ---------- Contact CTA ----------
function ContactCTA() {
  return (
    <section className="contact-cta" id="contact">
      <div className="contact-cta-inner">
        <div className="contact-cta-text">
          <div className="label">§ 07 · Contact</div>
          <h2 data-reveal>
            Let's make<br />
            something<br />
            <span className="accent">together.</span>
          </h2>
          <a className="email" href="mailto:mlcardosa@mlcardosa.space">mlcardosa@mlcardosa.space →</a>
        </div>
        <figure className="contact-cta-media" data-reveal>
          <img src={(window.__resources && window.__resources.contactPhoto) || "uploads/hannes-egler-a9zeXX25lC8-unsplash.jpg"} alt="Neon sign on a brick wall reading ‘Come run with us’" />
        </figure>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">mlcardosa<span className="bull"></span>space</div>
        <div className="footer-tag">Coaching &amp; AI education. Düsseldorf &amp; online. AZAV-certified courses.</div>
      </div>
      <div className="footer-col">
        <h5>Index</h5>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Projects</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#writing">Writing</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Elsewhere</h5>
        <ul>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Substack</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:mlcardosa@mlcardosa.space">mlcardosa@mlcardosa.space</a></li>
          <li><a href="#">Tel. · auf Anfrage</a></li>
          <li><a href="#">Düsseldorf</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <span>© 2026 · María Luisa Cardosa Heredia · All rights reserved</span>
        <span>Built in Düsseldorf · No cookies, no tracking</span>
      </div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  const TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS || {
    accent: "orange",
    density: "airy",
    cursorPreview: true,
    serifFont: "Instrument Serif",
  };
  const [vals, setTweak] = (window.useTweaks || ((d) => [d, () => {}]))(TWEAK_DEFAULTS);

  const [theme, setTheme] = useState("light");
  const [time, setTime] = useState("");
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  // Apply accent
  useEffect(() => {
    const map = { orange: "#FF6B2B", aqua: "#5BC4C5", lime: "#C9FF6B", magenta: "#FF6BD2" };
    document.documentElement.style.setProperty("--orange", map[vals.accent] || map.orange);
  }, [vals.accent]);

  useEffect(() => {
    const fontMap = {
      "Instrument Serif": "'Instrument Serif', serif",
      "DM Serif Display": "'DM Serif Display', serif",
      "Playfair Display": "'Playfair Display', serif",
    };
    document.documentElement.style.setProperty("--serif", fontMap[vals.serifFont] || fontMap["Instrument Serif"]);
  }, [vals.serifFont]);

  useEffect(() => {
    const pad = vals.density === "tight" ? "clamp(36px, 6vw, 88px)" : "clamp(48px, 8vw, 128px)";
    document.documentElement.style.setProperty("--gap-lg", pad);
  }, [vals.density]);

  // Cursor preview
  const onHover = (p, e) => {
    if (!vals.cursorPreview) return;
    setHovered(p);
    setPos({ x: e.clientX, y: e.clientY });
  };
  const onLeave = () => setHovered(null);

  useEffect(() => {
    const onMove = (e) => { if (hovered) setPos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hovered]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;
  const TweakToggle = window.TweakToggle;
  const TweakSelect = window.TweakSelect;

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} time={time} />
      <Hero />
      <Marquee />
      <Belief />
      <About />
      <Work projects={PROJECTS} onHover={onHover} onLeave={onLeave} />
      <Services />
      <Process />
      <Writing />
      <Now />
      <Newsletter />
      <ContactCTA />
      <Footer />

      <div
        className="cursor-preview ph"
        data-c={hovered?.color || "cream"}
        data-active={!!hovered}
        style={{ left: pos.x, top: pos.y }}
      />

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Theme" />
          <TweakRadio label="Accent" value={vals.accent}
            options={[
              { value: "orange", label: "Orange" },
              { value: "aqua", label: "Aqua" },
              { value: "lime", label: "Lime" },
              { value: "magenta", label: "Magenta" },
            ]}
            onChange={(v) => setTweak("accent", v)} />
          <TweakRadio label="Density" value={vals.density}
            options={[{ value: "tight", label: "Tight" }, { value: "airy", label: "Airy" }]}
            onChange={(v) => setTweak("density", v)} />
          <TweakSection label="Type" />
          <TweakSelect label="Display font" value={vals.serifFont}
            options={[
              { value: "Instrument Serif", label: "Instrument Serif" },
              { value: "DM Serif Display", label: "DM Serif" },
              { value: "Playfair Display", label: "Playfair" },
            ]}
            onChange={(v) => setTweak("serifFont", v)} />
          <TweakSection label="Interactions" />
          <TweakToggle label="Cursor preview" value={vals.cursorPreview}
            onChange={(v) => setTweak("cursorPreview", v)} />
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
