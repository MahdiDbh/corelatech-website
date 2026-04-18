/* ==========================================================================
   Hero Canvas — Interactive Animated Grid
   Draws a teal grid that reacts to mouse proximity.
   ========================================================================== */

(function initHeroCanvas() {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var width, height, cols, rows;
  var CELL = 60;
  var mouse = { x: -1000, y: -1000 };

  function resize() {
    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    cols = Math.ceil(width  / CELL) + 1;
    rows = Math.ceil(height / CELL) + 1;
  }

  window.addEventListener('resize', resize);
  resize();

  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    /* Vertical lines */
    for (var i = 0; i <= cols; i++) {
      var x = i * CELL;
      var dist = Math.abs(mouse.x - x);
      var proximity = Math.max(0, 1 - dist / 200);
      var alpha = 0.03 + proximity * 0.08;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = 'rgba(0, 212, 170, ' + alpha + ')';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    /* Horizontal lines */
    for (var j = 0; j <= rows; j++) {
      var y = j * CELL;
      var dist = Math.abs(mouse.y - y);
      var proximity = Math.max(0, 1 - dist / 200);
      var alpha = 0.03 + proximity * 0.08;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = 'rgba(0, 212, 170, ' + alpha + ')';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    /* Intersection dots */
    for (var i = 0; i <= cols; i++) {
      for (var j = 0; j <= rows; j++) {
        var x = i * CELL;
        var y = j * CELL;
        var dx = mouse.x - x;
        var dy = mouse.y - y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var proximity = Math.max(0, 1 - dist / 180);

        var pulse = Math.sin(time * 0.001 + i * 0.5 + j * 0.3) * 0.5 + 0.5;
        var baseAlpha = 0.04 + pulse * 0.03;
        var alpha = baseAlpha + proximity * 0.4;
        var radius = 1 + proximity * 2.5;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, ' + alpha + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
