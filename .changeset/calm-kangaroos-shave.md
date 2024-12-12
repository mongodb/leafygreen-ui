---
'@leafygreen-ui/table': major
---

Table v13 brings performance optimizations when working with large datasets and offers greater flexibility.

For more details on how to use LeafyGreen `Table` v13, check out the [README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md).

## What's new?

- All LeafyGreen table children components can accept a `forwardRef`
- All LeafyGreen table components support `styled-components`
- `shouldTruncate`: Rows now support multiline text. By default, text truncation is enabled but can be disabled using the `shouldTruncate` prop on `<Table>`. When `shouldTruncate` is `true`, all rows will display a single line of text. When `false`, rows with long text will display all lines of the content. Additionally, when truncation is disabled, text is top-aligned by default. 
- `verticalAlignment`: If text truncation is disabled, you can change the text alignment to `middle` or `top` using the new `verticalAlignment` prop.

  ```
    <Table
      table={table}
      shouldTruncate={false}
      verticalAlignment="middle"
    >
      ...
    </Table>
  ```

## What changed?

### Table V10 and V11 Adapter
- These have been removed in this version.

### `Row` component

- Row transitions were removed to increase performance.
- Rows are memoized to increase performance.
- `row` is a required prop if using `useLeafyGreenTable` or `useLeafyGreenVirtualTable`.
- `virtualRow` is a required prop if using `useLeafyGreenVirtualTable`.
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

  This will render both rows and subrows. No extra checks are needed.

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

### `ExpandedContent` component

- `row` is a required prop if using `useLeafyGreenTable` or `useLeafyGreenVirtualTable`.
- `virtualRow` is a required prop if using `useLeafyGreenVirtualTable`.
- Expanded content is included in the row object as a sibling of its parent row. You will need to check if a row is expanded content using `row.isExpandedContent`.

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

### `Cell` component

- `cell` is a new required prop on `Cell` if using `useLeafyGreenTable` or `useLeafyGreenVirtualTable`. This is needed for styling purposes.
- Removes `overflow` prop. Instead use `shouldTruncate` on `<Table>`


### `HeaderCell` component
- Removes `sortState` prop. It was never used in the component.
- Removes `cellIndex` prop.

### `Table` component
- Removes `disableAnimations` prop. 

### `useLeafyGreenTable` hook

`useLeafyGreenTable` will no longer accept `useVirtualScrolling` and `virtualizerOptions`. To use a virtual table, use the new hook, [`useLeafyGreenVirtualTable`](#useleafygreenvirtualtable-hook), which extends `useLeafyGreenTable`.

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

We have upgraded to the latest version of TanStack's `react-virtual` package. As a result, some properties and instances returned from `useLeafyGreenVirtualTable` may differ slightly from those returned by `useLeafyGreenTable` in versions 11 and 12. For a complete list of properties and methods, refer to TanStack's [documentation](https://tanstack.com/virtual/v3/docs/api/virtualizer#virtualizer-instance).

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
              <Cell key={cell.id}>
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
