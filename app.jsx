/* global React, window */
const { useState, useEffect, useRef } = React;

// ---------- Rich text helper ----------
// Markers inside i18n strings:
//   \n        -> line break
//   [text]    -> accent-orange span
//   {text}    -> accent-aqua span
//   *text*    -> generic .accent span
//   _text_    -> <em>
//   =text=    -> <em class="serif">
//   ~text~    -> <strong>
function richTokens(line) {
  const re = /(\[[^\]]+\]|\{[^}]+\}|\*[^*]+\*|_[^_]+_|=[^=]+=|~[^~]+~)/g;
  return line.split(re).map((p, i) => {
    if (!p) return null;
    if (/^\[.+\]$/.test(p)) return <span key={i} className="accent-orange">{p.slice(1, -1)}</span>;
    if (/^\{.+\}$/.test(p)) return <span key={i} className="accent-aqua">{p.slice(1, -1)}</span>;
    if (/^\*.+\*$/.test(p)) return <span key={i} className="accent">{p.slice(1, -1)}</span>;
    if (/^_.+_$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>;
    if (/^=.+=$/.test(p)) return <em key={i} className="serif">{p.slice(1, -1)}</em>;
    if (/^~.+~$/.test(p)) return <strong key={i}>{p.slice(1, -1)}</strong>;
    return p;
  });
}
function rich(str) {
  return String(str).split("\n").map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {richTokens(line)}
    </React.Fragment>
  ));
}

// ---------- Structural project data (language-independent) ----------
const PROJECTS = [
  { id: "nextstep", name: "NextStep50", year: "2027", filter: "career", color: "orange", titleColor: "var(--orange)", span: "span-4", flower: "alstroemeria", page: "nextstep50.html" },
  { id: "ailab", name: "AI Lab", year: "2027", filter: "learning", color: "ink", titleColor: "#ffffff", span: "span-4", flower: "magnolia", page: "ai-lab.html" },
  { id: "networking", name: "Networking", year: "2027", filter: "career", color: "cream", titleColor: "#527318", span: "span-4", flower: "eucalyptus", page: "networking.html" },
  { id: "field", name: "Field Notes", year: "2027", filter: "writing", color: "cream", titleColor: "var(--fg)", span: "span-6", flower: "cherry", page: "field-notes.html" },
  { id: "loom", name: "Bloom Sessions", year: "2027", filter: "practice", color: "ink", titleColor: "#ffffff", span: "span-6", flower: "daisy", page: "bloom-sessions.html" },
  { id: "studio", name: "AI Studio", year: "2027", filter: "build", color: "ink", titleColor: "#ffffff", span: "span-12", flower: "studio", page: "ai-studio.html" },
];

// ---------- Reveal hook ----------
function useReveal(dep) {
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
  }, [dep]);
}

// ---------- Language toggle ----------
// ---------- Language selector (dropdown, scales to 5 langs) ----------
const LANGS = [
  { code: "de", label: "Deutsch", ready: true },
  { code: "en", label: "English", ready: true },
  { code: "es", label: "Español", ready: false },
  { code: "fr", label: "Français", ready: false },
  { code: "it", label: "Italiano", ready: false },
];
function LangToggle({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  const soonLabel = { de: "bald", en: "soon", es: "pronto", fr: "bientôt", it: "presto" }[lang] || "soon";
  return (
    <div className="lang-select" ref={ref}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {lang.toUpperCase()} <span className="caret">▾</span>
      </button>
      {open && (
        <div className="lang-menu" role="listbox">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={lang === l.code}
              className="lang-menu-opt"
              data-active={lang === l.code}
              data-soon={!l.ready}
              disabled={!l.ready}
              onClick={() => { if (l.ready) { setLang(l.code); setOpen(false); } }}
            >
              <span className="lang-menu-code">{l.code.toUpperCase()}</span>
              <span className="lang-menu-name">{l.label}</span>
              {!l.ready && <span className="lang-menu-soon">{soonLabel}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Nav ----------
function Nav({ theme, setTheme, time, t, lang, setLang }) {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">mlcardosa<span className="bull"></span>space</a>
      <div className="nav-links">
        <a href="#about">{t.nav.about}</a>
        <a href="#services">{t.nav.services}</a>
        <a href="#writing">{t.nav.writing}</a>
        <div className="nav-dropdown">
          <button className="nav-dd-trigger" type="button">{t.nav.pages} <span className="caret">▾</span></button>
          <div className="nav-dd-menu" role="menu">
            <a href="nextstep50.html">NextStep50 <span className="ext">↗</span></a>
            <a href="ai-lab.html">AI Lab <span className="ext">↗</span></a>
            <a href="bloom-sessions.html">Bloom Sessions <span className="ext">↗</span></a>
            <a href="ai-studio.html">AI Studio <span className="ext">↗</span></a>
            <a href="networking.html">Networking <span className="ext">↗</span></a>
            <a href="field-notes.html">Field Notes <span className="ext">↗</span></a>
          </div>
        </div>
        <a href="#contact">{t.nav.contact}</a>
      </div>
      <div className="nav-meta">
        <span className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="live-dot" /> Düsseldorf · {time}
        </span>
        <LangToggle lang={lang} setLang={setLang} />
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "◐" : "◑"} {theme === "dark" ? t.nav.light : t.nav.dark}
        </button>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-mark" />
      <div className="hero-inner">
        <h1 className="hero-title" data-reveal>
          {rich(t.hero.title)}
        </h1>
        <div className="hero-side" data-reveal>
          <div className="hero-eyebrow"><span className="bar" /> {t.hero.eyebrow}</div>
          <div className="hero-disciplines">
            {t.hero.disciplines.map((d, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="sep" />}
                <span>{d}</span>
              </React.Fragment>
            ))}
          </div>
          <p className="hero-blurb">{t.hero.blurb}</p>
          <a className="hero-cta" href="#work">{t.hero.cta}</a>
        </div>
      </div>
      <div className="hero-meta-row" data-reveal>
        {t.hero.meta.map((m, i) => (
          <div key={i}><span className="label">{m.label}</span><span className="val">{m.val}</span></div>
        ))}
      </div>
    </section>
  );
}

// ---------- Marquee ----------
function Marquee({ t }) {
  const dotClass = ["", "aqua", "lime"];
  const items = (
    <span>
      {t.marquee.map((m, i) => (
        <React.Fragment key={i}>
          {m} <span className={`dot ${dotClass[i % 3]}`} />{" "}
        </React.Fragment>
      ))}
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
function Belief({ t }) {
  return (
    <section className="belief">
      <div className="belief-inner" data-reveal>
        <span className="belief-mark" aria-hidden="true">&ldquo;</span>
        <blockquote>{rich(t.belief.quote)}</blockquote>
        <div className="attrib">{t.belief.attrib}</div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About({ t }) {
  return (
    <section className="section" id="about">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.about.num}</div>
        <h2 className="section-title">{rich(t.about.title)}</h2>
      </div>
      <div className="about-grid">
        <div className="about-bio" data-reveal>
          {t.about.bio.map((p, i) => <p key={i}>{rich(p)}</p>)}
        </div>
        <figure className="about-portrait-fig" data-reveal>
          <div className="about-portrait" data-c="cream" style={{ backgroundImage: 'url("' + ((window.__resources && window.__resources.portrait) || "assets/maria-luisa-portrait.png") + '")', backgroundSize: 'cover', backgroundPosition: 'center 32%', filter: 'grayscale(1) contrast(1.02)' }}>
          </div>
          <figcaption className="about-portrait-cap">
            <span className="cap-name">{t.about.capName}</span>
            <span>{t.about.capLoc}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ---------- Work ----------
function Work({ t, onHover, onLeave }) {
  const [filter, setFilter] = useState("all");
  const filterIds = ["all", "career", "learning", "build", "practice", "writing"];
  return (
    <section className="section" id="work">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.work.num}</div>
        <h2 className="section-title">{rich(t.work.title)}</h2>
      </div>
      <div className="work-filters" data-reveal>
        {filterIds.map((id) => (
          <button key={id} className="work-filter" data-active={filter === id} onClick={() => setFilter(id)}>
            {t.work.filters[id]}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {PROJECTS.map((p, i) => {
          const hidden = filter !== "all" && filter !== p.filter;
          const tp = t.work.projects[p.id];
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
                <div className="thumb-tag">{tp.tag}</div>
                <div className="thumb-num">N°{String(i + 1).padStart(2, "0")}</div>
                {p.page && <div className="thumb-visit">{t.work.visit}</div>}
                <div className="thumb-big-title" style={{ color: p.titleColor }}>{p.name}</div>
              </div>
              <div className="work-meta">
                <div>
                  <div className="work-name">{p.name}{p.page && <span className="work-name-ext">↗</span>}</div>
                  <div className="work-desc">{tp.desc}</div>
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
function Services({ t }) {
  const renderCards = (arr) => arr.map((s) => (
    <div key={s.num} className="service" data-reveal>
      <div className="service-num">{s.num}</div>
      <h3 className="service-name">{s.name}</h3>
      <p className="service-desc">{s.desc}</p>
      <div className="service-tags">
        {s.tags.map((tag) => <span key={tag} className="service-tag">{tag}</span>)}
      </div>
    </div>
  ));
  return (
    <section className="section" id="services">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.services.num}</div>
        <div className="section-head-main">
          <h2 className="section-title">{rich(t.services.title)}</h2>
        </div>
      </div>
      <div className="services">{renderCards(t.services.list)}</div>
      <div className="services-org-head" data-reveal>
        <div className="section-num">{t.services.orgHead}</div>
        <h3 className="services-org-title">{rich(t.services.orgTitle)}</h3>
      </div>
      <div className="services services-org">{renderCards(t.services.org)}</div>
      <div className="services-note" data-reveal style={{
        maxWidth: "var(--max)", margin: "0 auto", padding: "28px var(--pad) 0",
        display: "flex", flexWrap: "wrap", gap: "10px 28px", alignItems: "baseline",
        fontFamily: "var(--mono)", fontSize: "11px", textTransform: "uppercase",
        letterSpacing: "0.14em", color: "var(--muted)"
      }}>
        <span style={{ color: "var(--fg)" }}>{t.services.pricingLabel}</span>
        {t.services.pricing.map((p, i) => <span key={i}>{p}</span>)}
      </div>
    </section>
  );
}

// ---------- Process ----------
function Process({ t }) {
  return (
    <section className="section" id="prototyping">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.process.num}</div>
        <h2 className="section-title">{rich(t.process.title)}</h2>
      </div>
      <div className="process">
        {t.process.steps.map((p) => (
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
function Writing({ t }) {
  return (
    <section className="section" id="writing">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.writing.num}</div>
        <h2 className="section-title">{rich(t.writing.title)}</h2>
      </div>
      <div className="writing">
        {t.writing.posts.map((p, i) => (
          <a key={i} className="writing-item" href={p.href || "field-notes.html"} data-reveal>
            <span className="date">{p.date}</span>
            <span className="title">{p.title}</span>
            <span className="tag">{p.tag}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Now ----------
function Now({ t }) {
  return (
    <section className="section" id="now">
      <div className="section-head" data-reveal>
        <div className="section-num">{t.now.num}</div>
        <h2 className="section-title">{rich(t.now.title)}</h2>
      </div>
      <div className="now" data-reveal>
        <div>
          <h4>{t.now.workingHead}</h4>
          <ul>
            {t.now.working.map((w, i) => (
              <li key={i}><span className="icon" /><span className="text">{rich(w)}</span></li>
            ))}
          </ul>
          <div className="now-time"><span className="live-dot" /> {t.now.updated}</div>
        </div>
        <div>
          <h4>{t.now.readingHead}</h4>
          <ul>
            {t.now.reading.map((r, i) => (
              <li key={i} className="reading"><span className="icon" /><span className="text">{rich(r)}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------- Newsletter ----------
function Newsletter({ t }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter" id="newsletter">
      <div data-reveal>
        <h3>{rich(t.newsletter.title)}</h3>
        <p>{t.newsletter.body}</p>
      </div>
      <div data-reveal>
        <form onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); } }}>
          <input
            type="email" required placeholder={t.newsletter.placeholder}
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{t.newsletter.button}</button>
        </form>
        <div className="ack" data-shown={sent}>{t.newsletter.ack}</div>
      </div>
    </section>
  );
}

// ---------- Contact CTA ----------
function ContactCTA({ t }) {
  return (
    <section className="contact-cta" id="contact">
      <div className="contact-cta-inner">
        <div className="contact-cta-text">
          <div className="label">{t.contact.label}</div>
          <h2 data-reveal>{rich(t.contact.title)}</h2>
          <a className="email" href="mailto:marialuisa@mlcardosa.space">marialuisa@mlcardosa.space →</a>
        </div>
        <figure className="contact-cta-media" data-reveal>
          <img src={(window.__resources && window.__resources.contactPhoto) || "uploads/hannes-egler-a9zeXX25lC8-unsplash.jpg"} alt={t.contact.imgAlt} />
        </figure>
      </div>
      <div className="contact-cta-legal">
        <span>{t.footer.rights}</span>
        <span><a href="impressum.html">Impressum</a> &middot; {t.footer.built}</span>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ t }) {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">mlcardosa<span className="bull"></span>space</div>
        <div className="footer-tag">{t.footer.tag}</div>
      </div>
      <div className="footer-col">
        <h5>{t.footer.indexHead}</h5>
        <ul>
          {t.footer.index.map((l, i) => <li key={i}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </div>
      <div className="footer-col">
        <h5>{t.footer.elsewhereHead}</h5>
        <ul>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Substack</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>{t.footer.contactHead}</h5>
        <ul>
          <li><a href="mailto:marialuisa@mlcardosa.space">marialuisa@mlcardosa.space</a></li>
          <li><a href="#">{t.footer.contactPhone}</a></li>
          <li><a href="#">Düsseldorf</a></li>
        </ul>
      </div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  const TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS || {
    accent: "orange",
    density: "tight",
    cursorPreview: true,
    serifFont: "Instrument Serif",
  };
  const [vals, setTweak] = (window.useTweaks || ((d) => [d, () => {}]))(TWEAK_DEFAULTS);

  const [lang, setLangState] = useState(window.MLC_LANG.get());
  const t = window.I18N[lang] || window.I18N.en;
  const setLang = (l) => { window.MLC_LANG.set(l); setLangState(l); };

  // Keep in sync if another component/page changes the language.
  useEffect(() => {
    const onLang = (e) => setLangState(e.detail);
    window.addEventListener("mlc-lang", onLang);
    return () => window.removeEventListener("mlc-lang", onLang);
  }, []);

  const [theme, setTheme] = useState("light");
  const [time, setTime] = useState("");
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useReveal(lang);

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
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
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
    const pad = vals.density === "tight" ? "clamp(30px, 4.5vw, 64px)" : "clamp(48px, 8vw, 128px)";
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
      <Nav theme={theme} setTheme={setTheme} time={time} t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <Marquee t={t} />
      <Belief t={t} />
      <About t={t} />
      <Work t={t} onHover={onHover} onLeave={onLeave} />
      <Services t={t} />
      <Process t={t} />
      <Writing t={t} />
      <Now t={t} />
      <Newsletter t={t} />
      <ContactCTA t={t} />
      <Footer t={t} />

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
