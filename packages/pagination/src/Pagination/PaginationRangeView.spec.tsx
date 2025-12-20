import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import PaginationRangeView from './PaginationRangeView';

describe('PaginationRangeView', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={1}
          numTotalItems={100}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('item range display', () => {
    test('renders "of many" when numTotalItems is undefined', () => {
      const { getByTestId } = render(
        <PaginationRangeView itemsPerPage={10} currentPage={1} />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of many',
      );
    });

    test('renders correct item range with numTotalItems', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={1}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of 1021 items',
      );
    });

    test('renders correct range for second page', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={2}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '11 - 20 of 1021 items',
      );
    });

    test('renders correct range for middle page', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={5}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '41 - 50 of 1021 items',
      );
    });

    test('renders correct range for last page with partial items', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={103}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1021 - 1021 of 1021 items',
      );
    });
  });

  describe('different itemsPerPage values', () => {
    test('renders correct range with 25 items per page', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={25}
          currentPage={1}
          numTotalItems={100}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 25 of 100 items',
      );
    });

    test('renders correct range with 50 items per page', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={50}
          currentPage={1}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 50 of 1021 items',
      );
    });

    test('renders correct range with 50 items per page on page 2', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={50}
          currentPage={2}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '51 - 100 of 1021 items',
      );
    });

    test('renders correct range with 100 items per page', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={100}
          currentPage={1}
          numTotalItems={1021}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 100 of 1021 items',
      );
    });
  });

  describe('default values', () => {
    test('uses default itemsPerPage when not provided', () => {
      const { getByTestId } = render(
        <PaginationRangeView currentPage={1} numTotalItems={100} />,
      );
      // Default is 10 from constants
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of 100 items',
      );
    });

    test('uses default currentPage when not provided', () => {
      const { getByTestId } = render(
        <PaginationRangeView itemsPerPage={10} numTotalItems={100} />,
      );
      // Default currentPage is 1
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of 100 items',
      );
    });
  });

  describe('edge cases', () => {
    test('handles small total items', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={1}
          numTotalItems={5}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 5 of 5 items',
      );
    });

    test('handles single item', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={1}
          numTotalItems={1}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 1 of 1 items',
      );
    });

    test('handles exact page boundary', () => {
      const { getByTestId } = render(
        <PaginationRangeView
          itemsPerPage={10}
          currentPage={10}
          numTotalItems={100}
        />,
      );
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '91 - 100 of 100 items',
      );
    });
  });
});
