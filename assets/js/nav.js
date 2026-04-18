/* ==========================================================================
   Navigation — Sticky header + Mobile hamburger menu
   ========================================================================== */

(function initNav() {
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var mobileLinks = mobileNav.querySelectorAll('.mobile-link');

  /* Sticky background on scroll */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  /* Toggle mobile overlay */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  /* Close overlay on link click */
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
