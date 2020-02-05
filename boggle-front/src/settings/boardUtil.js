import {
  CellData
} from "../data/CellData";

/**
 *  Split a string to an equal [size]
 *  @param size : 'size of the chunk' 
 */
String.prototype.chunk = function (size) {
  return [].concat.apply([],
    this.split('').map(function (x, i) {
      return i % size ? [] : this.slice(i, i + size);
    }, this)
  );
}

/**
 *  Randomize a string 
 */
String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

export const clearHints = (board) => {

  for (let r = 0; r < board.length; r++) {
    let cols = board[r];
    for (let c = 0; c < cols.length; c++) {
      board[r][c].hint = false;
    }
  }
  return board;

}

export const toggleHints = (newBoard, row, column) => {

  newBoard = clearHints(newBoard);
  let activate = true;

  // Previous Row
  if (newBoard[row - 1]) {
    let previousRow = newBoard[row - 1];

    if (previousRow[column - 1])
      previousRow[column - 1].hint = activate;

    if (previousRow[column])
      previousRow[column].hint = activate;

    if (previousRow[column + 1])
      previousRow[column + 1].hint = activate;
  }

  // Current Row
  if (newBoard[row][column - 1])
    newBoard[row][column - 1].hint = activate;

  if (newBoard[row][column + 1])
    newBoard[row][column + 1].hint = activate;


  // Next Row
  if (newBoard[row + 1]) {
    let nextRow = newBoard[row + 1];

    if (nextRow[column - 1])
      nextRow[column - 1].hint = activate;

    if (nextRow[column])
      nextRow[column].hint = activate;

    if (nextRow[column + 1])
      nextRow[column + 1].hint = activate;

  }

  return newBoard;
}

/**
 * Generate a random 2D board of size [n x n]
 * @param boardData : 'string'
 * @param boardSize : integer number
 */
export const shuffleBoard = (boardData, boardSize) => {
  // Shuffle the board data
  // Divide into chunks of equal size
  // Create a 2D array of n-size with the chunk data
  const board = [];

  if (boardData && boardSize) {

    let strLength = boardData.length;

    if (strLength / boardSize !== boardSize) return [];

    boardData = boardData.shuffle();
    const dice = boardData.chunk(boardSize);

    for (var row = 0; row < boardSize; row++) {
      var cols = [];
      var diceRow = dice[row];

      for (var col = 0; col < boardSize; col++) {
        let face = diceRow[col];
        const cellData = new CellData(face, row, col);
        cols.push(cellData);
      }
      board.push(cols);
    }
  }

  return board;
};

/**
 * 
 */
export const copyBoard = board => {
  const copiedBoard = board.map(row => {
    return row.map(cell => {
      return cell.clone();
    });
  });
  return copiedBoard;
};

export const areCellEqual = (cell1, cell2) => {
  if (!cell1 || !cell2) return false;
  return cell1.row === cell2.row && cell1.column === cell2.column;
};

export const areAdjacent = (cell1, cell2) => {
  if (!cell1 || !cell2) return false;
  if (areCellEqual(cell1, cell2)) {
    return false;
  }

  const colDiff = Math.abs(cell1.column - cell2.column);
  const rowDiff = Math.abs(cell1.row - cell2.row);
  if (colDiff <= 1 && rowDiff <= 1) {
    return true;
  } else {
    return false;
  }
}