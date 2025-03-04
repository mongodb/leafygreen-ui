import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { flexRender } from '@tanstack/react-table';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { Cell } from '../Cell';
import { Row } from '../Row';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import {
  useMockTestRowData,
  useTestHookCall,
} from '../utils/testHookCalls.testutils';
import { Table } from '..';

import ExpandedContent from './ExpandedContent';

const RowWithExpandableContent = args => {
  const { table } = useTestHookCall({
    rowProps: {
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    },
  });

  return (
    <div>
      <Table table={table} {...args}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return <th key={header.id}>TH {i}</th>;
              })}
            </tr>
          ))}
        </thead>
        <TableBody>
          {table.getRowModel().rows.map((row: LeafyGreenTableRow<Person>) => {
            const isExpandedContent = row.isExpandedContent ?? false;
            return (
              <Fragment key={row.id}>
                {!isExpandedContent && (
                  <Row row={row}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <Cell key={cell.id} cell={cell}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Cell>
                      );
                    })}
                  </Row>
                )}
                {isExpandedContent && <ExpandedContent row={row} />}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

describe('packages/table/Row/ExpandableContent', () => {
  test('renders the correct number of cell children', () => {
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
  });
  test('rows with expandable content render expand icon button', async () => {
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getExpandButton()).toHaveAttribute(
      'aria-label',
      'Expand row',
    );
  });

  test('clicking expand icon button renders collapse button and expanded content', async () => {
    const { queryByText } = render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();

    const toggleRowButton = getRowByIndex(0)?.getExpandButton();
    expect(toggleRowButton).toHaveAttribute('aria-label', 'Expand row');
    expect(queryByText('Expandable content test')).not.toBeInTheDocument();

    userEvent.click(toggleRowButton!);
    expect(toggleRowButton).toHaveAttribute('aria-label', 'Collapse row');
    expect(queryByText('Expandable content test')).toBeInTheDocument();
  });

  test('Accepts a ref', () => {
    const ref = React.createRef<HTMLTableRowElement>();

    const rowObj = {
      id: '1',
      getVisibleCells: () => ({
        length: 1,
      }),
      original: {
        renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
          return <>Hello</>;
        },
      },
    };
    render(
      // @ts-expect-error - dummy row data is missing properties
      <ExpandedContent row={rowObj} ref={ref}>
        Hello
      </ExpandedContent>,
    );

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });

  describe('styled', () => {
    test('works with `styled`', () => {
      const { result } = renderHook(() => useMockTestRowData());
      const mockRow = result.current.firstRow;

      const StyledExpandedContent = styled(ExpandedContent)`
        color: #69ffc6;
      ` as typeof ExpandedContent;

      const { getByTestId } = render(
        <StyledExpandedContent row={mockRow} data-testid="styled" />,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }
      const { result } = renderHook(() => useMockTestRowData());
      const mockRow = result.current.firstRow;

      const StyledExpandedContent = styled(ExpandedContent)<StyledProps>`
        color: ${props => props.color};
      ` as typeof ExpandedContent;

      const { getByTestId } = render(
        <StyledExpandedContent
          data-testid="styled"
          row={mockRow}
          color="#69ffc6"
        />,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const { result } = renderHook(() => useMockTestRowData());
    const { firstRow, firstVirtualRow } = result.current;
    const ref = React.createRef<HTMLTableRowElement>();

    <>
      {/* @ts-expect-error - row is missing */}
      <ExpandedContent />

      <ExpandedContent row={firstRow} />
      <ExpandedContent row={firstRow} ref={ref} />

      <ExpandedContent row={firstRow} virtualRow={firstVirtualRow} />
      <ExpandedContent row={firstRow} virtualRow={firstVirtualRow} ref={ref} />
    </>;
  });
});
