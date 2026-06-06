export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

export const componentsData: ComponentItem[] = [
  {
    id: "animated-navbar",
    name: "Animated Navbar",
    description: "A sleek navigation bar with smooth hover underlines and responsive mobile menu.",
    html: `<nav class="navbar">
  <div class="nav-container">
    <a class="nav-logo" href="#">LOGO<span>.</span></a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Work</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <a class="nav-cta" href="#">Hire Me</a>
  </div>
</nav>`,
    css: `.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  padding: 1.25rem 2rem;
  background: rgba(5,5,5,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  z-index: 100;
}
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
.nav-logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
}
.nav-logo span { color: #FF3B30; }
.nav-links {
  display: flex; gap: 2rem;
  list-style: none; margin: 0; padding: 0;
}
.nav-links a {
  text-decoration: none;
  color: #888;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 50%;
  transform: translateX(-50%);
  width: 0; height: 1px;
  background: #FF3B30;
  transition: width 0.3s;
}
.nav-links a:hover { color: #fff; }
.nav-links a:hover::after { width: 100%; }
.nav-cta {
  padding: 0.5rem 1.25rem;
  border: 1px solid #FF3B30;
  color: #FF3B30;
  text-decoration: none;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.3s;
}
.nav-cta:hover {
  background: #FF3B30;
  color: #fff;
}`,
    js: `// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Transparent on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});`,
  },
  {
    id: "glass-card",
    name: "Glass Card",
    description: "A premium glassmorphism card with blur effect, border glow, and subtle reflection.",
    html: `<div class="glass-card">
  <div class="glass-card__icon">✦</div>
  <h3 class="glass-card__title">Premium Feature</h3>
  <p class="glass-card__text">
    Beautiful glassmorphism card with frosted
    glass effect, subtle glow, and smooth hover.
  </p>
  <a class="glass-card__btn" href="#">Learn More →</a>
</div>`,
    css: `.glass-card {
  position: relative;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.4s, border-color 0.4s;
  max-width: 320px;
}
.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg, transparent, rgba(255,255,255,0.15), transparent
  );
}
.glass-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 59, 48, 0.3);
}
.glass-card__icon {
  font-size: 2rem;
  color: #FF3B30;
  margin-bottom: 1.25rem;
}
.glass-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0.75rem;
}
.glass-card__text {
  font-size: 0.875rem;
  color: #888;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}
.glass-card__btn {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF3B30;
  text-decoration: none;
  transition: letter-spacing 0.3s;
}
.glass-card__btn:hover { letter-spacing: 0.25em; }`,
    js: `// Optional: 3D tilt effect on mouse move
const card = document.querySelector('.glass-card');

card?.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const rotX = (-y / rect.height) * 10;
  const rotY = (x / rect.width) * 10;
  card.style.transform =
    \`perspective(600px) rotateX(\${rotX}deg) rotateY(\${rotY}deg)\`;
});

card?.addEventListener('mouseleave', () => {
  card.style.transform = '';
});`,
  },
  {
    id: "pricing-section",
    name: "Pricing Section",
    description: "Three-tier pricing cards with feature lists, hover animations, and highlighted plan.",
    html: `<section class="pricing">
  <div class="pricing__grid">
    <div class="pricing__card">
      <p class="pricing__plan">Starter</p>
      <p class="pricing__price">$0<span>/mo</span></p>
      <ul class="pricing__features">
        <li>✓ 5 Projects</li>
        <li>✓ Basic Analytics</li>
        <li>✗ Custom Domain</li>
        <li>✗ Priority Support</li>
      </ul>
      <a class="pricing__btn" href="#">Get Started</a>
    </div>
    <div class="pricing__card pricing__card--featured">
      <span class="pricing__badge">Popular</span>
      <p class="pricing__plan">Pro</p>
      <p class="pricing__price">$29<span>/mo</span></p>
      <ul class="pricing__features">
        <li>✓ Unlimited Projects</li>
        <li>✓ Advanced Analytics</li>
        <li>✓ Custom Domain</li>
        <li>✓ Priority Support</li>
      </ul>
      <a class="pricing__btn pricing__btn--accent" href="#">Get Started</a>
    </div>
    <div class="pricing__card">
      <p class="pricing__plan">Enterprise</p>
      <p class="pricing__price">$99<span>/mo</span></p>
      <ul class="pricing__features">
        <li>✓ Everything in Pro</li>
        <li>✓ Dedicated Manager</li>
        <li>✓ SLA Guarantee</li>
        <li>✓ Custom Contracts</li>
      </ul>
      <a class="pricing__btn" href="#">Contact Us</a>
    </div>
  </div>
</section>`,
    css: `.pricing { padding: 4rem 1rem; }
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 860px;
  margin: 0 auto;
}
.pricing__card {
  position: relative;
  padding: 2rem;
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform 0.4s, border-color 0.4s;
}
.pricing__card:hover {
  transform: translateY(-6px);
  border-color: rgba(255,255,255,0.2);
}
.pricing__card--featured {
  border-color: #FF3B30;
  background: linear-gradient(135deg, #0E0E0E, #1a0000);
}
.pricing__badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  background: #FF3B30;
  color: #fff;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.pricing__plan {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  margin: 0 0 0.5rem;
}
.pricing__price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1.5rem;
}
.pricing__price span { font-size: 1rem; color: #888; }
.pricing__features {
  list-style: none;
  padding: 0; margin: 0 0 2rem;
}
.pricing__features li {
  font-size: 0.8rem;
  color: #888;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.pricing__btn {
  display: block;
  text-align: center;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  text-decoration: none;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.3s;
}
.pricing__btn:hover { border-color: #fff; }
.pricing__btn--accent {
  background: #FF3B30;
  border-color: #FF3B30;
}
.pricing__btn--accent:hover { background: transparent; }`,
    js: `// Toggle monthly/yearly billing
const toggle = document.querySelector('.billing-toggle');
const prices = document.querySelectorAll('.pricing__price');

toggle?.addEventListener('change', () => {
  const yearly = toggle.checked;
  prices.forEach((el, i) => {
    const monthly = [0, 29, 99][i];
    const price = yearly
      ? Math.round(monthly * 0.8)
      : monthly;
    el.textContent = \`$\${price}\`;
    el.appendChild(
      Object.assign(document.createElement('span'), {
        textContent: yearly ? '/yr' : '/mo'
      })
    );
  });
});`,
  },
  {
    id: "hero-section",
    name: "Hero Section",
    description: "Full-bleed cinematic hero with animated headline, CTA buttons, and scroll indicator.",
    html: `<section class="hero">
  <div class="hero__inner">
    <p class="hero__eyebrow">Welcome to my portfolio</p>
    <h1 class="hero__title">
      Building <span>Digital</span><br/>Experiences
    </h1>
    <p class="hero__subtitle">
      Premium frontend development with clean code,
      thoughtful design, and pixel-perfect execution.
    </p>
    <div class="hero__actions">
      <a class="hero__btn hero__btn--primary" href="#">
        View Projects
      </a>
      <a class="hero__btn hero__btn--ghost" href="#">
        Contact Me
      </a>
    </div>
  </div>
  <div class="hero__scroll">
    <span>Scroll Down</span>
    <div class="hero__scroll-line"></div>
  </div>
</section>`,
    css: `.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: #050505;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(255,59,48,0.04) 0%,
    transparent 60%
  );
}
.hero__eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #FF3B30;
  margin: 0 0 1.5rem;
}
.hero__title {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
}
.hero__title span { color: #FF3B30; }
.hero__subtitle {
  max-width: 480px;
  color: #888;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 auto 2.5rem;
}
.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.hero__btn {
  padding: 0.875rem 2rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s;
  font-weight: 700;
}
.hero__btn--primary {
  background: #FF3B30;
  color: #fff;
}
.hero__btn--primary:hover { background: #cc2f26; }
.hero__btn--ghost {
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
}
.hero__btn--ghost:hover { border-color: #fff; }
.hero__scroll {
  position: absolute;
  bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.hero__scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, #FF3B30, transparent);
  animation: scrollPulse 2s infinite;
}
@keyframes scrollPulse {
  0%,100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}`,
    js: `// Parallax title on mouse move
const hero = document.querySelector('.hero');
const title = document.querySelector('.hero__title');

hero?.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  title.style.transform =
    \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
});

hero?.addEventListener('mouseleave', () => {
  title.style.transform = '';
});`,
  },
  {
    id: "buttons",
    name: "Buttons",
    description: "A comprehensive set of premium button styles — filled, ghost, magnetic, and icon variants.",
    html: `<div class="btn-showcase">
  <button class="btn btn--primary">Primary</button>
  <button class="btn btn--ghost">Ghost</button>
  <button class="btn btn--outline">Outline</button>
  <button class="btn btn--icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
    With Icon
  </button>
  <button class="btn btn--danger">Danger</button>
  <button class="btn btn--loading" disabled>
    <span class="btn__spinner"></span>
    Loading...
  </button>
</div>`,
    css: `.btn-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
}
.btn {
  position: relative;
  padding: 0.75rem 1.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  background: rgba(255,255,255,0.08);
  transition: opacity 0.3s;
}
.btn:hover::after { opacity: 1; }
.btn--primary {
  background: #FF3B30;
  color: #fff;
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255,59,48,0.3);
}
.btn--ghost {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.15);
}
.btn--ghost:hover { border-color: #fff; }
.btn--outline {
  background: transparent;
  color: #FF3B30;
  border: 1px solid #FF3B30;
}
.btn--outline:hover {
  background: #FF3B30;
  color: #fff;
}
.btn--danger {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}
.btn--danger:hover {
  background: #ef4444;
  color: #fff;
}
.btn--loading {
  background: rgba(255,59,48,0.3);
  color: rgba(255,255,255,0.5);
  cursor: not-allowed;
}
.btn__spinner {
  width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`,
    js: `// Magnetic button effect
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform =
      \`translate(\${x * 0.2}px, \${y * 0.3}px)\`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = \`
      position:absolute;
      width:4px; height:4px;
      border-radius:50%;
      background:rgba(255,255,255,0.4);
      left:\${e.clientX - rect.left}px;
      top:\${e.clientY - rect.top}px;
      transform:scale(0);
      animation:ripple 0.6s ease-out;
    \`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});`,
  },
  {
    id: "modals",
    name: "Modals",
    description: "Smooth animated modal with backdrop blur, scale-in animation, and accessible close behavior.",
    html: `<div class="modal-demo">
  <button class="btn btn--primary" id="openModal">
    Open Modal
  </button>
</div>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal" role="dialog" aria-modal="true">
    <button class="modal__close" id="closeModal">✕</button>
    <div class="modal__icon">✦</div>
    <h2 class="modal__title">Confirm Action</h2>
    <p class="modal__text">
      Are you sure you want to proceed? This action
      cannot be undone once confirmed.
    </p>
    <div class="modal__actions">
      <button class="btn btn--primary">Confirm</button>
      <button class="btn btn--ghost" id="closeModal2">Cancel</button>
    </div>
  </div>
</div>`,
    css: `.modal-demo { padding: 2rem; }
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.modal-overlay.open {
  opacity: 1;
  pointer-events: all;
}
.modal {
  position: relative;
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 3rem;
  max-width: 420px;
  width: 90%;
  text-align: center;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
.modal-overlay.open .modal {
  transform: scale(1) translateY(0);
}
.modal__close {
  position: absolute;
  top: 1rem; right: 1rem;
  background: none; border: none;
  color: #555; font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;
}
.modal__close:hover { color: #fff; }
.modal__icon {
  font-size: 2rem;
  color: #FF3B30;
  margin-bottom: 1rem;
}
.modal__title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0.75rem;
}
.modal__text {
  font-size: 0.875rem;
  color: #888;
  line-height: 1.7;
  margin: 0 0 2rem;
}
.modal__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}`,
    js: `const overlay = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openModal');
const closeBtns = [
  document.getElementById('closeModal'),
  document.getElementById('closeModal2')
];

openBtn?.addEventListener('click', () => {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

const closeModal = () => {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};

closeBtns.forEach(btn => btn?.addEventListener('click', closeModal));

// Close on backdrop click
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});`,
  },
  {
    id: "accordions",
    name: "Accordions",
    description: "Smooth animated FAQ accordion with animated arrow, stagger transitions, and single-open mode.",
    html: `<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__trigger">
      <span>What technologies do you use?</span>
      <span class="accordion__arrow">↓</span>
    </button>
    <div class="accordion__content">
      <p>React, TypeScript, Tailwind CSS, Three.js,
      Framer Motion, GSAP, and Node.js for the backend.</p>
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__trigger">
      <span>How long does a project take?</span>
      <span class="accordion__arrow">↓</span>
    </button>
    <div class="accordion__content">
      <p>A typical project takes 2–6 weeks depending
      on scope, complexity, and revision cycles.</p>
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__trigger">
      <span>Do you offer design services?</span>
      <span class="accordion__arrow">↓</span>
    </button>
    <div class="accordion__content">
      <p>Yes — I can work from a Figma file or design
      the entire UI/UX from scratch alongside development.</p>
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__trigger">
      <span>What is your development process?</span>
      <span class="accordion__arrow">↓</span>
    </button>
    <div class="accordion__content">
      <p>Discovery → Design → Development → Testing →
      Launch. With regular check-ins throughout.</p>
    </div>
  </div>
</div>`,
    css: `.accordion {
  max-width: 600px;
  width: 100%;
}
.accordion__item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.accordion__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
  background: none; border: none;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: color 0.3s;
}
.accordion__trigger:hover { color: #FF3B30; }
.accordion__arrow {
  font-size: 1rem;
  color: #FF3B30;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  flex-shrink: 0;
}
.accordion__item.open .accordion__arrow {
  transform: rotate(180deg);
}
.accordion__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}
.accordion__item.open .accordion__content {
  max-height: 200px;
  padding-bottom: 1.25rem;
}
.accordion__content p {
  color: #888;
  font-size: 0.875rem;
  line-height: 1.7;
  margin: 0;
}`,
    js: `document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.accordion__item')
      .forEach(el => el.classList.remove('open'));

    // Open clicked item if it was closed
    if (!isOpen) item.classList.add('open');
  });
});`,
  },
  {
    id: "hover-cards",
    name: "Hover Cards",
    description: "Cards that lift and reveal content on hover with smooth transitions and red accent border.",
    html: `<div class="hover-cards">
  <div class="hover-card">
    <div class="hover-card__top">
      <span class="hover-card__num">01</span>
      <span class="hover-card__icon">⬡</span>
    </div>
    <h3 class="hover-card__title">UI Design</h3>
    <p class="hover-card__text">
      Pixel-perfect interfaces that feel as good as they look.
    </p>
    <a class="hover-card__link" href="#">Explore →</a>
  </div>
  <div class="hover-card">
    <div class="hover-card__top">
      <span class="hover-card__num">02</span>
      <span class="hover-card__icon">◈</span>
    </div>
    <h3 class="hover-card__title">Development</h3>
    <p class="hover-card__text">
      Clean, maintainable code built for scale and performance.
    </p>
    <a class="hover-card__link" href="#">Explore →</a>
  </div>
  <div class="hover-card">
    <div class="hover-card__top">
      <span class="hover-card__num">03</span>
      <span class="hover-card__icon">◎</span>
    </div>
    <h3 class="hover-card__title">Animation</h3>
    <p class="hover-card__text">
      Fluid motion design that elevates every interaction.
    </p>
    <a class="hover-card__link" href="#">Explore →</a>
  </div>
</div>`,
    css: `.hover-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 640px;
}
.hover-card {
  position: relative;
  padding: 2rem 1.5rem;
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: transform 0.4s, border-color 0.4s, background 0.4s;
  overflow: hidden;
}
.hover-card::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background: #FF3B30;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s;
}
.hover-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255,59,48,0.25);
  background: #111;
}
.hover-card:hover::before { transform: scaleX(1); }
.hover-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.hover-card__num {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #FF3B30;
  font-weight: 700;
}
.hover-card__icon {
  font-size: 1.25rem;
  color: #333;
  transition: color 0.4s;
}
.hover-card:hover .hover-card__icon { color: #FF3B30; }
.hover-card__title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0.75rem;
}
.hover-card__text {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  transition: color 0.4s;
}
.hover-card:hover .hover-card__text { color: #888; }
.hover-card__link {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #444;
  text-decoration: none;
  transition: color 0.3s, letter-spacing 0.3s;
}
.hover-card:hover .hover-card__link {
  color: #FF3B30;
  letter-spacing: 0.2em;
}`,
    js: `// Stagger entrance animation on scroll
const cards = document.querySelectorAll('.hover-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(card);
});`,
  },
  {
    id: "3d-cards",
    name: "3D Cards",
    description: "CSS perspective 3D cards that tilt realistically with mouse movement and a gloss reflection.",
    html: `<div class="scene-3d">
  <div class="card-3d" id="card3d">
    <div class="card-3d__inner">
      <div class="card-3d__gloss"></div>
      <div class="card-3d__content">
        <span class="card-3d__tag">Featured Project</span>
        <h3 class="card-3d__title">Weather App</h3>
        <p class="card-3d__desc">
          Real-time weather with dynamic backgrounds.
          Built with HTML, CSS & OpenWeather API.
        </p>
        <div class="card-3d__tech">
          <span>HTML</span><span>CSS</span>
          <span>JavaScript</span><span>API</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    css: `.scene-3d {
  perspective: 800px;
  width: 280px;
  height: 340px;
}
.card-3d {
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease;
  cursor: pointer;
}
.card-3d__inner {
  position: relative;
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #111, #0a0a0a);
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  transform-style: preserve-3d;
}
.card-3d__inner::before {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border: 1px solid transparent;
  transition: border-color 0.3s;
}
.card-3d:hover .card-3d__inner::before {
  border-color: rgba(255,59,48,0.3);
}
.card-3d__gloss {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(255,255,255,0.05) 0%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 2;
}
.card-3d__content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 1.5rem;
  z-index: 3;
}
.card-3d__tag {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF3B30;
  margin-bottom: 0.75rem;
}
.card-3d__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.card-3d__desc {
  font-size: 0.78rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 1rem;
}
.card-3d__tech {
  display: flex; gap: 0.4rem; flex-wrap: wrap;
}
.card-3d__tech span {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(255,255,255,0.08);
}`,
    js: `const card = document.getElementById('card3d');
const gloss = card?.querySelector('.card-3d__gloss');

card?.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const rotX = ((y - cy) / cy) * -15;
  const rotY = ((x - cx) / cx) * 15;

  card.style.transform =
    \`rotateX(\${rotX}deg) rotateY(\${rotY}deg)\`;

  // Update gloss position
  const mx = (x / rect.width) * 100;
  const my = (y / rect.height) * 100;
  gloss?.style.setProperty('--mx', \`\${mx}%\`);
  gloss?.style.setProperty('--my', \`\${my}%\`);
});

card?.addEventListener('mouseleave', () => {
  card.style.transform = '';
  card.style.transition = 'transform 0.5s ease';
  setTimeout(() => {
    card.style.transition = 'transform 0.1s ease';
  }, 500);
});`,
  },
];
