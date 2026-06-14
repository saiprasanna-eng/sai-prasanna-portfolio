/* =========================================================
   Sai Prasanna Chintakayala — Portfolio interactions
   - Sticky nav state + mobile menu
   - Scroll-reveal (IntersectionObserver)
   - Active section tracking (scrollspy)
   - Animated cloud infrastructure topology (hero canvas)
   All motion respects prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function closeMenu() {
    if (!toggle || !links) return;
    toggle.classList.remove("is-open");
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el, i) {
      // small stagger for elements that share a parent grid
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + "ms";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Scrollspy (active nav link) ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = links ? Array.prototype.slice.call(links.querySelectorAll("a")) : [];
  if ("IntersectionObserver" in window && navAnchors.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* =========================================================
     HERO TOPOLOGY — animated cloud resource graph
     Nodes represent cloud resources; links pulse between them.
     ========================================================= */
  var canvas = document.getElementById("topology");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;
  var nodes = [];
  var labels = ["VNet", "AKS", "Key Vault", "APIM", "Functions", "SQL", "Storage", "Monitor", "App GW", "Fabric"];

  function resize() {
    var rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function buildNodes() {
    nodes = [];
    // density scales with viewport, capped for performance
    var count = Math.max(7, Math.min(14, Math.round(w / 110)));
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 2 + Math.random() * 2,
        label: i < labels.length ? labels[i] : "",
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  var LINK_DIST = 190;

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    // move + bounce
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    // links
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          var base = (1 - dist / LINK_DIST);
          // travelling pulse along the link
          var pulse = 0.5 + 0.5 * Math.sin(t * 0.0016 + (a + b));
          var alpha = base * (0.10 + 0.14 * pulse);
          ctx.strokeStyle = "rgba(45, 212, 222," + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }

    // nodes + labels
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    for (var k = 0; k < nodes.length; k++) {
      var node = nodes[k];
      var glow = 0.55 + 0.45 * Math.sin(t * 0.002 + node.phase);

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45, 212, 222," + (0.55 + 0.4 * glow).toFixed(3) + ")";
      ctx.fill();

      // soft halo
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(59, 130, 246," + (0.05 * glow).toFixed(3) + ")";
      ctx.fill();

      if (node.label) {
        ctx.fillStyle = "rgba(141, 162, 192, 0.45)";
        ctx.fillText(node.label, node.x, node.y - 12);
      }
    }
  }

  var raf = null;
  function loop(t) { draw(t); raf = requestAnimationFrame(loop); }

  function start() {
    resize();
    buildNodes();
    if (reduceMotion) {
      draw(0); // single static frame
    } else if (!raf) {
      raf = requestAnimationFrame(loop);
    }
  }

  // Pause the animation when the hero is offscreen (saves battery/CPU)
  if ("IntersectionObserver" in window && !reduceMotion) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(loop);
        } else if (raf) {
          cancelAnimationFrame(raf); raf = null;
        }
      });
    }, { threshold: 0 });
    heroObserver.observe(canvas);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); buildNodes(); if (reduceMotion) draw(0); }, 180);
  });

  start();
})();
