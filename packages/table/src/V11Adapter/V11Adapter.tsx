import React, { ReactElement, useMemo, useRef } from 'react';
import { PropsWithChildren } from 'react';

import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import HeaderRow from '../HeaderRow';
import Row from '../Row';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import useLeafygreenTable, { LeafygreenTableCell, LeafygreenTableType } from '../useLeafygreenTable';
import Table, { flexRender, getCoreRowModel, RowData } from '..';

import processColumns from './processColumns';
import processData from './processData';
import ExpandedContent from '../ExpandedContent/ExpandedContent';
import SubRow from '../Row/SubRow';

type V11AdapterProps<VS extends boolean> = PropsWithChildren<{
  useVirtualScrolling?: VS;
}>;

// assumes table is first element in children
// reads columns from columns' keys
// supports up to one layer of nested rows
const V11Adapter = <T extends LeafygreenTableType<RowData>, VS extends boolean>({ children, useVirtualScrolling = false as VS }: V11AdapterProps) => {
  const containerRef = useRef(null);
  const OldTable = React.Children.toArray(children)[0];
  const {
    data,
    columns,
    children: childrenFn,
  } = (OldTable as ReactElement).props;
  const processedColumns = processColumns(columns);
  const processedData = processData(data, processedColumns, childrenFn);

  console.log({ data, processedData });

  const table = useLeafygreenTable<T>({
    containerRef,
    data: processedData,
    columns: useMemo(() => processedColumns, []),
    getCoreRowModel: getCoreRowModel(),
    getSubRows: row => row.subRows,
    useVirtualScrolling,
  });

  const { rows } = table.getRowModel();

  return (
    <TableContainer ref={containerRef}>
      <Table table={table} shouldAlternateRowColor={processedData.length > 10}>
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
          {rows.map((row, rowIndex) => {
            return (
              <Row key={row.id} row={row}>
                {row
                  .getVisibleCells()
                  .map((cell: LeafygreenTableCell<any>) => {
                    return (
                      <Cell key={cell.id} cell={cell}>
                        {processedData[rowIndex][cell.column.id]()}
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
                                <Cell key={subSubRowCell.id} cell={subSubRowCell}>
                                  {subRow.original[subSubRowCell.column.id]()}
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
