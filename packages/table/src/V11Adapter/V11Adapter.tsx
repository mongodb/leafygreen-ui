import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { PropsWithChildren } from 'react';

import Cell from '../Cell';
import ExpandedContent from '../ExpandedContent/ExpandedContent';
import HeaderCell from '../HeaderCell';
import HeaderRow from '../HeaderRow';
import Row from '../Row';
import SubRow from '../Row/SubRow';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableOptions,
  LGRowData,
  LGTableDataType,
} from '../useLeafyGreenTable';
import Table, {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  TableProps,
} from '..';

import processColumns from './processColumns';
import processData from './processData';

type V11AdapterProps<
  T extends LGRowData,
  VS extends boolean,
> = PropsWithChildren<
  Pick<
    LeafyGreenTableOptions<T, VS>,
    'useVirtualScrolling' | 'hasSelectableRows'
  > &
    Pick<TableProps<T, VS>, 'shouldAlternateRowColor'>
>;

// assumes table is first element in children
// reads columns from columns' keys
// supports up to one layer of nested rows
// assumes that the key of a column in the original data === column label header in lowercase
const V11Adapter = <T extends LGRowData, VS extends boolean>({
  children,
  shouldAlternateRowColor,
  useVirtualScrolling = false as VS,
  hasSelectableRows = false,
}: V11AdapterProps<T, VS>) => {
  const containerRef = useRef(null);
  const OldTable = React.Children.toArray(children)[0];
  const {
    data,
    columns,
    children: childrenFn,
  } = (OldTable as ReactElement).props;
  const processedColumns: Array<ColumnDef<LGTableDataType<T>, any>> = useMemo(
    () => processColumns(data, columns),
    [data, columns],
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
    getSubRows: row => row.subRows,
    // useVirtualScrolling,
    hasSelectableRows,
  });

  const { rows } = table.getRowModel();

  return (
    <TableContainer ref={containerRef}>
      <Table
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
          {rows.map(row => {
            return (
              <Row key={row.id} row={row}>
                {row.getVisibleCells().map((cell: LeafyGreenTableCell<any>) => {
                  return (
                    <Cell key={cell.id} cell={cell}>
                      {cell.column.id === 'select' ? (
                        <>{cell.column.columnDef?.cell({ row })}</>
                      ) : (
                        // index by row.index, not the index of the loop to get the sorted order
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
                    <SubRow
                      key={subRow.id}
                      row={subRow}
                      // virtualRow={virtualRow}
                    >
                      {subRow.getVisibleCells().map(subRowCell => {
                        return (
                          <Cell key={subRowCell.id} cell={subRowCell}>
                            {subRow.original[subRowCell.column.id]()}
                          </Cell>
                        );
                      })}
                      {subRow.subRows &&
                        subRow.subRows.map(subSubRow => (
                          <SubRow
                            key={subSubRow.id}
                            row={subSubRow}
                            // virtualRow={virtualRow}
                          >
                            {subSubRow.getVisibleCells().map(subSubRowCell => {
                              return (
                                <Cell
                                  key={subSubRowCell.id}
                                  cell={subSubRowCell}
                                >
                                  {subSubRow.original[
                                    subSubRowCell.column.id
                                  ]()}
                                </Cell>
                              );
                            })}
                          </SubRow>
                        ))}
                    </SubRow>
                  ))}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default V11Adapter;
