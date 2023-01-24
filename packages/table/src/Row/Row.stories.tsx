import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
} from '..';
import Cell from '../Cell/Cell';
import HeaderCell from '../HeaderCell/HeaderCell';
import HeaderRow from '../HeaderRow/HeaderRow';
import Row from '../Row/Row';
import Table from '../Table/Table';
import TableBody from '../TableBody/TableBody';
import TableContainer from '../TableContainer/TableContainer';
import TableHead from '../TableHead/TableHead';
import useLeafygreenTable from '../useLeafygreenTable/useLeafygreenTable';
import { makeData, Person } from '../utils/makeData';

export default {
  title: 'Components/Table/Row',
  component: Row,
  argTypes: {
    children: { control: 'none' },
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

interface AnyDict {
  [key: string]: any;
}

const Template: ComponentStory<typeof Row> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <TableContainer>
      <p>The Storybook controls manipulate all rows.</p>
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
    </TableContainer>
  );
};

export const DisabledRows = Template.bind({});
DisabledRows.args = {
  disabled: true,
};

export const DisabledNestedRows: ComponentStory<typeof Row> = args => {
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
        <pre>Expanded rows: {JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <TableContainer ref={tableContainerRef}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
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
          <TableBody table={table}>
            {rows.map((row: TSRow<Person>) => {
              return (
                <Row key={row.id} row={row} {...args}>
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
DisabledNestedRows.args = {
  disabled: true,
};

export const ClickableRows = Template.bind({});
ClickableRows.args = {
  onClick: () => {},
};

export const DisabledClickableRows = Template.bind({});
DisabledClickableRows.args = {
  onClick: () => {},
  disabled: true,
};
