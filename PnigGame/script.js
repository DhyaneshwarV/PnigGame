'use strict';
// PLAYER SCORE
const player1Score = document.querySelector('#score--0');
const player2Score = document.getElementById('score--1');

// PLAYER CURRENT SCORE
const player1Current = document.querySelector('#current--0');
const player2Current = document.querySelector('#current--1');

// PLAYERS
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//DICE IMG
const dice = document.querySelector('.dice');

// BTNS
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// STATE VARIABLE
let current, playing, activePlayer, scores;

// INIT FUNC
function init() {
  current = 0;
  playing = true;

  activePlayer = 0;
  scores = [0, 0];

  player1Current.textContent = 0;
  player1Score.textContent = 0;
  player2Current.textContent = 0;
  player2Score.textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  dice.classList.add('hidden');
}
init();

// SWITCH PLAYER
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

// ROLLING AN DICE
btnRoll.addEventListener('click', () => {
  if (playing) {
    // RANDOM DICE ROLL
    let diceValue = Math.trunc(Math.random() * 6) + 1;
    // REMOVE THE HIDDEN FOR DICE IMG
    dice.classList.remove('hidden');
    // RANDOM DICE IMG
    dice.src = `dice-${diceValue}.png`;
    // DISPLAY CURRENT
    if (diceValue != 1) {
      current += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

// HOLD
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += current;
    // scores[1]=scores[1]+current
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    switchPlayer();
  }
});

//  RESET THE GAME
btnNewGame.addEventListener('click', init);
