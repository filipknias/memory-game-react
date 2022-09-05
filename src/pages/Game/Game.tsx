import { FC, useEffect } from 'react';
import "./gamePage.scss";
import Header from '../../components/Header/Header';
import GameBoard from '../../components/GameBoard/GameBoard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GridSize, Players, Theme } from '../../utilities/types';

const Game: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getTheme = (): Theme => {
    const theme = searchParams.get('theme');
    if (theme === 'numbers' || theme === 'icons') return theme;
    else return 'numbers';
  };

  const getPlayers = (): Players => {
    const players: any = Number(searchParams.get('players'));
    if (players >= 1 && players <= 4) return players;
    else return 1;    
  };

  const getGridSize = (): GridSize => {
    const gridSize = Number(searchParams.get('gridSize'));
    if (gridSize === 4 || gridSize === 6) return gridSize;
    else return 4;
  };

  useEffect(() => {
    // Search params validation
    const theme = searchParams.get('theme');
    const players = searchParams.get('players');
    const gridSize = searchParams.get('gridSize');
    if (!theme || !players || !gridSize) return navigate('/');
  }, [searchParams]);

  return (
    <div className="game-background">
      <div className="game-content">
        <Header />
        <GameBoard theme={getTheme()} players={getPlayers()} gridSize={getGridSize()} />
      </div>
    </div>
  )
}

export default Game;