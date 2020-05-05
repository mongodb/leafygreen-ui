import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '.';
import { Row, Cell, TableHeader } from '.';

storiesOf('Table', module).add('Default', () => (
  <Table
    data={[
      { name: 'Alice', age: 19, color: 'white', location: 'bedford' },
      { name: 'Brooke', age: 20, color: 'green', location: 'bedford' },
      { name: 'Charlotte', age: 21, color: 'white', location: 'bedford' },
      { name: 'Donna', age: 22, color: 'green', location: 'bedford' },
      { name: 'Emma', age: 23, color: 'white', location: 'bedford' },
      { name: 'Georgia', age: 24, color: 'white', location: 'bedford' },
      { name: 'Frannie', age: 25, color: 'green', location: 'bedford' },
      { name: 'Iman', age: 26, color: 'white', location: 'bedford' },
      { name: 'Hannah', age: 27, color: 'green', location: 'bedford' },
      { name: 'Jill', age: 28, color: 'green', location: 'bedford' },
    ]}
    columns={[
      <TableHeader label="Name" key="Name" />,
      <TableHeader label="Age" key="Age" />,
      <TableHeader label="Favorite Color" key="Color" />,
      'Location',
    ]}
  >
    {({ datum, rowIndex }) => (
      <Row key={rowIndex}>
        <Cell>{datum.name}</Cell>
        <Cell>{datum.age}</Cell>
        <Cell>{datum.color}</Cell>
        <Cell>{datum.location}</Cell>

        {datum.age > 21 && (
          <Row expanded={datum.age > 25}>
            <Cell>expanded name</Cell>
            <Cell>expanded age</Cell>
            <Cell>expanded color</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Row>
    )}
  </Table>
));
