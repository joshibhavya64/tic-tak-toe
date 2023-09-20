let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleMove(index) {
  if (!gameBoard[index]) {
    gameBoard[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    if (checkWin()) {
      document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (checkDraw()) {
      document.getElementById('status').textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  return winCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.getElementById('status').textContent = "Player X's turn";
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  enableBoard();
}

function disableBoard() {
  document.querySelectorAll('.cell').forEach(cell => cell.onclick = null);
}

function enableBoard() {
  document.querySelectorAll('.cell').forEach((cell, index) => cell.onclick = () => handleMove(index));
}

enableBoard();
