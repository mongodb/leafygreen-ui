# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

> _Upgrading from pre-v10 to v11? Check out our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md)._

The Table component displays data in rows and columns and optionally supports row selection, sorting, and other features.

## Supported features

- Virtualized scrolling
- Nested rows
- Expandable rows
- Selectable rows
- Sortable rows
- Sticky headers

While other features from [`react-table`](https://github.com/tanstack/table#quick-features) could be supported, we discourage developers from utilizing them unless they are explicitly supported by Leafygreen, as they would not align with MongoDB design systems guidelines.

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

## Example

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
        <HeaderCell key={columnName} columnName={columnName} />
      ))}
    </HeaderRow>
  </TableHead>
  <TableBody>
    {data.map((row: LeafygreenTableRow<T>) => (
      <Row>
        {Object.keys(row).map((cellKey: string, index: number) => {
          return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
        })}
      </Row>
    ))}
  </TableBody>
</Table>;
```

# Exports

---

## `useLeafygreenTable`

`useLeafygreenTable` wraps [`react-table`](https://tanstack.com/table/v8) and [`react-virtual`](https://tanstack.com/virtual/v3) to support advanced table functionalities and virtual scrolling.

`useLeafygreenTable` takes an `options` object and returns a table.

https://github.com/mongodb/leafygreen-ui/blob/734da7f621c96c6e0de5e431e28162757166fa79/packages/table/src/Table/TableWithVS.stories.tsx#L79-L85

### Options

`useLeafygreenTable` exposes all [options](https://tanstack.com/table/v8/docs/api/core/table#options) used in `react-table`, with the following exceptions:

---

#### `hasSelectableRows?: boolean`

Setting this prop will inject checkbox cells into all rows. Refer to our [Storybook deployment](https://mongodb.github.io/leafygreen-ui) to find examples.

---

#### `useVirtualScrolling`

`react-virtual`'s `useVirtual` hook will be called if this option is set. When this option is set, the object returned by `useLeafygreenTable` will include `virtualRows` and `totalSize`. Refer to our [Storybook deployment](https://mongodb.github.io/leafygreen-ui) to find examples.

---

#### `data` / `renderExpandedContent`

`useLeafygreenTable` extends `react-table`'s `data` [option](https://tanstack.com/table/v8/docs/api/core/table#data) to allow a `renderExpandedContent` prop to be passed to the table's data type.

https://github.com/mongodb/leafygreen-ui/blob/734da7f621c96c6e0de5e431e28162757166fa79/packages/table/src/useLeafygreenTable/useLeafygreenTable.types.ts#L27-L29

This option determines how the row's expanded content will be rendered. Refer to [Storybook deployment](https://mongodb.github.io/leafygreen-ui) for an example.

---

## `TableContainer`

The `TableContainer` is a simple `<div>` element with CSS properties intended to enable sticky headers and other functionalities that depend on `useLeafygreenTable`.

For virtual scrolling, ensure the `ref` that is passed to `useLeafygreenTable` as `containerRef` is passed to `TableContainer`.

https://github.com/mongodb/leafygreen-ui/blob/734da7f621c96c6e0de5e431e28162757166fa79/packages/table/src/Table/TableWithVS.stories.tsx#L79-L100

#### Props

All HTML `div` element props.

## `Table`

#### Props

| Name                      | Description                                                    | Type     | Default |
| ------------------------- | -------------------------------------------------------------- | -------- | ------- |
| `shouldAlternateRowColor` | Determines whether alternating rows will have dark backgrounds | boolean  | false   |
| `baseFontSize`            | The base font size of the title and text rendered in children  | 13 \| 16 | 13      |
| `darkMode`                | Render the component in dark mode.                             | boolean  | false   |

\+ other HTML `table` element props

### `TableHead`

#### Props

| Name       | Description                                                            | Type    | Default |
| ---------- | ---------------------------------------------------------------------- | ------- | ------- |
| `isSticky` | Determines whether the table head will stick as the user scrolls down. | boolean | false   |

\+ other HTML `thead` element props

### `HeaderRow`

#### Props

All HTML `tr` element props

### HeaderCell

#### Props

| Name      | Description                                                                                                                           | Type                | Default                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------- |
| align     | The `align` prop set on a HeaderCell will serve as the default `align` prop on the TableCell corresponding to the HeaderCell's index. | `td` `align` values |                             |
| sortState | Determines the current sorting direction.                                                                                             | `SortState`         | `'asc' 'desc' 'off' 'none'` |
| header    | `Header` object returned from the `useLeafygreenTable` hook.                                                                          | Header<T, any>      | -                           |

\+ other HTML `th` element props

### TableBody

| Name                    | Description                                                          | Type              | Default |
| ----------------------- | -------------------------------------------------------------------- | ----------------- | ------- |
| renderingExpandableRows | Indicate whether the Table is rendering expandable rows in its body. | `boolean`         | `false` |
| table                   | Return value from the `useLeafygreenTable` hook.                     | `LeafygreenTable` | -       |

\+ other HTML `tbody` element props

> The `TableBody` will render as a `React.Fragment` when `renderingExpandableRows` is `true` to support virtualized scrolling on rows with unknown heights.
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

| Name | Description                                            | Type                | Default |
| ---- | ------------------------------------------------------ | ------------------- | ------- |
| cell | Cell object passed from the `useLeafygreenTable` hook. | `LeafygreenCell<T>` | -       |

\+ other HTML `td` element props

## Feature Examples

### Virtualized Scrolling

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--basic)

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/TableWithVS.stories.tsx#L101-L139

### Sortable Rows

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--sortable-rows)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--sortable-rows)

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/Table.stories.tsx#L221-L228

### Selectable Rows

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--selectable-rows)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--selectable-rows)

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/Table.stories.tsx#L375-L385

### Expandable Content

[Demo](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table--expandable-content)

[Demo with virtualized scrolling](https://mongodb.github.io/leafygreen-ui/?path=/story/components-table-with-virtualized-scrolling--expandable-content)

To add expandable content to your Table, ensure the `renderExpandedContent` prop is passed to the row's data through `useLeafygreenTable`'s data prop.
