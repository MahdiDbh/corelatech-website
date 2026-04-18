/* ==========================================================================
   Preloader — Branded loading screen with progress bar
   ========================================================================== */

(function initPreloader() {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('done');
    }, 1600);
  });
})();
