import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData, testHeavierDataSet, multiRowData } from './fixtures';

storiesOf('Table', module)
  .add('Default', () => (
    <Table
      data={testHeavierDataSet}
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
            sortBy={(data: typeof testHeavierDataSet[0]) => data.age.toString()}
          />

          <TableHeader
            dataType={DataType.String}
            label="Favorite Color"
            key="color"
            sortBy={(data: typeof testHeavierDataSet[0]) => data.color}
          />

          <TableHeader
            dataType={DataType.String}
            label="Location"
            key="location"
            sortBy={(data: typeof testHeavierDataSet[0]) => data.location}
          />
        </>
      }
    >
      {({ datum }) => (
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

                  {datum.name === 'Jill' && (
                    <Row>
                      <Cell>1</Cell>
                      <Cell>1</Cell>
                      <Cell>1</Cell>
                      <Cell>1</Cell>
                    </Row>
                  )}
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
        <Row>
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
      data={defaultData}
      columns={
        <HeaderRow>
          <TableHeader key="name" label="Name" dataType="string" />
          <TableHeader key="age" label="Age" dataType="number" />
          <TableHeader
            label="Color"
            sortBy={(datum: typeof defaultData[0]) => datum.color}
            dataType="string"
            key="color"
          />
          <TableHeader key="location" label="Location" />
        </HeaderRow>
      }
    >
      {({ datum }) => (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      )}
    </Table>
  ))
  .add('When table is too big for its container', () => (
    <div
      className={css`
        width: 300px;
      `}
    >
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader label="Color" dataType="string" key="color" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }) => (
          <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </div>
  ))
  .add('test', () => (
    <Table
      data={[
        {
          component: 'Toast',
          priority: 'Low priority',
          userAction: 'Optional: Toasts dissappear automatically',
        },
        {
          component: 'Banner',
          priority: 'Medium priority',
          userAction: 'Optional: Banners etc.',
        },
        {
          component: 'Modal',
          priority: 'Highest priority',
          userAction: 'Required',
        },
      ]}
      columns={
        <>
          <TableHeader key="component" label="Component" />
          <TableHeader key="priority" label="Priority" />
          <TableHeader key="userAction" label="User Action" />
        </>
      }
    >
      {({ datum }) => (
        <Row key={datum.component}>
          <Cell>{datum.component}</Cell>
          <Cell>{datum.priority}</Cell>
          <Cell>{datum.userAction}</Cell>
        </Row>
      )}
    </Table>
  ));
