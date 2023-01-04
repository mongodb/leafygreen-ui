import React from 'react';
import { faker } from '@faker-js/faker';
import { ColumnSort, SortingState } from '@tanstack/react-table';

export interface Person {
  id: any;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
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
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const newPerson = (): Person => {
  return {
    id: faker.datatype.number(1000),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 20, max: 100 }),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  };
};

const ExpandedContentComponent = ({ row }: any) => (
  <>
    Test
    <pre>
      {JSON.stringify(row, null, 2)}
    </pre>
  </>
)

export function makeData(renderingExpandableRows: boolean, ...lens: Array<number>) {
  const hasSubRows = !renderingExpandableRows && lens.length > 1;

  const makeDataLevel = (depth = 0): Array<any> => {
    const len = lens[depth]!;
    return range(len).map((d): any => {
      return {
        ...newPerson(),
        subRows: hasSubRows && lens[depth + 1] && randomIntFromInterval(1, 3) == 1
          ? makeDataLevel(depth + 1)
          : undefined,
        renderExpandedContent: renderingExpandableRows && randomIntFromInterval(1, 3) == 1
          ? ExpandedContentComponent
          : undefined,
      };
    });
  };

  const data = makeDataLevel()
  console.log(data)

  return data;
}

const data = makeData(false, 1000);

//simulates a backend api
export const fetchData = (
  start: number,
  size: number,
  sorting: SortingState,
) => {
  const dbData = [...data];

  if (sorting.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof Person; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }

      return a[id] > b[id] ? 1 : -1;
    });
  }

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};
