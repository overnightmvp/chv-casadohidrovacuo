/* ===== CASA DO HIDROVÁCUO — MAIN JS (performance-optimised) ===== */
'use strict';

const CONFIG = { PHONE_NUMBER: '554133457373' };
let state = { selectedService: 'Recuperação de Hidrovácuo' };

/* ── Defer all init until after first paint ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // already parsed — schedule after paint to avoid blocking LCP
  requestAnimationFrame(() => setTimeout(init, 0));
}

function init() {
  initMultiStepForm();
  initPhoneLinks();
  initFAQ();
  initScrollAnimations();
  initAutoHideHeader();
  // Defer analytics to after page is interactive
  requestIdleCallback ? requestIdleCallback(trackPageView) : setTimeout(trackPageView, 2000);
}

/* ── Multi-step form ── */
function initMultiStepForm() {
  const form = document.getElementById('multistep-form');
  if (!form) return;

  // Cache elements once — avoids repeated querySelectorAll (reflow source)
  const steps     = Array.from(document.querySelectorAll('.form-step'));
  const dots      = Array.from(document.querySelectorAll('.step-dot'));
  const serviceBtns = Array.from(document.querySelectorAll('.service-btn'));
  let currentStep = 1;

  function goToStep(n) {
    // Batch reads before writes to avoid forced reflow
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i + 1 < n)  dot.classList.add('done');
      if (i + 1 === n) dot.classList.add('active');
    });
    steps.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`step-${n}`);
    if (target) target.classList.add('active');
    currentStep = n;
  }

  // Event delegation on the form instead of N listeners
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-btn');
    if (!btn) return;
    e.preventDefault();
    state.selectedService = btn.textContent.trim();
    serviceBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.service-btn[data-service="${btn.dataset.service}"]`)
            .forEach(b => b.classList.add('active'));
    if (btn.closest('#hero-quote-card')) {
      document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      goToStep(2);
    }
  });

  document.getElementById('next-1')?.addEventListener('click', () => goToStep(2));
  document.getElementById('next-2')?.addEventListener('click', () => {
    const vModel = document.getElementById('vehicle-model');
    if (!vModel?.value) {
      vModel.style.borderColor = 'var(--color-warning)';
      return;
    }
    vModel.style.borderColor = '';
    goToStep(3);
  });
  document.getElementById('back-2')?.addEventListener('click', () => goToStep(1));
  document.getElementById('back-3')?.addEventListener('click', () => goToStep(2));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('lead-name')?.value;
    const phone   = document.getElementById('lead-phone')?.value;
    const details = document.getElementById('lead-details')?.value || '';
    const vType   = document.getElementById('vehicle-type')?.value || '';
    const vModel  = document.getElementById('vehicle-model')?.value || '';
    if (!name || !phone) { alert('Por favor, preencha o nome e WhatsApp.'); return; }
    let text = `Olá! Preciso de um orçamento (Via Site):\n\n`;
    text += `*Serviço:* ${state.selectedService}\n`;
    text += `*Veículo:* ${vType.toUpperCase()} - ${vModel}\n`;
    text += `*Nome:* ${name}\n*Telefone:* ${phone}\n`;
    if (details.trim()) text += `\n*Detalhes:* ${details}`;
    requestIdleCallback ? requestIdleCallback(() => trackLead(state.selectedService))
                        : trackLead(state.selectedService);
    window.location.href = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  });
}

/* ── Phone input mask ── */
function initPhoneLinks() {
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (val.length >= 11)      val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7,11)}`;
      else if (val.length >= 7)  val = `(${val.slice(0,2)}) ${val.slice(2,6)}-${val.slice(6)}`;
      e.target.value = val;
    });
  });
}

/* ── Auto-hide header — fixed reflow: read scrollY once, no intermediate reads ── */
function initAutoHideHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastScrollY = window.scrollY;
  let ticking     = false;
  let hidden       = false;

  function updateHeader() {
    const y = window.scrollY; // single read
    const shouldHide = y > lastScrollY && y > 60;
    if (shouldHide !== hidden) {
      header.classList.toggle('header-hidden', shouldHide);
      hidden = shouldHide;
    }
    lastScrollY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
  }, { passive: true });
}

/* ── FAQ accordion ── */
function initFAQ() {
  // Event delegation — one listener instead of N
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
}

/* ── Scroll reveal — IntersectionObserver (no reflow) ── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ── Analytics (deferred) ── */
function trackPageView() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', { page_title: document.title, page_location: window.location.href });
  }
}
function trackLead(serviceName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', { lead_source: 'whatsapp_form', service: serviceName });
  }
}

/* ── Novo formulário de diagnóstico (CRO v2) ── */
function initDiagnosticoForm() {
  const form = document.getElementById('diagnostico-form');
  if (!form) return;

  // Sintoma pills — múltipla seleção
  const symptomPills = Array.from(document.querySelectorAll('#symptom-selector .symptom-pill'));
  symptomPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
    });
  });

  // Urgência pills — seleção única
  const urgencyPills = Array.from(document.querySelectorAll('[data-urgency]'));
  urgencyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      urgencyPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  // Hero symptom pills sync com hero card
  const heroPills = Array.from(document.querySelectorAll('#hero-symptom-card .symptom-pill'));
  heroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      heroPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      // Pre-select in main form when scrolled
      const match = symptomPills.find(p => p.dataset.symptom === pill.dataset.symptom);
      if (match) {
        symptomPills.forEach(p => p.classList.remove('selected'));
        match.classList.add('selected');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('lead-name')?.value?.trim();
    const phone = document.getElementById('lead-phone')?.value?.trim();
    const vtype = document.getElementById('vehicle-type')?.value || '';
    const vmodel= document.getElementById('vehicle-model')?.value?.trim() || '';
    const extra = document.getElementById('lead-details')?.value?.trim() || '';
    const otherSymptom = document.getElementById('symptom-other-input')?.value?.trim() || '';

    if (!name || !phone) { alert('Por favor, preencha seu nome e WhatsApp.'); return; }

    // Collect selected symptoms
    const selected = symptomPills.filter(p => p.classList.contains('selected')).map(p => p.dataset.symptom);
    if (otherSymptom) selected.push(otherSymptom);
    const selectedUrgency = urgencyPills.find(p => p.classList.contains('selected'))?.textContent?.trim() || '';

    let text = `Olá! Quero um orçamento de freios (via site):\n\n`;
    if (selected.length) text += `*Sintoma(s):* ${selected.join(', ')}\n`;
    if (vtype || vmodel) text += `*Veículo:* ${vtype} — ${vmodel}\n`;
    if (selectedUrgency) text += `*Urgência:* ${selectedUrgency}\n`;
    text += `*Nome:* ${name}\n*WhatsApp:* ${phone}\n`;
    if (extra) text += `\n*Detalhes:* ${extra}`;

    requestIdleCallback ? requestIdleCallback(() => trackLead('diagnostico_v2')) : trackLead('diagnostico_v2');
    window.location.href = `https://wa.me/554133457373?text=${encodeURIComponent(text)}`;
  });
}

// Append to init
const _origInit = typeof init === 'function' ? init : null;
document.addEventListener('DOMContentLoaded', () => {
  initDiagnosticoForm();
});
