import React from 'react';
import { render, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TableSkeleton } from './TableSkeleton';

describe('packages/skeleton-loader/TableSkeleton', () => {
  describe('a11y', () => {
    // TODO: Table header text should not be empty (empty-table-header); Element does not have text that is visible to screen readers
    //https://dequeuniversity.com/rules/axe/4.5/empty-table-header?application=axeAPI
    // This is failing because there is no text in the headers.
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('does not have basic accessibility issues', async () => {
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

  describe('columnLabels prop', () => {
    test('renders when all text is provided', async () => {
      const { getByText } = render(
        <TableSkeleton columnLabels={['col1', 'col2', 'col3', 'col4']} />,
      );
      expect(getByText('col1')).toBeInTheDocument();
      expect(getByText('col2')).toBeInTheDocument();
      expect(getByText('col3')).toBeInTheDocument();
      expect(getByText('col4')).toBeInTheDocument();
    });

    test('renders as many headers as numCols specifies', async () => {
      const { getByText, queryByText } = render(
        <TableSkeleton
          columnLabels={['col1', 'col2', 'col3', 'col4']}
          numCols={3}
        />,
      );
      expect(getByText('col1')).toBeInTheDocument();
      expect(getByText('col2')).toBeInTheDocument();
      expect(getByText('col3')).toBeInTheDocument();
      expect(queryByText('col4')).not.toBeInTheDocument();
    });

    test('empty strings render skeletons', async () => {
      const { getAllByRole } = render(
        <TableSkeleton columnLabels={['col1', '', 'col3', 'col4']} />,
      );
      const thead = getAllByRole('rowgroup')[0];
      const secondTh = within(thead).getAllByRole('columnheader')[1];
      expect(secondTh.querySelector('div')).toBeInTheDocument();
      expect(secondTh).toHaveTextContent('');
    });

    test('undefined renders skeletons', async () => {
      const { getAllByRole } = render(
        <TableSkeleton columnLabels={['col1', undefined, 'col3', 'col4']} />,
      );
      const thead = getAllByRole('rowgroup')[0];
      const secondTh = within(thead).getAllByRole('columnheader')[1];
      expect(secondTh.querySelector('div')).toBeInTheDocument();
      expect(secondTh).toHaveTextContent('');
    });
  });
});
