// ===============================
// SHARED HEADER LOADER
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("header");
  if (headerTarget) {
    const res = await fetch("/header.html");
    headerTarget.innerHTML = await res.text();
  }

  initLanguageSystem();
});

// ===============================
// LANGUAGE SYSTEM (FINAL)
// ===============================
let isJapanese = false;

function initLanguageSystem() {
  const savedLang = localStorage.getItem("lang");

  if (savedLang) {
    isJapanese = savedLang === "ja";
  } else {
    // Default to Japanese for Japan visitors
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Tokyo") {
      isJapanese = true;
    }
  }

  applyLanguage();
}

function applyLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = isJapanese ? el.dataset.ja : el.dataset.en;
  });

  localStorage.setItem("lang", isJapanese ? "ja" : "en");

  // Active indicator
  const en = document.getElementById("lang-en");
  const ja = document.getElementById("lang-ja");
  if (en && ja) {
    en.classList.toggle("active", !isJapanese);
    ja.classList.toggle("active", isJapanese);
  }

  // Fade animation
  document.body.classList.remove("fade");
  void document.body.offsetWidth;
  document.body.classList.add("fade");
}

function toggleLanguage() {
  isJapanese = !isJapanese;
  applyLanguage();
}

// ===============================
// CONTACT FORM (SAFE)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const sourceInput = document.getElementById("source");
  const params = new URLSearchParams(window.location.search);
  sourceInput.value = params.get("source") || "general";

  form.addEventListener("submit", e => {
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
