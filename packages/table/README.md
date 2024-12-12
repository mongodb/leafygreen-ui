# Table Docs

# Installation

### Yarn

```shell
yarn add @leafygreen-ui/table
```

### NPM

```shell
npm install @leafygreen-ui/table
```

## Basic

A basic table displays data in rows and columns without any additional functionality.

```jsx
import {
  Cell,
  HeaderCell
  HeaderRow,
  Row,
  Table,
  TableBody,
  TableHead,
} from '@leafygreen-ui/table';

<Table>
  <TableHead>
    <HeaderRow>
      <HeaderCell>First</HeaderCell>
      <HeaderCell>Second</HeaderCell>
      <HeaderCell>Third</HeaderCell>
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

## `useLeafyGreenTable`

The `useLeafyGreenTable` hook provides a custom integration with the `@tanstack/react-table` library to manage advanced table behavior such as sorting, expanding, and rendering rows dynamically. It builds on `@tanstack/react-table`'s `useReactTable` hook, adding LeafyGreen-specific configurations and integrations for seamless use with LeafyGreen's `Table` components.

Although all `react-table` features are supported using LeafyGreen Table, only the following features are styled according to design system guidelines:

- Sub rows
- Expandable rows
- Selectable rows
- Sortable rows
- Sticky row header

**Usage with LeafyGreen Table components**:

```jsx
import {
  Cell,
  flexRender
  HeaderCell
  HeaderRow,
  Row,
  Table,
  TableBody,
  TableHead,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';

// Data that should be passed to the `useLeafyGreenTable` hook.
const [data] = useState(() => makeKitchenSinkData(200));

// Column definition
const columns = React.useMemo<Array<LGColumnDef<KitchenSink>>>(
  () => [
    {
      accessorKey: 'rowOne',
      header: 'Row One',
    },
    {
      accessorKey: 'rowTwo',
      header: 'Row Two',
    },
    {
      accessorKey: 'rowThree',
      header: 'Row Three',
    },
  ],
  [],
);

// Table instance
const table = useLeafyGreenTable<KitchenSink>({
  data,
  columns,
});

// Rows returned from the table instance
const { rows } = table.getRowModel();

return (
	<Table
	  table={table}
	  className={virtualScrollingContainerHeight}
	>
	  <TableHead>
	   // Mapping through header rows
	    {table
	      .getHeaderGroups()
	      .map((headerGroup: HeaderGroup<KitchenSink>) => (
	        <HeaderRow key={headerGroup.id}>
	         // Mapping through header cells
	          {headerGroup.headers.map((header, index) => {
	            return (
	              <HeaderCell
	                key={header.id}
	                header={header}
	              >
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
      {rows.map((row: LeafyGreenTableRow<KitchenSink>) => {
        // Checks if row is expandedContent
        const isExpandedContent = row.isExpandedContent ?? false;

        return (
          <Fragment key={row.id}>
            {!isExpandedContent && (
              // row is required
              <Row row={row}>
                // Maps through visible cells
                {row.getVisibleCells().map(cell => {
                  return (
                    // cell is required
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
    </TableBody>
</Table>
)
```

### Data (required)

The `useLeafyGreenTable` hook expects data in the form of an array of objects, where each object represents a row in the table. Each property of the object corresponds to a column in the table. Here’s a breakdown of the key requirements for the data:

#### **Structure**

- **Rows**: Each row is an object containing key-value pairs.
  - **Key**: Corresponds to the column’s `accessorKey` defined in the column configuration.
  - **Value**: The data displayed in the cell for that row and column.
    **Example**:
  ```jsx
  const data = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', age: 30 },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', age: 25 },
  ];
  ```
- **SubRows**: Are used to represent nested rows within a parent row. This is useful for hierarchical data where each row can have child rows. The `data` can include a `subRows` key in each object. This key holds an array of child rows for that specific row.

  **Example**:

  ```jsx
  const data = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      age: 30,
      subRows: [{ id: 11, firstName: 'Anna', lastName: 'Smith', age: 5 }],
    },
  ];
  ```

- **ExpandedContent**: Is used to display additional content when a row is expanded. This content is not necessarily a nested row but can be any additional information related to the row.

  **Example**:

  ```jsx
  const SampleExpandedContent = (row: LeafyGreenTableRow<unknown>) => {
    return (
      <div>
        <h4>Expanded Content for Row {row.id}</h4>
        <p>Additional details about this row:</p>
        <pre>{JSON.stringify(row.original, null, 2)}</pre>
      </div>
    );
  };

  const data = [
    {
      id: 1,
      name: 'Parent Row',
      subRows: [
        { id: 2, name: 'Child Row 1' },
        { id: 3, name: 'Child Row 2' },
      ],
      renderExpandedContent: SampleExpandedContent,
    },
  ];
  ```

#### Stable Reference

Data passed to `useLeafyGreenTable` MUST have a stable reference to ensure optimal performance and avoid unnecessary re-renders. Internally, `useReactTable` relies on reference equality for state updates. If the reference changes frequently, the hook might assume the data has been modified, triggering expensive updates. Changes to the data should explicitly signal an update. Stable references allow React to detect when actual changes occur versus unnecessary re-renders.

Example:

```jsx
const fallbackData = []

export default function MyComponent() {
  //✅ GOOD: This will not cause an infinite loop of re-renders because `columns` is a stable reference
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference
  const [data, setData] = useState(() => [
    // ...
  ]);

  // Columns and data are defined in a stable reference, will not cause infinite loop!
  const table = useReactTable({
    columns,
    data ?? fallbackData, //also good to use a fallback array that is defined outside of the component (stable reference)
  });

  return <table>...</table>;
}
```

`React.useState` and `React.useMemo` are not the only ways to give your data a stable reference. You can also define your data outside of the component or use a 3rd party state management library.

The main thing to avoid is defining the data array inside the same scope as the useReactTable call. That will cause the data array to be redefined on every render, which will cause an infinite loop of re-renders.

For more information check out [TanStack's docs on giving data a stable reference](https://tanstack.com/table/latest/docs/guide/data#give-data-a-stable-reference).

### **Columns** (required)

The columns configuration is an array of objects, where each object defines how a column behaves and renders. It uses the `@tanstack/react-table` column definitions and might include:

- `accessorKey`: The key in the data object to use for that column.
- `header`: A string or function to define the column header.
- `cell`: A function for custom cell rendering.
- Other options like `enableSorting`, `size`, or `accessorFn` for computed values. Checkout [TanStack's docs on column definitions](https://tanstack.com/table/latest/docs/guide/column-defs) for more information.
  Example:
  ```jsx
  const columns = [
    { accessorKey: 'id', header: 'ID', size: 50 },
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'age', header: 'Age', size: 50, enableSorting: true },
  ];
  ```

### Options (optional)

`useLeafyGreenTable` also exposes all [table options](https://tanstack.com/table/latest/docs/api/core/table#options) used in `react-table` and by default, `useLeafyGreenTable` includes a few of those options:

```jsx
const [expanded, setExpanded] = useState < ExpandedState > {};

const table =
  useReactTable <
  LGTableDataType <
  T >>
    {
      state: {
        expanded,
        ...rest.state,
      },
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getRowCanExpand: row => {
        return !!row.original.renderExpandedContent || !!row.subRows?.length;
      },
      enableExpanding: true,
      enableSortingRemoval: hasSortableColumns ? true : undefined,
      getSubRows: row => row.subRows,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: withPagination
        ? getPaginationRowModel()
        : undefined,
      onExpandedChange: setExpanded,
      getExpandedRowModel: getLGExpandedRowModel(),
      ...rest,
    };
```

- `state`: The state object for the table
  - `expanded`: The current expanded state of the rows.
- `getCoreRowModel`: returns a basic row model that is just a 1:1 mapping of the original data passed to the table.
- `getSortedRowModel`: returns a row model that has had sorting applied to it.
- `getPaginationRowModel`: returns a row model that only includes the rows that should be displayed on the current page based on the pagination state.
- `getExpandedRowModel`: returns a custom row model that accounts for expandedContent and sub-rows.
- `getRowCanExpand`: override the default behavior of determining whether a row can be expanded.
- `enableExpanding`: enable expanding of all rows
- `enableSortingRemoval`: control the ability to remove sorting from a column
- `getSubRows`: used to access the sub rows for any given row
- `onExpandedChange`: called when the expanded table state changes

For other optional options check out the `useLeafyGreenTable` prop table [below](#useleafygreentable-3).

### What is returned?

The `useLeafyGreenTable` hook returns an object that extends the Table object from `react-table` with additional properties specific to LeafyGreen:

- `getRowModel`: Returns the an array with all rows, in addition to expanded subrows and expanded content. Subrows and expandedContent that are not expanded are not returned.
- `hasSelectableRows`: A boolean indicating whether the table has selectable rows.
- For more methods and properties available on the table object, refer to [TanStack's table API documentation](https://tanstack.com/table/latest/docs/api/core/table#table-api).

## `useLeafyGreenVirtualTable`

The `useLeafyGreenVirtualTable` hook integrates virtualization into the LeafyGreen table by combining `useVirtualizer` from `@tanstack/react-virtual` with `useLeafyGreenTable`. It processes table data while optimizing rendering for large datasets by rendering only visible rows.

The primary differences between `useLeafyGreenTable` and `useLeafyGreenVirtualTable` include the following:

- **Extension of Base Hook**: `useLeafyGreenVirtualTable` builds on `useLeafyGreenTable` to include virtual scrolling.
- **Efficient Rendering**: Utilizes the `@tanstack/react-virtual` library for optimized rendering of large datasets.
- **Container Reference**: Requires a `containerRef` for the scrolling container.
- **Virtual Properties**: Adds a `virtual` object to the returned table model, exposing properties and methods from the virtualizer for managing virtualized rows.

The options passed to `useLeafyGreenVirtualTable` are the same as those passed to `useLeafyGreenTable`, with the addition of properties specific to virtualization, such as a required `containerRef` and [optional virtualizer configuration options from Tanstack Virtual](https://tanstack.com/virtual/latest/docs/api/virtualizer#optional-options).

**Usage with LeafyGreen `Table` components**:

```jsx
import {
  Cell,
  flexRender
  HeaderCell
  HeaderRow,
  Row,
  Table,
  TableBody,
  TableHead,
  useLeafyGreenVirtualTable,
} from '@leafygreen-ui/table';

const tableContainerRef = React.useRef<HTMLDivElement>(null);
const [data] = useState(() => makeKitchenSinkData(10_000));

const virtualScrollingContainerHeight = css`
  height: calc(100vh - 200px);
`;

const columns = React.useMemo<Array<LGColumnDef<KitchenSink>>>(
  () => [
    {
      accessorKey: 'rowOne',
      header: 'Row One',
    },
    {
      accessorKey: 'rowTwo',
      header: 'Row Two',
    },
    {
      accessorKey: 'rowThree',
      header: 'Row Three',
    },
  ],
  [],
);

const table = useLeafyGreenVirtualTable<KitchenSink>({
  containerRef: tableContainerRef,
  data,
  columns,
  virtualizerOptions: {
	  estimateSize: () => 50,
    overscan: 10,
  }
});

return (
	<Table
	  table={table}
	  ref={tableContainerRef}
	  className={virtualScrollingContainerHeight}
	>
	  <TableHead>
	    {table
	      .getHeaderGroups()
	      .map((headerGroup: HeaderGroup<KitchenSink>) => (
	        <HeaderRow key={headerGroup.id}>
	          {headerGroup.headers.map((header, index) => {
	            return (
	              <HeaderCell
	                key={header.id}
	                header={header}
	              >
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
      {table.virtual.getVirtualItems() &&
        table.virtual
          .getVirtualItems()
          .map(
            (
              virtualRow: LeafyGreenVirtualItem<KitchenSink>,
              index: number,
            ) => {
              const row = virtualRow.row;
              const isExpandedContent = row.isExpandedContent ?? false;

              return (
                <Fragment key={virtualRow.key}>
                  {!isExpandedContent && (
                    // row and virtualRow is required
                    <Row
                      row={row}
                      virtualRow={virtualRow}
                      data-row-index={index}
                    >
                      {row
                        .getVisibleCells()
                        .map((cell: LeafyGreenTableCell<KitchenSink>) => {
                          return (
                            // cell is required
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
)
```

### virtualizerOptions

By default, `useLeafyGreenVirtualTable` passes the following defaults to the `useVirtulizer` hook:

```jsx
const table = useLeafyGreenTable({
  ...rest,
});

const { rows } = table.getRowModel();

const _virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 40,
  overscan: 20,
  ...virtualizerOptions,
});
```

- `count`: The total number of items to virtualize.
- `getScrollElement`: A function that returns the scrollable element for the virtualizer. It may return null if the element is not available yet.
- `estimateSize`: This function is passed the index of each item and should return the actual size (or estimated size if you will be dynamically measuring items with virtualItem.measureElement) for each item. This measurement should return either the width or height depending on the orientation of your virtualizer.
- `overscan`: The number of items to render above and below the visible area. Increasing this number will increase the amount of time it takes to render the virtualizer, but might decrease the likelihood of seeing slow-rendering blank items at the top and bottom of the virtualizer when scrolling.

You can override any of these defaults in the `useLeafyGreenVirtualTable` hook with any of these [options from TanStack's virtualizer options docs](https://tanstack.com/virtual/latest/docs/api/virtualizer#optional-options).

### What is returned?

The `useLeafyGreenVirtualTable` hook returns an object that extends the `useLeafyGreenTable` object with additional properties for virtual scrolling:

- `virtual`: An object containing properties and methods from the virtualizer instance, including a custom `getVirtualItems` method that maps virtual items to rows.
  - `getVirtualItems`: used to retrieve the virtualized items, mapping them to the corresponding rows in the table. This method ensures that only the visible rows are rendered, which improves performance when dealing with large datasets.
  - For more methods and properties available on the virtualizer instance, refer to [TanStack's virtualizer instance docs](https://tanstack.com/virtual/latest/docs/api/virtualizer#virtualizer-instance).

## Rendering Rows

Rows returned from `useLeafyGreenTable` and `useLeafyGreenVirtualTable` differ slightly:

### Rows and subrows without expanded content

### `useLeafyGreenTable`

Rows are accessed from the `table` object using the `getRowModel` method. In this case, the returned rows array includes only visible rows. Subrows that are not visible are excluded, but if a row is expanded, its corresponding subrows are included in the array.

Example:

```jsx
const table = useLeafyGreenTable<any>({
  data,
  columns,
});

// Destructured from the row model and used to render the table body.
const { rows } = table.getRowModel();

return(
	...
	<TableBody>
	  {rows.map((row: LeafyGreenTableRow<Person>) => {
	    return (
        // row is required
	      <Row row={row} key={row.id}>
	        {row.getVisibleCells().map(cell => {
	          return (
              // cell is required
	            <Cell key={cell.id} id={cell.id} cell={cell}>
	              {flexRender(cell.column.columnDef.cell, cell.getContext())}
	            </Cell>
	          );
	        })}
	      </Row>
	    );
	  })}
	</TableBody>
...
)
```

### `useLeafyGreenVirtualTable`

In a virtual table, rows are retrieved using the `getVirtualItems` method from the virtual property of the table object.

Example:

```jsx
const table =
  useLeafyGreenVirtualTable <
  Person >
  {
    containerRef: tableContainerRef,
    data,
    columns,
  };

const virtualItems = table.virtual.getVirtualItems();

<TableBody>
  {virtualItems &&
    virtualItems.map((virtualRow: LeafyGreenVirtualItem<Person>) => {
      const row = virtualRow.row;
      const cells = row.getVisibleCells();
      return (
        // row and virtualRow is required
        <Row key={virtualRow.key} virtualRow={virtualRow} row={row}>
          {cells.map((cell: LeafyGreenTableCell<Person>) => {
            return (
              // cell is required
              <Cell key={cell.id} cell={cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            );
          })}
        </Row>
      );
    })}
</TableBody>;
```

### Rows and subrows with expanded content

### `useLeafyGreenTable`

Similar to the example above, rows are accessed from the `table` object using the `getRowModel` method. However, when expanded content is included in the rows returned form the `getRowModel` method, rows needs to be conditionally rendered:

- For each row, the `isExpandedContent` property is checked to determine if the row is an expanded content row.
- If isExpandedContent is `false`, the row is rendered normally with its visible cells.
- If isExpandedContent is `true`, the ExpandedContent component is rendered, passing the row as a prop.

**Example**:

```jsx
const table =
  useLeafyGreenTable <
  any >
  {
    data,
    columns,
  };

// Destructured from the row model and used to render the table body.
const { rows } = table.getRowModel();

<TableBody>
  {rows.map((row: LeafyGreenTableRow<Person>) => {
    // Expanded content check
    const isExpandedContent = row.isExpandedContent ?? false;

    return (
      <Fragment key={row.id}>
        {!isExpandedContent && (
          // row is required
          <Row row={row}>
            {row.getVisibleCells().map(cell => {
              return (
                // cell is required
                <Cell key={cell.id} id={cell.id} cell={cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              );
            })}
          </Row>
        )}
        // row is required
        {isExpandedContent && <ExpandedContent row={row} />}
      </Fragment>
    );
  })}
</TableBody>;
```

### `useLeafyGreenVirtualTable`

Similar to the `useLeafyGreenTable` example above except in a virtual table, rows are retrieved using the `getVirtualItems` method from the virtual property of the table object.

Example:

```jsx
const table =
  useLeafyGreenVirtualTable <
  Person >
  {
    containerRef: tableContainerRef,
    data,
    columns,
  };

// Virtual rows
const virtualItems = table.virtual.getVirtualItems();

<TableBody>
  {virtualItems &&
    virtualItems.map((virtualRow: LeafyGreenVirtualItem<KitchenSink>) => {
      const row = virtualRow.row;
      // Expanded content check
      const isExpandedContent = row.isExpandedContent ?? false;

      return (
        // note: the key should be virtualRow.key not row.id
        <Fragment key={virtualRow.key}>
          {!isExpandedContent && (
            // row and virtualRow is required
            <Row row={row} virtualRow={virtualRow}>
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
            // row and virtualRow is required
            <ExpandedContent row={row} virtualRow={virtualRow} />
          )}
        </Fragment>
      );
    })}
</TableBody>;
```

### SubRow check

Since rows and expanded subrows are returned in the same hierarchy within the row object, a depth check is often necessary to distinguish whether a row is a subrow. This can typically be done using the `depth` property included in the row object, which indicates its nesting level within the hierarchy. If the depth is greater than `0`, then it is a subrow.

```jsx
<TableBody>
  {rows.map((row: LeafyGreenTableRow<Person>) => {
    const isExpandedContent = row.isExpandedContent ?? false;
    // depth check
    const depth = row.depth ?? 0;

    return (
      <Fragment key={row.id}>
        {!isExpandedContent && (
          // row is required
          // Different styling for a subrow
          <Row
            row={row}
            className={cx(css`
              background: ${depth === 1 ? 'white' : 'whitesmoke'};
            `)}
          >
            {row.getVisibleCells().map(cell => {
              return (
                // cell is required
                <Cell key={cell.id} id={cell.id} cell={cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  // Additional text for a subrow
                  {depth === 1 && 'Subrow'}
                </Cell>
              );
            })}
          </Row>
        )}
        // row is required
        {isExpandedContent && <ExpandedContent row={row} />}
      </Fragment>
    );
  })}
</TableBody>
```

## Table Layout

By default, LeafyGreen `Table` uses `table-layout: auto`. This [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) sets the algorithm used to lay out [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) cells, rows, and columns. When a `table-layout` is set to `auto` this means that the widths of the table and its cells are adjusted to fit the content, which is the default in most browsers.

### Defining Column Widths

You can specify column widths using the `size` property in your column definitions:

```jsx
const columns = [
  {
    accessorKey: 'col1',
    size: 270, //set column size for this column
  },
  //...
];
```

The width is applied to the corresponding `<th>` element, but in `auto` layout, it may not always be respected as columns adjust to content. If you want the width to always be respected, there are a few recommendations:

- **Add `min-width` to `HeaderCell`:** Prevent the header from shrinking below a minimum width.
  ```jsx
  <HeaderCell
    key={header.id}
    header={header}
    className={cx({
      [css`
        // since the table is not fixed, the width is not respected. This prevents the width from getting any smaller.
        min-width: 120px;
      `]: index === 5,
    })}
  >
  ```
- Use `table-layout: fixed`:
  With `fixed`, column widths are based only on the table’s width and specified column sizes. This approach ensures consistent widths but sacrifices responsiveness.

### Special Case: Virtual Tables

For tables with virtual scrolling and truncation disabled, `table-layout` is set to `fixed` by default to prevent row height shifts due to columns widths changing during scrolling. Without this, scrolling could cause layout issues and application crashes.

To maintain some responsiveness, mix fixed and auto column widths:

```jsx
const columns = [
  {
    accessorKey: 'col1',
    size: 200, //set column size for this column
  },
  {
    accessorKey: 'col2',
    size: 70, //set column size for this column
  },
  {
    accessorKey: 'col3',
    size: NaN, //set column size to `auto`
  },
];
```

**Limitations**: In `table-layout: fixed`, columns with `auto` widths do not support `min-width`, so they might shrink excessively on small viewports.

## Exports

`@leafygreen-ui/table` exports:

- LeafyGreen table components
- LeafyGreen table hooks
- All exports from `@tanstack/react-table`
- Test utils (README link)
- TypeScript types

All exports can be found [here](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/src/index.ts).

## Props

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

| Name     | Description                                                  | Type             | Default |
| -------- | ------------------------------------------------------------ | ---------------- | ------- |
| `header` | `Header` object returned from the `useLeafygreenTable` hook. | `Header<T, any>` | -       |

\+ other HTML `th` element props

### TableBody

`TableBody` accepts HTML `tbody` element props.

### Row

| Name         | Description                                                                                                                                                               | Type                    | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| `disabled`   | Determines whether the row is disabled                                                                                                                                    | `boolean`               | `false` |
| `row`        | Row object passed from the `useLeafygreenTable` or `useLeafyGreenVirtualTable` hook. **Required** if using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hooks. | `LeafygreenTableRow<T>` | -       |
| `virtualRow` | Virtual row object passed from the `useLeafyGreenVirtualTable` hook. **Required** if using the `useLeafyGreenVirtualTable` hooks.                                         | `VirtualItem`           | -       |

\+ other HTML `tr` element props

### Cell

| Name   | Description                                                                                                                                                                                                                | Type                     | Default |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| `cell` | The cell object that is returned when mapping through a row passed from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook. **Required** if using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hooks. | `LeafyGreenTableCell<T>` | -       |

\+ other HTML `td` element props.

### `useLeafyGreenTable`

| Name                | Description                                                                                                                                                                                                                                                                                                                           | Type                               | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| `data`              | Data in the form of an array of objects, where each object represents a row in the table. Each property of the object corresponds to a column in the table.                                                                                                                                                                           | `TableOptions<LGTableDataType<T>>` | -       |
| `columns`           | The columns configuration is an array of objects, where each object defines how a column behaves and renders.                                                                                                                                                                                                                         | `TableOptions<LGTableDataType<T>>` | -       |
| `hasSelectableRows` | Setting this prop will inject a new column containing a checkbox into all rows.                                                                                                                                                                                                                                                       | `boolean`                          | `false` |
| `withPagination`    | Setting this prop will indicate that the Table component is being used with the Pagination component. This will expose various pagination utilities from `table.getState().pagination`. For more information, check out [TanStack's pagination documentation](https://tanstack.com/table/latest/docs/guide/pagination) on pagination. | `boolean`                          | `false` |
| `allowSelectAll`    | This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.                                                                                                                                                                                                         | `boolean`                          | `true`  |

### `useLeafyGreenVirtualTable`

| Name                 | Description                                                                                                                                                 | Type                               | Default |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| `containerRef`       | A required ref to the `<div>` wrapping `<table>`                                                                                                            | `RefObject<HTMLElement>`           | -       |
| `data`               | Data in the form of an array of objects, where each object represents a row in the table. Each property of the object corresponds to a column in the table. | `TableOptions<LGTableDataType<T>>` | -       |
| `columns`            | The columns configuration is an array of objects, where each object defines how a column behaves and renders.                                               | `TableOptions<LGTableDataType<T>>` | -       |
| `hasSelectableRows`  | Setting this prop will inject a new column containing a checkbox into all rows.                                                                             | `boolean`                          | `false` |
| `allowSelectAll`     | This prop controls whether a 'select all' checkbox will be rendered in the header row. This will be set to `true` by default.                               | `boolean`                          | `true`  |
| `virtualizerOptions` | Available [TanStack virtualizer options](https://tanstack.com/virtual/latest/docs/api/virtualizer) to pass to the virtualizer instance                      |

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

# Examples (WIP)

- Basic
- Styled components
- Sticky header
- `useLeafyGreenTable`
  - Only rows
  - Rows and subrows
  - Expanded content
  - With extra custom columns
  - No Truncation
  - Zebra Stripes
  - Sortable rows
  - Selectable rows
  - Selectable rows with no select all
  - Disabled rows
  - With pagination
- `useLeafyGreenVirtualTable`
  - Only rows
  - Rows and subrows
  - Expanded content
  - With extra custom columns
  - No Truncation
  - Zebra Stripes
  - Sortable rows
  - Selectable rows
  - Selectable rows with no select all
  - Disabled rows
