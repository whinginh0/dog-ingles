/* -------------------------------------------------------------
   JAVASCRIPT BEHAVIORS & INTERACTIVITY
   100+ Illustrated Dog Grooming Techniques
   ------------------------------------------------------------- */
window.addEventListener("error", (event) => {
  console.warn("Script warning:", event.message, "at", event.filename, ":", event.lineno);
});

const initPage = () => {
  try {
    // --- CENTRAL CONFIGURATION ---
    const CONFIG = {
      headlinePrincipal: "100+ Illustrated <br><span class='hl-blue'>Dog Grooming Techniques</span>",
      subheadlineDeApoio: "Ready-to-reference visual techniques to help you understand and review essential dog grooming procedures through clear illustrations and easy-to-follow explanations.",
      nomeMaterialPrincipal: "100+ Illustrated Dog Grooming Techniques",
      mockupPrincipal: "https://i.ibb.co/LDykxLWH/image-capa-dog.png",
      capaBonus1: "https://i.ibb.co/hxyDwySR/image.png",
      capaBonus2: "https://i.ibb.co/7d5QT22V/image.png",
      capaBonus3: "https://i.ibb.co/CsvNTFnV/image.png",
      nomeDoBonus1: "Illustrated Dog Grooming Tool Guide",
      nomeDoBonus2: "Dog Grooming Coat Type Reference",
      nomeDoBonus3: "Dog Grooming Session Checklist",
      descricaoBreveDoBonus1: "A visual reference showing essential grooming tools, what they’re used for, and where they fit into the grooming process.",
      descricaoBreveDoBonus2: "An illustrated reference covering different coat types, with visual examples and grooming considerations for each one.",
      descricaoBreveDoBonus3: "A practical visual checklist covering the main steps to review before, during and after a grooming session.",
      valorBonus1: "CAD $19.90",
      valorBonus2: "CAD $14.90",
      valorBonus3: "CAD $14.90",
      valorTotalDosBonus: "CAD $49.70",
      precoDoPlanoBasico: "CAD $10.00",
      precoDoPlanoCompleto: "CAD $17.90",
      linkCheckoutBasico990: "https://pay.kiwify.com/A4HK79x",
      linkCheckoutPromocional1790: "https://pay.kiwify.com/gJrTAqJ",
      linkCheckoutPlanoCompleto: "https://pay.kiwify.com/gJrTAqJ",
      linkTermosDeUso: "#terms",
      linkPoliticaDePrivacidade: "#privacy",
      linkContato: "#contact",
      linkSuporte: "mailto:support@groomingtechniques.com"
    };

    // --- COUNTDOWN TIMER (PERSISTENT IN LOCALSTORAGE) ---
    const TIMER_SETTING = {
      isRelative: true,
      durationMinutes: 15
    };

    let endTime;
    if (TIMER_SETTING.isRelative) {
      const storageKey = "dog_grooming_offer_deadline";
      let storedDeadline;
      try {
        storedDeadline = localStorage.getItem(storageKey);
      } catch (e) {
        console.warn("Storage access blocked:", e);
      }

      const now = Date.now();
      if (!storedDeadline || parseInt(storedDeadline, 10) <= now) {
        storedDeadline = now + (TIMER_SETTING.durationMinutes * 60 * 1000);
        try {
          localStorage.setItem(storageKey, storedDeadline);
        } catch (e) {
          console.warn("Storage write blocked:", e);
        }
      }
      endTime = parseInt(storedDeadline, 10);
    } else {
      endTime = Date.now() + (15 * 60 * 1000);
    }

    let timerId;
    const runTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      const setTimerText = (h, m, s) => {
        const th = document.getElementById("timer-h");
        const tm = document.getElementById("timer-m");
        const ts = document.getElementById("timer-s");
        if (th) th.textContent = h;
        if (tm) tm.textContent = m;
        if (ts) ts.textContent = s;

        const ph = document.getElementById("plans-timer-h");
        const pm = document.getElementById("plans-timer-m");
        const ps = document.getElementById("plans-timer-s");
        if (ph) ph.textContent = h;
        if (pm) pm.textContent = m;
        if (ps) ps.textContent = s;
      };

      if (diff <= 0) {
        setTimerText("00", "00", "00");
        if (timerId) clearInterval(timerId);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimerText(
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
      );
    };

    runTimer();
    timerId = setInterval(runTimer, 1000);

    // --- DYNAMIC REPLACEMENT OF PLACEHOLDERS ---
    const replacePlaceholders = () => {
      document.querySelectorAll("a").forEach(a => {
        let href = a.getAttribute("href");
        if (href) {
          href = href.replace("[LINK_CHECKOUT_BASICO_9_90]", CONFIG.linkCheckoutBasico990)
            .replace("[LINK_CHECKOUT_PROMOCIONAL_17_90]", CONFIG.linkCheckoutPromocional1790)
            .replace("[LINK_CHECKOUT_PLANO_COMPLETO]", CONFIG.linkCheckoutPlanoCompleto)
            .replace("[LINK_TERMOS_DE_USO]", CONFIG.linkTermosDeUso)
            .replace("[LINK_POLITICA_DE_PRIVACIDADE]", CONFIG.linkPoliticaDePrivacidade)
            .replace("[LINK_CONTATO]", CONFIG.linkContato)
            .replace("[LINK_SUPORTE]", CONFIG.linkSuporte);
          a.setAttribute("href", href);
        }
      });

      const walkNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.nodeValue;
          if (text.includes("[") && text.includes("]")) {
            text = text.replace(/\[NOME_DO_MATERIAL_PRINCIPAL\]/g, CONFIG.nomeMaterialPrincipal)
              .replace(/\[NOME_DO_BONUS_1\]/g, CONFIG.nomeDoBonus1)
              .replace(/\[NOME_DO_BONUS_2\]/g, CONFIG.nomeDoBonus2)
              .replace(/\[NOME_DO_BONUS_3\]/g, CONFIG.nomeDoBonus3)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_1\]/g, CONFIG.descricaoBreveDoBonus1)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_2\]/g, CONFIG.descricaoBreveDoBonus2)
              .replace(/\[DESCRICAO_BREVE_DO_BONUS_3\]/g, CONFIG.descricaoBreveDoBonus3)
              .replace(/\[VALOR_BONUS_1\]/g, CONFIG.valorBonus1)
              .replace(/\[VALOR_BONUS_2\]/g, CONFIG.valorBonus2)
              .replace(/\[VALOR_BONUS_3\]/g, CONFIG.valorBonus3)
              .replace(/\[VALOR_TOTAL_DOS_BONUS\]/g, CONFIG.valorTotalDosBonus)
              .replace(/\[PRECO_DO_PLANO_BASICO\]/g, CONFIG.precoDoPlanoBasico)
              .replace(/\[PRECO_DO_PLANO_COMPLETO\]/g, CONFIG.precoDoPlanoCompleto);

            node.nodeValue = text;
          }
        } else {
          if (node.id !== "headline-p" && node.id !== "headline-s") {
            node.childNodes.forEach(walkNode);
          }
        }
      };

      const hl1 = document.querySelector(".hero-headline-1");
      if (hl1) hl1.innerHTML = CONFIG.headlinePrincipal;

      const hl2 = document.querySelector(".hero-headline-2");
      if (hl2) hl2.innerHTML = CONFIG.subheadlineDeApoio;

      walkNode(document.body);
    };

    // --- FORWARD UTM PARAMETERS TO CHECKOUT LINKS ---
    const passUtmParams = () => {
      try {
        const updateAllCheckoutLinks = () => {
          const currentQueryParams = window.location.search;
          if (!currentQueryParams) return;

          const urlParams = new URLSearchParams(currentQueryParams);

          document.querySelectorAll("a").forEach(a => {
            const href = a.getAttribute("href");
            if (href && (href.includes("pay.kiwify.com") || href.includes("kiwify") || href.startsWith("http://") || href.startsWith("https://"))) {
              try {
                const targetUrl = new URL(href);
                urlParams.forEach((value, key) => {
                  targetUrl.searchParams.set(key, value);
                });
                a.setAttribute("href", targetUrl.toString());
              } catch (err) {
                console.warn("Error parsing URL: ", href, err);
              }
            }
          });
        };

        updateAllCheckoutLinks();

        // Also dynamically inject UTMs at the moment the customer clicks any buy button
        document.addEventListener("click", (e) => {
          const anchor = e.target.closest("a");
          if (!anchor) return;

          let href = anchor.getAttribute("href");
          if (!href) return;

          if (href.includes("pay.kiwify.com") || href.includes("kiwify") || anchor.classList.contains("btn-verde") || anchor.classList.contains("btn-basic")) {
            const currentQueryParams = window.location.search;
            if (currentQueryParams) {
              try {
                const targetUrl = new URL(href, window.location.origin);
                const urlParams = new URLSearchParams(currentQueryParams);
                urlParams.forEach((value, key) => {
                  targetUrl.searchParams.set(key, value);
                });
                anchor.setAttribute("href", targetUrl.toString());
              } catch (err) {
                console.warn("Dynamic checkout link update warning:", err);
              }
            }
          }
        }, true);

      } catch (e) {
        console.error("Error passing UTM parameters:", e);
      }
    };

    replacePlaceholders();
    passUtmParams();

    // --- FALLBACK SVG GENERATOR FOR MISSING / ERROR IMAGES ---
    const drawSvgPlaceholders = () => {
      document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
          const label = img.getAttribute("alt") || "Dog Grooming Guide";
          const width = img.getAttribute("width") || 300;
          const height = img.getAttribute("height") || 200;

          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <rect width="100%" height="100%" fill="#002754" rx="12"/>
          <rect width="calc(100% - 8px)" height="calc(100% - 8px)" x="4" y="4" fill="none" stroke="#3EA0DC" stroke-width="1.5" stroke-dasharray="4,4" rx="8"/>
          <circle cx="${width/2}" cy="${height/2 - 16}" r="22" fill="#1369BE" opacity="0.3"/>
          <path d="M${width/2 - 8} ${height/2 - 16} l6 6 l10 -10" stroke="#3EA0DC" stroke-width="2.5" fill="none"/>
          <text x="50%" y="50%" dy="22" dominant-baseline="middle" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">${label}</text>
        </svg>`;
          img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
        });
      });
    };

    drawSvgPlaceholders();

    // --- FAQ ACCORDION ---
    const setupFaqAccordion = () => {
      const allFaqItems = document.querySelectorAll(".faq-item");
      allFaqItems.forEach((detail) => {
        detail.addEventListener("toggle", () => {
          if (detail.open) {
            allFaqItems.forEach((other) => {
              if (other !== detail && other.open) {
                other.removeAttribute("open");
              }
            });
          }
        });
      });
    };

    setupFaqAccordion();

    // --- AUTOMATIC FOOTER COPYRIGHT YEAR ---
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.12 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- FULLSCREEN IMAGE LIGHTBOX MODAL ---
    const setupLightbox = () => {
      const lightbox = document.getElementById("image-lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const closeBtn = document.getElementById("close-lightbox-btn");

      if (!lightbox || !lightboxImg) return;

      const openLightbox = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Dog Grooming Preview";
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (closeBtn) setTimeout(() => closeBtn.focus(), 80);
      };

      const closeLightbox = () => {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        setTimeout(() => {
          lightboxImg.src = "";
        }, 250);
      };

      // Click on any carousel or preview image
      document.querySelectorAll(".carousel-card-img, .hero-mockup-img, .plan-cover-img, .slider-card-img, .bonus-image-wrapper img").forEach(img => {
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          const fullSrc = img.getAttribute("src");
          const altText = img.getAttribute("alt");
          if (fullSrc) {
            openLightbox(fullSrc, altText);
          }
        });
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeLightbox();
        });
      }

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.id === "lightbox-container") {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
          closeLightbox();
        }
      });
    };

    setupLightbox();

    // --- INTERACTIVE BONUS PREVIEW SLIDER (10 HORIZONTAL CARDS) ---
    const setupInteractiveBonusSlider = () => {
      const slider = document.getElementById("bonus-slider");
      const track = document.getElementById("bonus-slider-track");
      const prevBtn = document.getElementById("slider-prev-btn");
      const nextBtn = document.getElementById("slider-next-btn");
      const dots = document.querySelectorAll("#bonus-slider-dots .slider-dot");
      const cards = document.querySelectorAll("#bonus-slider-track .slider-card");

      if (!slider || !track || cards.length === 0) return;

      let currentIndex = 0;
      const totalSlides = cards.length;

      const updateSlider = (index) => {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
          if (i === currentIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      };

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          updateSlider(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          updateSlider(currentIndex + 1);
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
          e.preventDefault();
          updateSlider(i);
        });
      });

      // Touch swipe gestures
      let touchStartX = 0;
      let touchEndX = 0;

      slider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            updateSlider(currentIndex + 1);
          } else {
            updateSlider(currentIndex - 1);
          }
        }
      }, { passive: true });
    };

    setupInteractiveBonusSlider();

    // --- DRAG / TOUCH FOR CAROUSELS ---
    const setupMarqueeDrag = (container) => {
      const track = container.querySelector(".marquee-track");
      if (!track) return;
      let isDown = false;
      let startX;
      let initialTransform = 0;
      let hasDragged = false;

      container.addEventListener("mousedown", (e) => {
        isDown = true;
        hasDragged = false;
        track.style.animationPlayState = "paused";
        startX = e.pageX;

        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        initialTransform = matrix.m41;
        container.style.cursor = "grabbing";
      });

      container.addEventListener("mouseleave", () => {
        if (isDown) {
          isDown = false;
          track.style.animationPlayState = "running";
          container.style.cursor = "grab";
        }
      });

      container.addEventListener("mouseup", () => {
        isDown = false;
        track.style.animationPlayState = "running";
        container.style.cursor = "grab";
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX;
        const walk = (x - startX);
        if (Math.abs(walk) > 6) {
          hasDragged = true;
          e.preventDefault();
          track.style.transform = `translate3d(${initialTransform + walk}px, 0, 0)`;
        }
      });
    };

    document.querySelectorAll(".marquee-container").forEach(setupMarqueeDrag);

    // --- BACKGROUND IMAGE PRELOADER FOR ULTRA FAST PERFORMANCE ---
    const preloadImagesInBackground = () => {
      const urls = [
        "https://i.ibb.co/xqGvkk4X/Dog-Grooming-Page-001.jpg",
        "https://i.ibb.co/MyHzgMzg/Dog-Grooming-Page-004.jpg",
        "https://i.ibb.co/jkbT2961/Dog-Grooming-Page-006.jpg",
        "https://i.ibb.co/KzyDJYhQ/Dog-Grooming-Page-018.jpg",
        "https://i.ibb.co/FLmsV5Rd/Dog-Grooming-Page-019.jpg",
        "https://i.ibb.co/qY7v2QG8/Dog-Grooming-Page-024.jpg",
        "https://i.ibb.co/CsPnVYjM/Dog-Grooming-Page-027.jpg",
        "https://i.ibb.co/yBpkdb85/Dog-Grooming-Page-029.jpg",
        "https://i.ibb.co/qLYL20wf/Dog-Grooming-Page-037.jpg",
        "https://i.ibb.co/TDjfFR8T/Dog-Grooming-Page-045.jpg",
        "https://i.ibb.co/5gLt74q8/Dog-Grooming-Page-048.jpg",
        "https://i.ibb.co/zTRbtH2f/Dog-Grooming-Page-052.jpg",
        "https://i.ibb.co/fYyy1QC6/Dog-Grooming-Page-055.jpg",
        "https://i.ibb.co/X6Vw8zZ/Dog-Grooming-Page-068.jpg",
        "https://i.ibb.co/0VVDMvFk/Dog-Grooming-Page-069.jpg",
        "https://i.ibb.co/h1Cf44QB/Dog-Grooming-Page-073.jpg",
        "https://i.ibb.co/3mwB4KYv/Dog-Grooming-Page-075.jpg",
        "https://i.ibb.co/S4dRQL8J/Dog-Grooming-Page-081.jpg",
        "https://i.ibb.co/zVMqy9tC/Dog-Grooming-Page-092.jpg",
        "https://i.ibb.co/BKv3Byfg/Dog-Grooming-Page-093.jpg",
        "https://i.ibb.co/hxyDwySR/image.png",
        "https://i.ibb.co/7d5QT22V/image.png",
        "https://i.ibb.co/CsvNTFnV/image.png",
        "https://i.ibb.co/cXvxW3dG/image.png"
      ];

      const runPreload = () => {
        urls.forEach(src => {
          const img = new Image();
          img.decoding = "async";
          img.src = src;
        });
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(runPreload, { timeout: 1200 });
      } else {
        setTimeout(runPreload, 200);
      }
    };

    preloadImagesInBackground();

  } catch (err) {
    console.error("Page initialization error:", err);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
