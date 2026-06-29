/* ---------------------------------------------------------------------------
   subpage-i18n.js  —  drop-in EN/DE translation engine for static subpages.

   How to use on a page:
     1. Define the German dictionary BEFORE this script:
          <script>window.SUBPAGE_DICT = { "English text": "Deutscher Text", ... };</script>
        Keys are the EXACT English text of a single text node, whitespace-
        collapsed. Optionally provide attribute translations under the special
        key window.SUBPAGE_ATTR = { "english placeholder": "deutsch", ... }.
     2. Include this script at the END of <body> (after the page's own scripts).
   It injects an EN | DE toggle into <nav> (or fixed top-right as fallback),
   persists the choice in localStorage("mlc-lang"), shares it with the whole
   site, sets <html lang>, and re-applies on dynamic DOM changes.
--------------------------------------------------------------------------- */
(function () {
  var KEY = "mlc-lang";
  var SUPPORTED = ["en", "de"];

  function getLang() {
    try { var v = localStorage.getItem(KEY); if (SUPPORTED.indexOf(v) > -1) return v; } catch (e) {}
    return "en";
  }
  function persist(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  var textOriginals = new Map();   // textNode -> original nodeValue
  var attrOriginals = new Map();   // element -> { attr: originalValue }
  var ATTRS = ["placeholder", "alt", "title", "aria-label"];

  function dict() { return window.SUBPAGE_DICT || {}; }
  function attrDict() { return window.SUBPAGE_ATTR || {}; }

  function rejectParent(p) {
    if (!p) return true;
    var tag = p.nodeName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return true;
    if (p.closest && p.closest("[data-no-i18n], .lang-toggle, .lang-select")) return true;
    return false;
  }

  function applyText(lang) {
    var d = dict();
    var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (rejectParent(n.parentNode)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = tw.nextNode())) {
      if (!textOriginals.has(n)) textOriginals.set(n, n.nodeValue);
      var orig = textOriginals.get(n);
      if (lang === "de") {
        var key = norm(orig);
        if (Object.prototype.hasOwnProperty.call(d, key)) {
          var lead = orig.match(/^\s*/)[0], trail = orig.match(/\s*$/)[0];
          n.nodeValue = lead + d[key] + trail;
        } else {
          n.nodeValue = orig;
        }
      } else {
        n.nodeValue = orig;
      }
    }
  }

  function applyAttrs(lang) {
    var ad = attrDict();
    var sel = ATTRS.map(function (a) { return "[" + a + "]"; }).join(",");
    var els = document.querySelectorAll(sel);
    els.forEach(function (el) {
      if (el.closest("[data-no-i18n], .lang-toggle, .lang-select")) return;
      var store = attrOriginals.get(el) || {};
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        if (!(a in store)) store[a] = el.getAttribute(a);
        var orig = store[a];
        if (lang === "de" && Object.prototype.hasOwnProperty.call(ad, norm(orig))) {
          el.setAttribute(a, ad[norm(orig)]);
        } else {
          el.setAttribute(a, orig);
        }
      });
      attrOriginals.set(el, store);
    });
  }

  var applying = false;
  function apply(lang) {
    applying = true;
    applyText(lang);
    applyAttrs(lang);
    document.documentElement.setAttribute("lang", lang);
    updateButtons(lang);
    applying = false;
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) return;
    persist(lang);
    apply(lang);
    try { window.dispatchEvent(new CustomEvent("mlc-lang", { detail: lang })); } catch (e) {}
  }

  // ---- Selector UI (dropdown, scales to 5 languages) ----
  var LANGS = [
    { code: "de", label: "Deutsch", ready: true },
    { code: "en", label: "English", ready: true },
    { code: "es", label: "Español", ready: false },
    { code: "fr", label: "Français", ready: false },
    { code: "it", label: "Italiano", ready: false }
  ];
  var SOON = { de: "bald", en: "soon", es: "pronto", fr: "bientôt", it: "presto" };
  var triggerLabel = null;
  var menuEl = null;
  var optEls = [];
  function updateButtons(lang) {
    if (triggerLabel) triggerLabel.firstChild.nodeValue = lang.toUpperCase() + " ";
    optEls.forEach(function (b) {
      b.setAttribute("data-active", String(b.dataset.lang === lang));
      b.setAttribute("aria-selected", String(b.dataset.lang === lang));
    });
  }
  function injectStyles() {
    if (document.getElementById("mlc-lang-style")) return;
    var s = document.createElement("style");
    s.id = "mlc-lang-style";
    s.textContent =
      ".lang-select{position:relative;display:inline-block;vertical-align:middle;font-family:var(--mono,'JetBrains Mono',monospace)}" +
      ".lang-trigger{background:transparent;border:1px solid var(--line,rgba(26,26,26,.14));border-radius:999px;font:inherit;font-size:11px;letter-spacing:.12em;color:var(--muted,#8A8377);cursor:pointer;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;transition:border-color .18s,color .18s}" +
      ".lang-trigger:hover{border-color:var(--fg,#1A1A1A);color:var(--fg,#1A1A1A)}" +
      ".lang-trigger .caret{font-size:.7em;opacity:.7}" +
      ".lang-menu{position:absolute;top:calc(100% + 8px);right:0;z-index:9999;min-width:180px;padding:6px;background:var(--bg,#F8F8F5);border:1px solid var(--line,rgba(26,26,26,.14));border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,.16);display:none;flex-direction:column;gap:2px}" +
      ".lang-menu.open{display:flex}" +
      ".lang-menu-opt{display:flex;align-items:center;gap:10px;background:transparent;border:0;border-radius:9px;cursor:pointer;font:inherit;color:var(--fg,#1A1A1A);text-align:left;padding:9px 11px;transition:background .16s}" +
      ".lang-menu-opt:hover:not(:disabled){background:rgba(26,26,26,.07)}" +
      ".lang-menu-opt[data-active='true']{background:rgba(255,107,43,.16)}" +
      ".lang-menu-opt:disabled{cursor:default;opacity:.55}" +
      ".lang-menu-code{font-size:11px;letter-spacing:.1em;width:24px;color:var(--muted,#8A8377)}" +
      ".lang-menu-opt[data-active='true'] .lang-menu-code{color:var(--orange,#FF6B2B)}" +
      ".lang-menu-name{flex:1;font-size:14px;font-family:var(--mono,'JetBrains Mono',monospace)}" +
      ".lang-menu-soon{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted,#8A8377);border:1px solid var(--line,rgba(26,26,26,.14));border-radius:999px;padding:2px 7px}" +
      ".lang-select.lang-fixed{position:fixed;top:14px;right:14px;z-index:9999}";
    document.head.appendChild(s);
  }
  function buildToggle() {
    var cur = getLang_current();
    var wrap = document.createElement("div");
    wrap.className = "lang-select";
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "lang-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.appendChild(document.createTextNode(cur.toUpperCase() + " "));
    var caret = document.createElement("span");
    caret.className = "caret"; caret.textContent = "▾";
    trigger.appendChild(caret);
    triggerLabel = trigger;
    var menu = document.createElement("div");
    menu.className = "lang-menu";
    menu.setAttribute("role", "listbox");
    menuEl = menu;
    optEls = [];
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang-menu-opt";
      b.setAttribute("role", "option");
      b.dataset.lang = l.code;
      if (!l.ready) { b.disabled = true; b.setAttribute("data-soon", "true"); }
      var code = document.createElement("span");
      code.className = "lang-menu-code"; code.textContent = l.code.toUpperCase();
      var name = document.createElement("span");
      name.className = "lang-menu-name"; name.textContent = l.label;
      b.appendChild(code); b.appendChild(name);
      if (!l.ready) {
        var soon = document.createElement("span");
        soon.className = "lang-menu-soon"; soon.textContent = SOON[cur] || "soon";
        b.appendChild(soon);
      }
      if (l.ready) b.addEventListener("click", function () { setLang(l.code); menu.classList.remove("open"); });
      menu.appendChild(b);
      optEls.push(b);
    });
    trigger.addEventListener("click", function (e) { e.stopPropagation(); menu.classList.toggle("open"); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) menu.classList.remove("open"); });
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    return wrap;
  }
  function mountToggle() {
    injectStyles();
    var toggle = buildToggle();
    var nav = document.querySelector("nav.nav, nav.topbar, nav.topnav, nav");
    if (nav) {
      nav.appendChild(toggle);
    } else {
      toggle.classList.add("lang-fixed");
      document.body.appendChild(toggle);
    }
  }

  // ---- Dynamic content: re-apply when the DOM changes ----
  function observe() {
    var mo = new MutationObserver(function (muts) {
      if (applying) return;
      var relevant = muts.some(function (m) {
        return m.type === "childList" && (m.addedNodes.length || m.removedNodes.length);
      });
      if (relevant) {
        clearTimeout(observe._t);
        observe._t = setTimeout(function () { apply(getLang()); }, 60);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    mountToggle();
    apply(getLang());
    observe();
    // React to language changes triggered elsewhere (e.g. other tab/page event).
    window.addEventListener("mlc-lang", function (e) {
      if (e && e.detail && e.detail !== getLang_current()) {}
    });
  }
  function getLang_current() { return document.documentElement.getAttribute("lang") || getLang(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.MLC_SUBPAGE_I18N = { apply: function () { apply(getLang()); }, getLang: getLang, setLang: setLang };
})();
