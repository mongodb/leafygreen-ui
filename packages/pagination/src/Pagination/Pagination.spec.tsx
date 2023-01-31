import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Pagination, { PaginationProps } from '.';

function renderPagination(props: PaginationProps) {
  return render(<Pagination {...props} data-testid="pagination-test" />);
}

const defaultProps: PaginationProps = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
  onItemsPerPageOptionChange: jest.fn(),
  onBackArrowClick: jest.fn(),
  onForwardArrowClick: jest.fn(),
};

describe('packages/pagination', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPagination(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('renders items per page select', () => {
    test('Default items per page select is rendered', async () => {
      const { getByTestId } = renderPagination(defaultProps);
      expect(
        getByTestId('leafygreen-ui-select-menubutton')
      ).toBeInTheDocument();
    });
    test('Default options are rendered', async () => {
      const { getByTestId, queryByRole } = renderPagination(defaultProps);
      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox;
      });

      expect(
        getByText(listbox, '10'),
      ).toBeInTheDocument();
      expect(
        getByText(listbox, '50'),
      ).toBeInTheDocument();
      expect(
        getByText(listbox, '100'),
      ).toBeInTheDocument();
    });
  });

  test('Custom options are rendered', async () => {
    const { getByTestId, queryByRole } = renderPagination({
      ...defaultProps,
      itemsPerPageOptions: [1,2,3]
    });
    const selectButton = getByTestId('leafygreen-ui-select-menubutton');
    userEvent.click(selectButton);

    const listbox = await waitFor(() => {
      const listbox = queryByRole('listbox');
      expect(listbox).toBeVisible();
      return listbox;
    });

    expect(
      getByText(listbox, '1'),
    ).toBeInTheDocument();
    expect(
      getByText(listbox, '2'),
    ).toBeInTheDocument();
    expect(
      getByText(listbox, '3'),
    ).toBeInTheDocument();
  });

  describe('renders correct item ranges', () => {
    test('Default "of many" is rendered in page range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        numTotalItems: undefined,
      });
      expect(
        getByTestId('lg-pagination-item-range').textContent
      ).toBe('1 - 10 of many');
    });

    test('Correct number of total items is rendered in item range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(
        getByTestId('lg-pagination-item-range').textContent
      ).toBe('1 - 10 of 1021 items');
    });

    test('Item range changed according to current page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      expect(
        getByTestId('lg-pagination-item-range').textContent
      ).toBe('11 - 20 of 1021 items');
    });

    test('Item range changed according to items per page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        itemsPerPage: 50,
      });
      expect(
        getByTestId('lg-pagination-item-range').textContent
      ).toBe('1 - 50 of 1021 items');
    });

    test('Item range changed according to current page and items per page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        itemsPerPage: 50,
      });
      expect(
        getByTestId('lg-pagination-item-range').textContent
      ).toBe('51 - 100 of 1021 items');
    });
  });

  describe('renders correct page ranges', () => {
    test('Default "1 of many" is rendered in page range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        numTotalItems: undefined,
      });
      expect(
        getByTestId('lg-pagination-page-range').textContent
      ).toBe('1 of many');
    });

    test('Correct number of total pages is rendered in item range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(
        getByTestId('lg-pagination-page-range').textContent
      ).toBe('1 of 103');
    });

    test('Page range select is not rendered by default', async () => {
      const { queryByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(
        queryByTestId('lg-pagination-page-select')
      ).not.toBeInTheDocument();
    });

    test('Page range select is rendered with onCurrentPageOptionChange prop', async () => {
      const { queryByTestId } = renderPagination({
        ...defaultProps,
        onCurrentPageOptionChange: jest.fn(),
      });
      expect(
        queryByTestId('lg-pagination-page-select')
      ).toBeInTheDocument();
    });
  });
});
