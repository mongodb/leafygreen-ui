import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { Table, Row, Cell, TableHeader, HeaderRow } from '@leafygreen-ui/table';

const defaultData = [
  {
    name: 'Alice',
    age: 19,
    color: 'blue',
    location: 'bedford',
  },
  {
    name: 'Brooke',
    age: 20,
    color: 'green',
    location: 'bedford',
  },
  {
    name: 'Charlotte',
    age: 21,
    color: 'white',
    location: 'bedford',
  },
  {
    name: 'Donna',
    age: 22,
    color: 'green',
    location: 'bedford',
  },
  {
    name: 'Emma',
    age: 23,
    color: 'white',
    location: 'bedford',
  },
  {
    name: 'Georgia',
    age: 24,
    color: 'white',
    location: 'bedford',
  },
  {
    name: 'Frannie',
    age: 29,
    color: 'green',
    location: 'bedford',
  },
  {
    name: 'Iman',
    age: 26,
    color: 'white',
    location: 'bedford',
  },
  {
    name: 'Hannah',
    age: 27,
    color: 'green',
    location: 'bedford',
  },
  {
    name: 'Jill',
    age: 28,
    color: 'green',
    location: 'bedford',
  },
];

const knobsConfig: KnobsConfigInterface<{
  disabled: boolean;
  sortBy: boolean;
}> = {
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  sortBy: {
    type: 'boolean',
    default: true,
    label: 'Sort By',
  },
};

function DefaultExample({
  disabled,
  sortBy,
}: {
  disabled: boolean;
  sortBy: boolean;
}) {
  return (
    <Table
      data={defaultData}
      columns={
        <HeaderRow>
          <TableHeader key="name" label="Name" dataType="string" />
          <TableHeader key="age" label="Age" dataType="number" />
          <TableHeader
            label="Color"
            sortBy={
              sortBy ? (datum: typeof defaultData[0]) => datum.color : undefined
            }
            dataType="string"
            key="color"
          />
          <TableHeader key="location" label="Location" />
        </HeaderRow>
      }
    >
      {({ datum }) => (
        <Row key={datum.name} disabled={disabled && datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      )}
    </Table>
  );
}

export default function TableLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
