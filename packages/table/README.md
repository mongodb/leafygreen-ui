# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/table
```

### NPM

```shell
npm install @leafygreen-ui/table
```

## Example

```js
import { Table, HeaderRow, TableHeader, Row, Cell } from '@leafygreen-ui/table';

<Table
  data={defaultData}
  columns={[
    <TableHeader label="Name" />,
    <TableHeader label="Age" />,
    <TableHeader label="Color" sortBy={datum => datum.color} />,
    <TableHeader label="Location" />,
  ]}
>
  {({ datum }) => (
    <Row key={datum.name}>
      <Cell>{datum.name}</Cell>
      <Cell>{datum.age}</Cell>
      <Cell>{datum.color}</Cell>
      <Cell>{datum.location}</Cell>
    </Row>
  )}
</Table>;
```

## Table Properties

| Prop       | Type                                                                                          | Description                                                | Default |
| ---------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| `data`     | `Array<unknown>`                                                                              | Data that will be rendered inside of the table             |         |
| `columns`  | `Array<React.ReactElement<HeaderRowProps`, `TableHeaderProps<Shape>>>`, `React.ReactFragment` | Columns in the Table                                       |         |
| `children` | `(datum, string) => JSX.Element`                                                              | Rows of the table                                          |         |
| ...        | native `table` attributes                                                                     | Any other props will be spread on the root `table` element |         |

# HeaderRow

| Prop       | Type                     | Description                                                       | Default |
| ---------- | ------------------------ | ----------------------------------------------------------------- | ------- |
| `children` | `TableHeader` components | `TableHeader` components that comprise a header row in the table. |         |
| ...        | native `tr` attributes   | Any other props will be spread on the root `tr` element           |         |

# TableHeader

| Prop       | Type                                                      | Description                                                                        | Default |
| ---------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| `label`    | `string`                                                  | Content that will be rendered inside of the `th` tags                              |         |
| `sortBy`   | `(data: any) => string`, `string`                         | String or function that provides information about how the column should be sorted |         |
| `dataType` | `'number'`, `'weight'`, `'zipCode'`, `'string'`, `'date'` | Describes the type of data in the column                                           |         |
| ...        | native `th` attributes                                    | Any other props will be spread on the root `th` element                            |         |

# Row

| Prop       | Type                   | Description                                                                  | Default |
| ---------- | ---------------------- | ---------------------------------------------------------------------------- | ------- |
| `disabled` | `boolean`              | Determines whether or not the row is disabled                                | `false` |
| `expanded` | `boolean`              | Determines whether or not the row is expanded on first render                | `false` |
| ...        | native `tr` attributes | Any property that can be passed to a `tr` element will be spread on the root |         |

# Cell

| Prop        | Type                           | Description                                                     | Default |
| ----------- | ------------------------------ | --------------------------------------------------------------- | ------- |
| `children`  | `React.ReactNode`              | Contents to appear inside of the Cell                           |         |
| `className` | `string`                       | className applied to `td` or `th` wrapper (see `isHeader` prop) |         |
| `isHeader`  | `boolean`                      | Renders the cell as a `th` element                              | `false` |
| ...         | native `td` or `th` attributes | Any other props will be spread on the root `td` or `th` element |         |
