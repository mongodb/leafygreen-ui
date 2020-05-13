import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Table from '.';
import { Row, Cell, TableHeader, HeaderRow } from '.';

interface DemoDataInterface {
  name: string;
  age: number;
  color: string;
  location: string;
}

storiesOf('Table', module)
  .add('Default', () => (
    <Table
      selectable={boolean('isSelectable', true)}
      data={[
        {
          name: 'Alice',
          age: 19,
          color: 'white',
          location: 'bedford',
        },
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
        <TableHeader label="Name" key="name" stickyColumn />,
        <TableHeader label="Age" key="age" />,
        <TableHeader label="Favorite Color" key="color" accessor="color" />,
        'Location',
      ]}
    >
      {({
        datum,
        rowIndex,
      }: {
        datum: DemoDataInterface;
        rowIndex: number;
      }) => (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>

          {datum.age > 21 && (
            <Row>
              <Cell>expanded name: {datum.name}</Cell>
              <Cell>expanded age: {datum.age}</Cell>
              <Cell>expanded color: {datum.color}</Cell>
              <Cell>{datum.location}</Cell>

              {datum.age > 25 && (
                <Row>
                  <Cell>expanded name: {datum.name}</Cell>
                  <Cell>expanded age: {datum.age}</Cell>
                  <Cell>expanded color: {datum.color}</Cell>
                  <Cell>{datum.location}</Cell>
                </Row>
              )}
            </Row>
          )}
        </Row>
      )}
    </Table>
  ))
  .add('Multi-row Header', () => (
    <Table
      data={[
        {
          flavor: 'Chocolate',
          price: '$8.00',
        },
        {
          flavor: 'Vanilla',
          price: '$4.00',
        },
        {
          flavor: 'Funfetti',
          price: '$6.00',
        },
        {
          flavor: 'Mint Chocolate Chip',
          price: '$5.00',
        },
        {
          flavor: 'Strawberry',
          price: '$3.00',
        },
      ]}
      columns={[
        <HeaderRow key="1">
          <TableHeader colSpan={3} label="Ice Cream Shoppe" sortable={false} />
        </HeaderRow>,
        <HeaderRow key="2">
          <TableHeader label="Flavor" stickyColumn />
          <TableHeader label="Price" />
        </HeaderRow>,
      ]}
    >
      {({ datum, rowIndex }) => (
        <Row key={datum.flavor} disabled={datum.flavor === 'Charlotte'}>
          <Cell>{datum.flavor}</Cell>
          <Cell>{datum.price}</Cell>
        </Row>
      )}
    </Table>
  ));
