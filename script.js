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

// Contact form: automatic mailto
function sendMail(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  const to = "info@jokare.com"; // <-- FIXED

  const subject = encodeURIComponent(`Jokare website message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  window.location.href = mailto;
}
