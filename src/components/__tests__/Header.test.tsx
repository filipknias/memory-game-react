import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header component', () => {
  it('renders component', () => {
    const { getByRole } = render(<Router><Header /></Router>);
    expect(getByRole('reset-button')).toBeInTheDocument();
    expect(getByRole('new-game-button')).toBeInTheDocument();
  });
});