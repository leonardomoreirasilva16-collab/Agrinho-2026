// ===============================
// Agro Sustentável - script.js
// ===============================

// 1. Scroll suave para navegação
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. Validação simples do formulário
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    alert("Mensagem enviada com sucesso! 🌱");

    form.reset();
});

// 3. Contador de seções vistas (efeito visual simples)
let sectionsViewed = new Set();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sectionsViewed.add(entry.target.id);
            console.log("Seções vistas:", sectionsViewed.size);
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    observer.observe(section);
});
