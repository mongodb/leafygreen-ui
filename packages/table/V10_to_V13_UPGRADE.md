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
                <HeaderCell key={header.id} header={header}>
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
);
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

Column definitions are essential for setting up a table, as they define how the data is accessed and displayed. Each column definition is a plain object that can include various options such as `accessorKey`, `accessorFn`, `header`, and more. For more information on column configurations, please refer to the [columns section in the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md#columns-required).

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

The `getHeaderGroups` function is used to retrieve all header groups for a table. It returns an array of `HeaderGroup` objects. In this example, `table.getHeaderGroups()` is called to get the header groups, and then each header group is mapped over to render the headers. Each header within a group is also mapped over to render its content.

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

### Sorting

In v10, there are three props that can be used for sorting: `sortBy`, `compareFn`, and `handleSort`.

These props have been removed in v13. Instead, sorting is handled within the column definition.

**Before:**

```jsx
  <TableHeader
    dataType={DataType.String}
    label="Name"
    key="name"
    compareFn={(a: any, b: any, dir) => {
      const reverse = (str: string) => str.split('').reverse().join('');

      // Pin 'Yvonne' to the top
      if (b.name === 'Yvonne') return 1;
      else if (a.name === 'Yvonne') return -1;

      // Sort by reversed name
      if (dir == 'desc') {
        return reverse(b.name) >= reverse(a.name) ? 1 : -1;
      }

      return reverse(b.name) >= reverse(a.name) ? -1 : 1;
    }}
  />

  <TableHeader
    dataType={DataType.Number}
    label="Age"
    key="age"
    sortBy={(datum: any) => datum.age.toString()}
  />

  <TableHeader
    dataType={DataType.String}
    label="Favorite Color"
    key="color"
    sortBy={(datum: any) => datum.color}
  />

  <TableHeader
    dataType={DataType.String}
    label="Location"
    key="location"
    handleSort={dir => {
      // eslint-disable-next-line no-console
      console.log(`Sorting location ${dir}`);
    }}
  />
```

**After:**

```jsx
const columns = [
  {
    header: () => 'Name',
    accessorKey: 'name',
    sortingFn: 'alphanumeric', // use built-in sorting function by name
  },
  {
    header: () => 'Age',
    accessorKey: 'age',
    sortingFn: 'myCustomSortingFn', // use custom global sorting function
  },
  {
    header: () => 'Birthday',
    accessorKey: 'birthday',
    sortingFn: 'datetime', // recommended for date columns
  },
  {
    header: () => 'Profile',
    accessorKey: 'profile',
    // use custom sorting function directly
    sortingFn: (rowA, rowB, columnId) => {
      return rowA.original.someProperty - rowB.original.someProperty;
    },
  },
  {
    header: () => 'Color',
    accessorKey: 'color',
    sortDescFirst: true, //sort by color in descending order first (default is ascending for string columns)
  },
];
```

For more information on sorting, check out the [sorting section in the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/README.md#sorting)

### Nested Rows/Sub Rows/Expanded Content

**Before:**

```jsx
<Table
  data={[
    {
      title: 'People',
      people: defaultData,
    },
    {
      title: 'Average',
      age: (
        defaultData.reduce((sum, { age }) => sum + age, 0) / defaultData.length
      ).toFixed(2),
    },
  ]}
  columns={
    <HeaderRow>
      <TableHeader key="name" label="Name" dataType="string" />
      <TableHeader key="age" label="Age" dataType="number" />
      <TableHeader label="Color" dataType="string" key="color" />
      <TableHeader key="location" label="Location" />
    </HeaderRow>
  }
>
  {({ datum }: { datum: any }) => (
    <Row key={datum.title}>
      <Cell isHeader={withHeaders}>{datum.title}</Cell>

      {datum.people ? (
        datum.people.map((person: any) => (
          <Row key={person.name}>
            <Cell isHeader={withHeaders}>{person.name}</Cell>
            <Cell>{person.age}</Cell>
            <Cell>{person.color}</Cell>
            <Cell>{person.location}</Cell>
          </Row>
        ))
      ) : (
        <Cell>{datum.age}</Cell>
      )}
    </Row>
  )}
</Table>
```

**After:**

Nested rows/sub rows render just like regular rows:

Data:

```jsx
const data = [
  {
    id: '1',
    name: 'One',
    color: 'red',
    subRows: [
      {
        id: '1.b',
        name: 'One',
        color: 'red',
      },
    ],
  },
];
```

Rendering:

```jsx
<Table table={table}>
  ...
  <TableBody>
    // renders both rows and subrows
    {rows.map((row: LeafyGreenTableRow<any>) => {
      return (
        <Row row={row} key={row.id}>
          {row.getVisibleCells().map((cell: LeafyGreenTableCell<any>) => {
            return (
              <Cell key={cell.id} cell={cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            );
          })}
        </Row>
      );
    })}
  </TableBody>
  ...
</Table>
```

Expanded Content is conditionally rendered by checking `row.isExpandedContent`:

Data:

```jsx
const data = [
  {
    id: '1',
    name: 'One',
    color: 'red',
    renderExpandedContent: row => <div>hi</div>,
  },
];
```

Rendering:

```jsx
<Table table={table}>
  ...
  <TableBody>
    {rows.map((row: LeafyGreenTableRow<Person>) => {
      // Checks if this is an expanded content
      const isExpandedContent = row.isExpandedContent ?? false;
      return (
        <Fragment key={row.id}>
          {!isExpandedContent && (
            <Row row={row}>
              {row.getVisibleCells().map(cell => {
                return (
                  <Cell key={cell.id} id={cell.id} cell={cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  ...
</Table>
```

For more information on rows, subrows, and expanded content, check out the [rendering rows section in the README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/table#rendering-rows)
