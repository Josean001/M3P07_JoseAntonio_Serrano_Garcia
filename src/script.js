let coins = 50;
let history = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function playGame() {
  const numberInput = document.getElementById('number');
  const betInput = document.getElementById('bet');
  const messageDiv = document.getElementById('message');
  const historyDiv = document.getElementById('history');

  const chosenNumber = parseInt(numberInput.value);
  const betAmount = parseInt(betInput.value);

  // Validaciones
  if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 6) {
    messageDiv.textContent = "Por favor, elige un número válido entre 1 y 6.";
    return;
  }
  
  if (isNaN(betAmount) || betAmount < 1) {
    messageDiv.textContent = "La apuesta mínima es de 1 moneda.";
    return;
  }
  
  if (betAmount > coins) {
    messageDiv.textContent = "No tienes suficientes monedas para esta apuesta.";
    return;
  }

  const rolledNumber = getRandomInt(1, 7);
  history.push(rolledNumber);

  if (chosenNumber === rolledNumber) {
    coins += betAmount * 2;
    messageDiv.textContent = `¡Acertaste! Has ganado ${betAmount * 2} monedas.`;
  } else {
    coins -= betAmount;
    messageDiv.textContent = `Fallaste. Has perdido ${betAmount} monedas. Te quedan ${coins} monedas.`;
  }

  document.getElementById('coins').textContent = coins;

  if (coins >= 100) {
    messageDiv.textContent = "¡Enhorabuena! ¡Has ganado el juego!";
    showHistory();
    disableGame();
  } else if (coins <= 0) {
    messageDiv.textContent = "Game Over. Te has quedado sin monedas.";
    showHistory();
    disableGame();
  }
}

function showHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = `Historial de números: ${history.join(', ')}`;
}

function disableGame() {
  document.getElementById('number').disabled = true;
  document.getElementById('bet').disabled = true;
  document.querySelector('button').disabled = true;
}
