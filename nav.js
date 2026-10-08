(() => {
  document.querySelectorAll(".site-footer .footer-grid").forEach((footerGrid) => {
    const isUkrainian = window.location.pathname.includes("/uk/");
    const newsletter = document.createElement("div");
    newsletter.className = "footer-col footer-newsletter";
    newsletter.innerHTML = isUkrainian
      ? `
        <h4>Оновлення DTSA</h4>
        <p>Отримуйте новини та оновлення програми.</p>
        <form class="newsletter-form">
          <input type="hidden" name="_subject" value="New DTSA newsletter subscriber (UK)">
          <label class="sr-only" for="newsletter-email-uk">Електронна пошта</label>
          <div class="newsletter-input-row">
            <input id="newsletter-email-uk" name="email" type="email" placeholder="Ваша електронна пошта" autocomplete="email" required>
            <button class="btn btn-primary" type="submit">Підписатися</button>
          </div>
        </form>
      `
      : `
        <h4>DTSA updates &amp; news</h4>
        <p>Get program news and updates by email.</p>
        <form class="newsletter-form">
          <input type="hidden" name="_subject" value="New DTSA newsletter subscriber">
          <label class="sr-only" for="newsletter-email">Email address</label>
          <div class="newsletter-input-row">
            <input id="newsletter-email" name="email" type="email" placeholder="Your email address" autocomplete="email" required>
            <button class="btn btn-primary" type="submit">Subscribe</button>
          </div>
        </form>
      `;
    footerGrid.appendChild(newsletter);

    const form = newsletter.querySelector("form");
    const button = form.querySelector("button");
    const status = document.createElement("p");
    status.className = "newsletter-status";
    status.setAttribute("role", "status");
    form.appendChild(status);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      status.textContent = "";
      try {
        const response = await fetch("https://formspree.io/f/mppqdzvg", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (!response.ok) throw new Error(response.statusText);
        form.reset();
        status.textContent = isUkrainian ? "Дякуємо! Ви підписалися на оновлення." : "Thank you! You are subscribed.";
      } catch (error) {
        status.textContent = isUkrainian ? "Не вдалося підписатися. Спробуйте ще раз." : "Something went wrong. Please try again.";
      } finally {
        button.disabled = false;
      }
    });
  });

  document.querySelectorAll(".site-header").forEach((header) => {
    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });
})();
