import { useState, useEffect } from 'react';
import Board from './components/Board';
import { createBoard, populateBoard } from './logic';
import type { Cell } from './types';

// Game settings
const DIFFICULTY_SETTINGS = {
  easy: { rows: 10, cols: 10, mines: 15 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

type Difficulty = keyof typeof DIFFICULTY_SETTINGS;
type GameStatus = 'playing' | 'won' | 'lost';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<Cell[][]>(() => {
    const { rows, cols } = DIFFICULTY_SETTINGS[difficulty];
    return createBoard(rows, cols);
  });
  const [status, setStatus] = useState<GameStatus>('playing');
  const [mineCount, setMineCount] = useState(DIFFICULTY_SETTINGS[difficulty].mines);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [time, setTime] = useState(0);

  const settings = DIFFICULTY_SETTINGS[difficulty];

  // Timer effect
  useEffect(() => {
    let interval: number | undefined = undefined;

    if (status === 'playing' && !isFirstClick) {
      interval = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [status, isFirstClick]);

  // Win condition effect
  useEffect(() => {
    if (isFirstClick) return; 
    const revealedCells = board.flat().filter(cell => cell.state === 'revealed').length;
    const totalSafeCells = settings.rows * settings.cols - settings.mines;
    if (revealedCells === totalSafeCells && status === 'playing') {
      setStatus('won');
    }
  }, [board, status, settings, isFirstClick]);

  const handleReset = (newDifficulty: Difficulty = difficulty) => {
    const { rows, cols, mines } = DIFFICULTY_SETTINGS[newDifficulty];
    setDifficulty(newDifficulty);
    setBoard(createBoard(rows, cols));
    setStatus('playing');
    setMineCount(mines);
    setIsFirstClick(true);
    setTime(0);
  };

  const revealCell = (r: number, c: number, boardToReveal: Cell[][]) => {
    if (r < 0 || r >= settings.rows || c < 0 || c >= settings.cols || boardToReveal[r][c].state !== 'hidden') {
      return;
    }

    boardToReveal[r][c].state = 'revealed';

    if (boardToReveal[r][c].value === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          revealCell(r + dr, c + dc, boardToReveal);
        }
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (status !== 'playing') return;

    let currentBoard = JSON.parse(JSON.stringify(board));

    if (isFirstClick) {
      setIsFirstClick(false);
      currentBoard = populateBoard(currentBoard, settings.mines, row, col);
    }

    const clickedCell = currentBoard[row][col];
    if (clickedCell.state !== 'hidden') return;

    if (clickedCell.value === 'mine') {
      setStatus('lost');
      const newBoard = currentBoard.map(r => r.map(cell => {
        if (cell.value === 'mine') cell.state = 'revealed';
        return cell;
      }));
      setBoard(newBoard);
      return;
    }

    revealCell(row, col, currentBoard);
    setBoard(currentBoard);
  };

  const handleContextMenu = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'playing' || isFirstClick) return;

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
      <div className="difficulty-selector">
        <button onClick={() => handleReset('easy')} disabled={difficulty === 'easy'}>Easy</button>
        <button onClick={() => handleReset('medium')} disabled={difficulty === 'medium'}>Medium</button>
        <button onClick={() => handleReset('hard')} disabled={difficulty === 'hard'}>Hard</button>
      </div>
      <div className="header" style={{ width: settings.cols * 40 }}>
        <div>Time: {time}</div>
        <div>Mines: {mineCount}</div>
        <button onClick={() => handleReset()}>New Game</button>
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