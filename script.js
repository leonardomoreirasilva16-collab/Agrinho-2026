// =====================================================
// AGRO SUSTENTÁVEL - SCRIPT PRINCIPAL
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----- 1. MENU MOBILE (HAMBURGUER) -----
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');

    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    header.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('ativo');
        menuToggle.textContent = nav.classList.contains('ativo') ? '✕' : '☰';
    });

    // Fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('ativo');
            menuToggle.textContent = '☰';
        });
    });

    // ----- 2. HEADER COM SOMBRA AO ROLAR -----
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----- 3. SMOOTH SCROLL -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----- 4. ANIMAÇÕES AO ROLAR (Intersection Observer) -----
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // ----- 5. CALCULADORA DE IMPACTO AMBIENTAL -----
    const secaoFuturo = document.getElementById('futuro');
    const calculadora = document.createElement('div');
    calculadora.classList.add('calculadora');
    calculadora.innerHTML = `
        <h3>🌱 Calculadora de Impacto Ambiental</h3>
        <p>Estime a economia de CO₂ ao adotar práticas sustentáveis em sua propriedade:</p>
        <label>Área cultivada (hectares):
            <input type="number" id="area" min="0" value="10">
        </label>
        <label>Usa plantio direto?
            <select id="plantioDireto">
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
            </select>
        </label>
        <label>Usa energia solar?
            <select id="energiaSolar">
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
            </select>
        </label>
        <button id="btnCalcular" type="button">Calcular Impacto</button>
        <div id="resultadoCalculadora" class="resultado"></div>
    `;
    secaoFuturo.appendChild(calculadora);

    document.getElementById('btnCalcular').addEventListener('click', () => {
        const area = parseFloat(document.getElementById('area').value) || 0;
        const plantio = document.getElementById('plantioDireto').value;
        const energia = document.getElementById('energiaSolar').value;

        let co2Economizado = 0;
        if (plantio === 'sim') co2Economizado += area * 1.2;   // toneladas/ano
        if (energia === 'sim') co2Economizado += area * 0.8;   // toneladas/ano

        const arvoresEquivalentes = Math.round(co2Economizado * 5); // 1 tCO₂ ≈ 5 árvores

        document.getElementById('resultadoCalculadora').innerHTML = `
            <p>✅ Você pode economizar aproximadamente <strong>${co2Economizado.toFixed(1)} toneladas de CO₂</strong> por ano.</p>
            <p>🌳 Isso equivale ao plantio de cerca de <strong>${arvoresEquivalentes} árvores</strong>!</p>
        `;
    });

    // ----- 6. QUIZ SOBRE SUSTENTABILIDADE -----
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz');
    quizContainer.innerHTML = `
        <h3>🧠 Quiz: Você conhece a Agro Sustentável?</h3>
        <form id="quizForm">
            <div class="pergunta">
                <p><strong>1.</strong> O que é o plantio direto?</p>
                <label><input type="radio" name="q1" value="a"> Queimar o solo antes do plantio</label>
                <label><input type="radio" name="q1" value="b"> Plantar sem revolver o solo, mantendo palhada</label>
                <label><input type="radio" name="q1" value="c"> Plantar apenas em estufas</label>
            </div>
            <div class="pergunta">
                <p><strong>2.</strong> Qual prática ajuda na rotação de culturas?</p>
                <label><input type="radio" name="q2" value="a"> Plantar sempre a mesma cultura</label>
                <label><input type="radio" name="q2" value="b"> Alternar espécies para preservar o solo</label>
                <label><input type="radio" name="q2" value="c"> Usar apenas agrotóxicos</label>
            </div>
            <div class="pergunta">
                <p><strong>3.</strong> Qual energia renovável é mais usada no campo brasileiro?</p>
                <label><input type="radio" name="q3" value="a"> Biomassa e solar</label>
                <label><input type="radio" name="q3" value="b"> Carvão mineral</label>
                <label><input type="radio" name="q3" value="c"> Nuclear</label>
            </div>
            <button type="button" id="btnQuiz">Ver Resultado</button>
            <div id="resultadoQuiz" class="resultado"></div>
        </form>
    `;
    secaoFuturo.appendChild(quizContainer);

    const gabarito = { q1: 'b', q2: 'b', q3: 'a' };

    document.getElementById('btnQuiz').addEventListener('click', () => {
        const form = document.getElementById('quizForm');
        let acertos = 0;
        for (const pergunta in gabarito) {
            const resposta = form.querySelector(`input[name="${pergunta}"]:checked`);
            if (resposta && resposta.value === gabarito[pergunta]) acertos++;
        }

        let mensagem = '';
        if (acertos === 3) mensagem = '🏆 Parabéns! Você é um expert em sustentabilidade!';
        else if (acertos === 2) mensagem = '👍 Muito bom! Você está no caminho certo.';
        else if (acertos === 1) mensagem = '📘 Continue estudando sobre o tema!';
        else mensagem = '🌱 Que tal aprender mais sobre agro sustentável?';

        document.getElementById('resultadoQuiz').innerHTML = `
            <p>Você acertou <strong>${acertos} de 3</strong> perguntas.</p>
            <p>${mensagem}</p>
        `;
    });

    // ----- 7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO -----
    const formContato = document.querySelector('#contato form');
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = formContato.nome.value.trim();
        const email = formContato.email.value.trim();
        const mensagem = formContato.mensagem.value.trim();

        if (nome.length < 3) {
            alert('⚠️ Por favor, informe um nome válido (mínimo 3 caracteres).');
            return;
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            alert('⚠️ Por favor, informe um e-mail válido.');
            return;
        }
        if (mensagem.length < 10) {
            alert('⚠️ Sua mensagem deve ter pelo menos 10 caracteres.');
            return;
        }

        alert(`✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
        formContato.reset();
    });

    // ----- 8. BOTÃO "VOLTAR AO TOPO" -----
    const btnTopo = document.createElement('button');
    btnTopo.id = 'btnTopo';
    btnTopo.innerHTML = '⬆';
    btnTopo.title = 'Voltar ao topo';
    document.body.appendChild(btnTopo);

    window.addEventListener('scroll', () => {
        btnTopo.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log('🌿 Agro Sustentável carregado com sucesso!');
});
