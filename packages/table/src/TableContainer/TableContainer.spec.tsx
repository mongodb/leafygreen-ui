import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import TableContainer, { TableContainerProps } from '.';

const onScroll = jest.fn();

const defaultProps: TableContainerProps = {
  onScroll,
};

function renderTableContainer(props: TableContainerProps) {
  return render(
    <TableContainer {...props} data-testid="lg-test-table-container" />,
  );
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
      const { getByTestId } = renderTableContainer({
        onScroll: onScroll,
        children: <div style={{ height: '4000px' }} />,
      });
      fireEvent.scroll(getByTestId('lg-test-table-container'), {
        target: { scrollY: 100 },
      });
      expect(onScroll).toHaveBeenCalledTimes(1);
    });
  });
});
