import { FC, useState, useEffect } from 'react';
import "./gameBoard.scss";
import { GridSize, PlayersCount } from '../../utilities/types';
import { useGameContext } from '../../context/GameContext';
import { MemoryItem } from '../../context/types';
import WinnerModal from '../WinnerModal/WinnerModal';

interface Props {
  gridSize: GridSize;
  playersCount: PlayersCount;
}

const GameBoard: FC<Props> = ({ gridSize, playersCount }) => {
  const [clickDisabled, setClickDisabled] = useState<boolean>(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState<boolean>(false);
  const { 
    memoryItems,
    markMemoryItemOpened,
    markMemoryItemDiscovered,
    closeOpenedItems,
    increasePlayerPoints,
    players,
    playerIdTurn,
    increasePlayerMoves,
    timer
  } = useGameContext();

  useEffect(() => {
    // Prevent from opening more than 2 items
    const openedItems = memoryItems.filter((item) => item.opened);
    if (openedItems.length >= 2) setClickDisabled(true);
    else setClickDisabled(false);
    // Check for win
    checkForWin();
  }, [memoryItems]);
  
  const checkForWin = () => {
    if (memoryItems.length === 0) return;
    
    const discoveredMemoryItems = memoryItems.filter((item) => item.discovered);
    if (discoveredMemoryItems.length === memoryItems.length) {
      // Stop time
      timer.stopTimer();
      // Display winner modal
      setWinnerModalOpen(true);
    }
  };

  const onItemDiscover = () => {
    // Increase current player points
    const currentPlayer = players.find((player) => player.id === playerIdTurn);
    if (currentPlayer) increasePlayerPoints(currentPlayer.id);
  };

  const onMoveFinished = () => {
    // Increase player moves and set next turn
    increasePlayerMoves(playerIdTurn);
    // Close all items
    closeOpenedItems();
  };

  const handleMemoryItemClick = (item: MemoryItem) => {
    if (item.discovered || item.opened || clickDisabled) return;

    // Mark item as opened
    markMemoryItemOpened(item.id);

    // Check for opened item
    const openedItem = memoryItems.find((item) => item.opened);
    if (!openedItem) return;
    
    // Check for pair
    if (openedItem && openedItem.content === item.content) {
      setTimeout(() => {
        // Update player points and mark item as discovered
        onItemDiscover();
        // Mark item as discovered
        markMemoryItemDiscovered(item.id);
        markMemoryItemDiscovered(openedItem.id);
        // Move finished
        onMoveFinished();
      }, 1000);
    } else {
      setTimeout(() => {
        // Move finished
        onMoveFinished();
      }, 1000);
    }
  };  
  
  return (
    <div 
      className="game-board-grid" 
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}
    >
      {memoryItems.map((item) => (
        <div 
          key={item.id} 
          role={`memory-item-${item.id}`}
          className={`memory-tile ${item.opened ? 'memory-tile-opened' : ''}${item.discovered ? 'memory-tile-discovered' : ''}`}
          onClick={() => handleMemoryItemClick(item)}
        >
          {item.opened || item.discovered ? item.content : null}
        </div>
      ))}
      {winnerModalOpen && <WinnerModal playersCount={playersCount} />}
    </div>
  )
}

export default GameBoard;