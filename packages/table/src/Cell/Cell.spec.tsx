import React from 'react';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RowContextProvider } from '../Row/RowContext';

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

  describe('styled', () => {
    test('works with `styled`', () => {
      const StyledCell = styled(Cell)`
        color: #69ffc6;
      `;

      const { getByTestId } = render(
        <StyledCell data-testid="styled">Some text</StyledCell>,
      );

      expect(getByTestId('styled')).toBeInTheDocument();
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
      expect(getByTestId('styled')).toBeInTheDocument();
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
      const cellObj = {
        id: '1',
        column: {
          getIsFirstColumn: () => false,
        },
      };

      const providerValue = {
        getIsExpanded: () => false,
        getCanExpand: () => false,
        toggleExpanded: () => {},
        depth: 1,
        disabled: false,
      };

      render(
        <RowContextProvider {...providerValue}>
          {/* @ts-expect-error - dummy cell data is missing properties */}
          <Cell cell={cellObj} ref={ref}>
            Hello RT
          </Cell>
        </RowContextProvider>,
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello RT');
    });
  });
});
