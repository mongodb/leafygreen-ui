import React from 'react';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { RowContextProvider } from '../Row/RowContext';
import useLeafyGreenTable, { LeafyGreenTableCell } from '../useLeafyGreenTable';
import { Person } from '../utils/makeData.testutils';
import {
  getDefaultTestColumns,
  getDefaultTestData,
} from '../utils/testHookCalls.testutils';

import { Cell, CellProps } from '.';

const onScroll = jest.fn();

const defaultProps: CellProps<unknown> = {
  onScroll,
};

/** Returns the first Cell from the first Row */
const useMockTestCellData = (): LeafyGreenTableCell<Person> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const table = useLeafyGreenTable({
    data: getDefaultTestData({}),
    columns: getDefaultTestColumns({}),
  });

  return table.getRowModel().rows[0].getVisibleCells()[0];
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

  describe('styled', () => {
    test('works with `styled`', () => {
      const StyledCell = styled(Cell)`
        color: #69ffc6;
      `;

      const { getByTestId } = render(
        <StyledCell data-testid="styled">Some text</StyledCell>,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }
      const StyledCell = styled(Cell)<StyledProps>`
        color: ${props => props.color};
      `;

      const { getByTestId } = render(
        <StyledCell data-testid="styled" color="#69ffc6">
          Some text
        </StyledCell>,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
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
      const { result } = renderHook(() => useMockTestCellData());
      const mockCell = result.current;

      const providerValue = {
        getIsExpanded: () => false,
        getCanExpand: () => false,
        toggleExpanded: () => {},
        depth: 1,
        disabled: false,
      };

      render(
        <RowContextProvider {...providerValue}>
          <Cell cell={mockCell} ref={ref}>
            Hello RT
          </Cell>
        </RowContextProvider>,
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello RT');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const { result } = renderHook(() => useMockTestCellData());
    const mockCell = result.current;
    const ref = React.createRef<HTMLTableCellElement>();

    <>
      <Cell />
      <Cell align="center" contentClassName="hey" cell={mockCell} />
      <Cell ref={ref} />
    </>;
  });
});
