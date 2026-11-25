/* =========================================================
   Arohi Cloth House – JavaScript (vanilla, no libraries
   except Bootstrap's own JS for the navbar and modal)
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 0. Settings (edit here if the number changes) ---------- */
  var SHOP_NAME = "Arohi Cloth House";
  var WHATSAPP_NUMBER = "919404832399"; // country code + number, no "+" or spaces
  var WHATSAPP_BASE = "https://wa.me/" + WHATSAPP_NUMBER;

  /** Build a WhatsApp link with a ready-typed message. */
  function whatsappLink(text) {
    return WHATSAPP_BASE + "?text=" + encodeURIComponent(text);
  }

  /** Small helper to run code once the page is ready. */
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var navbar = document.querySelector(".site-navbar");

    /* ---------- 1. WhatsApp links ----------
       Any element with data-wa-text gets a wa.me link with that message.
       Without JavaScript the plain wa.me link in the HTML still works. */
    document.querySelectorAll("[data-wa-text]").forEach(function (el) {
      el.setAttribute("href", whatsappLink(el.getAttribute("data-wa-text")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    /* ---------- 2. Smooth scrolling + closing the mobile menu ----------
       CSS (scroll-behavior + scroll-padding-top) handles the smooth scroll and
       the sticky-navbar offset. JS closes the hamburger menu after a tap. */
    var navCollapseEl = document.getElementById("mainNav");
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) { return; }               // ignore plain "#" (gallery links)
        var target = document.querySelector(id);
        if (!target) { return; }
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);

        // Close the mobile menu if it is open
        if (navCollapseEl && navCollapseEl.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
        }
      });
    });

    /* ---------- 3. Navbar shadow, active link, back-to-top ---------- */
    var navLinks = document.querySelectorAll(".site-navbar .nav-link");
    var sections = [];
    navLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) { sections.push({ link: link, el: section }); }
    });
    var backToTop = document.getElementById("backToTop");
    var ticking = false;

    function updateOnScroll() {
      var y = window.scrollY || window.pageYOffset;

      // Shadow under the navbar once the page is scrolled
      navbar.classList.toggle("scrolled", y > 10);

      // Show the back-to-top button after scrolling down a bit
      backToTop.classList.toggle("show", y > 500);

      // Highlight the nav link of the section currently in view
      var marker = y + navbar.offsetHeight + 120;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.el.offsetTop <= marker) { current = s; }
      });
      // "Location" has no nav link of its own: keep Contact Us active there
      sections.forEach(function (s) {
        var active = s === current;
        s.link.classList.toggle("active", active);
        if (active) { s.link.setAttribute("aria-current", "true"); }
        else { s.link.removeAttribute("aria-current"); }
      });
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", updateOnScroll);
    updateOnScroll();

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---------- 4. Collection filter ---------- */
    var filterButtons = document.querySelectorAll(".filter-btn");
    var collectionItems = document.querySelectorAll(".collection-item");

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        collectionItems.forEach(function (item) {
          var show = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !show);
          item.classList.remove("is-visible");
          if (show) {
            // Force a reflow so the fade-in animation can replay
            void item.offsetWidth;
            item.classList.add("is-visible");
          }
        });
      });
    });

    /* ---------- 5. Gallery lightbox (Bootstrap modal) ---------- */
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxEl = document.getElementById("lightboxModal");
    var currentIndex = 0;

    function showImage(index) {
      var total = galleryItems.length;
      currentIndex = (index + total) % total;           // wrap around
      var item = galleryItems[currentIndex];
      lightboxImg.src = item.getAttribute("data-full");
      lightboxImg.alt = item.querySelector("img").alt;
      lightboxCaption.textContent = item.getAttribute("data-caption") || "";
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        showImage(index);
      });
    });

    document.getElementById("lightboxPrev").addEventListener("click", function () { showImage(currentIndex - 1); });
    document.getElementById("lightboxNext").addEventListener("click", function () { showImage(currentIndex + 1); });

    // Arrow keys move through the gallery while the lightbox is open
    document.addEventListener("keydown", function (e) {
      if (!lightboxEl.classList.contains("show")) { return; }
      if (e.key === "ArrowLeft") { showImage(currentIndex - 1); }
      if (e.key === "ArrowRight") { showImage(currentIndex + 1); }
    });

    // Clear the image when the modal closes so the next open starts fresh
    lightboxEl.addEventListener("hidden.bs.modal", function () {
      lightboxImg.removeAttribute("src");
    });

    /* ---------- 6. Contact form: validation + WhatsApp message ---------- */
    var form = document.getElementById("contactForm");
    var statusEl = document.getElementById("formStatus");
    var nameInput = document.getElementById("custName");
    var mobileInput = document.getElementById("custMobile");
    var messageInput = document.getElementById("custMessage");

    /** Strip spaces, dashes, "+91", "91" and a leading 0 to get the 10 digits. */
    function cleanMobile(value) {
      var digits = value.replace(/[^\d]/g, "");
      if (digits.length === 12 && digits.indexOf("91") === 0) { digits = digits.slice(2); }
      if (digits.length === 11 && digits.charAt(0) === "0") { digits = digits.slice(1); }
      return digits;
    }

    /** Mark a field valid / invalid (Bootstrap classes). */
    function setValidity(input, ok) {
      input.classList.toggle("is-invalid", !ok);
      input.classList.toggle("is-valid", ok);
      return ok;
    }

    function validateName() { return setValidity(nameInput, nameInput.value.trim().length >= 2); }
    function validateMobile() { return setValidity(mobileInput, /^[6-9]\d{9}$/.test(cleanMobile(mobileInput.value))); }
    function validateMessage() { return setValidity(messageInput, messageInput.value.trim().length >= 5); }

    // Re-check a field while the person fixes it
    nameInput.addEventListener("input", function () { if (nameInput.classList.contains("is-invalid")) { validateName(); } });
    mobileInput.addEventListener("input", function () { if (mobileInput.classList.contains("is-invalid")) { validateMobile(); } });
    messageInput.addEventListener("input", function () { if (messageInput.classList.contains("is-invalid")) { validateMessage(); } });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.className = "form-note mt-2 mb-0";
      statusEl.textContent = "";

      // Run all checks (no short-circuit, so every field shows its state)
      var results = [validateName(), validateMobile(), validateMessage()];
      if (results.indexOf(false) !== -1) {
        statusEl.textContent = "Please correct the highlighted fields.";
        var firstBad = form.querySelector(".is-invalid");
        if (firstBad) { firstBad.focus(); }
        return;
      }

      // Build the WhatsApp message
      var text =
        "Hello " + SHOP_NAME + ",\n\n" +
        "My name is " + nameInput.value.trim() + ".\n" +
        "My mobile number is " + cleanMobile(mobileInput.value) + ".\n\n" +
        "Message: " + messageInput.value.trim();

      var url = whatsappLink(text);
      var win = window.open(url, "_blank", "noopener");
      if (!win) { window.location.href = url; }          // pop-up blocked: open in this tab

      statusEl.classList.add("success");
      statusEl.textContent = "Opening WhatsApp… please press Send there to deliver your message.";
      form.reset();
      [nameInput, mobileInput, messageInput].forEach(function (el) { el.classList.remove("is-valid", "is-invalid"); });
    });

    /* ---------- 7. Footer year ---------- */
    var yearEl = document.getElementById("currentYear");
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
  });
})();
