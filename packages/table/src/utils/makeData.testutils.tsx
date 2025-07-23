import React from 'react';
import { faker } from '@faker-js/faker';
import range from 'lodash/range';

import Code from '@leafygreen-ui/code';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';

const SEED = 0;
faker.seed(SEED);

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Array<Person>;
  index?: number;
}

const newPerson = (): Person => {
  return {
    id: faker.string.alphanumeric({ length: { min: 5, max: 7 } }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 20, max: 100 }),
    visits: faker.number.int(1000),
    status: faker.helpers.arrayElement<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ]),
  };
};

const ExpandedContentComponent = (row: LeafyGreenTableRow<unknown>) => {
  return (
    <div style={{ padding: '0 30px' }}>
      Test
      <pre>{JSON.stringify(row, null, 2)}</pre>
    </div>
  );
};

/**
 * Generates a series of sample data to be used in Storybook
 * @param renderingExpandableRows indicates whether the `renderExpandedContent` prop should be defined in some rows
 * @param lens number of rows in each level of nesting
 * @returns Array<Person>
 */
export function makeData(
  renderingExpandableRows: boolean,
  ...lens: Array<number>
) {
  faker.seed(SEED);

  const hasSubRows = !renderingExpandableRows && lens.length > 1;

  const makeDataLevel = (depth = 0): Array<Person> => {
    const len = lens[depth]!;
    return range(len).map((_, i): Person => {
      return {
        index: i,
        ...newPerson(),
        ...(hasSubRows &&
          lens[depth + 1] &&
          faker.number.int({ min: 1, max: 2 }) == 1 && {
            subRows: makeDataLevel(depth + 1),
          }),
        ...(renderingExpandableRows &&
          faker.number.int({ min: 1, max: 3 }) == 1 && {
            renderExpandedContent: ExpandedContentComponent,
          }),
      };
    });
  };

  const data = makeDataLevel();
  return data;
}

const SampleExpandedContent = (row: LeafyGreenTableRow<object>) => {
  return (
    <div style={{ padding: '12px 70px 24px 70px' }}>
      <Code language="js" style={{ width: '100%' }}>
        {`          
          function greeting(row) {
            return \`Hello, you're looking at row ID ${row.id}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
          }
          
          console.log(greeting(row));
        `}
      </Code>
    </div>
  );
};

export interface KitchenSink {
  dateCreated: Date;
  frequency: string;
  clusterType: string;
  encryptorEnabled: boolean;
  mdbVersion: string;
  subRows?: Array<KitchenSink>;
  index?: number;
}

const createKitchenSinkData: (depth?: number) => KitchenSink = (depth = 0) => {
  return {
    dateCreated: faker.date.past({ refDate: new Date('2023-12-26') }),
    frequency: faker.helpers.arrayElement(['Daily', 'Weekly', 'Monthly']),
    clusterType: faker.helpers.weightedArrayElement([
      { value: 'Replica set', weight: 0.45 },
      { value: faker.lorem.lines(2), weight: 0.1 },
      {
        value: faker.string.alpha({ length: { min: 25, max: 45 } }),
        weight: 0.1,
      },
      { value: 'Sharded cluster', weight: 0.45 },
    ]),
    encryptorEnabled: faker.datatype.boolean(0.75),
    mdbVersion: faker.system.semver(),
    subRows:
      depth === 0
        ? range(3).map(_ => createKitchenSinkData(depth + 1))
        : undefined,
    renderExpandedContent: depth > 0 ? SampleExpandedContent : undefined,
  };
};

export const makeKitchenSinkData = (count: number) => {
  faker.seed(SEED);

  return range(count).map(_ => createKitchenSinkData());
};
