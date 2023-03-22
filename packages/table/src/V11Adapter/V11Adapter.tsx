import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { VirtualItem } from 'react-virtual';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { Cell, HeaderCell } from '../Cell';
import ExpandedContent from '../ExpandedContent/ExpandedContent';
import HeaderRow from '../HeaderRow';
import Row from '../Row';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
  LGColumnDef,
  LGRowData,
  LGTableDataType,
} from '../useLeafyGreenTable';
import Table, { flexRender, getCoreRowModel, getSortedRowModel } from '..';

import processColumns from './processColumns';
import processData from './processData';
import { V11AdapterProps } from './V11Adapter.types';

// assumes table is first element in children
// reads columns from columns' keys
// supports up to one layer of nested rows
// assumes that the key of a column in the original data === column label header in lowercase; can be overridden by `headerLabelMapping`
const V11Adapter = <T extends LGRowData>({
  children,
  shouldAlternateRowColor,
  useVirtualScrolling = false,
  hasSelectableRows = false,
  headerLabelMapping,
}: V11AdapterProps<T>) => {
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);
  const OldTable = React.Children.toArray(children)[0];
  const {
    data,
    columns,
    children: childrenFn,
  } = (OldTable as ReactElement).props;
  const processedColumns: Array<LGColumnDef<T>> = useMemo(
    () => processColumns(data, columns, headerLabelMapping),
    [data, columns, headerLabelMapping],
  );
  const processedData: Array<LGTableDataType<T>> = useState(() =>
    processData(data, processedColumns, childrenFn),
  )[0];

  const table = useLeafyGreenTable<T>({
    containerRef,
    data: processedData,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // @ts-ignore
    getSubRows: row => row.subRows,
    useVirtualScrolling,
    hasSelectableRows,
  });

  const { rows } = table.getRowModel();
  let loopedItems;

  if (useVirtualScrolling) {
    loopedItems = table.virtualRows ?? [];
  } else {
    loopedItems = rows;
  }

  let row: LeafyGreenTableRow<T>;
  return (
    <TableContainer ref={containerRef}>
      <Table
        darkMode={darkMode}
        table={table}
        shouldAlternateRowColor={
          shouldAlternateRowColor ?? processedData.length > 10
        }
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
          {loopedItems.map(
            (loopedItem: LeafyGreenTableRow<T> | VirtualItem) => {
              row = (
                useVirtualScrolling ? rows[loopedItem.index] : loopedItem
              ) as LeafyGreenTableRow<T>;
              return (
                <Row
                  key={row.id}
                  row={row}
                  virtualRow={
                    (useVirtualScrolling
                      ? loopedItem
                      : undefined) as VirtualItem
                  }
                >
                  {row
                    .getVisibleCells()
                    .map((cell: LeafyGreenTableCell<any>) => {
                      return (
                        <Cell key={cell.id}>
                          {cell.column.id === 'select' ? (
                            // @ts-ignore
                            <>{cell.column.columnDef?.cell({ row, table })}</>
                          ) : (
                            // index by row.index (not the index of the loop) to get the sorted order
                            // @ts-ignore
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
                              {/* @ts-ignore */}
                              {subRow.original[subRowCell.column.id]()}
                            </Cell>
                          );
                        })}
                        {subRow.subRows &&
                          subRow.subRows.map(subSubRow => (
                            <Row key={subSubRow.id} row={subSubRow}>
                              {subSubRow
                                .getVisibleCells()
                                .map(subSubRowCell => {
                                  return (
                                    <Cell key={subSubRowCell.id}>
                                      {/* @ts-ignore */}
                                      {subSubRow.original[
                                        subSubRowCell.column.id
                                      ]()}
                                    </Cell>
                                  );
                                })}
                            </Row>
                          ))}
                      </Row>
                    ))}
                </Row>
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default V11Adapter;
