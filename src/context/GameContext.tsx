import { useState, useEffect, useContext, createContext, ReactNode, FC } from 'react';
import { useTimer, Timer } from '../hooks/useTimer';
import { GridSize, Theme, PlayersCount } from '../utilities/types';
import { MemoryItem, Player } from './types';
import { generateMemoryItems } from '../helpers/generateMemoryItems';

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
  resetGame: () => void;
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
  timer: { seconds: 0, minutes: 0, resetTimer: () => {}, stopTimer: () => {} },
  increasePlayerPoints: () => {},
  increasePlayerMoves: () => {},
  markMemoryItemOpened: () => {},
  markMemoryItemDiscovered: () => {},
  closeOpenedItems: () => {},
  resetGame: () => {},
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
    setPlayerIdTurn(initialPlayersStatus[0].id);
  };

  useEffect(setupPlayers, [playersCount]);

  useEffect(() => {
   setMemoryItems(generateMemoryItems(theme, gridSize));
  }, [theme, gridSize]);

  useEffect(() => {
    console.log(playerIdTurn)
  }, [playerIdTurn]);

  const increasePlayerPoints = (playerId: number) => {
    setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === playerId ? { ...player, points: player.points + 1 } : player));
  };

  const increasePlayerMoves = (playerId: number) => {
    // Increase player moves
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

  const resetGame = () => {
    // Reset timer
    timer.resetTimer();
    // Reset game state
    setupPlayers();
    setPlayerIdTurn(players[0].id);
    setMemoryItems(generateMemoryItems(theme, gridSize));
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
    resetGame,
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}