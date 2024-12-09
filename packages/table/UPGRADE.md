# Upgrading v12 to v13

Table v11 and v12 had performace issues when working with large datasets and didn't offer much flexibility. Table v13 makes table more performant and flexible to use.

For more details on how to use LeafyGreen `Table` v13, check out the [README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md).

## What's new?

- All LeafyGreen table components accept `forwardRefs`
- All LeafyGreen table components support `StyledComponents`
- Rows now support multiline text. By default, text truncation is enabled but can be disabled using the `shouldTruncate` prop on `<Table>`. When `shouldTruncate` is `true`, all rows will display a single line of text. When `false`, rows with long text will display all lines of the content.

  ```
    <Table
      table={table}
      shouldTruncate={false}
    >
      ...
    </Table>
  ```

## What changed?

### Rows

- Row transition were removed to increase performance.
- Rows are memoized to increase performance.
- Internally, we removed the mapping and flattening of `Row` children. Moving forward, consumers no longer need to explicitly render subrows and expanded content as children of `Row`. Instead, rows, subrows, and expanded content are returned as siblings within the row object.

  **Before**:

  Manually rendering subrows with a `row.subRows` check

  ```
  {rows.map((row: LeafyGreenTableRow<Person>) => {
    return (
      <Row key={row.id} row={row}>
        {row
          .getVisibleCells()
          .map((cell: LeafyGreenTableCell<Person>) => {
            return (
              <Cell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext(),
                )}
              </Cell>
            );
          })}
          // Checking for subrows
          {row.subRows &&
            row.subRows.map(subRow => (
              <Row key={subRow.id} row={subRow}>
                {subRow.getVisibleCells().map(cell => {
                  return (
                    <Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Cell>
                  );
                })}
                // Checking for subrows
                {subRow.subRows &&
                  subRow.subRows.map(subSubRow => (
                    <Row key={subSubRow.id} row={subSubRow}>
                      {subSubRow.getVisibleCells().map(cell => {
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
                  ))}
              </Row>
            ))}
        </Row>
      );
    })}
  ```

  **After**:

  This will render both rows and subrows. No extra checks needed.

  ```
  {rows.map((row: LeafyGreenTableRow<Person>) => {
    return (
      <Row row={row} key={row.id}>
        {row
          .getVisibleCells()
          .map((cell: LeafyGreenTableCell<Person>) => {
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
    );
  })}
  ```

### Expanded content

Expanded content is included in the row object as a sibling of its parent row. You will need to check if a row is expanded content using `row.isExpandedContent`.

**Before**:

Expanded content is rendered as a child of `Row` and we check for `row.original.renderExpandedContent`

```
{rows.map((row: LeafyGreenTableRow<Person>) => {
  return (
    <Row key={row.id} row={row}>
      {row
        .getVisibleCells()
        .map((cell: LeafyGreenTableCell<Person>) => {
          return (
            <Cell key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext(),
              )}
            </Cell>
          );
        })}
       // renders expanded content
      {row.original.renderExpandedContent && (
        <ExpandedContent row={row} />
      )}
    </Row>
  );
})}
```

**After**:

Expanded content is rendered as a sibling of `Row`. Instead of checking for `row.original.renderExpandedContent`, we check for `row.isExpandedContent`.

```
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
      // renders expanded content
      {isExpandedContent && <ExpandedContent row={row} />}
    </Fragment>
  );
})}
```

### `useLeafyGreenTable` hook

`useLeafyGreenTable` will no longer accept `useVirtualScrolling` and `virtualizerOptions`. To use a virtual table, use the new hook, `useLeafyGreenVirtualTable`, which extends `useLeafyGreenTable`.

**Before**:

```
const table = useLeafyGreenTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  useVirtualScrolling: true,
  virtualizerOptions: {
    estimateSize,
  },
});
```

**After**:

```
const table = useLeafyGreenTable<Person>({
  data,
  columns,
});
```

### `useLeafyGreenVirtualTable` hook

To implement a virtual table, use the `useLeafyGreenVirtualTable` hook. This hook extends the functionality of `useLeafyGreenTable`.

**Before**:

You map through virtrual rows with `table.virtualRows` and get the corresponding row with `rows[virtualRow.index]`

```
const table = useLeafyGreenTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  useVirtualScrolling: true,
  virtualizerOptions: {
    estimateSize,
  },
});

const { rows } = table.getRowModel();

<TableBody>
  {table.virtualRows &&
    table.virtualRows.map((virtualRow: VirtualItem) => {
      const row = rows[virtualRow.index];
      const cells = row.getVisibleCells();
      return (
        <Row key={row.id}>
          {cells.map((cell: LeafyGreenTableCell<Person>) => {
            return (
              <Cell
                key={cell.id}
                className={css`
                  padding-block: 4px;

                  & > div {
                    max-height: unset;
                  }
                `}
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext(),
                )}
              </Cell>
            );
          })}
        </Row>
      );
    })}
</TableBody>
```

**After**:

You map through virtual rows with `table.virtual.getVirtualItems()` and get the corresponding row with `virtualRow.row`.

```
const table = useLeafyGreenVirtualTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  virtualizerOptions: {
    estimateSize,
  },
});

 <TableBody>
  {table.virtual.getVirtualItems() &&
    table.virtual
      .getVirtualItems()
      .map(
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
```

# Upgrading v11 to v12

Table v12 cleans up the API for features introduced in v11, allowing developers to use the Table component with no exports directly from `@tanstack/react-table`.

For example, what used to be:

```
import {
  getCoreRowModel,
} from '@tanstack/react-table';

const table = useLeafyGreenTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

is now simply:

```
const table = useLeafyGreenTable<Person>({
  containerRef: tableContainerRef,
  data,
  columns,
  withPagination: true,
});
```

Other props dependent on various row models (e.g. `getSortingRowModel`, `getExpandedRowModel`, etc. are now also baked into `useLeafyGreenTable`.)

Given this change, the package no longer exports all exports from `@tanstack/react-table`. The only exports from v12 are types/interfaces and `flexRender` [(Source)](https://github.com/TanStack/table/blob/8c290319134a56a14b8204d309479d03a64edc72/packages/react-table/src/index.tsx#L15), which allows for rendering dynamic values by column and is used heavily throughout our examples.

# Upgrading v10 to v11

Table v11 introduces a large set of new features and API changes including virtualized scrolling, sticky header rows, and a composition-based API. For a functional overview, refer to the [project brief](https://docs.google.com/document/u/1/d/1AaZfYAGi9MCxU-cutWovDwTl_4jViUP34QwMFiWMSxU/edit).

## Overview

Most notably, we have updated the table API to make use of composition, exporting a set of UI components that wrap HTML Table elements (i.e. `<thead>` equates to the `<TableHead>` component). This should improve the DX of creating basic tables, as it feels more similar to the DX of building HTML tables.

For more complex features, v11 exports the `useLeafygreenTable` hook which leverages the [react-table](https://tanstack.com/table/v8) and [react-virtual]() libraries.

As of v11.0.0, the hook supports:

- virtualized scrolling
- nested rows
- expanded content
- sortable rows
- selectable rows

MongoDB developers should not utilize other `react-table` features that are not specified in LeafyGreen's [Storybook](https://mongodb.github.io/leafygreen-ui), as other features may not follow our design guidelines.

### Other changes

- **Alternating row colors (or "zebra striping") are no longer applied by default for data sets over 10 rows.** Use the `shouldAlternateRowColor` prop on the `Table` component to achieve the same effect. Note that we are not supporting usage of zebra stripes in conjunction with nested rows or expandable content as the new gray background of nested rows will make striped rows less legible.

- **Disabled cells are no longer supported.** We recommend applying styles that match our disabled rows if you would like to disable specific cells.

- **Multi-row headers are no longer supported.** Reach out to the Design Systems team if this prop is crucial to your team's needs.

### `V11Adapter`

The `V11Adapter` was created to allow developers to upgrade to v11 without needing to refactor all tables to the new API.

Given the two versions' significant differences in API, the adapter makes several assumptions about the v10 Table's usage:

- The v10 Table component must be the first (and only?) child of the adapter
- Column definitions will be read from the v10 Table `columns` prop's labels. If the key of the cells' data does not correspond to the v10 column's label, the user is expected to pass in the labels through the `headerLabels` prop.
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

Refer to the [Leafygreen Storybook deployment](https://mongodb.github.io/leafygreen-ui) for more use cases.
