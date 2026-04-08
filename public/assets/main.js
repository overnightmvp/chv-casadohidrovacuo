/* ===== CASA DO HIDROVÁCUO — DIAGNOSTIC FORM LOGIC ===== */

'use strict';

const CONFIG = {
  PHONE_NUMBER: '554133297594',
};

let state = {
  selectedService: 'Recuperação de Hidrovácuo'
};

document.addEventListener('DOMContentLoaded', () => {
  initMultiStepForm();
  initPhoneLinks();
  initFAQ();
  initScrollAnimations();
  initAutoHideHeader();
  trackPageView();
});

function initMultiStepForm() {
  const form = document.getElementById('multistep-form');
  if (!form) return;

  let currentStep = 1;

  function goToStep(n) {
    // Update step dots
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i + 1 < n)  dot.classList.add('done');
      if (i + 1 === n) dot.classList.add('active');
    });
    // Show correct step panel
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${n}`).classList.add('active');
    currentStep = n;
  }

  // Bind service buttons (Hero and Step 1)
  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      state.selectedService = btn.textContent.trim();
      
      // Update UI active state everywhere
      document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.service-btn[data-service="${btn.dataset.service}"]`).forEach(b => b.classList.add('active'));

      // If clicked from Hero card, scroll to form and go to Step 2
      if(btn.closest('#hero-quote-card')) {
        document.getElementById('get-quote').scrollIntoView({ behavior: 'smooth' });
        goToStep(2);
      }
    });
  });

  // Next/Back buttons
  document.getElementById('next-1').addEventListener('click', () => goToStep(2));
  document.getElementById('next-2').addEventListener('click', () => {
    const vType = document.getElementById('vehicle-type').value;
    const vModel = document.getElementById('vehicle-model').value;
    if(!vModel) {
      document.getElementById('vehicle-model').style.borderColor = 'var(--color-warning)';
      return;
    }
    document.getElementById('vehicle-model').style.borderColor = '';
    goToStep(3);
  });
  
  document.getElementById('back-2').addEventListener('click', () => goToStep(1));
  document.getElementById('back-3').addEventListener('click', () => goToStep(2));

  // Form submit -> WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const details = document.getElementById('lead-details').value;
    const vType = document.getElementById('vehicle-type').value;
    const vModel = document.getElementById('vehicle-model').value;

    if(!name || !phone) {
      alert("Por favor, preencha o nome e WhatsApp.");
      return;
    }

    // Build the WhatsApp Message
    let text = `Olá! Preciso de um orçamento (Via Site):\n\n`;
    text += `*Serviço:* ${state.selectedService}\n`;
    text += `*Veículo:* ${vType.toUpperCase()} - ${vModel}\n`;
    text += `*Nome:* ${name}\n`;
    text += `*Telefone:* ${phone}\n`;
    
    if(details.trim()) {
      text += `\n*Detalhes:* ${details}`;
    }

    const waLink = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    
    // Track conversion before redirect
    trackLead(state.selectedService);
    
    // Redirect to WhatsApp
    window.location.href = waLink;
  });
}

function initPhoneLinks() {
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0,11);
      
      if (val.length >= 11) {
        val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7,11)}`;
      } else if (val.length >= 7) {
        val = `(${val.slice(0,2)}) ${val.slice(2,6)}-${val.slice(6)}`;
      }
      e.target.value = val;
    });
  });
}

function initAutoHideHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastScrollY = window.scrollY;
  let ticking = false;
  function updateHeader() {
    if (window.scrollY > lastScrollY && window.scrollY > 60) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateHeader); ticking = true; }
  }, { passive: true });
}

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if(!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

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
