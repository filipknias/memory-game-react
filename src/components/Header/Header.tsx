import { FC } from 'react';
import "./header.scss";
import { Link } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';

const Header: FC = () => {
  const { resetGame } = useGameContext();
  return (
    <div className="header-container">
      <h1 className="header">memory</h1>
      <div className="nav-container">
        <button className="nav-button reset-button" role="reset-button" onClick={resetGame}>Reset</button>
        <Link to="/" className="nav-button new-game-button" role="new-game-button">New Game</Link>
      </div>
    </div>
  )
}

export default Header;