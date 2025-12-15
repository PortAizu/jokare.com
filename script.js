// Language toggle
let isJapanese = false;
function toggleLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.dataset.en;
    const ja = el.dataset.ja || en;
    el.textContent = isJapanese ? en : ja;
  });
  isJapanese = !isJapanese;
}

// Contact form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const sourceInput = document.getElementById("source");

  const params = new URLSearchParams(window.location.search);
  const source = params.get("source") || "general";
  sourceInput.value = source;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    // Formspree URL
    const formEndpoint = "https://formspree.io/f/meoydyrq";

    fetch(formEndpoint, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        document.getElementById("formFeedback").textContent = "✅ Message sent!";
        form.reset();
      } else {
        document.getElementById("formFeedback").textContent = "❌ Failed to send message.";
      }
    })
    .catch(() => {
      document.getElementById("formFeedback").textContent = "❌ Failed to send message.";
    });
  });
});
