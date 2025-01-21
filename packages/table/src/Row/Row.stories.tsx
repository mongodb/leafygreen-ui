import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import Table from '../Table/Table';
import TableBody from '../TableBody/TableBody';
import TableHead from '../TableHead/TableHead';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
} from '../useLeafyGreenTable';
import { makeData, Person } from '../utils/makeData.testutils';
import { AnyDict } from '../utils/types';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  HeaderGroup,
  LGColumnDef,
  RowProps,
} from '..';

const rowCells = (
  <>
    <Cell
      className={css`
        width: 60px;
      `}
    >
      1
    </Cell>
    <Cell
      className={css`
        width: 200px;
      `}
    >
      Est mollitia laborum dolores dolorem corporis explicabo nobis enim omnis.
      Minima excepturi accusantium iure culpa.
    </Cell>
    <Cell>MongoDB</Cell>
    <Cell>7.85</Cell>
    <Cell>Complicated</Cell>
  </>
);

const meta: StoryMetaType<typeof Row> = {
  title: 'Components/Table/Row',
  component: Row,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  parameters: {
    default: null,
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'ref',
        'children',
        'row',
        'virtualRow',
      ],
    },
    chromatic: {
      disableSnapshot: true,
    },
    // This is needed as a workaround to make arg spreading performant
    // https://github.com/storybookjs/storybook/issues/11657
    docs: {
      source: { type: 'code' },
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        disabled: [false, true],
        // @ts-ignore - this is a table prop
        shouldTruncate: [false, true],
        verticalAlignment: ['top', 'center'],
        shouldAlternateRowColor: [false, true],
      },
      excludeCombinations: [
        {
          // @ts-ignore - this is a table prop
          shouldTruncate: true,
          verticalAlignment: 'center',
        },
      ],
      decorator: (Instance, ctx) => {
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <Table
              shouldTruncate={ctx?.args.shouldTruncate}
              verticalAlignment={ctx?.args.verticalAlignment}
              shouldAlternateRowColor={ctx?.args.shouldAlternateRowColor}
            >
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Instance key={index}>{rowCells}</Instance>
                ))}
              </TableBody>
            </Table>
          </LeafyGreenProvider>
        );
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Row> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <Table>
      <TableHead>
        <HeaderRow>
          {columns.map((columnName: string) => (
            <HeaderCell key={columnName}>{columnName}</HeaderCell>
          ))}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {data.map((row: AnyDict) => (
          <Row {...args} key={row.id}>
            {Object.keys(row).map((cellKey: string, index: number) => {
              return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
            })}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

export const DisabledRows = Template.bind({});
DisabledRows.args = {
  disabled: true,
};

export const DisabledNestedRows: StoryFn<typeof Row> = ({ row, ...rest }) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100, 5, 3))[0];
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
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <pre>Expanded rows: {JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <Table table={table} ref={tableContainerRef}>
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
              <Row key={row.id} row={row} {...rest}>
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
    </>
  );
};
DisabledNestedRows.args = {
  disabled: true,
};

export const ClickableRows = Template.bind({});
ClickableRows.args = {
  onClick: () => {
    // eslint-disable-next-line no-console
    console.log('row clicked!');
  },
};

export const DisabledClickableRows = Template.bind({});
DisabledClickableRows.args = {
  onClick: () => {
    // eslint-disable-next-line no-console
    console.log('row clicked!');
  },
  disabled: true,
};

export const DisabledSelectableRows: StoryFn<
  RowProps<Person> & DarkModeProps
> = ({ darkMode, ...args }: DarkModeProps & RowProps<Person>) => {
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
    enableRowSelection: !args.disabled,
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
        darkMode={darkMode}
        table={table}
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
              <Row key={row.id} row={row} {...args}>
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
DisabledSelectableRows.argTypes = {
  darkMode: storybookArgTypes.darkMode,
};

DisabledSelectableRows.args = {
  disabled: true,
};

export const Generated = () => <></>;
