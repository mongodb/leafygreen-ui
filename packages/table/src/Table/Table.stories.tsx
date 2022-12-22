import { storybookArgTypes } from '@leafygreen-ui/lib';
import { ComponentStory, Meta } from '@storybook/react';
import React, { Fragment } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  ExpandedState,
} from '@tanstack/react-table';
import { Cell as TSCell } from '@tanstack/table-core';
import { makeData, Person } from '../makeData';
import Table from '../Table/Table';
import TableHead from '../TableHead/TableHead';
import HeaderRow from '../HeaderRow/HeaderRow';
import HeaderCell from '../HeaderCell/HeaderCell';
import TableContainer from '../TableContainer/TableContainer';
import TableBody from '../TableBody/TableBody';
import Row from '../Row/Row';
import Cell from '../Cell/Cell';
import ExpandableContent from '../ExpandableContent/ExpandableContent';
import useLeafygreenTable from '../useLeafygreenTable';
import { css } from '@leafygreen-ui/emotion';
import { TableOptions, useReactTable } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

export default {
  title: 'Components/TableNew',
  component: Table,
  argTypes: {
    children: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => {
  const data = makeData(100);
  return (
    <Table {...args}>
      <TableHead>
        <HeaderRow>
          {Object.keys(data[0]).map((columnName: any) => (
            <HeaderCell key={columnName} columnName={columnName} />
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {data.map((row: any) => (
          <Row>
            {Object.keys(row).map((cellKey: string, index: number) => {
              return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
            })}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export const Basic = Template.bind({});
export const ZebraStripes = Template.bind({});
ZebraStripes.args = {
  shouldAlternateRowColor: true,
};

export const BasicWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(5000));

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
                      columnName={header.column.columnDef.header}
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
};

export const ZebraStripesWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(5000));

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
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <p>{table.virtualRows.length} virtual rows rendered</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table shouldAlternateRowColor>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      columnName={header.column.columnDef.header}
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
};

export const NestedRowsWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(5000, 5, 3));
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
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <p>{table.virtualRows.length} virtual rows rendered</p>
        <pre>{JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table shouldAlternateRowColor>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      columnName={header.column.columnDef.header}
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