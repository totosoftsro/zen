// Tab switching in dashboard card
document.querySelectorAll('.dashboard-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tab.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Code language tabs
const codeSnippets = {
  'Node.js': `<span class="code-comment">// Vytvoření platby pomocí Zen API</span>
<span class="code-keyword">const</span> zen = <span class="code-fn">require</span>(<span class="code-string">'zen'</span>)(<span class="code-string">'sk_live_...'</span>);

<span class="code-keyword">const</span> payment = <span class="code-keyword">await</span> zen.paymentIntents.<span class="code-fn">create</span>({
  amount: <span class="code-number">249900</span>,
  currency: <span class="code-string">'czk'</span>,
  payment_method_types: [<span class="code-string">'card'</span>],
  description: <span class="code-string">'Objednávka #1052'</span>,
  metadata: {
    order_id: <span class="code-string">'1052'</span>,
    customer: <span class="code-string">'zakaznik@example.cz'</span>
  }
});

<span class="code-fn">console</span>.<span class="code-fn">log</span>(payment.id);
<span class="code-comment">// → pi_3N4QLk2eZvKYlo2C0x7V8yH2</span>`,
  'Python': `<span class="code-comment"># Vytvoření platby pomocí Zen API</span>
<span class="code-keyword">import</span> zen
zen.api_key = <span class="code-string">'sk_live_...'</span>

payment = zen.PaymentIntent.<span class="code-fn">create</span>(
    amount=<span class="code-number">249900</span>,
    currency=<span class="code-string">'czk'</span>,
    payment_method_types=[<span class="code-string">'card'</span>],
    description=<span class="code-string">'Objednávka #1052'</span>,
    metadata={
        <span class="code-string">'order_id'</span>: <span class="code-string">'1052'</span>,
        <span class="code-string">'customer'</span>: <span class="code-string">'zakaznik@example.cz'</span>
    }
)

<span class="code-fn">print</span>(payment.id)
<span class="code-comment"># → pi_3N4QLk2eZvKYlo2C0x7V8yH2</span>`,
  'Ruby': `<span class="code-comment"># Vytvoření platby pomocí Zen API</span>
<span class="code-keyword">require</span> <span class="code-string">'zen'</span>
Zen.api_key = <span class="code-string">'sk_live_...'</span>

payment = Zen::PaymentIntent.<span class="code-fn">create</span>({
  amount: <span class="code-number">249900</span>,
  currency: <span class="code-string">'czk'</span>,
  payment_method_types: [<span class="code-string">'card'</span>],
  description: <span class="code-string">'Objednávka #1052'</span>,
  metadata: {
    order_id: <span class="code-string">'1052'</span>,
    customer: <span class="code-string">'zakaznik@example.cz'</span>
  }
})

<span class="code-fn">puts</span> payment.id
<span class="code-comment"># → pi_3N4QLk2eZvKYlo2C0x7V8yH2</span>`,
  'Go': `<span class="code-comment">// Vytvoření platby pomocí Zen API</span>
<span class="code-keyword">import</span> <span class="code-string">"github.com/zen/zen-go/v7"</span>

zen.Key = <span class="code-string">"sk_live_..."</span>

params := &zen.PaymentIntentParams{
    Amount:   zen.<span class="code-fn">Int64</span>(<span class="code-number">249900</span>),
    Currency: zen.<span class="code-fn">String</span>(<span class="code-string">"czk"</span>),
    PaymentMethodTypes: []*<span class="code-keyword">string</span>{
        zen.<span class="code-fn">String</span>(<span class="code-string">"card"</span>),
    },
}

pi, _ := paymentintent.<span class="code-fn">New</span>(params)
fmt.<span class="code-fn">Println</span>(pi.ID)`,
  'PHP': `<span class="code-comment">// Vytvoření platby pomocí Zen API</span>
\\Zen\\Zen::<span class="code-fn">setApiKey</span>(<span class="code-string">'sk_live_...'</span>);

$payment = \\Zen\\PaymentIntent::<span class="code-fn">create</span>([
  <span class="code-string">'amount'</span> => <span class="code-number">249900</span>,
  <span class="code-string">'currency'</span> => <span class="code-string">'czk'</span>,
  <span class="code-string">'payment_method_types'</span> => [<span class="code-string">'card'</span>],
  <span class="code-string">'description'</span> => <span class="code-string">'Objednávka #1052'</span>,
]);

<span class="code-fn">echo</span> $payment->id;`
};

document.querySelectorAll('.code-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const lang = tab.textContent;
    tab.parentElement.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const pre = document.querySelector('.code-content code');
    if (pre && codeSnippets[lang]) {
      pre.innerHTML = codeSnippets[lang];
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .price-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animate stat values on scroll
const animateNumber = (el, target) => {
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const current = Math.floor(target * eased);
    el.textContent = current.toLocaleString('cs-CZ') + ' Kč';
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = '3 528 198 Kč';
  };
  requestAnimationFrame(step);
};
