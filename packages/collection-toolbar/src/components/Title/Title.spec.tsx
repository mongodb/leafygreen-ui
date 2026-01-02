import React from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbarSubComponentProperty } from '../../shared.types';
import { getTestUtils } from '../../testing/getTestUtils';

import Title from './Title';

describe('packages/collection-toolbar/CollectionToolbar/components/Title', () => {
  test('renders children correctly', () => {
    render(<Title>Test Title</Title>);
    const utils = getTestUtils();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(utils.getTitle()).toBeInTheDocument();
  });

  test('renders as an h2 element as default', () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders as a p element when using as prop', () => {
    render(<Title as="p">Test Title</Title>);
    expect(screen.getByText('Test Title').tagName).toBe('P');
  });

  test('applies className to the rendered element', () => {
    render(<Title className="custom-class">Test Title</Title>);
    expect(screen.getByText('Test Title')).toHaveClass('custom-class');
  });

  test('does not allow darkMode prop', () => {
    // @ts-expect-error: darkMode prop is not allowed
    render(<Title darkMode={true}>Test Title</Title>);
    const utils = getTestUtils();
    expect(utils.getTitle()).not.toHaveClass('dark-mode');
  });

  test('has the correct static property for compound component identification', () => {
    expect(Title[CollectionToolbarSubComponentProperty.Title]).toBe(true);
  });
});
