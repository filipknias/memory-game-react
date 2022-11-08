import { FC } from 'react';
import { useGameContext } from '../../context/GameContext';
import StatusCard from './StatusCard';

const MultiPlayerBoardStatus: FC = () => {
  const { players, playerIdTurn } = useGameContext();
  return (
    <> 
      {players.map(({ id, points }) => (
        <StatusCard 
          key={id} 
          label={`P${id}`} 
          status={points.toString()} 
          active={playerIdTurn === id}  
        />
      ))}
    </>
  )
};

export default MultiPlayerBoardStatus;