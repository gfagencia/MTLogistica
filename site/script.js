(function () {
  document.body.classList.add("motion-ready");

  const config = window.MT_CONFIG || {};
  const modal = document.getElementById("quoteModal");
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");
  const emailLinks = document.querySelectorAll("[data-company-email]");
  const whatsappLinks = document.querySelectorAll("[data-company-whatsapp]");
  const revealItems = document.querySelectorAll(".reveal");
  const story = document.querySelector(".operation-cinema");
  const routeLive = document.querySelector(".route-live");
  const stageMap = document.querySelector(".stage-map");
  const van = document.querySelector(".van");
  const door = document.querySelector(".door");
  const parcels = document.querySelectorAll(".parcel");
  const cargoItems = document.querySelectorAll(".cargo");
  const deliveryBike = document.querySelector(".delivery-bike");
  const deliveryCards = document.querySelectorAll(".delivery-card");
  const checkpoints = document.querySelectorAll(".cinema-checkpoints article");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  emailLinks.forEach((link) => {
    link.textContent = config.companyEmail || "contacto@logisticamt.com";
    link.href = `mailto:${config.companyEmail || "contacto@logisticamt.com"}`;
  });

  whatsappLinks.forEach((link) => {
    const phone = config.companyWhatsapp || "5491124934095";
    link.href = `https://wa.me/${phone}`;
  });

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-form]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    revealObserver.observe(item);
  });

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function easeInOut(value) {
    return value < 0.5
      ? 2 * value * value
      : 1 - Math.pow(-2 * value + 2, 2) / 2;
  }

  function segment(progress, start, end) {
    return clamp((progress - start) / (end - start), 0, 1);
  }

  function updateCinema() {
    ticking = false;
    if (!story || reduceMotion) return;

    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / travel, 0, 1);
    const load = easeInOut(segment(progress, 0.05, 0.28));
    const drive = easeInOut(segment(progress, 0.16, 0.78));
    const bike = easeInOut(segment(progress, 0.48, 0.92));
    const route = segment(progress, 0.14, 0.86);
    const active = Math.min(3, Math.floor(progress * 4.15));

    if (stageMap) {
      stageMap.style.transform = `scale(${1.08 - progress * 0.06}) translate3d(0, ${2 - progress * 4}%, 0)`;
      stageMap.style.filter = `saturate(${1.08 + progress * 0.18}) contrast(1.12) brightness(${0.48 + progress * 0.12})`;
    }

    if (routeLive) {
      routeLive.style.strokeDashoffset = `${1220 * (1 - route)}`;
    }

    if (van) {
      const x = -34 + drive * 156;
      const y = 8 - drive * 102;
      const scale = 0.94 + Math.sin(drive * Math.PI) * 0.08 - drive * 0.14;
      van.style.transform = `translate3d(${x}%, ${y}px, 0) scale(${scale})`;
      van.style.opacity = `${1 - segment(progress, 0.88, 1) * 0.38}`;
    }

    if (door) {
      door.style.transform = `rotate(-8deg) scaleX(${1 - load * 0.82})`;
    }

    parcels.forEach((parcel, index) => {
      const local = easeInOut(segment(progress, 0.05 + index * 0.035, 0.25 + index * 0.035));
      parcel.style.opacity = `${1 - local}`;
      parcel.style.transform = `translate3d(${local * 310}px, ${local * -18}px, 0) scale(${1 - local * 0.18})`;
    });

    cargoItems.forEach((item, index) => {
      const local = easeInOut(segment(progress, 0.12 + index * 0.025, 0.26 + index * 0.025));
      item.style.opacity = `${local}`;
      item.style.transform = `translate3d(0, ${(1 - local) * 20}px, 0) scale(${0.95 + local * 0.05})`;
    });

    if (deliveryBike) {
      deliveryBike.style.opacity = `${segment(progress, 0.44, 0.5)}`;
      deliveryBike.style.offsetDistance = `${bike * 100}%`;
    }

    deliveryCards.forEach((card, index) => {
      const starts = [0.06, 0.42, 0.72];
      const local = segment(progress, starts[index], starts[index] + 0.18);
      card.style.opacity = `${local > 0 && local < 1 ? 1 : index === 0 && progress < 0.22 ? 1 : index === 2 && progress > 0.78 ? 1 : 0.28}`;
      card.style.transform = `translate3d(0, ${(1 - local) * 18}px, 0) scale(${0.96 + local * 0.04})`;
    });

    checkpoints.forEach((checkpoint, index) => {
      checkpoint.classList.toggle("is-current", index === active);
    });
  }

  function requestCinemaUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateCinema);
  }

  updateCinema();
  window.addEventListener("scroll", requestCinemaUpdate, { passive: true });
  window.addEventListener("resize", requestCinemaUpdate);


  function buildLeadPayload() {
    const data = new FormData(form);
    return {
      nombre: data.get("nombre") || "",
      empresa: data.get("empresa") || "",
      correo: data.get("correo") || "",
      telefono: data.get("telefono") || "",
      servicio: data.get("servicio") || "",
      mensaje: data.get("mensaje") || "",
      presentationUrl: config.presentationUrl || "../carta/carta-presentacion-mt.html",
      companyEmail: config.companyEmail || "contacto@logisticamt.com",
      source: window.location.href
    };
  }

  function fallbackMail(payload) {
    const subject = encodeURIComponent(`Consulta Logistica MT - ${payload.nombre}`);
    const body = encodeURIComponent(
      `Nueva consulta desde la web:\n\n` +
      `Nombre: ${payload.nombre}\n` +
      `Empresa: ${payload.empresa}\n` +
      `Correo: ${payload.correo}\n` +
      `Telefono: ${payload.telefono}\n` +
      `Servicio: ${payload.servicio}\n` +
      `Mensaje: ${payload.mensaje}\n\n` +
      `Enviar carta de presentacion: ${payload.presentationUrl}`
    );
    window.location.href = `mailto:${payload.companyEmail}?subject=${subject}&body=${body}`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = buildLeadPayload();
    status.className = "form-status";
    status.textContent = "Enviando consulta...";

    if (!config.appsScriptUrl) {
      status.className = "form-status error";
      status.textContent = "Falta configurar la URL de automatizacion. Se abrira tu correo para enviar la consulta.";
      fallbackMail(payload);
      return;
    }

    try {
      await fetch(config.appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      form.reset();
      status.className = "form-status ok";
      status.textContent = "Consulta enviada. Ya recibis la carta de presentacion en tu correo.";
    } catch (error) {
      status.className = "form-status error";
      status.textContent = "No pudimos completar el envio automatico. Se abrira tu correo para enviar la consulta.";
      fallbackMail(payload);
    }
  });
})();
