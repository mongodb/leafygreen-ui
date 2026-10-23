/* eslint-disable jest/no-disabled-tests */
import React from 'react';

import { InternalCellWithRT } from './Cell/InternalCellWithRT';
import { MemoizedInternalRowWithRT } from './Row/InternalRowWithRT';
import {
  Cell,
  CellProps,
  ExpandedContent,
  ExpandedContentProps,
  HeaderCell,
  HeaderCellProps,
  LeafyGreenTableCell,
  LeafyGreenTableRow,
  Row,
  RowProps,
} from '.';

interface Data {
  name: string;
}

declare const row: LeafyGreenTableRow<Data>;
declare const cell: LeafyGreenTableCell<Data>;
declare const otherRow: LeafyGreenTableRow<{ count: number }>;

test.skip('generic table JSX callables accept props and typed refs', () => {
  Cell satisfies (props: CellProps<Data>) => React.ReactElement | null;
  HeaderCell satisfies (
    props: HeaderCellProps<Data>,
  ) => React.ReactElement | null;
  Row satisfies (props: RowProps<Data>) => React.ReactElement | null;
  ExpandedContent satisfies (
    props: ExpandedContentProps<Data>,
  ) => React.ReactElement | null;

  <Cell<Data> />;
  <Cell<Data> cell={cell} ref={React.createRef<HTMLTableCellElement>()} />;
  <HeaderCell<Data> ref={React.createRef<HTMLTableCellElement>()} />;
  <Row<Data> />;
  <Row<Data> row={row} ref={React.createRef<HTMLTableRowElement>()} />;
  <ExpandedContent<Data>
    row={row}
    ref={React.createRef<HTMLTableRowElement>()}
  />;
  <InternalCellWithRT<Data>
    cell={cell}
    ref={React.createRef<HTMLTableCellElement>()}
  />;
  <MemoizedInternalRowWithRT<Data>
    row={row}
    theme="light"
    shouldAlternateRowColor={false}
    isExpanded={false}
    isParentExpanded={false}
    isSelected={false}
    rowRef={{ current: null }}
  />;

  // @ts-expect-error - table cells require cell element refs
  <Cell<Data> ref={React.createRef<HTMLDivElement>()} />;
  // @ts-expect-error - headers require cell element refs
  <HeaderCell<Data> ref={React.createRef<HTMLTableRowElement>()} />;
  // @ts-expect-error - rows require row element refs
  <Row<Data> ref={React.createRef<HTMLTableCellElement>()} />;
  // @ts-expect-error - expanded content requires its data row
  <ExpandedContent<Data> />;
  // @ts-expect-error - row data remains generic
  <Row<Data> row={otherRow} />;
  // @ts-expect-error - internal cells require the cell object
  <InternalCellWithRT<Data> />;
});
