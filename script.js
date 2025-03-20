let secretNumber;
let attempts = 0;
let guessHistory = [];
let timer;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('submit-guess').addEventListener('click', checkGuess);

function startGame() {
  // Get difficulty level
  const difficulty = document.getElementById('difficulty').value;
  const range = parseInt(difficulty);
  secretNumber = Math.floor(Math.random() * range) + 1;
  attempts = 0;
  guessHistory = [];
  document.getElementById('range').textContent = range;
  
  // Show game interface
  document.getElementById('game').style.display = 'block';
  document.getElementById('hint').textContent = '';
  document.getElementById('attempts').textContent = 'Attempts: 0';
  document.getElementById('guess-history').textContent = 'Your guesses: ';
  
  // Start the timer (30 seconds)
  startTimer();
}

function startTimer() {
  let timeLeft = 30;
  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! You lost.");
      resetGame();
    }
  }, 1000);
}

function checkGuess() {
  const guess = parseInt(document.getElementById('guess').value);
  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    return;
  }
  
  attempts++;
  guessHistory.push(guess);
  document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
  document.getElementById('guess-history').textContent = `Your guesses: ${guessHistory.join(', ')}`;
  
  if (guess === secretNumber) {
    clearInterval(timer);
    alert(`Congratulations! You've guessed the number in ${attempts} attempts.`);
    resetGame();
  } else if (guess < secretNumber) {
    document.getElementById('hint').textContent = "Too low! Try again.";
  } else if (guess > secretNumber) {
    document.getElementById('hint').textContent = "Too high! Try again.";
  }

  // Give a hint after 5 incorrect guesses
  if (attempts > 5) {
    document.getElementById('hint').textContent = secretNumber % 2 === 0 ? "Hint: The number is even." : "Hint: The number is odd.";
  }
}

function resetGame() {
  // Hide the game interface and reset everything
  document.getElementById('game').style.display = 'none';
  document.getElementById('guess').value = '';
  document.getElementById('message').textContent = 'Game Over! Start a new game.';
}
