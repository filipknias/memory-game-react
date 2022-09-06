import React from 'react';
import { render } from '@testing-library/react';
import GameBoard from '../GameBoard/GameBoard';

describe('Game board component', () => {
  it('renders expected memory items', () => {
    const gridSize = 4;
    const { getByRole } = render(<GameBoard theme='numbers' gridSize={gridSize} onMoveFinished={() => {}} />);
    const expectedElementsCount = gridSize * gridSize;
    for (let i=0; i<= expectedElementsCount-1; i++) {
      const element = getByRole(`memory-item-${i}`);
      expect(element).toBeInTheDocument();
    }
  });
});