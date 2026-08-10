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
      mockupPrincipal: "https://i.ibb.co/KzzSfzfM/capa-saude-capilar-site-aproximada-sem-tarja.png",
      capaBonus1: "https://i.ibb.co/LhhDT3VM/image.png",
      capaBonus2: "https://i.ibb.co/S4X5XbK4/image.png",
      capaBonus3: "https://i.ibb.co/G48G4wYH/image.png",
      nomeDoBonus1: "Breed-Specific Grooming Styles & Trims Guide",
      nomeDoBonus2: "Dog Handling, Safety & Stress-Free Prep Checklist",
      nomeDoBonus3: "Equipment Care & Shear Maintenance Master Guide",
      descricaoBreveDoBonus1: "Visual styling blueprints and trim patterns for popular breeds, from Poodles and Doodles to Schnauzers and Terriers.",
      descricaoBreveDoBonus2: "Proven calming holds, grooming table safety protocols, gentle nail clipping techniques, and ear care essentials.",
      descricaoBreveDoBonus3: "Step-by-step instructions on cleaning, oiling, sanitizing, and storing clipper blades and shears for lasting sharpness.",
      valorBonus1: "CAD $19.90",
      valorBonus2: "CAD $14.90",
      valorBonus3: "CAD $14.90",
      valorTotalDosBonus: "CAD $49.70",
      precoDoPlanoBasico: "CAD $9.90",
      precoDoPlanoCompleto: "CAD $17.90",
      linkCheckoutBasico990: "https://ggcheckout.app/checkout/v5/t0yw26q7vYxZjctYpXl7",
      linkCheckoutPromocional1790: "https://ggcheckout.app/checkout/v5/PxU3ZFunactinajEbKzx",
      linkCheckoutPlanoCompleto: "https://ggcheckout.app/checkout/v5/PxU3ZFunactinajEbKzx",
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
        const currentQueryParams = window.location.search;
        if (!currentQueryParams) return;

        const urlParams = new URLSearchParams(currentQueryParams);

        document.querySelectorAll("a").forEach(a => {
          const href = a.getAttribute("href");
          if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
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

    // --- BASIC PLAN UPGRADE MODAL POPUP ---
    const modal = document.getElementById("promo-modal");
    const openModalBtn = document.getElementById("basic-plan-trigger");
    const closeModalX = document.getElementById("close-modal-btn");
    const declinePromoLink = document.getElementById("decline-promo-link");

    const openModal = () => {
      if (!modal) return;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (closeModalX) setTimeout(() => closeModalX.focus(), 100);
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (openModalBtn) openModalBtn.focus();
    };

    if (openModalBtn) openModalBtn.addEventListener("click", openModal);
    if (closeModalX) closeModalX.addEventListener("click", closeModal);
    if (declinePromoLink) declinePromoLink.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
      }
    });

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

    // --- DRAG / TOUCH FOR CAROUSELS ---
    const setupMarqueeDrag = (container) => {
      const track = container.querySelector(".marquee-track");
      if (!track) return;
      let isDown = false;
      let startX;
      let initialTransform = 0;

      container.addEventListener("mousedown", (e) => {
        isDown = true;
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
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX);
        track.style.transform = `translate3d(${initialTransform + walk}px, 0, 0)`;
      });
    };

    document.querySelectorAll(".marquee-container").forEach(setupMarqueeDrag);

  } catch (err) {
    console.error("Page initialization error:", err);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
