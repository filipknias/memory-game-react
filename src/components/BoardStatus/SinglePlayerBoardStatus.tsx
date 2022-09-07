import { FC, useMemo } from 'react';
import StatusCard from './StatusCard';
import { useGameContext } from '../../context/GameContext';

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

export default SinglePlayerBoardStatus;