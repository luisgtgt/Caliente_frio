const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const feedbackMessage = document.getElementById('feedbackMessage');
const previousGuesses = document.getElementById('previousGuesses');
const timerDisplay = document.getElementById('timer');
const gameContainer = document.querySelector('.game-container');
const gameOverScreen = document.querySelector('.game-over-screen');
const gameOverTitle = document.getElementById('gameOverTitle');
const secretNumberDisplay = document.getElementById('secretNumberDisplay');
const restartButton = document.getElementById('restartButton');

let secretNumber;
let attempts = [];
let timeLeft = 60; // 60 segundos de juego
let timerInterval;
let gameActive = true; // Para controlar si el juego está en curso

// --- Funciones del Juego ---

function generateSecretNumber() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Número secreto (solo para desarrollo):", secretNumber); // Solo para depuración
}

function startGame() {
    generateSecretNumber();
    attempts = [];
    timeLeft = 60; // Reinicia el tiempo
    gameActive = true;
    updateDisplay(); // Actualiza la UI al inicio
    resetGameContainerStyle(); // Quita las clases de color
    gameOverScreen.classList.remove('show'); // Oculta la pantalla de Game Over
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.focus(); // Enfoca el input al inicio
    startTimer();
}

function updateDisplay() {
    previousGuesses.textContent = `Intentos previos: ${attempts.join(' - ')}`;
    timerDisplay.textContent = timeLeft;
}

function checkGuess() {
    if (!gameActive) return; // Si el juego no está activo, no permite intentos

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedbackMessage.textContent = "Por favor, ingresa un número válido (1-100).";
        feedbackMessage.style.color = '#ffea00'; // Amarillo para advertencia
        guessInput.value = '';
        return;
    }

    if (attempts.includes(userGuess)) {
        feedbackMessage.textContent = `Ya intentaste con ${userGuess}. ¡Prueba otro número!`;
        feedbackMessage.style.color = '#ffea00';
        guessInput.value = '';
        return;
    }

    attempts.push(userGuess);
    updateDisplay();

    const difference = Math.abs(userGuess - secretNumber);

    // Reinicia los estilos de temperatura antes de aplicar uno nuevo
    resetGameContainerStyle();

    if (difference === 0) {
        feedbackMessage.textContent = "¡VICTORIA! 🎉 Has adivinado el número.";
        feedbackMessage.style.color = '#00ff00';
        gameContainer.classList.add('win'); // Estilo de victoria
        endGame(true);
    } else if (difference <= 5) {
        feedbackMessage.textContent = "¡CALIENTE! 🔥 Estás muy cerca.";
        feedbackMessage.style.color = '#ff0000';
        gameContainer.classList.add('hot'); // Estilo de caliente
    } else if (difference <= 15) {
        feedbackMessage.textContent = "TIBIO 🟡 Vas por buen camino.";
        feedbackMessage.style.color = '#ffa500';
        gameContainer.classList.add('warm'); // Estilo de tibio
    } else {
        feedbackMessage.textContent = "FRÍO ❄️ Estás lejos del número.";
        feedbackMessage.style.color = '#00bfff';
        gameContainer.classList.add('cold'); // Estilo de frío
    }

    guessInput.value = ''; // Limpiar input después de cada intento
    guessInput.focus(); // Enfocar el input de nuevo
}

function startTimer() {
    clearInterval(timerInterval); // Asegura que no haya múltiples intervalos
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false); // Game Over por tiempo
        }
    }, 1000);
}

function endGame(win) {
    gameActive = false;
    clearInterval(timerInterval); // Detiene el cronómetro

    guessInput.disabled = true;
    guessButton.disabled = true;

    gameOverScreen.classList.add('show'); // Muestra la pantalla de Game Over

    if (win) {
        gameOverTitle.textContent = "¡FELICIDADES! HAS GANADO 🏆";
        gameOverTitle.style.color = '#00ff00'; // Verde para victoria
        secretNumberDisplay.textContent = `El número secreto era el ${secretNumber}.`;
    } else {
        gameOverTitle.textContent = "¡TIEMPO AGOTADO! ☠️";
        gameOverTitle.style.color = '#ff0000'; // Rojo para Game Over
        secretNumberDisplay.textContent = `El número secreto era el ${secretNumber}.`;
    }
}

function resetGameContainerStyle() {
    gameContainer.classList.remove('hot', 'warm', 'cold', 'win');
    gameContainer.style.backgroundColor = ''; // Restaura el color de fondo original del CSS
    gameContainer.style.borderColor = '';
    gameContainer.style.boxShadow = '';
}

// --- Event Listeners ---
guessButton.addEventListener('click', checkGuess);

guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

restartButton.addEventListener('click', startGame);

// --- Inicio del Juego ---
startGame();