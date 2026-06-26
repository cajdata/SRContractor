/* ============================================================
   SR Contractor LLC — main.js
   Mobile nav, smooth-close on click, footer year, and an
   AJAX contact form that emails Santiago via Web3Forms.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  if (toggle && nav && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close after tapping a link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var keyField = form.querySelector('input[name="access_key"]');
      var key = keyField ? keyField.value.trim() : "";

      // Not configured yet: don't fail silently — tell the visitor how to reach us.
      if (!key || key === "YOUR_WEB3FORMS_ACCESS_KEY") {
        setStatus(
          "Our online form isn't quite finished — please call or text (720) 672-2730 and we'll get right back to you. ¡Gracias!",
          "err"
        );
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("", "");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            setStatus("Thanks! Your request was sent. We'll be in touch soon.", "ok");
          } else {
            setStatus(
              "Sorry — something went wrong. Please call or text (720) 672-2730.",
              "err"
            );
          }
        })
        .catch(function () {
          setStatus(
            "Sorry — something went wrong. Please call or text (720) 672-2730.",
            "err"
          );
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  }
})();
