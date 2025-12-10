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

// Contact form: try mailto first, fallback to opening user's email client
function sendMail(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const name = form.name.value;
  const email = form.email.value;
  const to = form.to.value;
  const message = form.message.value;

  // build mailto
  const subject = encodeURIComponent(`Jokare website message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  // open mail client (this is normal behaviour for static sites)
  window.location.href = mailto;

  return false;
}
