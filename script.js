// Simple interactivity for Jokare sections
document.querySelectorAll('.service button').forEach(button => {
    button.addEventListener('click', (event) => {
        const sectionTitle = event.target.closest('.service').querySelector('h2').innerText;
        alert(`You clicked on ${sectionTitle}. Contact us for more info!`);
    });
});