import { faker } from '@faker-js/faker';

import { Series } from '../LineChart.types';

// Seed the faker random number generator for consistent results
faker.seed(123);

function getRandomNumber(min: number, max: number) {
  return faker.number.int({ min, max });
}

export function makeData(numOfSets: number): Array<Series> {
  const data: Array<Series> = [];

  for (let i = 0; i < numOfSets; i++) {
    const series: Series = {
      name: `Series ${i}`,
      data: [],
    };

    let currentDate = new Date(2020, 5, 9); // June 9th, 2020 (Month is 0-indexed)

    for (let j = 0; j < 60; j++) {
      series.data?.push([
        new Date(currentDate),
        getRandomNumber(i * 150, i * 150 + 100),
      ]);
      currentDate.setMinutes(currentDate.getMinutes() + 1); // Increment by one hour
    }

    data.push(series);
  }

  return data;
}
