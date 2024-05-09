import YAML from 'js-yaml';

function newGame() {
  const allCards = window.localStorage.getItem('allCards');
  const bingo = YAML.load(allCards);

  if (!bingo || bingo.length < 25) {
    window.alert('Not enough cards');
    return;
  }

  // Bingo board is a 5x5 array
  // Fill it with random cards, no repeat
  const currentBoard = {}
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let card = bingo.splice(Math.floor(Math.random() * bingo.length), 1)[0];
      currentBoard[`card${i}${j}`] = card;
    }
  }
  // Reset datastore
  window.localStorage.setItem('marked', '[]');
  window.localStorage.setItem('currentBoard', JSON.stringify(currentBoard));
  return currentBoard;
}

export {
  newGame,
}