import React from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbarSubComponentProperty } from '../CollectionToolbar.types';

import CollectionToolbarTitle from './CollectionToolbarTitle';

describe('packages/collection-toolbar/CollectionToolbarTitle', () => {
  test('renders children correctly', () => {
    render(<CollectionToolbarTitle>Test Title</CollectionToolbarTitle>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders as an h3 element', () => {
    render(<CollectionToolbarTitle>Test Title</CollectionToolbarTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  test('applies className to the rendered element', () => {
    render(
      <CollectionToolbarTitle className="custom-class">
        Test Title
      </CollectionToolbarTitle>,
    );
    expect(screen.getByText('Test Title')).toHaveClass('custom-class');
  });

  test('passes additional props to the rendered element', () => {
    render(
      <CollectionToolbarTitle data-testid="custom-test-id">
        Test Title
      </CollectionToolbarTitle>,
    );
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  test('has the correct displayName', () => {
    expect(CollectionToolbarTitle.displayName).toBe('CollectionToolbarTitle');
  });

  test('has the correct static property for compound component identification', () => {
    expect(
      CollectionToolbarTitle[CollectionToolbarSubComponentProperty.Title],
    ).toBe(true);
  });
});
