import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CollectionToolbarProvider } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';
import { getTestUtils } from '../../../testing/getTestUtils';
import { getLgIds } from '../../../utils';

import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.types';

const defaultProps = {
  currentPage: 1,
  numTotalItems: 100,
  itemsPerPage: 10,
  onBackArrowClick: jest.fn(),
  onForwardArrowClick: jest.fn(),
};

const renderPagination = (props?: Partial<PaginationProps>) => {
  const lgIds = getLgIds();
  return render(
    <CollectionToolbarProvider lgIds={lgIds}>
      <Pagination {...defaultProps} {...props} />
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Actions/Pagination', () => {
  describe('rendering', () => {
    test('renders PaginationNavigation component', () => {
      renderPagination();
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    });

    test('displays current page information', () => {
      renderPagination({ currentPage: 3 });
      expect(screen.getByText('3 of 10')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    test('applies className prop with styles', () => {
      renderPagination({ className: 'custom-class' });
      const { getPagination } = getTestUtils();

      expect(getPagination()).toHaveClass('custom-class');
    });

    test('forwards currentPage prop', () => {
      renderPagination({ currentPage: 5 });
      expect(screen.getByText('5 of 10')).toBeInTheDocument();
    });

    test('forwards numTotalItems prop', () => {
      renderPagination({ numTotalItems: 50, itemsPerPage: 10 });
      // With 50 items and 10 per page, there should be 5 pages
      expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    test('calls onBackArrowClick when back arrow is clicked', async () => {
      const handleBackClick = jest.fn();
      renderPagination({
        currentPage: 2,
        onBackArrowClick: handleBackClick,
      });

      const backButton = screen.getByLabelText('Previous page');
      await userEvent.click(backButton);

      expect(handleBackClick).toHaveBeenCalledTimes(1);
    });

    test('calls onForwardArrowClick when forward arrow is clicked', async () => {
      const handleForwardClick = jest.fn();
      renderPagination({
        currentPage: 1,
        onForwardArrowClick: handleForwardClick,
      });

      const forwardButton = screen.getByLabelText('Next page');
      await userEvent.click(forwardButton);

      expect(handleForwardClick).toHaveBeenCalledTimes(1);
    });

    test('back arrow is disabled on first page', () => {
      renderPagination({ currentPage: 1 });
      const backButton = screen.getByLabelText('Previous page');
      expect(backButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('forward arrow is disabled on last page', () => {
      renderPagination({
        currentPage: 10,
        numTotalItems: 100,
        itemsPerPage: 10,
      });
      const forwardButton = screen.getByLabelText('Next page');
      expect(forwardButton).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(
        Pagination[CollectionToolbarActionsSubComponentProperty.Pagination],
      ).toBe(true);
    });
  });
});
