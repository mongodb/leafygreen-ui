import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { DEFAULT_LGID_ROOT, getLgIds } from './getLgIds';
import { Pagination, type PaginationProps } from '.';

function renderPagination(props: PaginationProps) {
  return render(<Pagination {...props} data-testid="pagination-test" />);
}

const onBackArrowClick = jest.fn();
const onForwardArrowClick = jest.fn();
const onItemsPerPageOptionChange = jest.fn();

const defaultProps: PaginationProps = {
  numTotalItems: 1021,
  itemsPerPageOptions: [10, 50, 100],
  onItemsPerPageOptionChange,
  onBackArrowClick,
  onForwardArrowClick,
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

afterEach(() => {
  jest.clearAllMocks();
});

describe('packages/pagination', () => {
  describe('Pagination component', () => {
    describe('a11y', () => {
      test('does not have basic accessibility issues', async () => {
        const { container } = renderPagination(defaultProps);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe('renders correctly', () => {
      test('renders all pagination sections', () => {
        const { getByTestId, getByText } = renderPagination(defaultProps);

        // Items per page section
        expect(getByText('Items per page:')).toBeInTheDocument();
        expect(
          getByTestId('leafygreen-ui-select-menubutton'),
        ).toBeInTheDocument();

        // Range view section
        expect(getByTestId('lg-pagination-item-range')).toBeInTheDocument();

        // Current page controls section
        expect(getByTestId('lg-pagination-page-range')).toBeInTheDocument();
        expect(getByTestId('lg-pagination-back-button')).toBeInTheDocument();
        expect(getByTestId('lg-pagination-next-button')).toBeInTheDocument();
      });

      test('applies custom className', () => {
        const { getByTestId } = renderPagination({
          ...defaultProps,
          className: 'custom-class',
        });
        expect(getByTestId('pagination-test')).toHaveClass('custom-class');
      });

      test('spreads rest props to container', () => {
        const { getByTestId } = renderPagination({
          ...defaultProps,
          'aria-label': 'Pagination navigation',
        } as PaginationProps);
        expect(getByTestId('pagination-test')).toHaveAttribute(
          'aria-label',
          'Pagination navigation',
        );
      });
    });

    describe('darkMode prop', () => {
      test('renders in light mode by default', () => {
        const { getByTestId } = renderPagination(defaultProps);
        expect(getByTestId('pagination-test')).toBeInTheDocument();
      });

      test('renders in dark mode when darkMode prop is true', () => {
        const { getByTestId } = renderPagination({
          ...defaultProps,
          darkMode: true,
        });
        expect(getByTestId('pagination-test')).toBeInTheDocument();
      });
    });

    describe('integration tests', () => {
      test('items per page select works correctly', async () => {
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

      test('clicking back button calls onBackArrowClick', () => {
        const { getByTestId } = renderPagination({
          ...defaultProps,
          currentPage: 2,
        });
        const backButton = getByTestId('lg-pagination-back-button');
        fireEvent.click(backButton);
        expect(onBackArrowClick).toHaveBeenCalledTimes(1);
      });

      test('clicking forward button calls onForwardArrowClick', () => {
        const { getByTestId } = renderPagination({
          ...defaultProps,
          currentPage: 2,
        });
        const nextButton = getByTestId('lg-pagination-next-button');
        fireEvent.click(nextButton);
        expect(onForwardArrowClick).toHaveBeenCalledTimes(1);
      });

      test('does not render PaginationItemsPerPage when onItemsPerPageOptionChange is not provided', () => {
        const { queryByText, queryByTestId } = renderPagination({
          numTotalItems: 1021,
          itemsPerPageOptions: [10, 50, 100],
          onBackArrowClick,
          onForwardArrowClick,
        });

        expect(queryByText('Items per page:')).not.toBeInTheDocument();
        expect(
          queryByTestId('leafygreen-ui-select-menubutton'),
        ).not.toBeInTheDocument();
      });
    });

    describe('lgid props', () => {
      const defaultLgIds = getLgIds();

      test('renders default lgid values when data-lgid is not provided', () => {
        const { getByTestId } = render(<Pagination {...defaultProps} />);

        expect(getByTestId(defaultLgIds.root)).toBeInTheDocument();
        expect(getByTestId(defaultLgIds.pageSize)).toBeInTheDocument();
        expect(getByTestId(defaultLgIds.summary)).toBeInTheDocument();
        expect(getByTestId(defaultLgIds.navigation)).toBeInTheDocument();
      });

      test('renders default data-lgid attributes when data-lgid is not provided', () => {
        const { getByTestId } = render(<Pagination {...defaultProps} />);

        expect(getByTestId(defaultLgIds.root)).toHaveAttribute(
          'data-lgid',
          DEFAULT_LGID_ROOT,
        );
        expect(getByTestId(defaultLgIds.pageSize)).toHaveAttribute(
          'data-lgid',
          `${DEFAULT_LGID_ROOT}-page_size`,
        );
        expect(getByTestId(defaultLgIds.summary)).toHaveAttribute(
          'data-lgid',
          `${DEFAULT_LGID_ROOT}-summary`,
        );
        expect(getByTestId(defaultLgIds.navigation)).toHaveAttribute(
          'data-lgid',
          `${DEFAULT_LGID_ROOT}-navigation`,
        );
      });

      test('renders custom lgid values when data-lgid is provided', () => {
        const customLgId = 'lg-my-pagination';
        const customLgIds = getLgIds(customLgId);
        const { getByTestId } = render(
          <Pagination {...defaultProps} data-lgid={customLgId} />,
        );

        expect(getByTestId(customLgIds.root)).toBeInTheDocument();
      });

      test('renders custom data-lgid attributes when data-lgid is provided', () => {
        const customLgId = 'lg-my-pagination';
        const customLgIds = getLgIds(customLgId);
        const { getByTestId } = render(
          <Pagination {...defaultProps} data-lgid={customLgId} />,
        );

        expect(getByTestId(customLgIds.root)).toHaveAttribute(
          'data-lgid',
          customLgId,
        );
      });
    });
  });
});
