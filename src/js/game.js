import YAML from 'js-yaml';
import { Notyf } from 'notyf';
const toast = new Notyf();

function newGame() {
  const allCards = window.localStorage.getItem('allCards');
  const bingo = YAML.load(allCards);
  const currentBoard = {}
  window.localStorage.setItem('marked', '[]');
  window.localStorage.setItem('currentBoard', JSON.stringify(currentBoard));

  if (!bingo || bingo.length < 25) {
    toast.error('Not enough cards');
    return;
  }

  // Bingo board is a 5x5 array
  // Fill it with random cards, no repeat
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let card = bingo.splice(Math.floor(Math.random() * bingo.length), 1)[0];
      currentBoard[`card${i}${j}`] = card;
    }
  }
  // Reset datastore
  window.localStorage.setItem('currentBoard', JSON.stringify(currentBoard));
  return currentBoard;
}

export {
  newGame,
}