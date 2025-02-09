// script.js
const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  const difficultyLevels = {
    easy: 20,
    medium: 35,
    hard: 50
  };
  
  let puzzle = [];
  
  function createPuzzle(board, difficulty) {
    const puzzle = JSON.parse(JSON.stringify(board));
    let emptyCells = difficultyLevels[difficulty];
  
    while (emptyCells > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        emptyCells--;
      }
    }
    return puzzle;
  }
  
  function renderBoard(puzzle) {
    const sudokuBoard = document.getElementById('sudoku-board');
    sudokuBoard.innerHTML = '';
  
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.textContent = puzzle[row][col] === 0 ? '' : puzzle[row][col];
        if (puzzle[row][col] !== 0) {
          cell.classList.add('fixed');
        }
        cell.addEventListener('click', () => handleCellClick(row, col, cell));
        sudokuBoard.appendChild(cell);
      }
    }
  }
  
  function handleCellClick(row, col, cell) {
    if (!cell.classList.contains('fixed')) {
      const value = prompt('Bir değer girin (1-9):');
      if (value >= 1 && value <= 9) {
        puzzle[row][col] = parseInt(value);
        cell.textContent = value;
        checkWin();
      } else {
        alert('Geçersiz değer! Lütfen 1 ile 9 arasında bir sayı girin.');
      }
    }
  }
  
  function checkWin() {
    const isComplete = puzzle.flat().every(cell => cell !== 0);
    if (isComplete) {
      document.getElementById('message').textContent = 'Tebrikler, kazandınız! 🎉';
    }
  }
  
  document.getElementById('easy').addEventListener('click', () => {
    puzzle = createPuzzle(board, 'easy');
    renderBoard(puzzle);
  });
  
  document.getElementById('medium').addEventListener('click', () => {
    puzzle = createPuzzle(board, 'medium');
    renderBoard(puzzle);
  });
  
  document.getElementById('hard').addEventListener('click', () => {
    puzzle = createPuzzle(board, 'hard');
    renderBoard(puzzle);
  });
  
  // Sayfa yüklendiğinde kolay modda başlat
  window.onload = () => {
    puzzle = createPuzzle(board, 'easy');
    renderBoard(puzzle);
  };