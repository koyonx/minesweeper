import { useState, useEffect } from 'react';
import Board from './components/Board';
import { createBoard } from './logic';
import type { Cell } from './types';

// Game settings
const ROWS = 10;
const COLS = 10;
const MINES = 15;

type GameStatus = 'playing' | 'won' | 'lost';

function App() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard(ROWS, COLS, MINES));
  const [status, setStatus] = useState<GameStatus>('playing');
  const [mineCount, setMineCount] = useState(MINES);

  useEffect(() => {
    const revealedCells = board.flat().filter(cell => cell.state === 'revealed').length;
    const totalSafeCells = ROWS * COLS - MINES;
    if (revealedCells === totalSafeCells && status === 'playing') {
      setStatus('won');
    }
  }, [board, status]);

  const handleReset = () => {
    setBoard(createBoard(ROWS, COLS, MINES));
    setStatus('playing');
    setMineCount(MINES);
  };

  const revealCell = (r: number, c: number, newBoard: Cell[][]) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newBoard[r][c].state !== 'hidden') {
      return;
    }

    newBoard[r][c].state = 'revealed';

    if (newBoard[r][c].value === 0) {
      // Reveal neighbors recursively
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          revealCell(r + dr, c + dc, newBoard);
        }
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (status !== 'playing') return;

    const clickedCell = board[row][col];
    if (clickedCell.state !== 'hidden') return;

    if (clickedCell.value === 'mine') {
      setStatus('lost');
      // Reveal all mines
      const newBoard = board.map(r => r.map(cell => {
        if (cell.value === 'mine') cell.state = 'revealed';
        return cell;
      }));
      setBoard(newBoard);
      return;
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    revealCell(row, col, newBoard);
    setBoard(newBoard);
  };

  const handleContextMenu = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'playing') return;

    const newBoard = JSON.parse(JSON.stringify(board));
    const cell = newBoard[row][col];

    if (cell.state === 'hidden') {
      cell.state = 'flagged';
      setMineCount(mineCount - 1);
    } else if (cell.state === 'flagged') {
      cell.state = 'hidden';
      setMineCount(mineCount + 1);
    }
    setBoard(newBoard);
  };

  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <div className="header">
        <div>Mines: {mineCount}</div>
        <button onClick={handleReset}>New Game</button>
        <div className="status">
          {status === 'playing' && 'Playing...'}
          {status === 'won' && 'You Won! 🎉'}
          {status === 'lost' && 'Game Over 💣'}
        </div>
      </div>
      <Board
        board={board}
        onCellClick={handleCellClick}
        onCellContextMenu={handleContextMenu}
      />
    </div>
  );
}

export default App;