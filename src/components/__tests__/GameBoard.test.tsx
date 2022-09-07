import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GameBoard from '../GameBoard/GameBoard';

describe('Game board component', () => {
  it('renders expected memory items', () => {
    waitFor(() => {
      const gridSize = 6;
      const { getByRole } = render(<GameBoard gridSize={gridSize} playersCount={1} />);
      const expectedElementsCount = gridSize * gridSize;
      for (let i=0; i<= expectedElementsCount-1; i++) {
        const element = getByRole(`memory-item-${i}`);
        expect(element).toBeInTheDocument();
      }
    });
  });
});