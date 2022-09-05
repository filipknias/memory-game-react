import { FC } from 'react';
import "./gamePage.scss";
import Header from '../../components/Header/Header';

const Game: FC = () => {
  return (
    <div className="game-background">
      <div className="game-content">
        <Header />
      </div>
    </div>
  )
}

export default Game;