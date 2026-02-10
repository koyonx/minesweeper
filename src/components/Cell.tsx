import React, { useState, useEffect } from 'react';
import type { Cell as CellType } from '../types';
import { usePrevious } from '../hooks/usePrevious';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const prevState = usePrevious(cell.state);

  useEffect(() => {
    if (prevState === 'hidden' && cell.state === 'revealed') {
      setIsRevealing(true);
    }
  }, [cell.state, prevState]);

  const handleAnimationEnd = () => {
    setIsRevealing(false);
  };

  const renderContent = () => {
    // if (isRevealing) return null; // This line is removed

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
      style={{ position: 'relative' }} // Needed to contain the shatter pieces
    >
      {isRevealing && (
        <div className="shatter-container" onAnimationEnd={handleAnimationEnd}>
          <div className="shatter-piece" />
          <div className="shatter-piece" />
          <div className="shatter-piece" />
          <div className="shatter-piece" />
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default Cell;
