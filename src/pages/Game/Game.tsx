import { FC, useEffect, useMemo } from 'react';
import "./gamePage.scss";
import Header from '../../components/Header/Header';
import GameBoard from '../../components/GameBoard/GameBoard';
import BoardStatus from '../../components/BoardStatus/BoardStatus';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GridSize, PlayersCount, Theme } from '../../utilities/types';
import { GameProvider } from '../../context/GameContext';
import SinglePlayerBoardStatus from '../../components/BoardStatus/SinglePlayerBoardStatus';
import MultiPlayerBoardStatus from '../../components/BoardStatus/MultiPlayerBoardStatus';

const DEFAULT_THEME = "numbers";
const DEFAULT_PLAYERS_COUNT = 1;
const DEFAULT_GRID_SIZE = 4;

const Game: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const theme = useMemo((): Theme => {
    const theme = searchParams.get('theme');
    if (theme === 'numbers' || theme === 'icons') return theme;
    return DEFAULT_THEME;
  }, [searchParams]);

  const playersCount = useMemo((): PlayersCount => {
    const players: any = Number(searchParams.get('players'));
    if (players >= 1 && players <= 4) return players;
    return DEFAULT_PLAYERS_COUNT;    
  }, [searchParams]);

  const gridSize = useMemo((): GridSize => {
    const gridSize = Number(searchParams.get('gridSize'));
    if (gridSize === 4 || gridSize === 6) return gridSize;
    return DEFAULT_GRID_SIZE;
  }, [searchParams]);

  useEffect(() => {
    // Search params validation
    const theme = searchParams.get('theme');
    const players = searchParams.get('players');
    const gridSize = searchParams.get('gridSize');
    console.log(searchParams.entries())
    if (!theme || !players || !gridSize) return navigate('/');
  }, [searchParams]);

  return (
    <GameProvider theme={theme} playersCount={playersCount} gridSize={gridSize}>
      <div className="game-background">
        <div className="game-content">
          <Header />
          <GameBoard gridSize={gridSize} playersCount={playersCount} />
          <BoardStatus>
            {playersCount === 1 ? <SinglePlayerBoardStatus /> : <MultiPlayerBoardStatus />}
          </BoardStatus>
        </div>
      </div>
    </GameProvider>
  )
}

export default Game;