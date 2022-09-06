import { FC, useState, useEffect } from 'react';
import "./gameBoard.scss";
import { GridSize, Players, Theme } from '../../utilities/types';
import { loadIcons } from '../../helpers/loadIcons';
import { shuffleArray } from '../../helpers/shuffleArray';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

interface Props {
  theme: Theme;
  gridSize: GridSize;
  onDiscoverItem?: () => void;
  onMoveFinished: () => void;
}

type MemoryContent = number|JSX.Element;

interface MemoryItem {
  id: number;
  content: MemoryContent;
  opened: boolean;
  discovered: boolean;
}

const GameBoard: FC<Props> = ({ theme, gridSize, onMoveFinished, onDiscoverItem }) => {
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([]);
  const [clickDisabled, setClickDisabled] = useState<boolean>(false);

  useEffect(() => {
    // Generate board data
    let memoryContent: MemoryContent[] = [];
    const maxNumber = (gridSize*gridSize)/2;
    // Fill memoryContent array with shuffled content based on selected theme
    if (theme === 'icons') {
      // Push icons to array
      const icons = loadIcons.map((icon) => <FontAwesomeIcon icon={icon} />);
      icons.length = maxNumber;
      memoryContent = icons;
    } else {
      // Push numbers to array
      for (let i=1; i <= maxNumber; i++) memoryContent.push(i);
    }

    // Set shuffled memory content to memory items state
    const shuffledMemoryItems = [...shuffleArray(memoryContent), ...shuffleArray(memoryContent)].map((content, index) => {
      return {
        id: index,
        content,
        opened: false,
        discovered: false,
      }
    });
    setMemoryItems(shuffledMemoryItems);
  }, []);

  useEffect(() => {
    // Prevent from opening more than 2 items
    const openedItems = memoryItems.filter((item) => item.opened);
    if (openedItems.length >= 2) setClickDisabled(true);
    else setClickDisabled(false);
  }, [memoryItems]);

  const handleMemoryItemClick = (item: MemoryItem) => {
    if (item.discovered || item.opened || clickDisabled) return;

    // Mark item as opened
    setMemoryItems((prevItems) => prevItems.map((memoryItem) => memoryItem.id === item.id ? { ...memoryItem, opened: true } : memoryItem));

    // Check for opened item
    const openedItem = memoryItems.find((item) => item.opened);
    if (!openedItem) return;
    
    // Check for pair
    if (openedItem && openedItem.content === item.content) {
      // Mark item as discovered
      setTimeout(() => {
        setMemoryItems((prevItems) => prevItems.map((memoryItem) => memoryItem.id === item.id || memoryItem.id === openedItem.id ? { ...memoryItem, discovered: true, opened: false } : memoryItem));
        // Discover item higher state changes
        if (onDiscoverItem) onDiscoverItem();
        // Move finished
        onMoveFinished();
      }, 1000);
    } else {
      // Close opened items
      setTimeout(() => {
        setMemoryItems((prevItems) => prevItems.map((memoryItem) => { return { ...memoryItem, opened: false } }));
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
    </div>
  )
}

export default GameBoard;