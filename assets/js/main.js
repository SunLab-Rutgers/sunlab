const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });
}

const slideshow = document.querySelector(".hero-slideshow");

if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll(".hero-slide"));
  const dots = Array.from(slideshow.querySelectorAll(".hero-slide-controls button"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let timerId;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let dragging = false;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle("is-active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const start = () => {
    if (!reduceMotion && slides.length > 1 && !timerId) {
      timerId = window.setInterval(() => showSlide(activeIndex + 1), 3000);
    }
  };

  const stop = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = undefined;
    }
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stop();
      showSlide(index);
      start();
    });
  });

  slideshow.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".hero-slide-controls")) {
      return;
    }

    dragging = true;
    dragStartX = event.clientX;
    dragDeltaX = 0;
    slideshow.classList.add("is-dragging");
    slideshow.setPointerCapture(event.pointerId);
    stop();
  });

  slideshow.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }

    dragDeltaX = event.clientX - dragStartX;
  });

  const finishDrag = (event) => {
    if (!dragging) {
      return;
    }

    dragging = false;
    slideshow.classList.remove("is-dragging");

    if (slideshow.hasPointerCapture(event.pointerId)) {
      slideshow.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(dragDeltaX) > 48) {
      showSlide(activeIndex + (dragDeltaX < 0 ? 1 : -1));
    }

    start();
  };

  slideshow.addEventListener("pointerup", finishDrag);
  slideshow.addEventListener("pointercancel", finishDrag);
  slideshow.addEventListener("mouseenter", stop);
  slideshow.addEventListener("mouseleave", start);
  slideshow.addEventListener("focusin", stop);
  slideshow.addEventListener("focusout", start);

  showSlide(0);
  start();
}
