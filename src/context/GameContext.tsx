import { useState, useEffect, useContext, createContext, ReactNode, FC } from 'react';
import { useTimer, Timer } from '../hooks/useTimer';
import { GridSize, Theme, PlayersCount } from '../utilities/types';
import { loadIcons } from '../helpers/loadIcons';
import { shuffleArray } from '../helpers/shuffleArray';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { MemoryItem, Player, MemoryContent } from './types';

interface GameContext {
  players: Player[];
  memoryItems: MemoryItem[];
  playerIdTurn: number;
  timer: Timer;
  increasePlayerPoints: (playerId: number) => void;
  increasePlayerMoves: (playerId: number) => void;
  markMemoryItemOpened: (itemId: number) => void;
  markMemoryItemDiscovered: (itemId: number) => void;
  closeOpenedItems: () => void;
}

interface GameProviderProps {
  children: ReactNode;
  theme: Theme;
  playersCount: PlayersCount;
  gridSize: GridSize;
}

const GameContext = createContext<GameContext>({
  players: [],
  memoryItems: [],
  playerIdTurn: 0,
  timer: { seconds: 0, minutes: 0, resetTimer: () => {} },
  increasePlayerPoints: () => {},
  increasePlayerMoves: () => {},
  markMemoryItemOpened: () => {},
  markMemoryItemDiscovered: () => {},
  closeOpenedItems: () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: FC<GameProviderProps> = ({ theme, playersCount, gridSize, children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerIdTurn, setPlayerIdTurn] = useState<number>(1);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([]);
  const timer = useTimer();

  const setupPlayers = () => {
    // Setup new players state
    const initialPlayersStatus: Player[] = [];
    for (let i=1; i<=playersCount; i++) {
      initialPlayersStatus.push({ id: i, points: 0, moves: 0 });
    }
    setPlayers(initialPlayersStatus);   
  };

  useEffect(() => setupPlayers, [playersCount]);

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

  const increasePlayerPoints = (playerId: number) => {
    setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === playerId ? { ...player, points: player.points + 1 } : player));
  };

  const increasePlayerMoves = (playerId: number) => {
    // Increase current player moves
    setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === playerId ? { ...player, moves: player.moves + 1 } : player));
    // Find current player in array
    const currentPlayer = players.find((player) => player.id === playerId);
    if (!currentPlayer) return;
    // Get next player index
    const nextPlayerIndex = players.indexOf(currentPlayer) + 1;
    // Set next player id turn
    if (nextPlayerIndex > playersCount-1) {
      setPlayerIdTurn(players[0].id);
    } else {
      setPlayerIdTurn(players[nextPlayerIndex].id);
    }
  };

  const markMemoryItemOpened = (itemId: number) => {
    setMemoryItems((prevItems) => prevItems.map((memoryItem) => memoryItem.id === itemId ? { ...memoryItem, opened: true } : memoryItem));
  };

  const markMemoryItemDiscovered = (itemId: number) => {
    setMemoryItems((prevItems) => prevItems.map((memoryItem) => memoryItem.id === itemId ? { ...memoryItem, discovered: true } : memoryItem));
  };

  const closeOpenedItems = () => {
    setMemoryItems((prevItems) => prevItems.map((memoryItem) => { return { ...memoryItem, opened: false } }));
  };

  const value = {
    players,
    playerIdTurn,
    timer,
    memoryItems,
    increasePlayerPoints,
    increasePlayerMoves,
    markMemoryItemOpened,
    markMemoryItemDiscovered,
    closeOpenedItems,
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}