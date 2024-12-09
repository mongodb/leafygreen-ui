# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

The Table component displays data in rows and columns and optionally supports row selection, sorting, and other features.

## Supported features

The LeafyGreen Table wraps TanStack's [`react-table`](https://github.com/tanstack/table)'s hooks and types. Although all `react-table` features are supported using LeafyGreen Table, only the following features are styled according to design system guidelines:

- Virtualized scrolling
- Nested rows
- Expandable rows
- Selectable rows
- Sortable rows
- Sticky headers

Although other features from [`react-table`](https://github.com/tanstack/table#quick-features) are supported, we discourage developers from utilizing them as they would not align with MongoDB design systems guidelines.

# Installation

---

### Yarn

```shell
yarn add @leafygreen-ui/table
```

### NPM

```shell
npm install @leafygreen-ui/table
```

## Basic Example

---

```js
import {
  Table,
  TableHead,
  HeaderRow,
  TableBody,
  Row,
  Cell,
} from '@leafygreen-ui/table';

<Table {...args}>
  <TableHead>
    <HeaderRow>
      {columns.map((columnName: string) => (
        <HeaderCell key={columnName}>{columnName}</HeaderCell>
      ))}
    </HeaderRow>
  </TableHead>
  <TableBody>
    {data.map((row: { [key: string]: any }) => (
      <Row key={row.id}>
        {Object.keys(row).map((cellKey: string, index: number) => {
          return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
        })}
      </Row>
    ))}
  </TableBody>
</Table>;
```

## Example using `useLeafyGreenTable`

```js
import {
  Table,
  TableHead,
  HeaderRow,
  TableBody,
  Row,
  Cell,
} from '@leafygreen-ui/table';

const tableContainerRef = React.useRef<HTMLDivElement>(null);
const data = React.useState(() => makeData(false, 10_000))[0];

const columns = React.useMemo<Array<ColumnDef<Person>>>(
  () => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: info => info.getValue(),
    },
  ],
  [],
);

const table = useLeafyGreenTable<Person>({
  data,
  columns,
});

const { rows } = table.getRowModel();

<Table
  {...args}
  table={table}
  ref={tableContainerRef}
>
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
      <HeaderRow key={headerGroup.id}>
        {headerGroup.headers.map(header => {
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
    ))}
  </TableHead>
  <TableBody>
    {rows.map((row: LeafyGreenTableRow<Person>) => (
      <Row key={row.id} row={row}>
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
      </Row>
    )}
  </TableBody>
</Table>
```

## Example using `useLeafyGreenVirtualTable`

```js
import {
  Table,
  TableHead,
  HeaderRow,
  TableBody,
  Row,
  Cell,
} from '@leafygreen-ui/table';

const tableContainerRef = React.useRef<HTMLDivElement>(null);
const data = React.useState(() => makeData(false, 10_000))[0];

const columns = React.useMemo<Array<ColumnDef<Person>>>(
  () => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: info => info.getValue(),
    },
  ],
  [],
);

const table = useLeafyGreenVirtualTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  virtualizerOptions: {
	  estimateSize: () => 50,
    overscan: 10,
  }
});

const virtualItems = table.virtual.getVirtualItems();

<Table
  {...args}
  table={table}
  ref={tableContainerRef}
>
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
      <HeaderRow key={headerGroup.id}>
        {headerGroup.headers.map(header => {
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
    ))}
  </TableHead>
  <TableBody>
  {virtualItems &&
    virtualItems.map(
      (
        virtualRow: LeafyGreenVirtualItem<KitchenSink>,
      ) => {
        const row = virtualRow.row;
        const isExpandedContent = row.isExpandedContent ?? false;

        return (
          <Fragment key={virtualRow.key}>
            {!isExpandedContent && (
              <Row
                row={row}
                virtualRow={virtualRow}
              >
                {row
                  .getVisibleCells()
                  .map((cell: LeafyGreenTableCell<KitchenSink>) => {
                    return (
                      <Cell key={cell.id} cell={cell}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
              </Row>
            )}
            {isExpandedContent && (
              <ExpandedContent row={row} virtualRow={virtualRow} />
            )}
          </Fragment>
        );
      },
    )}
  </TableBody>
</Table>
```

# Exports

## `useLeafygreenTable`

`useLeafygreenTable` wraps [`react-table`](https://tanstack.com/table/v8) and [`react-virtual`](https://tanstack.com/virtual/v3/) to support advanced table functionalities and virtual scrolling.

`useLeafygreenTable` takes an `options` object and returns a table.

https://github.com/mongodb/leafygreen-ui/blob/63877b7ef6f40e165f691a39ca00fc5de39b690d/packages/table/src/Table.story.tsx#L660-L669

### Options

`useLeafygreenTable` exposes all [options](https://tanstack.com/table/v8/docs/api/core/table#options) used in `react-table`, with the following exceptions:

---

#### `hasSelectableRows?: boolean`

Setting this prop will inject checkbox cells into all rows. Refer to our [Storybook deployment](https://mongodb.github.io/leafygreen-ui) to find examples.

---

#### `allowSelectAll?: boolean`

This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.

---

#### `withPagination?: boolean`

Setting this prop will indicate that the Table component is being used with the Pagination component. This will expose various pagination utilities from `table.getState().pagination`. Find an example of how this prop should be used on our [Storybook deployment](https://mongodb.github.io/leafygreen-ui).

---

#### `data` / `renderExpandedContent`

`useLeafygreenTable` extends `react-table`'s `data` [option](https://tanstack.com/table/v8/docs/api/core/table#data) to allow a `renderExpandedContent` prop to be passed to the table's data type.

https://github.com/mongodb/leafygreen-ui/blob/63877b7ef6f40e165f691a39ca00fc5de39b690d/packages/table/src/useLeafyGreenTable/useLeafyGreenTable.types.ts#L19-L22

This option determines how the row's expanded content will be rendered. Refer to [Storybook deployment](https://mongodb.github.io/leafygreen-ui) for an example.

---

#### `data` / `subRows`

`useLeafygreenTable` extends `react-table`'s `data` [option](https://tanstack.com/table/v8/docs/api/core/table#data) to allow a `subRows` prop to be passed to the table's data type.

https://github.com/mongodb/leafygreen-ui/blob/63877b7ef6f40e165f691a39ca00fc5de39b690d/packages/table/src/useLeafyGreenTable/useLeafyGreenTable.types.ts#L19-L22

This option defines the data displayed in nested rows and expects an array of objects with the same shape as other rows. Rows can be nested multiple times. Refer to [Storybook deployment](https://mongodb.github.io/leafygreen-ui) for an example.

---

#### `columns` / `align`

`useLeafygreenTable` extends `react-table`'s `columns` [option](https://tanstack.com/table/v8/docs/api/core/table#columns) to allow a `align` prop to be passed to the column's data.

This option determines the alignment of the column. Refer to [Storybook deployment](https://mongodb.github.io/leafygreen-ui) for an example.

---

## `Table`

#### Props

| Name                      | Description                                                                                                                                        | Type                                                    | Default |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| `table`                   | Object returned from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook                                                                  | `'LeafyGreenTable<T>'` \| `'LeafyGreenVirtualTable<T>'` | -       |
| `shouldAlternateRowColor` | Determines whether alternating rows will have dark backgrounds                                                                                     | `boolean`                                               | `false` |
| `shouldTruncate`          | Whether all rows will truncate. If true, cells will truncate at one line. If false then there will be no height limit and cells will not truncate. | `boolean`                                               | `true`  |
| `verticalAlignment`       | When rows are not truncated, this will determine if cells should be top or middle aligned                                                          | `'top'` \| `'bottom'`                                   | `top`   |
| `baseFontSize`            | The base font size of the title and text rendered in children                                                                                      | `'13'` \| `'16'`                                        | `13`    |
| `darkMode`                | Render the component in dark mode.                                                                                                                 | `boolean`                                               | `false` |

\+ other HTML `table` element props

### `TableHead`

#### Props

| Name       | Description                                                            | Type      | Default |
| ---------- | ---------------------------------------------------------------------- | --------- | ------- |
| `isSticky` | Determines whether the table head will stick as the user scrolls down. | `boolean` | `false` |

\+ other HTML `thead` element props

### `HeaderRow`

#### Props

All HTML `tr` element props

### HeaderCell

#### Props

| Name     | Description                                                  | Type           | Default |
| -------- | ------------------------------------------------------------ | -------------- | ------- |
| `header` | `Header` object returned from the `useLeafygreenTable` hook. | Header<T, any> | -       |

\+ other HTML `th` element props

### TableBody

`TableBody` accepts HTML `tbody` element props.

### Row

| Name         | Description                                                                                                                                                           | Type                    | Default |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| `disabled`   | Determines whether the row is disabled                                                                                                                                | `boolean`               | `false` |
| `row`        | Row object passed from the `useLeafygreenTable` or `useLeafyGreenVirtualTable` hook. Required if using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hooks. | `LeafygreenTableRow<T>` | -       |
| `virtualRow` | Virtual row object passed from the `useLeafyGreenVirtualTable` hook. Required if using the `useLeafyGreenVirtualTable` hooks.                                         | `VirtualItem`           | -       |

\+ other HTML `tr` element props

### Cell

| Name   | Description                                                                                                                                                                                                            | Type                     | Default |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| `cell` | The cell object that is returned when mapping through a row passed from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook. Required if using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hooks. | `LeafyGreenTableCell<T>` | -       |

\+ other HTML `td` element props.

### `useLeafyGreenTable`

| Name                | Description                                                                                                                                                                             | Type                               | Default |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| `data`              | Data in the form of an array of objects, where each object represents a row in the table. Each property of the object corresponds to a column in the table.                             | `TableOptions<LGTableDataType<T>>` | -       |
| `columns`           | The columns configuration is an array of objects, where each object defines how a column behaves and renders.                                                                           | `TableOptions<LGTableDataType<T>>` | -       |
| `hasSelectableRows` | Setting this prop will inject a new column containing a checkbox into all rows.                                                                                                         | `boolean`                          | `false` |
| `withPagination`    | Setting this prop will indicate that the Table component is being used with the Pagination component. This will expose various pagination utilities from `table.getState().pagination`. | `boolean`                          | `false` |
| `allowSelectAll`    | This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.                                                           | `boolean`                          | `true`  |

### `useLeafyGreenVirtualTable`

| Name                 | Description                                                                                                                                                                             | Type                               | Default |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| `containerRef`       | A required ref to the `<div>` wrapping `<table>`                                                                                                                                        | `RefObject<HTMLElement>`           | -       |
| `data`               | Data in the form of an array of objects, where each object represents a row in the table. Each property of the object corresponds to a column in the table.                             | `TableOptions<LGTableDataType<T>>` | -       |
| `columns`            | The columns configuration is an array of objects, where each object defines how a column behaves and renders.                                                                           | `TableOptions<LGTableDataType<T>>` | -       |
| `hasSelectableRows`  | Setting this prop will inject a new column containing a checkbox into all rows.                                                                                                         | `boolean`                          | `false` |
| `withPagination`     | Setting this prop will indicate that the Table component is being used with the Pagination component. This will expose various pagination utilities from `table.getState().pagination`. | `boolean`                          | `false` |
| `allowSelectAll`     | This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.                                                           | `boolean`                          | `true`  |
| `virtualizerOptions` | Available [options](https://tanstack.com/virtual/latest/docs/api/virtualizer) to pass to the virtualizer instance                                                                       |

# Test Harnesses

## `getTestUtils()`

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Table` in a product test suite. If the `Table` component cannot be found, an error will be thrown.

### Usage

```tsx
import { Table, getTestUtils } from '@leafygreen-ui/table';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Table`. It defaults to 'lg-table' if left empty.
```

#### Single Table

```tsx
import { render } from '@testing-library/react';
import { Table, getTestUtils } from '@leafygreen-ui/table';

...

test('table', () => {
  render(<Table>...</Table>);
  const { getAllVisibleRows } = getTestUtils();
  expect(getAllVisibleRows().length).toEqual(3);
});
```

#### Multiple Tables

```tsx
import { render } from '@testing-library/react';
import { Table, getTestUtils } from '@leafygreen-ui/table';

...

test('returns the correct rows', () => {
  render(
    <>
      <Table>...</Table>
      <Table data-lgid="lg-table-2">...</Table>
    </>,
  );

  // First Table
  const { getAllVisibleRows } = getTestUtils();
  expect(getAllVisibleRows().length).toEqual(3);

  // Second Table
  const { getAllVisibleRows: getAllVisibleRowsB } = getTestUtils('lg-table-2');
  expect(getAllVisibleRowsB().length).toEqual(4);
});
```

### Test Utils

```tsx
const {
  getTable,
  getAllHeaders,
  getHeaderByIndex: (index: number) => { getElement, getSortIcon },
  getSelectAllCheckbox,
  getAllVisibleRows,
  getRowByIndex: (index: number) => {
    getElement,
    getAllCells,
    getCheckbox,
    getExpandButton,
    isExpanded,
    isSelected,
    isDisabled,
  },
  getAllVisibleSelectedRows,
} = getTestUtils();
```

| Util                              | Description                                                                                  | Returns                       |
| --------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------- |
| `getTable()`                      | Returns the table node or `null` if the table node is not found.                             | `HTMLTableElement`            |
| `getAllHeaders()`                 | Returns an array of `<th>`(`<HeaderCell>`) in the DOM. Throws if there are no elements.      | `Array<HTMLTableCellElement>` |
| `getHeaderByIndex(index: number)` | Returns utils for an individual `<th>`(`<HeaderCell>`) in the DOM                            | `HeaderUtils` \| `null`       |
| `getSelectAllCheckbox()`          | Returns the input node for the select all checkbox or `null`                                 | `HTMLInputElement` \| `null`  |
| `getAllVisibleRows()`             | Returns an array of all visible `<tr>`(`<Row>`) in the DOM. Throws if there are no elements. | `Array<HTMLTableRowElement>`  |
| `getRowByIndex(index: number)`    | Returns utils for an indivudial `<tr>`(`<Row>`) in the DOM                                   | `RowUtils` \| `null`          |
| `getAllVisibleSelectedRows`       | Returns an array of all visible selected `<tr>`(`<Row>`) in the DOM                          | `Array<HTMLTableRowElement>`  |

| HeaderUtils     | Description                       | Returns                       |
| --------------- | --------------------------------- | ----------------------------- |
| `getElement()`  | Returns the `<th>` element        | `HTMLTableCellElement`        |
| `getSortIcon()` | Returns the sort button or `null` | `HTMLButtonElement` \| `null` |

| RowUtils            | Description                                                        | Returns                       |
| ------------------- | ------------------------------------------------------------------ | ----------------------------- |
| `getElement()`      | Returns the `<tr>`(`<HeaderCell>`) element                         | `HTMLTableRowElement`         |
| `getAllCells()`     | Returns an array with all the `<td>`(`<Cell>`) elements in the row | `Array<HTMLTableCellElement>` |
| `getCheckbox()`     | Returns the input element or `null`                                | `HTMLInputElement` \| `null`  |
| `getExpandButton()` | Returns the expand button element or `null`                        | `HTMLButtonElement` \| `null` |
| `isExpanded()`      | Returns if the `<tr>`(`<Row>`) is expanded                         | `boolean`                     |
| `isSelected()`      | Returns if the `<tr>`(`<Row>`) is selected                         | `boolean`                     |
| `isDisabled()`      | Returns if the `<tr>`(`<Row>`) is disabled                         | `boolean`                     |
