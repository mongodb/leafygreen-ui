import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { consoleOnce } from '@leafygreen-ui/lib';

import PaginationCurrentPageControls from './Navigation';

const onBackArrowClick = jest.fn();
const onForwardArrowClick = jest.fn();

let offsetParentSpy: jest.SpyInstance;

beforeAll(() => {
  offsetParentSpy = jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get');
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

describe('PaginationCurrentPageControls', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('page range display', () => {
    test('renders "1 of many" when numTotalItems is undefined', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of many',
      );
    });

    test('renders correct total pages', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={1021}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of 103',
      );
    });

    test('renders correct total pages when itemsPerPage changes', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={1021}
          itemsPerPage={50}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      expect(getByTestId('lg-pagination-page-range').textContent).toBe(
        '1 of 21',
      );
    });
  });

  describe('page select', () => {
    test('page select is not rendered by default', () => {
      const { queryByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      expect(
        queryByTestId('lg-pagination-page-select'),
      ).not.toBeInTheDocument();
    });

    test('page select is rendered with onCurrentPageOptionChange prop', () => {
      const { queryByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          onCurrentPageOptionChange={jest.fn()}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      expect(queryByTestId('lg-pagination-page-select')).toBeInTheDocument();
    });

    test('page select options are rendered correctly', async () => {
      const { getByTestId, queryByRole } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={30}
          itemsPerPage={10}
          onCurrentPageOptionChange={jest.fn()}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );

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

    test('calls onCurrentPageOptionChange when page is selected', async () => {
      const onCurrentPageOptionChange = jest.fn();
      const { getByTestId, queryByRole } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={30}
          itemsPerPage={10}
          onCurrentPageOptionChange={onCurrentPageOptionChange}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );

      const selectButton = getByTestId('lg-pagination-page-select');
      userEvent.click(selectButton);

      const listbox = await waitFor(() => {
        const listbox = queryByRole('listbox');
        expect(listbox).toBeVisible();
        return listbox as HTMLElement;
      });

      const option2 = getByText(listbox, '2');
      userEvent.click(option2);

      await waitFor(() => {
        expect(onCurrentPageOptionChange).toHaveBeenCalledWith(
          '2',
          expect.anything(),
        );
      });
    });
  });

  describe('back button', () => {
    test('is disabled on the first page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('is not disabled on a middle page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });

    test('is not disabled on the last page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={10}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });

    test('calls onBackArrowClick when clicked', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      fireEvent.click(backButton);
      expect(onBackArrowClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('forward button', () => {
    test('is not disabled on the first page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });

    test('is not disabled on a middle page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });

    test('is disabled on the last page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={10}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('calls onForwardArrowClick when clicked', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      fireEvent.click(nextButton);
      expect(onForwardArrowClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('shouldDisableBackArrow override', () => {
    test('true overrides correctly on first page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableBackArrow={true}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('true overrides correctly on middle page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableBackArrow={true}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('false overrides correctly on first page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={1}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableBackArrow={false}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const backButton = getByTestId('lg-pagination-back-button');
      expect(backButton.getAttribute('aria-disabled')).toBe('false');
    });
  });

  describe('shouldDisableForwardArrow override', () => {
    test('true overrides correctly on last page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={10}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableForwardArrow={true}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('true overrides correctly on middle page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableForwardArrow={true}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('true');
    });

    test('false overrides correctly on last page', () => {
      const { getByTestId } = render(
        <PaginationCurrentPageControls
          currentPage={10}
          numTotalItems={100}
          itemsPerPage={10}
          shouldDisableForwardArrow={false}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );
      const nextButton = getByTestId('lg-pagination-next-button');
      expect(nextButton.getAttribute('aria-disabled')).toBe('false');
    });
  });

  describe('validation', () => {
    let consoleOnceSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleOnceSpy = jest
        .spyOn(consoleOnce, 'error')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      consoleOnceSpy.mockRestore();
    });

    test('console errors when currentPage is less than 1', () => {
      render(
        <PaginationCurrentPageControls
          currentPage={0}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );

      expect(consoleOnceSpy).toHaveBeenCalledWith(
        `Value of the 'currentPage' prop is invalid.`,
      );
    });

    test('console errors when currentPage exceeds total pages', () => {
      render(
        <PaginationCurrentPageControls
          currentPage={15}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );

      expect(consoleOnceSpy).toHaveBeenCalledWith(
        `Value of the 'currentPage' prop is invalid.`,
      );
    });

    test('does not console error for valid currentPage', () => {
      render(
        <PaginationCurrentPageControls
          currentPage={5}
          numTotalItems={100}
          itemsPerPage={10}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />,
      );

      expect(consoleOnceSpy).not.toHaveBeenCalled();
    });
  });
});
