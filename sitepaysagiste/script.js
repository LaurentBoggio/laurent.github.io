// Défilement fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Fermer le menu mobile après clic
      const navLinks = document.querySelector('.nav-links');
      if (navLinks?.classList.contains('open')) navLinks.classList.remove('open');
    }
  });
});

// Menu mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinksEl?.classList.toggle('open');
});

// Filtrage de galerie
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.display = match ? '' : 'none';
    });
  });
});

// Lightbox (agrandissement image)
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.closest('figure').querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose?.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

// Validation simple du formulaire
const form = document.getElementById('contactForm');
const statusEl = document.querySelector('.form-status');

function showError(name, message) {
  const err = document.querySelector(`.error[data-error-for="${name}"]`);
  if (err) err.textContent = message || '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  showError('name', '');
  showError('email', '');
  showError('message', '');
  statusEl.textContent = '';

  const data = Object.fromEntries(new FormData(form));

  let valid = true;
  if (!data.name || data.name.trim().length < 2) {
    showError('name', 'Merci d’indiquer votre nom.');
    valid = false;
  }
  if (!validateEmail(data.email)) {
    showError('email', 'Email invalide.');
    valid = false;
  }
  if (!data.message || data.message.trim().length < 10) {
    showError('message', 'Merci de détailler votre projet (10 caractères min.).');
    valid = false;
  }

  if (!valid) return;

  // Simulation d’envoi (remplacer par un fetch vers votre backend / service email)
  statusEl.textContent = 'Envoi en cours…';
  try {
    await new Promise((res) => setTimeout(res, 800));
    statusEl.textContent = 'Merci ! Votre message a bien été envoyé.';
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Une erreur est survenue. Réessayez plus tard.';
  }
});
