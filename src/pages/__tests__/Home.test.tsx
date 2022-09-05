import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Home from '../Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home page component', () => {
  it('renders component properly', () => {
    const { getByText } = render(<Router><Home /></Router>);
    expect(getByText('Numbers')).toBeInTheDocument();
    expect(getByText('Icons')).toBeInTheDocument();
  });

  it('changing classes on click event', () => {
    const { getAllByRole } = render(<Router><Home /></Router>);
    const themeButtons = getAllByRole('theme-button');
    themeButtons.map((button) => {
      fireEvent.click(button);
      expect(button).toHaveClass('setting-button-active');
    });

    const playerButtons = getAllByRole('player-button');
    playerButtons.map((button) => {
      fireEvent.click(button);
      expect(button).toHaveClass('setting-button-active');
    });

    const gridSizeButtons = getAllByRole('grid-size-button');
    gridSizeButtons.map((button) => {
      fireEvent.click(button);
      expect(button).toHaveClass('setting-button-active');
    });
  });
});