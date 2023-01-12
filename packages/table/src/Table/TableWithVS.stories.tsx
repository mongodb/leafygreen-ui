import { storybookArgTypes } from '@leafygreen-ui/lib';
import { ComponentStory, Meta } from '@storybook/react';
import React, { Fragment, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  ExpandedState,
  HeaderGroup,
  Header,
} from '@tanstack/react-table';
import { Cell as TSCell, Row as TSRow } from '@tanstack/table-core';
import { makeData, Person } from '../makeData';
import Table from '../Table/Table';
import TableHead from '../TableHead/TableHead';
import HeaderRow from '../HeaderRow/HeaderRow';
import HeaderCell from '../HeaderCell/HeaderCell';
import TableContainer from '../TableContainer/TableContainer';
import TableBody from '../TableBody/TableBody';
import Row from '../Row/Row';
import Cell from '../Cell/Cell';
import useLeafygreenTable from '../useLeafygreenTable/useLeafygreenTable';
import { VirtualItem } from 'react-virtual';

export default {
  title: 'Components/Table/With Virtualized Scrolling',
  component: Table,
  argTypes: {
    children: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

export const BasicWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(false, 5000));

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
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
    ],
    [],
  );

  const table = useLeafygreenTable<Person>({
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
        <p>{table.virtualRows.length} virtual rows rendered</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                    >
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
          <TableBody table={table}>
            {table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              return (
                <Row key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
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
      </TableContainer>
    </>
  );
};

export const NestedRowsWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(false, 5000, 5, 3));
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

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
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
    ],
    [],
  );

  const table = useLeafygreenTable<Person>({
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
        <pre>Expanded rows: {JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                    >
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
          <TableBody table={table}>
            {table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {row.getVisibleCells().map((cell: TSCell<Person, any>) => {
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};


export const SortableRowsWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(false, 5000));
  const [sorting, setSorting] = React.useState<SortingState>([])

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
        header: () => <span>Last Name</span>,
        enableSorting: true,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
        enableSorting: true,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
    ],
    [],
  );

  const table = useLeafygreenTable<Person>({
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
        <p>{table.virtualRows.length} virtual rows rendered</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Person, any>) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                    >
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
          <TableBody table={table}>
            {table.virtualRows.map((virtualRow: VirtualItem) => {
              const row = rows[virtualRow.index];
              return (
                <Row key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
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
      </TableContainer>
    </>
  );
}

export const SelectableRowsWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(false, 5000));
  const [rowSelection, setRowSelection] = React.useState({})

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
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
    ],
    [],
  );

  const table = useLeafygreenTable<Person>({
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
        <p>{table.virtualRows.length} virtual rows rendered</p>
        <button
          onClick={() => console.info('rowSelection', rowSelection)}
        >
          Log rowSelection state
        </button>
        <button
          onClick={() =>
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows
            )
          }
        >
          Log table.getSelectedFlatRows()
        </button>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                    >
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
          <TableBody table={table}>
            {table.virtualRows.map((virtualRow: any) => {
              const row = rows[virtualRow.index];
              return (
                <Row key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
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
      </TableContainer>
    </>
  );
}

export const ExpandableContentWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(true, 5000));
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

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
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
    ],
    [],
  );

  const table = useLeafygreenTable<Person>({
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
        <p>{table.virtualRows.length} virtual rows rendered</p>
        <pre>Expanded rows: {JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                    >
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
          <TableBody table={table} renderingExpandableRows>
            {table.virtualRows.map((virtualRow: any) => {
              const row = rows[virtualRow.index];
              return (
                <Row key={row.id} row={row} virtualRow={virtualRow}>
                  {row.getVisibleCells().map((cell: TSCell<Person, any>) => {
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
