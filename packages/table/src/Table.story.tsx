/* eslint-disable */
import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import {
  Table as LGTable,
  Row,
  Cell,
  TableHeader,
  HeaderRow,
  DataType,
  TableRowInterface,
} from '.';
import { defaultData, multiRowData } from './fixtures';
import { TableProps } from './Table';

type TableStoryProps = Omit<TableProps<any>, 'children'> & {
  children: (
    withHeaders: boolean,
  ) => (TableRowArgs: TableRowInterface<any>) => JSX.Element;
  withHeaders: boolean;
};

const Table: React.FC<TableStoryProps> = ({
  children,
  withHeaders,
  ...args
}: TableStoryProps) => <LGTable children={children(withHeaders)} {...args} />;

export default {
  title: 'Packages/Table',
  component: Table,
  args: {
    data: defaultData,
    withHeaders: {
      type: 'boolean',
    },
  },
  parameters: {
    controls: { exclude: ['children', 'data', 'columns'] },
  },
} as Meta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args: TableStoryProps) => (
  <Table {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  withHeaders: false,
  data: defaultData.slice(0, 8),
  columns: (
    <HeaderRow>
      <TableHeader key="name" label="Name" dataType="string" />
      <TableHeader key="age" label="Age" dataType="number" />
      <TableHeader key="color" label="Color" dataType="string" />
      <TableHeader key="location" label="Location" />
    </HeaderRow>
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
        <Row key={datum.name}>
          <Cell isHeader={withHeaders}>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      ),
};

export const BuiltInZebraStripes = Template.bind({});
BuiltInZebraStripes.args = {
  withHeaders: false,
  columns: (
    <HeaderRow>
      <TableHeader key="name" label="Name" dataType="string" />
      <TableHeader key="age" label="Age" dataType="number" />
      <TableHeader key="color" label="Color" dataType="string" />
      <TableHeader key="location" label="Location" />
    </HeaderRow>
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
        <Row key={datum.name}>
          <Cell isHeader={withHeaders}>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      ),
};

export const CustomLogic = Template.bind({});
CustomLogic.args = {
  withHeaders: true,
  columns: (
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
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
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
                Nulla vitae elit libero, a pharetra augue. Sed posuere
                consectetur est at lobortis. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet. Maecenas faucibus
                mollis interdum. Nullam id dolor id nibh ultricies vehicula ut
                id elit. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                non mi porta gravida at eget metus. Donec id elit non mi porta
                gravida at eget metus. Aenean lacinia bibendum nulla sed
                consectetur. Vestibulum id ligula porta felis euismod semper.
                Maecenas sed diam eget risus varius blandit sit amet non magna.
                Etiam porta sem malesuada magna mollis euismod. Donec
                ullamcorper nulla non metus auctor fringilla. Donec id elit non
                mi porta gravida at eget metus.
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
                  <Cell isHeader={withHeaders}>
                    expanded name: {datum.name}
                  </Cell>
                  <Cell>expanded age: {datum.age}</Cell>
                  <Cell>expanded color: {datum.color}</Cell>
                  <Cell>{datum.location}</Cell>
                </Row>
              )}
            </Row>
          )}
        </Row>
      ),
};

export const MultiRowHeader = Template.bind({});
MultiRowHeader.args = {
  withHeaders: true,
  data: multiRowData,
  columns: [
    <HeaderRow key="1">
      <TableHeader key="icecreamshoppe" colSpan={3} label="Ice Cream Shoppe" />
    </HeaderRow>,
    <HeaderRow key="2">
      <TableHeader key="flavor" label="Flavor" />
      <TableHeader key="price" label="Price" />
    </HeaderRow>,
  ],
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
        <Row>
          <Cell rowSpan={datum.flavor === 'Funfetti' ? 2 : 1}>
            {datum.flavor}
          </Cell>
          <Cell>{datum.price}</Cell>
        </Row>
      ),
};

export const NoNestedRows = Template.bind({});
NoNestedRows.args = {
  withHeaders: true,
  columns: (
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
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell isHeader={withHeaders}>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      ),
};

export const OverflowingTable = Template.bind({});
OverflowingTable.args = {
  withHeaders: true,
  columns: (
    <HeaderRow>
      <TableHeader key="name" label="Name" dataType="string" />
      <TableHeader key="age" label="Age" dataType="number" />
      <TableHeader label="Color" dataType="string" key="color" />
      <TableHeader key="location" label="Location" />
    </HeaderRow>
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
        <Row key={datum.name} disabled={datum.name === 'Charlotte'}>
          <Cell isHeader={withHeaders}>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      ),
};

export const MultipleNestedRows = Template.bind({});
MultipleNestedRows.args = {
  withHeaders: true,
  data: [
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
  ],
  columns: (
    <HeaderRow>
      <TableHeader key="name" label="Name" dataType="string" />
      <TableHeader key="age" label="Age" dataType="number" />
      <TableHeader label="Color" dataType="string" key="color" />
      <TableHeader key="location" label="Location" />
    </HeaderRow>
  ),
  children:
    (withHeaders: boolean) =>
    ({ datum }: { datum: any }) =>
      (
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
      ),
};
