import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { StoryFn } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';
import { css } from '@leafygreen-ui/emotion';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { defaultData } from '../TableV10/fixtures.testutils';
import { makeData } from '../utils/makeData.testutils';
import {
  V10Cell as Cell,
  V10HeaderRow as HeaderRow,
  V10Row as Row,
  V10Table as Table,
  V10TableHeader as TableHeader,
  V11Adapter,
} from '..';

import { V11AdapterProps } from './V11Adapter.types';

type StoryAdapterProps = V11AdapterProps<unknown>;

const meta: StoryMetaType<typeof V11Adapter> = {
  title: 'Components/Table/V11 Adapter',
  component: V11Adapter,
  parameters: {
    default: null,
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

const virtualScrollingContainerHeight = css`
  height: 500px;
`;

export const Basic: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const DynamicData: StoryFn<StoryAdapterProps> = () => {
  const [data, setData] = useState(defaultData.slice(0, 8));

  const handleClick = () => {
    setData(
      defaultData.slice(
        2,
        faker.number.int({ min: 0, max: defaultData.length }),
      ),
    );
  };

  return (
    <>
      <button onClick={handleClick}>Randomize data length</button>
      <V11Adapter>
        <Table
          data={data}
          columns={
            <HeaderRow>
              <TableHeader key="name" label="Name" dataType="string" />
              <TableHeader key="age" label="Age" dataType="number" />
              <TableHeader key="color" label="Color" dataType="string" />
              <TableHeader key="location" label="Location" />
            </HeaderRow>
          }
        >
          {({ datum }: any) => (
            <Row>
              <Cell>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Table>
      </V11Adapter>
    </>
  );
};

export const BasicVS: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter useVirtualScrolling className={virtualScrollingContainerHeight}>
      <Table
        data={makeData(false, 1000)}
        columns={
          <HeaderRow>
            <TableHeader key="firstName" label="First Name" dataType="string" />
            <TableHeader key="lastName" label="Last Name" dataType="string" />
            <TableHeader key="visits" label="Visits" dataType="number" />
            <TableHeader key="relationship" label="Relationship" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.firstName}</Cell>
            <Cell>{datum.lastName}</Cell>
            <Cell>{datum.visits}</Cell>
            <Cell>{datum.status}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const DefaultZebraStripes: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const NestedRows: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
            {datum.name !== 'Donna' && (
              <Row>
                <Cell>
                  {datum.rand < 0.5 && <Badge>Low Rand</Badge>}
                  expanded name: {datum.name}
                </Cell>
                <Cell>expanded age: {datum.age}</Cell>
                <Cell>expanded color: {datum.color}</Cell>
                <Cell>expanded location: {datum.location}</Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const NestedRowsVS: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter useVirtualScrolling className={virtualScrollingContainerHeight}>
      <Table
        data={makeData(false, 1000, 5, 3)}
        columns={
          <HeaderRow>
            <TableHeader key="firstName" label="First Name" dataType="string" />
            <TableHeader key="lastName" label="Last Name" dataType="string" />
            <TableHeader key="visits" label="Visits" dataType="number" />
            <TableHeader key="relationship" label="Relationship" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.firstName}</Cell>
            <Cell>{datum.lastName}</Cell>
            <Cell>{datum.visits}</Cell>
            <Cell>{datum.status}</Cell>
            {datum.visits > 300 && (
              <Row>
                <Cell>
                  <div>
                    <Badge>Lots of visits</Badge>
                    expanded first name: {datum.firstName}
                  </div>
                </Cell>
                <Cell>expanded last name: {datum.lastName}</Cell>
                <Cell>expanded visits: {datum.visits}</Cell>
                <Cell>expanded status: {datum.status}</Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const ExpandableContent: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
            {datum.name === 'Donna' && (
              <Row>
                <Cell colSpan={4}>
                  Nulla vitae elit libero, a pharetra augue. Sed posuere
                  consectetur est at lobortis. Integer posuere erat a ante
                  venenatis dapibus posuere velit aliquet. Maecenas faucibus
                  mollis interdum. Nullam id dolor id nibh ultricies vehicula ut
                  id elit. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Donec id
                  elit non mi porta gravida at eget metus. Donec id elit non mi
                  porta gravida at eget metus. Aenean lacinia bibendum nulla sed
                  consectetur. Vestibulum id ligula porta felis euismod semper.
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna. Etiam porta sem malesuada magna mollis euismod. Donec
                  ullamcorper nulla non metus auctor fringilla. Donec id elit
                  non mi porta gravida at eget metus.
                </Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const ExpandableContentVS: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter useVirtualScrolling className={virtualScrollingContainerHeight}>
      <Table
        data={makeData(true, 1000)}
        columns={
          <HeaderRow>
            <TableHeader key="firstName" label="First Name" dataType="string" />
            <TableHeader key="lastName" label="Last Name" dataType="string" />
            <TableHeader key="visits" label="Visits" dataType="number" />
            <TableHeader key="relationship" label="Relationship" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.firstName}</Cell>
            <Cell>{datum.lastName}</Cell>
            <Cell>{datum.visits}</Cell>
            <Cell>{datum.status}</Cell>
            {datum.visits > 300 && (
              <Row>
                <Cell colSpan={4}>
                  Nulla vitae elit libero, a pharetra augue. Sed posuere
                  consectetur est at lobortis. Integer posuere erat a ante
                  venenatis dapibus posuere velit aliquet. Maecenas faucibus
                  mollis interdum. Nullam id dolor id nibh ultricies vehicula ut
                  id elit. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Donec id
                  elit non mi porta gravida at eget metus. Donec id elit non mi
                  porta gravida at eget metus. Aenean lacinia bibendum nulla sed
                  consectetur. Vestibulum id ligula porta felis euismod semper.
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna. Etiam porta sem malesuada magna mollis euismod. Donec
                  ullamcorper nulla non metus auctor fringilla. Donec id elit
                  non mi porta gravida at eget metus.
                </Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const SortableRows: StoryFn<StoryAdapterProps> = () => {
  return (
    <>
      First column has a custom sort function!
      <V11Adapter>
        <Table
          data={defaultData}
          columns={
            <HeaderRow>
              <TableHeader
                key="name"
                label="Name"
                dataType="string"
                compareFn={(a: any, b: any, dir) => {
                  const reverse = (str: string) =>
                    str.split('').reverse().join('');

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
                key="age"
                label="Age"
                dataType="number"
                sortBy={(datum: any) => datum.age.toString()}
              />
              <TableHeader
                key="color"
                label="Color"
                dataType="string"
                sortBy={(datum: any) => datum.color}
              />
              <TableHeader
                key="location"
                label="Location"
                handleSort={dir => {
                  // eslint-disable-next-line no-console
                  console.log(`Sorting location ${dir}`);
                }}
              />
            </HeaderRow>
          }
        >
          {({ datum }: any) => (
            <Row>
              <Cell>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Table>
      </V11Adapter>
    </>
  );
};

export const SortableRowsVS: StoryFn<StoryAdapterProps> = () => {
  return (
    <>
      First column has a custom sort function!
      <V11Adapter
        useVirtualScrolling
        headerLabels={{
          Relationship: 'status',
        }}
        className={virtualScrollingContainerHeight}
      >
        <Table
          data={makeData(true, 1000)}
          columns={
            <HeaderRow>
              <TableHeader
                key="firstName"
                label="First Name"
                dataType="string"
                compareFn={(a: any, b: any, dir) => {
                  const reverse = (str: string) =>
                    str.split('').reverse().join('');

                  // Pin 'Yvonne' to the top
                  if (b.firstName === 'Yvonne') return 1;
                  else if (a.firstName === 'Yvonne') return -1;

                  // Sort by reversed name
                  if (dir == 'desc') {
                    return reverse(b.firstName) >= reverse(a.firstName)
                      ? 1
                      : -1;
                  }

                  return reverse(b.firstName) >= reverse(a.firstName) ? -1 : 1;
                }}
              />
              <TableHeader key="lastName" label="Last Name" dataType="string" />
              <TableHeader
                key="visits"
                label="Visits"
                dataType="number"
                sortBy={(datum: any) => datum.visits.toString()}
              />
              <TableHeader
                key="relationship"
                label="Relationship"
                dataType="string"
                sortBy={(datum: any) => datum.status}
              />
            </HeaderRow>
          }
        >
          {({ datum }: any) => (
            <Row>
              <Cell>{datum.firstName}</Cell>
              <Cell>{datum.lastName}</Cell>
              <Cell>{datum.visits}</Cell>
              <Cell>{datum.status}</Cell>
            </Row>
          )}
        </Table>
      </V11Adapter>
    </>
  );
};

export const SelectableRows: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter hasSelectableRows>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const SelectableRowsVS: StoryFn<StoryAdapterProps> = () => {
  return (
    <V11Adapter
      hasSelectableRows
      useVirtualScrolling
      className={virtualScrollingContainerHeight}
    >
      <Table
        data={makeData(true, 1000)}
        columns={
          <HeaderRow>
            <TableHeader key="firstName" label="First Name" dataType="string" />
            <TableHeader key="lastName" label="Last Name" dataType="string" />
            <TableHeader key="visits" label="Visits" dataType="number" />
            <TableHeader key="relationship" label="Relationship" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.firstName}</Cell>
            <Cell>{datum.lastName}</Cell>
            <Cell>{datum.visits}</Cell>
            <Cell>{datum.status}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};
