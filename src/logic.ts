import type { Cell, CellValue } from './types';

/**
 * Creates an empty board of the given size, with all cells hidden.
 */
export const createBoard = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0 as CellValue,
      state: 'hidden' as const,
    }))
  );
};

/**
 * Populates a board with mines and calculates numbers, ensuring the first click area is safe.
 * @param board The empty board to populate.
 * @param mines The number of mines to place.
 * @param firstClickRow The row of the first click.
 * @param firstClickCol The column of the first click.
 */
export const populateBoard = (board: Cell[][], mines: number, firstClickRow: number, firstClickCol: number) => {
  const rows = board.length;
  const cols = board[0].length;

  // 1. Place mines randomly, avoiding the 3x3 area around the first click
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    // Check if the cell is within the 3x3 safe area or already a mine
    const isSafeZone = Math.abs(r - firstClickRow) <= 1 && Math.abs(c - firstClickCol) <= 1;

    if (!isSafeZone && board[r][c].value !== 'mine') {
      board[r][c].value = 'mine';
      minesPlaced++;
    }
  }

  // 2. Calculate numbers for non-mine cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].value === 'mine') continue;

      let adjacentMines = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].value === 'mine') {
            adjacentMines++;
          }
        }
      }
      board[r][c].value = adjacentMines as CellValue;
    }
  }

  return board;
};
