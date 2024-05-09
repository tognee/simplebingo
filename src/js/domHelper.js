import textFit from "textfit";

function generateBoard() {
  const bingoBoard = document.querySelector('.bingoBoard');
  bingoBoard.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('id', `card${i}${j}`);
      card.dataset.y = i;
      card.dataset.x = j;
      card.addEventListener('click', onCardClick);
      bingoBoard.appendChild(card);
    }
  }

  return bingoBoard;
}

function onCardClick(event) {
  const card = event.target;
  const selected = card.classList.toggle('selected');

  const marked = JSON.parse(window.localStorage.getItem('marked') || '[]');

  if (selected) {
    if (!marked.includes(card.id)) {
      marked.push(card.id);
    }
  } else {
    if (marked.includes(card.id)) {
      marked.splice(marked.indexOf(card.id), 1);
    }
  }

  window.localStorage.setItem('marked', JSON.stringify(marked));
}

function restoreBoard() {
  const marked = JSON.parse(window.localStorage.getItem('marked') || '[]');
  marked.forEach(card => document.getElementById(card).classList.add('selected'));
  const currentBoard = JSON.parse(window.localStorage.getItem('currentBoard') || '{}');
  Object.keys(currentBoard).forEach(pos => {
    const card = document.getElementById(pos)
    const data = currentBoard[pos];
    if (data.name) {
      card.innerText = data.name;
    }
  })
  textFit(document.querySelectorAll('.card'));
}

export {
  generateBoard,
  restoreBoard
}