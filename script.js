/* Kenneth Chinemerem — portfolio interactions.
   No dependencies. Everything degrades without JS. */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    const setState = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setState(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setState(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setState(false);
        toggle.focus();
      }
    });

    const desktop = window.matchMedia("(min-width: 861px)");
    const onChange = (event) => {
      if (event.matches) setState(false);
    };

    if (desktop.addEventListener) {
      desktop.addEventListener("change", onChange);
    } else {
      desktop.addListener(onChange);
    }
  }

  /* ------------------------------------------------------------------------
     Subtle reveal on scroll. Skipped for reduced motion or missing support.
     ------------------------------------------------------------------------ */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".section-head, .card, .case-head, .cred-list");
    if (targets.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      const revealAll = () => {
        targets.forEach((el) => el.classList.add("is-visible"));
      };

      window.requestAnimationFrame(() => {
        document.documentElement.classList.add("js");
        targets.forEach((el) => {
          el.classList.add("reveal");
          observer.observe(el);
        });
      });

      // Safety net: never leave content hidden if the observer or a paint fails.
      window.setTimeout(revealAll, 2500);
      window.addEventListener("beforeprint", revealAll);
    }
  }
})();
