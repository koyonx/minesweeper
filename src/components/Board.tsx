import React from 'react';
import type { Cell as CellType } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu: (row: number, col: number, e: React.MouseEvent) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellContextMenu }) => {
  return (
    <div className="board">
      {board.map((row, r_idx) => (
        <div key={r_idx} className="board-row">
          {row.map((cell, c_idx) => (
            <Cell
              key={c_idx}
              cell={cell}
              onClick={() => onCellClick(r_idx, c_idx)}
              onContextMenu={(e) => onCellContextMenu(r_idx, c_idx, e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
