function importBingo(code){
  const allCards = atob(code);
  window.localStorage.setItem('allCards', allCards);
}

function exportBingo() {
  const allCards = window.localStorage.getItem('allCards');
  return btoa(allCards);
}

function getExportURL() {
  const code = exportBingo();
  const urlQuery = new URLSearchParams();
  urlQuery.set('b', code);
  return `${window.location.href}?${urlQuery.toString()}`;
}

function checkForExportURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('b');
  if (code) {
    importBingo(code);
    window.location.replace(window.location.pathname);
  }
}

export {
  checkForExportURL,
  getExportURL
}