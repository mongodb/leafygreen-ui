# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

> _Upgrading from pre-v10 to v11? Check out our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md)._

The Table component ...

## Quick features

- Virtualized scrolling
- Nested rows
- Expandable rows
- Selectable rows
- Sortable rows
- Sticky headers
- ...and everything else from [`react-table`](https://github.com/tanstack/table#quick-features)!

#### Temp todos

- ensure parity between v10 and v11 functionalities
- accessibility checks (keyboard controls, aria labels, etc.)
- propTypes for all exported components
- create index.ts for all subcomponents
- import all react-table and react-virtual exports and export them from our package
- remove unused imports from all files
- replace all instances of unnecessary `any` types
- ensure TS types are failsafe
- resolve any UI discrepancies
- write tests

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
      {columns.map((columnName: any) => (
        <HeaderCell key={columnName} columnName={columnName} />
      ))}
    </HeaderRow>
  </TableHead>
  <TableBody>
    {data.map((row: any) => (
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
Setting this prop will inject checkbox cells into all rows. Refer to __ to find examples.

---

#### `useVirtualScrolling`
`react-virtual`'s `useVirtual` hook will be called if this option is set. When this option is set, the object returned by `useLeafygreenTable` will include `virtualRows` and `totalSize`. Refer to __ to find examples.

---

#### `data` / `renderExpandedContent`
`useLeafygreenTable` extends `react-table`'s `data` [option](https://tanstack.com/table/v8/docs/api/core/table#data) to allow a `renderExpandedContent` prop to be passed to the table's data type.

https://github.com/mongodb/leafygreen-ui/blob/734da7f621c96c6e0de5e431e28162757166fa79/packages/table/src/useLeafygreenTable/useLeafygreenTable.types.ts#L27-L29

This option determines how the row's expanded content will be rendered. Refer to __ for an example.

---

## `TableContainer`

The `TableContainer` is a simple `<div>` element with CSS properties intended to enable sticky headers and other functionalities that depend on `useLeafygreenTable`.

For virtual scrolling, ensure the `ref` that is passed to `useLeafygreenTable` as `containerRef` is passed to `TableContainer`.

https://github.com/mongodb/leafygreen-ui/blob/734da7f621c96c6e0de5e431e28162757166fa79/packages/table/src/Table/TableWithVS.stories.tsx#L79-L100

#### Props
All HTML `div` element props.

## `Table`

#### Props
|Name|Description|Type|Default|
|--- |--- |--- |--- |
|`shouldAlternateRowColor`|Determines whether alternating rows will have dark backgrounds|boolean|false|
|`baseFontSize`|The base font size of the title and text rendered in children|13 \| 16|13|
|`darkMode`|Render the component in dark mode.|boolean|false|
\+ other HTML `table` element props

### `TableHead`

#### Props
|Name|Description|Type|Default|
|--- |--- |--- |--- |
|`isSticky`|Determines whether the table head will stick as the user scrolls down.|boolean|false|
\+ other HTML `thead` element props

### `HeaderRow`

#### Props
All HTML `tr` element props

### HeaderCell

#### Props
|Name|Description|Type|Default|
|--- |--- |--- |--- |
|align|The `align` prop set on a HeaderCell will serve as the default `align` prop on the TableCell corresponding to the HeaderCell's index.|`td` `align` values||
|sortState|Determines the current sorting direction.|`SortState`|`'asc' 'desc' 'off' 'none'`|
|header|`Header` object passed from the `useLeafygreenTable` hook. | Header<T, any> |-|
\+ other HTML `th` element props

### TableBody

### Row

### Cell

## Feature Examples

### Virtualized Scrolling
[Demo]()

https://github.com/mongodb/leafygreen-ui/blob/f61df48a196c731764864d594d7d043634a9bcdc/packages/table/src/Table/Table.stories.tsx#L45-L64

### Sortable Rows
[Demo]()
[Demo with virtualized scrolling]()

### Selectable Rows
[Demo]()
[Demo with virtualized scrolling]()
### Expandable Content
[Demo]()
[Demo with virtualized scrolling]()