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
import useLeafygreenTable from '../useLeafygreenTable';
import ExpandedContent from '../ExpandedContent/ExpandedContent';

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
  const data = makeData(false, 100);
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

export const NestedRows = () => {
  const data = makeData(false, 100, 3, 2);
  const columns = Object.keys(data[0]).filter(x => x !== 'subRows')
  return (
    <Table>
      <TableHead>
        <HeaderRow>
          {columns.map((columnName: string) => (
            <HeaderCell key={columnName} columnName={columnName} />
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {data.map((row: any) => (
          <Row>
            {columns.map((cellKey: string, index: number) => {
              return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
            })}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export const Sortable = () => {
  return <>TODO</>
}

export const Selectable = () => {
  return <>TODO</>
}

export const ExpandableContent = () => {
  const data = makeData(false, 100, 3, 2);
  const columns = Object.keys(data[0]).filter(x => x !== 'subRows')
  return (
    <Table>
      <TableHead>
        <HeaderRow>
          {columns.map((columnName: string) => (
            <HeaderCell key={columnName} columnName={columnName} />
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {data.map((row: any) => (
          <Row>
            {columns.map((cellKey: string, index: number) => {
              return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
            })}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}

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
                <Row key={row.id} row={row}>
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

export const SortableWithVS = () => {
  return <>TODO</>
}

export const SelectableWithVS = () => {
  return <>TODO</>
}

export const ExpandableContentWithVS = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState(() => makeData(true, 5000, 5, 3));
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
