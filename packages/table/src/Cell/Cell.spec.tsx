import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Cell, CellProps } from '.';

const onScroll = jest.fn();

const defaultProps: CellProps<unknown> = {
  onScroll,
};

function renderCell(props: CellProps<unknown>) {
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

  describe('accepts a ref', () => {
    test('regular cell', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      render(<Cell ref={ref}>Hello</Cell>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello');
    });

    test('RT cell', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      const cellObj = {
        id: '1',
        row: {
          getIsExpanded: () => false,
          getCanExpand: () => false,
          toggleExpanded: () => {},
          depth: 1,
        },
        column: {
          getIsFirstColumn: () => false,
        },
      };

      render(
        // @ts-expect-error - dummy cell data is missing properties
        <Cell cell={cellObj} ref={ref}>
          Hello RT
        </Cell>,
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello RT');
    });
  });
});
