// Simple interactivity
document.querySelectorAll('.product').forEach(item => {
    item.addEventListener('click', () => {
        alert(`You clicked on ${item.querySelector('h3').innerText}`);
    });
});