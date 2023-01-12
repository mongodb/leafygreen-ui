# Table

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/table.svg)

#### Temp todos
- propTypes for all exported components
- import all react-table and react-virtual exports and export them from our package
- styles for disabled rows and clickable rows


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

## Overview

*Upgrading from v10 to v11? Check out our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md)*

## Exports

#### useLeafygreenTable



#### TableContainer

#### TableHead

#### HeaderRow

#### HeaderCell

#### TableBody

#### Row

#### Cell
## Feature Examples

### Virtualized Scrolling
### Sortable Rows

### Selectable Rows

### Expandable Content