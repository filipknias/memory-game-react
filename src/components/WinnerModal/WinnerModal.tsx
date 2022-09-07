import { FC } from 'react';
import "./winnerModal.scss";
import { useGameContext } from '../../context/GameContext';
import { PlayersCount } from '../../utilities/types';
import { Link } from 'react-router-dom';

interface Props {
  playersCount: PlayersCount;
}

const WinnerModal: FC<Props> = ({ playersCount }) => {
  const { players, timer } = useGameContext();

  const playersScoreboard = players.sort((p1, p2) => {
    return p2.points - p1.points;
  }); 

  const SinglePlayerModalContent = (
    <>
      <div>
        <h1 className="modal-header">You did it!</h1>
        <p className="modal-subheader">Game over! Here's how you got on...</p>
      </div>
      <div className="modal-summary-container">
        <div className="summary-item">
          <h2 className="summary-label">Time Elapsed</h2>
          <h2 className="summary-info">{timer.minutes}:{timer.seconds}</h2>
        </div>
        <div className="summary-item">
          <h2 className="summary-label">{players[0].moves} Moves Taken</h2>
          <h2 className="summary-info">Moves</h2>
        </div>
      </div>
    </>
  );

  const MultiPlayerModalContent = (
    <>
      <div>
        <h1 className="modal-header">Player {playersScoreboard[0].id} Wins!</h1>
        <p className="modal-subheader">Game over! Here's how you got on...</p>
      </div>
      <div className="modal-summary-container">
        {playersScoreboard.map((player, index) => (
          <div key={player.id} className={`summary-item ${index === 0 ? 'summary-item-active' : ''}`}>
            <h2 className="summary-label">Player {player.id} {index === 0 ? '(Winner!)' : ''}</h2>
            <h2 className="summary-info">{player.points} Pairs</h2>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {playersCount === 1 ? SinglePlayerModalContent : MultiPlayerModalContent}
        <div className="buttons-container">
          <button className="restart-button">Restart</button>
          <Link to="/" className="setup-new-game-button">Setup New Game</Link>
        </div>
      </div>
    </div>
  )
}

export default WinnerModal;