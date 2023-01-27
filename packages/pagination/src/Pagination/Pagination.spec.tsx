import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Pagination, { PaginationProps } from '.';

function renderPagination(props: PaginationProps) {
  return render(<Pagination {...props} />);
}

const defaultProps: PaginationProps = {
  currentPage: 0,
  itemsPerPage: 10,
  itemsPerPageOptions: [10, 20, 30],
  onBackArrowClick: jest.fn(),
  onForwardArrowClick: jest.fn(),
}

describe('packages/pagination', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPagination(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
