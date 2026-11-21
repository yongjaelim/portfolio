const contactLink = document.querySelector('.nav-contact');
const contactPhoto = document.querySelector('.contact-photo');

contactLink.addEventListener('click', () => {
  contactPhoto.hidden = false;
});

const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = navLinks.map(link => document.querySelector(link.hash));

const updateNavigation = () => {
  const readingLine = Math.min(window.innerHeight * 0.36, 270);
  const active = sections.findLast(section => section.getBoundingClientRect().top <= readingLine);
  navLinks.forEach(link => {
    if (link.hash === (active && '#' + active.id)) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

let pendingFrame = 0;
const queueNavigationUpdate = () => {
  if (pendingFrame) return;
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = 0;
    updateNavigation();
  });
};

window.addEventListener('scroll', queueNavigationUpdate, { passive: true });
window.addEventListener('resize', queueNavigationUpdate);
updateNavigation();
