import React from 'react';
import { render, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import { CardSkeleton } from './CardSkeleton';
import { FormSkeleton } from './FormSkeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { Skeleton } from './Skeleton';
import { TableSkeleton } from './TableSkeleton';

describe('packages/skeleton/Skeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Skeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('packages/skeleton/CardSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<CardSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('packages/skeleton/FormSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<FormSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('packages/skeleton/ParagraphSkeleton', () => {
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

describe('packages/skeleton/TableSkeleton', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<TableSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe('numCols prop', () => {
    test('defaults to 4', async () => {
      const { getAllByRole } = render(<TableSkeleton />);
      expect(getAllByRole('columnheader').length).toEqual(4);
    });

    test('renders correct number of column headers', async () => {
      const { getAllByRole } = render(<TableSkeleton numCols={6} />);
      const thead = getAllByRole('rowgroup')[0];
      expect(within(thead).getAllByRole('columnheader').length).toEqual(6);
    });
  });

  describe('numRows prop', () => {
    test('defaults to 5', async () => {
      const { getAllByRole } = render(<TableSkeleton />);
      const tbody = getAllByRole('rowgroup')[1];
      expect(within(tbody).getAllByRole('row').length).toEqual(5);
    });

    test('renders correct number of rows', async () => {
      const { getAllByRole } = render(<TableSkeleton numRows={6} />);
      const tbody = getAllByRole('rowgroup')[1];
      expect(within(tbody).getAllByRole('row').length).toEqual(6);
    });
  });
});
