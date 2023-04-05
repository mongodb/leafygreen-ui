import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import Badge from '@leafygreen-ui/badge';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import Pagination from '@leafygreen-ui/pagination';

import { createKitchenSinkData, makeData, Person } from './utils/makeData';
import { AnyDict } from './utils/types';
import {
  Cell,
  ExpandedContent,
  HeaderCell,
  HeaderGroup,
  HeaderRow,
  type LeafyGreenTableCell,
  type LeafyGreenTableRow,
  type LGColumnDef,
  Row,
  Table,
  TableBody,
  TableHead,
  useLeafyGreenTable,
} from '.';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    shouldAlternateRowColor: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'KitchenSink',
    controls: {
      exclude: [
        'className',
        'children',
        'ref',
        'aria-describedby',
        'aria-label',
        'value',
        'onSelectChange',
      ],
    },
    // This is needed as a workaround to make arg spreading performant
    // https://github.com/storybookjs/storybook/issues/11657
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
  );
};

export const Basic = Template.bind({});

export const ZebraStripes = Template.bind({});
ZebraStripes.args = {
  shouldAlternateRowColor: true,
};

export const OverflowingCell: ComponentStory<typeof Table> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]).filter(
    x => x !== 'renderExpandedContent' && x !== 'subRows',
  );
  return (
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
              return (
                <Cell key={`${cellKey}-${index}`}>
                  <div
                    style={{
                      width: '80px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {row[cellKey]}
                  </div>
                </Cell>
              );
            })}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export const NestedRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 50, 5, 3))[0];

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
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
        align: 'right',
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
        align: 'right',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
        align: 'right',
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
    </>
  );
};

export const ExpandableContent: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(true, 100))[0];

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
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
    </>
  );
};

export const SortableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
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
        enableSorting: true,
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
        enableSorting: true,
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
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table {...args} ref={tableContainerRef}>
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
    </>
  );
};

export const SelectableRows: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
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
    getCoreRowModel: getCoreRowModel(),
    hasSelectableRows: true,
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
    </>
  );
};

export const WithPagination: ComponentStory<typeof Table> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...rest
}) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 10000))[0];

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
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

      <Table darkMode={darkMode} {...rest} ref={tableContainerRef}>
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
        darkMode={darkMode}
      />
    </>
  );
};

export const KitchenSink: ComponentStory<typeof Table> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = useState(() =>
    [...Array(10)].map(_ => createKitchenSinkData()),
  )[0];

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'dateCreated',
        header: 'Date Created',
        enableSorting: true,
        cell: info =>
          (info.getValue() as Date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
      },
      {
        accessorKey: 'clusterType',
        header: 'Cluster Type',
      },
      {
        accessorKey: 'encryptorEnabled',
        header: 'Encryptor',
        // eslint-disable-next-line react/display-name
        cell: info => (
          <Badge variant={info.getValue() ? 'green' : 'red'}>
            {info.getValue() ? 'Enabled' : 'Not enabled'}
          </Badge>
        ),
      },
      {
        accessorKey: 'mdbVersion',
        header: 'MongoDB Version',
        enableSorting: true,
        size: 90,
      },
      {
        id: 'actions',
        header: '',
        size: 90,
        // eslint-disable-next-line react/display-name
        cell: _ => {
          return (
            <>
              <IconButton aria-label="Download">
                <Icon glyph="Download" />
              </IconButton>
              <IconButton aria-label="Export">
                <Icon glyph="Export" />
              </IconButton>
              <IconButton aria-label="More Options">
                <Icon glyph="Ellipsis" />
              </IconButton>
            </>
          );
        },
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<any>({
    containerRef: tableContainerRef,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows: row => row.subRows,
  });

  const { rows } = table.getRowModel();

  return (
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
        {rows.map((row: LeafyGreenTableRow<Person>) => {
          return (
            <Row key={row.id} row={row}>
              {row.getVisibleCells().map(cell => {
                return (
                  <Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                    {subRow.original.renderExpandedContent && (
                      <ExpandedContent row={subRow} />
                    )}
                  </Row>
                ))}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

KitchenSink.argTypes = {
  shouldAlternateRowColor: {
    control: 'none',
  },
};
