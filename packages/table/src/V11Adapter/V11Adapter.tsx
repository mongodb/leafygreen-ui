import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { VirtualItem } from 'react-virtual';
import { flexRender } from '@tanstack/react-table';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce, isComponentType } from '@leafygreen-ui/lib';

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
  className,
}: V11AdapterProps<T>) => {
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);
  const OldTable = flattenChildren(children)[0];

  consoleOnce.warn(
    'V11Adapter passes all V10 Row props to the V11 Row, which may result in unwanted props being passed.',
  );

  if (!isComponentType(OldTable, 'Table')) {
    consoleOnce.error(
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

  const [processedData, setProcessedData] = useState<Array<LGTableDataType<T>>>(
    () => processData(data, processedColumns, childrenFn),
  );

  useEffect(() => {
    setProcessedData(processData(data, processedColumns, childrenFn));
  }, [data, processedColumns, childrenFn]);

  const table = useLeafyGreenTable<T>({
    containerRef,
    data: processedData,
    columns: processedColumns,
    useVirtualScrolling,
    hasSelectableRows,
  });

  const { rows } = table.getRowModel();

  const iterables = useVirtualScrolling ? table.virtualRows ?? [] : rows;

  const columnsChildren = React.Children.toArray(columns);

  let HeaderRowProps = {};

  if (columnsChildren.length < 2) {
    const HeaderRow = columnsChildren[0] as ReactElement;
    HeaderRowProps = HeaderRow.props;
  }

  return (
    <Table
      darkMode={darkMode}
      table={table}
      shouldAlternateRowColor={
        shouldAlternateRowColor ?? processedData.length > 10
      }
      className={className}
      ref={containerRef}
      {...(OldTable as ReactElement).props}
    >
      <TableHead>
        <HeaderRow {...HeaderRowProps}>
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
          // @ts-expect-error rowProps is an additional prop passed by the `processData` function
          const { children, ...originalRowProps } = row.original.rowProps;
          return (
            <Row
              key={row.index}
              row={row}
              virtualRow={
                useVirtualScrolling ? (iterable as VirtualItem) : undefined
              }
              {...originalRowProps}
            >
              {row.getVisibleCells().map((cell: LeafyGreenTableCell<any>) => {
                if (cell?.column?.id) {
                  if (cell?.column?.id === 'select') {
                    return (
                      <Cell>
                        {/* @ts-expect-error `cell` is instantiated in `processColumns` */}
                        {cell.column.columnDef?.cell({ row, table })}
                      </Cell>
                    );
                  } else {
                    const cellChild =
                      // index by row.index (not the index of the loop) to get the sorted order
                      // @ts-expect-error `processedData` is structured to be indexable by `row.index`
                      processedData[row.index]?.[cell.column.id]?.();
                    const { children, ...cellChildProps } = cellChild.props;
                    return cellChild ? (
                      <Cell key={cell.id} {...cellChildProps}>
                        <>{children}</>
                      </Cell>
                    ) : (
                      <></>
                    );
                  }
                } else {
                  return <></>;
                }
              })}
              {row.original.renderExpandedContent && (
                <ExpandedContent row={row} />
              )}
              {row.subRows &&
                row.subRows.map(subRow => {
                  // @ts-expect-error rowProps is an additional prop passed by the `processData` function
                  const { children, ...subRowProps } = subRow.original.rowProps;
                  return (
                    <Row key={subRow.id} row={subRow} {...subRowProps}>
                      {subRow.getVisibleCells().map(srCell => {
                        /* @ts-expect-error subRow.original returns the object in the user's defined shape, and should be string indexable */
                        const subRowCell = subRow.original[srCell.column.id]();
                        const { children, ...subRowCellProps } =
                          subRowCell.props;
                        return (
                          <Cell key={subRowCell.id} {...subRowCellProps}>
                            {children}
                          </Cell>
                        );
                      })}
                    </Row>
                  );
                })}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default V11Adapter;
