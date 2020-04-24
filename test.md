### Material UI

```js
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Project</TableCell>
        <TableCell align="right">Team Member</TableCell>
        <TableCell align="right">Due Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.projectName}
          </TableCell>
          <TableCell align="right">{row.member}</TableCell>
          <TableCell align="right">{row.dueDate}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### Polaris

```js
<DataTable
  columnContentTypes={['text', 'text', 'numeric']}
  headings={['Project', 'Team Member', 'Due Date']}
  rows={rows}
/>
```

### Blueprint

```js
const cellRenderer = () => {
  return <Cell>{data}</Cell>;
};

<Table numRows={10}>
  <Column name="Project" cellRenderer={cellRenderer} />
  <Column name="Team Member" cellRenderer={cellRenderer} />
  <Column name="Due Date" cellRenderer={cellRenderer} />
</Table>;
```

### Atlaskit - TableTree

#### Implementation A

```js
<TableTree
  headers={['Project', 'Team Member', 'Due Date']}
  columns={['Project', 'Team Member', 'Due Date']}
  columnWidths={['200px', '200px']}
  items={[
  {
    id: //Item 1 id,
    content: {
      project: 'MongoNav',
      teamMember: 'Brooke',
      dueDate: 'yesterday'
    },
    hasChildren:
    children: [
      // Item 1 children
      {
        // Child 1
      }
    ]
  }
]}
/>
```

#### Implementation B

```js
<TableTree>
  <Headers>
    <Header width={300}>Project</Header>
    <Header width={100}>Member</Header>
    <Header width={100}>DueDate</Header>
  </Headers>
  <Rows
    items={items}
    render={({ project, member, dueDate }) => (
      <Row itemId={numbering} onExpand={this.loadTableData}>
        <Cell singleLine>{project}</Cell>
        <Cell singleLine>{member}</Cell>
        <Cell singleLine>{dueDate}</Cell>
      </Row>
    )}
  />
</TableTree>
```

### Atlaskit - DynamicTable

```js
<DynamicTable head={head} rows={rows} rowsPerPage={10} defaultPage={1} />
```
