// Seletores de elementos do DOM
const startButton = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');
const scoreboard = document.getElementById('scoreboard');
const choices = document.querySelectorAll('.choice');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const gameOverScreen = document.getElementById('game-over');
const finalMessage = document.getElementById('final-message');
const restartButton = document.getElementById('restart-game');
const difficultySelection = document.getElementById('difficulty-selection');
const exitButton = document.getElementById('exit-game'); // Novo botão de sair

// Opções do jogo e ícones
const opcoes = ['pedra', 'papel', 'tesoura'];
const icons = {
    pedra: '<i class="fas fa-hand-rock"></i>',
    papel: '<i class="fas fa-file-alt"></i>',
    tesoura: '<i class="fas fa-cut"></i>'
};

// Variáveis globais
let userScore = 0;
let computerScore = 0;
let attempts = 3;
let difficulty = 'medium'; // Dificuldade padrão

// Inicialização do jogo
startButton.addEventListener('click', () => {
    difficultySelection.classList.remove('hidden');
    startButton.classList.add('hidden');
});

document.getElementById('easy-btn').addEventListener('click', () => {
    difficulty = 'easy';
    iniciarJogo();
});

document.getElementById('medium-btn').addEventListener('click', () => {
    difficulty = 'medium';
    iniciarJogo();
});

document.getElementById('hard-btn').addEventListener('click', () => {
    difficulty = 'hard';
    iniciarJogo();
});

function iniciarJogo() {
    difficultySelection.classList.add('hidden');
    gameArea.classList.remove('hidden');
    scoreboard.classList.remove('hidden');
    exitButton.classList.remove('hidden'); // Mostrar botão de sair
    attempts = difficulty === 'hard' ? 5 : difficulty === 'easy' ? 3 : 4;
    userScore = 0;
    computerScore = 0;
    atualizarPlacar();
    resetarMensagens();
}

// Adicionando eventos para as escolhas
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if (attempts > 0) {
            const escolhaUsuario = e.target.closest('button').getAttribute('data-choice');
            const escolhaComputador = gerarEscolhaComputador();
            userChoiceDisplay.innerHTML = `Sua escolha: ${icons[escolhaUsuario]}`;
            computerChoiceDisplay.innerHTML = `Escolha do computador: ${icons[escolhaComputador]}`;
            determinarVencedor(escolhaUsuario, escolhaComputador);
            attempts--;
            if (attempts === 0) verificarFimDeJogo();
        }
    });
});

// Gerar escolha do computador com base na dificuldade
function gerarEscolhaComputador() {
    return opcoes[Math.floor(Math.random() * opcoes.length)];
}

// Determinar o vencedor
function determinarVencedor(escolhaUsuario, escolhaComputador) {
    if (escolhaUsuario === escolhaComputador) {
        resultMessage.textContent = 'Empate!';
        resultMessage.className = 'draw';
    } else if (
        (escolhaUsuario === 'pedra' && escolhaComputador === 'tesoura') ||
        (escolhaUsuario === 'papel' && escolhaComputador === 'pedra') ||
        (escolhaUsuario === 'tesoura' && escolhaComputador === 'papel')
    ) {
        userScore++;
        resultMessage.textContent = 'Você venceu!';
        resultMessage.className = 'win';
    } else {
        computerScore++;
        resultMessage.textContent = 'Você perdeu!';
        resultMessage.className = 'lose';
    }
    atualizarPlacar();
}

// Atualizar o placar
function atualizarPlacar() {
    userScoreDisplay.textContent = `Você: ${userScore}`;
    computerScoreDisplay.textContent = `Computador: ${computerScore}`;
}

// Verificar se o jogo terminou
function verificarFimDeJogo() {
    gameOverScreen.classList.remove('hidden');
    gameArea.classList.add('hidden');
    finalMessage.textContent = userScore > computerScore ? 'Parabéns! Você ganhou!' : 'Que pena! Você perdeu! Tente novamente!';
}

// Reiniciar o jogo
restartButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    iniciarJogo();
});

// Sair do jogo e voltar ao menu inicial
exitButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameArea.classList.add('hidden');
    scoreboard.classList.add('hidden');
    difficultySelection.classList.add('hidden');
    exitButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    resetarMensagens();
});

// Resetar mensagens e displays
function resetarMensagens() {
    userChoiceDisplay.textContent = 'Sua escolha: ';
    computerChoiceDisplay.textContent = 'Escolha do computador: ';
    resultMessage.textContent = '';
    resultMessage.className = '';
}
