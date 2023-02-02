import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import TableContainer, { TableContainerProps } from ".";

const onScroll = jest.fn();

const defaultProps: TableContainerProps = {
  onScroll,
};

function renderTableContainer(props: TableContainerProps) {
  return render(<TableContainer {...props} data-testid="table-container-test" />);
}

describe('packages/table/TableContainer', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTableContainer(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('onScroll prop', () => {
    test('onScroll prop is called on scroll', async () => {
      const { container } = render(
        <TableContainer>
          <div style={{ height: '100px' }} />
        </TableContainer>
      );
      let onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 100 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);
    });
  });
});