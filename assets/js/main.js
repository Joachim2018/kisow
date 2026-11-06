document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector("#contactForm");

if (contactForm instanceof HTMLFormElement) {
  const formStatus = document.querySelector("#formStatus");
  const serviceFromQuery = new URLSearchParams(window.location.search).get("service");
  const serviceSelect = contactForm.elements.namedItem("service");

  if (serviceFromQuery && serviceSelect instanceof HTMLSelectElement) {
    const option = Array.from(serviceSelect.options).find((item) =>
      item.textContent.toLowerCase().includes(serviceFromQuery.replaceAll("-", " "))
    );
    if (option) serviceSelect.value = option.value;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Website enquiry${service ? ` - ${service}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${service || "Not specified"}\n\nMessage:\n${message}`
    );

    if (formStatus) {
      formStatus.textContent = "Your email app should open with your message. If it doesn't, email us at kztsowedi@gmail.com.";
    }

    window.location.href = `mailto:kztsowedi@gmail.com?subject=${subject}&body=${body}`;
  });
}
