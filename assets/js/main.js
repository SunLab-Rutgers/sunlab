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

const searchRoot = document.querySelector("[data-search-root]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
let searchIndex;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);

const renderSearchResults = (query) => {
  if (!searchResults) {
    return;
  }

  const normalizedQuery = query.trim().toLowerCase();
  searchResults.hidden = false;

  if (!normalizedQuery) {
    searchResults.innerHTML = '<p class="site-search-empty">Start typing to search.</p>';
    return;
  }

  if (!searchIndex) {
    searchResults.innerHTML = '<p class="site-search-empty">Loading search index...</p>';
    return;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const matches = searchIndex
    .map((item) => {
      const haystack = `${item.title} ${item.type} ${item.text}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 8);

  if (!matches.length) {
    searchResults.innerHTML = '<p class="site-search-empty">No results found.</p>';
    return;
  }

  searchResults.innerHTML = matches.map((item) => {
    const text = item.text.length > 150 ? `${item.text.slice(0, 150)}...` : item.text;
    return `
      <a class="site-search-result" href="${item.url}">
        <span>${escapeHtml(item.type)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(text)}</p>
      </a>
    `;
  }).join("");
};

const loadSearchIndex = async () => {
  if (searchIndex) {
    return;
  }

  const response = await fetch(searchInput.dataset.searchIndex);
  searchIndex = await response.json();
};

const updateSearch = async () => {
  if (!searchInput || !searchResults) {
    return;
  }

  try {
    await loadSearchIndex();
    renderSearchResults(searchInput.value);
  } catch {
    if (searchResults) {
      searchResults.innerHTML = '<p class="site-search-empty">Search is unavailable right now.</p>';
    }
  }
};

const closeSearch = () => {
  if (searchResults) {
    searchResults.hidden = true;
  }
};

if (searchRoot && searchInput && searchResults) {
  searchInput.addEventListener("focus", updateSearch);
  searchInput.addEventListener("input", updateSearch);
  searchResults.addEventListener("click", (event) => {
    if (event.target.closest(".site-search-result")) {
      closeSearch();
    }
  });
  document.addEventListener("click", (event) => {
    if (!searchRoot.contains(event.target)) {
      closeSearch();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !searchResults.hidden) {
      closeSearch();
      searchInput.blur();
    }
  });
}

const copyCode = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};

document.querySelectorAll(".wiki-doc-body pre").forEach((pre) => {
  const code = pre.querySelector("code");

  if (!code || pre.querySelector(".code-copy-button")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy-button";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy code");

  button.addEventListener("click", async () => {
    try {
      await copyCode(code.textContent.trimEnd());
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    } catch {
      button.textContent = "Failed";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    }
  });

  pre.classList.add("has-copy-button");
  pre.appendChild(button);
});
