import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ParagraphSkeleton } from './ParagraphSkeleton';

describe('packages/skeleton-loader/ParagraphSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<ParagraphSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('header prop', () => {
    test('rendering with `withHeader = false` renders without a header skeleton', async () => {
      const { queryByTestId } = render(
        <ParagraphSkeleton withHeader={false} />,
      );
      expect(queryByTestId('lg-paragraph-skeleton-header')).toBeNull();
    });

    test('render without a header skeleton by default', async () => {
      const { queryByTestId } = render(<ParagraphSkeleton />);
      expect(queryByTestId('lg-paragraph-skeleton-header')).toBeNull();
    });

    test('rendering with `withHeader = true` renders without a header skeleton', async () => {
      const { getByTestId } = render(<ParagraphSkeleton withHeader />);
      expect(getByTestId('lg-paragraph-skeleton-header')).toBeInTheDocument();
    });
  });
});
