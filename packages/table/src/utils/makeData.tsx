import React from 'react';
import { faker } from '@faker-js/faker';

import Code from '@leafygreen-ui/code';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';

faker.seed(0);

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Array<Person>;
}

const range = (len: number) => {
  const arr = [];

  for (let i = 0; i < len; i++) {
    arr.push(i);
  }

  return arr;
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const newPerson = (): Person => {
  return {
    id: faker.seed(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 20, max: 100 }),
    visits: faker.datatype.number(1000),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
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

export function makeData(
  renderingExpandableRows: boolean,
  ...lens: Array<number>
) {
  const hasSubRows = !renderingExpandableRows && lens.length > 1;

  const makeDataLevel = (depth = 0): Array<Person> => {
    const len = lens[depth]!;
    return range(len).map((_): Person => {
      return {
        ...newPerson(),
        ...(hasSubRows &&
          lens[depth + 1] &&
          randomIntFromInterval(1, 2) == 1 && {
            subRows: makeDataLevel(depth + 1),
          }),
        ...(renderingExpandableRows &&
          randomIntFromInterval(1, 3) == 1 && {
            renderExpandedContent: ExpandedContentComponent,
          }),
      };
    });
  };

  const data = makeDataLevel();
  return data;
}

const randomChoice = (arr: Array<any>) => {
  return arr[Math.floor(arr.length * Math.random())];
};

const createDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - randomIntFromInterval(0, 10));
  return d;
};

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

export const createKitchenSinkData: (depth?: number) => object = (
  depth = 0,
) => {
  return {
    dateCreated: createDate(),
    frequency: randomChoice(['Daily', 'Weekly', 'Monthly']),
    clusterType: randomChoice(['Replica set', 'Sharded cluster']),
    encryptorEnabled: randomChoice([true, false]),
    mdbVersion: randomChoice(['4.4.10', '4.5.1', '4.6.11']),
    subRows:
      depth === 0
        ? [...Array(3)].map(_ => createKitchenSinkData(depth + 1))
        : undefined,
    renderExpandedContent: depth > 0 ? SampleExpandedContent : undefined,
  };
};
