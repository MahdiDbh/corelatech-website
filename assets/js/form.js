/* ==========================================================================
   Contact Form — EmailJS integration
   ========================================================================== */

(function initForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var submitBtn = form.querySelector('.form-submit');
  var originalText = submitBtn.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    var now = new Date();
    var templateParams = {
      name:    document.getElementById('name').value,
      email:   document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      time:    now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    emailjs.send('service_j9np4ee', 'template_3bstz6k', templateParams)
      .then(function () {
        submitBtn.textContent = 'Message envoyé !';
        submitBtn.style.background = 'rgba(0, 212, 170, 0.2)';
        submitBtn.style.color = '#00d4aa';

        setTimeout(function () {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch(function () {
        submitBtn.textContent = 'Erreur — réessayez';
        submitBtn.style.background = 'rgba(255, 80, 80, 0.2)';
        submitBtn.style.color = '#ff5050';
        submitBtn.disabled = false;

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      });
  });
})();
