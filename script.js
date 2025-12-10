document.querySelectorAll("button[data-service]").forEach(button => {
    button.addEventListener("click", () => {
        const service = button.getAttribute("data-service");
        alert(`Thanks for your interest in Jokare ${service}! More details coming soon.`);
    });
});