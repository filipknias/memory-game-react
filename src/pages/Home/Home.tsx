import { FC, useState } from 'react';
import "./Home.scss";

export type Theme = 'numbers'|'icons';
export type GridSize = 4|6;

const Home: FC = () => {
  const [theme, setTheme] = useState<Theme>('numbers');
  const [players, setPlayers] = useState<number>(1);
  const [gridSize, setGridSize] = useState<GridSize>(4);

  return (
    <div className="container">
      <h1 className="header">memory</h1>
      <div className="settings-container">
        <div className="setting-group">
          <h2 className="setting-label">Select Theme</h2>
          <div className="button-group">
            <button 
              className={`setting-button ${theme === 'numbers' ? 'setting-button-active' : ''}`} 
              onClick={() => setTheme('numbers')}
            >
              Numbers
            </button>
            <button 
              className={`setting-button ${theme === 'icons' ? 'setting-button-active' : ''}`}
              onClick={() => setTheme('icons')}
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
            >
              1
            </button>
            <button 
              className={`setting-button ${players === 2 ? 'setting-button-active' : ''}`}
              onClick={() => setPlayers(2)}
            >
              2
            </button>
            <button 
              className={`setting-button ${players === 3 ? 'setting-button-active' : ''}`}
              onClick={() => setPlayers(3)}
            >
              3
            </button>
            <button 
              className={`setting-button ${players === 4 ? 'setting-button-active' : ''}`}
              onClick={() => setPlayers(4)}
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
            >
              4x4
            </button>
            <button 
              className={`setting-button ${gridSize === 6 ? 'setting-button-active' : ''}`}
              onClick={() => setGridSize(6)}
            >
              6x6
            </button>
          </div>
        </div>
        <button className="start-game-button">Start game</button>
      </div>
    </div>
  )
}

export default Home;