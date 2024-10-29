import { faker } from '@faker-js/faker';

import { LineProps } from '../Line/Line.types';

// Seed the faker random number generator for consistent results
faker.seed(123);

function getRandomNumber(min: number, max: number) {
  return faker.number.int({ min, max });
}

export function makeLineData(numOfSets: number): Array<LineProps> {
  const data: Array<LineProps> = [];

  for (let i = 0; i < numOfSets; i++) {
    const line: LineProps = {
      name: `Series ${i}`,
      data: [],
    };

    let currentDate = new Date(2020, 5, 9); // June 9th, 2020 (Month is 0-indexed)

    for (let j = 0; j < 60; j++) {
      line.data?.push([
        new Date(currentDate),
        getRandomNumber(i * 150, i * 150 + 100),
      ]);
      currentDate.setMinutes(currentDate.getMinutes() + 1); // Increment by one hour
    }

    data.push(line);
  }

  return data;
}
