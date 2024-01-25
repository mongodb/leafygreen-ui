# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

> _Upgrading from pre-v10? Check out our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md) for help on how to migrate to the updated API._

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
  containerRef: tableContainerRef,
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
      <Row key={row.id}>
        {row.getVisibleCells().map((cell: LeafyGreenTableCell<Person>) => {
          return (
            <Cell key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              )}
            </Cell>
          );
        })}
      </Row>
    )}
  </TableBody>
</Table>
```

More specific code samples are available below pertaining to each documented feature.

# Exports

---

## `useLeafygreenTable`

`useLeafygreenTable` wraps [`react-table`](https://tanstack.com/table/v8) and [`react-virtual`](https://tanstack.com/virtual/v3) to support advanced table functionalities and virtual scrolling.

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

#### `useVirtualScrolling`

`react-virtual`'s `useVirtual` hook will be called if this option is set. When this option is set, the object returned by `useLeafygreenTable` will include `virtualRows`, `totalSize` and `scrollToIndex`. Refer to our [Storybook deployment](https://mongodb.github.io/leafygreen-ui) to find examples.

> Note that the number of virtual rows rendered depends on the height passed to the `Table` component. For a reasonably performant use of virtual scrolling, ensure that there is a height set on the component to reduce the number of virtual rows rendered.

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

| Name                      | Description                                                                                 | Type     | Default |
| ------------------------- | ------------------------------------------------------------------------------------------- | -------- | ------- |
| `shouldAlternateRowColor` | Determines whether alternating rows will have dark backgrounds                              | boolean  | false   |
| `disableAnimations`       | Disables all transition animations for smoother rendering of tall content where appropriate | boolean  | false   |
| `baseFontSize`            | The base font size of the title and text rendered in children                               | 13 \| 16 | 13      |
| `darkMode`                | Render the component in dark mode.                                                          | boolean  | false   |

\+ other HTML `table` element props

### `TableHead`

#### Props

| Name       | Description                                                            | Type    | Default |
| ---------- | ---------------------------------------------------------------------- | ------- | ------- |
| `isSticky` | Determines whether the table head will stick as the user scrolls down. | boolean | false   |

\+ other HTML `thead` element props

> If `isSticky` is set to `true`, the `Table` component will need to have a CSS `height` value set in pixels.

### `HeaderRow`

#### Props

All HTML `tr` element props

### HeaderCell

#### Props

| Name      | Description                                                  | Type           | Default                     |
| --------- | ------------------------------------------------------------ | -------------- | --------------------------- |
| sortState | Determines the current sorting direction.                    | `SortState`    | `'asc' 'desc' 'off' 'none'` |
| header    | `Header` object returned from the `useLeafygreenTable` hook. | Header<T, any> | -                           |

\+ other HTML `th` element props

### TableBody

`TableBody` accepts HTML `tbody` element props.

> The `TableBody` will render as a `React.Fragment` when Tables have expandable or nested rows to support virtualized scrolling on rows with unknown heights.
>
> This is done to ensure that dynamic heights of rows with expandable content can be measured using a `ref` using a `tbody` element. In lieu of a `rowgroup` HTML element, expandable content relies on `tbody` to track groups of rows. This means the `TableBody` needs to render as a `React.Fragment` to ensure there aren't `tbody` elements inside `tbody` elements.

### Row

| Name       | Description                                                   | Type                    | Default |
| ---------- | ------------------------------------------------------------- | ----------------------- | ------- |
| disabled   | Determines whether the row is disabled                        | `boolean`               | `false` |
| row        | Row object passed from the `useLeafygreenTable` hook.         | `LeafygreenTableRow<T>` | -       |
| virtualRow | Virtual row object passed from the `useLeafygreenTable` hook. | `VirtualItem`           | -       |

\+ other HTML `tr` element props

### Cell

`Cell` accepts HTML `td` element props.

> All nested row animations are set at the Cell level, with a `max-height` set to 40vh, which should cover most cases with a relatively smooth animation. For taller content, set `disableAnimation={true}` or override the max-height with a `& > div { max-height: ... }` CSS selector on the `Cell` component.

## Feature Examples

### Virtualized Scrolling

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--basic)

https://github.com/mongodb/leafygreen-ui/blob/63877b7ef6f40e165f691a39ca00fc5de39b690d/packages/table/src/TableWithVS.story.tsx#L115-L158

> Note that the number of virtual rows rendered depends on the height passed to the `Table` component. For a reasonably performant use of virtual scrolling, ensure that there is a height set on the component to reduce the number of virtual rows rendered.

### Sortable Rows

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--sortable-rows)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--sortable-rows)

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/TableWithVS.stories.tsx#L42-L48

### Selectable Rows

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--selectable-rows)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--selectable-rows)

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/Table.stories.tsx#L375-L385

### Expandable Content

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--expandable-content)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--expandable-content)

To add expandable content to your Table, ensure the `renderExpandedContent` prop is passed to the row's data through `useLeafygreenTable`'s data prop.

### React 18

For cases where you anticipate having more than 20 rows with nested rows, it is advisable to opt for virtual scrolling to improve performance of row transitions.
