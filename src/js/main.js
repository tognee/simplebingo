import { generateBoard, restoreBoard } from './domHelper';
import { newGame } from './game';
import { setupDialogs } from './dialogHelper';
import { initSettings } from './settings';
import { checkForExportURL, getExportURL } from './exporter';

import { Notyf } from 'notyf';

import textFit from "textfit";

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
  textFit(document.querySelectorAll('.card'));
})