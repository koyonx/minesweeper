import React from 'react';
import type { Cell as CellType } from '../types';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  const renderContent = () => {
    if (cell.state === 'flagged') {
      return '🚩';
    }
    if (cell.state === 'hidden') {
      return null;
    }
    if (cell.value === 'mine') {
      return '💣';
    }
    if (cell.value > 0) {
      return cell.value;
    }
    return null;
  };

  return (
    <div
      className={`cell ${cell.state} value-${cell.value}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {renderContent()}
    </div>
  );
};

export default Cell;
