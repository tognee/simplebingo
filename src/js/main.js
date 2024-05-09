import { generateBoard, restoreBoard } from './domHelper';
import { setupDialogs } from './dialogHelper';
import { initSettings } from './settings';
import { checkForExportURL, getExportURL } from './exporter';

import { Notyf } from 'notyf';
import textFit from "textfit";
import YAML from 'js-yaml';

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

const toast = new Notyf();

window.addEventListener('DOMContentLoaded', () => {
  checkForExportURL();
  initSettings();
  setupDialogs();
  generateBoard();
  restoreBoard();

  document.getElementById('newBoard').addEventListener('click', function() {
    newGame();
    restoreBoard();
  });

  document.getElementById('saveBingoCards').addEventListener('click', function() {
    const allCards = document.getElementById('allBingoCards').value;
    const savedCards = window.localStorage.getItem('allCards');
    if (allCards != savedCards) {
      window.localStorage.setItem('allCards', allCards);
      window.localStorage.setItem('currentBoard', '{}');
      window.localStorage.setItem('marked', '[]');
      toast.success('Saved!');
      restoreBoard();
    }
  })

  document.getElementById('shareBingoCards').addEventListener('click', function() {
    const shareUrl = getExportURL();
    if (navigator.share) {
      navigator.share({
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Copied to clipboard!');
    }
  })
})

window.addEventListener('resize', () => {
  textFit(document.querySelectorAll('.card'), {
    multiLine: true,
    reProcess: true,
  });
})