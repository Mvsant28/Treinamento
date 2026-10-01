import { carrosLuxo } from './carros.js';

// Função para renderizar os cards dinamicamente na tela (Templates JS)
function renderizarCarros() {
    const containerGaleria = document.getElementById('galeria-carros');

    // Limpa o container caso já tenha algo
    containerGaleria.innerHTML = '';

    carrosLuxo.forEach(carro => {
        const card = document.createElement('div');
        card.classList.add('card-carro');

        // Estrutura em template string com a imagem e os detalhes ocultos para o hover
        card.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.modelo}">
            <div class="info-carro">
                <h3>${carro.modelo}</h3>
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>Velocidade Máx:</strong> ${carro.velocidade}</p>
                <p class="preco">${carro.preco}</p>
            </div>
        `;

        containerGaleria.appendChild(card);
    });
}

// Executa a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarCarros);
// --- Lógica do Formulário e LocalStorage ---
const formulario = document.getElementById('form-proposta');
const feedback = document.getElementById('mensagem-feedback');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o recarregamento da página (comportamento SPA)

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const modelo = document.getElementById('modelo-interesse').value;

    // Validação básica
    if (!nome || !email || !modelo) {
        feedback.style.color = '#ff4757';
        feedback.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Objeto com os dados da proposta
    const novaProposta = {
        nome: nome,
        email: email,
        modelo: modelo,
        data: new Date().toLocaleString()
    };

    // Recupera propostas anteriores do localStorage ou cria um array vazio
    let listaPropostas = JSON.parse(localStorage.getItem('propostasMadriMotors')) || [];

    // Adiciona a nova proposta
    listaPropostas.push(novaProposta);

    // Guarda de volta no localStorage
    localStorage.setItem('propostasMadriMotors', JSON.stringify(listaPropostas));

    // Feedback visual de sucesso para o utilizador
    feedback.style.color = '#4cd137';
    feedback.textContent = `Obrigado, ${nome}! A sua proposta para o ${modelo} foi registada com sucesso.`;

    // Limpa o formulário
    formulario.reset();
});