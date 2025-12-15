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

// Contact form: automatic mailto with SOURCE-based routing
function sendMail(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Read ?source= from URL
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source");

  // Default email
  let to = "info@jokare.com";

  if (source === "language") {
    to = "language@jokare.com";
  } else if (source === "store") {
    to = "store@jokare.com";
  } else if (source === "rent") {
    to = "rent@jokare.com";
  }

  const subject = encodeURIComponent(`Jokare website message from ${name}`);
  const body = encodeURIComponent(
    `Source: ${source || "general"}\n\nName: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  return false;
}

  const subject = encodeURIComponent(`Jokare website message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  return false;
}