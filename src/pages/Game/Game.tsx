import { FC, useEffect, useMemo } from 'react';
import "./gamePage.scss";
import Header from '../../components/Header/Header';
import GameBoard from '../../components/GameBoard/GameBoard';
import BoardStatus from '../../components/BoardStatus/BoardStatus';
import StatusCard from '../../components/BoardStatus/StatusCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GridSize, PlayersCount, Theme } from '../../utilities/types';
import { GameProvider, useGameContext } from '../../context/GameContext';

// TODO: move to seperate files
const SinglePlayerBoardStatus: FC = () => {
  const { timer, playerIdTurn, players } = useGameContext();

  const timeString = useMemo((): string => {
    let secondsString = `${timer.seconds}`;
    if (timer.seconds < 10) secondsString = '0' + secondsString;
    return `${timer.minutes}:${secondsString}`;
  }, [timer.seconds, timer.minutes]);

  const moves = useMemo((): number => {
    const currentPlayer = players.find((player) => player.id === playerIdTurn);
    if (!currentPlayer) return 0;
    return currentPlayer.moves;
  }, [players]);

  return (
    <> 
      <StatusCard label='Time' status={timeString} active={false} />
      <StatusCard label='Moves' status={moves.toString()} active={false} />
    </>
  )
};

const MultiPlayerBoardStatus: FC = () => {
  const { players, playerIdTurn } = useGameContext();
  return (
    <> 
      {players.map(({ id, points }) => (
        <StatusCard 
          key={id} 
          label={`P${id+1}`} 
          status={points.toString()} 
          active={playerIdTurn === id}  
        />
      ))}
    </>
  )
};

const Game: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const theme = useMemo((): Theme => {
    const theme = searchParams.get('theme');
    if (theme === 'numbers' || theme === 'icons') return theme;
    else return 'numbers';
  }, [searchParams]);

  const playersCount = useMemo((): PlayersCount => {
    const players: any = Number(searchParams.get('players'));
    if (players >= 1 && players <= 4) return players;
    else return 1;    
  }, [searchParams]);

  const gridSize = useMemo((): GridSize => {
    const gridSize = Number(searchParams.get('gridSize'));
    if (gridSize === 4 || gridSize === 6) return gridSize;
    else return 4;
  }, [searchParams]);

  useEffect(() => {
    // Search params validation
    const theme = searchParams.get('theme');
    const players = searchParams.get('players');
    const gridSize = searchParams.get('gridSize');
    if (!theme || !players || !gridSize) return navigate('/');
  }, [searchParams]);
  
  return (
    <GameProvider theme={theme} playersCount={playersCount} gridSize={gridSize}>
      <div className="game-background">
        <div className="game-content">
          <Header />
          <GameBoard gridSize={gridSize} />
          <BoardStatus>
            {playersCount === 1 ? <SinglePlayerBoardStatus /> : <MultiPlayerBoardStatus />}
          </BoardStatus>
        </div>
      </div>
    </GameProvider>
  )
}

export default Game;