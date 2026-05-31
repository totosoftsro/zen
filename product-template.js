// Produkt page template
function renderProductHero(title, subtitle, gradient) {
  document.body.insertAdjacentHTML('afterbegin', `
  <div id="nav-placeholder" data-active="products"></div>
  <section class="page-hero" style="background: ${gradient};">
    <div class="container">
      <div class="page-hero-inner">
        <div class="breadcrumb"><a href="index.html">Domů</a> <span>›</span> <a href="#">Produkty</a> <span>›</span> ${title}</div>
        <h1 style="color:white;">${title}</h1>
        <p style="color:rgba(255,255,255,0.85);">${subtitle}</p>
        <div class="hero-cta" style="justify-content:center; margin-top:28px;">
          <a href="signup.html" class="btn-primary-light">Začít hned →</a>
          <a href="docs.html" class="btn-secondary-light">Dokumentace →</a>
        </div>
      </div>
    </div>
  </section>`);
}
function renderFooterPlaceholder() {
  document.body.insertAdjacentHTML('beforeend', `<div id="footer-placeholder"></div>`);
}
