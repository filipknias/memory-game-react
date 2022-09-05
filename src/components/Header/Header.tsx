import { FC } from 'react';
import "./header.scss";

const Header: FC = () => {
  return (
    <div className="header-container">
      <h1 className="header">memory</h1>
      <div className="nav-container">
        <button className="nav-button reset-button">Reset</button>
        <button className="nav-button new-game-button">New Game</button>
      </div>
    </div>
  )
}

export default Header;