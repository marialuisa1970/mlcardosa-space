/* global window */
/* ---------------------------------------------------------------------------
   Shared i18n for mlcardosa.space
   - window.MLC_LANG: persisted language helpers (localStorage key "mlc-lang")
   - window.I18N: full landing-page copy in EN + DE
   German is written idiomatically (not machine-translated), per the brand
   voice rules: warm, slow, specific, experienced. No em-dashes in copy.
--------------------------------------------------------------------------- */

(function () {
  const KEY = "mlc-lang";
  const SUPPORTED = ["en", "de"];

  function get() {
    try {
      const v = localStorage.getItem(KEY);
      if (v && SUPPORTED.includes(v)) return v;
    } catch (e) {}
    // First-time visitors always see English (per brand decision).
    return "en";
  }

  function set(lang) {
    if (!SUPPORTED.includes(lang)) return;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    window.dispatchEvent(new CustomEvent("mlc-lang", { detail: lang }));
  }

  // Apply <html lang> immediately so it is correct before React mounts.
  try { document.documentElement.setAttribute("lang", get()); } catch (e) {}

  window.MLC_LANG = { get, set, SUPPORTED };
})();

window.I18N = {
  en: {
    nav: {
      about: "About", services: "Services", writing: "Writing", contact: "Contact",
      pages: "Pages", dark: "Dark", light: "Light",
    },
    hero: {
      title: "[Connection]\nis the most\n{powerful}\ntechnology.",
      eyebrow: "María Luisa Cardosa Heredia · 2026",
      disciplines: ["Career\u00a0Mentoring", "Educational\u00a0Coaching", "Applied\u00a0AI"],
      blurb: "I am an educational coach and mentor driven by conviction, believing that learning emerges through meaningful connections, clear communication, and trust. I accompany people in their development and support them on their professional path. At the same time, I am deeply engaged in exploring how artificial intelligence can enrich education and human-centered innovation.",
      cta: "Projects →",
      meta: [
        { label: "Currently", val: "NextStep50 · AI Lab" },
        { label: "Based in", val: "Düsseldorf · 51.2°N" },
        { label: "Offering", val: "Career Mentoring · Educational Coaching · Applied AI" },
        { label: "Languages", val: "DE · EN · ES · FR · IT" },
      ],
    },
    marquee: ["Career Mentoring", "Educational Coaching", "AI Literacy", "Bloom Sessions", "AI Studio", "Düsseldorf & online", "AZAV-certified AI courses"],
    belief: {
      quote: "AI is not a substitute for _human connection._ It can accompany you, listen, think alongside you, but it cannot replace what another person can give you.",
      attrib: "Field Notes, 2026",
    },
    about: {
      num: "§ 01 · About",
      title: "A Space of *Clarity.*",
      bio: [
        "I am an ~educator and lifelong learner~ driven by conviction, who believes that teaching is not merely about transferring knowledge, but about creating meaningful connections and supporting people in their development. Communication is the heart of learning: it's in the exchange of ideas, questions, and stories where true transformation happens.",
        "At the same time, I have discovered a profound passion in ~artificial intelligence~ and its potential to transform education. I am currently deepening my expertise in AI, exploring how technology can enhance planning, collaboration, and decision-making, while keeping the human element at the center.",
        "For me, the intersection of ~teaching, communication, and AI~ is where the future lies: where clear connection, empathy, and innovation converge to create more effective, inclusive, and human-centered ways of learning and working.",
      ],
      capName: "María Luisa Cardosa",
      capLoc: "Düsseldorf · 2026",
    },
    work: {
      num: "§ 02 · Projects",
      title: "Projects with\n*Intention.*",
      visit: "Visit page ↗",
      filters: { all: "All", career: "Career", learning: "Learning", build: "Build", practice: "Practice", writing: "Writing" },
      projects: {
        nextstep: { tag: "Career", desc: "A platform built on a simple truth: women with decades of expertise don't need permission to start again. They need the right door to open." },
        ailab: { tag: "Learning", desc: "An academy where technology serves purpose: teaching AI literacy and applied skills to Customer Success leaders and anyone ready to shape the future of human-centered work." },
        networking: { tag: "Community", desc: "A monthly gathering where generations meet as equals: women 50+ and younger women in transition sharing stories, wisdom, and the perspectives that shape each other's paths forward." },
        field: { tag: "Writing", desc: "Ongoing reflections on motivation, AI, and learning at any age. Monthly insights and observations shared through writing that speaks to where you are, and where you're becoming." },
        loom: { tag: "Practice", desc: "Live workshops where we explore AI hands-on, building real solutions together in real time. Sessions are recorded and shared so learning continues beyond the room." },
        studio: { tag: "Build", desc: "AI solutions for organizations: process automation, custom AI agents, and web/app prototypes designed to serve your people and amplify their impact." },
      },
    },
    services: {
      num: "§ 03 · Services",
      title: "Ways to *work*\ntogether.",
      orgHead: "For organizations",
      orgTitle: "Built *with* you,\nnot just taught.",
      pricingLabel: "Pricing",
      pricing: ["By membership or by course, both available", "AI courses are AZAV-certified & funding-eligible"],
      list: [
        { num: "01", name: "AI courses", desc: "Where curiosity meets practice: modular courses on building Claude agents, designing automation, creating skills. No prerequisites. Just willingness to learn by doing, at the pace that works for you.", tags: ["AZAV", "In-person", "Online"] },
        { num: "02", name: "Tool practice", desc: "The missing piece: hands-on practice with the tools that shape modern work. Claude, Perplexity, Make, n8n. Real workflows, real problems, real solutions. From theory to action, together.", tags: ["Online", "Hands-on", "Live"] },
        { num: "03", name: "Q&A sessions", desc: "A monthly space to voice what's unclear, challenge what doesn't quite work, and think through complexity together. No question too small, no curiosity too ambitious.", tags: ["Online", "Group"] },
        { num: "04", name: "Career mentoring", desc: "Mentoring for women in transition: someone who listens, understands your moment, and helps you see the path forward with clarity and confidence. Built into the AZAV course; also available one-to-one by appointment.", tags: ["1:1", "Career"] },
        { num: "05", name: "Educational coaching", desc: "We listen to where you are and ask the right questions: What do you need? What will serve you? What matters now? Then we map the path that fits your reality, your timeline, your goals.", tags: ["Mindset", "Technique"] },
        { num: "06", name: "For teams", desc: "Learning designed for your people, your moment, your goals. From focused modules to immersive programs, we build what your organization needs to thrive in an AI-shaped future.", tags: ["AI Literacy"] },
      ],
      org: [
        { num: "01", name: "App & web prototypes", desc: "A working prototype of your product idea, built fast and AI-assisted. For web: fully functional. For apps: a clickable MVP you can test with real users, then hand to an engineer to finish.", tags: ["MVP", "Web", "App"] },
        { num: "02", name: "AI agents", desc: "Custom AI agents built around your specific needs. They handle research, drafting, triage, and support, working seamlessly with the tools your team already uses.", tags: ["Custom", "Workflows"] },
        { num: "03", name: "Process automation", desc: "Quiet automation for the repetitive work that slows you down. Built to your processes, connecting your existing tools so your people can focus on what matters: the human part.", tags: ["Automation", "Integrations"] },
      ],
    },
    process: {
      num: "§ 04 · How I work",
      title: "From idea to\nworking *prototype.*",
      steps: [
        { n: "01", name: "Listen", desc: "Before solutions, understanding. We listen to your people, your moment, the real problem beneath the brief." },
        { n: "02", name: "Frame", desc: "One page that holds the problem and the choices. Nothing more. Clarity before building." },
        { n: "03", name: "Make", desc: "A working prototype in front of real users, fast. We keep what works, learn from what doesn't." },
        { n: "04", name: "Ship", desc: "A small, working version ready to grow. Built to learn, designed to evolve." },
      ],
    },
    writing: {
      num: "§ 05 · Writing",
      title: "What I learn *along the way.*",
      posts: [
        { date: "Field Notes · 01", title: "Why connection still beats the algorithm", tag: "Essay", read: "6 min", href: "field-notes.html" },
        { date: "Field Notes · 02", title: "Learning at any age: it's never too late", tag: "Essay", read: "8 min", href: "field-notes-2.html" },
        { date: "Field Notes · 03", title: "AI in education: a tool, not a teacher", tag: "Notes", read: "10 min", href: "field-notes-3.html" },
        { date: "Field Notes · 04", title: "Staying motivated when you start over", tag: "Essay", read: "5 min", href: "field-notes-4.html" },
      ],
    },
    now: {
      num: "§ 06 · Currently",
      title: "Where new *chapters keep opening.*",
      workingHead: "Working on",
      working: [
        "Opening _NextStep50_'s next mentoring cohort.",
        "Building _AI Lab_ course materials, AZAV-ready.",
        "Writing the first _Field Notes_ essay.",
      ],
      updated: "Updated 14:32 · Düsseldorf",
      readingHead: "Reading & thinking",
      reading: [
        "Following: the newsletters leading the conversation on AI.",
        "Reading: a stack of books I'll tell you about soon.",
        "Watching: YouTube talks from experts across the topics I work on, not just AI.",
      ],
    },
    newsletter: {
      title: "A =slow letter,=\nonce a month.",
      body: "Some months a few notes, some months one essay, never both. No tracking, no tricks. Reply to anything.",
      placeholder: "you@somewhere.email",
      button: "Subscribe →",
      ack: "✓ You're in. Check your inbox for a soft hello.",
    },
    contact: {
      label: "§ 07 · Contact",
      title: "Let's make\nsomething\n*together.*",
      imgAlt: "Neon sign on a brick wall reading 'Come run with us'",
    },
    footer: {
      tag: "Career mentoring, educational coaching & applied AI. Düsseldorf & online.",
      indexHead: "Index",
      index: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Writing", href: "#writing" },
      ],
      elsewhereHead: "Elsewhere",
      contactHead: "Contact",
      contactPhone: "Tel. · on request",
      rights: "© 2026 · María Luisa Cardosa Heredia · All rights reserved",
      built: "Built in Düsseldorf · No cookies, no tracking",
    },
  },

  de: {
    nav: {
      about: "Über mich", services: "Angebot", writing: "Texte", contact: "Kontakt",
      pages: "Seiten", dark: "Dunkel", light: "Hell",
    },
    hero: {
      title: "[Verbindung]\nist die\n{stärkste}\nTechnologie.",
      eyebrow: "María Luisa Cardosa Heredia · 2026",
      disciplines: ["Karriere-\u00a0Mentoring", "Bildungs-\u00a0coaching", "Angewandte\u00a0KI"],
      blurb: "Ich bin Bildungscoach und Mentorin aus Überzeugung. Lernen entsteht für mich durch echte Verbindung, klare Kommunikation und Vertrauen. Ich begleite Menschen in ihrer Entwicklung und unterstütze sie auf ihrem beruflichen Weg. Zugleich beschäftigt mich, wie künstliche Intelligenz Bildung und menschzentrierte Innovation bereichern kann.",
      cta: "Projekte →",
      meta: [
        { label: "Aktuell", val: "NextStep50 · AI Lab" },
        { label: "Standort", val: "Düsseldorf · 51.2°N" },
        { label: "Angebot", val: "Karriere-Mentoring · Bildungscoaching · Angewandte KI" },
        { label: "Sprachen", val: "DE · EN · ES · FR · IT" },
      ],
    },
    marquee: ["Karriere-Mentoring", "Bildungscoaching", "KI-Kompetenz", "Bloom Sessions", "AI Studio", "Düsseldorf & online", "AZAV-zertifizierte KI-Kurse"],
    belief: {
      quote: "KI ist kein Ersatz für _menschliche Verbindung._ Sie kann dich begleiten, zuhören, mit dir denken, aber sie kann nicht ersetzen, was ein anderer Mensch dir geben kann.",
      attrib: "Field Notes, 2026",
    },
    about: {
      num: "§ 01 · Über mich",
      title: "Ein Raum der *Klarheit.*",
      bio: [
        "Ich bin ~Pädagogin aus Überzeugung~ und lebenslang Lernende. Lehren heißt für mich nicht, Wissen weiterzugeben, sondern echte Verbindungen zu schaffen und Menschen in ihrer Entwicklung zu unterstützen. Kommunikation ist das Herz des Lernens: Im Austausch von Ideen, Fragen und Geschichten geschieht echte Veränderung.",
        "Zugleich habe ich eine tiefe Leidenschaft entdeckt: ~künstliche Intelligenz~ und ihr Potenzial, Bildung zu verändern. Derzeit vertiefe ich mein Wissen in KI und erkunde, wie Technologie Planung, Zusammenarbeit und Entscheidungsfindung bereichert, ohne den Menschen aus dem Mittelpunkt zu verlieren.",
        "Für mich liegt die Zukunft an der Schnittstelle von ~Lehre, Kommunikation und KI~: dort, wo klare Verbindung, Empathie und Innovation zusammenkommen, um wirksamere, inklusivere und menschenzentrierte Formen des Lernens und Arbeitens zu schaffen.",
      ],
      capName: "María Luisa Cardosa",
      capLoc: "Düsseldorf · 2026",
    },
    work: {
      num: "§ 02 · Projekte",
      title: "Projekte mit\n*Bedeutung.*",
      visit: "Seite ansehen ↗",
      filters: { all: "Alle", career: "Karriere", learning: "Lernen", build: "Bauen", practice: "Praxis", writing: "Texte" },
      projects: {
        nextstep: { tag: "Karriere", desc: "Eine Plattform auf einer einfachen Wahrheit gegründet: Frauen mit Jahrzehnten von Expertise brauchen keine Erlaubnis, um neu anzufangen. Sie brauchen die richtige Tür, die sich öffnet." },
        ailab: { tag: "Lernen", desc: "Eine Akademie, in der Technologie dem Sinn dient: KI-Grundlagen und angewandte Fähigkeiten für Customer-Success-Fachleute und alle, die die Zukunft menschenzentrierter Arbeit mitgestalten möchten." },
        networking: { tag: "Community", desc: "Ein monatliches Treffen, bei dem Generationen sich als Gleichberechtigte begegnen: Frauen ab 50 und jüngere Frauen in Übergang teilen Geschichten, Weisheit und Perspektiven, die ihre Wege gegenseitig prägen." },
        field: { tag: "Texte", desc: "Laufende Reflexionen über Motivation, KI und lebenslanges Lernen. Monatliche Gedanken und Beobachtungen, die sprechen zu dem, wo du bist, und zu dem, wer du wirst." },
        loom: { tag: "Praxis", desc: "Live-Workshops, in denen wir KI praktisch erkunden und echte Lösungen gemeinsam und in Echtzeit bauen. Sessionen werden aufgezeichnet und geteilt, damit das Lernen über den Moment hinaus anhält." },
        studio: { tag: "Bauen", desc: "KI-Lösungen für Organisationen: Prozessautomatisierung, maßgeschneiderte KI-Agenten und Web-/App-Prototypen, die deine Teams unterstützen und ihre Wirkung verstärken." },
      },
    },
    services: {
      num: "§ 03 · Angebot",
      title: "Wege, *zusammen*\nzu arbeiten.",
      orgHead: "Für Organisationen",
      orgTitle: "Mit euch *gebaut,*\nnicht nur gelehrt.",
      pricingLabel: "Preise",
      pricing: ["Per Mitgliedschaft oder einzeln, beides möglich", "KI-Kurse sind AZAV-zertifiziert & förderfähig"],
      list: [
        { num: "01", name: "KI-Kurse", desc: "Wo Neugier auf Praxis trifft: modulare Kurse zum Bauen von Claude-Agenten, zum Gestalten von Automatisierung, zum Entwickeln von Skills. Keine Voraussetzungen. Nur die Bereitschaft, durch Anwendung zu lernen, in deinem Tempo.", tags: ["AZAV", "Präsenz", "Online"] },
        { num: "02", name: "Tool-Praxis", desc: "Das fehlende Puzzleteil: praktische Arbeit mit den Tools, die moderne Arbeit prägen. Claude, Perplexity, Make, n8n. Echte Workflows, echte Probleme, echte Lösungen. Von der Theorie zur Handlung, zusammen.", tags: ["Online", "Praxis", "Live"] },
        { num: "03", name: "Fragerunden", desc: "Ein monatlicher Raum, um das Unklare auszusprechen, das zu hinterfragen, was nicht ganz funktioniert, und Komplexität gemeinsam zu durchdenken. Keine Frage zu klein, keine Neugier zu ehrgeizig.", tags: ["Online", "Gruppe"] },
        { num: "04", name: "Karriere-Mentoring", desc: "Mentoring für Frauen in Veränderung: jemand, der zuhört, deinen Moment versteht und dir hilft, den Weg nach vorne mit Klarheit und Selbstvertrauen zu sehen. Im AZAV-Kurs enthalten; auch als Einzeltermine buchbar.", tags: ["1:1", "Karriere"] },
        { num: "05", name: "Bildungscoaching", desc: "Wir hören, wo du stehst, und stellen die richtigen Fragen: Was brauchst du? Was dient dir? Was zählt jetzt? Dann skizzieren wir den Weg, der zu deiner Realität, deiner Zeit und deinen Zielen passt.", tags: ["Mindset", "Technik"] },
        { num: "06", name: "Für Teams", desc: "Lernen, das für deine Menschen, deinen Moment, deine Ziele entwickelt wurde. Von fokussierten Modulen bis zu immersiven Programmen: wir bauen, was deine Organisation braucht, um in einer KI-geprägten Zukunft zu gedeihen.", tags: ["KI-Kompetenz"] },
      ],
      org: [
        { num: "01", name: "App- & Web-Prototypen", desc: "Ein funktionierender Prototyp deiner Produktidee, schnell gebaut und KI-unterstützt. Für Web: vollständig funktional. Für Apps: ein klickbares MVP, das du mit echten Nutzern testest, dann an einen Ingenieur übergibst.", tags: ["MVP", "Web", "App"] },
        { num: "02", name: "KI-Agenten", desc: "Maßgeschneiderte KI-Agenten, die um deine spezifischen Bedürfnisse gebaut werden. Sie übernehmen Recherche, Entwürfe, Triage und Support, nahtlos integriert in die Tools, die dein Team bereits nutzt.", tags: ["Custom", "Workflows"] },
        { num: "03", name: "Prozessautomatisierung", desc: "Stille Automatisierung für die wiederkehrende Arbeit, die dich bremst. Gebaut für deine Prozesse, verbunden mit deinen bestehenden Tools, damit dein Team sich auf das konzentriert, was zählt: den menschlichen Teil.", tags: ["Automatisierung", "Integrationen"] },
      ],
    },
    process: {
      num: "§ 04 · So arbeite ich",
      title: "Von der Idee zum\nfunktionierenden *Prototyp.*",
      steps: [
        { n: "01", name: "Zuhören", desc: "Vor Lösungen kommt Verstehen. Wir hören deinen Menschen zu, deinem Moment, dem echten Problem unter dem Auftrag." },
        { n: "02", name: "Einordnen", desc: "Eine Seite, die das Problem und die Optionen hält. Mehr nicht. Klarheit vor dem Bauen." },
        { n: "03", name: "Machen", desc: "Ein funktionierender Prototyp vor echten Nutzern, schnell. Wir behalten, was funktioniert, lernen von dem, was nicht." },
        { n: "04", name: "Liefern", desc: "Eine kleine, funktionierende Version, bereit zu wachsen. Gebaut zum Lernen, gestaltet zur Entwicklung." },
      ],
    },
    writing: {
      num: "§ 05 · Texte",
      title: "Was ich *dabei lerne.*",
      posts: [
        { date: "Field Notes · 01", title: "Warum Verbindung den Algorithmus immer noch schlägt", tag: "Essay", read: "6 Min.", href: "field-notes.html" },
        { date: "Field Notes · 02", title: "Lernen in jedem Alter: es ist nie zu spät", tag: "Essay", read: "8 Min.", href: "field-notes-2.html" },
        { date: "Field Notes · 03", title: "KI in der Bildung: ein Werkzeug, kein Lehrer", tag: "Notizen", read: "10 Min.", href: "field-notes-3.html" },
        { date: "Field Notes · 04", title: "Motiviert bleiben, wenn man neu anfängt", tag: "Essay", read: "5 Min.", href: "field-notes-4.html" },
      ],
    },
    now: {
      num: "§ 06 · Aktuell",
      title: "Wo sich ständig *neue Kapitel öffnen.*",
      workingHead: "Woran ich arbeite",
      working: [
        "Die nächste Mentoring-Gruppe von _NextStep50_ öffnen.",
        "_AI Lab_-Kursmaterialien aufbauen, AZAV-fertig.",
        "Den ersten _Field Notes_-Essay schreiben.",
      ],
      updated: "Aktualisiert 14:32 · Düsseldorf",
      readingHead: "Lesen & Denken",
      reading: [
        "Ich folge: den Newslettern, die das Gespräch über KI prägen.",
        "Ich lese: einen Stapel Bücher, von denen ich bald erzähle.",
        "Ich schaue: YouTube-Talks von Fachleuten zu all meinen Themen, nicht nur KI.",
      ],
    },
    newsletter: {
      title: "Ein =Brief mit Bedacht,=\neinmal im Monat.",
      body: "Mal ein paar Notizen, mal ein Essay, nie beides. Kein Tracking, keine Tricks. Antworte auf alles.",
      placeholder: "du@irgendwo.email",
      button: "Abonnieren →",
      ack: "✓ Du bist dabei. Schau in dein Postfach für ein leises Hallo.",
    },
    contact: {
      label: "§ 07 · Kontakt",
      title: "Lass uns\ngemeinsam etwas\n*machen.*",
      imgAlt: "Neonschild an einer Backsteinwand mit der Aufschrift ‚Come run with us'",
    },
    footer: {
      tag: "Karriere-Mentoring, Bildungscoaching & angewandte KI. Düsseldorf & online.",
      indexHead: "Index",
      index: [
        { label: "Über mich", href: "#about" },
        { label: "Projekte", href: "#work" },
        { label: "Angebot", href: "#services" },
        { label: "Texte", href: "#writing" },
      ],
      elsewhereHead: "Anderswo",
      contactHead: "Kontakt",
      contactPhone: "Tel. · auf Anfrage",
      rights: "© 2026 · María Luisa Cardosa Heredia · Alle Rechte vorbehalten",
      built: "Gebaut in Düsseldorf · Keine Cookies, kein Tracking",
    },
  },
};
