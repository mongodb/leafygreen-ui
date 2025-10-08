import React, { Fragment, useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';

import {
  Cell,
  ExpandedContent,
  flexRender,
  HeaderCell,
  type HeaderGroup,
  HeaderRow,
  type LeafyGreenTableRow,
  type LGColumnDef,
  Row,
  Table,
  TableBody,
  TableHead,
  type TableProps,
  useLeafyGreenTable,
} from '..';

import { makeKitchenSinkData, Person } from './makeData.testutils';

type StoryTableProps = TableProps<any>;

export const DynamicDataComponent: StoryFn<StoryTableProps> = args => {
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [data] = useState(() => makeKitchenSinkData(10));
  const [showEmoji, setShowEmoji] = useState(true);

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
        accessorKey: 'mdbVersion',
        header: 'MongoDB Version',
        enableSorting: true,
        size: 90,
        cell: info => {
          return `${info.getValue()} ${showEmoji ? 'with 🥬' : ''}`;
        },
      },
    ],
    [showEmoji],
  );

  const table = useLeafyGreenTable<any>({
    data,
    columns,
  });

  const { rows } = table.getRowModel();

  return (
    <div style={{ width: '100%' }}>
      <div>
        <Button
          data-testid="lg-table-button"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          Toggle 🥬
        </Button>
      </div>
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
    </div>
  );
};
