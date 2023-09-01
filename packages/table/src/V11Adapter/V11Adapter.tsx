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
import { TableHeaderProps } from '../TableV10/TableHeader';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
  LGColumnDef,
  LGTableDataType,
} from '../useLeafyGreenTable';

import processColumns from './processColumns';
import processData from './processData';
import { V11AdapterProps, ValidDataType } from './V11Adapter.types';

/**
 * Converts a v10 Table component to a v11 Table component.
 *
 * Given the two versions' significant differences in API, the adapter makes several assumptions about the v10 Table's usage:
 * - It is assumed that the v10 Table component will be the first child.
 * - The v11 columns are read from the v10 columns' labels. If the key of the cells' data does not correspond to the v10 column's label,
 * the user is expected to pass in the labels through the `headerLabels` prop.
 * - Currently only supports up to one layer of nested rows
 */
const V11Adapter = <T extends ValidDataType>({
  children,
  shouldAlternateRowColor,
  useVirtualScrolling = false,
  hasSelectableRows = false,
  headerLabels,
  className,
}: V11AdapterProps<T>) => {
  const containerRef = useRef(null);
  const OldTable = flattenChildren(children)[0];

  if (!isComponentType(OldTable, 'Table')) {
    consoleOnce.error(
      'The first and only child of `Table.V11Adapter` must be a `V10Table` component',
    );
  }

  const OldTableProps = (OldTable as ReactElement).props;
  const { darkMode } = useDarkMode(OldTableProps.darkMode);
  type TData = typeof OldTableProps.data extends Array<infer U> ? U : never;

  const {
    data: oldData,
    columns: oldColumns,
    children: childrenFn,
    baseFontSize,
    ...oldTableProps
  } = OldTableProps as V10TableProps<TData>;

  const data = oldData as Array<T>;

  const processedColumns = useMemo(
    () => processColumns(data, oldColumns, headerLabels),
    [data, oldColumns, headerLabels],
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
    columns: processedColumns as Array<LGColumnDef<T>>,
    useVirtualScrolling,
    hasSelectableRows,
  });

  const { rows } = table.getRowModel();

  const iterables = useVirtualScrolling ? table.virtualRows ?? [] : rows;

  const columnsChildren = React.Children.toArray(oldColumns);
  const oldHeaderRow = columnsChildren[0] as ReactElement;

  const oldHeaderCellProps: Array<TableHeaderProps<T>> = [];

  if (columnsChildren.length < 2) {
    React.Children.toArray(oldHeaderRow.props.children).map(child => {
      const { label, dataType, ...props } = (child as ReactElement).props;
      oldHeaderCellProps.push(props);
    });
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
      baseFontSize={baseFontSize === 14 ? 13 : baseFontSize}
      {...oldTableProps}
    >
      <TableHead>
        <HeaderRow {...oldHeaderRow.props}>
          {table.getHeaderGroups()[0].headers.map((header, i) => {
            const { onClick, ...validOldHeaderCellProps } =
              oldHeaderCellProps[i];
            return (
              <HeaderCell
                key={header.id}
                header={header}
                {...validOldHeaderCellProps}
                onClick={
                  onClick
                    ? () => {
                        // return a function from this function to bypass different type signatures
                        return onClick;
                      }
                    : undefined
                }
              >
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
              {...(row.original as T).rowProps}
            >
              {row.getVisibleCells().map((cell: LeafyGreenTableCell<T>) => {
                if (cell?.column?.id) {
                  if (cell?.column?.id === 'select') {
                    return (
                      <Cell key={cell.column.id}>
                        {cell.column.columnDef?.cell &&
                          typeof cell.column.columnDef?.cell != 'string' &&
                          // Use default values defined by react-table instead of passing in expected parameters
                          // @ts-expect-error
                          cell.column.columnDef?.cell({ row, table })}
                      </Cell>
                    );
                  } else {
                    const cellChild =
                      processedData[row.index]?.[cell.column.id]?.();
                    const {
                      children,
                      isHeader,
                      isDisabled,
                      ...cellChildProps
                    } = cellChild.props;
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
                  const { children, ...subRowProps } = subRow.original
                    .rowProps as ValidDataType['rowProps'];
                  return (
                    <Row key={subRow.id} row={subRow} {...subRowProps}>
                      {subRow.getVisibleCells().map(srCell => {
                        const subRowCell = subRow.original[srCell.column.id]();
                        const {
                          children,
                          isHeader,
                          isDisabled,
                          ...subRowCellProps
                        } = subRowCell.props;
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
