import type { Cell, CellValue } from './types';

export const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  // 1. Create an empty board
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0 as CellValue,
      state: 'hidden' as const,
    }))
  );

  // 2. Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].value !== 'mine') {
      board[r][c].value = 'mine';
      minesPlaced++;
    }
  }

  // 3. Calculate numbers for non-mine cells
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
