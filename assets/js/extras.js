/* ==========================================================================
   Extras — Scroll progress, Back-to-top, Active nav, Typing effect
   ========================================================================== */

/* --------------------------------------------------------------------------
   Scroll Progress Bar
   -------------------------------------------------------------------------- */
(function initScrollProgress() {
  var bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
})();

/* --------------------------------------------------------------------------
   Back to Top Button
   -------------------------------------------------------------------------- */
(function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* --------------------------------------------------------------------------
   Active Nav Link Tracking
   -------------------------------------------------------------------------- */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(function (section) { observer.observe(section); });
})();

/* --------------------------------------------------------------------------
   Hero Typing Effect — Cycles through accent phrases
   -------------------------------------------------------------------------- */
(function initTypingEffect() {
  var el = document.getElementById('typedText');
  if (!el) return;

  var phrases = [
    'confiance numérique.',
    'performance digitale.',
    'sécurité absolue.',
    'innovation constante.'
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var TYPING_SPEED = 70;
  var DELETING_SPEED = 40;
  var PAUSE_AFTER_TYPE = 2200;
  var PAUSE_AFTER_DELETE = 400;

  function type() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
    }

    var delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_AFTER_TYPE;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_AFTER_DELETE;
    }

    setTimeout(type, delay);
  }

  /* Start after preloader finishes */
  setTimeout(type, 2000);
})();
