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

  if (!allCards ||allCards.trim() == '') {
    window.localStorage.removeItem('allCards');
    document.getElementById('allBingoCards').value = ""
  } else {
    document.getElementById('allBingoCards').value = allCards.trim();
  }
}


export {
  initSettings
}