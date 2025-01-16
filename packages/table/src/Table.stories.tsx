import React, { Fragment, useState } from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import Pagination, { PaginationProps } from '@leafygreen-ui/pagination';

import { Align } from './Cell/Cell.types';
import { VerticalAlignment } from './Table/Table.types';
import {
  makeData,
  makeKitchenSinkData,
  Person,
} from './utils/makeData.testutils';
import { AnyDict } from './utils/types';
import {
  Cell,
  ExpandedContent,
  flexRender,
  HeaderCell,
  type HeaderGroup,
  HeaderRow,
  type LeafyGreenTableCell,
  type LeafyGreenTableRow,
  type LGColumnDef,
  Row,
  Table,
  TableBody,
  TableHead,
  type TableProps,
  useLeafyGreenTable,
} from '.';

type StoryTableProps = TableProps<any>;

const meta: StoryMetaType<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    shouldAlternateRowColor: { control: 'boolean', defaultValue: false },
    shouldTruncate: { control: 'boolean', defaultValue: true },
    verticalAlignment: {
      options: Object.values(VerticalAlignment),
      control: { type: 'radio' },
    },
  },
  args: {
    verticalAlignment: VerticalAlignment.Top,
    shouldTruncate: true,
    shouldAlternateRowColor: false,
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'table',
        'children',
        'value',
        'onSelectChange',
        'tableContainerClassName',
        'baseFontSize',
      ],
    },
    // This is needed as a workaround to make arg spreading performant
    // https://github.com/storybookjs/storybook/issues/11657
    docs: {
      source: { type: 'code' },
    },
  },
};
export default meta;

const Template: StoryFn<StoryTableProps> = args => {
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

export const LiveExample: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data] = useState(() => makeKitchenSinkData(10));

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
        size: 120,
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
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <Table {...args} table={table} ref={tableContainerRef}>
      <TableHead isSticky>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <HeaderCell
                  key={header.id}
                  header={header}
                  className={cx({
                    [css`
                      // since the table is not fixed, the width is not respected. This prevents the width from getting any smaller.
                      min-width: 120px;
                    `]: index === 5,
                  })}
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
      <TableBody>
        {rows.map((row: LeafyGreenTableRow<Person>) => {
          const isExpandedContent = row.isExpandedContent ?? false;

          return (
            <Fragment key={row.id}>
              {!isExpandedContent && (
                <Row row={row}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Cell key={cell.id} id={cell.id} cell={cell}>
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
  );
};

export const HundredsOfRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data] = useState(() => makeKitchenSinkData(200));

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
        size: 120,
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
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <Table {...args} table={table} ref={tableContainerRef}>
      <TableHead isSticky>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <HeaderCell
                  key={header.id}
                  header={header}
                  className={cx({
                    [css`
                      // since the table is not fixed, the width is not respected. This prevents the width from getting any smaller.
                      min-width: 120px;
                    `]: index === 5,
                  })}
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
      <TableBody>
        {rows.map((row: LeafyGreenTableRow<Person>) => {
          const isExpandedContent = row.isExpandedContent ?? false;

          return (
            <Fragment key={row.id}>
              {!isExpandedContent && (
                <Row row={row}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Cell key={cell.id} id={cell.id} cell={cell}>
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
  );
};

HundredsOfRows.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const NoTruncation = LiveExample.bind({});
NoTruncation.args = {
  shouldTruncate: false,
};

export const Basic = Template.bind({});

export const ZebraStripes = Template.bind({});
ZebraStripes.args = {
  shouldAlternateRowColor: true,
};

export const NestedRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data] = React.useState(() => makeData(false, 200, 5, 3));

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
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <Table
      {...args}
      table={table}
      ref={tableContainerRef}
      data-total-rows={table.getRowModel().rows.length}
    >
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
            <Row row={row} key={row.id}>
              {row
                .getVisibleCells()
                .map((cell: LeafyGreenTableCell<Person>) => {
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
  );
};

export const ExpandableContent: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(true, 200))[0];

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
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <Table
      {...args}
      table={table}
      ref={tableContainerRef}
      data-total-rows={table.getRowModel().rows.length}
    >
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
          const isExpandedContent = row.isExpandedContent ?? false;
          return (
            <Fragment key={row.id}>
              {!isExpandedContent && (
                <Row row={row}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Cell key={cell.id} id={cell.id} cell={cell}>
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
  );
};

export const SortableRows: StoryFn<StoryTableProps> = args => {
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
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <Table
      {...args}
      ref={tableContainerRef}
      data-total-rows={table.getRowModel().rows.length}
    >
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

export const SelectableRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
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
        size: 140,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    hasSelectableRows: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div>
      <div>
        <Button
          onClick={
            // eslint-disable-next-line no-console
            () => console.info('rowSelection', rowSelection)
          }
        >
          Log rowSelection state
        </Button>
        <Button
          onClick={() =>
            // eslint-disable-next-line no-console
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows,
            )
          }
        >
          Log table.getSelectedFlatRows()
        </Button>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        data-total-rows={table.getRowModel().rows.length}
      >
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
    </div>
  );
};

export const SelectableRowsNoSelectAll: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100))[0];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<Array<LGColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
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
        size: 140,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    hasSelectableRows: true,
    allowSelectAll: false,
  });

  const { rows } = table.getRowModel();

  return (
    <div>
      <div>
        <Button
          onClick={
            // eslint-disable-next-line no-console
            () => console.info('rowSelection', rowSelection)
          }
        >
          Log rowSelection state
        </Button>
        <Button
          onClick={() =>
            // eslint-disable-next-line no-console
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows,
            )
          }
        >
          Log table.getSelectedFlatRows()
        </Button>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        data-total-rows={table.getRowModel().rows.length}
      >
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
    </div>
  );
};

export const WithPagination: StoryFn<StoryTableProps> = ({
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
        size: 100,
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
        size: 140,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    data,
    columns,
    withPagination: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div>
      <Table
        darkMode={darkMode}
        {...rest}
        ref={tableContainerRef}
        data-debug={JSON.stringify(
          {
            totalRows: data.length,
            ...table.getState().pagination,
          },
          null,
          2,
        )}
      >
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

      <Pagination
        itemsPerPage={table.getState().pagination.pageSize}
        onItemsPerPageOptionChange={
          ((value, _) => {
            table.setPageSize(Number(value));
          }) as PaginationProps['onItemsPerPageOptionChange']
        }
        numTotalItems={data.length}
        currentPage={table.getState().pagination.pageIndex + 1}
        onCurrentPageOptionChange={
          ((value, _) => {
            table.setPageIndex(Number(value) - 1);
          }) as PaginationProps['onCurrentPageOptionChange']
        }
        onBackArrowClick={() => table.previousPage()}
        onForwardArrowClick={() => table.nextPage()}
        darkMode={darkMode}
      />
    </div>
  );
};

// TODO: Will address in a separate PR - removing from stories and will test TS in spec files.
// TODO: create a sandbox to demonstrate styled components
// export const StyledComponents: StoryFn<StoryTableProps> = args => {
//   const tableContainerRef = React.useRef<HTMLDivElement>(null);
//   const [data] = useState(() => makeKitchenSinkData(5));

//   const columns = React.useMemo<Array<LGColumnDef<KitchenSink>>>(
//     () => [
//       {
//         accessorKey: 'dateCreated',
//         header: 'Date Created',
//         enableSorting: true,
//         cell: info =>
//           (info.getValue() as Date).toLocaleDateString('en-us', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//           }),
//       },
//       {
//         accessorKey: 'frequency',
//         header: 'Frequency',
//       },
//       {
//         accessorKey: 'clusterType',
//         header: 'Cluster Type',
//       },
//       {
//         accessorKey: 'encryptorEnabled',
//         header: 'Encryptor',
//         // eslint-disable-next-line react/display-name
//         cell: info => (
//           <Badge variant={info.getValue() ? 'green' : 'red'}>
//             {info.getValue() ? 'Enabled' : 'Not enabled'}
//           </Badge>
//         ),
//       },
//       {
//         accessorKey: 'mdbVersion',
//         header: 'MongoDB Version',
//         enableSorting: true,
//         size: 90,
//       },
//       {
//         id: 'actions',
//         header: '',
//         size: 90,
//         // eslint-disable-next-line react/display-name
//         cell: _ => {
//           return (
//             <>
//               <IconButton aria-label="Download">
//                 <Icon glyph="Download" />
//               </IconButton>
//               <IconButton aria-label="Export">
//                 <Icon glyph="Export" />
//               </IconButton>
//               <IconButton aria-label="More Options">
//                 <Icon glyph="Ellipsis" />
//               </IconButton>
//             </>
//           );
//         },
//       },
//     ],
//     [],
//   );

//   const table = useLeafyGreenTable<KitchenSink>({
//     data,
//     columns,
//   });

//   const { rows } = table.getRowModel();

// FIXME:
// proptypes error. The other components don't have proptypes but should have them
//   const StyledCell = styled(Cell)`
//     color: grey;
//   ` as typeof Cell;

//   const StyledRow = styled(Row)`
//     background: snow;
//   ` as typeof Row;

//   const StyledHeaderRow = styled(HeaderRow)`
//     background: whitesmoke;
//   ` as typeof HeaderRow;

//   const StyledHeaderCell = styled(HeaderCell)`
//     color: black;
//   ` as typeof HeaderCell;

//   const StyledExpandedContent = styled(ExpandedContent)`
//     td > div {
//       background: whitesmoke;
//     }
//   ` as typeof ExpandedContent;

//   return (
//     <Table
//       {...args}
//       table={table}
//       ref={tableContainerRef}
//       className={css`
//         width: 1100px;
//       `}
//     >
//       <TableHead>
//         {table
//           .getHeaderGroups()
//           .map((headerGroup: HeaderGroup<KitchenSink>) => (
//             <StyledHeaderRow key={headerGroup.id}>
//               {headerGroup.headers.map(header => {
//                 return (
//                   <StyledHeaderCell key={header.id} header={header}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </StyledHeaderCell>
//                 );
//               })}
//             </StyledHeaderRow>
//           ))}
//       </TableHead>
//       <TableBody>
//         {rows.map((row: LeafyGreenTableRow<KitchenSink>) => {
//           const isExpandedContent = row.isExpandedContent ?? false;
//           return (
//             <Fragment key={row.id}>
//               {!isExpandedContent && (
//                 <StyledRow row={row}>
//                   {row.getVisibleCells().map(cell => {
//                     return (
//                       <StyledCell key={cell.id} id={cell.id} cell={cell}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext(),
//                         )}
//                       </StyledCell>
//                     );
//                   })}
//                 </StyledRow>
//               )}
//               {isExpandedContent && <StyledExpandedContent row={row} />}
//             </Fragment>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// };
