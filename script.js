/**
 * MAHALAXMI STONE — CLIENT INTERACTION ENGINE
 * Bethamcherla, Kurnool · Belong to Rajasthan Heritage
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Shortcuts
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  /* ---------------------------------------------------------
     1. STICKY HEADER & LOGO SWAP
  --------------------------------------------------------- */
  const header = $("#header");
  const brandLogo = $("#brandLogo");
  const isMobile = () => window.innerWidth <= 640;

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader, { passive: true });
  updateHeader();

  /* ---------------------------------------------------------
     2. MOBILE DRAWER NAVIGATION
  --------------------------------------------------------- */
  const hamburger = $("#hamburger");
  const mobileDrawer = $("#mobileDrawer");
  const drawerClose = $("#drawerClose");
  const drawerBackdrop = $("#drawerBackdrop");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    hamburger.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger) hamburger.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

  $$(".drawer-link").forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  /* ---------------------------------------------------------
     3. SPY NAVIGATION (ACTIVE LINK ON SCROLL)
  --------------------------------------------------------- */
  const navLinks = $$(".nav-link");
  const sections = $$("section[id]");

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  /* ---------------------------------------------------------
     4. LIMESTONE FILTER TABS
  --------------------------------------------------------- */
  const filterTabs = $$(".filter-tab");
  const stoneCards = $$(".stone-card");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterVal = tab.getAttribute("data-filter");

      stoneCards.forEach(card => {
        const stoneType = card.getAttribute("data-stone");
        if (filterVal === "all" || stoneType === filterVal) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "none";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // Footer filter triggers
  $$("[data-filter-trigger]").forEach(trigger => {
    trigger.addEventListener("click", e => {
      const stoneKey = trigger.getAttribute("data-filter-trigger");
      const targetTab = $(`[data-filter="${stoneKey}"]`);
      if (targetTab) {
        targetTab.click();
      }
    });
  });

  /* ---------------------------------------------------------
     5. STONE & CATEGORY DETAIL SPECIFICATION MODAL
  --------------------------------------------------------- */
  const stoneData = {
    kadapa: {
      kicker: "SIGNATURE LIMESTONE · 01",
      title: "Kadapa Black Limestone",
      desc: "Mined from Bethamcherla, Kurnool, Kadapa Black is one of India's most celebrated architectural limestones. Renowned for its rich charcoal-black hue, dense non-porous structure, and exceptional resilience under extreme weather conditions. It takes a velvety cleft split or a modern honed matte finish with equal grace.",
      origin: "Bethamcherla, Kurnool District (Andhra Pradesh)",
      sizes: "30x30 cm, 60x30 cm, 60x60 cm, 90x60 cm & bespoke slabs",
      thickness: "20mm, 25mm, 30mm, 40mm calibrated",
      finishes: "Natural Cleft, River Wash / Leathered, Honed (Matte), Mirror Polish",
      use: "Courtyards, Interior Lobbies, High-Traffic Paving, Swimming Pool Coping, Wall Cladding",
      images: [
        "assets/kadapa-black.jpeg",
        "assets/kadapa-black-2.jpeg",
        "assets/kadapa-black-3.jpeg",
        "assets/kadapa-black-4.jpeg",
        "assets/kadapa-black-5.jpeg"
      ]
    },
    ash: {
      kicker: "SIGNATURE LIMESTONE · 02",
      title: "Ash Grey Limestone",
      desc: "A contemporary neutral limestone with subtle tonal gradations and delicate natural strata lines. Ash Grey provides a minimalist, monolithic canvas that pairs perfectly with modern glass, timber, and exposed concrete architectural styles.",
      origin: "Bethamcherla, Kurnool (Andhra Pradesh)",
      sizes: "30x30 cm, 60x30 cm, 60x60 cm, 90x60 cm & Cut-to-Size",
      thickness: "20mm, 25mm, 30mm calibrated",
      finishes: "Honed (Satin Matte), Natural Split, Shot-Blasted, Tumbled",
      use: "Luxury Living Hall Flooring, Villa Verandas, Modern Patios, Exterior Facade Panels",
      images: [
        "assets/ash-grey.jpeg",
        "assets/ash-grey-2.jpeg",
        "assets/ash-grey.jpeg",
        "assets/ash-grey-2.jpeg"
      ]
    },
    yellow: {
      kicker: "SIGNATURE LIMESTONE · 03",
      title: "Tandur Yellow Limestone",
      desc: "Featuring warm ochre, golden sand, and earthy amber undertones, Tandur Yellow brings welcoming Mediterranean and heritage warmth to any architectural setting. Highly prized for its natural thermal insulation — it stays remarkably cool under bare feet during hot summer afternoons.",
      origin: "Tandur Mineral Belt",
      sizes: "30x30 cm, 60x30 cm, 60x60 cm, 90x60 cm & bespoke dimensions",
      thickness: "20mm, 25mm, 30mm, 40mm",
      finishes: "Natural Cleft, River Wash, Honed, Tumbled Antique",
      use: "Sunlit Courtyards, Farmhouse Verandas, Swimming Pool Decks, Traditional Temple Floors",
      images: [
        "assets/tandur-yellow.jpeg",
        "assets/tandur-yellow-2.jpeg",
        "assets/tandur-yellow-3.jpeg",
        "assets/tandur-yellow-4.jpeg",
        "assets/tandur-yellow-5.jpeg",
        "assets/tandur-yellow-6.jpeg",
        "assets/tandur-yellow-7.jpeg",
        "assets/tandur-yellow-8.jpeg"
      ]
    },
    blue: {
      kicker: "SIGNATURE LIMESTONE · 04",
      title: "Tandur Grey / Blue (Shahabad)",
      desc: "Commonly known in architecture as Shahabad Stone, this variety features a distinctive steel-grey body with subtle bluish-green mineral currents. It possesses extraordinary compressive strength and density, making it virtually impervious to water absorption and heavy mechanical loads.",
      origin: "Shahabad / Tandur Belt",
      sizes: "30x30 cm, 60x30 cm, 60x60 cm, 90x60 cm",
      thickness: "25mm, 30mm, 40mm, 50mm",
      finishes: "Natural Split, Tumbled, Machine Calibrated, Honed",
      use: "Heavy Driveway Paving, Public Walkways, Industrial Flooring, Stepping Stones",
      images: [
        "assets/tandur-grey-blue.jpeg",
        "assets/tandur-grey-blue-2.jpeg",
        "assets/tandur-grey-blue-3.jpeg",
        "assets/tandur-grey-blue-4.jpeg"
      ]
    },
    leathers: {
      kicker: "PRODUCT CATEGORY · 01",
      title: "Leathers & River Wash Surfaces",
      desc: "Our leathered finish is achieved through specialized diamond-impregnated brushing machines that follow the natural grain of the limestone, raising soft micro-textures without creating sharp edges. It yields a soft velvety touch that resists fingerprints, dust, and stains while deepening color tones.",
      origin: "Bethamcherla & Tandur Quarries",
      sizes: "Cut-to-size architectural slabs up to 8x3 feet",
      thickness: "20mm, 25mm, 30mm",
      finishes: "Diamond Brushed Velvet Texture",
      use: "Feature Accent Walls, Fireplace Surrounds, Luxury Bathroom Vanities, Indoor Flooring",
      images: [
        "assets/category-leathers.jpg",
        "assets/kadapa-black-3.jpeg",
        "assets/tandur-yellow-4.jpeg",
        "assets/ash-grey-2.jpeg"
      ]
    },
    steps: {
      kicker: "PRODUCT CATEGORY · 02",
      title: "Calibrated Steps & Risers",
      desc: "Monolithic, solid natural limestone steps engineered for grand villa entrances, landscaped garden changes of level, and commercial stairways. Fabricated with custom edge profiles including full bullnose, half-bullnose, pencil round, and eased bevel edges.",
      origin: "Bethamcherla Manufacturing Yard",
      sizes: "Lengths up to 6 feet, Treads 300mm–350mm, Risers 150mm",
      thickness: "30mm, 40mm, 50mm solid stone",
      finishes: "Flamed / Cleft Tread with Honed Edge Profile",
      use: "Grand Villa Main Entrances, Swimming Pool Steps, Garden Amphitheaters",
      images: [
        "assets/category-steps.jpg",
        "assets/kadapa-black-2.jpeg",
        "assets/tandur-yellow-2.jpeg",
        "assets/tandur-grey-blue-2.jpeg"
      ]
    },
    cobbles: {
      kicker: "PRODUCT CATEGORY · 03",
      title: "Limestone Cobbles & Pavers",
      desc: "Durable, hand-dressed and tumbled natural limestone cobbles crafted to endure heavy vehicular traffic while adding European cobblestone charm to driveways, pedestrian promenades, and landscaped courtyard avenues.",
      origin: "Bethamcherla Quarry Hub",
      sizes: "10x10 cm, 14x14 cm, 20x10 cm, 20x14 cm",
      thickness: "40mm, 50mm, 60mm heavy duty",
      finishes: "Hand-Dressed, Tumbled Antique, Sawn Back",
      use: "Heavy Vehicle Driveways, Garden Pathways, Courtyard Plazas, Boundary Aprons",
      images: [
        "assets/category-cobbles.jpg",
        "assets/tandur-grey-blue-3.jpeg",
        "assets/tandur-yellow-3.jpeg",
        "assets/kadapa-black-4.jpeg"
      ]
    }
  };

  const detailModal = $("#detailModal");
  const modalClose = $("#modalClose");
  const detailKicker = $("#detailKicker");
  const detailTitle = $("#detailTitle");
  const detailDesc = $("#detailDesc");
  const modalMainImg = $("#modalMainImg");
  const modalThumbs = $("#modalThumbs");
  const specOrigin = $("#specOrigin");
  const specSizes = $("#specSizes");
  const specThickness = $("#specThickness");
  const specFinishes = $("#specFinishes");
  const specUse = $("#specUse");
  const detailEnquireBtn = $("#detailEnquireBtn");

  function openDetailModal(itemKey) {
    const item = stoneData[itemKey];
    if (!item) return;

    detailKicker.textContent = item.kicker;
    detailTitle.textContent = item.title;
    detailDesc.textContent = item.desc;
    specOrigin.textContent = item.origin;
    specSizes.textContent = item.sizes;
    specThickness.textContent = item.thickness;
    specFinishes.textContent = item.finishes;
    specUse.textContent = item.use;

    // Gallery setup
    modalMainImg.src = item.images[0];
    modalMainImg.alt = item.title;

    modalThumbs.innerHTML = item.images.map((imgSrc, idx) => `
      <div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgSrc}" alt="${item.title} angle ${idx + 1}" loading="lazy">
      </div>
    `).join("");

    $$(".modal-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        $$(".modal-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        modalMainImg.src = item.images[thumb.dataset.index];
      });
    });

    // Tailored WhatsApp inquiry link
    const waText = `Hello Mahalaxmi Stone, I am inquiring about *${item.title}*. Please share pricing for standard thicknesses and delivery details.`;
    detailEnquireBtn.href = `https://wa.me/919351708424?text=${encodeURIComponent(waText)}`;
    detailEnquireBtn.target = "_blank";

    if (typeof detailModal.showModal === "function") {
      detailModal.showModal();
    } else {
      detailModal.setAttribute("open", "");
    }
    document.body.style.overflow = "hidden";
  }

  function closeDetailModal() {
    if (typeof detailModal.close === "function") {
      detailModal.close();
    } else {
      detailModal.removeAttribute("open");
    }
    document.body.style.overflow = "";
  }

  $$("[data-detail]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const itemKey = el.getAttribute("data-detail");
      openDetailModal(itemKey);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeDetailModal);
  if (detailModal) {
    detailModal.addEventListener("click", e => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  /* ---------------------------------------------------------
     6. FACILITY & QUARRY TOUR MODAL
  --------------------------------------------------------- */
  const tourModal = $("#tourModal");
  const openTourBtn = $("#openTourBtn");
  const tourClose = $("#tourClose");
  const tourStepBtns = $$(".tour-step-btn");
  const tourSlides = [
    {
      img: "assets/process-extraction.jpg",
      title: "Phase 1: Raw Bedding Extraction",
      desc: "Direct mining from natural limestone deposits in Bethamcherla, preserving geological density and natural split planes."
    },
    {
      img: "assets/process-cutting.jpg",
      title: "Phase 2: Multi-Blade Gangsaw Slicing",
      desc: "Rough blocks are brought to our cutting yard where diamond circular saws slice limestone into exact slab dimensions."
    },
    {
      img: "assets/process-finishing.jpg",
      title: "Phase 3: Calibration & Surface Honing",
      desc: "Slabs pass through automated calibrators to achieve uniform thickness (20mm, 25mm, 30mm) followed by surface honing or diamond leather brushing."
    },
    {
      img: "assets/process-packing.jpg",
      title: "Phase 4: Heavy-Duty Crate Packaging & Dispatch",
      desc: "Tiles are foam-cushioned and crated vertically inside fumigated wooden pallets, ensuring safe zero-breakage transport across India."
    }
  ];

  function showTourStep(stepIndex) {
    const container = $("#tourSlides");
    const data = tourSlides[stepIndex];
    if (!container || !data) return;

    container.innerHTML = `
      <div class="tour-slide active">
        <img src="${data.img}" alt="${data.title}">
        <div class="slide-caption">
          <h4>${data.title}</h4>
          <p>${data.desc}</p>
        </div>
      </div>
    `;

    tourStepBtns.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === stepIndex);
    });
  }

  if (openTourBtn) {
    openTourBtn.addEventListener("click", () => {
      showTourStep(0);
      if (typeof tourModal.showModal === "function") {
        tourModal.showModal();
      } else {
        tourModal.setAttribute("open", "");
      }
      document.body.style.overflow = "hidden";
    });
  }

  if (tourClose) {
    tourClose.addEventListener("click", () => {
      if (typeof tourModal.close === "function") {
        tourModal.close();
      } else {
        tourModal.removeAttribute("open");
      }
      document.body.style.overflow = "";
    });
  }

  if (tourModal) {
    tourModal.addEventListener("click", e => {
      if (e.target === tourModal) {
        if (typeof tourModal.close === "function") tourModal.close();
        else tourModal.removeAttribute("open");
        document.body.style.overflow = "";
      }
    });
  }

  tourStepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const step = parseInt(btn.dataset.step, 10);
      showTourStep(step);
    });
  });

  /* ---------------------------------------------------------
     7. STONE REQUIREMENT & WASTAGE CALCULATOR
  --------------------------------------------------------- */
  const calcStone = $("#calcStone");
  const calcFinish = $("#calcFinish");
  const calcArea = $("#calcArea");
  const calcThickness = $("#calcThickness");
  const sumNetArea = $("#sumNetArea");
  const sumGrossArea = $("#sumGrossArea");
  const sumWeight = $("#sumWeight");
  const calcQuoteBtn = $("#calcQuoteBtn");

  function updateCalculation() {
    if (!calcArea) return;
    const net = Math.max(0, parseFloat(calcArea.value) || 0);
    const gross = Math.round(net * 1.10); // 10% wastage buffer
    const sqM = (gross * 0.092903).toFixed(1);

    // Density approx 2.65 kg/sq.m per mm thickness
    const thicknessMap = { "20mm": 20, "25mm": 25, "30mm": 30, "40mm+": 40 };
    const thickVal = thicknessMap[calcThickness.value] || 25;
    const weightTonnes = ((gross * 0.092903 * thickVal * 2.65) / 1000).toFixed(1);

    if (sumNetArea) sumNetArea.textContent = `${net.toLocaleString()} sq.ft`;
    if (sumGrossArea) sumGrossArea.textContent = `${gross.toLocaleString()} sq.ft (~${sqM} sq.m)`;
    if (sumWeight) sumWeight.textContent = `~ ${weightTonnes} Metric Tonnes`;
  }

  [calcStone, calcFinish, calcArea, calcThickness].forEach(input => {
    if (input) {
      input.addEventListener("input", updateCalculation);
      input.addEventListener("change", updateCalculation);
    }
  });

  if (calcQuoteBtn) {
    calcQuoteBtn.addEventListener("click", () => {
      const net = calcArea.value || "1000";
      const gross = Math.round(parseFloat(net) * 1.10);
      const stone = calcStone.value;
      const finish = calcFinish.value;
      const thick = calcThickness.value;

      const message = `Hello Mahalaxmi Stone,\n\nI calculated my project requirement on your website:\n- *Stone Variety:* ${stone}\n- *Surface Finish:* ${finish}\n- *Thickness:* ${thick}\n- *Net Area:* ${net} sq.ft\n- *Gross (with 10% cutting margin):* ${gross} sq.ft\n\nPlease share your current quarry price per sq.ft and dispatch timeline to my location.`;

      window.open(`https://wa.me/919351708424?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  // Initial calculation
  updateCalculation();

  /* ---------------------------------------------------------
     8. DIRECT WHATSAPP ENQUIRY FORM & CHIPS
  --------------------------------------------------------- */
  const stoneChips = $$("#stoneChips .chip");
  const hiddenInterest = $("#hiddenInterest");
  const enquiryForm = $("#enquiryForm");

  stoneChips.forEach(chip => {
    chip.addEventListener("click", () => {
      stoneChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      if (hiddenInterest) {
        hiddenInterest.value = chip.dataset.val;
      }
    });
  });

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(enquiryForm);
      const name = form.get("name") || "";
      const phone = form.get("phone") || "";
      const interest = form.get("interest") || "Limestone";
      const quantity = form.get("quantity") || "Standard requirement";
      const location = form.get("location") || "India";
      const reqMessage = form.get("message") || "Please share quotation and details.";

      const whatsappText = `Hello Mahalaxmi Stone,

I would like to make an enquiry regarding natural limestone:

*Customer Name:* ${name}
*Phone / WhatsApp:* ${phone}
*Interested Stone / Category:* ${interest}
*Estimated Quantity:* ${quantity}
*Delivery Location / City:* ${location}

*Requirement Details:*
${reqMessage}

Please provide your best quarry quote and dispatch details.`;

      window.open(`https://wa.me/919351708424?text=${encodeURIComponent(whatsappText)}`, "_blank");
    });
  }

  /* ---------------------------------------------------------
     9. SCROLL TO TOP BUTTON
  --------------------------------------------------------- */
  const scrollTopBtn = $("#scrollTopBtn");

  function handleScrollTopVisibility() {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     10. ESCAPE KEY MODAL DISMISSAL
  --------------------------------------------------------- */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDetailModal();
      if (tourModal && (tourModal.hasAttribute("open") || tourModal.open)) {
        if (typeof tourModal.close === "function") tourModal.close();
        else tourModal.removeAttribute("open");
        document.body.style.overflow = "";
      }
      closeDrawer();
    }
  });

  /* ---------------------------------------------------------
     11. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  --------------------------------------------------------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }
});
