import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Cell, CellProps } from '.';

const onScroll = jest.fn();

const defaultProps: CellProps = {
  onScroll,
};

function renderCell(props: CellProps) {
  return render(
    <table>
      <tbody>
        <tr>
          <Cell {...props} data-testid="lg-test-cell" />
        </tr>
      </tbody>
    </table>,
  );
}

describe('packages/table/Cell', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderCell(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
