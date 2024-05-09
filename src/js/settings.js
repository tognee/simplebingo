import YAML from 'js-yaml';

function initSettings() {
  let allCards = window.localStorage.getItem('allCards');
  try {
    YAML.load(allCards);
  } catch (e) {
    console.error(e);
    window.localStorage.removeItem('allCards');
    allCards = null;
  }

  if (allCards) {
    document.getElementById('allBingoCards').value = allCards;
  }
}


export {
  initSettings
}