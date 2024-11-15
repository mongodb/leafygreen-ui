import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import {
  KitchenSink,
  makeData,
  makeKitchenSinkData,
  Person,
} from '../utils/makeData.testutils';
import {
  Cell,
  type ColumnDef,
  ExpandedContent,
  type ExpandedState,
  flexRender,
  HeaderCell,
  type HeaderGroup,
  HeaderRow,
  type LeafyGreenTableCell,
  type LeafyGreenVirtualItem,
  LGColumnDef,
  Row,
  type SortingState,
  Table,
  TableBody,
  TableHead,
  type TableProps,
  useLeafyGreenVirtualTable,
} from '..';

type StoryTableProps = TableProps<unknown>;

const meta: StoryMetaType<typeof Table> = {
  title: 'Components/Table/With Virtualized Scrolling',
  component: Table,
  argTypes: {
    children: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
  parameters: {
    default: 'Basic',
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      source: { type: 'code' },
    },
  },
};
export default meta;

const virtualScrollingContainerHeight = css`
  max-height: calc(100vh - 200px);
  /* height: calc(100vh - 200px); */
`;

const basicColumnDefs: Array<LGColumnDef<Person>> = [
  {
    accessorKey: 'index',
    header: 'index',
    size: 40,
  },
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
    align: 'center',
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
];

export const Basic: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useMemo(() => makeData(false, 10_000), []);

  const columns = useMemo(() => basicColumnDefs, []);

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <p>{table?.virtual.getVirtualItems().length} virtual rows</p>
        <p>{table?.virtual.getTotalSize()} virtual rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const cells = row.getVisibleCells();
                return (
                  <Row key={virtualRow.key} virtualRow={virtualRow} row={row}>
                    {cells.map((cell: LeafyGreenTableCell<Person>) => {
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
    </>
  );
};

export const NestedRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000, 5, 3))[0];

  const columns = useMemo(() => basicColumnDefs, []);

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const cells = row.getVisibleCells();

                return (
                  <Row key={virtualRow.key} row={row} virtualRow={virtualRow}>
                    {cells.map((cell: LeafyGreenTableCell<Person>) => {
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
    </>
  );
};

export const SortableRows: StoryFn<StoryTableProps> = args => {
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

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const cells = row.getVisibleCells();

                return (
                  <Row key={virtualRow.key} row={row} virtualRow={virtualRow}>
                    {cells.map((cell: LeafyGreenTableCell<Person>) => {
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
    </>
  );
};

export const SelectableRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 5000))[0];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = useMemo(() => basicColumnDefs, []);

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    hasSelectableRows: true,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>
      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const cells = row.getVisibleCells();

                return (
                  <Row key={virtualRow.key} row={row} virtualRow={virtualRow}>
                    {cells.map((cell: LeafyGreenTableCell<Person>) => {
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
    </>
  );
};

export const ExpandableContent: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(true, 5000))[0];
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = useMemo(() => basicColumnDefs, []);

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const isExpandedContent = row.isExpandedContent ?? false;

                return (
                  <Fragment key={virtualRow.key}>
                    {!isExpandedContent && (
                      <Row row={row} virtualRow={virtualRow}>
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
                    )}
                    {isExpandedContent && (
                      <ExpandedContent row={row} virtualRow={virtualRow} />
                    )}
                  </Fragment>
                );
              })}
        </TableBody>
      </Table>
    </>
  );
};

export const TallRows: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useMemo(() => {
    return makeData(false, 10_000).map(d => ({
      ...d,
      id: faker.string.uuid() + '--' + faker.string.uuid(),
    }));
  }, []);

  const columns = useMemo(() => basicColumnDefs, []);
  const estimateSize = useCallback(() => 68, []);

  const table = useLeafyGreenVirtualTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    virtualizerOptions: {
      estimateSize,
    },
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <p>{table?.virtual.getVirtualItems().length} virtual rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
      >
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map((virtualRow: LeafyGreenVirtualItem<Person>) => {
                const row = virtualRow.row;
                const cells = row.getVisibleCells();
                return (
                  <Row key={row.id}>
                    {cells.map((cell: LeafyGreenTableCell<Person>) => {
                      return (
                        <Cell
                          key={cell.id}
                          className={css`
                            padding-block: 4px;

                            & > div {
                              max-height: unset;
                            }
                          `}
                          cell={cell}
                        >
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

export const DifferentHeights: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [data] = useState(() => makeKitchenSinkData(10_000));

  const columns = React.useMemo<Array<LGColumnDef<KitchenSink>>>(
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
        size: 200,
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
        align: 'center',
      },
      {
        accessorKey: 'clusterType',
        header: 'Cluster Type',
        size: 200,
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
        size: 120,
      },
      {
        id: 'actions',
        header: '',
        size: 120,
        // eslint-disable-next-line react/display-name
        cell: _ => {
          return (
            <div>
              <IconButton aria-label="Download">
                <Icon glyph="Download" />
              </IconButton>
              <IconButton aria-label="Export">
                <Icon glyph="Export" />
              </IconButton>
              <IconButton aria-label="More Options">
                <Icon glyph="Ellipsis" />
              </IconButton>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useLeafyGreenVirtualTable<KitchenSink>({
    containerRef: tableContainerRef,
    data,
    columns,
  });

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
      </div>

      <Table
        {...args}
        table={table}
        ref={tableContainerRef}
        className={virtualScrollingContainerHeight}
        shouldTruncate={false}
      >
        <TableHead isSticky>
          {table
            .getHeaderGroups()
            .map((headerGroup: HeaderGroup<KitchenSink>) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                      className={css`
                        ${index === 2 &&
                        css`
                          width: auto;
                        `}
                      `}
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
          {table.virtual.getVirtualItems() &&
            table.virtual
              .getVirtualItems()
              .map(
                (
                  virtualRow: LeafyGreenVirtualItem<KitchenSink>,
                  index: number,
                ) => {
                  const row = virtualRow.row;
                  const isExpandedContent = row.isExpandedContent ?? false;

                  return (
                    <Fragment key={virtualRow.key}>
                      {!isExpandedContent && (
                        <Row
                          row={row}
                          virtualRow={virtualRow}
                          data-row-index={index}
                        >
                          {row
                            .getVisibleCells()
                            .map((cell: LeafyGreenTableCell<KitchenSink>) => {
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
                      {isExpandedContent && (
                        <ExpandedContent row={row} virtualRow={virtualRow} />
                      )}
                    </Fragment>
                  );
                },
              )}
        </TableBody>
      </Table>
    </>
  );
};
