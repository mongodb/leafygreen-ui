import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData, multiRowData } from './fixtures';

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
      data={defaultData}
      columns={[
        <TableHeader
          dataType={DataType.String}
          sortable
          label="Name"
          key="name"
        />,
        <TableHeader
          dataType={DataType.NominalNumber}
          sortable
          label="Age"
          key="age"
        />,
        <TableHeader
          dataType={DataType.String}
          sortable
          label="Favorite Color"
          key="color"
          accessor="color"
        />,
        'Location',
      ]}
    >
      {({ datum }: { datum: DemoDataInterface; index: number }) => (
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
      data={multiRowData}
      columns={[
        <HeaderRow key="1">
          <TableHeader
            key="icecreamshoppe"
            colSpan={3}
            label="Ice Cream Shoppe"
            sortable={false}
          />
        </HeaderRow>,
        <HeaderRow key="2">
          <TableHeader key="flavor" label="Flavor" />
          <TableHeader key="price" label="Price" />
        </HeaderRow>,
      ]}
    >
      {({ datum }) => (
        <Row key={datum.flavor}>
          <Cell rowSpan={datum.flavor === 'Funfetti' ? 2 : 1}>
            {datum.flavor}
          </Cell>
          <Cell>{datum.price}</Cell>
        </Row>
      )}
    </Table>
  ))
  .add('No nested Rows', () => (
    <Table
      selectable={boolean('isSelectable', true)}
      data={defaultData}
      columns={
        <>
          <TableHeader label="Name" />
          <TableHeader label="Age" />
          <TableHeader label="Color" accessor={() => 'color'} sortable />
          Location
        </>
      }
    >
      {({ datum }: { datum: DemoDataInterface; index: number }) => (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      )}
    </Table>
  ));
