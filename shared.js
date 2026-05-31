// Shared navigation + footer for all Zen pages
function renderNav(active = '') {
  return `
<nav class="nav nav-solid">
  <div class="nav-container">
    <div class="nav-left">
      <a href="index.html" class="logo">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#0a2540"/>
          <path d="M10 16 L14 20 L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Zen</span>
      </a>
      <button class="zen-burger" aria-label="Menu" onclick="zenToggleMobileMenu()"><span></span><span></span><span></span></button>
      <ul class="nav-links">
        <li class="has-dropdown ${active==='products'?'active':''}">
          <a href="products.html">Produkty <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="dropdown dropdown-wide">
            <div class="dropdown-col" style="flex-basis:100%;border-bottom:1px solid var(--border);margin-bottom:4px;padding-bottom:4px;">
              <a href="products.html" style="font-weight:600;color:var(--primary);">✨ Přehled všech produktů →</a>
            </div>
            <div class="dropdown-col">
              <div class="dropdown-head">Platby</div>
              <a href="payments.html">💳 Platby</a>
              <a href="terminal.html">🏪 Terminál</a>
              <a href="connect.html">🔗 Connect</a>
              <a href="billing.html">📄 Fakturace</a>
              <a href="subscriptions.html">🔄 Předplatné</a>
              <a href="payment-links.html">🔗 Payment Links</a>
            </div>
            <div class="dropdown-col">
              <div class="dropdown-head">Finance & rozšíření</div>
              <a href="capital.html">💰 Capital</a>
              <a href="issuing.html">💳 Issuing</a>
              <a href="treasury.html">🏦 Treasury</a>
              <a href="revenue.html">📐 Revenue Rec.</a>
              <a href="atlas.html">🏛️ Atlas</a>
              <a href="tax.html">🧾 Tax</a>
            </div>
            <div class="dropdown-col">
              <div class="dropdown-head">Inteligence & důvěra</div>
              <a href="radar.html">🛡️ Radar</a>
              <a href="identity.html">🪪 Identity</a>
              <a href="sigma.html">📊 Sigma</a>
              <a href="climate.html">🌱 Climate</a>
            </div>
          </div>
        </li>
        <li class="has-dropdown">
          <a href="#">Řešení <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="dropdown">
            <a href="solutions.html?type=ecommerce">E-commerce</a>
            <a href="solutions.html?type=saas">SaaS</a>
            <a href="solutions.html?type=marketplace">Marketplace</a>
            <a href="solutions.html?type=platforms">Platformy</a>
          </div>
        </li>
        <li class="has-dropdown ${active==='developers'?'active':''}">
          <a href="#">Vývojáři <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="dropdown">
            <a href="docs.html">📖 Dokumentace</a>
            <a href="api.html">⚙️ API reference</a>
            <a href="quickstart.html">🚀 Quickstart</a>
            <a href="guides.html">📚 Návody</a>
            <a href="playground.html">⚡ API Playground</a>
            <a href="status.html">🟢 Stav systému</a>
            <a href="changelog.html">📝 Changelog</a>
          </div>
        </li>
        <li class="has-dropdown">
          <a href="#">Zdroje <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="dropdown">
            <a href="blog.html">📝 Blog</a>
            <a href="customers.html">👥 Zákazníci</a>
            <a href="compare.html">⚖️ Srovnání</a>
            <a href="migrate.html">🔀 Migrace od konkurence</a>
            <a href="checkout.html">💳 Checkout demo</a>
            <a href="radar-demo.html">🧪 Radar demo</a>
            <a href="tax.html">🧾 DPH kalkulačka</a>
            <a href="events.html">🎫 Události</a>
            <a href="support.html">💬 Podpora</a>
          </div>
        </li>
        <li class="has-dropdown">
          <a href="#">Firma <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></a>
          <div class="dropdown">
            <a href="about.html">🏢 O nás</a>
            <a href="security.html">🛡️ Bezpečnost</a>
            <a href="partners.html">🤝 Partneři</a>
            <a href="careers.html">💼 Kariéra</a>
            <a href="press.html">📰 Press kit</a>
            <a href="contact.html">📧 Kontakt</a>
          </div>
        </li>
        <li class="${active==='pricing'?'active':''}"><a href="pricing.html">Ceník</a></li>
      </ul>
    </div>
    <div class="nav-right">
      <button class="nav-palette-trigger" onclick="zenOpenPalette && zenOpenPalette()" title="Hledat (⌘K)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <span>Hledat</span>
        <kbd>⌘K</kbd>
      </button>
      <a href="contact.html" class="nav-link-auth">Kontakt prodej</a>
      <a href="login.html" class="nav-link-auth">Přihlásit se →</a>
      <a href="signup.html" class="btn-primary-sm">Začít zdarma →</a>
    </div>
  </div>
</nav>
<div class="zen-mobile-overlay" onclick="zenToggleMobileMenu()"></div>`;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo logo-dark">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#635bff"/>
            <path d="M10 16 L14 20 L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Zen</span>
        </a>
        <p class="footer-tagline">Finanční infrastruktura pro internet</p>
        <div class="footer-social">
          <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
          <a href="#" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Produkty</h4>
        <ul>
          <li><a href="payments.html">Platby</a></li>
          <li><a href="terminal.html">Terminál</a></li>
          <li><a href="connect.html">Connect</a></li>
          <li><a href="radar.html">Radar</a></li>
          <li><a href="billing.html">Fakturace</a></li>
          <li><a href="subscriptions.html">Předplatné</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Více produktů</h4>
        <ul>
          <li><a href="capital.html">Capital</a></li>
          <li><a href="issuing.html">Issuing</a></li>
          <li><a href="treasury.html">Treasury</a></li>
          <li><a href="payment-links.html">Payment Links</a></li>
          <li><a href="revenue.html">Revenue Rec.</a></li>
          <li><a href="identity.html">Identity</a></li>
          <li><a href="sigma.html">Sigma</a></li>
          <li><a href="atlas.html">Atlas</a></li>
          <li><a href="tax.html">Tax</a></li>
          <li><a href="climate.html">Climate</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Firma</h4>
        <ul>
          <li><a href="about.html">O nás</a></li>
          <li><a href="customers.html">Zákazníci</a></li>
          <li><a href="careers.html">Kariéra</a></li>
          <li><a href="partners.html">Partneři</a></li>
          <li><a href="press.html">Press kit</a></li>
          <li><a href="security.html">Bezpečnost</a></li>
          <li><a href="contact.html">Kontakt</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Zdroje</h4>
        <ul>
          <li><a href="docs.html">Dokumentace</a></li>
          <li><a href="quickstart.html">Quickstart</a></li>
          <li><a href="guides.html">Návody</a></li>
          <li><a href="api.html">API reference</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="events.html">Události</a></li>
          <li><a href="status.html">Stav systému</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Právní</h4>
        <ul>
          <li><a href="legal.html?t=privacy">Soukromí</a></li>
          <li><a href="legal.html?t=terms">Podmínky</a></li>
          <li><a href="legal.html?t=licenses">Licence</a></li>
          <li><a href="legal.html?t=cookies">Cookies</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© 2026 Zen Payments, a.s. Všechna práva vyhrazena.</div>
      <div class="footer-lang">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" stroke="currentColor" stroke-width="1.5"/></svg>
        Česká republika (Čeština)
      </div>
    </div>
  </div>
</footer>`;
}

// Inject zen.css + zen.js + PWA/SEO head assets into <head> if not already present
(function injectZenAssets() {
  if (!document.querySelector('link[href="zen.css"]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = 'zen.css';
    document.head.appendChild(l);
  }
  if (!document.querySelector('script[src="zen.js"]')) {
    const s = document.createElement('script');
    s.src = 'zen.js'; s.defer = true;
    document.head.appendChild(s);
  }
})();

function renderFloatingControls() {
  return `
    <button class="zen-theme-toggle" onclick="zenToggleTheme()" title="Přepnout motiv (Light/Dark)" aria-label="Přepnout motiv">
      <span class="theme-toggle-icon">🌙</span>
    </button>
    <button class="zen-chat-bubble" onclick="zenToast('💬 Podpora: napište nám na support@zen.cz nebo přes chat.')" title="Chat s podporou" aria-label="Chat">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    </button>`;
}

// Auto-inject if placeholders exist
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = renderNav(navEl.dataset.active || '');
  const footEl = document.getElementById('footer-placeholder');
  if (footEl) footEl.outerHTML = renderFooter();

  // Floating controls (theme toggle + chat)
  if (!document.querySelector('.zen-theme-toggle')) {
    const wrap = document.createElement('div');
    wrap.innerHTML = renderFloatingControls();
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  }

  // Dropdown hover (delegated after inject)
  document.querySelectorAll('.has-dropdown').forEach(d => {
    d.addEventListener('mouseenter', () => d.classList.add('open'));
    d.addEventListener('mouseleave', () => d.classList.remove('open'));
  });

  // Cookie banner (first visit)
  if (!localStorage.getItem('zen_cookies') && !document.querySelector('.zen-cookies')) {
    const c = document.createElement('div');
    c.className = 'zen-cookies';
    c.innerHTML = `
      <div class="zen-cookies-text">🍪 Používáme cookies pro zlepšení zážitku, analytiku a marketing. Podrobnosti v <a href="legal.html?t=cookies">Cookies policy</a>.</div>
      <div class="zen-cookies-actions">
        <button class="btn-secondary" onclick="localStorage.setItem('zen_cookies','rejected'); this.closest('.zen-cookies').remove();">Odmítnout</button>
        <button class="btn-primary" onclick="localStorage.setItem('zen_cookies','accepted'); this.closest('.zen-cookies').remove();">Přijmout vše</button>
      </div>`;
    document.body.appendChild(c);
  }
});
