import React from 'react';

import type {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
  LGTableDataType,
} from '../../packages/table/dist/types';
import {
  Cell,
  ExpandedContent,
  HeaderCell,
  Row,
} from '../../packages/table/dist/types';
import { InternalCellWithRT } from '../../packages/table/dist/types/Cell/InternalCellWithRT';
import { MemoizedInternalRowWithRT } from '../../packages/table/dist/types/Row/InternalRowWithRT';

interface Data {
  name: string;
}

declare const row: LeafyGreenTableRow<Data>;
declare const cell: LeafyGreenTableCell<Data>;
declare const otherRow: LeafyGreenTableRow<{ count: number }>;

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

({
  name: 'row',
  renderExpandedContent: () => <div />,
}) satisfies LGTableDataType<Data>;

// @ts-expect-error - cells require cell element refs
<Cell<Data> ref={React.createRef<HTMLDivElement>()} />;
// @ts-expect-error - headers require cell element refs
<HeaderCell<Data> ref={React.createRef<HTMLTableRowElement>()} />;
// @ts-expect-error - rows require row element refs
<Row<Data> ref={React.createRef<HTMLTableCellElement>()} />;
// @ts-expect-error - expanded content requires a data row
<ExpandedContent<Data> />;
<ExpandedContent<Data>
  row={row}
  // @ts-expect-error - expanded content requires row element refs
  ref={React.createRef<HTMLTableCellElement>()}
/>;
// @ts-expect-error - generic row data cannot change shape
<Row<Data> row={otherRow} />;
// @ts-expect-error - internal cells require a cell object
<InternalCellWithRT<Data> />;
