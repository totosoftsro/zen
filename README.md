# Zen — platební platforma

Kompletní webová prezentace a aplikace fiktivní české platební společnosti **Zen Payments, a.s.** Postaveno jako moderní, plně responzivní web inspirovaný nejlepšími fintech produkty — **bez jakéhokoli build kroku, frameworku nebo závislostí**. Čisté HTML, CSS a vanilla JavaScript.

> ⚠️ Jde o ukázkový/demonstrační projekt. Všechna data, čísla, certifikáty i identita firmy jsou smyšlené.

---

## ✨ Hlavní vlastnosti

- **63 stránek** — marketing, produkty, dokumentace i kompletní přihlášená aplikace (dashboard)
- **Žádný build** — otevřete `index.html` a vše funguje
- **PWA** — instalovatelné na plochu/telefon, funguje offline (service worker + manifest)
- **Tmavý režim** — přepínání light/dark s uložením preference
- **Command palette** (`⌘K` / `/`) — rychlé vyhledávání napříč celým webem
- **Plně česky** se správnou diakritikou
- **Responzivní** — breakpointy 960 px / 600 px
- **Přístupnost** — skip-to-content odkaz, viditelný keyboard focus, `prefers-reduced-motion`
- **SEO** — meta description, Open Graph, Twitter karty, `sitemap.xml`, `robots.txt`
- **Interaktivní dema** — kalkulačky, SQL editor, fraud scorer, builder platebních odkazů, ověření identity a další (vše čistě v prohlížeči)

---

## 🚀 Spuštění

Stačí jakýkoli statický server (kvůli service workeru a `fetch` doporučeno přes HTTP, ne `file://`):

```bash
# Python
python3 -m http.server 8000

# nebo Node
npx serve

# nebo VS Code Live Server
```

Pak otevřete <http://localhost:8000>.

---

## 🏗️ Architektura

Tajemstvím celého projektu je **sdílená infrastruktura injektovaná za běhu** — díky tomu se navigace, patička, motiv a PWA chovají konzistentně na všech stránkách, aniž by se musely upravovat jednotlivě.

### Sdílené soubory

| Soubor | Účel |
|--------|------|
| `styles.css` | Základní design systém (marketing stránky) |
| `app.css` | Styly přihlášené aplikace (dashboard, navigace, dropdowny) |
| `zen.css` | Globální vrstva: dark mode, command palette, animace, a11y, PWA UI |
| `zen.js` | **Globální logika na každé stránce**: motiv, paleta, toasty, klávesové zkratky, service worker, injektování `<head>` (favicon/meta/OG), skip link, back-to-top, scroll progress |
| `shared.js` | Renderuje a injektuje **navigaci + patičku** přes `#nav-placeholder` / `#footer-placeholder` + cookie lišta |
| `app-shell.js` | Renderuje **sidebar + topbar dashboardu** přes `mountApp('<klíč>')` |
| `manifest.json` | PWA manifest (ikony, barvy, app shortcuts) |
| `sw.js` | Service worker — offline cache (network-first pro navigaci, stale-while-revalidate pro assety) |
| `icon.svg` | Aplikační ikona |
| `offline.html` | Fallback stránka při výpadku sítě |
| `sitemap.xml`, `robots.txt` | SEO |

### Dva typy stránek

**1) Marketingové / veřejné stránky**
```html
<div id="nav-placeholder" data-active="products"></div>
...
<div id="footer-placeholder"></div>
<script src="shared.js"></script>
```
`shared.js` nahradí placeholdery hotovou navigací a patičkou; `zen.js` (injektovaný automaticky) dodá motiv, paletu a PWA.

**2) Stránky aplikace (dashboard)**
```html
<div class="app-layout" id="appRoot"> ...obsah... </div>
<script src="app-shell.js"></script>
<script>mountApp('payments');</script>
```
`mountApp(key)` obalí obsah sidebar + topbarem a zvýrazní aktivní položku.

---

## 🗺️ Mapa stránek

### Veřejné
`index.html` (domů) · `products.html` (rozcestník) · `pricing.html` · `solutions.html` · `customers.html` · `about.html` · `careers.html` · `contact.html` · `blog.html` · `blog-post.html` · `changelog.html` · `docs.html` · `api.html` · `quickstart.html` · `guides.html` · `support.html` · `status.html` · `security.html` · `partners.html` · `events.html` · `press.html` · `compare.html` · `migrate.html` · `legal.html` · `login.html` · `signup.html` · `404.html`

### Produkty
`payments.html` · `terminal.html` · `connect.html` · `billing.html` · `subscriptions.html` · `payment-links.html` · `capital.html` · `issuing.html` · `treasury.html` · `revenue.html` · `atlas.html` · `tax.html` · `radar.html` · `identity.html` · `sigma.html` · `climate.html`

### Interaktivní dema
`checkout.html` (platba + 3DS + konfety) · `playground.html` (API tester) · `radar-demo.html` (fraud scorer) · řada produktů má vlastní kalkulačky/buildery.

### Aplikace (dashboard)
`dashboard.html` · `payments-app.html` · `payment-detail.html` · `new-payment.html` · `customers-app.html` · `products-app.html` · `invoices-app.html` · `balance.html` · `disputes.html` · `analytics.html` · `notifications.html` · `api-keys.html` · `webhooks.html` · `logs.html` · `settings.html` · `team.html`

---

## ⌨️ Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `⌘K` / `Ctrl K` | Otevřít command palette |
| `/` | Rychlé hledání |
| `?` | Nápověda ke zkratkám |
| `⌘⇧D` | Přepnout světlý/tmavý režim |
| `↑ ↓` / `↵` / `Esc` | Ovládání palety |

---

## 💾 Stav v `localStorage`

| Klíč | Význam |
|------|--------|
| `zen_theme` | `light` / `dark` |
| `zen_user` | Přihlášený uživatel (nastaví login/signup) |
| `zen_cookies` | Volba cookie lišty |
| `zen_onboarded` | Dokončený onboarding na dashboardu |

---

## 🎨 Design systém

- **Písma:** Inter (text) + Sora (nadpisy), Google Fonts
- **Primární barvy:** Zen Purple `#635BFF`, Zen Navy `#0A2540`, Zen Mint `#00D4AA`
- **Grafy:** ručně psané SVG (žádná knihovna)
- **Ikony:** inline SVG + emoji

---

## 🧰 Technologie

Vanilla **HTML5 + CSS3 + JavaScript (ES6+)**. Žádné npm závislosti, žádný bundler, žádný transpiler. Vše běží přímo v prohlížeči.

© 2026 Zen Payments, a.s. — ukázkový projekt.
