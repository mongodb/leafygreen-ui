import React from 'react';
import { render, screen } from '@testing-library/react';

import { Avatar } from '.';

describe('packages/avatar', () => {
  describe('it renders the correct variant', () => {
    test('it renders a fallback avatar by default', () => {
      render(<Avatar />);
      expect(screen.getByTestId('fallback-avatar')).toBeInTheDocument();
    });

    test('it renders a mongo avatar when set', () => {
      render(<Avatar variant="mongo" />);
      expect(screen.getByTestId('mongo-avatar')).toBeInTheDocument();
    });

    test('it renders a user avatar when set with a name', () => {
      render(<Avatar variant="user" name="Brooke Yalof" />);
      expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
      expect(screen.getByText('BY')).toBeInTheDocument();
    });
  });
});
