import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { VirtualItem } from 'react-virtual';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { Cell, HeaderCell } from '../Cell';
import ExpandedContent from '../ExpandedContent/ExpandedContent';
import { HeaderRow, Row } from '../Row';
import Table from '../Table';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import { TableProps as V10TableProps } from '../TableV10/Table';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
  LGRowData,
  LGTableDataType,
} from '../useLeafyGreenTable';

import processColumns from './processColumns';
import processData from './processData';
import { V11AdapterProps } from './V11Adapter.types';

/**
 * Converts a v10 Table component to a v11 Table component.
 *
 * Given the two versions' significant differences in API, the adapter makes several assumptions about the v10 Table's usage:
 * - It is assumed that the v10 Table component will be the first child.
 * - The v11 columns are read from the v10 columns' labels. If the key of the cells' data does not correspond to the v10 column's label,
 * the user is expected to pass in the labels through the `headerLabels` prop.
 * - Currently only supports up to one layer of nested rows
 */
const V11Adapter = <T extends LGRowData>({
  children,
  shouldAlternateRowColor,
  useVirtualScrolling = false,
  hasSelectableRows = false,
  headerLabels,
}: V11AdapterProps<T>) => {
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);
  const OldTable = React.Children.toArray(children)[0];

  if (!isComponentType(OldTable, 'Table')) {
    console.error(
      'The first and only child of `Table.V11Adapter` must be a `V10Table` component',
    );
  }

  const OldTableProps = (OldTable as ReactElement).props;
  type TData = typeof OldTableProps.data extends Array<infer U> ? U : never;

  const {
    data,
    columns,
    children: childrenFn,
  } = OldTableProps as V10TableProps<TData>;

  const processedColumns = useMemo(
    () => processColumns(data, columns, headerLabels),
    [data, columns, headerLabels],
  );

  const [processedData, _] = useState<Array<LGTableDataType<T>>>(() =>
    processData(data, processedColumns, childrenFn),
  );

  const table = useLeafyGreenTable<T>({
    containerRef,
    data: processedData,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // @ts-expect-error `subRows` is a field added by `processData`
    getSubRows: row => row.subRows,
    useVirtualScrolling,
    hasSelectableRows,
  });

  const { rows } = table.getRowModel();

  const iterables = useVirtualScrolling ? table.virtualRows ?? [] : rows;

  return (
    <Table
      darkMode={darkMode}
      table={table}
      shouldAlternateRowColor={
        shouldAlternateRowColor ?? processedData.length > 10
      }
      ref={containerRef}
    >
      <TableHead>
        <HeaderRow>
          {table.getHeaderGroups()[0].headers.map(header => {
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
      </TableHead>
      <TableBody>
        {iterables.map((iterable: LeafyGreenTableRow<T> | VirtualItem) => {
          const row = (
            useVirtualScrolling ? rows[iterable.index] : iterable
          ) as LeafyGreenTableRow<T>;
          return (
            <Row
              key={row.index}
              row={row}
              virtualRow={
                useVirtualScrolling ? (iterable as VirtualItem) : undefined
              }
            >
              {row.getVisibleCells().map((cell: LeafyGreenTableCell<any>) => {
                return (
                  <Cell key={cell.id}>
                    {cell.column.id === 'select' ? (
                      // @ts-expect-error `cell` is instantiated in `processColumns`
                      <>{cell.column.columnDef?.cell({ row, table })}</>
                    ) : (
                      // index by row.index (not the index of the loop) to get the sorted order
                      // @ts-expect-error `processedData` is structured to be indexable by `row.index`
                      <>{processedData[row.index][cell.column.id]()}</>
                    )}
                  </Cell>
                );
              })}
              {row.original.renderExpandedContent && (
                <ExpandedContent row={row} />
              )}
              {row.subRows &&
                row.subRows.map(subRow => (
                  <Row key={subRow.id} row={subRow}>
                    {subRow.getVisibleCells().map(subRowCell => {
                      return (
                        <Cell key={subRowCell.id}>
                          {/* @ts-expect-error subRow.original returns the object in the user's defined shape, and should be string indexable */}
                          {subRow.original[subRowCell.column.id]()}
                        </Cell>
                      );
                    })}
                  </Row>
                ))}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default V11Adapter;
