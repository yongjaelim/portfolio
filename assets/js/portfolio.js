// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const expanded = navLinks.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', String(expanded));
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Active nav link — click + scroll hybrid
const sections = document.querySelectorAll('section[id]');
let scrollTimer = null;
let clickedLink = false;

// 클릭 시 즉시 active 처리
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    clickedLink = true;
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { clickedLink = false; }, 800);

    // Easter egg: Contact 클릭 시 이미지 표시, 다른 탭 클릭 시 숨김
    const egg = document.querySelector('.easter-egg');
    if (link.getAttribute('href') === '#contact' && egg) {
      setTimeout(() => {
        egg.classList.add('visible');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 300);
    } else if (egg) {
      egg.classList.remove('visible');
    }
  });
});

// 스크롤 시 active 감지 (클릭 직후엔 무시)
window.addEventListener('scroll', () => {
  if (clickedLink) return;

  const scrollY = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // 스크롤 올리면 이스터에그 숨김 (Contact 섹션 벗어났을 때만)
  const egg = document.querySelector('.easter-egg');
  const contactSection = document.getElementById('contact');
  if (egg && contactSection) {
    const contactTop = contactSection.offsetTop - 200;
    if (scrollY < contactTop) {
      egg.classList.remove('visible');
    }
  }

  if (scrollY + windowHeight >= docHeight - 10) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const lastSection = sections[sections.length - 1];
    const link = document.querySelector('.nav-links a[href="#' + lastSection.id + '"]');
    if (link) link.classList.add('active');
    return;
  }

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});
