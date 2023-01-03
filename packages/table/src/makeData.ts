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

export function makeData(...lens: Array<number>) {
  const hasSubRows = lens.length > 1

  const makeDataLevel = (depth = 0): Array<Person> => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        ...(hasSubRows && lens[depth + 1] && randomIntFromInterval(1, 3) == 1 // only give 1 in 3 rows subrows just for demo
          ? { subRows: makeDataLevel(depth + 1) }
          : undefined),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(1000);

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
