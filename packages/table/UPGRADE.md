# v10 to v11

v11 introduces a large set of new features including virtualized scrolling and sticky header rows. For a functional overview, refer to the [project brief](https://docs.google.com/document/u/1/d/1AaZfYAGi9MCxU-cutWovDwTl_4jViUP34QwMFiWMSxU/edit).

## Overview

The largest change is that the usage API has changed to a set of UI components that wrap HTML Table elements (e.g. `<thead>` equates to the `<TableHead>` component). This should improve the DX of creating basic tables.

For more complex functionalities, v11 exports the `useLeafygreenTable` hook which leverages the [react-table](https://tanstack.com/table/v8) and [react-virtual]() libraries. As of v11.0.0, the hook supports:

- virtualized scrolling
- nested rows
- expanded content
- sortable rows
- selectable rows

MongoDB developers should not utilize other `react-table` that are not specified in LeafyGreen's Storybook, as the use cases specified in Storybook are the only ones that have been designed for according to guidelines.

### Other changes

- **Zebra striping behavior is no longer applied by default for data sets over 10 rows.** Use the `shouldAlternateRowColor` prop on the `Table` component to achieve the same effect. Note that we discourage the usage of zebra stripes in conjunction with nested rows or expandable content.

- **Disabled cells are no longer supported.** We found in our design audit that this prop was not being used. We recommend applying styles that match our disabled rows if you would like to disable specific cells.

- **Multi-row headers are no longer supported.** We found in our design audit that this prop was not being used. Reach out to the Design Systems team if this prop is crucial to your team's needs.

### `V11Adapter`

The `V11Adapter` was created to allow v10 Table components to utilize v11 features with minimal effort.

Given the two versions' significant differences in API, the adapter makes several assumptions about the v10 Table's usage:

- It is assumed that the v10 Table component will be the first child.
- The v11 columns are read from the v10 columns' labels. If the key of the cells' data does not correspond to the v10 column's label, the user is expected to pass in the labels through the `headerLabels` prop.
- Currently only supports up to one layer of nested rows.

#### Props

| Name                      | Description                                                                                                                                                                                                                  | Type                     | Default |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| `shouldAlternateRowColor` | Determines whether alternating rows will have dark backgrounds. The V11Adapter will apply this behavior by default for Tables with >10 rows to replicate v10 styling behavior unless overridden by this prop.                | boolean                  | false   |
| `useVirtualScrolling`     | Determines whether the table will utilize virtual scrolling                                                                                                                                                                  | boolean                  | false   |
| `hasSelectableRows`       | Determines whether the table will render its rows with selection behavior                                                                                                                                                    | boolean                  | false   |
| `headerLabels`            | `V11Adapter` will infer column's keys from the v10 columns' labels. If the key of the cells' data does not correspond to the v10 column's label, the user is expected to pass in the labels through the `headerLabels` prop. | { [key: string]: string} | -       |

#### Sample Usage

```js
import {
  Table,
  TableHead,
  HeaderRow,
  TableBody,
  Row,
  Cell,
} from '@leafygreen-ui/table';

<V11Adapter hasSelectableRows useVirtualScrolling>
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
  </Table>
</V11Adapter>;
```

Refer to the LeafyGreen Storybook deployment for more use cases.
