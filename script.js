const gameBoardEl = document.querySelector('#board-wrapper')
const colEls = [...gameBoardEl.children]
const winMsgEl = document.querySelector('#win-message')
const btnEl = document.querySelector("button")


const gameBoard = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const players = [1, 2];

let playerTurn = 1;

let winner = null;

let moves = 0;

//events
btnEl.addEventListener("click", function(e){
    gameBoard.forEach(function(col, colIdx){
        col.forEach(function(cell, cellIdx){
        gameBoard[colIdx][cellIdx] = null;
    
        })
    })
    winner = null;
    render();
    gameBoardEl.addEventListener("click", runGame);
})

gameBoardEl.addEventListener("click", runGame);

function runGame(e){
    console.dir(e.target);
    if (e.target.className !== "cell") return;

    const col = e.target.parentElement;

    addChipToBoard(col.getAttribute("data-num"));
    changePlayer();
    checkWinner();
    render();
}

function checkWinner() {
    gameBoard.forEach(function (col, colIdx) {
      col.forEach(function (cell, cellIdx) {
        if (!winner && cell) {
          if (
            col[cellIdx + 1] === cell &&
            col[cellIdx + 2] === cell &&
            col[cellIdx + 3] === cell
          ) {
            winner = cell;
          } else if (
            gameBoard[colIdx + 3] &&
            gameBoard[colIdx + 1][cellIdx] === cell &&
            gameBoard[colIdx + 2][cellIdx] === cell &&
            gameBoard[colIdx + 3][cellIdx] === cell
          ) {
            winner = cell;
          } else if (
            gameBoard[colIdx + 3] &&
            gameBoard[colIdx + 3][cellIdx + 3] &&
            gameBoard[colIdx + 1][cellIdx + 1] === cell &&
            gameBoard[colIdx + 2][cellIdx + 2] === cell &&
            gameBoard[colIdx + 3][cellIdx + 3] === cell
          ) {
            winner = cell;
          } else if (
            gameBoard[colIdx - 3] &&
            gameBoard[colIdx - 3][cellIdx + 3] &&
            gameBoard[colIdx - 1][cellIdx + 1] === cell &&
            gameBoard[colIdx - 2][cellIdx + 2] === cell &&
            gameBoard[colIdx - 3][cellIdx + 3] === cell
          ) {
            winner = cell;
          }
        }
      });
    });
    if (winner) gameBoardEl.removeEventListener("click", runGame);
  }

function changePlayer (){
    playerTurn = players[playerTurn % 2]
}

function addChipToBoard(colNum) {
  const gameBoardCol = gameBoard[colNum];
  let counter = 0;
  for (let cell of gameBoardCol) {
    if (cell === null) {
      gameBoardCol[counter] = playerTurn;
      break;
    };
    counter++;
  };
};

function render() {
  colEls.forEach(function(col, colIdx) {
    const colArr = [...col.children];
    const reversedCol = colArr.reverse();
    reversedCol.forEach(function(cell, cellIdx) {
      if (gameBoard[colIdx][cellIdx]) {
        const color = gameBoard[colIdx][cellIdx] === 1 ? "green" : "purple";
        cell.style.backgroundColor = color;
      } else {
        cell.style.backgroundColor = "white";
      }
    })
  })
  if(winner){
    winMsgEl.textContent = `Player ${winner} is th winner`;
  }
}
