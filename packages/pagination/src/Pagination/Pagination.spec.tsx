import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Pagination, { PaginationProps } from '.';

function renderPagination(props: PaginationProps) {
  return render(<Pagination {...props} data-testid="pagination-test" />);
}

const onBackArrowClick = jest.fn();
const onForwardArrowClick = jest.fn();

const defaultProps: PaginationProps = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
  onItemsPerPageOptionChange: jest.fn(),
  onBackArrowClick: onBackArrowClick,
  onForwardArrowClick: onForwardArrowClick,
};

let offsetParentSpy: jest.SpyInstance;

beforeAll(() => {
  offsetParentSpy = jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get');

  // JSDOM doesn't implement `HTMLElement.prototype.offsetParent`, so this
  // falls back to the parent element since it doesn't matter for these tests.
  offsetParentSpy.mockImplementation(function (this: HTMLElement) {
    return this.parentElement;
  });
});

afterAll(() => {
  offsetParentSpy.mockRestore();
});

describe('packages/pagination', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPagination(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('only accepts correct prop values', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(
      () =>
        (consoleSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {})),
    );

    afterEach(() => jest.clearAllMocks());

    test('console errors when itemsPerPage is not a valid option', async () => {
      render(
        <Pagination
          {...defaultProps}
          itemsPerPageOptions={[1, 2, 3]}
          itemsPerPage={22}
        />,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
    test('console errors when currentPage is less than 1', async () => {
      renderPagination({ ...defaultProps, currentPage: 0 });
      expect(consoleSpy).toHaveBeenCalled();
    });

    test('console errors when currentPage is greater than the total number of pages', async () => {
      renderPagination({ ...defaultProps, currentPage: 150 });
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('renders items per page select', () => {
    test('Default items per page select is rendered', async () => {
      const { getByTestId } = renderPagination(defaultProps);
      expect(
        getByTestId('leafygreen-ui-select-menubutton'),
      ).toBeInTheDocument();
    });
    test('Default options are rendered', async () => {
      const { getByTestId, queryByRole } = renderPagination(defaultProps);
      const selectButton = getByTestId('leafygreen-ui-select-menubutton');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      expect(getByText(listbox, '10')).toBeInTheDocument();
      expect(getByText(listbox, '50')).toBeInTheDocument();
      expect(getByText(listbox, '100')).toBeInTheDocument();
    });
  });

  test('Custom options are rendered', async () => {
    const { getByTestId, queryByRole } = renderPagination({
      ...defaultProps,
      itemsPerPageOptions: [1, 2, 3],
    });
    const selectButton = getByTestId('leafygreen-ui-select-menubutton');
    userEvent.click(selectButton);

    const listbox = await waitFor(() => {
      const listbox = queryByRole('listbox');
      expect(listbox).toBeVisible();
      return listbox as HTMLElement;
    });

    expect(getByText(listbox, '1')).toBeInTheDocument();
    expect(getByText(listbox, '2')).toBeInTheDocument();
    expect(getByText(listbox, '3')).toBeInTheDocument();
  });

  describe('renders correct item ranges', () => {
    test('Default "of many" is rendered in page range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        numTotalItems: undefined,
      });
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of many',
      );
    });

    test('Correct number of total items is rendered in item range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 10 of 1021 items',
      );
    });

    test('Item range changed according to current page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '11 - 20 of 1021 items',
      );
    });

    test('Item range changed according to items per page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        itemsPerPage: 50,
      });
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '1 - 50 of 1021 items',
      );
    });

    test('Item range changed according to current page and items per page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        itemsPerPage: 50,
      });
      expect(getByTestId('lg-pagination-item-range').textContent).toBe(
        '51 - 100 of 1021 items',
      );
    });
  });

  describe('renders correct page ranges', () => {
    test('Default "1 of many" is rendered in page range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        numTotalItems: undefined,
      });
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of many',
      );
    });

    test('Correct number of total pages is rendered in item range text', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of 103',
      );
    });

    test('Correct number of total pages is rendered in item range text when itemsPerPage changes', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        itemsPerPage: 50,
      });
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of 21',
      );
    });

    test('Page range select is not rendered by default', async () => {
      const { queryByTestId } = renderPagination({
        ...defaultProps,
      });
      expect(
        queryByTestId('lg-pagination-page-select'),
      ).not.toBeInTheDocument();
    });

    test('Page range select is rendered with onCurrentPageOptionChange prop', async () => {
      const { queryByTestId } = renderPagination({
        ...defaultProps,
        onCurrentPageOptionChange: jest.fn(),
      });
      expect(queryByTestId('lg-pagination-page-select')).toBeInTheDocument();
    });

    test('Page range options are rendered', async () => {
      const { getByTestId, queryByRole } = renderPagination({
        ...defaultProps,
        onCurrentPageOptionChange: jest.fn(),
      });
      const selectButton = getByTestId('lg-pagination-page-select');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      expect(getByText(listbox, '1')).toBeInTheDocument();
      expect(getByText(listbox, '2')).toBeInTheDocument();
      expect(getByText(listbox, '3')).toBeInTheDocument();
    });
  });
  describe('only disables arrow buttons when appropriate', () => {
    test('Back button is disabled on the first page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 1,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('Back button is not disabled on a middle page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('Back button is not disabled on the last page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('Next button is not disabled on the first page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 1,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('Next button is not disabled on a middle page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('Next button is disabled on the last page', async () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });
  });
  describe('clicking arrow buttons calls functions', () => {
    test('onBackArrowClick fires once when the back button is clicked', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      fireEvent.click(backButton);
      expect(onBackArrowClick).toHaveBeenCalledTimes(1);
    });
    test('onForwardArrowClick fires once when the back button is clicked', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      fireEvent.click(nextButton);
      expect(onForwardArrowClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('shouldDisableBackButton overrides default behavior', () => {
    test('value of true overrides correctly on first page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        shouldDisableBackArrow: true,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of true overrides correctly on middle page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        shouldDisableBackArrow: true,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of true overrides correctly on last page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
        shouldDisableBackArrow: true,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of false overrides correctly on first page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        shouldDisableBackArrow: false,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('value of false overrides correctly on middle page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        shouldDisableBackArrow: false,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('value of false overrides correctly on last page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
        shouldDisableBackArrow: false,
      });
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
  });
  describe('shouldDisableForwardButton overrides default behavior', () => {
    test('value of true overrides correctly on first page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        shouldDisableForwardArrow: true,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of true overrides correctly on middle page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        shouldDisableForwardArrow: true,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of true overrides correctly on last page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
        shouldDisableForwardArrow: true,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });
    test('value of false overrides correctly on first page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        shouldDisableForwardArrow: false,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('value of false overrides correctly on middle page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 2,
        shouldDisableForwardArrow: false,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
    test('value of false overrides correctly on last page', () => {
      const { getByTestId } = renderPagination({
        ...defaultProps,
        currentPage: 103,
        shouldDisableForwardArrow: false,
      });
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
  });
});
