import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbarSubComponentProperty } from '../../shared.types';
import { getTestUtils } from '../../testing/getTestUtils';

import Title from './Title';

// Mock H3 to properly forward refs for testing while preserving polymorphic behavior
jest.mock('@leafygreen-ui/typography', () => {
  const React = require('react');
  return {
    // eslint-disable-next-line react/display-name
    H3: React.forwardRef(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { as, ...props }: { as?: React.ElementType } & Record<string, any>,
        ref: React.Ref<HTMLElement>,
      ) => {
        const Component = as || 'h3';
        return React.createElement(Component, { ...props, ref });
      },
    ),
  };
});

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

  test('applies data-lgid attribute from context', () => {
    render(<Title>Test Title</Title>);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveAttribute(
      'data-lgid',
      'lg-collection_toolbar-title',
    );
  });

  test('spreads additional HTML attributes to the element', () => {
    render(
      <Title data-testid="custom-title" aria-label="Custom label">
        Test Title
      </Title>,
    );
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveAttribute('data-testid', 'custom-title');
    expect(titleElement).toHaveAttribute('aria-label', 'Custom label');
  });

  test('forwards ref to the rendered element', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Title ref={ref}>Test Title</Title>);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByText('Test Title'));
  });
});
