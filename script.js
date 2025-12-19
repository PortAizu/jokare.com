// ===============================
// LOAD SHARED HEADER
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  if (header) {
    const res = await fetch("/header.html");
    header.innerHTML = await res.text();
  }

  initLanguage();
  initContactForm();
});

// ===============================
// LANGUAGE SYSTEM
// ===============================
let isJapanese = false;

function initLanguage() {
  const saved = localStorage.getItem("lang");

  if (saved) {
    isJapanese = saved === "ja";
  } else {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Tokyo") isJapanese = true;
  }

  applyLanguage();
}

function toggleLanguage() {
  isJapanese = !isJapanese;
  applyLanguage();
}

function applyLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = isJapanese ? el.dataset.ja : el.dataset.en;
  });

  localStorage.setItem("lang", isJapanese ? "ja" : "en");

  const en = document.getElementById("lang-en");
  const ja = document.getElementById("lang-ja");
  if (en && ja) {
    en.classList.toggle("active", !isJapanese);
    ja.classList.toggle("active", isJapanese);
  }

  document.body.classList.remove("fade");
  void document.body.offsetWidth;
  document.body.classList.add("fade");
}

// ===============================
// CONTACT FORM
// ===============================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const sourceInput = document.getElementById("source");
  const params = new URLSearchParams(window.location.search);
  sourceInput.value = params.get("source") || "general";

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);

    fetch("https://formspree.io/f/meoydyrq", {
      method: "POST",
      body: data,
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
}
