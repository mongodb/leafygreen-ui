import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { CollectionToolbarProvider } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';
import { getTestUtils } from '../../testing/getTestUtils';
import { getLgIds } from '../../utils';

import { Title } from './Title';
import { TitleProps } from './Title.types';

// Mock H3 to properly forward refs for testing while preserving polymorphic behavior
jest.mock('@leafygreen-ui/typography', () => {
  const React = require('react');
  return {
    ...jest.requireActual('@leafygreen-ui/typography'),
    // eslint-disable-next-line react/display-name
    H3: React.forwardRef(
      (
        { as, ...props }: { as?: React.ElementType } & Record<string, any>,
        ref: React.Ref<HTMLElement>,
      ) => {
        const Component = as || 'h3';
        return React.createElement(Component, { ...props, ref });
      },
    ),
  };
});

const renderTitle = (props: TitleProps) => {
  const lgIds = getLgIds();
  return render(
    <CollectionToolbarProvider lgIds={lgIds}>
      <Title {...props} />
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/CollectionToolbar/components/Title', () => {
  test('renders children correctly', () => {
    renderTitle({ children: 'Test Title' });
    const utils = getTestUtils();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(utils.getTitle()).toBeInTheDocument();
  });

  test('renders as an h3 element as default', () => {
    renderTitle({ children: 'Test Title' });
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  test('renders as a p element when using as prop', () => {
    renderTitle({ children: 'Test Title', as: 'p' });
    expect(screen.getByText('Test Title').tagName).toBe('P');
  });

  test('applies className to the rendered element', () => {
    renderTitle({ children: 'Test Title', className: 'custom-class' });
    expect(screen.getByText('Test Title')).toHaveClass('custom-class');
  });

  test('does not allow darkMode prop', () => {
    // @ts-expect-error: darkMode prop is not allowed
    renderTitle({ children: 'Test Title', darkMode: true });
    const utils = getTestUtils();
    expect(utils.getTitle()).not.toHaveClass('dark-mode');
  });

  test('has the correct static property for compound component identification', () => {
    expect(Title[CollectionToolbarSubComponentProperty.Title]).toBe(true);
  });

  test('applies data-lgid attribute from context', () => {
    renderTitle({ children: 'Test Title' });
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveAttribute(
      'data-lgid',
      'lg-collection_toolbar-title',
    );
  });

  test('spreads additional HTML attributes to the element', () => {
    renderTitle({
      children: 'Test Title',
      'data-testid': 'custom-title',
      'aria-label': 'Custom label',
    });
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toHaveAttribute('data-testid', 'custom-title');
    expect(titleElement).toHaveAttribute('aria-label', 'Custom label');
  });

  test('forwards ref to the rendered element', () => {
    const ref = createRef<HTMLHeadingElement>();
    const lgIds = getLgIds();
    render(
      <CollectionToolbarProvider lgIds={lgIds}>
        <Title ref={ref}>Test Title</Title>
      </CollectionToolbarProvider>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByText('Test Title'));
  });
});
