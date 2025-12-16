let isJapanese = false;

function toggleLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const en = el.dataset.en;
    const ja = el.dataset.ja || en;
    el.textContent = isJapanese ? en : ja;
  });
  isJapanese = !isJapanese;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const sourceInput = document.getElementById("source");
  const params = new URLSearchParams(window.location.search);
  sourceInput.value = params.get("source") || "general";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("https://formspree.io/f/meoydyrq", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
    .then(res => {
      document.getElementById("formFeedback").textContent =
        res.ok ? "✅ Message sent!" : "❌ Failed to send message.";
      if (res.ok) form.reset();
    })
    .catch(() => {
      document.getElementById("formFeedback").textContent =
        "❌ Failed to send message.";
    });
  });
});
