import { MemoryItem, MemoryContent } from '../context/types';
import { GridSize, Theme } from '../utilities/types';
import { loadIcons } from './loadIcons';
import { shuffleArray } from './shuffleArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const generateMemoryItems = (theme: Theme, gridSize: GridSize): MemoryItem[] => {
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

  return shuffledMemoryItems;
};