import { FC, useEffect, useMemo, useState } from 'react';
import "./gamePage.scss";
import Header from '../../components/Header/Header';
import GameBoard from '../../components/GameBoard/GameBoard';
import BoardStatus from '../../components/BoardStatus/BoardStatus';
import StatusCard from '../../components/BoardStatus/StatusCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GridSize, Players, Theme } from '../../utilities/types';
import useTimer from '../../hooks/useTimer';

interface SinglePlayerBoardStatusProps {
  moves: number;
}

interface MultiPlayerBoardStatusProps {
  playersStatus: Player[];
  currentIndexTurn: number;
}

interface Player {
  index: number;
  points: number;
}

const SinglePlayerBoardStatus: FC<SinglePlayerBoardStatusProps> = ({ moves }) => {
  const { seconds, minutes } = useTimer();

  const timeString = useMemo((): string => {
    let secondsString = `${seconds}`;
    if (seconds < 10) secondsString = '0' + secondsString;
    return `${minutes}:${secondsString}`;
  }, [seconds, minutes]);

  return (
    <> 
      <StatusCard label='Time' status={timeString} active={false} />
      <StatusCard label='Moves' status={moves.toString()} active={false} />
    </>
  )
};

const MultiPlayerBoardStatus: FC<MultiPlayerBoardStatusProps> = ({ playersStatus, currentIndexTurn }) => {
  return (
    <> 
      {playersStatus.map(({ index, points }) => (
        <StatusCard 
          key={index} 
          label={`P${index}`} 
          status={points.toString()} 
          active={currentIndexTurn === index}  
        />
      ))}
    </>
  )
};

const Game: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [moves, setMoves] = useState<number>(0);
  const [playersStatus, setPlayersStatus] = useState<Player[]>([]);
  const [playerIndexTurn, setPlayerIndexTurn] = useState<number>(0);

  const theme = useMemo((): Theme => {
    const theme = searchParams.get('theme');
    if (theme === 'numbers' || theme === 'icons') return theme;
    else return 'numbers';
  }, [searchParams]);

  const players = useMemo((): Players => {
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

  useEffect(() => {
    const initialPlayersStatus: Player[] = [];
    for (let i=0; i<=players-1; i++) {
      initialPlayersStatus.push({ index: i, points: 0 });
    }
    setPlayersStatus(initialPlayersStatus);
  }, [players]);

  const onDiscoverItem = () => {
    // Update current player points
    const updatedPlayers = playersStatus.map((player) => {
      if (player.index === playerIndexTurn) return { ...player, points: player.points + 1 };
      else return player;
    });
    setPlayersStatus(updatedPlayers);
  };

  const onMoveFinished = () => {
    // Set next player turn if there is more players
    if (players > 1) {
      if (playerIndexTurn >= players-1) setPlayerIndexTurn(0);
      else setPlayerIndexTurn(playersStatus[playerIndexTurn + 1].index);
    }
    // Update moves state
    setMoves((prevMoves) => prevMoves + 1);
  };

  return (
    <div className="game-background">
      <div className="game-content">
        <Header />
        <GameBoard 
          theme={theme}
          gridSize={gridSize} 
          onMoveFinished={onMoveFinished}
          onDiscoverItem={players > 1 ? onDiscoverItem : undefined}
        />
        <BoardStatus>
          {players === 1 ? <SinglePlayerBoardStatus moves={moves} /> : <MultiPlayerBoardStatus playersStatus={playersStatus} currentIndexTurn={playerIndexTurn} />}
        </BoardStatus>
      </div>
    </div>
  )
}

export default Game;