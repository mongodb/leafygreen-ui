import React, { ReactElement, useMemo, useRef } from 'react';
import { PropsWithChildren } from 'react';

import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import HeaderRow from '../HeaderRow';
import Row from '../Row';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import useLeafygreenTable, { LeafyGreenTableCell, LGRowData, LGTableDataType } from '../useLeafygreenTable';
import Table, { flexRender, getCoreRowModel } from '..';

import processColumns from './processColumns';
import processData from './processData';

type V11AdapterProps = PropsWithChildren<{}>;

// assumes table is first element in children
// reads columns from columns' keys
const V11Adapter = <T extends LGTableDataType<LGRowData>>({ children }: V11AdapterProps) => {
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
                  .map((cell: LeafyGreenTableCell<any>, cellIndex) => {
                    return (
                      <Cell key={cell.id} cell={cell}>
                        {processedData[rowIndex][cell.column.id]()}
                      </Cell>
                    );
                  })}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default V11Adapter;
