'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore, scores, activePlayer, isPlaying;

//toggle players
const togglePlayers = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//disable and enable buttons
const disableButtons = status => {
  btnRoll.disabled = status;
  btnRoll.style.cursor = status ? 'not-allowed' : 'pointer';

  btnHold.disabled = status;
  btnHold.style.cursor = status ? 'not-allowed' : 'pointer';
};

const init = () => {
  //Starting conditions
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  isPlaying = true;
  disableButtons(!isPlaying);
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;
};

init();

//Rolling dices
btnRoll.addEventListener('click', () => {
  //1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3.Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    togglePlayers();
  }
});

//hold the score
btnHold.addEventListener('click', () => {
  //1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check if player's score is >=100
  if (scores[activePlayer] >= 100) {
    //Finish the game
    isPlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    document.querySelector(`#name--${activePlayer}`).textContent = `Winner 🎉`;

    disableButtons(!isPlaying);
  } else {
    //Switch to next player
    togglePlayers();
  }
  //Hide dices
  diceEl.classList.add('hidden');
});

btnNew.addEventListener('click', init);
