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

// Contact form: automatic mailto with page-based routing
function sendMail(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Default email
  let to = "info@jokare.com";

  const path = window.location.pathname.toLowerCase();

  if (path.includes("language")) {
    to = "language@jokare.com";
  } else if (path.includes("store")) {
    to = "store@jokare.com";
  } else if (path.includes("rent")) {
    to = "rent@jokare.com";
  }

  const subject = encodeURIComponent(`Jokare website message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  return false;
}