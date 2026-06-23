// 1. Validação simples do formulário de contato
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real para não recarregar a página
    
    const nome = document.querySelector('input[name="nome"]').value;
    
    if (nome === "") {
        alert("Por favor, preencha seu nome!");
    } else {
        alert("Obrigada, " + nome + "! Recebemos sua mensagem com sucesso.");
        formulario.reset(); // Limpa os campos após o envio
    }
});

// 2. Efeito de "Scroll Suave" para os links do menu
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// 3. Exemplo de interação: Botão de alerta para o Quiz (adicionando ao HTML depois)
console.log("O site está pronto para a interação!");
