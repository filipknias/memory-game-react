import { FC } from 'react';
import "./header.scss";
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <div className="header-container">
      <h1 className="header">memory</h1>
      <div className="nav-container">
        <button className="nav-button reset-button" role="reset-button">Reset</button>
        <Link to="/" className="nav-button new-game-button" role="new-game-button">New Game</Link>
      </div>
    </div>
  )
}

export default Header;