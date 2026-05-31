// Shared sidebar/topbar for dashboard pages
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

function renderAppShell(activeKey) {
  const items = [
    { group: null, items: [
      { key:'home', label:'Přehled', href:'dashboard.html', icon:'<path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"/>' },
      { key:'payments', label:'Platby', href:'payments-app.html', icon:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' },
      { key:'balance', label:'Zůstatky', href:'balance.html', icon:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>' },
      { key:'customers', label:'Zákazníci', href:'customers-app.html', icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
      { key:'products', label:'Produkty', href:'products-app.html', icon:'<path d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4v14h16V7z"/>' },
      { key:'invoices', label:'Faktury', href:'invoices-app.html', icon:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>' },
      { key:'disputes', label:'Spory', href:'disputes.html', icon:'<path d="M3 6h18M3 12h18M3 18h18"/><circle cx="12" cy="12" r="10"/>' },
    ]},
    { group: 'Analýzy', items: [
      { key:'analytics', label:'Analytika', href:'analytics.html', icon:'<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>' },
      { key:'notifications', label:'Oznámení', href:'notifications.html', icon:'<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>' },
    ]},
    { group: 'Vývojáři', items: [
      { key:'api-keys', label:'API klíče', href:'api-keys.html', icon:'<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5"/>' },
      { key:'webhooks', label:'Webhooky', href:'webhooks.html', icon:'<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6m11-11h-6m-10 0H1"/>' },
      { key:'logs', label:'API logy', href:'logs.html', icon:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>' },
      { key:'playground', label:'Playground', href:'playground.html', icon:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
    ]},
    { group: 'Nastavení', items: [
      { key:'settings', label:'Nastavení', href:'settings.html', icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33"/>' },
      { key:'team', label:'Tým', href:'team.html', icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>' },
    ]},
  ];

  let html = `<aside class="app-sidebar"><div class="app-logo">
    <svg width="26" height="26" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#635bff"/><path d="M10 16 L14 20 L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
    Zen</div><nav class="app-nav">`;
  items.forEach(grp => {
    if (grp.group) html += `<div class="app-nav-group">${grp.group}</div>`;
    grp.items.forEach(i => {
      html += `<a href="${i.href}" class="${i.key===activeKey?'active':''}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${i.icon}</svg> ${i.label}</a>`;
    });
  });
  html += `</nav></aside>`;
  return html;
}

function renderTopbar() {
  return `<div class="app-topbar">
    <div class="app-search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input placeholder="Hledat...  (⌘K)" id="appSearch">
    </div>
    <div class="app-topbar-right">
      <div class="topbar-mode-toggle">
        <button class="active">Live</button>
        <button onclick="appToast('Přepnuto do testovacího režimu')">Test</button>
      </div>
      <button class="app-icon-btn" onclick="location.href='notifications.html'" title="Oznámení">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
        <span class="dot"></span>
      </button>
      <button class="app-icon-btn" onclick="location.href='docs.html'" title="Dokumentace">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
      </button>
      <div class="user-chip" onclick="location.href='settings.html'">
        <div class="user-avatar-sm" id="userAvatar">ZN</div>
        <span class="user-chip-name" id="userName">Uživatel</span>
      </div>
    </div>
  </div>`;
}

function mountApp(activeKey) {
  const root = document.getElementById('appRoot');
  const main = root.innerHTML;
  root.innerHTML = `${renderAppShell(activeKey)}<div class="app-main">${renderTopbar()}<div class="app-content">${main}</div></div>`;
  const u = JSON.parse(localStorage.getItem('zen_user') || '{"name":"Demo","email":"demo@zen.cz"}');
  const nameEl = document.getElementById('userName');
  const avEl = document.getElementById('userAvatar');
  if (nameEl) nameEl.textContent = u.name || 'Uživatel';
  if (avEl) avEl.textContent = (u.name || 'ZN').substring(0,2).toUpperCase();
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('appSearch')?.focus(); }
  });
}

function appToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
