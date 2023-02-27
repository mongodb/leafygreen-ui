import React from 'react';
import { faker } from '@faker-js/faker';

import { LeafygreenTableRow } from '../useLeafygreenTable';

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
    id: faker.datatype.number(1000),
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

const ExpandedContentComponent = (row: LeafygreenTableRow<unknown>) => {
  return (
    <>
      Test
      <pre>{JSON.stringify(row, null, 2)}</pre>
    </>
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
