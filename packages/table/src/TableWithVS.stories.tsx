import React from 'react';
import { VirtualItem } from 'react-virtual';
import { ComponentStory, Meta } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import ExpandedContent from './ExpandedContent/ExpandedContent';
import TableBody from './TableBody/TableBody';
import TableHead from './TableHead/TableHead';
import { makeData, Person } from './utils/makeData';
import { Cell, HeaderCell } from './Cell';
import { HeaderRow, Row } from './Row';
import Table from './Table';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
} from './useLeafyGreenTable';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  HeaderGroup,
  SortingState,
} from '.';

export default {
  title: 'Components/Table/With Virtualized Scrolling',
  component: Table,
  argTypes: {
    children: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
  // This is needed as a workaround to make arg spreading performant
  // https://github.com/storybookjs/storybook/issues/11657
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
} as Meta<typeof Table>;

export const Basic: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000))[0];

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    useVirtualScrolling: true,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <p>{table?.virtualRows?.length} virtual rows</p>
      </div>

      <Table {...args} table={table} ref={tableContainerRef}>
        <TableHead>
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
          {table.virtualRows &&
            table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              const cells = row.getVisibleCells();
              return (
                <Row key={row.id}>
                  {cells.map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export const NestedRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000, 5, 3))[0];

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: row => row.subRows,
    useVirtualScrolling: true,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table {...args} table={table} ref={tableContainerRef}>
        <TableHead>
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
          {table.virtualRows &&
            table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              const cells = row.getVisibleCells();

              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {cells.map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                  {row.subRows &&
                    row.subRows.map((subRow: LeafyGreenTableRow<Person>) => (
                      <Row key={subRow.id} row={subRow} virtualRow={virtualRow}>
                        {subRow
                          .getVisibleCells()
                          .map((cell: LeafyGreenTableCell<Person>) => {
                            return (
                              <Cell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </Cell>
                            );
                          })}
                        {subRow.subRows &&
                          subRow.subRows.map(subSubRow => (
                            <Row
                              key={subSubRow.id}
                              row={subSubRow}
                              virtualRow={virtualRow}
                            >
                              {subSubRow
                                .getVisibleCells()
                                .map((cell: LeafyGreenTableCell<Person>) => {
                                  return (
                                    <Cell key={cell.id}>
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                      )}
                                    </Cell>
                                  );
                                })}
                            </Row>
                          ))}
                      </Row>
                    ))}
                </Row>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export const SortableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000))[0];
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
        enableSorting: true,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
        enableSorting: true,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
        enableSorting: true,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    useVirtualScrolling: true,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table {...args} table={table} ref={tableContainerRef}>
        <TableHead>
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
          {table.virtualRows &&
            table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              const cells = row.getVisibleCells();

              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {cells.map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export const SelectableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000))[0];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    hasSelectableRows: true,
    getCoreRowModel: getCoreRowModel(),
    useVirtualScrolling: true,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        {/* <button
          onClick={
            // eslint-disable-next-line no-console
            () => console.info('rowSelection', rowSelection)
          }
        >
          Log rowSelection state
        </button> */}
        {/* <button
          onClick={() =>
            // eslint-disable-next-line no-console
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows,
            )
          }
        >
          Log table.getSelectedFlatRows()
        </button> */}
      </div>

      <Table {...args} table={table} ref={tableContainerRef}>
        <TableHead>
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
          {table.virtualRows &&
            table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              const cells = row.getVisibleCells();

              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {cells.map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export const ExpandableContent: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(true, 5000))[0];
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
    useVirtualScrolling: true,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table {...args} table={table} ref={tableContainerRef}>
        <TableHead>
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
          {table.virtualRows &&
            table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              const cells = row.getVisibleCells();

              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {cells.map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                  {row.original.renderExpandedContent && (
                    <ExpandedContent row={row} />
                  )}
                </Row>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};
