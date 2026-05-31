// ===== Global Zen utilities =====
// Dark mode, command palette, toast, mobile menu

(function() {
  // ---- Theme ----
  const savedTheme = localStorage.getItem('zen_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // ---- Site-wide <head> polish (favicon, theme-color, manifest, SEO/OG meta) ----
  // Runs on EVERY page (zen.js is loaded everywhere). Idempotent.
  (function injectHead() {
    const head = document.head;
    const add = (tag, attrs) => { const el = document.createElement(tag); for (const k in attrs) el.setAttribute(k, attrs[k]); head.appendChild(el); return el; };
    const ensureMeta = (key, val, prop) => {
      if (document.querySelector(prop ? `meta[property="${key}"]` : `meta[name="${key}"]`)) return;
      add('meta', prop ? { property: key, content: val } : { name: key, content: val });
    };
    const desc = 'Zen je finanční infrastruktura pro internet. Přijímejte platby, vydávejte karty, financujte růst a automatizujte finance — vše jedním API.';
    if (!document.querySelector('link[rel="icon"]')) {
      const fav = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#635bff"/><path d="M10 16 L14 20 L22 12" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      add('link', { rel: 'icon', type: 'image/svg+xml', href: fav });
    }
    if (!document.querySelector('link[rel="apple-touch-icon"]')) add('link', { rel: 'apple-touch-icon', href: 'icon.svg' });
    if (!document.querySelector('link[rel="manifest"]')) add('link', { rel: 'manifest', href: 'manifest.json' });
    if (!document.querySelector('meta[name="theme-color"]')) add('meta', { name: 'theme-color', content: savedTheme === 'dark' ? '#0a2540' : '#635bff' });
    ensureMeta('description', desc);
    ensureMeta('author', 'Zen Payments, a.s.');
    ensureMeta('og:title', document.title, true);
    ensureMeta('og:description', desc, true);
    ensureMeta('og:type', 'website', true);
    ensureMeta('og:site_name', 'Zen', true);
    ensureMeta('og:locale', 'cs_CZ', true);
    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', document.title);
    ensureMeta('twitter:description', desc);
  })();

  // ---- Register service worker (PWA / offline) ----
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  window.zenToggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zen_theme', next);
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', next === 'dark' ? '#0a2540' : '#635bff');
    zenToast((next === 'dark' ? '🌙' : '☀️') + ' ' + (next === 'dark' ? 'Tmavý' : 'Světlý') + ' režim');
    updateThemeIcons();
  };

  function updateThemeIcons() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.querySelectorAll('.theme-toggle-icon').forEach(el => {
      el.textContent = cur === 'dark' ? '☀️' : '🌙';
    });
  }

  // ---- Toast ----
  window.zenToast = function(msg, type = 'default') {
    const t = document.createElement('div');
    t.className = 'zen-toast ' + type;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; }, 2200);
    setTimeout(() => t.remove(), 2600);
  };

  // ---- Command Palette ----
  const commands = [
    { title: 'Dashboard', desc: 'Přejít na přehled', url: 'dashboard.html', icon: '📊', cat: 'Navigace' },
    { title: 'Platby', desc: 'Seznam všech plateb', url: 'payments-app.html', icon: '💳', cat: 'Navigace' },
    { title: 'Zákazníci', desc: 'CRM', url: 'customers-app.html', icon: '👥', cat: 'Navigace' },
    { title: 'Zůstatky', desc: 'Dostupné prostředky', url: 'balance.html', icon: '💰', cat: 'Navigace' },
    { title: 'Faktury', desc: 'Vystavené faktury', url: 'invoices-app.html', icon: '📄', cat: 'Navigace' },
    { title: 'Spory & chargebacky', desc: 'Správa reklamací plateb', url: 'disputes.html', icon: '⚖️', cat: 'Navigace' },
    { title: 'Produkty', desc: 'Katalog', url: 'products-app.html', icon: '📦', cat: 'Navigace' },
    { title: 'API klíče', desc: 'Pro vývojáře', url: 'api-keys.html', icon: '🔑', cat: 'Vývojáři' },
    { title: 'Webhooky', desc: 'Registrované endpointy', url: 'webhooks.html', icon: '🔗', cat: 'Vývojáři' },
    { title: 'API logy', desc: 'Požadavky v reálném čase', url: 'logs.html', icon: '📋', cat: 'Vývojáři' },
    { title: 'API Playground', desc: 'Interaktivní test API', url: 'playground.html', icon: '⚡', cat: 'Vývojáři' },
    { title: 'Dokumentace', desc: 'Průvodce integrací', url: 'docs.html', icon: '📖', cat: 'Vývojáři' },
    { title: 'API Reference', desc: 'Endpointy a objekty', url: 'api.html', icon: '⚙️', cat: 'Vývojáři' },
    { title: 'Stav systému', desc: 'Uptime a incidenty', url: 'status.html', icon: '🟢', cat: 'Vývojáři' },
    { title: 'Nastavení', desc: 'Profil a preference', url: 'settings.html', icon: '⚙️', cat: 'Účet' },
    { title: 'Tým', desc: 'Členové a oprávnění', url: 'team.html', icon: '👤', cat: 'Účet' },
    { title: 'Nová platba', desc: 'Vytvořit platební odkaz', url: 'new-payment.html', icon: '➕', cat: 'Akce' },
    { title: 'Přepnout motiv', desc: 'Light / Dark mode', action: 'theme', icon: '🌓', cat: 'Akce' },
    { title: 'Odhlásit se', desc: 'Zpět na úvodní stránku', action: 'logout', icon: '🚪', cat: 'Akce' },
    { title: 'Ceník', desc: 'Tarify a kalkulačka', url: 'pricing.html', icon: '💵', cat: 'Navigace' },
    { title: 'Podpora', desc: 'FAQ a kontakt', url: 'support.html', icon: '💬', cat: 'Podpora' },
    { title: 'Blog', desc: 'Novinky a články', url: 'blog.html', icon: '📝', cat: 'Zdroje' },
    { title: 'Changelog', desc: 'Historie vydání', url: 'changelog.html', icon: '📰', cat: 'Zdroje' },
    { title: 'Kariéra', desc: 'Volné pozice', url: 'careers.html', icon: '💼', cat: 'Firma' },
    { title: 'O nás', desc: 'Tým a mise', url: 'about.html', icon: '🏢', cat: 'Firma' },
    { title: 'Kontakt', desc: 'Prodej a podpora', url: 'contact.html', icon: '📧', cat: 'Firma' },
    { title: 'Checkout demo', desc: 'Ukázkový platební formulář', url: 'checkout.html', icon: '💳', cat: 'Ukázky' },
    { title: 'API Playground', desc: 'Interaktivní test API', url: 'playground.html', icon: '⚡', cat: 'Vývojáři' },
    { title: 'Srovnání', desc: 'Zen vs. konkurence', url: 'compare.html', icon: '⚖️', cat: 'Zdroje' },
    { title: 'E-commerce řešení', desc: 'Pro online obchody', url: 'solutions.html?type=ecommerce', icon: '🛒', cat: 'Navigace' },
    { title: 'SaaS řešení', desc: 'Pro SaaS produkty', url: 'solutions.html?type=saas', icon: '🔄', cat: 'Navigace' },
    { title: 'Marketplace řešení', desc: 'Multi-vendor platformy', url: 'solutions.html?type=marketplace', icon: '🏬', cat: 'Navigace' },
    { title: 'Platformy', desc: 'Embedded finance', url: 'solutions.html?type=platforms', icon: '🧩', cat: 'Navigace' },
    { title: 'Zásady ochrany soukromí', desc: 'GDPR compliance', url: 'legal.html?t=privacy', icon: '🔒', cat: 'Právní' },
    { title: 'Obchodní podmínky', desc: 'VOP', url: 'legal.html?t=terms', icon: '📜', cat: 'Právní' },
    { title: 'Pokročilá analytika', desc: 'Forecasty, cohorty, funnel', url: 'analytics.html', icon: '📈', cat: 'Navigace' },
    { title: 'Radar demo', desc: 'Interaktivní fraud score', url: 'radar-demo.html', icon: '🧪', cat: 'Ukázky' },
    { title: 'Quickstart', desc: 'Integrace za 4 kroky', url: 'quickstart.html', icon: '🚀', cat: 'Vývojáři' },
    { title: 'Návody', desc: '32 tutoriálů', url: 'guides.html', icon: '📚', cat: 'Zdroje' },
    { title: 'Bezpečnost', desc: 'Certifikace & audity', url: 'security.html', icon: '🛡️', cat: 'Firma' },
    { title: 'Partneři', desc: 'Integrace & agentury', url: 'partners.html', icon: '🤝', cat: 'Firma' },
    { title: 'Události', desc: 'Zen Summit & webináře', url: 'events.html', icon: '🎫', cat: 'Firma' },
    { title: 'Migrace', desc: 'Přejít od konkurence', url: 'migrate.html', icon: '🔀', cat: 'Zdroje' },
    { title: 'Daně & DPH', desc: 'Kalkulačka a Zen Tax', url: 'tax.html', icon: '🧾', cat: 'Navigace' },
    { title: 'Oznámení', desc: 'Notifikační centrum', url: 'notifications.html', icon: '🔔', cat: 'Účet' },
    { title: 'Press kit', desc: 'Loga, foto, tiskové zprávy', url: 'press.html', icon: '📰', cat: 'Firma' },
    { title: 'Všechny produkty', desc: 'Přehled platformy', url: 'products.html', icon: '✨', cat: 'Produkty' },
    { title: 'Capital', desc: 'Financování pro obchodníky', url: 'capital.html', icon: '💰', cat: 'Produkty' },
    { title: 'Issuing', desc: 'Vydávání platebních karet', url: 'issuing.html', icon: '💳', cat: 'Produkty' },
    { title: 'Identity', desc: 'Ověření totožnosti / KYC', url: 'identity.html', icon: '🪪', cat: 'Produkty' },
    { title: 'Sigma', desc: 'SQL analytika nad platbami', url: 'sigma.html', icon: '📊', cat: 'Produkty' },
    { title: 'Atlas', desc: 'Založení firmy online', url: 'atlas.html', icon: '🏛️', cat: 'Produkty' },
    { title: 'Climate', desc: 'Odstraňování CO₂', url: 'climate.html', icon: '🌱', cat: 'Produkty' },
    { title: 'Treasury', desc: 'Banking-as-a-service', url: 'treasury.html', icon: '🏦', cat: 'Produkty' },
    { title: 'Payment Links', desc: 'Platební odkazy bez kódu', url: 'payment-links.html', icon: '🔗', cat: 'Produkty' },
    { title: 'Revenue Recognition', desc: 'Časové rozlišení výnosů', url: 'revenue.html', icon: '📐', cat: 'Produkty' },
    { title: 'Klávesové zkratky', desc: 'Zobrazit nápovědu (?)', action: 'shortcuts', icon: '⌨️', cat: 'Akce' },
    { title: 'Platby', desc: 'Přijímání plateb online', url: 'payments.html', icon: '💳', cat: 'Produkty' },
    { title: 'Terminál', desc: 'Platby v kamenné prodejně', url: 'terminal.html', icon: '🏪', cat: 'Produkty' },
    { title: 'Connect', desc: 'Platby pro marketplace', url: 'connect.html', icon: '🔗', cat: 'Produkty' },
    { title: 'Radar', desc: 'Ochrana proti podvodům', url: 'radar.html', icon: '🛡️', cat: 'Produkty' },
    { title: 'Fakturace', desc: 'Vystavování faktur', url: 'billing.html', icon: '📄', cat: 'Produkty' },
    { title: 'Předplatné', desc: 'Opakované platby', url: 'subscriptions.html', icon: '🔄', cat: 'Produkty' },
  ];

  function openPalette() {
    let p = document.getElementById('zenPalette');
    if (p) { p.remove(); return; }
    p = document.createElement('div');
    p.id = 'zenPalette';
    p.className = 'zen-palette-backdrop';
    p.innerHTML = `
      <div class="zen-palette" onclick="event.stopPropagation()">
        <div class="zen-palette-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input id="zenPaletteInput" placeholder="Hledat příkazy, stránky, akce..." autocomplete="off">
          <kbd>ESC</kbd>
        </div>
        <div class="zen-palette-results" id="zenPaletteResults"></div>
        <div class="zen-palette-footer">
          <span><kbd>↑↓</kbd> navigace</span>
          <span><kbd>↵</kbd> otevřít</span>
          <span><kbd>⌘K</kbd> zavřít</span>
        </div>
      </div>`;
    p.onclick = () => p.remove();
    document.body.appendChild(p);
    renderPalette('');
    const input = document.getElementById('zenPaletteInput');
    input.focus();
    input.oninput = () => renderPalette(input.value);
    input.onkeydown = e => {
      const items = document.querySelectorAll('.zen-palette-item');
      const active = document.querySelector('.zen-palette-item.active');
      const idx = [...items].indexOf(active);
      if (e.key === 'Escape') p.remove();
      else if (e.key === 'ArrowDown') { e.preventDefault(); (items[idx+1] || items[0])?.classList.add('active'); active?.classList.remove('active'); (items[idx+1] || items[0])?.scrollIntoView({block:'nearest'}); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (items[idx-1] || items[items.length-1])?.classList.add('active'); active?.classList.remove('active'); (items[idx-1] || items[items.length-1])?.scrollIntoView({block:'nearest'}); }
      else if (e.key === 'Enter') { active?.click(); }
    };
  }

  function renderPalette(q) {
    q = q.toLowerCase().trim();
    const matched = q ? commands.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q)) : commands;
    const byCat = {};
    matched.forEach(c => { (byCat[c.cat] = byCat[c.cat] || []).push(c); });
    const html = Object.keys(byCat).map(cat => `
      <div class="zen-palette-cat">${cat}</div>
      ${byCat[cat].map((c, i) => `
        <div class="zen-palette-item ${i===0 && cat===Object.keys(byCat)[0] ? 'active' : ''}" onclick="zenRunCmd('${c.url || ''}','${c.action || ''}')">
          <div class="zen-palette-icon">${c.icon}</div>
          <div class="zen-palette-meta">
            <div class="zen-palette-title">${c.title}</div>
            <div class="zen-palette-desc">${c.desc}</div>
          </div>
        </div>`).join('')}
    `).join('');
    document.getElementById('zenPaletteResults').innerHTML = matched.length ? html : `<div style="padding:40px 20px; text-align:center; color:var(--text-muted);">Žádné výsledky pro "<strong>${q}</strong>"</div>`;
  }

  window.zenRunCmd = function(url, action) {
    document.getElementById('zenPalette')?.remove();
    if (action === 'theme') zenToggleTheme();
    else if (action === 'logout') { localStorage.removeItem('zen_user'); location.href = 'index.html'; }
    else if (action === 'shortcuts') zenShortcuts();
    else if (url) location.href = url;
  };

  document.addEventListener('keydown', e => {
    const typing = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openPalette(); }
    if (e.key === '/' && !typing) { e.preventDefault(); openPalette(); }
    if (e.key === '?' && !typing) { e.preventDefault(); zenShortcuts(); }
    if (e.key.toLowerCase() === 'd' && (e.metaKey || e.ctrlKey) && e.shiftKey) { e.preventDefault(); zenToggleTheme(); }
  });
  window.zenOpenPalette = openPalette;

  // ---- Keyboard shortcuts help modal (?) ----
  window.zenShortcuts = function() {
    let m = document.getElementById('zenShortcuts');
    if (m) { m.remove(); return; }
    const rows = [
      ['⌘ K', 'Otevřít vyhledávání / paletu příkazů'],
      ['/', 'Rychlé hledání'],
      ['?', 'Tato nápověda'],
      ['⌘ ⇧ D', 'Přepnout světlý / tmavý režim'],
      ['↑ ↓', 'Pohyb v paletě'],
      ['↵', 'Otevřít vybranou položku'],
      ['Esc', 'Zavřít okno'],
    ];
    m = document.createElement('div');
    m.id = 'zenShortcuts';
    m.className = 'zen-palette-backdrop';
    m.innerHTML = `
      <div class="zen-shortcuts" onclick="event.stopPropagation()">
        <div class="zen-sc-head"><span>⌨️ Klávesové zkratky</span><kbd>ESC</kbd></div>
        <div class="zen-sc-body">
          ${rows.map(r => `<div class="zen-sc-row"><div class="zen-sc-keys">${r[0].split(' ').map(k=>`<kbd>${k}</kbd>`).join('')}</div><span>${r[1]}</span></div>`).join('')}
        </div>
      </div>`;
    m.onclick = () => m.remove();
    document.body.appendChild(m);
    const esc = ev => { if (ev.key === 'Escape') { m.remove(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  };

  // ---- Mobile menu ----
  window.zenToggleMobileMenu = function() {
    document.body.classList.toggle('zen-mobile-open');
  };

  // ---- Scroll reveal + progress bar + back-to-top + a11y skip link ----
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeIcons();

    // Accessibility: skip-to-content link targeting the first main content region
    if (!document.querySelector('.zen-skip')) {
      const target = document.querySelector('main, .app-content, #appRoot, section');
      if (target) {
        if (!target.id) target.id = 'zen-main';
        target.setAttribute('tabindex', '-1');
        const skip = document.createElement('a');
        skip.className = 'zen-skip';
        skip.href = '#' + target.id;
        skip.textContent = 'Přeskočit na obsah';
        skip.addEventListener('click', () => { setTimeout(() => target.focus(), 0); });
        document.body.insertBefore(skip, document.body.firstChild);
      }
    }
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('zen-in'); io.unobserve(x.target); }}), { threshold: 0.1 });
    document.querySelectorAll('.zen-reveal').forEach(el => io.observe(el));

    // Scroll progress bar (skip dashboard shell — it scrolls internally)
    const isApp = document.getElementById('appRoot') || document.querySelector('.app-sidebar');
    if (!isApp && !document.getElementById('zenProgress')) {
      const bar = document.createElement('div');
      bar.id = 'zenProgress';
      document.body.appendChild(bar);
      const upd = () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0%';
      };
      addEventListener('scroll', upd, { passive: true });
      addEventListener('resize', upd, { passive: true });
      upd();
    }

    // Back-to-top button
    if (!document.getElementById('zenTop')) {
      const btn = document.createElement('button');
      btn.id = 'zenTop';
      btn.setAttribute('aria-label', 'Zpět nahoru');
      btn.title = 'Zpět nahoru';
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
      btn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
      document.body.appendChild(btn);
      addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 600), { passive: true });
    }
  });
})();
