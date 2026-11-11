// Cambia aquí el texto de la carta si quieres personalizarlo.
// El mensaje principal también puede editarse directamente en index.html.

const loadingScreen = document.getElementById('loadingScreen');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const progressContainer = document.getElementById('progressContainer');
const experience = document.getElementById('experience');
const envelopeButton = document.getElementById('envelopeButton');
const actionPrompt = document.getElementById('actionPrompt');
const letter = document.getElementById('letter');
const replayButton = document.getElementById('replayButton');
const memoriesButton = document.getElementById('memoriesButton');
const heartsLayer = document.getElementById('heartsLayer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let isOpening = false;

// Simula una carga suave que va del 0 al 100 %.
function startLoading() {
  const duration = prefersReducedMotion ? 250 : 3100;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 2.2);
    const percentage = Math.min(100, Math.floor(eased * 100));

    progressFill.style.width = `${percentage}%`;
    progressPercent.textContent = `${percentage}%`;
    progressContainer.setAttribute('aria-valuenow', String(percentage));

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      progressFill.style.width = '100%';
      progressPercent.textContent = '100%';
      progressContainer.setAttribute('aria-valuenow', '100');
      setTimeout(showExperience, prefersReducedMotion ? 80 : 450);
    }
  }

  requestAnimationFrame(update);
}

function showExperience() {
  loadingScreen.classList.add('is-leaving');
  setTimeout(() => {
    loadingScreen.hidden = true;
    experience.hidden = false;
    requestAnimationFrame(() => experience.classList.add('is-visible'));
    makeFloatingHearts();
  }, prefersReducedMotion ? 0 : 550);
}

function makeFloatingHearts() {
  if (prefersReducedMotion) return;
  for (let i = 0; i < 13; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = i % 3 === 0 ? '♡' : '♥';
    heart.style.setProperty('--heart-x', `${5 + Math.random() * 90}%`);
    heart.style.setProperty('--heart-size', `${10 + Math.random() * 16}px`);
    heart.style.setProperty('--heart-duration', `${8 + Math.random() * 7}s`);
    heart.style.setProperty('--heart-delay', `${-Math.random() * 16}s`);
    heart.style.setProperty('--heart-drift', `${Math.random() * 125 - 62}px`);
    heartsLayer.appendChild(heart);
  }
}

function burstHearts() {
  if (prefersReducedMotion) return;
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = i % 2 === 0 ? '♥' : '♡';
    const angle = (Math.PI * 2 * i) / 18;
    const distance = 110 + Math.random() * 185;
    heart.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
    heart.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
    heart.style.setProperty('--burst-size', `${15 + Math.random() * 16}px`);
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}

function openLetter() {
  if (isOpening) return;
  isOpening = true;
  envelopeButton.classList.add('is-open');
  actionPrompt.classList.add('is-fading');

  setTimeout(() => {
    envelopeButton.classList.add('is-tucked');
    letter.classList.add('is-visible');
    replayButton.hidden = false;
    memoriesButton.hidden = false;
    burstHearts();
  }, prefersReducedMotion ? 0 : 850);
}

function replayLetter() {
  if (!isOpening) return;
  letter.classList.remove('is-visible');
  replayButton.hidden = true;
  memoriesButton.hidden = true;
  envelopeButton.classList.remove('is-tucked', 'is-open');
  actionPrompt.classList.remove('is-fading');
  isOpening = false;
}

envelopeButton.addEventListener('click', openLetter);
replayButton.addEventListener('click', replayLetter);
startLoading();


// ═══════════════════════════════════════════════════════════════════════
// ÁLBUM DE RECUERDOS: cada foto se busca dentro de la carpeta "images".
// Para agregar otra foto después, copia su archivo dentro de images y
// añade otra línea con { file: "nombre-exacto.jpg", title: "..." }.
// GitHub Pages no puede enumerar por sí solo todos los archivos de una carpeta.
// ═══════════════════════════════════════════════════════════════════════
const recuerdos = [
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM.jpeg', title: 'Gracias ♡' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM (1).jpeg', title: 'Por' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM (2).jpeg', title: 'Siempre' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM (3).jpeg', title: 'Hacerme' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM (4).jpeg', title: 'Sentir' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.14 PM (5).jpeg', title: 'Tan' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.15 PM.jpeg', title: 'Bien' },
  { file: 'WhatsApp Image 2026-11-11 at 3.09.15 PM (1).jpeg', title: 'Contigo ♡' }
];

const memoriesOverlay = document.getElementById('memoriesOverlay');
const memoriesGrid = document.getElementById('memoriesGrid');
const memoriesClose = document.getElementById('memoriesClose');
const photoViewer = document.getElementById('photoViewer');
const viewerImage = document.getElementById('viewerImage');
const viewerTitle = document.getElementById('viewerTitle');
const viewerCount = document.getElementById('viewerCount');
const viewerClose = document.getElementById('viewerClose');
const viewerPrev = document.getElementById('viewerPrev');
const viewerNext = document.getElementById('viewerNext');
let currentPhoto = 0;
let previousPhotoButton = null;

function buildAlbum() {
  recuerdos.forEach((recuerdo, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'memory-card';
    card.setAttribute('aria-label', `Ampliar foto ${index + 1}: ${recuerdo.title}`);
    card.style.setProperty('--card-order', String(index));

    const photoBox = document.createElement('span');
    photoBox.className = 'memory-photo';

    const img = document.createElement('img');
    img.src = `./images/${recuerdo.file}`;
    img.alt = recuerdo.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      card.classList.add('is-missing');
      img.alt = `No se pudo cargar la foto: ${recuerdo.file}`;
    });

    const number = document.createElement('span');
    number.className = 'memory-number';
    number.textContent = String(index + 1).padStart(2, '0');

    const caption = document.createElement('span');
    caption.className = 'memory-caption';
    caption.textContent = recuerdo.title;

    photoBox.append(img, number);
    card.append(photoBox, caption);
    card.addEventListener('click', () => showPhoto(index, card));
    memoriesGrid.appendChild(card);
  });
}

function openAlbum() {
  memoriesOverlay.hidden = false;
  memoriesOverlay.scrollTop = 0;
  document.body.classList.add('modal-open');
  memoriesClose.focus();
}

function closeAlbum() {
  closePhoto();
  memoriesOverlay.hidden = true;
  document.body.classList.remove('modal-open');
  memoriesButton.focus();
}

function renderPhoto(index) {
  currentPhoto = (index + recuerdos.length) % recuerdos.length;
  const recuerdo = recuerdos[currentPhoto];
  viewerImage.src = `./images/${recuerdo.file}`;
  viewerImage.alt = recuerdo.title;
  viewerTitle.textContent = recuerdo.title;
  viewerCount.textContent = `${currentPhoto + 1} / ${recuerdos.length}`;
}

function showPhoto(index, card) {
  previousPhotoButton = card;
  renderPhoto(index);
  photoViewer.hidden = false;
  viewerClose.focus();
}

function closePhoto() {
  if (photoViewer.hidden) return;
  photoViewer.hidden = true;
  viewerImage.removeAttribute('src');
  if (previousPhotoButton) previousPhotoButton.focus();
}

memoriesButton.addEventListener('click', openAlbum);
memoriesClose.addEventListener('click', closeAlbum);
memoriesOverlay.addEventListener('click', (event) => {
  if (event.target === memoriesOverlay) closeAlbum();
});
viewerClose.addEventListener('click', closePhoto);
viewerPrev.addEventListener('click', () => renderPhoto(currentPhoto - 1));
viewerNext.addEventListener('click', () => renderPhoto(currentPhoto + 1));
photoViewer.addEventListener('click', (event) => {
  if (event.target === photoViewer) closePhoto();
});

document.addEventListener('keydown', (event) => {
  if (!photoViewer.hidden) {
    if (event.key === 'Escape') closePhoto();
    if (event.key === 'ArrowRight') renderPhoto(currentPhoto + 1);
    if (event.key === 'ArrowLeft') renderPhoto(currentPhoto - 1);
  } else if (!memoriesOverlay.hidden && event.key === 'Escape') {
    closeAlbum();
  }
});

// En iPad/iPhone también se puede pasar las fotos deslizando el dedo.
let touchStartX = null;
photoViewer.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
photoViewer.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const difference = touchStartX - event.changedTouches[0].screenX;
  if (Math.abs(difference) > 50) renderPhoto(currentPhoto + (difference > 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

buildAlbum();
