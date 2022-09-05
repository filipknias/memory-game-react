import { FC, useState } from 'react';
import "./homePage.scss";
import { Link } from 'react-router-dom';

export type Theme = 'numbers'|'icons';
export type GridSize = 4|6;

const Home: FC = () => {
  const [theme, setTheme] = useState<Theme>('numbers');
  const [players, setPlayers] = useState<number>(1);
  const [gridSize, setGridSize] = useState<GridSize>(4);

  return (
    <div className="home-background">
      <div className="home-content">
        <h1 className="home-header">memory</h1>
        <div className="settings-container">
          <div className="setting-group">
            <h2 className="setting-label">Select Theme</h2>
            <div className="button-group">
              <button 
                className={`setting-button ${theme === 'numbers' ? 'setting-button-active' : ''}`} 
                onClick={() => setTheme('numbers')}
                role="theme-button"
              >
                Numbers
              </button>
              <button 
                className={`setting-button ${theme === 'icons' ? 'setting-button-active' : ''}`}
                onClick={() => setTheme('icons')}
                role="theme-button"
              >
                Icons
              </button>
            </div>
          </div>
          <div className="setting-group">
            <h2 className="setting-label">Numbers of Players</h2>
            <div className="button-group">
              <button 
                className={`setting-button ${players === 1 ? 'setting-button-active' : ''}`}
                onClick={() => setPlayers(1)}
                role="player-button"
              >
                1
              </button>
              <button 
                className={`setting-button ${players === 2 ? 'setting-button-active' : ''}`}
                onClick={() => setPlayers(2)}
                role="player-button"
              >
                2
              </button>
              <button 
                className={`setting-button ${players === 3 ? 'setting-button-active' : ''}`}
                onClick={() => setPlayers(3)}
                role="player-button"
              >
                3
              </button>
              <button 
                className={`setting-button ${players === 4 ? 'setting-button-active' : ''}`}
                onClick={() => setPlayers(4)}
                role="player-button"
              >
                4
              </button>
            </div>
          </div>
          <div className="setting-group">
            <h2 className="setting-label">Grid Size</h2>
            <div className="button-group">
              <button 
                className={`setting-button ${gridSize === 4 ? 'setting-button-active' : ''}`}
                onClick={() => setGridSize(4)}
                role="grid-size-button"
              >
                4x4
              </button>
              <button 
                className={`setting-button ${gridSize === 6 ? 'setting-button-active' : ''}`}
                onClick={() => setGridSize(6)}
                role="grid-size-button"
              >
                6x6
              </button>
            </div>
          </div>
          <Link to={`/game?theme=${theme}&players=${players}&gridSize=${gridSize}`} className="start-game-button">
            Start game
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;