import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TweetsDisplay from './TweetsDisplay';

describe('<TweetsDisplay />', () => {
  test('it should mount', () => {
    render(<TweetsDisplay />);

    const TweetsDisplay = screen.getByTestId('TweetsDisplay');

    expect(TweetsDisplay).toBeInTheDocument();
  });
});