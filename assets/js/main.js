/* ============================================
   YELLO TECH — DESIGN SYSTEM JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === GSAP SCROLL REVEAL ===
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal sections
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Stagger cards
    gsap.utils.toArray('.stagger-group').forEach(group => {
      const cards = group.querySelectorAll('.card, .swatch, .dash-pose-card, .type-specimen');
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Hero animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
      .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.hero-dash', { opacity: 0, x: 40, duration: 0.9 }, '-=0.8');

    // Parallax Dash
    const dashEl = document.querySelector('.hero-dash img');
    if (dashEl) {
      gsap.to(dashEl, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Section labels
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }

  // === COPY HEX ON SWATCH CLICK ===
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.querySelector('.swatch-hex')?.textContent;
      if (!hex) return;
      navigator.clipboard.writeText(hex).then(() => {
        const tip = swatch.querySelector('.copy-tip');
        if (tip) {
          tip.textContent = 'Copiado!';
          tip.style.opacity = '1';
          setTimeout(() => { tip.style.opacity = '0'; tip.textContent = 'Clique p/ copiar'; }, 1500);
        }
      });
    });
  });

  // === ANIMATION DEMOS ===
  const demos = document.querySelectorAll('.anim-demo');
  demos.forEach(demo => {
    const target = demo.querySelector('.anim-target');
    if (!target) return;
    const type = demo.dataset.anim;

    demo.addEventListener('click', () => {
      if (typeof gsap === 'undefined') return;

      if (type === 'fade') {
        gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
      } else if (type === 'slide') {
        gsap.fromTo(target, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      } else if (type === 'scale') {
        gsap.fromTo(target, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
      } else if (type === 'stagger') {
        const chars = target.textContent.split('');
        target.innerHTML = chars.map(c => `<span style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
        gsap.fromTo(target.querySelectorAll('span'), 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  });

  // === SMOOTH NAV ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // === ACTIVE NAV LINK ===
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}` 
            ? 'var(--accent)' 
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

});
