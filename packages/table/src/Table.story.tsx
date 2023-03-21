import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

import { storybookArgTypes } from '@leafygreen-ui/lib';
import Pagination from '@leafygreen-ui/pagination';

import ExpandedContent from './ExpandedContent/ExpandedContent';
import HeaderRow from './HeaderRow/HeaderRow';
import Row from './Row/Row';
import TableBody from './TableBody/TableBody';
import TableContainer from './TableContainer/TableContainer';
import TableHead from './TableHead/TableHead';
import { makeData, Person } from './utils/makeData';
import { AnyDict } from './utils/types';
import { Cell, HeaderCell } from './Cell';
import Table from './Table';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
} from './useLeafyGreenTable';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    children: { control: 'none' },
    className: { control: 'none' },
    shouldAlternateRowColor: { control: 'boolean' },
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

const Template: ComponentStory<typeof Table> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]).filter(
    x => x !== 'renderExpandedContent' && x !== 'subRows',
  );
  return (
    <TableContainer>
      <Table {...args}>
        <TableHead>
          <HeaderRow>
            {columns.map((columnName: string) => (
              <HeaderCell key={columnName}>{columnName}</HeaderCell>
            ))}
          </HeaderRow>
        </TableHead>
        <TableBody>
          {data.map((row: AnyDict) => (
            <Row key={row.id}>
              {Object.keys(row).map((cellKey: string, index: number) => {
                return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
              })}
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Basic = Template.bind({});

export const ZebraStripes = Template.bind({});
ZebraStripes.args = {
  shouldAlternateRowColor: true,
};

export const NestedRows: ComponentStory<typeof Table> = () => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 50, 5, 3))[0];

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
    // getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table table={table}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
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
            {rows.map((row: LeafyGreenTableRow<Person>) => {
              return (
                <Row key={row.id} row={row}>
                  {row
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
                  {row.subRows &&
                    row.subRows.map(subRow => (
                      <Row key={subRow.id} row={subRow}>
                        {subRow.getVisibleCells().map(cell => {
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
                            <Row key={subSubRow.id} row={subSubRow}>
                              {subSubRow.getVisibleCells().map(cell => {
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
      </TableContainer>
    </>
  );
};

export const ExpandableContent: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(true, 100))[0];

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
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table {...args} table={table}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
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
            {rows.map((row: LeafyGreenTableRow<Person>) => {
              return (
                <Row key={row.id} row={row}>
                  {row
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
                  {row.original.renderExpandedContent && (
                    <ExpandedContent row={row} />
                  )}
                </Row>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const SortableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];
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
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table {...args}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
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
            {rows.map((row: LeafyGreenTableRow<Person>) => {
              return (
                <Row key={row.id} row={row}>
                  {row.getVisibleCells().map(cell => {
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

export const SelectableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];
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
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <button
          onClick={
            // eslint-disable-next-line no-console
            () => console.info('rowSelection', rowSelection)
          }
        >
          Log rowSelection state
        </button>
        <button
          onClick={() =>
            // eslint-disable-next-line no-console
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows,
            )
          }
        >
          Log table.getSelectedFlatRows()
        </button>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table {...args} table={table}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
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
            {rows.map((row: LeafyGreenTableRow<Person>) => {
              return (
                <Row key={row.id}>
                  {row.getVisibleCells().map(cell => {
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

export const WithPagination: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 10000))[0];

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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{data.length} total rows</p>
        <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
      </div>

      <Pagination
        itemsPerPage={table.getState().pagination.pageSize}
        onItemsPerPageOptionChange={(value, _) => {
          table.setPageSize(Number(value));
        }}
        numTotalItems={data.length}
        currentPage={table.getState().pagination.pageIndex + 1}
        onCurrentPageOptionChange={(value, _) => {
          table.setPageIndex(Number(value) - 1);
        }}
        onBackArrowClick={() => table.previousPage()}
        onForwardArrowClick={() => table.nextPage()}
      />

      <TableContainer ref={tableContainerRef}>
        <Table {...args}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
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
            {rows.map((row: LeafyGreenTableRow<Person>) => {
              return (
                <Row key={row.id} row={row}>
                  {row.getVisibleCells().map(cell => {
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
