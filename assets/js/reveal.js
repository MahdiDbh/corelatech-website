/* ==========================================================================
   Scroll Reveal + Count-Up Animations (Intersection Observer)
   ========================================================================== */

/* Fade-in on scroll */
(function initReveal() {
  var elements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* Animated number count-up */
(function initCountUp() {
  var counters = document.querySelectorAll('.count-up');
  var animated = new Set();
  var DURATION = 1800;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || animated.has(entry.target)) return;

      animated.add(entry.target);
      var target = parseInt(entry.target.getAttribute('data-target'), 10);
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / DURATION, 1);
        var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        entry.target.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          entry.target.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();
