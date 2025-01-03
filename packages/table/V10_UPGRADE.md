# Upgrading v10 to v13

If you are using v10 and want to upgrade to v13, it is recommended to first review the [upgrading v10 to v11 guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md#upgrading-v10-to-v11).

As highlighted in the [upgrading v10 to v11 guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md#upgrading-v10-to-v11), v11 introduced the `useLeafyGreenTable` hook which utilizes the [react-table](https://tanstack.com/table/v8) and [react-virtual]() libraries to support both regular and virtual scrolling tables.

In v13, the `useLeafyGreenTable` hook is still used, but a new hook, `useLeafyGreenVirtualTable`, has been introduced specifically for virtual scrolling tables.

**Before**:

```jsx
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
</Table>
```

**After**:

```js
const [data] = useState(() => makeKitchenSinkData(200)); // makeKitchenSinkData is dummy data

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
	<Table table={table}>
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

## What changed?

### Composition-based API

The table API was updated to make use of composition, exporting a set of UI components that wrap HTML Table elements:

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
```

**Usage**

```jsx
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
</Table>
```

### Data

The `data` prop on the `<Table>` component has been removed.

#### Basic table without using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook:

You do not need to pass the data, instead it is recommended to map through the data and return each row.

```jsx
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
</Table>
```

#### Table using the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook:

Data must be passed to the hook:

```
const table = useLeafyGreenTable<any>({
  data,
  columns,
});
```

```
const table = useLeafyGreenVirtualTable<any>({
  containerRef: tableContainerRef,
  data,
  columns,
});
```

For more information on the data structure please refer to the [data section in the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md#data-required)

### Columns

In v10, the `columns` prop defines the structure of the table columns. Each column is created using the `TableHeader` component. However, in v13, there is no `columns` prop. Instead, columns are defined outside of the table and passed to the table instance.

**Before:**

```jsx
<Table
  data={defaultData}
  columns={[
    <TableHeader label="Name" />,
    <TableHeader label="Age" />,
    <TableHeader label="Color" sortBy={datum => datum.color} />,
    <TableHeader label="Location" />,
  ]}
>
```

**After:**

Column definition:

Column definitions are essential for setting up a table, as they define how the data is accessed and displayed. Each column definition is a plain object that can include various options such as accessorKey, accessorFn, header, and more. For more information on column configurations, please refer to the [columns section in the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md#columns-required).

```jsx
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

// Columns are passed to the Table instance
const table = useLeafyGreenTable<KitchenSink>({
  data,
  columns,
});
```

Header columns:

The `getHeaderGroups` function is used to retrieve all header groups for a table. It returns an array of HeaderGroup objects. In this example, `table.getHeaderGroups()` is called to get the header groups, and then each header group is mapped over to render the headers. Each header within a group is also mapped over to render its content.

_note:_ `flexRender` is used to render the cell content based on the column definition and the context provided by the table. This approach ensures that any additional markup or JSX is handled correctly, allowing for more complex cell rendering logic.

```jsx
...
<TableHead>
  // Mapping through header rows
  {table.getHeaderGroups().map((headerGroup: HeaderGroup<KitchenSink>) => (
    <HeaderRow key={headerGroup.id}>
      // Mapping through header cells
      {headerGroup.headers.map((header, index) => {
        return (
          <HeaderCell key={header.id} header={header}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </HeaderCell>
        );
      })}
    </HeaderRow>
  ))}
</TableHead>
...
```

### Rendering rows

In v10, the `Table` component uses a render prop pattern, where it expects a function as its child. This function receives each row's data (datum) and returns a JSX structure for that row. However, in v13, rows are returned from the table instance.

**Before**:

```jsx
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
</Table>
```

**After**:

In v13, rows are returned from the table instance using the `getRowModel` method. The `getRowModel` is a method used to retrieve the final row model after all processing from other features has been applied. For more information on the rendering rows please refer to the [rendering rows section in the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md#rendering-rows).

_note:_ `flexRender` is used to render the cell content based on the column definition and the context provided by the table. This approach ensures that any additional markup or JSX is handled correctly, allowing for more complex cell rendering logic.

```jsx
// Table instance
const table = useLeafyGreenTable<KitchenSink>({
  data,
  columns,
});

// Rows returned from the table instance
const { rows } = table.getRowModel();

return (
	<Table table={table}>
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
      // mapping through rows
      {rows.map((row: LeafyGreenTableRow<KitchenSink>) => {
        return (
          // row is required
          <Row key={row.id} row={row}>
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
        );
      })}
    </TableBody>
```
