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
import { Table, TableHead, HeaderRow, TableBody, Row, Cell } from '@leafygreen-ui/table';

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
</Table>
```

## Table Properties

| Prop           | Type                                                                                          | Description                                                       | Default |
| -------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| `data`         | `Array<unknown>`                                                                              | Data that will be rendered inside of the table                    |         |
| `columns`      | `Array<React.ReactElement<HeaderRowProps`, `TableHeaderProps<Shape>>>`, `React.ReactFragment` | Columns in the Table                                              |         |
| `children`     | `(datum, string) => JSX.Element`                                                              | Rows of the table                                                 |         |
| `darkMode`     | `boolean`                                                                                     | Determines whether or not the component will appear in dark mode. | `false` |
| `baseFontSize` | `14`, `16`                                                                                    | Font-size value that is applied to cell elements                  | `14`    |
| ...            | native `table` attributes                                                                     | Any other props will be spread on the root `table` element        |         |

# HeaderRow

| Prop       | Type                     | Description                                                       | Default |
| ---------- | ------------------------ | ----------------------------------------------------------------- | ------- |
| `children` | `TableHeader` components | `TableHeader` components that comprise a header row in the table. |         |
| ...        | native `tr` attributes   | Any other props will be spread on the root `tr` element           |         |

# TableHeader

| Prop         | Type                                                      | Description                                                                                                                                                                                                                                                                                             | Default |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `label`      | `string`, `React.ReactNode`                               | Content that will be rendered inside of the `th` tags                                                                                                                                                                                                                                                   |         |
| `sortBy`     | `(data: any) => string`, `string`                         | String or function that provides information about how the column should be sorted                                                                                                                                                                                                                      |         |
| `dataType`   | `'number'`, `'weight'`, `'zipCode'`, `'string'`, `'date'` | Describes the type of data in the column                                                                                                                                                                                                                                                                |         |
| `compareFn`  | `(a: any, b: any, direction: 'asc' \| 'desc') => number`  | A callback to provide more customization in column sorting. This callback has a similar signature to the `Array.sort` method, with the addition of a `direction` parameter, which has values `asc` or `desc`. Pin a row to the top by returning -1 if `a` matches, and 1 if `b` matches the desired row |         |
| `handleSort` | `(direction: 'asc' \| 'desc') => void`                    | A callback that gets called when a user initiates sort on the column. Internal sorting is disabled when this callback is provided.                                                                                                                                                                      |         |
| ...          | native `th` attributes                                    | Any other props will be spread on the root `th` element                                                                                                                                                                                                                                                 |         |

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


# Selectable Rows

- Add through `hasSelectable` prop on Table
- or use `react-table` approach