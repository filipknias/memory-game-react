import React from 'react';
import { render } from '@testing-library/react';
import Game from '../Game/Game';
import { BrowserRouter as Router } from 'react-router-dom';
import GameBoard from '../../components/GameBoard/GameBoard';

describe('game page component', () => {
  it('renders game page', () => {
    render(<Router><Game /></Router>);
  });

  it('renders game board component', () => {
    render(<GameBoard gridSize={4} playersCount={1} />);
  });
});