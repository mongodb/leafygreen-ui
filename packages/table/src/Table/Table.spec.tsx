import React from 'react';
import styled from '@emotion/styled';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import useLeafyGreenTable, {
  LeafyGreenTable,
  LeafyGreenTableRow,
} from '../useLeafyGreenTable';
import useLeafyGreenVirtualTable from '../useLeafyGreenVirtualTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import {
  getDefaultTestColumns,
  getDefaultTestData,
  TestTableWithHookProps,
  useTestHookCall,
} from '../utils/testHookCalls.testutils';

import Table from '.';

const RenderTable = ({ table }: { table: LeafyGreenTable<any> }) => {
  return (
    <Table table={table}>
      <TableHead isSticky>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <HeaderCell key={header.id} header={header}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </HeaderCell>
              );
            })}
          </HeaderRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row: LeafyGreenTableRow<Person>) => {
          return (
            <Row key={row.id} row={row}>
              {row.getVisibleCells().map(cell => {
                return (
                  <Cell key={cell.id} cell={cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

function TableWithHook({ ...props }: TestTableWithHookProps) {
  const { table, rowSelection } = useTestHookCall(props);

  return (
    <>
      <div data-testid="row-selection-value">
        {JSON.stringify(rowSelection)}
      </div>
      <RenderTable table={table} />
    </>
  );
}

describe('packages/table/Table', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Table />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('selectable rows', () => {
    test('renders checkboxes with select all checkbox ', async () => {
      const { getAllByRole } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const data = getDefaultTestData({});
      // +1 for the header row checkbox
      expect(getAllByRole('checkbox').length).toBe(data.length + 1);
    });

    test('renders checkboxes without select all checkbox ', async () => {
      const { getAllByRole } = render(
        <TableWithHook
          hookProps={{ hasSelectableRows: true, allowSelectAll: false }}
        />,
      );
      const data = getDefaultTestData({});
      expect(getAllByRole('checkbox').length).toBe(data.length);
    });

    test('clicking checkbox adds row index to rowSelection state', async () => {
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const { getRowByIndex } = getTestUtils();
      const firstCheckbox = getRowByIndex(0)?.getCheckbox();
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value').textContent).toBe('{"0":true}');
    });

    test('clicking selected checkbox removes row index from rowSelection state', async () => {
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );
      const { getRowByIndex } = getTestUtils();
      let firstCheckbox = getRowByIndex(0)?.getCheckbox();
      expect(getByTestId('row-selection-value').textContent).toBe('{}');
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value')).toHaveTextContent(
        '{"0":true}',
      );
      firstCheckbox = getRowByIndex(0)?.getCheckbox();
      userEvent.click(firstCheckbox!, {}, { skipPointerEventsCheck: true });
      expect(getByTestId('row-selection-value')).toHaveTextContent('{}');
    });

    test('clicking the header checkbox updates rowSelection state with all rows selected', async () => {
      const { getByTestId } = render(
        <TableWithHook hookProps={{ hasSelectableRows: true }} />,
      );

      const { getSelectAllCheckbox } = getTestUtils();
      const headerCheckbox = getSelectAllCheckbox();
      userEvent.click(headerCheckbox!, {}, { skipPointerEventsCheck: true });

      expect(getByTestId('row-selection-value').textContent).toBe(
        '{"0":true,"1":true,"2":true}',
      );
    });
  });

  describe('sortable rows', () => {
    test('renders sort icon', async () => {
      render(<TableWithHook columnProps={{ enableSorting: true }} />);
      const { getHeaderByIndex } = getTestUtils();
      expect(getHeaderByIndex(0)?.getSortIcon()).toBeInTheDocument();
    });

    test('clicking sort icon toggles icon', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );

      const { getHeaderByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      expect(sortIconButton).toBeInTheDocument();
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
    });

    test('clicking sort icon renders highest id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent('3');
    });

    test('clicking sort icon twice renders lowest id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Sort Ascending Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent('1');
    });

    test('clicking sort icon thrice renders the initial id at the top', async () => {
      const { getByLabelText } = render(
        <TableWithHook columnProps={{ enableSorting: true }} />,
      );
      const { getHeaderByIndex, getRowByIndex } = getTestUtils();
      const sortIconButton = getHeaderByIndex(0)?.getSortIcon();
      const initialFirstId = getRowByIndex(0)?.getAllCells()[0].textContent;
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      userEvent.click(sortIconButton!, {}, { skipPointerEventsCheck: true });
      expect(getByLabelText('Unsorted Icon')).toBeInTheDocument();
      const firstCell = getRowByIndex(0)?.getAllCells()[0];
      expect(firstCell).toHaveTextContent(initialFirstId!);
    });
  });

  describe('column visibility', () => {
    test('renders the correct cells in a row by default', () => {
      const data = getDefaultTestData({}) || [];
      const columns = getDefaultTestColumns({}) || [];

      const tableResult = renderHook(() =>
        useLeafyGreenTable<any>({
          data,
          columns,
        }),
      );

      const table = tableResult.result.current;
      render(<RenderTable table={table} />);

      const { getRowByIndex } = getTestUtils();
      expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
    });

    test('renders the correct cells after toggling a cells visibility to hidden', () => {
      const data = getDefaultTestData({}) || [];
      const columns = getDefaultTestColumns({}) || [];

      const tableResult = renderHook(() =>
        useLeafyGreenTable<any>({
          data,
          columns,
        }),
      );

      const table = tableResult.result.current;
      const { rerender: rerenderTable } = render(<RenderTable table={table} />);

      const { getRowByIndex } = getTestUtils();
      const allRowCells = () => getRowByIndex(0)?.getAllCells();

      expect(allRowCells()).toHaveLength(6);

      const columnToHide = table.getAllColumns()[0];

      // Toggle the visibility of the first column to hidden
      act(() => columnToHide.toggleVisibility());
      tableResult.rerender();
      rerenderTable(<RenderTable table={table} />);

      expect(allRowCells()).toHaveLength(5);
    });

    test('renders the correct cells after toggling a cells visibility back to visible', () => {
      const data = getDefaultTestData({}) || [];
      const columns = getDefaultTestColumns({}) || [];

      const tableResult = renderHook(() =>
        useLeafyGreenTable<any>({
          data,
          columns,
        }),
      );

      const table = tableResult.result.current;
      const { rerender: rerenderTable } = render(<RenderTable table={table} />);

      const { getRowByIndex } = getTestUtils();
      const allRowCells = () => getRowByIndex(0)?.getAllCells();

      expect(allRowCells()).toHaveLength(6);

      const columnToHide = table.getAllColumns()[0];

      // Toggle the visibility of the first column to hidden
      act(() => columnToHide.toggleVisibility());
      tableResult.rerender();
      rerenderTable(<RenderTable table={table} />);

      expect(allRowCells()).toHaveLength(5);

      // Toggle the visibility of the first column back to visible
      act(() => columnToHide.toggleVisibility());
      tableResult.rerender();
      rerenderTable(<RenderTable table={table} />);

      expect(allRowCells()).toHaveLength(6);
    });
  });

  test('Accepts a ref', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<Table ref={ref}>Hello</Table>);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });

  describe('styled', () => {
    test('works with `styled`', () => {
      const StyledTable = styled(Table)`
        table {
          color: #69ffc6;
        }
      `;

      const { getByTestId } = render(
        <StyledTable data-testid="styled">Some text</StyledTable>,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }
      const StyledTable = styled(Table)<StyledProps>`
        table {
          color: ${props => props.color};
        }
      `;

      const { getByTestId } = render(
        <StyledTable data-testid="styled" color="#69ffc6">
          Some text
        </StyledTable>,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const ref = React.createRef<HTMLTableElement>();

    const { result: tableResults } = renderHook(() =>
      useLeafyGreenTable<any>({
        data: [],
        columns: [
          {
            accessorKey: 'id',
            size: 700,
          },
        ],
      }),
    );

    const { result: virtualTableResults } = renderHook(() =>
      useLeafyGreenVirtualTable<any>({
        containerRef: React.createRef<HTMLDivElement>(),
        data: [],
        columns: [
          {
            accessorKey: 'id',
            size: 700,
          },
        ],
      }),
    );

    <>
      <Table />
      <Table ref={ref} />
      <Table
        ref={ref}
        shouldAlternateRowColor={true}
        darkMode={true}
        shouldTruncate={true}
        verticalAlignment="top"
        baseFontSize={13}
      />
      <Table table={tableResults.current} />
      <Table table={virtualTableResults.current} />
    </>;
  });
});
