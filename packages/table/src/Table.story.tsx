import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData, multiRowData } from './fixtures';

storiesOf('Table', module)
  .add('Default', () => (
    <Table
      selectable={boolean('isSelectable', true)}
      data={defaultData}
      columns={
        <>
          <TableHeader
            dataType={DataType.String}
            label="Name"
            key="name"
            sortBy="name"
          />
          <TableHeader
            dataType={DataType.Number}
            label="Age"
            key="age"
            sortBy={data => data.age.first ?? data.age}
          />
          <TableHeader
            dataType={DataType.String}
            label="Favorite Color"
            key="color"
            sortBy={data => data.color.primary ?? data.color}
          />
          Location
        </>
      }
    >
      {({ datum }) => (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age.second ?? datum.age}</Cell>
          <Cell>{datum.color?.primary ?? datum.color}</Cell>
          <Cell>{datum.location}</Cell>

          {datum.age > 21 && (
            <Row>
              <Cell>expanded name: {datum.name}</Cell>
              <Cell>expanded age: {datum.age.second ?? datum.age}</Cell>
              <Cell>expanded color: {datum.color}</Cell>
              <Cell>{datum.location}</Cell>

              {datum.age > 25 && (
                <Row>
                  <Cell>expanded name: {datum.name}</Cell>
                  <Cell>expanded age: {datum.age.second ?? datum.age}</Cell>
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
          <TableHeader
            label="Color"
            sortBy={datum => datum.color.primary ?? datum.color}
          />
          Location
        </>
      }
    >
      {({ datum }) => (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color.primary ?? datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      )}
    </Table>
  ));
