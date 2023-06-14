/* eslint-disable */
// TODO: Table Shape is defined as `any` for now since our test data format isn't consistent.
import { Meta } from '@storybook/react';
import React from 'react';
import { Table, Row, Cell, TableHeader, HeaderRow, DataType } from '.';
import { defaultData } from './fixtures.testutils';
import { TableProps } from './Table';
import { storybookArgTypes } from '@leafygreen-ui/lib';

export default {
  title: 'Components/Table/V10',
  component: Table,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    data: defaultData,
    withHeaders: false,
  },
  argTypes: {
    withHeaders: {
      control: 'boolean',
      description:
        '[STORYBOOK ONLY]\n\nDetermines whether the `isHeader` prop should be passed to the first `Cell` of the story.',
    },
    children: { control: 'none' },
    data: { control: 'none' },
    columns: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
} as Meta<typeof Table>;

type TableArgs<T = any> = TableProps<T> & { withHeaders?: boolean };

export const Basic = ({ withHeaders, ...args }: TableArgs<any>) => (
  <Table
    {...args}
    data={defaultData.slice(0, 8)}
    columns={
      <HeaderRow>
        <TableHeader key="index" label="Index" dataType="number" />
        <TableHeader key="name" label="Name" dataType="string" />
        <TableHeader key="age" label="Age" dataType="number" />
        <TableHeader key="color" label="Color" dataType="string" />
        <TableHeader key="location" label="Location" />
      </HeaderRow>
    }
  >
    {({ datum, index }) => (
      <Row key={datum.name}>
        <Cell isHeader={withHeaders}>{index}</Cell>
        <Cell isHeader={withHeaders}>{datum.name}</Cell>
        <Cell>{datum.age}</Cell>
        <Cell>{datum.color}</Cell>
        <Cell>{datum.location}</Cell>
      </Row>
    )}
  </Table>
);

export const BuiltInZebraStripes = ({
  withHeaders,
  ...args
}: TableArgs<any>) => (
  <Table
    {...args}
    columns={
      <HeaderRow>
        <TableHeader key="name" label="Name" dataType="string" />
        <TableHeader key="age" label="Age" dataType="number" />
        <TableHeader key="color" label="Color" dataType="string" />
        <TableHeader key="location" label="Location" />
      </HeaderRow>
    }
  >
    {({ datum }) => (
      <Row key={datum.name}>
        <Cell isHeader={withHeaders}>{datum.name}</Cell>
        <Cell>{datum.age}</Cell>
        <Cell>{datum.color}</Cell>
        <Cell>{datum.location}</Cell>
      </Row>
    )}
  </Table>
);

export const CustomLogic = ({ withHeaders, ...args }: TableArgs<any>) => (
  <Table
    {...args}
    columns={
      <>
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
      </>
    }
  >
    {({ datum }: { datum: any }) => (
      <Row key={datum.name} disabled={datum.disabled}>
        <Cell isHeader={withHeaders}>
          {datum.name} {datum.rand}
        </Cell>
        <Cell>{datum.age}</Cell>
        <Cell>{datum.color}</Cell>
        <Cell>{datum.location}</Cell>

        {datum.name === 'Donna' && (
          <Row>
            <Cell isHeader={withHeaders} colSpan={4}>
              Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur
              est at lobortis. Integer posuere erat a ante venenatis dapibus
              posuere velit aliquet. Maecenas faucibus mollis interdum. Nullam
              id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est
              non commodo luctus, nisi erat porttitor ligula, eget lacinia odio
              sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas
              eget quam. Donec id elit non mi porta gravida at eget metus. Donec
              id elit non mi porta gravida at eget metus. Aenean lacinia
              bibendum nulla sed consectetur. Vestibulum id ligula porta felis
              euismod semper. Maecenas sed diam eget risus varius blandit sit
              amet non magna. Etiam porta sem malesuada magna mollis euismod.
              Donec ullamcorper nulla non metus auctor fringilla. Donec id elit
              non mi porta gravida at eget metus.
            </Cell>
          </Row>
        )}

        {datum.name !== 'Donna' && datum.expandable && (
          <Row>
            <Cell isHeader={withHeaders}>expanded name: {datum.name}</Cell>
            <Cell>expanded age: {datum.age}</Cell>
            <Cell>expanded color: {datum.color}</Cell>
            <Cell>{datum.location}</Cell>

            {datum.age > 30 && (
              <Row>
                <Cell isHeader={withHeaders}>expanded name: {datum.name}</Cell>
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
);

export const NoNestedRows = ({ withHeaders, ...args }: TableArgs<any>) => (
  <Table
    {...args}
    columns={
      <HeaderRow>
        <TableHeader key="name" label="Name" dataType="string" />
        <TableHeader key="age" label="Age" dataType="number" />
        <TableHeader
          label="Color"
          sortBy={(datum: any) => datum.color}
          dataType="string"
          key="color"
        />
        <TableHeader key="location" label="Location" />
      </HeaderRow>
    }
  >
    {({ datum }: { datum: any }) => (
      <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
        <Cell isHeader={withHeaders}>{datum.name}</Cell>
        <Cell>{datum.age}</Cell>
        <Cell>{datum.color}</Cell>
        <Cell>{datum.location}</Cell>
      </Row>
    )}
  </Table>
);

export const MultipleNestedRows = ({
  withHeaders,
  ...args
}: TableArgs<any>) => (
  <Table
    {...args}
    data={[
      {
        title: 'People',
        people: defaultData,
      },
      {
        title: 'Average',
        age: (
          defaultData.reduce((sum, { age }) => sum + age, 0) /
          defaultData.length
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
);
MultipleNestedRows.args = {
  withHeaders: true,
};

export const NestedRowsWithLongContent = ({
  withHeaders,
  ...args
}: TableArgs<any>) => (
  <Table
    {...args}
    data={[
      {
        title: 'People',
        people: [
          {
            name: 'Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis.',
            age: 19,
            color: 'blue',
            location: 'bedford',
            rand: Math.random(),
          },
          ...defaultData,
        ],
      },
      {
        title: 'Average',
        age: (
          defaultData.reduce((sum, { age }) => sum + age, 0) /
          defaultData.length
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
    style={{ maxWidth: '400px ' }}
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
);
NestedRowsWithLongContent.args = {
  withHeaders: true,
};
